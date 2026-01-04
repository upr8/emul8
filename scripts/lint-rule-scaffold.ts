import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
} as const;

const log = {
  error: (msg: string) =>
    console.error(`${colors.red}ERROR${colors.reset} ${msg}`),
  warn: (msg: string) =>
    console.warn(`${colors.yellow}WARN${colors.reset} ${msg}`),
  success: (msg: string) =>
    console.log(`${colors.green}✓${colors.reset} ${msg}`),
  info: (msg: string) =>
    console.log(`${colors.blue}INFO${colors.reset} ${msg}`),
  dim: (msg: string) => console.log(`${colors.dim}${msg}${colors.reset}`),
  header: (msg: string) =>
    console.log(`\n${colors.cyan}${msg}${colors.reset}\n`),
};

// Paths
const PLUGIN_DIR = resolve(process.cwd(), "oxlint-plugins/emul8-lint-plugin");
const TEMPLATES_DIR = join(PLUGIN_DIR, "rules/_templates");
const REGISTRY_PATH = join(PLUGIN_DIR, "metadata/registry.json");

// Valid categories
const VALID_CATEGORIES = ["a11y", "i18n", "perf", "imports", "patterns"] as const;
type Category = (typeof VALID_CATEGORIES)[number];

// Valid templates
const VALID_TEMPLATES = [
  "jsx-attribute",
  "string-pattern",
  "import-analysis",
  "call-expression",
] as const;
type Template = (typeof VALID_TEMPLATES)[number];

interface ScaffoldOptions {
  name: string;
  category: Category;
  template: Template;
  description: string;
  message: string;
  messageId?: string;
  patternId?: string;
  fixable?: boolean;
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function validateName(name: string): boolean {
  return /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name);
}

function loadRegistry(): Record<string, unknown> {
  try {
    return JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));
  } catch {
    log.error(`Failed to load registry from ${REGISTRY_PATH}`);
    process.exit(1);
  }
}

function saveRegistry(registry: Record<string, unknown>): void {
  writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");
}

function loadTemplate(templateName: Template): string {
  const templatePath = join(TEMPLATES_DIR, `${templateName}.js.template`);
  try {
    return readFileSync(templatePath, "utf-8");
  } catch {
    log.error(`Template not found: ${templatePath}`);
    process.exit(1);
  }
}

function fillTemplate(template: string, variables: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
  }
  return result;
}

function generateRuleFile(options: ScaffoldOptions): string {
  const template = loadTemplate(options.template);
  const messageId = options.messageId || toCamelCase(options.name);
  const today = new Date().toISOString().split("T")[0];

  const variables: Record<string, string> = {
    DESCRIPTION: options.description,
    SOURCE_AGENT: options.patternId?.split(":")[0] || "manual",
    PATTERN_ID: options.patternId || `manual:${options.category}:${options.name}`,
    CREATED_DATE: today,
    TYPE: options.template === "string-pattern" ? "suggestion" : "problem",
    CATEGORY: options.category,
    MESSAGE_ID: messageId,
    MESSAGE: options.message,
  };

  return fillTemplate(template, variables);
}

function generateTestFile(options: ScaffoldOptions): string {
  const messageId = options.messageId || toCamelCase(options.name);

  return `/**
 * Tests for ${options.name}
 * @see ../rules/${options.category}/${options.name}.js
 */

// Valid cases - should NOT trigger the rule
export const validCases = [
  // TODO: Add valid code examples
  \`// Example valid code\`,
];

// Invalid cases - SHOULD trigger the rule
export const invalidCases = [
  {
    code: \`// Example invalid code\`,
    errors: [{ messageId: "${messageId}" }],
  },
];
`;
}

function updateIndexFile(options: ScaffoldOptions): void {
  const indexPath = join(PLUGIN_DIR, "index.js");
  let content = readFileSync(indexPath, "utf-8");

  const importName = toCamelCase(options.name);
  const importPath = `./rules/${options.category}/${options.name}.js`;

  // Find the category comment for imports
  const categoryComments: Record<Category, string> = {
    a11y: "// A11y rules",
    i18n: "// i18n rules",
    perf: "// Perf rules",
    imports: "// Import hierarchy rules",
    patterns: "// Pattern rules",
  };

  const categoryComment = categoryComments[options.category];
  const importLine = `import ${importName} from "${importPath}";`;

  // Add import after category comment
  const importRegex = new RegExp(`(${categoryComment}[\\s\\S]*?)(\n\n|\n\/\/)`, "m");
  if (importRegex.test(content)) {
    content = content.replace(importRegex, `$1\n${importLine}$2`);
  } else {
    // Fallback: add before plugin definition
    content = content.replace(
      "// Plugin definition",
      `${importLine}\n\n// Plugin definition`
    );
  }

  // Add rule to rules object
  const ruleEntry = `    "${options.name}": ${importName},`;
  const rulesCategoryComments: Record<Category, string> = {
    a11y: "// A11y rules",
    i18n: "// i18n rules",
    perf: "// Perf rules",
    imports: "// Import hierarchy rules",
    patterns: "// Pattern rules",
  };

  const rulesComment = rulesCategoryComments[options.category];
  const rulesRegex = new RegExp(`(${rulesComment}[\\s\\S]*?)(\n\n|\n\\s*\\/\\/)`, "m");
  if (rulesRegex.test(content)) {
    content = content.replace(rulesRegex, `$1\n${ruleEntry}$2`);
  }

  writeFileSync(indexPath, content);
}

function updateRegistry(options: ScaffoldOptions): void {
  const registry = loadRegistry() as {
    rules: Record<string, unknown>;
    [key: string]: unknown;
  };
  const today = new Date().toISOString().split("T")[0];

  registry.rules[options.name] = {
    name: options.name,
    category: options.category,
    source: {
      type: options.patternId ? "agent-generated" : "manual",
      agent: options.patternId?.split(":")[0] || undefined,
      createdBy: options.patternId ? undefined : "lint-rule-scaffold",
    },
    status: "experimental",
    severity: "warn",
    fixable: options.fixable || false,
    created: today,
    linkedPatterns: options.patternId ? [options.patternId] : [],
    effectiveness: {
      violations30d: 0,
      fixRate: 0,
      falsePositiveRate: 0,
    },
  };

  saveRegistry(registry);
}

function scaffold(options: ScaffoldOptions): void {
  log.header(`Scaffolding lint rule: ${options.name}`);

  // Validate name
  if (!validateName(options.name)) {
    log.error(`Invalid rule name: ${options.name}`);
    log.dim("Name must be kebab-case (e.g., no-div-onclick)");
    process.exit(1);
  }

  // Check if rule exists
  const registry = loadRegistry() as { rules: Record<string, unknown> };
  if (registry.rules[options.name]) {
    log.error(`Rule already exists: ${options.name}`);
    process.exit(1);
  }

  // Create rule file
  const ruleDir = join(PLUGIN_DIR, "rules", options.category);
  const rulePath = join(ruleDir, `${options.name}.js`);

  if (!existsSync(ruleDir)) {
    mkdirSync(ruleDir, { recursive: true });
  }

  const ruleContent = generateRuleFile(options);
  writeFileSync(rulePath, ruleContent);
  log.success(`Created rule: ${rulePath}`);

  // Create test file
  const testDir = join(PLUGIN_DIR, "tests", options.category);
  const testPath = join(testDir, `${options.name}.test.js`);

  if (!existsSync(testDir)) {
    mkdirSync(testDir, { recursive: true });
  }

  const testContent = generateTestFile(options);
  writeFileSync(testPath, testContent);
  log.success(`Created test: ${testPath}`);

  // Update registry
  updateRegistry(options);
  log.success(`Updated registry: ${REGISTRY_PATH}`);

  // Update index.js
  updateIndexFile(options);
  log.success(`Updated index.js`);

  log.header("Scaffolding complete!");
  log.info("Next steps:");
  log.dim(`  1. Implement rule logic in: ${rulePath}`);
  log.dim(`  2. Add test cases in: ${testPath}`);
  log.dim(`  3. Test: pnpm lint:check`);
  log.dim(`  4. Deploy: Add to oxlint.json when ready`);
}

function printUsage(): void {
  log.header("Lint Rule Scaffold");
  console.log("Usage: tsx scripts/lint-rule-scaffold.ts <name> <category> <template> [options]");
  console.log("");
  console.log("Arguments:");
  console.log("  name       Rule name in kebab-case (e.g., no-div-onclick)");
  console.log(`  category   One of: ${VALID_CATEGORIES.join(", ")}`);
  console.log(`  template   One of: ${VALID_TEMPLATES.join(", ")}`);
  console.log("");
  console.log("Options:");
  console.log("  --description <text>   Rule description");
  console.log("  --message <text>       Error message");
  console.log("  --pattern-id <id>      Linked pattern ID");
  console.log("  --fixable              Mark rule as auto-fixable");
  console.log("");
  console.log("Example:");
  console.log('  tsx scripts/lint-rule-scaffold.ts no-button-without-type a11y jsx-attribute \\');
  console.log('    --description "Require type attribute on button elements" \\');
  console.log('    --message "Button elements should have an explicit type attribute"');
}

function main(): void {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printUsage();
    process.exit(0);
  }

  if (args.length < 3) {
    log.error("Missing required arguments");
    printUsage();
    process.exit(1);
  }

  const [name, category, template] = args;

  if (!VALID_CATEGORIES.includes(category as Category)) {
    log.error(`Invalid category: ${category}`);
    log.dim(`Valid categories: ${VALID_CATEGORIES.join(", ")}`);
    process.exit(1);
  }

  if (!VALID_TEMPLATES.includes(template as Template)) {
    log.error(`Invalid template: ${template}`);
    log.dim(`Valid templates: ${VALID_TEMPLATES.join(", ")}`);
    process.exit(1);
  }

  // Parse options
  const options: ScaffoldOptions = {
    name: toKebabCase(name),
    category: category as Category,
    template: template as Template,
    description: "",
    message: "",
  };

  for (let i = 3; i < args.length; i++) {
    switch (args[i]) {
      case "--description":
        options.description = args[++i] || "";
        break;
      case "--message":
        options.message = args[++i] || "";
        break;
      case "--pattern-id":
        options.patternId = args[++i] || "";
        break;
      case "--fixable":
        options.fixable = true;
        break;
    }
  }

  // Set defaults if not provided
  if (!options.description) {
    options.description = `Enforce ${options.name.replace(/-/g, " ")} pattern`;
  }
  if (!options.message) {
    options.message = `Violation of ${options.name} rule`;
  }

  scaffold(options);
}

main();

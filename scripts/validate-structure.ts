import { existsSync, readdirSync, statSync } from "node:fs";
import { basename, join, resolve } from "node:path";

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  dim: "\x1b[2m",
} as const;

const log = {
  error: (msg: string) =>
    console.error(`${colors.red}ERROR${colors.reset} ${msg}`),
  warn: (msg: string) =>
    console.warn(`${colors.yellow}WARN${colors.reset} ${msg}`),
  success: (msg: string) =>
    console.log(`${colors.green}PASS${colors.reset} ${msg}`),
  info: (msg: string) =>
    console.log(`${colors.blue}INFO${colors.reset} ${msg}`),
  dim: (msg: string) => console.log(`${colors.dim}${msg}${colors.reset}`),
};

// Component layers to validate
const COMPONENT_LAYERS = [
  "layouts",
  "atoms",
  "molecules",
  "organisms",
  "templates",
] as const;

// Required files for each component (using {name} as placeholder for component name)
const REQUIRED_FILES = [
  "{name}.tsx",
  "{name}.types.ts",
  "{name}.variants.ts",
  "{name}.stories.tsx",
  "{name}.mdx",
  "index.ts",
] as const;

interface StructureViolation {
  componentPath: string;
  componentName: string;
  layer: string;
  missingFiles: string[];
}

function validateComponent(
  componentDir: string,
  layer: string
): StructureViolation | null {
  const componentName = basename(componentDir);
  const missingFiles: string[] = [];

  for (const filePattern of REQUIRED_FILES) {
    const fileName = filePattern.replace("{name}", componentName);
    const filePath = join(componentDir, fileName);

    if (!existsSync(filePath)) {
      missingFiles.push(fileName);
    }
  }

  if (missingFiles.length > 0) {
    return {
      componentPath: componentDir,
      componentName,
      layer,
      missingFiles,
    };
  }

  return null;
}

function validateStructure(): StructureViolation[] {
  const srcDir = resolve(process.cwd(), "src");
  const violations: StructureViolation[] = [];
  let totalComponents = 0;

  for (const layer of COMPONENT_LAYERS) {
    const layerDir = join(srcDir, layer);

    if (!existsSync(layerDir)) {
      continue;
    }

    const entries = readdirSync(layerDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        totalComponents++;
        const componentDir = join(layerDir, entry.name);
        const violation = validateComponent(componentDir, layer);

        if (violation) {
          violations.push(violation);
        }
      }
    }
  }

  log.info(`Scanned ${totalComponents} component(s) across ${COMPONENT_LAYERS.length} layers\n`);

  return violations;
}

function main() {
  log.info("Validating component structure...\n");

  const violations = validateStructure();

  if (violations.length === 0) {
    log.success("All components have required files");
    process.exit(0);
  }

  log.error(`Found ${violations.length} component(s) with missing files:\n`);

  for (const violation of violations) {
    log.error(`${violation.layer}/${violation.componentName}`);
    log.dim(`  Path: ${violation.componentPath}`);
    log.dim(`  Missing: ${violation.missingFiles.join(", ")}`);
    console.log("");
  }

  log.info("Required files for each component:");
  for (const file of REQUIRED_FILES) {
    log.dim(`  - ${file.replace("{name}", "<ComponentName>")}`);
  }

  process.exit(1);
}

main();

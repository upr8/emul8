import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
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
    console.log(`\n${colors.bold}${colors.cyan}${msg}${colors.reset}\n`),
};

// Paths
const PLUGIN_DIR = resolve(process.cwd(), "oxlint-plugins/emul8-lint-plugin");
const REGISTRY_PATH = join(PLUGIN_DIR, "metadata/registry.json");
const OXLINT_CONFIG_PATH = resolve(process.cwd(), "oxlint.json");

interface RuleMetadata {
  name: string;
  category: string;
  source: {
    type: string;
    agent?: string;
    createdBy?: string;
  };
  status: "active" | "experimental" | "deprecated" | "removed";
  severity: "off" | "warn" | "error";
  fixable: boolean;
  created: string;
  promoted?: string;
  deprecated?: string;
  deprecationReason?: string;
  linkedPatterns: string[];
  effectiveness: {
    violations30d: number;
    fixRate: number;
    falsePositiveRate: number;
  };
}

interface Registry {
  $schema: string;
  version: string;
  rules: Record<string, RuleMetadata>;
}

interface OxlintConfig {
  rules?: Record<string, string>;
  plugins?: {
    emul8?: Record<string, string>;
  };
}

function loadRegistry(): Registry {
  try {
    return JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));
  } catch {
    log.error(`Failed to load registry from ${REGISTRY_PATH}`);
    process.exit(1);
  }
}

function loadOxlintConfig(): OxlintConfig | null {
  try {
    return JSON.parse(readFileSync(OXLINT_CONFIG_PATH, "utf-8"));
  } catch {
    return null;
  }
}

function runLintAndCountViolations(): Map<string, number> {
  const violationCounts = new Map<string, number>();

  try {
    // Run oxlint using spawnSync (safer than execSync)
    const result = spawnSync("pnpm", ["lint:check"], {
      encoding: "utf-8",
      maxBuffer: 10 * 1024 * 1024,
      stdio: ["pipe", "pipe", "pipe"],
    });

    const output = (result.stdout || "") + (result.stderr || "");

    // Parse output for rule violations
    // Format: "emul8/rule-name" appears in each violation line
    const rulePattern = /emul8\/([a-z-]+)/g;
    let match: RegExpExecArray | null;

    while ((match = rulePattern.exec(output)) !== null) {
      const ruleName = match[1];
      violationCounts.set(ruleName, (violationCounts.get(ruleName) || 0) + 1);
    }
  } catch {
    log.warn("Could not run lint check for violation counts");
  }

  return violationCounts;
}

function daysSince(dateStr: string): number {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function generateReport(format: "console" | "markdown" = "console"): string {
  const registry = loadRegistry();
  const oxlintConfig = loadOxlintConfig();
  const violations = runLintAndCountViolations();

  const rules = Object.values(registry.rules);
  const today = new Date().toISOString().split("T")[0];

  // Statistics
  const stats = {
    total: rules.length,
    active: rules.filter((r) => r.status === "active").length,
    experimental: rules.filter((r) => r.status === "experimental").length,
    deprecated: rules.filter((r) => r.status === "deprecated").length,
    removed: rules.filter((r) => r.status === "removed").length,
  };

  const byCategory = rules.reduce(
    (acc, rule) => {
      acc[rule.category] = (acc[rule.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Attention items
  const experimentalOld = rules.filter(
    (r) => r.status === "experimental" && daysSince(r.created) > 14
  );

  const missingInConfig = rules.filter((r) => {
    if (r.status === "removed") return false;
    const configRules = oxlintConfig?.rules || {};
    // Check for emul8/rule-name format in oxlint.json rules
    return !(`emul8/${r.name}` in configRules);
  });

  const highViolations = [...violations.entries()]
    .filter(([_, count]) => count > 5)
    .sort((a, b) => b[1] - a[1]);

  // Generate report
  if (format === "markdown") {
    return generateMarkdownReport(
      registry,
      rules,
      stats,
      byCategory,
      violations,
      experimentalOld,
      missingInConfig,
      highViolations,
      today
    );
  }

  // Console output
  log.header("Lint Governance Report");
  console.log(`Generated: ${today}`);

  log.header("Overview");
  console.log(`Total rules: ${stats.total}`);
  console.log(`  Active:       ${stats.active}`);
  console.log(`  Experimental: ${stats.experimental}`);
  console.log(`  Deprecated:   ${stats.deprecated}`);
  console.log(`  Removed:      ${stats.removed}`);

  log.header("By Category");
  for (const [category, count] of Object.entries(byCategory)) {
    console.log(`  ${category}: ${count}`);
  }

  if (highViolations.length > 0) {
    log.header("High Violation Rules (> 5 violations)");
    for (const [rule, count] of highViolations) {
      console.log(`  ${rule}: ${count} violations`);
    }
  }

  if (experimentalOld.length > 0) {
    log.header("⚠️  Experimental Rules > 14 Days");
    for (const rule of experimentalOld) {
      console.log(`  ${rule.name} (${daysSince(rule.created)} days)`);
    }
    log.dim("  Consider promoting or deprecating these rules");
  }

  if (missingInConfig.length > 0) {
    log.header("⚠️  Rules Missing from oxlint.json");
    for (const rule of missingInConfig) {
      console.log(`  ${rule.name} (${rule.category})`);
    }
    log.dim("  These rules are defined but not configured");
  }

  log.header("Rule Status Summary");
  console.log("");
  console.log("| Rule | Category | Status | Days | Violations |");
  console.log("|------|----------|--------|------|------------|");

  for (const rule of rules.sort((a, b) => a.category.localeCompare(b.category))) {
    if (rule.status === "removed") continue;
    const days = daysSince(rule.created);
    const vCount = violations.get(rule.name) || 0;
    console.log(
      `| ${rule.name} | ${rule.category} | ${rule.status} | ${days} | ${vCount} |`
    );
  }

  return "";
}

function generateMarkdownReport(
  registry: Registry,
  rules: RuleMetadata[],
  stats: { total: number; active: number; experimental: number; deprecated: number; removed: number },
  byCategory: Record<string, number>,
  violations: Map<string, number>,
  experimentalOld: RuleMetadata[],
  missingInConfig: RuleMetadata[],
  highViolations: [string, number][],
  today: string
): string {
  let md = `# Lint Governance Report

Generated: ${today}

## Overview

| Metric | Value |
|--------|-------|
| Total rules | ${stats.total} |
| Active | ${stats.active} |
| Experimental | ${stats.experimental} |
| Deprecated | ${stats.deprecated} |
| Removed | ${stats.removed} |

## By Category

| Category | Count |
|----------|-------|
`;

  for (const [category, count] of Object.entries(byCategory)) {
    md += `| ${category} | ${count} |\n`;
  }

  if (highViolations.length > 0) {
    md += `
## High Violation Rules

| Rule | Violations |
|------|------------|
`;
    for (const [rule, count] of highViolations) {
      md += `| ${rule} | ${count} |\n`;
    }
  }

  if (experimentalOld.length > 0) {
    md += `
## ⚠️ Attention Required

### Experimental Rules > 14 Days

| Rule | Days | Action Required |
|------|------|-----------------|
`;
    for (const rule of experimentalOld) {
      md += `| ${rule.name} | ${daysSince(rule.created)} | Promote or deprecate |\n`;
    }
  }

  if (missingInConfig.length > 0) {
    md += `
### Rules Missing from Config

| Rule | Category |
|------|----------|
`;
    for (const rule of missingInConfig) {
      md += `| ${rule.name} | ${rule.category} |\n`;
    }
  }

  md += `
## All Rules

| Rule | Category | Status | Created | Violations |
|------|----------|--------|---------|------------|
`;

  for (const rule of rules.sort((a, b) => a.category.localeCompare(b.category))) {
    if (rule.status === "removed") continue;
    const vCount = violations.get(rule.name) || 0;
    md += `| ${rule.name} | ${rule.category} | ${rule.status} | ${rule.created} | ${vCount} |\n`;
  }

  md += `
---

*Report generated by lint-governance-report.ts*
`;

  return md;
}

function audit(ruleName?: string): void {
  const registry = loadRegistry();
  const oxlintConfig = loadOxlintConfig();

  if (ruleName) {
    // Audit single rule
    const rule = registry.rules[ruleName];
    if (!rule) {
      log.error(`Rule not found: ${ruleName}`);
      process.exit(1);
    }

    log.header(`Rule Audit: ${ruleName}`);

    console.log("Metadata:");
    console.log(`  Category:    ${rule.category}`);
    console.log(`  Status:      ${rule.status}`);
    console.log(`  Severity:    ${rule.severity}`);
    console.log(`  Created:     ${rule.created} (${daysSince(rule.created)} days ago)`);
    console.log(`  Fixable:     ${rule.fixable ? "Yes" : "No"}`);
    console.log(`  Source:      ${rule.source.type}`);

    console.log("\nFile Checks:");

    const rulePath = join(PLUGIN_DIR, "rules", rule.category, `${ruleName}.js`);
    const testPath = join(PLUGIN_DIR, "tests", rule.category, `${ruleName}.test.js`);
    const inConfig = oxlintConfig?.rules?.[`emul8/${ruleName}`] !== undefined;

    console.log(`  [${existsSync(rulePath) ? "✓" : "✗"}] Rule file exists`);
    console.log(`  [${existsSync(testPath) ? "✓" : "✗"}] Test file exists`);
    console.log(`  [${inConfig ? "✓" : "✗"}] Configured in oxlint.json`);

    if (rule.linkedPatterns.length > 0) {
      console.log("\nLinked Patterns:");
      for (const pattern of rule.linkedPatterns) {
        console.log(`  - ${pattern}`);
      }
    }

    console.log("\nEffectiveness:");
    console.log(`  Violations (30d):    ${rule.effectiveness.violations30d}`);
    console.log(`  Fix Rate:            ${(rule.effectiveness.fixRate * 100).toFixed(1)}%`);
    console.log(`  False Positive Rate: ${(rule.effectiveness.falsePositiveRate * 100).toFixed(1)}%`);

    return;
  }

  // Full audit
  log.header("Full Lint Rule Audit");

  const rules = Object.values(registry.rules);
  let healthy = 0;
  let needsAttention = 0;
  let issues = 0;

  const problems: { rule: string; issue: string; severity: "warn" | "error" }[] = [];

  for (const rule of rules) {
    if (rule.status === "removed") continue;

    const rulePath = join(PLUGIN_DIR, "rules", rule.category, `${rule.name}.js`);
    const testPath = join(PLUGIN_DIR, "tests", rule.category, `${rule.name}.test.js`);
    const inConfig = oxlintConfig?.rules?.[`emul8/${rule.name}`] !== undefined;

    let hasIssue = false;
    let hasWarning = false;

    if (!existsSync(rulePath)) {
      problems.push({ rule: rule.name, issue: "Rule file missing", severity: "error" });
      hasIssue = true;
    }

    if (!existsSync(testPath)) {
      problems.push({ rule: rule.name, issue: "No test file", severity: "warn" });
      hasWarning = true;
    }

    if (!inConfig && rule.status !== "deprecated") {
      problems.push({ rule: rule.name, issue: "Not in oxlint.json", severity: "warn" });
      hasWarning = true;
    }

    if (rule.status === "experimental" && daysSince(rule.created) > 14) {
      problems.push({ rule: rule.name, issue: "Experimental > 14 days", severity: "warn" });
      hasWarning = true;
    }

    if (hasIssue) {
      issues++;
    } else if (hasWarning) {
      needsAttention++;
    } else {
      healthy++;
    }
  }

  console.log("Health Summary:");
  console.log(`  ${colors.green}✓ Healthy:${colors.reset}         ${healthy}`);
  console.log(`  ${colors.yellow}⚠ Needs attention:${colors.reset} ${needsAttention}`);
  console.log(`  ${colors.red}✗ Issues:${colors.reset}          ${issues}`);

  if (problems.length > 0) {
    log.header("Issues Found");

    const errors = problems.filter((p) => p.severity === "error");
    const warnings = problems.filter((p) => p.severity === "warn");

    if (errors.length > 0) {
      console.log(`${colors.red}Errors:${colors.reset}`);
      for (const p of errors) {
        console.log(`  ${p.rule}: ${p.issue}`);
      }
    }

    if (warnings.length > 0) {
      console.log(`${colors.yellow}Warnings:${colors.reset}`);
      for (const p of warnings) {
        console.log(`  ${p.rule}: ${p.issue}`);
      }
    }
  }
}

function printUsage(): void {
  log.header("Lint Governance Report");
  console.log("Usage: tsx scripts/lint-governance-report.ts [command] [options]");
  console.log("");
  console.log("Commands:");
  console.log("  report            Generate governance report (default)");
  console.log("  audit             Audit all rules");
  console.log("  audit <rule>      Audit specific rule");
  console.log("");
  console.log("Options:");
  console.log("  --markdown        Output report in markdown format");
  console.log("  --output <file>   Write report to file");
  console.log("");
  console.log("Examples:");
  console.log("  tsx scripts/lint-governance-report.ts");
  console.log("  tsx scripts/lint-governance-report.ts report --markdown");
  console.log("  tsx scripts/lint-governance-report.ts audit no-div-onclick");
}

function main(): void {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    printUsage();
    process.exit(0);
  }

  const command = args[0] || "report";
  const isMarkdown = args.includes("--markdown");
  const outputIdx = args.indexOf("--output");
  const outputFile = outputIdx !== -1 ? args[outputIdx + 1] : null;

  switch (command) {
    case "report": {
      const report = generateReport(isMarkdown ? "markdown" : "console");
      if (outputFile && report) {
        writeFileSync(outputFile, report);
        log.success(`Report written to ${outputFile}`);
      }
      break;
    }
    case "audit": {
      const ruleName = args[1] && !args[1].startsWith("--") ? args[1] : undefined;
      audit(ruleName);
      break;
    }
    default:
      log.error(`Unknown command: ${command}`);
      printUsage();
      process.exit(1);
  }
}

main();

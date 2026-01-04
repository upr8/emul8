---
description: Lint rule governance and auditing
argument-hint: <audit|promote|deprecate|severity|report> [args]
---

Run the lint-governance agent from `.claude/agents/lint-governance.md` to manage lint rule governance.

Commands:
- audit: Full audit of all rules
- audit <rule>: Audit specific rule
- promote <rule>: Promote experimental → active
- deprecate <rule>: Start deprecation workflow
- severity <rule> <level>: Change rule severity
- report: Generate governance report

Execute: $ARGUMENTS

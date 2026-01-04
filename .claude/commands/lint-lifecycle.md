---
description: Lint rule lifecycle management
argument-hint: <analyze|generate|test|deploy|report> [name]
---

Run the lint-lifecycle agent from `.claude/agents/lint-lifecycle.md` to manage lint rule lifecycle.

Commands:
- analyze: Scan review agents for automatable patterns
- generate <name>: Generate rule from template
- test <name>: Run tests for a rule
- deploy <name>: Add rule to oxlint.json
- report: Generate effectiveness report

Execute: $ARGUMENTS

---
description: Orchestrate all review agents with conflict resolution
argument-hint: <ComponentName> [--quick|--full|--focus=areas]
---

Run the coordinator agent from `.claude/agents/coordinator.md` to orchestrate a comprehensive review of $ARGUMENTS.

Execute the phases:
1. Foundation - Run component-review (blocking)
2. Quality - Run a11y, i18n, perf reviews in parallel
3. Platform - Run m3, hig, fluent reviews if --full
4. Resolution - Detect and resolve conflicts using `.claude/agents/conflicts.json`
5. Report - Generate unified findings with priorities

Parse options:
- --quick: Only critical checks
- --full: All agents including platform
- --focus=X: Specific areas (a11y, i18n, perf, platform)

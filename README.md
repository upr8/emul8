# Emul8

React UI component library that emulates native design systems. One codebase, multiple platforms.

## Install

```bash
pnpm add emul8
```

```tsx
import { Button, Stack, Flex } from 'emul8';
import 'emul8/styles';
```

## Features

- **Layout Primitives** - Box, Stack, Flex, Grid, Container, Sidebar, Cover, Frame
- **Atomic Design** - Strict hierarchy (layouts → atoms → molecules → organisms)
- **Platform Variants** - Material Design 3, Apple HIG, Microsoft Fluent
- **Accessibility** - WCAG 2.2 AA, enforced via 20+ lint rules
- **RTL Support** - Logical CSS properties, auto-fixable lint rules
- **SSR Safe** - No direct window/document access

## Development

```bash
pnpm install
pnpm storybook     # Dev server on :6006
pnpm build         # Build library
pnpm pre-commit    # Run all checks
```

## License

MIT

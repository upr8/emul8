import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { spacerVariants } from './Spacer.variants';

export interface SpacerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {}

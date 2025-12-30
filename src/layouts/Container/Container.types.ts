import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { containerVariants } from './Container.variants';

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

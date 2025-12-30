import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { clusterVariants } from './Cluster.variants';

export interface ClusterProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof clusterVariants> {
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}

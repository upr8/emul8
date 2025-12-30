import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Slot } from '../../utils/slot';
import type { ClusterProps } from './Cluster.types';
import { clusterVariants } from './Cluster.variants';

/**
 * Cluster arranges items in a flexible, wrapping layout.
 *
 * Perfect for groups of elements like tags, buttons, or navigation items
 * that should wrap naturally based on available space.
 */
export const Cluster = forwardRef<HTMLDivElement, ClusterProps>(
  ({ className, gap, justify, align, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(clusterVariants({ gap, justify, align }), className)}
        {...props}
      />
    );
  }
);

Cluster.displayName = 'Cluster';

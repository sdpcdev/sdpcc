import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * The SDPC design's `.card` primitive.
 *
 * Kept separate from the shadcn `Card` because the design uses tighter
 * padding and gaps than shadcn's defaults, and drives depth through the
 * `.elev-*` ring-plus-shadow tokens rather than a plain border.
 */
const panelVariants = cva(
    'flex flex-col rounded-xl bg-card text-card-foreground',
    {
        variants: {
            elevation: {
                sm: 'shadow-elev-sm',
                md: 'shadow-elev-md',
                lg: 'shadow-elev-lg',
                none: '',
            },
            padding: {
                none: '',
                sm: 'p-4',
                md: 'p-[18px]',
                lg: 'p-5',
            },
            gap: {
                none: '',
                sm: 'gap-2.5',
                md: 'gap-3',
                lg: 'gap-3.5',
            },
        },
        defaultVariants: {
            elevation: 'sm',
            padding: 'md',
            gap: 'md',
        },
    },
);

function Panel({
    className,
    elevation,
    padding,
    gap,
    ...props
}: React.ComponentProps<'div'> & VariantProps<typeof panelVariants>) {
    return (
        <div
            data-slot="panel"
            className={cn(
                panelVariants({ elevation, padding, gap }),
                className,
            )}
            {...props}
        />
    );
}

/**
 * The design's `.card-kicker` — an uppercase micro-label above panel content.
 */
function PanelKicker({ className, ...props }: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="panel-kicker"
            className={cn(
                'text-[11px] tracking-[0.08em] text-muted-foreground uppercase',
                className,
            )}
            {...props}
        />
    );
}

/**
 * Full-bleed hairline used to separate sections inside a panel.
 */
function PanelDivider({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="panel-divider"
            className={cn('h-px bg-divider', className)}
            {...props}
        />
    );
}

/**
 * The accent-washed panel the design uses for AI matching and live preview
 * sidebars.
 */
function PanelAccent({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <Panel
            elevation="md"
            className={cn(
                'bg-linear-160 from-primary/14 to-card to-60%',
                className,
            )}
            {...props}
        />
    );
}

export { Panel, PanelAccent, PanelDivider, PanelKicker, panelVariants };

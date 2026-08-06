import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * The SDPC design's `.tag` primitive — used for skills, statuses and filter
 * chips. Mirrors the design's `tag-accent`, `tag-neutral` and `tag-outline`
 * modifiers.
 */
const tagVariants = cva(
    'inline-flex w-fit shrink-0 items-center gap-1.5 rounded-md px-2 py-0.5 text-[11.5px] whitespace-nowrap [&>svg]:size-3',
    {
        variants: {
            variant: {
                accent: 'bg-primary/14 text-primary',
                neutral: 'bg-foreground/6 text-muted-foreground',
                outline: 'border border-divider text-muted-foreground',
            },
        },
        defaultVariants: {
            variant: 'neutral',
        },
    },
);

function Tag({
    className,
    variant,
    ...props
}: React.ComponentProps<'span'> & VariantProps<typeof tagVariants>) {
    return (
        <span
            data-slot="tag"
            className={cn(tagVariants({ variant }), className)}
            {...props}
        />
    );
}

export { Tag, tagVariants };

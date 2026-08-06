import { useId } from 'react';
import type { ReactNode } from 'react';

import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FieldProps = {
    label: string;
    /** Rendered under the label; use for the "one per line" style guidance. */
    hint?: string;
    error?: string;
    required?: boolean;
    className?: string;
    /**
     * Receives the id to bind to the control so the label stays associated
     * without every caller having to invent one.
     */
    children: (props: { id: string; 'aria-invalid': boolean }) => ReactNode;
};

/**
 * The SDPC design's `.field` wrapper — a label stacked over a control, with
 * validation output in the slot the design reserves beneath it.
 */
export default function Field({
    label,
    hint,
    error,
    required = false,
    className,
    children,
}: FieldProps) {
    const id = useId();

    return (
        <div className={cn('flex flex-col gap-1.5', className)}>
            <Label htmlFor={id} className="text-[12.5px]">
                {label}
                {required && (
                    <span className="text-primary" aria-hidden="true">
                        *
                    </span>
                )}
            </Label>

            {hint && (
                <p className="text-[11.5px] text-muted-foreground">{hint}</p>
            )}

            {children({ id, 'aria-invalid': Boolean(error) })}

            <InputError message={error} className="text-[11.5px]" />
        </div>
    );
}

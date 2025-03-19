import { cn } from '@/lib/utils';
import { type PropsWithChildren } from 'react';

export function Portfolio({ children, className }: PropsWithChildren<{ className?: string }>) {
    return (
        <div className={cn("flex h-screen flex-1 flex-col overflow-hidden", className)}>
            {children}
        </div>
    );
} 
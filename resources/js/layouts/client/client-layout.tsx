import { Link, usePage } from '@inertiajs/react';
import {
    BellIcon,
    ChatCircleIcon,
    GearSixIcon,
    UserCircleIcon,
} from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCurrentTeam } from '@/hooks/use-current-team';
import { cn } from '@/lib/utils';
import { dashboard as clientDashboard } from '@/routes/client';
import { edit as clientProfileEdit } from '@/routes/client-profile';
import { edit as profileEdit } from '@/routes/profile';
import { index as projectsIndex } from '@/routes/projects';
import { index as recruitIndex } from '@/routes/recruit';

type SharedProps = {
    auth?: { user?: { name: string; role: string } | null };
};

type NavItem = {
    label: string;
    href?: string;
    /** Set when the destination belongs to a module that is not built yet. */
    pending?: string;
};

export default function ClientLayout({ children }: { children: ReactNode }) {
    const page = usePage<SharedProps>();
    const team = useCurrentTeam();
    const user = page.props.auth?.user ?? null;

    const navigation: NavItem[] = [
        { label: 'Dashboard', href: clientDashboard.url(team.slug) },
        { label: 'Recruit', href: recruitIndex.url(team.slug) },
        { label: 'Transaction', pending: 'Arrives with the Payments module' },
        { label: 'Project Process', href: projectsIndex.url(team.slug) },
        { label: 'Agreement', pending: 'Arrives with the Contracts module' },
    ];

    return (
        <div className="min-h-screen bg-background text-[15px]">
            <header className="sticky top-0 z-20 bg-background/85 backdrop-blur-[10px]">
                <div className="mx-auto flex max-w-[1320px] items-center gap-6 px-8 py-3.5">
                    <Link
                        href={clientDashboard.url(team.slug)}
                        className="text-lg font-semibold tracking-[-0.02em] text-primary"
                    >
                        SDPCC
                    </Link>

                    <nav className="mx-auto flex items-center gap-[22px]">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.label}
                                item={item}
                                currentPath={page.url}
                            />
                        ))}
                    </nav>

                    {user && (
                        <span
                            className="rounded-md border border-divider px-2.5 py-1 text-xs text-muted-foreground capitalize"
                            title="Your account type"
                        >
                            {user.role}
                        </span>
                    )}

                    <div className="flex items-center gap-1.5 text-lg">
                        <IconAction
                            label="Messages"
                            pending="Arrives with the Messaging module"
                        >
                            <ChatCircleIcon />
                        </IconAction>
                        <IconAction
                            label="Notifications"
                            pending="Arrives with the Notifications module"
                        >
                            <BellIcon />
                        </IconAction>
                        <IconAction
                            label="Business profile"
                            href={clientProfileEdit.url(team.slug)}
                        >
                            <UserCircleIcon />
                        </IconAction>
                        <IconAction label="Settings" href={profileEdit.url()}>
                            <GearSixIcon />
                        </IconAction>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-divider to-transparent" />
            </header>

            <main>{children}</main>
        </div>
    );
}

function NavLink({
    item,
    currentPath,
}: {
    item: NavItem;
    currentPath: string;
}) {
    if (!item.href) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="cursor-not-allowed text-sm text-muted-foreground/60">
                        {item.label}
                    </span>
                </TooltipTrigger>
                <TooltipContent>{item.pending}</TooltipContent>
            </Tooltip>
        );
    }

    const isCurrent = currentPath.split('?')[0] === item.href.split('?')[0];

    return (
        <Link
            href={item.href}
            aria-current={isCurrent ? 'page' : undefined}
            className={cn(
                'py-1 text-sm transition-colors hover:text-primary',
                isCurrent ? 'text-primary' : 'text-foreground',
            )}
        >
            {item.label}
        </Link>
    );
}

function IconAction({
    label,
    href,
    pending,
    children,
}: {
    label: string;
    href?: string;
    pending?: string;
    children: ReactNode;
}) {
    const classes =
        'hover:bg-foreground/8 grid size-9 place-items-center rounded-md transition-colors';

    if (!href) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span
                        aria-label={label}
                        className={cn(
                            classes,
                            'cursor-not-allowed text-muted-foreground/60',
                        )}
                    >
                        {children}
                    </span>
                </TooltipTrigger>
                <TooltipContent>{pending}</TooltipContent>
            </Tooltip>
        );
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link href={href} aria-label={label} className={classes}>
                    {children}
                </Link>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    );
}

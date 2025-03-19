interface SocialButtonProps {
    icon: React.ReactNode;
    label: string;
    href: string;
}

export function SocialButton({ icon, label, href }: SocialButtonProps) {
    return (
        <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border/50 p-3 text-sm text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
        >
            {icon}
            {label}
        </a>
    );
} 
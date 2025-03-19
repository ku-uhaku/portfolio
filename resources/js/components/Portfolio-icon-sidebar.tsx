import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/lib/store';
import { FileIcon, SearchIcon, Code2Icon, HomeIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

interface SidebarIconProps {
    icon: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
}

const SidebarIcon = ({ icon, isActive, onClick }: SidebarIconProps) => (
    <Button
        variant="ghost"
        size="icon"
        className={cn(
            'relative h-12 w-12 rounded-none hover:bg-accent/50',
            'transition-colors duration-200 ease-in-out',
            isActive && [
                'bg-accent/50',
                'after:absolute after:left-0 after:top-0 after:h-full after:w-0.5 after:bg-primary',
            ]
        )}
        onClick={onClick}
    >
        {icon}
    </Button>
);

export function PortfolioIconSidebar() {
    const { activeView, setActiveView, openWebsitePreview } = useSidebarStore();
    const [isAuthenticated, setIsAuthenticated] = useState(false); // This should come from your auth state

    const handleHomeClick = () => {
        setActiveView('home');
        openWebsitePreview(); // This will open the website preview tab
    };

    return (
        <div className="flex h-screen w-12 flex-col border-r bg-muted/50">
            {/* Logo Section */}
            <div className="flex h-12 items-center justify-center border-b border-border/40">
                <Code2Icon className="h-6 w-6 text-primary" />
            </div>

            {/* Main Icons */}
            <div className="flex flex-1 flex-col items-center py-2 space-y-2">
                <SidebarIcon 
                    icon={<HomeIcon className="h-5 w-5 text-muted-foreground" />}
                    isActive={activeView === 'home'}
                    onClick={handleHomeClick}
                />
                <SidebarIcon 
                    icon={<FileIcon className="h-5 w-5 text-muted-foreground" />}
                    isActive={activeView === 'explorer'}
                    onClick={() => setActiveView('explorer')}
                />
                <SidebarIcon 
                    icon={<SearchIcon className="h-5 w-5 text-muted-foreground" />}
                    isActive={activeView === 'search'}
                    onClick={() => setActiveView('search')}
                />
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center py-2 border-t border-border/40">
                <Link href={isAuthenticated ? "/profile" : "/login"}>
                    <SidebarIcon 
                        icon={<UserIcon className="h-5 w-5 text-muted-foreground" />}
                        isActive={activeView === 'profile'}
                    />
                </Link>
            </div>
        </div>
    );
}

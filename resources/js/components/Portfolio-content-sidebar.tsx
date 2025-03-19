import { Input } from '@/components/ui/input';
import { useSidebar } from '@/components/ui/sidebar';
import { ChevronDownIcon, ChevronRightIcon, FileIcon, FolderIcon, SearchIcon, Code2Icon, HomeIcon, BookOpenIcon, BrainCircuitIcon, UserIcon, RocketIcon, MailIcon } from 'lucide-react';
import { useSidebarStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import type { FileItem } from '@/lib/store';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { scrollToSection } from '@/lib/utils/scroll';

interface ExplorerItemProps {
    item: FileItem;
    level?: number;
}

const ExplorerItem = ({ item, level = 0 }: ExplorerItemProps) => {
    const { openFolders, toggleFolder, activeFile, addOpenFile } = useSidebarStore();
    const Icon = item.type === 'folder' ? FolderIcon : FileIcon;
    const ChevronIcon = openFolders[item.id] ? ChevronDownIcon : ChevronRightIcon;
    const isOpen = openFolders[item.id];
    const isActive = activeFile === item.id;

    return (
        <>
            <div
                className={cn(
                    "group flex cursor-pointer items-center gap-1 p-1 hover:bg-accent/50 transition-colors duration-100",
                    isActive && "bg-accent/70",
                )}
                style={{ paddingLeft: `${level * 12 + 4}px` }}
                onClick={() => item.type === 'file' && addOpenFile(item.id)}
            >
                {item.type === 'folder' && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFolder(item.id);
                        }} 
                        className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ChevronIcon className="h-4 w-4" />
                    </button>
                )}
                {item.type === 'file' && <div className="w-4" />}
                <Icon className={cn(
                    "h-4 w-4",
                    item.type === 'folder' ? "text-blue-500/70" : "text-yellow-500/70",
                    "group-hover:text-foreground transition-colors"
                )} />
                <span className="text-sm text-foreground/90 group-hover:text-foreground transition-colors">
                    {item.name}
                </span>
            </div>
            {item.type === 'folder' && isOpen && item.children?.map((child) => (
                <ExplorerItem key={child.id} item={child} level={level + 1} />
            ))}
        </>
    );
};

const ExplorerView = () => {
    const { fileStructure } = useSidebarStore();

    return (
        <div className="flex h-full flex-col">
            <div className="flex h-12 items-center gap-2 border-b px-4">
                <Code2Icon className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium uppercase text-foreground/90">
                    Explorer
                </span>
            </div>
            <div className="scrollable flex-1">
                <div className="py-2 pr-1">
                    {fileStructure.map((item) => (
                        <ExplorerItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const SearchView = () => {
    return (
        <div className="flex h-full flex-col">
            <div className="flex h-12 items-center gap-2 border-b px-4">
                <SearchIcon className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium uppercase text-foreground/90">
                    Search
                </span>
            </div>
            <div className="p-4">
                <Input
                    type="text"
                    placeholder="Search..."
                    className="h-8"
                    prefix={<SearchIcon className="h-4 w-4 text-muted-foreground" />}
                />
            </div>
            <div className="px-4 py-2 text-xs text-muted-foreground">
                No search results
            </div>
        </div>
    );
};

interface SectionItem {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    path: string;
}

const HomeView = () => {
    const { activeFile } = useSidebarStore();

    const sections = [
        {
            id: 'hero',
            name: 'Hero',
            icon: <BookOpenIcon className="h-5 w-5" />,
            description: 'Landing section'
        },
        {
            id: 'about',
            name: 'About',
            icon: <UserIcon className="h-5 w-5" />,
            description: 'Personal info'
        },
        {
            id: 'skills',
            name: 'Skills',
            icon: <BrainCircuitIcon className="h-5 w-5" />,
            description: 'Technical expertise'
        },
        {
            id: 'projects',
            name: 'Projects',
            icon: <RocketIcon className="h-5 w-5" />,
            description: 'Featured work'
        },
  
    ];

    return (
        <div className="flex h-full flex-col">
            <div className="flex h-12 items-center gap-2 border-b px-4">
                <HomeIcon className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium uppercase text-foreground/90">
                    Portfolio
                </span>
            </div>
            <div className="scrollable flex-1">
                <div className="py-2 pr-1">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            onClick={() => {
                                if (activeFile === 'website-portfolio') {
                                    scrollToSection(section.id);
                                }
                            }}
                            className={cn(
                                "group flex cursor-pointer items-center gap-3 rounded-md p-2",
                                "transition-all duration-200 ease-in-out",
                                "hover:bg-accent/50"
                            )}
                        >
                            <div className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-md border",
                                "bg-background transition-colors",
                                "text-muted-foreground border-border",
                                "group-hover:border-primary/50 group-hover:text-primary"
                            )}>
                                {section.icon}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium">
                                    {section.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {section.description}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export function PortfolioContentSidebar() {
    const { open } = useSidebar();
    const { activeView } = useSidebarStore();

    if (!open) return null;

    return (
        <div className="flex h-screen w-60 flex-col border-r bg-muted/30">
            {activeView === 'explorer' ? <ExplorerView /> : 
             activeView === 'search' ? <SearchView /> :
             activeView === 'home' ? <HomeView /> : null}
        </div>
    );
}

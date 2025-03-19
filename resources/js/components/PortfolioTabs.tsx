import { useSidebarStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { X, HomeIcon, FileIcon } from 'lucide-react';
import { type FileItem } from '@/lib/store';

const findFileInStructure = (fileId: string, fileStructure: FileItem[]): FileItem | null => {
    for (const item of fileStructure) {
        if (item.type === 'folder') {
            for (const child of item.children || []) {
                if (child.type === 'folder') {
                    const found = (child.children || []).find(c => c.id === fileId);
                    if (found) return found;
                } else if (child.id === fileId) {
                    return child;
                }
            }
        } else if (item.id === fileId) {
            return item;
        }
    }
    return null;
};

export function PortfolioTabs() {
    const { fileStructure, activeFile, openFiles, setActiveFile, removeOpenFile } = useSidebarStore();

    const getTabInfo = (fileId: string) => {
        // Special case for website preview
        if (fileId === 'website-portfolio') {
            return {
                id: 'website-portfolio',
                name: 'Website Portfolio',
                type: 'preview',
                path: '/preview'
            };
        }

        // For regular files, search in file structure
        return findFileInStructure(fileId, fileStructure);
    };

    if (openFiles.length === 0) return null;

    return (
        <div className="flex w-full border-b bg-muted/30">
            <div className="flex h-12 items-center">
                {openFiles.map((fileId) => {
                    const tab = getTabInfo(fileId);
                    if (!tab) return null;
                    
                    return (
                        <div
                            key={tab.id}
                            className={cn(
                                "group relative flex h-full cursor-pointer items-center gap-2 border-r border-border/40 px-4",
                                "hover:bg-accent/50 transition-colors duration-100",
                                activeFile === tab.id && "bg-accent/70"
                            )}
                            onClick={() => setActiveFile(tab.id)}
                        >
                            <div className="flex items-center gap-2">
                                {tab.type === 'preview' ? (
                                    <HomeIcon className="h-4 w-4 text-primary" />
                                ) : (
                                    <FileIcon className="h-4 w-4 text-yellow-500/70" />
                                )}
                                <span className="text-sm text-foreground/90">
                                    {tab.name}
                                </span>
                            </div>
                            <button
                                className="ml-2 rounded-sm opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeOpenFile(tab.id);
                                }}
                            >
                                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            </button>
                            {activeFile === tab.id && (
                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="flex-1 border-b-[1px] border-border/40" />
        </div>
    );
} 
import { useSidebarStore } from '@/lib/store';
import { Code2Icon, FileIcon, GithubIcon, LinkedinIcon, MailIcon, Loader2, Edit2Icon, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Website from '@/components/Website';

interface QuickLinkProps {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
}

const QuickLink = ({ icon, text, onClick }: QuickLinkProps) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center gap-2 text-sm text-muted-foreground",
            "hover:text-foreground transition-colors duration-100"
        )}
    >
        {icon}
        <span>{text}</span>
    </button>
);

const CodeSkeleton = () => (
    <div className="animate-pulse p-4 space-y-3">
        <div className="space-y-2">
            <div className="h-4 w-3/4 bg-muted-foreground/10 rounded" />
            <div className="h-4 w-1/2 bg-muted-foreground/10 rounded" />
            <div className="h-4 w-2/3 bg-muted-foreground/10 rounded" />
        </div>
        <div className="space-y-2">
            <div className="h-4 w-5/6 bg-muted-foreground/10 rounded" />
            <div className="h-4 w-4/5 bg-muted-foreground/10 rounded" />
        </div>
    </div>
);

export function PortfolioContent() {
    const { 
        activeFile, 
        fileStructure, 
        getFileCache, 
        setFileCache,
        editMode,
        toggleEditMode,
        fileChanges,
        updateFileContent 
    } = useSidebarStore();
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Find the active file
    const findActiveFile = () => {
        for (const item of fileStructure) {
            if (item.type === 'folder') {
                for (const child of item.children || []) {
                    if (child.type === 'folder') {
                        const found = (child.children || []).find(c => c.id === activeFile);
                        if (found) return found;
                    } else if (child.id === activeFile) {
                        return child;
                    }
                }
            } else if (item.id === activeFile) {
                return item;
            }
        }
        return null;
    };

    const file = findActiveFile();

    useEffect(() => {
        setIsLoading(true);

        const loadFileContent = async () => {
            if (file?.path) {
                try {
                    const relativePath = `js${file.path}`.replace(/^\/+/, '');
                    
                    // Check cache first
                    const cachedContent = getFileCache(relativePath);
                    if (cachedContent) {
                        setFileContent(cachedContent);
                        setIsLoading(false);
                        return;
                    }

                    // If not in cache, fetch from server
                    const response = await fetch(`/api/file-content?path=${encodeURIComponent(relativePath)}`);
                    if (response.ok) {
                        const content = await response.text();
                        setFileContent(content);
                        // Save to cache
                        setFileCache(relativePath, content);
                    } else {
                        setFileContent(null);
                    }
                } catch (error) {
                    console.error('Error loading file:', error);
                    setFileContent(null);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setFileContent(null);
                setIsLoading(false);
            }
        };

        loadFileContent();
    }, [file?.path]);

    const handleSave = async () => {
        if (!file) return;
        
        setIsSaving(true);
        try {
            const response = await fetch('/api/file-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    path: `js${file.path}`.replace(/^\/+/, ''),
                    content: fileChanges[file.id] || fileContent
                }),
            });

            if (response.ok) {
                // Update cache with new content
                const newContent = fileChanges[file.id] || fileContent || '';
                setFileCache(file.path, newContent);
                setFileContent(newContent);
                toggleEditMode(file.id);
                // Show success toast or notification here if you have one
            } else {
                const error = await response.json();
                console.error('Error saving file:', error);
                // Show error toast or notification here if you have one
            }
        } catch (error) {
            console.error('Error saving file:', error);
            // Show error toast or notification here if you have one
        } finally {
            setIsSaving(false);
        }
    };

    if (activeFile === 'website-portfolio') {
        return (
            <div className="scrollable h-full w-full">
                <Website />
            </div>
        );
    }

    if (!file) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center bg-muted/10 px-4">
                <div className="flex max-w-[600px] flex-col items-center">
                    {/* Logo and Title */}
                    <Code2Icon className="h-16 w-16 text-primary/60" />
                    <h1 className="mt-6 text-3xl font-light text-foreground/80">Welcome to My Portfolio</h1>
                    
                    {/* Quick Links Section */}
                    <div className="mt-8 flex flex-col gap-6">
                        <div className="flex gap-16">
                            <div className="flex flex-col gap-3">
                                <h2 className="text-sm font-medium text-foreground/90">Start</h2>
                                <div className="flex flex-col gap-2">
                                    <QuickLink 
                                        icon={<FileIcon className="h-4 w-4" />}
                                        text="Open Project..."
                                    />
                                    <QuickLink 
                                        icon={<FileIcon className="h-4 w-4" />}
                                        text="Clone Repository..."
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-sm font-medium text-foreground/90">Recent</h2>
                                <div className="flex flex-col gap-2">
                                    <QuickLink 
                                        icon={<FileIcon className="h-4 w-4" />}
                                        text="Portfolio Website"
                                    />
                                    <QuickLink 
                                        icon={<FileIcon className="h-4 w-4" />}
                                        text="Dashboard Project"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-sm font-medium text-foreground/90">Connect</h2>
                            <div className="flex gap-4">
                                <QuickLink 
                                    icon={<GithubIcon className="h-4 w-4" />}
                                    text="GitHub"
                                />
                                <QuickLink 
                                    icon={<LinkedinIcon className="h-4 w-4" />}
                                    text="LinkedIn"
                                />
                                <QuickLink 
                                    icon={<MailIcon className="h-4 w-4" />}
                                    text="Contact"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 text-xs text-muted-foreground">
                        Built with React + TypeScript + Tailwind
                    </div>
                </div>
            </div>
        );
    }

    const getLanguage = (filename: string) => {
        const ext = filename.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'ts':
            case 'tsx':
                return 'typescript';
            case 'js':
            case 'jsx':
                return 'javascript';
            case 'css':
                return 'css';
            case 'html':
                return 'html';
            case 'json':
                return 'json';
            case 'md':
                return 'markdown';
            default:
                return 'typescript'; // Default to typescript for this project
        }
    };

    return (
        <div className="scrollable h-full w-full bg-background">
            <div className="h-full w-full p-4">
                <div className="flex h-full w-full flex-col overflow-auto">
                    <div className="flex-1 p-4">
                        <div className="h-full w-full rounded-lg border bg-card">
                            {!isLoading && fileContent ? (
                                <>
                                    <div className="flex items-center justify-between border-b px-4 py-2">
                                        <span className="text-sm text-muted-foreground">
                                            {file.name}
                                        </span>
                                        <div className="flex gap-2">
                                            {editMode[file.id] ? (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={handleSave}
                                                        disabled={isSaving}
                                                        className="h-8 px-2"
                                                    >
                                                        {isSaving ? (
                                                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                                        ) : (
                                                            <Save className="h-4 w-4 mr-1" />
                                                        )}
                                                        {isSaving ? 'Saving...' : 'Save'}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => toggleEditMode(file.id)}
                                                        disabled={isSaving}
                                                        className="h-8 px-2"
                                                    >
                                                        <X className="h-4 w-4 mr-1" />
                                                        Cancel
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleEditMode(file.id)}
                                                    className="h-8 px-2"
                                                >
                                                    <Edit2Icon className="h-4 w-4 mr-1" />
                                                    Edit
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    {editMode[file.id] ? (
                                        <Textarea
                                            className="min-h-[calc(100vh-12rem)] w-full rounded-none border-0 bg-transparent p-4 font-mono text-sm"
                                            value={fileChanges[file.id] || fileContent}
                                            onChange={(e) => updateFileContent(file.id, e.target.value)}
                                        />
                                    ) : (
                                        <SyntaxHighlighter
                                            language={getLanguage(file.name)}
                                            style={vscDarkPlus}
                                            customStyle={{
                                                margin: 0,
                                                borderRadius: '0.5rem',
                                                background: 'transparent',
                                            }}
                                            showLineNumbers
                                            wrapLines
                                            wrapLongLines
                                        >
                                            {fileChanges[file.id] || fileContent}
                                        </SyntaxHighlighter>
                                    )}
                                </>
                            ) : (
                                <div className="flex h-full flex-col">
                                    <div className="flex items-center gap-2 border-b px-4 py-2 text-sm text-muted-foreground">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Loading {file.name}...</span>
                                    </div>
                                    <CodeSkeleton />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
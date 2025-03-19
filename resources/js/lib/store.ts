import { create } from 'zustand';

export interface FileItem {
    id: string;
    name: string;
    type: 'file' | 'folder' | 'preview';
    children?: FileItem[];
    path: string;
    extension?: string;
}

interface FileCache {
    [path: string]: {
        content: string;
        timestamp: number;
    };
}

interface SidebarStore {
    activeView: 'home' | 'explorer' | 'search';
    setActiveView: (view: 'home' | 'explorer' | 'search') => void;
    openFolders: Record<string, boolean>;
    toggleFolder: (folderId: string) => void;
    activeFile: string | null;
    setActiveFile: (fileId: string | null) => void;
    openFiles: string[];
    addOpenFile: (fileId: string) => void;
    removeOpenFile: (fileId: string) => void;
    fileStructure: FileItem[];
    setFileStructure: (files: FileItem[]) => void;
    fetchFileStructure: () => Promise<void>;
    fileCache: FileCache;
    setFileCache: (path: string, content: string) => void;
    getFileCache: (path: string) => string | null;
    editMode: Record<string, boolean>;
    toggleEditMode: (fileId: string) => void;
    fileChanges: Record<string, string>;
    updateFileContent: (fileId: string, content: string) => void;
    openWebsitePreview: () => void;
}

const defaultFileStructure: FileItem[] = [
    {
        id: 'components',
        name: 'components',
        type: 'folder',
        path: '/components',
        children: [
            {
                id: 'ui',
                name: 'ui',
                type: 'folder',
                path: '/components/ui',
                children: [
                    {
                        id: 'button',
                        name: 'button.tsx',
                        type: 'file',
                        path: '/components/ui/button.tsx',
                        extension: 'tsx'
                    },
                    {
                        id: 'input',
                        name: 'input.tsx',
                        type: 'file',
                        path: '/components/ui/input.tsx',
                        extension: 'tsx'
                    }
                ]
            },
            {
                id: 'icon-sidebar',
                name: 'Portfolio-icon-sidebar.tsx',
                type: 'file',
                path: '/components/Portfolio-icon-sidebar.tsx',
                extension: 'tsx'
            },
            {
                id: 'content-sidebar',
                name: 'Portfolio-content-sidebar.tsx',
                type: 'file',
                path: '/components/Portfolio-content-sidebar.tsx',
                extension: 'tsx'
            }
        ]
    },
    {
        id: 'layouts',
        name: 'layouts',
        type: 'folder',
        path: '/layouts',
        children: [
            {
                id: 'portfolio-layout',
                name: 'portfolio-layout.tsx',
                type: 'file',
                path: '/layouts/portfolio-layout.tsx',
                extension: 'tsx'
            }
        ]
    },
    {
        id: 'sections',
        name: 'sections',
        type: 'folder',
        path: '/sections',
        children: [
            {
                id: 'hero',
                name: 'Hero Section',
                type: 'file',
                path: '/sections/hero.tsx',
                extension: 'tsx'
            },
            {
                id: 'about',
                name: 'About Me',
                type: 'file',
                path: '/sections/about.tsx',
                extension: 'tsx'
            },
            {
                id: 'skills',
                name: 'Skills & Expertise',
                type: 'file',
                path: '/sections/skills.tsx',
                extension: 'tsx'
            },
            {
                id: 'projects',
                name: 'Projects',
                type: 'file',
                path: '/sections/projects.tsx',
                extension: 'tsx'
            },
    
        ]
    },
    {
        id: 'website',
        name: 'website',
        type: 'folder',
        path: '/website',
        children: [
            {
                id: 'website-main',
                name: 'website.tsx',
                type: 'file',
                path: '/website/website.tsx',
                extension: 'tsx'
            },
            {
                id: 'website-hero',
                name: 'hero.tsx',
                type: 'file',
                path: '/website/hero.tsx',
                extension: 'tsx'
            },
            {
                id: 'website-about',
                name: 'about.tsx',
                type: 'file',
                path: '/website/about.tsx',
                extension: 'tsx'
            },
            {
                id: 'website-skills',
                name: 'skills.tsx',
                type: 'file',
                path: '/website/skills.tsx',
                extension: 'tsx'
            },
            {
                id: 'website-projects',
                name: 'projects.tsx',
                type: 'file',
                path: '/website/projects.tsx',
                extension: 'tsx'
            },
            {
                id: 'website-contact',
                name: 'contact.tsx',
                type: 'file',
                path: '/website/contact.tsx',
                extension: 'tsx'
            }
        ]
    }
];

export const useSidebarStore = create<SidebarStore>((set, get) => ({
    activeView: 'home',
    setActiveView: (view) => set({ activeView: view }),
    openFolders: { components: true },
    toggleFolder: (folderId) => 
        set((state) => ({ 
            openFolders: { 
                ...state.openFolders, 
                [folderId]: !state.openFolders[folderId] 
            } 
        })),
    activeFile: null,
    setActiveFile: (fileId) => set({ activeFile: fileId }),
    openFiles: [],
    addOpenFile: (fileId) => 
        set((state) => {
            if (!state.openFiles.includes(fileId)) {
                return { 
                    openFiles: [...state.openFiles, fileId],
                    activeFile: fileId 
                };
            }
            return { activeFile: fileId };
        }),
    removeOpenFile: (fileId) =>
        set((state) => {
            const newOpenFiles = state.openFiles.filter(id => id !== fileId);
            return { 
                openFiles: newOpenFiles,
                activeFile: state.activeFile === fileId 
                    ? newOpenFiles[newOpenFiles.length - 1] || null 
                    : state.activeFile
            };
        }),
    fileStructure: [],
    setFileStructure: (files) => set({ fileStructure: files }),
    fetchFileStructure: async () => {
        try {
            const response = await fetch('/api/files');
            const data = await response.json();
            set({ fileStructure: data });
        } catch (error) {
            console.error('Failed to fetch file structure:', error);
        }
    },
    fileCache: {},
    setFileCache: (path, content) => 
        set((state) => ({
            fileCache: {
                ...state.fileCache,
                [path]: {
                    content,
                    timestamp: Date.now()
                }
            }
        })),
    getFileCache: (path) => {
        const cache = get().fileCache[path];
        if (!cache) return null;
        
        // Cache expires after 5 minutes
        if (Date.now() - cache.timestamp > 5 * 60 * 1000) {
            return null;
        }
        
        return cache.content;
    },
    editMode: {},
    toggleEditMode: (fileId) => 
        set((state) => ({
            editMode: {
                ...state.editMode,
                [fileId]: !state.editMode[fileId]
            }
        })),
    fileChanges: {},
    updateFileContent: (fileId, content) =>
        set((state) => ({
            fileChanges: {
                ...state.fileChanges,
                [fileId]: content
            }
        })),
    openWebsitePreview: () => {
        set(state => ({
            openFiles: state.openFiles.includes('website-portfolio') 
                ? state.openFiles 
                : [...state.openFiles, 'website-portfolio'],
            activeFile: 'website-portfolio'
        }));
    },
})); 
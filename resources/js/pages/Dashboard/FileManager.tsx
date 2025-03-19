import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { 
    FolderIcon, 
    FileIcon, 
    PlusIcon, 
    TrashIcon,
    FolderPlusIcon,
    FilePlusIcon,
    ChevronUpIcon,
    ChevronDownIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface FileItem {
    id: string;
    name: string;
    type: 'file' | 'folder';
    path: string;
    extension?: string;
    created_at: string;
    updated_at: string;
    size?: number;
}

export default function FileManager() {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        type: 'file' as 'file' | 'folder',
        path: '',
        extension: '',
        parent_id: null as string | null
    });
    const [sortField, setSortField] = useState<keyof FileItem>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await fetch('/api/files');
            const data = await response.json();
            setFiles(data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load files');
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/files', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                toast.success('Item created successfully');
                fetchFiles();
                setIsOpen(false);
                setNewItem({
                    name: '',
                    type: 'file',
                    path: '',
                    extension: '',
                    parent_id: null
                });
            }
        } catch (error) {
            toast.error('Failed to create item');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await fetch(`/api/files/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success('Item deleted successfully');
                    fetchFiles();
                }
            } catch (error) {
                toast.error('Failed to delete item');
            }
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatSize = (bytes?: number) => {
        if (!bytes) return '-';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    };

    const handleSort = (field: keyof FileItem) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedFiles = [...files].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const SortIcon = ({ field }: { field: keyof FileItem }) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? 
            <ChevronUpIcon className="h-4 w-4 inline ml-1" /> : 
            <ChevronDownIcon className="h-4 w-4 inline ml-1" />;
    };

    return (
        <AppSidebarLayout>
            <div className="flex h-full flex-col">
                <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="flex items-center justify-between p-4">
                        <h1 className="text-2xl font-bold">File Manager</h1>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    New Item
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create New Item</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleCreate} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Type</label>
                                        <Select
                                            value={newItem.type}
                                            onValueChange={(value: 'file' | 'folder') => 
                                                setNewItem({ ...newItem, type: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="file">
                                                    <div className="flex items-center gap-2">
                                                        <FilePlusIcon className="h-4 w-4" />
                                                        <span>File</span>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="folder">
                                                    <div className="flex items-center gap-2">
                                                        <FolderPlusIcon className="h-4 w-4" />
                                                        <span>Folder</span>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Name</label>
                                        <Input
                                            value={newItem.name}
                                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                            placeholder={`Enter ${newItem.type} name`}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Path</label>
                                        <Input
                                            value={newItem.path}
                                            onChange={(e) => setNewItem({ ...newItem, path: e.target.value })}
                                            placeholder="Enter path"
                                            required
                                        />
                                    </div>

                                    {newItem.type === 'file' && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Extension</label>
                                            <Input
                                                value={newItem.extension}
                                                onChange={(e) => setNewItem({ ...newItem, extension: e.target.value })}
                                                placeholder="e.g., tsx, md, json"
                                            />
                                        </div>
                                    )}

                                    <div className="flex justify-end">
                                        <Button type="submit">
                                            Create {newItem.type}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-6">
                    <div className="rounded-lg border">
                        {loading ? (
                            <div className="text-center py-4">Loading...</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead 
                                            className="w-[300px] cursor-pointer"
                                            onClick={() => handleSort('name')}
                                        >
                                            Name <SortIcon field="name" />
                                        </TableHead>
                                        <TableHead 
                                            className="cursor-pointer"
                                            onClick={() => handleSort('type')}
                                        >
                                            Type <SortIcon field="type" />
                                        </TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead 
                                            className="cursor-pointer"
                                            onClick={() => handleSort('updated_at')}
                                        >
                                            Modified <SortIcon field="updated_at" />
                                        </TableHead>
                                        <TableHead className="w-[100px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedFiles.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    {item.type === 'folder' ? (
                                                        <FolderIcon className="h-5 w-5 text-blue-500" />
                                                    ) : (
                                                        <FileIcon className="h-5 w-5 text-gray-500" />
                                                    )}
                                                    {item.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                            </TableCell>
                                            <TableCell>{formatSize(item.size)}</TableCell>
                                            <TableCell>{formatDate(item.updated_at)}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <TrashIcon className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
} 
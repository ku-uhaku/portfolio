import { useState, useEffect } from 'react';
import { Terminal, X, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TerminalFooter() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.shiftKey && e.key.toLowerCase() === 'j') {
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <>
            {/* Terminal Button */}
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className={`fixed bottom-4 right-4 z-50 rounded-lg border bg-card p-2 shadow-lg transition-colors hover:bg-accent/50 ${
                    isOpen ? 'bg-accent/50' : ''
                }`}
            >
                <Terminal className="h-5 w-5" />
            </button>

            {/* Terminal Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                            height: isMaximized ? '100vh' : 'auto', 
                            opacity: 1 
                        }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`fixed bottom-0 left-0 right-0 z-40 border-t bg-card shadow-lg ${
                            isMaximized ? 'top-0' : ''
                        }`}
                    >
                        {/* Terminal Header */}
                        <div className="flex h-10 items-center justify-between border-b bg-muted/50 px-4">
                            <div className="flex items-center gap-2">
                                <Terminal className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium text-muted-foreground">
                                    Terminal
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsMaximized(prev => !prev)}
                                    className="rounded p-1 hover:bg-accent/50"
                                >
                                    {isMaximized ? (
                                        <Minimize2 className="h-4 w-4" />
                                    ) : (
                                        <Maximize2 className="h-4 w-4" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded p-1 hover:bg-accent/50"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Terminal Content */}
                        <div className={`p-4 font-mono ${isMaximized ? 'h-[calc(100vh-2.5rem)]' : 'h-[300px]'} overflow-auto`}>
                            <div className="space-y-4">
                                {/* Command History */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary">$</span>
                                        <span className="text-sm">whoami</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground pl-6">
                                        Full-stack Developer | Open Source Enthusiast
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary">$</span>
                                        <span className="text-sm">cat social_links.txt</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground pl-6 space-y-1">
                                        <div>GitHub: github.com/yourusername</div>
                                        <div>Twitter: @yourusername</div>
                                        <div>LinkedIn: linkedin.com/in/yourusername</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary">$</span>
                                        <span className="text-sm">echo $COPYRIGHT</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground pl-6">
                                        © {new Date().getFullYear()} Your Name. All rights reserved.
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary">$</span>
                                        <span className="text-sm">cat tech_stack.txt</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground pl-6">
                                        React • TypeScript • Node.js • Laravel • Next.js • TailwindCSS
                                    </div>
                                </div>

                                {/* Current Command */}
                                <div className="flex items-center gap-2">
                                    <span className="text-primary">$</span>
                                    <span className="text-sm animate-pulse">█</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
} 
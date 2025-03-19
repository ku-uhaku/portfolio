import { Terminal, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatJSON } from '../utils/formatters';
import { userInfo } from '../data/userInfo';
import { StatusMonitor } from './StatusMonitor';
import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

export function HeroSection() {
    const typedRef = useRef(null);
    const contentRef = useRef(null);
    const [displayMode, setDisplayMode] = useState<'json' | 'formatted' | 'yaml'>('json');
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
        const typed = new Typed(typedRef.current, {
            strings: [
                'cat developer_info.json',
                'Loading profile...',
                'cat developer_info.yaml',
                'Loading profile...',
                'cat developer_info.formatted',
                'Loading profile...',
                'cat developer_info.json'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1000,
            startDelay: 500,
            showCursor: true,
            cursorChar: '█',
            onStringTyped: (arrayPos) => {
                // Update display mode based on the typed command
                if (arrayPos === 0) setDisplayMode('json');
                if (arrayPos === 2) setDisplayMode('yaml');
                if (arrayPos === 4) setDisplayMode('formatted');
                if (arrayPos === 6) setDisplayMode('json');
            },
            onComplete: (self) => {
                setIsTypingComplete(true);
                self.cursor.style.display = 'inline-block';
            }
        });

        return () => typed.destroy();
    }, []);

    const formatData = () => {
        switch (displayMode) {
            case 'json':
                return formatJSON(userInfo);
            case 'formatted':
                return formatTextView(userInfo);
            case 'yaml':
                return formatYAML(userInfo);
            default:
                return formatJSON(userInfo);
        }
    };

    const formatTextView = (data: typeof userInfo) => {
        return `
==============================================
| DEVELOPER PROFILE
==============================================
Name: ${data.name}
Title: ${data.title}
Location: ${data.location}

Skills:
${data.skills.map(skill => `  • ${skill}`).join('\n')}

Current Status: ${data.currentStatus}

Links:
  • GitHub: ${data.links.github}
  • Twitter: ${data.links.twitter}
  • Portfolio: ${data.links.portfolio}

Interests:
${data.interests.map(interest => `  • ${interest}`).join('\n')}
==============================================`;
    };

    const formatYAML = (data: typeof userInfo) => {
        return `
developer:
  name: ${data.name}
  title: ${data.title}
  location: ${data.location}

skills:
${data.skills.map(skill => `  - ${skill}`).join('\n')}

status: ${data.currentStatus}

links:
  github: ${data.links.github}
  twitter: ${data.links.twitter}
  portfolio: ${data.links.portfolio}

interests:
${data.interests.map(interest => `  - ${interest}`).join('\n')}`;
    };

    return (
        <div className="flex h-full items-center justify-center p-6">
            <div className="container flex max-w-[1400px] gap-6">
                {/* Left Terminal */}
                <div className="w-1/2">
                    <div className="h-[600px] rounded-lg border bg-card shadow-lg">
                        <div className="flex h-12 items-center gap-2 rounded-t-lg border-b bg-muted/50 px-4">
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                                <div className="h-3 w-3 rounded-full bg-green-500/60" />
                            </div>
                            <div className="flex-1 text-center text-sm font-medium text-muted-foreground">
                                developer_info.{displayMode}
                            </div>
                        </div>
                        <div className="h-[calc(100%-3rem)] overflow-auto p-4 font-mono text-sm">
                            <div className="flex items-center gap-2 text-primary mb-4">
                                <Terminal className="h-4 w-4" />
                                <span ref={typedRef}></span>
                            </div>
                            
                            {/* Format Selection Buttons - Only show after typing is complete */}
                            {isTypingComplete && (
                                <div className="flex gap-2 mb-4">
                                    <button
                                        onClick={() => setDisplayMode('json')}
                                        className={`px-3 py-1 rounded-md text-xs ${
                                            displayMode === 'json' ? 'bg-primary text-primary-foreground' : 'bg-muted/30'
                                        }`}
                                    >
                                        .json
                                    </button>
                                    <button
                                        onClick={() => setDisplayMode('formatted')}
                                        className={`px-3 py-1 rounded-md text-xs ${
                                            displayMode === 'formatted' ? 'bg-primary text-primary-foreground' : 'bg-muted/30'
                                        }`}
                                    >
                                        .formatted
                                    </button>
                                    <button
                                        onClick={() => setDisplayMode('yaml')}
                                        className={`px-3 py-1 rounded-md text-xs ${
                                            displayMode === 'yaml' ? 'bg-primary text-primary-foreground' : 'bg-muted/30'
                                        }`}
                                    >
                                        .yaml
                                    </button>
                                </div>
                            )}

                            <motion.pre 
                                key={displayMode}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 h-[calc(100%-2rem)] overflow-auto rounded-lg bg-muted/30 p-4 text-muted-foreground"
                                dangerouslySetInnerHTML={{ 
                                    __html: formatData()
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* Right Terminal */}
                <StatusMonitor />
            </div>
        </div>
    );
} 
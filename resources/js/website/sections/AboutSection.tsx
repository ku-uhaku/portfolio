import { motion } from 'framer-motion';
import { Terminal, Code2, Rocket, Brain, Coffee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { personalData } from '../data/userInfo';
import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">{label}</span>
                <span className="text-muted-foreground">{value}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted/30">
                <motion.div
                    className={`h-full rounded-full ${color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                />
            </div>
        </div>
    );
}

export function AboutSection() {
    const typedRef = useRef(null);
    const contentRef = useRef(null);
    const sectionRef = useRef(null);
    const [hasStartedTyping, setHasStartedTyping] = useState(false);

    useEffect(() => {
        let typed: Typed | null = null;
        
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasStartedTyping) {
                    console.log('Section is visible, starting typing...');
                    setHasStartedTyping(true);
                    
                    setTimeout(() => {
                        if (typedRef.current) {
                            startTyping();
                        }
                    }, 100);
                }
            },
            { 
                threshold: 0.1,
                rootMargin: '0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        function startTyping() {
            console.log('Starting typing animation...');
            typed = new Typed(typedRef.current, {
                strings: [
                    'cat about.txt',
                    'Loading personal info...',
                    'Decrypting data...',
                    'cat about.txt'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 1000,
                startDelay: 100,
                showCursor: true,
                cursorChar: '█',
                onComplete: (self) => {
                    console.log('Command typing complete, starting content...');
                    self.cursor.style.display = 'inline-block';
                    startContentTyping();
                }
            });
        }

        function startContentTyping() {
            const contentTyped = new Typed(contentRef.current, {
                strings: [
                    `Hello! I'm a passionate developer with ${personalData.experience.years} years of experience in creating elegant and efficient web solutions.^1000\n\n
                    My expertise includes:^500\n
                    • Frontend Development^300\n
                    • Backend Architecture^300\n
                    • UI/UX Design^300\n
                    • Performance Optimization^1000\n\n
                    Let's build something amazing together!`
                ],
                typeSpeed: 30,
                showCursor: true,
                cursorChar: '█',
                startDelay: 500,
                onComplete: (self) => {
                    self.cursor.style.display = 'inline-block';
                }
            });

            return () => contentTyped.destroy();
        }

        return () => {
            observer.disconnect();
            if (typed) {
                typed.destroy();
            }
        };
    }, [hasStartedTyping]);

    const skills = [
        { label: "Frontend Development", value: 90, color: "bg-blue-500" },
        { label: "Backend Development", value: 85, color: "bg-green-500" },
        { label: "UI/UX Design", value: 80, color: "bg-purple-500" },
        { label: "DevOps", value: 75, color: "bg-orange-500" }
    ];

    return (
        <div 
            className="flex h-full items-center justify-center p-6 min-h-screen" 
            ref={sectionRef}
        >
            <div className="container flex max-w-[1400px] gap-8">
                {/* Left Side - Terminal Window */}
                <motion.div 
                    className="w-1/2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="h-[600px] rounded-lg border bg-card shadow-lg">
                        <div className="flex h-12 items-center gap-2 rounded-t-lg border-b bg-muted/50 px-4">
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                                <div className="h-3 w-3 rounded-full bg-green-500/60" />
                            </div>
                            <div className="flex-1 text-center text-sm font-medium text-muted-foreground">
                                about.txt
                            </div>
                        </div>
                        <div className="h-[calc(100%-3rem)] overflow-auto p-6 font-mono">
                            <div className="flex items-center gap-2 text-primary mb-4">
                                <Terminal className="h-4 w-4" />
                                <span ref={typedRef}></span>
                            </div>
                            <div className="space-y-6 text-muted-foreground pl-6">
                                <span ref={contentRef}></span>
                            </div>

                            {/* Skills badges will appear after typing */}
                            <motion.div 
                                className="mt-8 space-y-2"
                                initial={{ opacity: 0 }}
                                animate={hasStartedTyping ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 8 }}
                            >
                                <p className="text-primary">Technical Skills:</p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline">React</Badge>
                                    <Badge variant="outline">TypeScript</Badge>
                                    <Badge variant="outline">Node.js</Badge>
                                    <Badge variant="outline">Next.js</Badge>
                                    <Badge variant="outline">TailwindCSS</Badge>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="mt-6 space-y-2"
                                initial={{ opacity: 0 }}
                                animate={hasStartedTyping ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 9 }}
                            >
                                <p className="text-primary">Experience:</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>{personalData.experience.projects}+ Projects Completed</li>
                                    <li>{personalData.experience.clients}+ Happy Clients</li>
                                    <li>{personalData.experience.contributions}+ Open Source Contributions</li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side - Info Cards */}
                <motion.div 
                    className="w-1/2 grid grid-cols-2 gap-4 content-center"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    {/* Info Cards */}
                    <InfoCard
                        icon={<Code2 className="h-8 w-8" />}
                        title="Development"
                        description="Specialized in modern web technologies and frameworks"
                        color="bg-blue-500/10 hover:bg-blue-500/20"
                        iconColor="text-blue-500"
                    />
                    <InfoCard
                        icon={<Rocket className="h-8 w-8" />}
                        title="Performance"
                        description="Focus on building fast and scalable applications"
                        color="bg-green-500/10 hover:bg-green-500/20"
                        iconColor="text-green-500"
                    />
                    <InfoCard
                        icon={<Brain className="h-8 w-8" />}
                        title="Problem Solving"
                        description="Creative solutions to complex challenges"
                        color="bg-purple-500/10 hover:bg-purple-500/20"
                        iconColor="text-purple-500"
                    />
                    <InfoCard
                        icon={<Coffee className="h-8 w-8" />}
                        title="Passion"
                        description="Dedicated to continuous learning and improvement"
                        color="bg-orange-500/10 hover:bg-orange-500/20"
                        iconColor="text-orange-500"
                    />
                </motion.div>
            </div>
        </div>
    );
}

function InfoCard({ 
    icon, 
    title, 
    description, 
    color, 
    iconColor 
}: { 
    icon: React.ReactNode; 
    title: string; 
    description: string; 
    color: string;
    iconColor: string;
}) {
    return (
        <motion.div 
            className={`rounded-lg ${color} p-6 transition-all duration-300 hover:scale-105`}
            whileHover={{ y: -5 }}
        >
            <div className={`mb-4 ${iconColor}`}>
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </motion.div>
    );
} 
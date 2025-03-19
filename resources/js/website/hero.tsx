import { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Terminal } from 'lucide-react';
import { 
    Rocket as RocketIcon, 
    Download as DownloadIcon, 
    GitFork as GitForkIcon, 
    GitCommit as GitCommitIcon,
    Github as GithubIcon,
    MessageSquare as DiscordIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon,
    Activity as ActivityIcon,
    Zap as ZapIcon,
    Code2 as CodeIcon,
    Calendar as CalendarIcon,
    Linkedin as LinkedinIcon,
    FileDown as CVIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Element, Link as ScrollLink } from 'react-scroll';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactSection } from './sections/ContactSection';
import { SkillsSection } from './sections/SkillsSection';

// Add this function for JSON syntax highlighting
function formatJSON(json: any) {
    const jsonString = JSON.stringify(json, null, 2);
    return jsonString.replace(
        /(".*?":|{|\[|\]|}|".*?")/g,
        (match) => {
            if (match.startsWith('"') && match.endsWith('":')) {
                // Key
                return `<span class="text-blue-400">${match}</span>`;
            } else if (match.startsWith('"')) {
                // String value
                return `<span class="text-green-400">${match}</span>`;
            } else if (match === '{' || match === '}' || match === '[' || match === ']') {
                // Brackets
                return `<span class="text-yellow-500">${match}</span>`;
            }
            return match;
        }
    );
}

const userInfo = {
    name: "kuuhaku",
    title: "Developer & Gamer",
    location: "Your Location",
    skills: [
        "Frontend Developer",
        "React Specialist",
        "TypeScript Enthusiast",
        "UI/UX Designer"
    ],

    currentStatus: "Coding something amazing...",
    links: {
        github: "github.com/kuuhaku",
        twitter: "@kuuhaku",
        portfolio: "kuuhaku.dev"
    },
    interests: [
        "Open Source",
        "Game Development",
        "UI/UX Design",
        "New Technologies"
    ],

};

// Add this data for the charts
const generateTimeData = () => {
    return Array.from({ length: 24 }, (_, i) => ({
        time: i,
        value: Math.floor(Math.random() * 100)
    }));
};

const monitoringData = {
    cpu: generateTimeData(),
    memory: generateTimeData(),
    uptime: "99.9%",
    lastDeploy: "2 hours ago",
    status: "Operational"
};

// Your personal data
const personalData = {
    experience: {
        years: 3,
        projects: 15,
        clients: 10,
        contributions: 156
    },
    social: {
        github: "github.com/kuuhaku",
        twitter: "@kuuhaku",
        instagram: "@kuuhaku.dev",
        linkedin: "linkedin.com/in/kuuhaku"
    },
    skills: {
        frontend: 92,
        backend: 85,
        devops: 78,
        mobile: 88
    },
    cv: {
        downloads: 124,
        lastUpdated: "2024-01"
    }
};

const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
];

export default function Hero() {
    // Add ref for the scroll container
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="h-screen w-full overflow-hidden bg-background">
            <div className="relative flex h-full w-full border-l border-r">
                {/* Navigation Dots */}
                <div className="fixed right-8 top-1/2 z-50 -translate-y-1/2">
                    <div className="flex flex-col gap-4">
                        {sections.map((section) => (
                            <ScrollLink
                                key={section.id}
                                to={section.id}
                                spy={true}
                                smooth={true}
                                duration={500}
                                containerId="scrollContainer"
                                activeClass="active"
                                className="group relative cursor-pointer"
                            >
                                {/* Label tooltip */}
                                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-background px-2 py-1 text-sm opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                                    {section.label}
                                </span>
                                {/* Navigation dot */}
                                <div className="h-3 w-3 rounded-full border-2 border-primary/50 bg-background transition-all duration-200 
                                    group-hover:scale-125 group-hover:border-primary 
                                    [&.active]:scale-125 [&.active]:border-primary [&.active]:bg-primary" 
                                />
                            </ScrollLink>
                        ))}
                    </div>
                </div>

                {/* Content with snap scrolling */}
                <div 
                    id="scrollContainer"
                    ref={scrollContainerRef}
                    className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
                >
                    <Element name="hero" className="h-screen w-full snap-start">
                        <div className="h-full">
                            <HeroSection />
                        </div>
                    </Element>

                    <Element name="about" className="min-h-screen w-full snap-start border-t">
                        <AboutSection />
                    </Element>

                    <Element name="skills" className="h-screen w-full snap-start border-t">
                        <SkillsSection />
                    </Element>

                    <Element name="projects" className="h-screen w-full snap-start border-t">
                        <div className="h-full">
                            <ProjectsSection />
                        </div>
                    </Element>

                    <Element name="contact" className="h-screen w-full snap-start border-t">
                        <div className="h-full">
                            <ContactSection />
                        </div>
                    </Element>
                </div>
            </div>
        </div>
    );
}

function StatusItem({ label, value, color }: { label: string; value: string; color: string }) {
    return (
        <div className="flex items-center justify-between border-b border-border/50 py-2 last:border-0">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            <span className={`font-mono text-sm ${color}`}>{value}</span>
        </div>
    );
}

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">{label}</span>
                <span className="text-muted-foreground">{value}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-muted/50">
                <div 
                    className={`h-full rounded-full ${color} transition-all duration-500`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color, textColor, suffix = "" }: { 
    label: string; 
    value: number; 
    icon: React.ReactNode;
    color: string;
    textColor: string;
    suffix?: string;
}) {
    return (
        <div className={`rounded-lg ${color} p-4 transition-transform hover:scale-105`}>
            <div className="flex items-center gap-2">
                <div className={`${textColor}`}>{icon}</div>
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
            </div>
            <div className={`mt-2 text-xl font-bold ${textColor}`}>
                {value}{suffix}
            </div>
        </div>
    );
}

function SocialLink({ platform, username, icon, href, color = "text-foreground" }: { 
    platform: string; 
    username: string; 
    icon: React.ReactNode;
    href?: string;
    color?: string;
}) {
    const content = (
        <div className="flex items-center justify-between rounded-md p-3 transition-colors hover:bg-accent/50">
            <div className="flex items-center gap-3">
                <div className={color}>{icon}</div>
                <span className="text-sm font-medium">{platform}</span>
            </div>
            <span className="text-sm text-muted-foreground">{username}</span>
        </div>
    );

    return href ? (
        <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
        >
            {content}
        </a>
    ) : content;
}

function StatusMetric({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
                {icon}
                <span className="text-xs">{label}</span>
            </div>
            <span className="text-sm font-medium">{value}</span>
        </div>
    );
}

function MetricCard({ label, value, data, color }: { 
    label: string; 
    value: number; 
    data: any[]; 
    color: string;
}) {
    return (
        <div className="rounded-lg bg-muted/30 p-4">
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{label}</span>
                <CountUp
                    end={value}
                    suffix="%"
                    duration={2}
                    className="text-lg font-bold"
                />
            </div>
            <div className="mt-3 h-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`gradient-${label}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                                <stop offset="100%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            fill={`url(#gradient-${label})`}
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function SkillBar({ label, value }: { label: string; value: number }) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">{label}</span>
                <span className="text-muted-foreground">{value}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted/50">
                <motion.div 
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </div>
        </div>
    );
}

function SocialButton({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
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


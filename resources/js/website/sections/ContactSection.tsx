import { motion } from 'framer-motion';
import { 
    Terminal, 
    Send, 
    GithubIcon, 
    TwitterIcon, 
    LinkedinIcon, 
    InstagramIcon, 
    FileDown as CVIcon,
    MessageSquare,
    Mail,
    Phone
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { personalData } from '../data/userInfo';
import Typed from 'typed.js';

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telephone: '',
        message: ''
    });
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    
    // Add refs for typing animation
    const typedRef = useRef(null);
    const contentRef = useRef(null);
    const sectionRef = useRef(null);
    const [hasStartedTyping, setHasStartedTyping] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        let typed: Typed | null = null;
        
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasStartedTyping) {
                    setHasStartedTyping(true);
                    
                    setTimeout(() => {
                        if (typedRef.current) {
                            startTyping();
                        }
                    }, 100);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        function startTyping() {
            typed = new Typed(typedRef.current, {
                strings: [
                    './send-message.sh',
                    'Loading components...',
                    './send-message.sh'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 1000,
                startDelay: 100,
                showCursor: true,
                cursorChar: '█',
                onComplete: (self) => {
                    self.cursor.style.display = 'inline-block';
                    setShowForm(true); // Show form after typing animation completes
                }
            });
        }


        return () => {
            observer.disconnect();
            if (typed) {
                typed.destroy();
            }
        };
    }, [hasStartedTyping]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div 
            className="flex h-full items-center justify-center p-6 min-h-screen" 
            ref={sectionRef}
        >
            <div className="container flex max-w-[1400px] gap-8">
                {/* Left Side - Contact Form Terminal */}
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
                                contact.sh
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

                            {/* Contact Form */}
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={showForm ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 0.5 }}
                                onSubmit={handleSubmit}
                                className="mt-6 space-y-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Name:
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full rounded-md border bg-muted/30 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            className="w-full rounded-md border bg-muted/30 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Telephone:
                                    </label>
                                    <div className="flex items-center">
                                        
                                        <input
                                            type="tel"
                                            value={formData.telephone}
                                            onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                                            className="w-full rounded-md border bg-muted/30 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                            placeholder="+1 (234) 567-8900"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Message:
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                        className="h-32 w-full rounded-md border bg-muted/30 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {isSending ? (
                                        <>Sending...</>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                                {status === 'success' && (
                                    <p className="text-sm text-green-500">Message sent successfully!</p>
                                )}
                                {status === 'error' && (
                                    <p className="text-sm text-destructive">Failed to send message. Please try again.</p>
                                )}
                            </motion.form>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side - Social Links & Download */}
                <motion.div 
                    className="w-1/2 space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    {/* Social Media Links */}
                    <div className="rounded-lg border bg-card p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            Social Links
                        </h3>
                        <div className="grid gap-3">
                            <SocialLink
                                icon={<GithubIcon className="h-5 w-5" />}
                                platform="GitHub"
                                username={personalData.social.github}
                                href={`https://${personalData.social.github}`}
                            />
                            <SocialLink
                                icon={<TwitterIcon className="h-5 w-5 text-blue-400" />}
                                platform="Twitter"
                                username={personalData.social.twitter}
                                href={`https://twitter.com/${personalData.social.twitter.slice(1)}`}
                            />
                            <SocialLink
                                icon={<LinkedinIcon className="h-5 w-5 text-blue-600" />}
                                platform="LinkedIn"
                                username="View Profile"
                                href={personalData.social.linkedin}
                            />
                            <SocialLink
                                icon={<InstagramIcon className="h-5 w-5 text-pink-500" />}
                                platform="Instagram"
                                username={personalData.social.instagram}
                                href={`https://instagram.com/${personalData.social.instagram.slice(1)}`}
                            />
                        </div>
                    </div>

                    {/* Download CV */}
                    <div className="rounded-lg border bg-card p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <CVIcon className="h-5 w-5 text-primary" />
                            Download Resume
                        </h3>
                        <div className="space-y-4">
                            <button 
                                onClick={() => window.open('/cv.pdf', '_blank')}
                                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                                <CVIcon className="h-5 w-5" />
                                <span>Download CV</span>
                            </button>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Last updated: {personalData.cv.lastUpdated}</span>
                                <span>{personalData.cv.downloads} downloads</span>
                            </div>
                        </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="rounded-lg border bg-card p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Mail className="h-5 w-5 text-primary" />
                            Direct Contact
                        </h3>
                        <div className="space-y-3">
                            <a 
                                href="mailto:your.email@example.com"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                your.email@example.com
                            </a>
                            <a 
                                href="tel:+1234567890"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Phone className="h-4 w-4" />
                                +1 (234) 567-8900
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function SocialLink({ icon, platform, username, href }: { 
    icon: React.ReactNode; 
    platform: string; 
    username: string;
    href: string;
}) {
    return (
        <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border border-border/50 p-3 hover:bg-accent/50 transition-colors"
        >
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-sm font-medium">{platform}</span>
            </div>
            <span className="text-sm text-muted-foreground">{username}</span>
        </a>
    );
} 
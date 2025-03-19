import { motion } from 'framer-motion';
import { Code2, Server, Database, Github, Laptop, Terminal } from 'lucide-react';

function SkillProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">{label}</span>
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

function SkillCategory({ title, icon, skills, color }: {
    title: string;
    icon: React.ReactNode;
    skills: { label: string; value: number }[];
    color: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-lg border bg-card p-6"
        >
            <div className="flex items-center gap-2 mb-4">
                <div className={`${color} rounded-lg p-2`}>
                    {icon}
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <div className="space-y-4">
                {skills.map((skill) => (
                    <SkillProgressBar
                        key={skill.label}
                        label={skill.label}
                        value={skill.value}
                        color={color}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export function SkillsSection() {
    const skillCategories = [
        {
            title: "Frontend",
            icon: <Code2 className="h-5 w-5 text-blue-500" />,
            color: "bg-blue-500",
            skills: [
                { label: "React", value: 95 },
                { label: "TypeScript", value: 90 },
                { label: "Next.js", value: 85 },
                { label: "TailwindCSS", value: 92 }
            ]
        },
        {
            title: "Backend",
            icon: <Server className="h-5 w-5 text-green-500" />,
            color: "bg-green-500",
            skills: [
                { label: "PHP", value: 88 },
                { label: "Laravel", value: 90 },
                { label: "Node.js", value: 85 },
                { label: "Express", value: 82 }
            ]
        },
        {
            title: "Programming",
            icon: <Terminal className="h-5 w-5 text-purple-500" />,
            color: "bg-purple-500",
            skills: [
                { label: "C++", value: 85 },
                { label: "C", value: 80 },
                { label: "Python", value: 75 },
                { label: "Java", value: 70 }
            ]
        },
        {
            title: "Tools & Others",
            icon: <Github className="h-5 w-5 text-orange-500" />,
            color: "bg-orange-500",
            skills: [
                { label: "Github", value: 92 },
                { label: "Docker", value: 80 },
                { label: "Linux", value: 85 },
                { label: "AWS", value: 75 }
            ]
        }
    ];

    return (
        <div className="flex h-full items-center justify-center p-6">
            <div className="container max-w-[1400px]">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
                    <p className="text-muted-foreground">
                        A comprehensive overview of my technical expertise and proficiency levels
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillCategories.map((category) => (
                        <SkillCategory
                            key={category.title}
                            title={category.title}
                            icon={category.icon}
                            skills={category.skills}
                            color={category.color}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
} 
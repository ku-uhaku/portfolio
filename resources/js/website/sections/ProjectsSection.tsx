import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const projects = [
    {
        title: "Project 1",
        description: "A modern web application built with React and TypeScript",
        tags: ["React", "TypeScript", "Node.js"],
        image: "/path/to/image1.jpg"
    },
    {
        title: "Project 2",
        description: "Full-stack application with real-time features",
        tags: ["Next.js", "Prisma", "tRPC"],
        image: "/path/to/image2.jpg"
    },
    {
        title: "Project 3",
        description: "Mobile-first responsive web application",
        tags: ["React Native", "Redux", "Firebase"],
        image: "/path/to/image3.jpg"
    }
];

export function ProjectsSection() {
    return (
        <motion.div 
            className="flex h-full items-center justify-center p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="container max-w-[1400px]">
                <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group rounded-lg border bg-card p-4 hover:shadow-lg transition-all"
                        >
                            <div className="aspect-video rounded-md bg-muted mb-4" />
                            <h3 className="font-semibold mb-2">{project.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
} 
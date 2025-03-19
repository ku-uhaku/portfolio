export default function Skills() {
    const skills = [
        "React", "TypeScript", "Node.js", "Laravel",
        "TailwindCSS", "PostgreSQL", "Docker", "Git"
    ];

    return (
        <section className="bg-muted/30 py-20">
            <div className="container mx-auto px-4">
                <h2 className="mb-8 text-3xl font-bold">Skills</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {skills.map((skill) => (
                        <div key={skill} className="rounded-lg bg-card p-4 text-center">
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 
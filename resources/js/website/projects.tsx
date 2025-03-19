export default function Projects() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="mb-8 text-3xl font-bold">Projects</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border bg-card p-6">
                        <h3 className="text-xl font-semibold">Project 1</h3>
                        <p className="mt-2 text-muted-foreground">
                            A brief description of project 1
                        </p>
                    </div>
                    <div className="rounded-lg border bg-card p-6">
                        <h3 className="text-xl font-semibold">Project 2</h3>
                        <p className="mt-2 text-muted-foreground">
                            A brief description of project 2
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
} 
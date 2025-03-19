export default function Contact() {
    return (
        <section className="bg-muted/30 py-20">
            <div className="container mx-auto px-4">
                <h2 className="mb-8 text-3xl font-bold">Contact</h2>
                <div className="mx-auto max-w-md">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <input 
                                    type="email" 
                                    className="mt-1 w-full rounded-md border bg-background p-2" 
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Message</label>
                                <textarea 
                                    className="mt-1 w-full rounded-md border bg-background p-2" 
                                    rows={4}
                                    placeholder="Your messageeeeeeeee..."
                                />
                            </div>
                            <button className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground">
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 
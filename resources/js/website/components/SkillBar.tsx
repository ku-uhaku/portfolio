import { motion } from 'framer-motion';

interface SkillBarProps {
    label: string;
    value: number;
}

export function SkillBar({ label, value }: SkillBarProps) {
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
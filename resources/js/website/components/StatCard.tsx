import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface StatCardProps {
    label: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    textColor: string;
    suffix?: string;
}

export function StatCard({ label, value, icon, color, textColor, suffix = "" }: StatCardProps) {
    return (
        <div className={`rounded-lg ${color} p-4 transition-transform hover:scale-105`}>
            <div className="flex items-center gap-2">
                <div className={`${textColor}`}>{icon}</div>
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
            </div>
            <div className={`mt-2 text-xl font-bold ${textColor}`}>
                <CountUp end={value} duration={2} />{suffix}
            </div>
        </div>
    );
} 
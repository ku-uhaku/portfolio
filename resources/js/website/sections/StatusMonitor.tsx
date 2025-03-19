import { motion } from 'framer-motion';
import { 
    Activity,
    Cpu,
    HardDrive,
    CircuitBoard as Memory
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { personalData } from '../data/userInfo';
import { SkillBar } from '../components/SkillBar';

interface MetricData {
    value: number;
    time: string;
}

export function StatusMonitor() {
    const [cpuData, setCpuData] = useState<MetricData[]>([]);
    const [memoryData, setMemoryData] = useState<MetricData[]>([]);

    useEffect(() => {
        // Simulate real-time data updates
        const interval = setInterval(() => {
            const time = new Date().toLocaleTimeString();
            const newCpuValue = Math.floor(Math.random() * 30) + 70; // 70-100
            const newMemoryValue = Math.floor(Math.random() * 20) + 60; // 60-80

            setCpuData(prev => [...prev.slice(-10), { value: newCpuValue, time }]);
            setMemoryData(prev => [...prev.slice(-10), { value: newMemoryValue, time }]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-1/2">
            <div className="h-[600px] rounded-lg border bg-card shadow-lg">
                {/* Terminal Header */}
                <div className="flex h-12 items-center gap-2 rounded-t-lg border-b bg-muted/50 px-4">
                    <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-destructive/60" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                        <div className="h-3 w-3 rounded-full bg-green-500/60" />
                    </div>
                    <div className="flex-1 text-center text-sm font-medium text-muted-foreground">
                        status_monitor.sh
                    </div>
                </div>

                {/* Terminal Content */}
                <div className="h-[calc(100%-3rem)] overflow-auto p-4">
                    <div className="space-y-6">
                        {/* System Status */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground">System Status</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg bg-muted/30 p-4">
                                    <div className="flex items-center gap-2">
                                        <Cpu className="h-4 w-4 text-primary" />
                                        <span className="text-xs text-muted-foreground">CPU Usage</span>
                                    </div>
                                    <div className="mt-2 text-lg font-bold">
                                        {cpuData[cpuData.length - 1]?.value || 0}%
                                    </div>
                                </div>
                                <div className="rounded-lg bg-muted/30 p-4">
                                    <div className="flex items-center gap-2">
                                        <Memory className="h-4 w-4 text-primary" />
                                        <span className="text-xs text-muted-foreground">Memory</span>
                                    </div>
                                    <div className="mt-2 text-lg font-bold">
                                        {memoryData[memoryData.length - 1]?.value || 0}%
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Monitor */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Skills Monitor</h3>
                            <div className="space-y-3">
                                <SkillBar label="Frontend" value={personalData.skills.frontend} />
                                <SkillBar label="Backend" value={personalData.skills.backend} />
                                <SkillBar label="DevOps" value={personalData.skills.devops} />
                                <SkillBar label="Mobile" value={personalData.skills.mobile} />
                            </div>
                        </div>

                        {/* Activity Log */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Activity Log</h3>
                            <div className="space-y-2">
                                <div className="rounded-lg bg-muted/30 p-3">
                                    <div className="flex items-center gap-2">
                                        <Activity className="h-4 w-4 text-green-500" />
                                        <span className="text-xs text-muted-foreground">
                                            System running normally
                                        </span>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-muted/30 p-3">
                                    <div className="flex items-center gap-2">
                                        <HardDrive className="h-4 w-4 text-blue-500" />
                                        <span className="text-xs text-muted-foreground">
                                            All services operational
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
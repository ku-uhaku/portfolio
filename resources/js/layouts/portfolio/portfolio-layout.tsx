import { PortfolioShell } from '@/components/portfolio-shell';
import { PortfolioIconSidebar } from '@/components/Portfolio-icon-sidebar';
import { PortfolioContentSidebar } from '@/components/Portfolio-content-sidebar';
import { Portfolio } from '@/components/Portfolio';
import { PortfolioTabs } from '@/components/PortfolioTabs';
import { PortfolioContent } from '@/components/PortfolioContent';
import { TerminalFooter } from '@/components/TerminalFooter';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function PortfolioLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <PortfolioShell>
            <div className="flex h-screen w-full">
                <PortfolioIconSidebar />
                <PortfolioContentSidebar />
                <Portfolio className="min-w-0">
                    <PortfolioTabs />
                    <PortfolioContent />
                </Portfolio>
                <TerminalFooter />
            </div>
        </PortfolioShell>
    );
}

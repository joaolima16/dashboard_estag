export interface CardProps {
    title: string;
    value: string | number;
    variation?: number;
    variationLabel?: string;
    icon?: React.ReactNode;
    description?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendLabel?: string;
}

export interface KpiCardProps {
    title: string;
    value: string | number;
    description?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendLabel?: string;
}

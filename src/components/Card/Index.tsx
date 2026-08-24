import './Card.css'
import type { CardProps } from './types/Card.types'

const Card: React.FC<CardProps> = ({ title, value, variation, variationLabel, icon, description, trend, trendLabel }) => {
    const variationClass = variation && variation > 0 ? 'positive' : variation && variation < 0 ? 'negative' : 'neutral';
    const trendClass = trend === 'up' ? 'positive' : trend === 'down' ? 'negative' : 'neutral';

    return(
        <div className="kpi-card">
            <div className="card-header">
                {icon && <div className="card-icon">{icon}</div>}
                <span className="card-title">{title}</span>
            </div>
            <div className="card-value">{value}</div>
            {description && <div className="card-description">{description}</div>}
            {variation !== undefined && (
                <div className={`card-variation ${variationClass}`}>
                    <span className="variation-value">
                        {variation > 0 ? '↑' : variation < 0 ? '↓' : '→'} {Math.abs(variation)}%
                    </span>
                    {variationLabel && <span className="variation-label">{variationLabel}</span>}
                </div>
            )}
            {trend && trendLabel && (
                <div className={`card-variation ${trendClass}`}>
                    <span className="variation-value">
                        {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendLabel}
                    </span>
                </div>
            )}
        </div>
    )
}

export default Card

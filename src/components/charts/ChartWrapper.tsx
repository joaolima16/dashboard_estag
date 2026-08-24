import './ChartWrapper.css'

interface ChartWrapperProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  loading?: boolean
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ title, subtitle, children, loading }) => {
  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        {subtitle && <p className="chart-subtitle">{subtitle}</p>}
      </div>
      <div className="chart-content">
        {loading ? (
          <div className="chart-loading">
            <div className="spinner"></div>
            <span>Carregando...</span>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export default ChartWrapper

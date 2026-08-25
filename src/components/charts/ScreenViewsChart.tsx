import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import ChartWrapper from './ChartWrapper'
import { useFiltersStore } from '../../store/filtersStore'
import { getAnalyticsSeries } from '../../services/analyticsMockData'
import { PERIODS } from '../../constants/products'
import './Charts.css'

const ScreenViewsChart: React.FC = () => {
  const { product, period } = useFiltersStore()
  const data = getAnalyticsSeries(product, period)
  const periodLabel = PERIODS.find((p) => p.value === period)?.label ?? ''

  return (
    <ChartWrapper title="Visualizações de Tela" subtitle={periodLabel} className="no-hover">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="date"
            stroke="var(--text)"
            fontSize={12}
            interval="preserveStartEnd"
            minTickGap={20}
          />
          <YAxis stroke="var(--text)" fontSize={12} width={48} strokeDasharray="3 3" />
          <Bar dataKey="screenViews" name="Visualizações" fill="#2e5c82" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default ScreenViewsChart

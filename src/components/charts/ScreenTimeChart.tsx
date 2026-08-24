import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartWrapper from './ChartWrapper'
import { useFiltersStore } from '../../store/filtersStore'
import { getAnalyticsSeries } from '../../services/analyticsMockData'
import { PERIODS } from '../../constants/products'
import './Charts.css'

const ScreenTimeChart: React.FC = () => {
  const { product, period } = useFiltersStore()
  const data = getAnalyticsSeries(product, period)
  const periodLabel = PERIODS.find((p) => p.value === period)?.label ?? ''

  return (
    <ChartWrapper title="Tempo Médio de Tela" subtitle={periodLabel}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" stroke="var(--text)" fontSize={12} />
          <YAxis stroke="var(--text)" fontSize={12} unit="min" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
            }}
            formatter={(value) => [`${value} min`, 'Tempo médio']}
          />
          <Line
            type="monotone"
            dataKey="avgScreenTimeMin"
            name="Tempo médio (min)"
            stroke="#764ba2"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default ScreenTimeChart

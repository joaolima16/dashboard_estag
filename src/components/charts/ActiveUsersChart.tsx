import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartWrapper from './ChartWrapper'
import { useFiltersStore } from '../../store/filtersStore'
import { getAnalyticsSeries } from '../../services/analyticsMockData'
import { PERIODS } from '../../constants/products'
import './Charts.css'

const ActiveUsersChart: React.FC = () => {
  const { product, period } = useFiltersStore()
  const data = getAnalyticsSeries(product, period)
  const periodLabel = PERIODS.find((p) => p.value === period)?.label ?? ''

  return (
    <ChartWrapper title="Usuários Ativos" subtitle={periodLabel}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorActiveUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#667eea" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" stroke="var(--text)" fontSize={12} />
          <YAxis stroke="var(--text)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
            }}
          />
          <Area
            type="monotone"
            dataKey="activeUsers"
            name="Usuários ativos"
            stroke="#667eea"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorActiveUsers)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default ActiveUsersChart

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import ChartWrapper from './ChartWrapper'
import { useFiltersStore } from '../../store/filtersStore'
import { getNewVsReturningSeries } from '../../services/analyticsMockData'
import { PERIODS } from '../../constants/products'
import './Charts.css'

const NewVsReturningChart: React.FC = () => {
  const { product, period } = useFiltersStore()
  const data = getNewVsReturningSeries(product, period)
  const periodLabel = PERIODS.find((p) => p.value === period)?.label ?? ''

  return (
    <ChartWrapper title="Novos vs. Retornando" subtitle={periodLabel}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4facfe" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4facfe" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorReturningUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#764ba2" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#764ba2" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="date"
            stroke="var(--text)"
            fontSize={12}
            interval="preserveStartEnd"
            minTickGap={20}
          />
          <YAxis stroke="var(--text)" fontSize={12} width={40} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area
            type="monotone"
            dataKey="newUsers"
            name="Novos usuários"
            stackId="1"
            stroke="#4facfe"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorNewUsers)"
          />
          <Area
            type="monotone"
            dataKey="returningUsers"
            name="Usuários retornando"
            stackId="1"
            stroke="#764ba2"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorReturningUsers)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default NewVsReturningChart

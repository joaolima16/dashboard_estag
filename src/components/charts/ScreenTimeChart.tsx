import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
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
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="colorScreenTime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f1e3d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0f1e3d" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="var(--text)"
            fontSize={12}
            interval="preserveStartEnd"
            minTickGap={20}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="var(--text)"
            fontSize={12}
            width={40}
            unit="min"
            tickCount={4}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
            }}
            formatter={(value) => [`${value} min`, 'Tempo médio']}
          />
          <Area
            type="natural"
            dataKey="avgScreenTimeMin"
            name="Tempo médio (min)"
            stroke="#0f1e3d"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorScreenTime)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default ScreenTimeChart

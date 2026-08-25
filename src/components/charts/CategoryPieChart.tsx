import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import ChartWrapper from './ChartWrapper'
import { useFiltersStore } from '../../store/filtersStore'
import { getProductBreakdown } from '../../services/analyticsMockData'
import './Charts.css'

const COLORS = ['#2e5c82', '#0f1e3d', '#a32638']

const CategoryPieChart: React.FC = () => {
  const { period } = useFiltersStore()
  const data = getProductBreakdown(period).map((item) => ({
    name: item.product,
    value: item.activeUsers,
  }))

  return (
    <ChartWrapper title="Usuários Ativos por Produto" subtitle="Distribuição no período">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="70%"
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--bg)', 
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: '#fff'
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default CategoryPieChart

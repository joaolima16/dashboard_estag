import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import ChartWrapper from './ChartWrapper'
import { useFiltersStore } from '../../store/filtersStore'
import { getProductBreakdown } from '../../services/analyticsMockData'
import './Charts.css'

const COLORS = ['#667eea', '#764ba2', '#f093fb']

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
            innerRadius={60}
            outerRadius={90}
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
              borderRadius: '8px'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default CategoryPieChart

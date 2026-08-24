import './App.css'
import Header from './components/Header/Index'
import Card from './components/Card/Index'
import DashboardGrid from './components/layout/DashboardGrid'
import { useFiltersStore } from './store/filtersStore'
import { getAnalyticsSummary } from './services/analyticsMockData'

function App() {
  const { product, period } = useFiltersStore()
  const summary = getAnalyticsSummary(product, period)

  return (
    <div className="dashboard-container">
      <Header />
      <main className="dashboard-main">
        <div className="kpi-grid">
          <Card
            title="Usuários Ativos"
            value={summary.activeUsers.toLocaleString('pt-BR')}
            variation={summary.activeUsersVariation}
            variationLabel="vs período anterior"
          />
          <Card
            title="Tempo Médio de Tela"
            value={`${summary.avgScreenTimeMin} min`}
            variation={summary.avgScreenTimeVariation}
            variationLabel="vs período anterior"
          />
          <Card
            title="Visualizações de Tela"
            value={summary.screenViews.toLocaleString('pt-BR')}
            variation={summary.screenViewsVariation}
            variationLabel="vs período anterior"
          />
        </div>
        <DashboardGrid />
      </main>
    </div>
  )
}

export default App

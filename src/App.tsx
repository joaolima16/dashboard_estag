import './App.css'
import Header from './components/Header/Index'
import Nav from './components/Nav/Index'
import Card from './components/Card/Index'
import DashboardGrid from './components/layout/DashboardGrid'
import CompaniesPage from './pages/Companies/Index'
import { useFiltersStore } from './store/filtersStore'
import { useNavigationStore } from './store/navigationStore'
import { getAnalyticsSummary } from './services/analyticsMockData'

function App() {
  const { product, period } = useFiltersStore()
  const { view } = useNavigationStore()
  const summary = getAnalyticsSummary(product, period)

  return (
    <div className="dashboard-container">
      <Header />
      <Nav />
      <main className="dashboard-main">
        {view === 'dashboard' ? (
          <>
            <div className="kpi-grid">
              <Card
                title="Usuários Ativos"
                value={summary.activeUsers.toLocaleString('pt-BR')}
                variation={summary.activeUsersVariation}
                variationLabel="vs período anterior"
              />
              <Card
                title="Novos Usuários"
                value={summary.newUsers.toLocaleString('pt-BR')}
                variation={summary.newUsersVariation}
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
          </>
        ) : (
          <CompaniesPage />
        )}
      </main>
    </div>
  )
}

export default App

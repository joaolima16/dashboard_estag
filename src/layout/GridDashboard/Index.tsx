import Card from '../../components/Card/Index'
import { kpiCards } from './GridDashboard.types';
function GridDashboards() {
  return (
    <main className="dashboard">
      <section className="dashboard__header" aria-labelledby="dashboard-title">
        <span className="dashboard__eyebrow">Indicadores</span>
        <h1 id="dashboard-title">Resumo de performance</h1>
        <p>Visao rapida dos principais KPIs acompanhados pelo time.</p>
      </section>

      <section className="kpi-grid" aria-label="Cards de KPI">
        {kpiCards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </section>
    </main>
  )
}

export default GridDashboards

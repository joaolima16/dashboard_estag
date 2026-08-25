import { useMemo, useState } from 'react'
import './Companies.css'
import Card from '../../components/Card/Index'
import { useFiltersStore } from '../../store/filtersStore'
import { getCompanies, getCompaniesSummary, getProductLabel } from '../../services/companiesMockData'

const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

const CompaniesPage: React.FC = () => {
  const { product } = useFiltersStore()
  const [onlyActive, setOnlyActive] = useState(false)
  const [search, setSearch] = useState('')

  const companies = useMemo(
    () => getCompanies({ product, onlyActive, search }),
    [product, onlyActive, search]
  )

  const summary = useMemo(() => getCompaniesSummary(product), [product])

  return (
    <div className="companies-page">
      <div className="companies-summary">
        <Card title="Total de Empresas" value={summary.total} />
        <Card title="Empresas Ativas" value={summary.active} />
        <Card title="Empresas Inativas" value={summary.inactive} />
      </div>

      <div className="companies-toolbar">
        <input
          type="text"
          className="companies-search"
          placeholder="Buscar por nome ou segmento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="companies-toggle">
          <input
            type="checkbox"
            checked={onlyActive}
            onChange={(e) => setOnlyActive(e.target.checked)}
          />
          Somente ativas
        </label>
      </div>

      <div className="companies-table-wrapper">
        <div className="companies-table-scroll">
          <table className="companies-table">
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Produto</th>
                <th>Status</th>
                <th>Usuários Ativos</th>
                <th>Tempo Médio de Tela</th>
                <th>Health Score</th>
                <th>Última Atividade</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>
                    <div className="company-name-cell">
                      <span className="company-name">{company.name}</span>
                      <span className="company-segment">{company.segment}</span>
                    </div>
                  </td>
                  <td>{getProductLabel(company.product)}</td>
                  <td>
                    <span className={`status-badge ${company.status}`}>
                      {company.status === 'active' ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td>{company.activeUsers.toLocaleString('pt-BR')}</td>
                  <td>{company.avgScreenTimeMin} min</td>
                  <td>
                    <div className="health-score">
                      <div className="health-score-bar">
                        <div
                          className="health-score-fill"
                          style={{ width: `${company.healthScore}%` }}
                        />
                      </div>
                      <span>{company.healthScore}</span>
                    </div>
                  </td>
                  <td>{formatDate(company.lastActivity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {companies.length === 0 && (
          <div className="companies-empty">Nenhuma empresa encontrada para os filtros selecionados.</div>
        )}
      </div>
    </div>
  )
}

export default CompaniesPage

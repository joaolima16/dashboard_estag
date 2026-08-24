import './Header.css'
import logo from '../../assets/logo-finnet.webp';
import { PRODUCTS, PERIODS } from '../../constants/products'
import { useFiltersStore } from '../../store/filtersStore'

const Header: React.FC = () => {
    const { product, period, setProduct, setPeriod } = useFiltersStore()

    return(
        <header className="dashboard-header">
            <div className="header-background"></div>
            <div className="header-content">
                <div className="header-left">
                    <div className="header-logo">
                        <img src={logo} alt="Logo da Empresa" className="header-logo-img" />
                    </div>
                    <div className="header-text">
                        <h1 className="header-title">Customer Success</h1>
                        <p className="header-subtitle">Dashboard de Métricas em Tempo Real</p>
                    </div>
                </div>
                <div className="header-right">
                    <div className="header-filters">
                        <div className="filter-group">
                            <label className="filter-label">Período</label>
                            <select
                                className="period-selector"
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                            >
                                {PERIODS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-group">
                            <label className="filter-label">Produto</label>
                            <select
                                className="product-selector"
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                            >
                                {PRODUCTS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;

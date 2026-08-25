import './Nav.css'
import { useNavigationStore, type ViewId } from '../../store/navigationStore'

interface NavItem {
    id: ViewId
    label: string
}

const NAV_ITEMS: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'companies', label: 'Empresas' },
]

const Nav: React.FC = () => {
    const { view, setView } = useNavigationStore()

    return (
        <nav className="main-nav" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    className={`main-nav-item ${view === item.id ? 'active' : ''}`}
                    onClick={() => setView(item.id)}
                >
                    {item.label}
                </button>
            ))}
        </nav>
    )
}

export default Nav

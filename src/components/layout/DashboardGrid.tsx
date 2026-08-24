import { Responsive } from 'react-grid-layout'
import { useContainerWidth } from 'react-grid-layout'
import ActiveUsersChart from '../charts/ActiveUsersChart'
import ScreenTimeChart from '../charts/ScreenTimeChart'
import ScreenViewsChart from '../charts/ScreenViewsChart'
import CategoryPieChart from '../charts/CategoryPieChart'
import NewVsReturningChart from '../charts/NewVsReturningChart'
import './DashboardGrid.css'

const DashboardGrid: React.FC = () => {
  const { containerRef, width } = useContainerWidth()
  
  const layout = [
    { i: 'active-users', x: 0, y: 0, w: 6, h: 4, minW: 4, minH: 3 },
    { i: 'screen-time', x: 6, y: 0, w: 6, h: 4, minW: 4, minH: 3 },
    { i: 'new-vs-returning', x: 0, y: 4, w: 6, h: 4, minW: 4, minH: 3 },
    { i: 'screen-views', x: 6, y: 4, w: 6, h: 4, minW: 4, minH: 3 },
    { i: 'product-breakdown', x: 0, y: 8, w: 4, h: 4, minW: 4, minH: 3 },
  ]

  return (
    <div className="dashboard-grid-container" ref={containerRef}>
      {width > 0 && (
        <Responsive
          className="dashboard-grid"
          width={width}
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={80}
          dragConfig={{ enabled: true, handle: '.chart-header' }}
          resizeConfig={{ enabled: true }}
          margin={[24, 24]}
        >
          <div key="active-users">
            <ActiveUsersChart />
          </div>
          <div key="screen-time">
            <ScreenTimeChart />
          </div>
          <div key="new-vs-returning">
            <NewVsReturningChart />
          </div>
          <div key="screen-views">
            <ScreenViewsChart />
          </div>
          <div key="product-breakdown">
            <CategoryPieChart />
          </div>
        </Responsive>
      )}
    </div>
  )
}

export default DashboardGrid

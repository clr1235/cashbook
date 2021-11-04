import { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  useLocation,
} from "react-router-dom"

import routes from './router'
import CustomTabBar from './components/customTabBar'
import Header from './components/Header'

import styles from './App.module.less'


function App() {
  const location = useLocation()
  const {pathname} = location
  const needNav = ['/amount', '/statistics', '/user']
  const [showTabBar, setShowTabBar] = useState(true)

  const [filters, setFilters] = useState({
    type: [''],
    date: new Date(),
  })
  // 获取header中的筛选条件
  const getFilters = (filters: any) => {
    setFilters({
      ...filters
    })
  }

  useEffect(() => {
    setShowTabBar(needNav.includes(pathname))
  }, [pathname])

  return (
    <div className={styles.app}>
      {
        showTabBar ? <Header getFilters={getFilters as any}/> : null
      }
      <div className={styles.body}>
        <Switch>
          {
            routes.map(route => (
              <Route exact key={route.path} path={route.path}>
                <route.component filters={filters}/>
              </Route>)
            )
          }
        </Switch>
      </div>
      {
        showTabBar ?
        <div className={styles.bottom} >
          <CustomTabBar/>
        </div> : null
      }
      </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import {
  Switch,
  Route,
  useLocation,
} from "react-router-dom"
import routes from './router'
import CustomTabBar from './components/customTabBar'

import styles from './App.module.less'

function App() {
  const location = useLocation()
  const {pathname} = location
  const needNav = ['/amount', '/statistics', '/user']
  const [showTabBar, setShowTabBar] = useState(true)
  useEffect(() => {
    setShowTabBar(needNav.includes(pathname))
  }, [pathname])
  return (
    <div className={styles.app}>
      <div className={styles.body}>
        <Switch>
          {
            routes.map(route => (
              <Route exact key={route.path} path={route.path}>
                <route.component />
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

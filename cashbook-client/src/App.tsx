import { useState, useEffect } from 'react'
import {
  Switch,
  Route
} from "react-router-dom"

import routes from './router'
import CustomTabBar from './components/customTabBar'

import styles from './App.module.less'

function App() {

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
      <div className={styles.bottom}>
        <CustomTabBar/>
      </div>
      </div>
  )
}

export default App

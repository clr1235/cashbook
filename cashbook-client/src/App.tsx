import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import routes from './router'

import './App.less'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Router>
        <Switch>
          {
            routes.map(route => (
              <Route exact key={route.path} path={route.path}>
                <route.component />
              </Route>)
            )
          }
        </Switch>
      </Router>
    </div>
  )
}

export default App

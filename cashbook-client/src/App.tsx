import { useState } from 'react'
import {
  Switch,
  Route
} from "react-router-dom"
import {ConfigProvider} from 'zarm'
import routes from './router'


import './App.less'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ConfigProvider primaryColor="#1890ff">
      <div className="app">
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
    </ConfigProvider>
  )
}

export default App

import { useState, useEffect } from 'react'
import {
  Switch,
  Route
} from "react-router-dom"
import {ConfigProvider} from 'zarm'
import {useLocation} from 'react-router-dom'

import routes from './router'
import CustomTabBar from './components/customTabBar'

import './App.less'

function App() {
  const location = useLocation() // 拿到 location 实例
  const { pathname } = location // 获取当前路径
  const needNav = ['/', '/statistics', '/user'] // 需要底部导航栏的路径
  const [showNav, setShowNav] = useState(false) // 是否展示 Nav
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname]) // [] 内的参数若是变化，便会执行上述回调函数=

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
          <CustomTabBar visible={showNav}></CustomTabBar>
      </div>
    </ConfigProvider>
  )
}

export default App

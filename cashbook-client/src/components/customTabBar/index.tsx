import { useState, FC } from 'react'
import {TabBar} from 'antd-mobile'
import { useHistory, useLocation } from 'react-router-dom'

import style from './index.module.less'

const CustomTabBar: FC = function({visible}: any) {
  const [activeKey, setActiveKey] = useState('/')
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const onChange = (value: string) => {
    history.push(value)
  }
  const tabs = [{
    key: '/amount',
    title: '账单',
    icon: <i className="iconfont icon-wodezhangdan"></i>
  }, {
    key: '/statistics',
    title: '统计',
    icon: <i className="iconfont icon-tongji"></i>
  }, {
    key: '/user',
    title: '我的',
    icon: <i className="iconfont icon-wode"></i>
  }]
  return (
    <TabBar className={style.custom_tab_bar} activeKey={pathname} onChange={onChange}>
      {
        tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))
      }
    </TabBar>
  )
}

export default CustomTabBar

import { useState } from 'react'
import {TabBar} from 'zarm'
import { useHistory } from 'react-router-dom'

import style from './index.module.less'

const CustomTabBar = function({visible}: any) {
  const [activeKey, setActiveKey] = useState('/')
  const history = useHistory()
  const onChange = (path: any) => {
    setActiveKey(path)
    history.push(path)
  }
  return (
    <TabBar className={style.custom_tab_bar} visible={visible} activeKey={activeKey} onChange={onChange}>
        <TabBar.Item
          itemKey="/"
          title="账单"
          icon={<i className="iconfont icon-wodezhangdan"></i>}
        />
        <TabBar.Item
          itemKey="/statistics"
          title="统计"
          icon={<i className="iconfont icon-tongji"></i>}
        />
        <TabBar.Item
          itemKey="/user"
          title="我的"
          icon={<i className="iconfont icon-wode"></i>}
        />
      </TabBar>
  )
}

export default CustomTabBar

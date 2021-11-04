import { useEffect, useState } from 'react';
import {InfiniteScroll, List} from 'antd-mobile'
import dayjs from 'dayjs';
import Api from '../../api/index'
import styles from './index.module.less'

function Amount() {
  const [data, setData] = useState([])
  useEffect(() => {
    let isUnmount = false
    const fetchData = {
      date: dayjs(new Date()).format('YYYY-MM'),
      page: 1,
      page_size: 5,
      type_id: 0
    }
    const getBillList = async () => {
      const res = await Api.AmountPageApi.getBillList(fetchData)
      console.log(res, 'res-=-=');
      !isUnmount && setData(res.data as any)
    }
    getBillList()
    return () => {isUnmount = true}
  }, [])

  // 渲染子项
  const renderListItem = () => {
    const title = (
      <div className={styles.title_box}>
        <span className={styles.date}>2021-12-12</span>
        <div className={styles.right}>
          <div className={styles.cost}>
            <i className="iconfont icon-zhichu"></i>
            <span>¥25.00</span>
          </div>
          <div className={styles.cost}>
            <i className="iconfont icon-shouru"></i>
            <span>¥25.00</span>
          </div>
        </div>
      </div>
    )
    return (
      <List.Item
        extra={null}
        title={title}
        arrow={false}
        clickable
      >
        这里是主信息
      </List.Item>
    )
  }

  return (
    <div className={styles.amount_page}>
      <List>
        {renderListItem()}
      </List>
    </div>
  )
}

export default Amount;

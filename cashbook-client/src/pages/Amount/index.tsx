import { useEffect, useState } from 'react';
import {InfiniteScroll, List, Empty} from 'antd-mobile'
import dayjs from 'dayjs';

import {consumeTypes} from '../../model'
import Api from '../../api/index'
import styles from './index.module.less'

function Amount(props: any) {
  const [data, setData] = useState([])
  useEffect(() => {
    let isUnmount = false
    const fetchData = {
      date: dayjs(props.filters.date).format('YYYY-MM'),
      page: 1,
      page_size: 10,
      type_id: +(props?.filters?.type || [])[0]
    }
    const getBillList = async () => {
      const {data} = await Api.AmountPageApi.getBillList(fetchData)
      const list = (data as any).list.map((item: any)=> {
        return {
          ...item,
        }
      });
      console.log(list, 'list-=-=')
      !isUnmount && setData(list as any)
    }
    getBillList()
    return () => {isUnmount = true}
  }, [props.filters])

  // 渲染子项
  const renderListItem = (item: any) => {
    const title = (
      <div className={styles.title_box}>
        <span className={styles.date}>{item.date.split(' ')[0]}</span>
        <div className={styles.right}>
          <div className={styles.cost}>
            <i className="iconfont icon-zhichu"></i>
            <span>¥{item.pay}</span>
          </div>
          <div className={styles.cost}>
            <i className="iconfont icon-shouru"></i>
            <span>¥{item.income}</span>
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
        key={item.id}
      >
        {
            item.children.length > 0 ? (
              item.children.map((it: any)=> {
                return (
                  <div className={styles.content}>
                    <div className={styles.detailed}>
                      <span className={styles.icon_box}>
                        <i className={renderIcon(it)}></i>
                        {it.type_name}
                      </span>
                      <span className={styles.number}>
                        {
                          item.pay_type === 2 ? `-${it.amount}` : it.amount
                        }
                      </span>
                    </div>
                    <div className={styles.time}>{it.time}</div>
                    <div className={styles.remark}>{it.remark}</div>
                  </div>
                )
              })
            ) : null
          }
      </List.Item>
    )
  }

  // 获取icon
  const renderIcon = (item: any) => {
    const obj: any = consumeTypes.find((it: any) => +it.value === item.type_id) || {}
    return `iconfont ${obj.icon}`;
  }

  return (
    <div className={styles.amount_page}>
      {
        data.length > 0 ? (
          <List>
            {
              data.map(item => renderListItem(item))
            }
          </List>
        ) : <Empty description='暂无数据' />
      }
    </div>
  )
}

export default Amount;

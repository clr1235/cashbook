import {useEffect, useState} from 'react'
import {Picker, DatePicker} from 'antd-mobile'
import dayjs from 'dayjs'
import styles from './index.module.less'
import {consumeTypes} from '../../model'

const basicColumns = [consumeTypes]
const now = new Date()

const Header = (props: any) => {
  const [visible, setVisible] = useState(false)
  const [datevisible, setDateVisible] = useState(false)
  const [filters, setFilters] = useState({
    type: [''],
    date: now
  })

  return (
    <div className={styles.header}>
      <div className={styles.total_box}>
        <span className={styles.label}>总支出：</span>
        <span className={styles.number}>¥ 200</span>
        <span className={styles.label}>总收入：</span>
        <span className={styles.number}>¥ 500</span>
      </div>
      <div className={styles.filter_box}>
        <div className={styles.type} onClick={() => {setVisible(true)}}>
          <span className={styles.label} >类型：</span>
          <Picker
            columns={basicColumns}
            visible={visible}
            onClose={() => {
              setVisible(false)
            }}
            value={filters.type}
            onConfirm={(val) => {
              setFilters({
                ...filters,
                type: val as any
              })
              console.log('onConfirm', val)
            }}
            onSelect={val => {
              console.log('onSelect', val)
            }}
          >
            {items => {
              if (items.every(item => item === null)) {
                return '请选择'
              } else {
                return items.map(item => item?.label ?? '请选择').join(' - ')
              }
            }}
          </Picker>
        </div>
        <div className={styles.date} onClick={() => {setDateVisible(true)}}>
          <span className={styles.label}>时间：</span>
          <DatePicker
            visible={datevisible}
            onClose={() => {
              setDateVisible(false)
              props.getFilters(filters)
            }}
            onConfirm={(value) => {
              setFilters({
                ...filters,
                date: value as any
              })
            }}
            value={filters.date}
            precision={'month'}
          >
            {value => dayjs(value).format('YYYY-MM') }
          </DatePicker>
        </div>
      </div>
    </div>
  )
}


export default Header

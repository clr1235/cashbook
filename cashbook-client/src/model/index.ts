export type PickerColumnItem = {
  label: string
  value: string
}
export type PickerColumn = (string | PickerColumnItem)[]
export type PickerValue = string | null

export type PickerValueContext = {
  items: (PickerColumnItem | null)[]
}
export const consumeTypes = <PickerColumn>[{
  value: '',
  label: '全部'
}, {
  value: '1',
  label: '餐饮',
  icon: 'icon-canyin',
}, {
  value: '2',
  label: '服饰',
  icon: 'icon-fushi',
}, {
  value: '3',
  label: '交通',
  icon: 'icon-jiaotong',
}, {
  value: '4',
  label: '日用',
  icon: 'icon-riyong',
}, {
  value: '5',
  label: '购物',
  icon: 'icon-gouwu',
}, {
  value: '6',
  label: '学习',
  icon: 'icon-xuexiquan',
}, {
  value: '7',
  label: '医疗',
  icon: 'icon-yiliao',
}, {
  value: '8',
  label: '旅游',
  icon: 'icon-lvyou',
}, {
  value: '9',
  label: '人情',
  icon: 'icon-renqing',
}, {
  value: '10',
  label: '其他',
  icon: 'icon-qita1',
}, {
  value: '11',
  label: '工资',
  icon: 'icon-gongzi',
}, {
  value: '12',
  label: '奖金',
  icon: 'icon-jiangjin',
}, {
  value: '13',
  label: '转账',
  icon: 'icon-zhuanzhang',
}, {
  value: '14',
  label: '理财',
  icon: 'icon-licai',
}, {
  value: '15',
  label: '退款',
  icon: 'icon-tuikuan',
}, {
  value: '16',
  label: '其他',
  icon: 'icon-qita1',
}]

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
  label: '餐饮'
}, {
  value: '2',
  label: '服饰'
}, {
  value: '3',
  label: '交通'
}, {
  value: '4',
  label: '日用'
}, {
  value: 5,
  label: '购物'
}, {
  value: '6',
  label: '学习'
}, {
  value: '7',
  label: '医疗'
}, {
  value: '8',
  label: '旅游'
}, {
  value: '9',
  label: '人情'
}, {
  value: '10',
  label: '其他'
}, {
  value: '11',
  label: '工资'
}, {
  value: '12',
  label: '奖金'
}, {
  value: '13',
  label: '转账'
}, {
  value: '14',
  label: '理财'
}, {
  value: '15',
  label: '退款'
}, {
  value: '16',
  label: '其他'
}]

import Amount from '../pages/Amount/index'
import Statistics from '../pages/Statistics/index'
import User from '../pages/User/index'

const routes = [{
  path: '/',
  key: 'amount',
  component: Amount
}, {
  path: '/statistics',
  key: 'statistics',
  component: Statistics
}, {
  path: '/user',
  key: 'user',
  component: User
}]

export default routes

import Amount from '../pages/Amount/index'
import Statistics from '../pages/Statistics/index'
import User from '../pages/User/index'
import Login from '../pages/Login/index'

const routes = [{
  path: '/amount',
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
}, {
  path: '/login',
  key: 'login',
  component: Login
}]

export default routes

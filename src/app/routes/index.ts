import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { CowRoutes } from '../modules/cow/cow.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { OrdersRoutes } from '../modules/orders/orders.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
  {
    path: '/orders',
    route: OrdersRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router

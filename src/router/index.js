import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('@/pages/index')
const Home = () => import('@/pages/home')

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/home',
    component: Home
  }
]
Vue.use(Router)
const router = new Router({
  routes: routes
})

export default router

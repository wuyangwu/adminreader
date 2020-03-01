import Vue from 'vue'
import Router from 'vue-router'
import login from '../layout/login/login'
import nestedRouter from './modules/nested'
import Home from '../layout/home'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: '随机',
    component: login,
    redirect: '/a'
  },
  {
    path: '/login',
    name: '登录',
    component: login
  }
]

// 随机的路由
export const asyncRouter = [
  {
    path: '/a',
    component: Home,
    name: '主页',
    redirect: '/a/home',
    children: nestedRouter
  }
]

const createRouter = () => new Router({
  routes: constantRoutes
})

const router = createRouter()

export default router
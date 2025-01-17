// import Home from '../../views/Home'

const nestedRouter = [
  {
    path: 'home',
    name: '首页',
    component: () => import('../../layout/nested'),
    redirect: '/a/home/zhuye',
    children: [
      {
        path: 'zhuye',
        component: () => import('../../layout/nested/zhuye'),
        name: '控制面板',
        meta: { title: 'zhuye' }
      },
      {
        path: 'biaoqianshow',
        component: () => import('../../layout/nested/biaoqian'),
        name: '标签',
        meta: { title: 'biaoqian' }
      },
      {
        path: 'bookshow',
        component: () => import('../../layout/nested/book'),
        name: '书籍管理',
        meta: { title: '图书' }
      },
      {
        path: 'usershow',
        component: () => import('../../layout/nested/username'),
        name: '用户管理',
        meta: { title: '用户' }
      }
    ]
  }
]

export default nestedRouter

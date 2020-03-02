import router, { asyncRouter } from './router'
// import store from './store'
// 路由拦截器
router.beforeEach(async (to, from, next) => {
  console.log(to.path)
  // eslint-disable-next-line no-unused-vars
  var info = JSON.parse(localStorage.getItem('info'))
  // eslint-disable-next-line eqeqeq
  if (info != null && info.username != null && info.id != null && to.path == '/a') {
    // console.log('加入路由')
    router.addRoutes(asyncRouter)
    next({ ...to, replace: true })
  } else {
    if (info == null && to.path !== '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  }
  // if (store.getters.token === 3 && to.path === '/a') {
  //   console.log('加入路由')
  //   // 加入
  //   router.addRoutes(asyncRouter)
  //   store.dispatch('setToken', 2)
  //   next({ ...to, replace: true })
  // } else {
  //   if (store.getters.token === 1 && to.path !== '/login') {
  //     next({ path: '/login' })
  //     // next({ path: '/' })
  //   } else {
  //     next()
  //   }
  // }

  // if (store.getters.token === 2) {
  //   next()
  // }
})

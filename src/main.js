import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/style/globak.scss'
import './permission.js'
import VueParticles from 'vue-particles'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(VueParticles)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

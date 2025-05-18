import Vue from 'vue'
import App from './App.vue'
import NotifyPlugin from './plugins/notifications'

Vue.config.productionTip = false

Vue.use(NotifyPlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')

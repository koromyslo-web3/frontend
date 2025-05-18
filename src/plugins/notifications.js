import Vue from 'vue'
import NotificationSystem from '@/components/common/NotificationSystem.vue'

const NotificationConstructor = Vue.extend(NotificationSystem)

let instance = null

const NotifyPlugin = {
  install(Vue) {
    if (!instance) {
      instance = new NotificationConstructor()
      const vm = instance.$mount()
      document.body.appendChild(vm.$el)
    }

    Vue.prototype.$notify = {
      add(header, text = null, object = null) {
        instance.addNotification(header, text, object)
      },
    }
  },
}

export default NotifyPlugin

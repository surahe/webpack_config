import Vue from 'vue'
import editor from './vue/app.vue'

import router from './router'
import * as filters from './filter/filter'

if (process.env.NODE_ENV !== 'production') {
  Vue.config.devtools = true
  Vue.config.performance = true
}

const errorHandler = (error, vm) => {
  console.error('抛出全局异常')
  console.error(vm)
  console.error(error)
}

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.errorHandler = errorHandler
Vue.prototype.$throw = (error) => errorHandler(error, this)

/* eslint-disable no-new */
new Vue({
  el: '#main',
  render: h => h(editor),
  router
})

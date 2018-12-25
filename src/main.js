import Vue from 'vue'
import editor from './vue/app.vue'

import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#main',
  render: h => h(editor),
  router
})

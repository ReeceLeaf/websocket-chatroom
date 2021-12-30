import Vue from 'vue'
import App from './App.vue'
import '@/common/style.css'
import 'mint-ui/lib/style.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

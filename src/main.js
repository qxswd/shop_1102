// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 1.引入重置样式
import "./assets/css/reset.css"

// 2.引入公共组件
import comComponents from "./components/index"
for(let i in comComponents){
  Vue.component(i,comComponents[i])
}

// 3.引入全局过滤器
import comFilters from "./filters/index"
for(let i in comFilters){
  Vue.filter(i,comFilters[i])
}

// 4.引入stroe
import store from "./store/index"

//5.引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


Vue.prototype.$www = "http://localhost:3000";

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

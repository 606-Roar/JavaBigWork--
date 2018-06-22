// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
// discomfort
import Vueresource from 'vue-resource'
import $ from 'jquery'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// discomfort
import Chart from 'chart.js'
import store from './store'
import sChart from 'vue-schart'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Vue.use(VueAxios, axios)
//vue-router + vuex +vue-resource+element-ui
// Vue.use(VueRouter);
Vue.use(iView);
Vue.use(sChart)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vueresource)
Vue.use(VueAwesomeSwiper)
/*
  路由守卫 判断是否登录
*/
router.beforeEach(function(to, from, next) {
  const nextRoute = ['登录', '注册'];
  const auth = store.state.IsLogin;
  console.log(from.name)
  // console.log("main.js:"+auth)
  // console.log("main.js:"+nextRoute)
  console.log(to.name)
  if (nextRoute.indexOf(to.name) === -1) {
    //未登录
    // console.log("main.js:"+nextRoute.indexOf(to.name))
    // console.log("main.js:"+store.state.IsLogin)
    console.log("123")
    if (store.state.IsLogin === false) {
      router.push({ name: '登录' })
    
    }
  }
  next();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

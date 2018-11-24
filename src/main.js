// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'//格式化时间组价,前面不能加./
// import MintUI from 'mint-ui'

//图片缩略图
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

//图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
    error:'./images/loaderror.jpg',
    loading:'./images/loading.jpg'
})

import vueResource from 'vue-resource'
Vue.use(vueResource)
//配置vue-resource的请求根域名
Vue.http.options.root = "http://www.lovegf.cn:8899"
Vue.http.options.emulateJSON = true;

// import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//导入自己写的全局样式
import './css/common.less'

import { 
        Header,
        Swipe,
        SwipeItem,
        Button
        // Lazyload
      } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
// Vue.use(Lazyload);


Vue.config.productionTip = false

//定义全局过滤器
Vue.filter('dataFormat',function(dateStr,pattern="YYYY-MM-DD HH:mm:ss"){
  // moment()直接调用表示获取当前时间
  return moment(dateStr).format(pattern)

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

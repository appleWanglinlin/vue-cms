import Vue from 'vue'
import Router from 'vue-router'

import homeComponent from '../pages/home'
import memberComponent from '../pages/member'
import shopcarComponent from '../pages/shopcar'
import searchComponent from '../pages/search'
import newListComponent from '../pages/newList'
import newsInfoComponent from '../pages/newsInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:homeComponent},
    {path:'/member',component:memberComponent},
    {path:'/shopcar',component:shopcarComponent},
    {path:'/search',component:searchComponent},
    {path:'/home/newList',component:newListComponent},
    {path:'/home/newList/newsInfo/:id',component:newsInfoComponent}
    
    
  ],
  //跟换默认样式
  linkActiveClass:'mui-active'
})

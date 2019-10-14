import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Home1 from '../views/home1.vue'
import Home2 from '../views/home2.vue'
import About from './about.js'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',

      component: Home,
      children:[
      {                      //二级路由
        path:'/',            //二级的默认路由（此path指向上一级，即path:'/about'）
      
        component:Home1
      },
      {
        path:'/home/Home2',
        name:'Home2',
        component:Home2
      },
]
    },
    About
  ]
})

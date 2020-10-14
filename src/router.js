import Vue from 'vue'
import Router from "vue-router";
import register from "./views/register";
import Login from './views/Login'
import userinfo from "./views/userinfo";
import Edit from "./views/Edit";
import Home from './views/Home'
import Article from "./views/Article";
import EditCategory from "./views/EditCategory";
import search from "./views/search";

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        keepalive: true
      }
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/userinfo',
      component: userinfo,
      meta: {
        istoken: true
      }
    },
    {
      path: '/edit',
      component: Edit,
      meta: {
        istoken: true
      }
    },
    {
      path: '/article/:id',
      component: Article
    },
    {
      path: '/editcategory',
      component: EditCategory
    },
    {
      path: '/search',
      component: search
    }
  ],
  mode: 'history'
})

router.beforeEach((to,from,next) => {
  if(!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken == true){
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登陆')
    return
  }
  next()
})

export default router
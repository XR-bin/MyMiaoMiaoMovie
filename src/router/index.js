import Vue from 'vue'
import VueRouter from 'vue-router'
import cinemaRouter from './Cinema/cinema.js'
import mineRouter from './Mine/mine.js'
import movieRouter from './Movie/movie.js'

Vue.use(VueRouter)

const routes = [
  cinemaRouter,
  mineRouter,
  movieRouter,
  {
    path: '',
    redirect: '/movie'
  },
  {
    path: '*', // *是通配符，优先级是最低的
    redirect: '/movie'
  }
]

const router = new VueRouter({
  // 路由模式  一共有两种：hash  和  history
  // 不写mode的情况下，默认是hash模式
  // hash 的模式下网站格式      http://location/:8080/#/xxxx/xxxx
  // history 的模式下网站格式   http://localhost:8080/xxxx/xxxx
  // mode: 'history',

  mode: 'hash',
  base: process.env.BASE_URL,     // 根路径设置

  // 如果配置变量的名字是routes的话这里就可以简写为routes
  routes
})

export default router

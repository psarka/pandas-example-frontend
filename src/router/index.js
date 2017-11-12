import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Example1 from '@/components/Example1'
import Example2 from '@/components/Example2'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/hello', component: Hello},
    {path: '/example1', component: Example1},
    {path: '/example2', component: Example2}
  ]
})

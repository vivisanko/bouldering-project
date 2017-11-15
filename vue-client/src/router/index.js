import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Authorization from '@/components/Authorization'
import Registration from '@/components/Registration'
import Cabinet from '@/components/Cabinet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/authorization',
      name: 'Entrance',
      component: Authorization
    },
    {
      path: '/registration',
      name: 'Registrate',
      component: Registration
    },
    {
      path: '/cabinet',
      name: 'PersonalCabinet',
      component: Cabinet
    }
  ]
})

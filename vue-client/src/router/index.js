import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Authorization from '@/components/Authorization'
import Registration from '@/components/Registration'
import Cabinet from '@/components/Cabinet'
import UserHome from '@/components/UserHome'
import UserProfile from '@/components/UserProfile'
import UserRating from '@/components/UserRating'
import UserTheory from '@/components/UserTheory'
import UserCoaching from '@/components/UserCoaching'
import UserSuitableroute from '@/components/UserSuitableroute'
import UserPassedroute from '@/components/UserPassedroute'
import UserRandomroute from '@/components/UserRandomroute'
import UserExit from '@/components/UserExit'

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
      component: Cabinet,
      children: [
             { path: '/cabinet', component: UserHome },
             { path: '/cabinet/profile', component: UserProfile },
             { path: '/cabinet/rating', component: UserRating },
             { path: '/cabinet/theory', component: UserTheory },
             { path: '/cabinet/coaching', component: UserCoaching },
             { path: '/cabinet/suitableroute', component: UserSuitableroute },
             { path: '/cabinet/passedroute', component: UserPassedroute },
             { path: '/cabinet/randomroute', component: UserRandomroute },
             { path: '/cabinet/exit', component: UserExit }]
    }
  ]
})

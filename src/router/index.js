import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Double from '@/components/Double'
import Test from '@/components/test'
import Single from '@/components/Single'
import Choose from '@/components/Choose'
import Description from '@/components/Description'
import Singel2 from '@/components/singel2'
import Assessment from '@/components/Assessment'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/double',
      name: 'double',
      component: Double,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/single',
      name: 'single',
      component: Single,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/choose',
      name: 'Choose',
      component: Choose,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/description',
      name: 'Description',
      component: Description,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/single2',
      name: 'Single2',
      component: Singel2,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/assessment',
      name: 'Assessment',
      component: Assessment
    }
  ]
})

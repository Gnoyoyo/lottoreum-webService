import Vue from 'vue'
import Router from 'vue-router'
import LottoReum from '@/components/LottoReum'
import AddNewPlayer from '@/components/AddNewPlayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LottoReum',
      component: LottoReum
    },
    {
      path: '/add_user',
      name: 'AddUser',
      component: AddNewPlayer
     }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import LottoReum from '@/components/LottoReum'
import AddNewPlayer from '@/components/AddNewPlayer'
import {Picker, Emoji} from 'emoji-mart-vue'

Vue.component('picker', Picker)
Vue.component('emoji', Emoji)
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

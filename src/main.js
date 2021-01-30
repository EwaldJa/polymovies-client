import Vue from 'vue'
import App from './Cinema.vue'
import "vue-good-table/dist/vue-good-table.css";
import VueGoodTable from 'vue-good-table'
import VueRouter from 'vue-router'
import Films from './components/Films.vue'
import Acteurs from './components/Acteurs.vue'
import Roles from './components/Roles.vue'
import AjoutRole from './components/AjoutRole.vue'
import ModifierRole from './components/ModifierRole.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(VueGoodTable)

const routes = [
  { path: '/films', name: "films", component: Films },
  { path: '/ajoutRole/:idActor',name :"ajoutRole" , component: AjoutRole},
  { path: '/modifierRole',name :"modifierRole" , component: ModifierRole},
  { path: '/roles', name :"roles" , component: Roles},
  { path: '/acteurs', name: "acteurs", component: Acteurs}
]
const router = new VueRouter({
  routes 
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AssetsView from '../views/AssetsView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/assets', component: AssetsView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
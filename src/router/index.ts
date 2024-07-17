import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AssetsView from '../views/AssetsView.vue'
import AssetDetailPanel from '../components/AssetDetailPanel.vue'
const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'home',
  },
  {
    path: '/assets',
    component: AssetsView,
    name: 'assets',
    children: [
      {
        path: '/assets/:id',
        component: AssetDetailPanel,
        name: 'asset',
        props: true,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    meta: { title: 'Home - SexyCoders' }
  },
  ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.title)

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title
  else if (previousNearestWithMeta) document.title = previousNearestWithMeta.meta.title

  next()
})


export default router

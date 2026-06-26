import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { titleKey: 'nav.home' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { titleKey: 'nav.about' },
  },
  {
    path: '/doctors',
    name: 'doctors',
    component: () => import('@/views/DoctorsView.vue'),
    meta: { titleKey: 'nav.doctors' },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { titleKey: 'nav.services' },
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/NewsView.vue'),
    meta: { titleKey: 'nav.news' },
  },
  {
    path: '/news/:id',
    name: 'newsDetail',
    component: () => import('@/views/NewsDetailView.vue'),
    meta: { titleKey: 'nav.news' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { titleKey: 'nav.contacts' },
  },
  {
    path: '/appointment',
    name: 'appointment',
    component: () => import('@/views/AppointmentView.vue'),
    meta: { titleKey: 'nav.appointment' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  const titleKey = to.meta.titleKey as string
  const baseTitle = 'Клиническая больница'
  document.title = titleKey ? `${titleKey} | ${baseTitle}` : baseTitle
  next()
})

export default router

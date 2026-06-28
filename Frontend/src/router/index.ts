import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import i18n from '@/i18n'

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
    path: '/doctors/:id',
    name: 'doctorDetail',
    component: () => import('@/views/DoctorDetailView.vue'),
    meta: { titleKey: 'nav.doctors' },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { titleKey: 'nav.services' },
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/views/GalleryView.vue'),
    meta: { titleKey: 'nav.gallery' },
  },
  {
    path: '/renovation',
    name: 'renovation',
    component: () => import('@/views/RenovationView.vue'),
    meta: { titleKey: 'nav.renovation' },
  },
  {
    path: '/polyclinic',
    name: 'polyclinic',
    component: () => import('@/views/PolyclinicView.vue'),
    meta: { titleKey: 'structure.polyclinic.title' },
  },
  {
    path: '/hospital',
    name: 'hospital',
    component: () => import('@/views/HospitalView.vue'),
    meta: { titleKey: 'structure.hospital.title' },
  },
  {
    path: '/ogpmu',
    name: 'ogpmu',
    component: () => import('@/views/OgpmuView.vue'),
    meta: { titleKey: 'structure.ogpmu.title' },
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/views/FaqView.vue'),
    meta: { titleKey: 'nav.contacts' },
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
    component: () => import('@/views/NotFoundView.vue'),
    meta: { titleKey: 'common.pageNotFound' },
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
  const baseTitle = i18n.global.t('header.clinicName')
  document.title = titleKey ? `${i18n.global.t(titleKey)} | ${baseTitle}` : baseTitle
  next()
})

export default router

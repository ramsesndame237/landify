import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/benutzer-bechte',
      name: 'benutzer-bechte',
      component: () => import('@/views/BenutzerRechte.vue'),
      meta: {
        pageTitle: 'Benutzer & Bechte',
        breadcrumb: [
          {
            text: 'Benutzer & Bechte',
            active: true,
          },
        ],
      },
    },
    {
      path: '/vorgange',
      name: 'vorgange',
      component: () => import('@/views/Vorgange.vue'),
      meta: {
        pageTitle: 'Vorgänge',
        breadcrumb: [
          {
            text: 'Vorgänge',
            active: true,
          },
        ],
      },
    },
    {
      path: '/fristen',
      name: 'fristen',
      component: () => import('@/views/Fristen.vue'),
      meta: {
        pageTitle: 'Fristen',
        breadcrumb: [
          {
            text: 'Fristen',
            active: true,
          },
        ],
      },
    },
    {
      path: '/dokumente',
      name: 'dokumente',
      component: () => import('@/views/Dokumente.vue'),
      meta: {
        pageTitle: 'Dokumente',
        breadcrumb: [
          {
            text: 'Dokumente',
            active: true,
          },
        ],
      },
    },
    {
      path: '/prozessansicht',
      name: 'prozessansicht',
      component: () => import('@/views/Prozessansicht.vue'),
      meta: {
        pageTitle: 'Prozessansicht',
        breadcrumb: [
          {
            text: 'Prozessansicht',
            active: true,
          },
        ],
      },
    },
    {
      path: '/einstellungen',
      name: 'einstellungen',
      component: () => import('@/views/Einstellungen.vue'),
      meta: {
        pageTitle: 'Einstellungen',
        breadcrumb: [
          {
            text: 'Einstellungen',
            active: true,
          },
        ],
      },
    },
    {
      path: '/vorlagen',
      name: 'vorlagen',
      component: () => import('@/views/Vorlagen.vue'),
      meta: {
        pageTitle: 'Vorlagen',
        breadcrumb: [
          {
            text: 'Vorlagen',
            active: true,
          },
        ],
      },
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router

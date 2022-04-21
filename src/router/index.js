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
      path: '/app',
      name: 'home',
      component: () => import('@/views/app/Dashboard.vue'),
      meta: {
        pageTitle: 'Dashboard',
        breadcrumb: [
          {
            text: 'Dashboard',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/deadlines',
      name: 'deadlines',
      component: () => import('@/views/app/Deadlines.vue'),
      meta: {
        pageTitle: 'Deadlines',
        breadcrumb: [
          {
            text: 'Deadlines',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/documents',
      name: 'documents',
      component: () => import('@/views/app/Documents.vue'),
      meta: {
        pageTitle: 'Documents',
        breadcrumb: [
          {
            text: 'Documents',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/pos',
      name: 'pos',
      component: () => import('@/views/app/POS.vue'),
      meta: {
        pageTitle: 'POS',
        breadcrumb: [
          {
            text: 'POS',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/properties',
      name: 'properties',
      component: () => import('@/views/app/Properties.vue'),
      meta: {
        pageTitle: 'Properties',
        breadcrumb: [
          {
            text: 'Properties',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/users-lists',
      name: 'users-lists',
      component: () => import('@/views/app/users-lists.vue'),
      meta: {
        pageTitle: 'Overall list users',
        breadcrumb: [
          {
            text: 'Overall list users',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/templates',
      name: 'templates',
      component: () => import('@/views/app/Templates.vue'),
      meta: {
        pageTitle: 'Templates',
        breadcrumb: [
          {
            text: 'Templates',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/master-data',
      name: 'master-data',
      component: () => import('@/views/app/Master-data.vue'),
      meta: {
        pageTitle: 'Master Data',
        breadcrumb: [
          {
            text: 'Master Data',
            active: true,
          },
        ],
      },
    },
    // authentication
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/ForgotPassword.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        layout: 'full',
      },
    },
    // error
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {path:'/',redirect:'/app'},
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

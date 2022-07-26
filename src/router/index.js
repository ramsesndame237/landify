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
        pageTitle: 'app.page_title.dashboard',
        breadcrumb: [
          {
            text: 'app.page_title.dashboard',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/table/:table',
      name: 'table',
      component: () => import('@/views/app/Generic/KeyFix/Index.vue'),
      meta: {
        pageTitle: '',
        breadcrumb: [],
      },
    },
    {
      path: '/app/table/:table/view/:id',
      name: 'table-view',
      component: () => import('@/views/app/Generic/KeyFix/Edit.vue'),
      meta: {
        pageTitle: '',
        breadcrumb: [],
      },
    },
    {
      name: 'kanban',
      path: '/app/kanban',
      component: () => import('@/views/app/Kanban/index.vue'),
    },
    {
      path: '/app/deadlines',
      name: 'deadlines',
      component: () => import('@/views/app/Deadlines.vue'),
      meta: {
        pageTitle: 'app.page_title.deadlines',
        breadcrumb: [
          {
            text: 'app.page_title.deadlines',
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
        pageTitle: 'app.page_title.doc',
        breadcrumb: [
          {
            text: 'app.page_title.doc',
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
        pageTitle: 'app.page_title.properties',
        breadcrumb: [
          {
            text: 'app.page_title.properties',
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
        pageTitle: 'app.page_title.templates',
        breadcrumb: [
          {
            text: 'app.page_title.templates',
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
        pageTitle: 'app.page_title.master_data',
        breadcrumb: [
          {
            text: 'app.page_title.master_data',
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
    { path: '/', redirect: '/login' },

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

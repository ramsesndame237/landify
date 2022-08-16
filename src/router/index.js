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
      path: '/app/table/:table/create',
      name: 'table-form',
      component: () => import('@/views/app/Generic/KeyFix/Edit.vue'),
      meta: {
        pageTitle: '',
        breadcrumb: [],
      },
    },
    {
      path: '/app/ticket/:id/customer',
      name: 'new-business',
      component: () => import('@/views/app/SPNB/Index.vue'),
      meta: {
        pageTitle: 'app.page_title.s_p_n_b',
        breadcrumb: [
          {
            text: 'app.page_title.s_p_n_b',
            active: true,
          },
        ],
      },
    },
    {
      name: 'kanban',
      path: '/app/kanban',
      component: () => import('@/views/app/Kanban/index.vue'),
    },
    {
      name: 'table-positions-import',
      path: '/app/invoicepositions/import/:invoice',
      component: () => import('@/views/app/InvoicePositionImport.vue'),
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

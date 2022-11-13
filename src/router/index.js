import Vue from 'vue'
import VueRouter from 'vue-router'
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(from, to, savedPosition) {
    // Exists when Browser's back/forward pressed
    if (savedPosition) {
      return savedPosition
      // For anchors
    }
    if (to.hash) {
      return { selector: to.hash }
      // By changing queries we are still in the same component, so "from.path" === "to.path" (new query changes just "to.fullPath", but not "to.path").
    }
    if (from.path === to.path) {
      return {}
    }
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
        resource: 'dashboard',
      },
    },
    {
      path: '/app/table/:table',
      name: 'table',
      component: () => import('@/views/app/Generic/KeyFix/Index.vue'),
      meta: {
        pageTitle: '',
        breadcrumb: [],
        action: 'read',
      },
    },
    {
      path: '/app/table/:table/view/:id',
      name: 'table-view',
      component: () => import('@/views/app/Generic/KeyFix/Edit.vue'),
      meta: {
        pageTitle: '',
        breadcrumb: [],
        action: 'read',
      },
    },
    {
      path: '/app/table/:table/create',
      name: 'table-form',
      component: () => import('@/views/app/Generic/KeyFix/Edit.vue'),
      meta: {
        pageTitle: '',
        breadcrumb: [],
        action: 'create',
      },
    },
    // region Custom Edit Page
    {
      path: '/app/table/custom/contracdictionpackage/view/:id',
      name: 'contradictionpackage-view',
      component: () => import('@/views/app/Page/ContradictionPackage.vue'),
    },
    {
      path: '/app/table/custom/contracdictionpackage/create',
      name: 'contracdictionpackage-create',
      component: () => import('@/views/app/Page/ContradictionPackage.vue'),
    },
    // endregion
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
      name: 'table-kanban',
      path: '/app/table/:table/:id/kanban',
      component: () => import('@/views/app/Kanban/index.vue'),
    },
    {
      name: 'advanced-kanban',
      path: '/app/advanced-kanban',
      component: () => import('@/views/app/Kanban/AdvancedKanban.vue'),
    },
    {
      name: 'table-positions-import',
      // table parameter is just to fix menu
      path: '/app/table/:table/import/:invoice',
      component: () => import('@/views/app/InvoicePositionImport.vue'),
    },
    // Workpackage 7
    {
      path: '/app/backoffice',
      name: 'backoffice',
      component: () => import('@/views/app/Page/BackOffice.vue'),
      meta: {
        pageTitle: 'Back Office',
        breadcrumb: [
          {
            text: 'Back Office',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/import',
      name: 'import',
      component: () => import('@/views/app/Page/ImportPage.vue'),
      meta: {
        pageTitle: 'Import',
        breadcrumb: [
          {
            text: 'import Xlsx file',
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
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/ForgotPassword.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/not-authorized',
      name: 'misc-not-authorized',
      component: () => import('@/views/error/NotAuthorized.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
      },
    },
    {
      path: '/comming-soon',
      name: 'comming-soon',
      component: () => import('@/views/error/ComingSoon.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
      },
    },
    // error
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
      },
    },
    { path: '/', redirect: '/login' },

    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  console.log(to)
  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'login' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  return next()
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

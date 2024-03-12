import Vue from 'vue'
import VueRouter from 'vue-router'
import { canNavigate } from '@/libs/acl/routeProtection'
import jwt from '@/auth/jwt/useJwt'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import { checkAndverficationJwt, parseJwt } from '@/views/app/CustomComponents/DataTable/utils'
import BrowserId from 'browser-id'
import axiosIns from '@/libs/axios'

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
        pageTitle: 'headline~dashboard',
        breadcrumb: [
          {
            text: 'headline~dashboard',
            active: true,
          },
        ],
        resource: 'dashboard',
      },
    },
    {
      path: '/app/preview/document',
      name: 'previewDocument',
      component: () => import('@/views/app/Ticket/widgets/PreviewDocumentWidget.vue'),
      // props:true
    },
    {
      path: '/app/dashboard/ticket',
      name: 'ticketDashboard',
      component: () => import('@/views/app/Dashboard/TicketDashboard.vue'),
      meta: {
        pageTitle: 'headline~dashboard~ticket',
        breadcrumb: [
          {
            text: 'headline~dashboard~ticket',
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
      path: '/app/update_ticket',
      name: 'updateTicket',
      component: () => import('@/views/app/Ticket/UpdateTicketList.vue'),
      meta: {
        pageTitle: '',
        breadcrumb: [
          {
            text: 'menu~ticketlistupdate',
            active: true,
          },
        ],
        action: 'read',
      },
    },
    {
      path: '/app/preview/document/:document_id/:name',
      name: 'previewDocument',
      component: () => import('@/views/app/Ticket/widgets/PreviewDocumentWidget.vue'),
      props: true,
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
        pageTitle: 'headline~new_business',
        action: 'menu~newbus',
        resource: 'menu',
        breadcrumb: [
          {
            text: 'headline~new_business',
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
      name: 'table-positions-import',
      // table parameter is just to fix menu
      path: '/app/table/:table/import/:invoice',
      component: () => import('@/views/app/InvoicePositionImport.vue'),
    },
    {
      name: 'payments-list',
      path: '/app/payments-list',
      component: () => import('@/views/app/Page/PaymentsList.vue'),
      meta: {
        action: 'menu~contractpaymentslist',
        resource: 'menu',
      },
    },
    {
      name: 'condition-list',
      path: '/app/condition-list',
      component: () => import('@/views/app/Page/ConditionList.vue'),
      meta: {
        action: 'menu~contractcondition',
        resource: 'menu',
      },
    },
    {
      name: 'deadline-list',
      path: '/app/deadline-list',
      component: () => import('@/views/app/Page/DeadlineList.vue'),
      meta: {
        action: 'menu~contractdeadline',
        resource: 'menu',
      },
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
        action: 'menu~importstandard',
        resource: 'menu',
        pageTitle: 'Import',
        breadcrumb: [
          {
            text: 'import Xlsx file',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/:table/profile',
      name: 'user-profile',
      component: () => import('@/views/app/Page/UserProfile/Index.vue'),
      meta: {
        pageTitle: 'User profile',
      },
    },
    {
      path: '/app/import-contract',
      name: 'import-contract',
      component: () => import('@/views/app/Page/ImportContract.vue'),
      meta: {
        action: 'menu~importcontract',
        resource: 'menu',
        pageTitle: 'Import Contract',
        breadcrumb: [
          {
            text: 'Import contract',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/incoming-mails',
      name: 'incoming-mails',
      component: () => import('@/views/app/Page/IncomingMails.vue'),
      meta: {
        action: 'menu~classification',
        resource: 'menu',
        pageTitle: 'Email Listing and Processing',
        breadcrumb: [
          {
            text: 'Incoming Mails',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/classification-summary',
      name: 'classification-summary',
      component: () => import('@/views/app/Page/IncomingMails.vue'),
      meta: {
        action: 'menu~classification',
        resource: 'menu',
        pageTitle: 'Email Listing and Processing',
        breadcrumb: [
          {
            text: 'Incoming Mails',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/sign-document/:id/ticket/:ticket_id',
      name: 'sign-document',
      component: () => import('@/views/app/Page/SignDocument'),
      meta: {
        action: 'menu~classification',
        resource: 'menu',
        pageTitle: 'Sign a document',
      },
    },
    {
      path: '/app/table/:table/popup/:list',
      name: 'new-entity-popup',
      component: () => import('@/views/app/CreateComponent/NewEntityPopupForm.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/app/menu',
      name: 'menu',
      component: () => import('@/views/app/MenuProfile/IndexMenuProfile.vue'),
      meta: {
        action: 'menu~menu',
        resource: 'menu',
        pageTitle: 'page~menu~title',
        breadcrumb: [
          {
            text: 'page~menu~title',
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
      path: '/change-password',
      name: 'change-password',
      component: () => import('@/views/ChangePassword.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/auth/verification/:token',
      name: 'verify-token',
      component: () => import('@/views/VerifyToken.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/auth/reset-password/:token',
      name: 'reset-password',
      component: () => import('@/views/ResetPassword.vue'),
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
        // layout: 'full',
        resource: 'Auth',
      },
    },
    {
      path: '/comming-soon',
      name: 'comming-soon',
      component: () => import('@/views/error/ComingSoon.vue'),
      meta: {
        // layout: 'full',
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
  const isLoggedIn = jwt.isUserLoggedIn()
  console.log(to, canNavigate(to), 'navigation')
  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'login' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    next(getHomeRouteForLoggedInUser())
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
router.beforeEach((to, from, next) => {
  const currentToken = localStorage.getItem('accessToken')
  const currentRefreshToken = localStorage.getItem('refreshToken')
  const TIME_LIMIT_EXPIRIED = 20 * 60 * 1000
  if (currentToken && parseJwt(currentToken)?.iat + TIME_LIMIT_EXPIRIED <= Math.round(Date.now() / 1000)) {
    axiosIns.post('/auth/refresh/token', {
      user_browser_hash: BrowserId(),
      user_refresh_token: currentRefreshToken,
    }).then(response => {
      localStorage.setItem('accessToken', response.data.user_token)
      localStorage.setItem('refreshToken', response.data.user_refresh_token)
    }).catch(error => console.error(error))
  }

  return next()
})

export default router

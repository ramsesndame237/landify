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
      path: '/app/users',
      name: 'users-list',
      component: () => import('@/views/app/Users/index.vue'),
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
      path: '/app/users/edit/:id',
      name: 'user-edit',
      props: true,
      component: () => import('@/views/app/Users/Edit.vue'),
      meta: {
        pageTitle: 'Edit User',
        navActiveLink: 'users-list',
        breadcrumb: [
          {
            text: 'Overall list users',
            to: { name: 'users-list' },
            active: false,
          },
          {
            text: 'Edit User',
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

    {
      path: '/app/Authorization',
      name: 'authorization',
      component: () => import('@/views/app/Authorization/index.vue'),
      meta: {
        pageTitle: 'Documents',
        breadcrumb: [
          {
            text: 'Authorization Management list view',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/authorization/edit',
      name: 'authorization-edit',
      component: () => import('@/views/app/Authorization/Edit.vue'),
      meta: {
        pageTitle: 'Authorization User',
        breadcrumb: [
          {
            text: 'Authorization User',
            active: true,
          },
        ],
      },
    },

    {
      path: '/app/Teams',
      name: 'teams',
      component: () => import('@/views/app/Teams/index.vue'),
      meta: {
        pageTitle: 'Teams',
        breadcrumb: [
          {
            text: 'Teams',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/Teams/edit',
      name: 'teams-edit',
      component: () => import('@/views/app/Teams/Edit.vue'),
      meta: {
        pageTitle: 'Teams User',
        breadcrumb: [
          {
            text: 'Teams User',
            active: true,
          },
        ],
      },
    },

    {
      path: '/app/users-type',
      name: 'users-type',
      component: () => import('@/views/app/UsersType/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST USER TYPE',
        breadcrumb: [
          {
            text: 'OVERALL LIST USER TYPE',
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
    {path:'/',redirect:'/login'},

    {
      path: '*',
      redirect: 'error-404',
    },

      // workpackage 2
    {
      path: '/app/customer-groups',
      name: 'customer-groups',
      component: () => import('@/views/app/Customers/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST CUSTOMER GROUPS',
        breadcrumb: [
          {
            text: 'OVERALL LIST CUSTOMER GROUPS',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/customer-groups-edit',
      name: 'customer-groups-edit',
      component: () => import('@/views/app/Customers/Edit.vue'),
      meta: {
        pageTitle: 'EDIT GROUP',
        breadcrumb: [
          {
            text: 'EDIT',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/companies',
      name: 'company-list',
      component: () => import('@/views/app/Company/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST COMPANIES',
        breadcrumb: [
          {
            text: 'OVERALL LIST COMPANIES',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/companies/edit',
      name: 'company-edit',
      component: () => import('@/views/app/Company/Edit.vue'),
      meta: {
        pageTitle: 'COMPANY EDIT',
        navActiveLink: 'company-list',
        breadcrumb: [
          {
            text: 'List of companies',
            to: {name: 'company-list'},
            active: false,
          },
          {
            text: 'COMPANY EDIT',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/contact-person',
      name: 'contact-person',
      component: () => import('@/views/app/Contact_Person/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST CONTACT PERSONS',
        breadcrumb: [
          {
            text: 'OVERALL LIST CONTACT PERSONS',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/contact-person-edit',
      name: 'contact-person-edit',
      component: () => import('@/views/app/Contact_Person/Edit.vue'),
      meta: {
        pageTitle: 'CONTACT PERSON',
        breadcrumb: [
          {
            text: 'CONTACT PERSON',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/payment',
      name: 'payment',
      component: () => import('@/views/app/Payment/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST PAYMENT Data',
        breadcrumb: [
          {
            text: 'OVERALL LIST PAYMENT Data',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/payment/edit',
      name: 'payment-edit',
      component: () => import('@/views/app/Payment/Edit.vue'),
      meta: {
        pageTitle: 'OVERALL LIST PAYMENT Data',
        breadcrumb: [
          {
            text: 'OVERALL LIST PAYMENT Data',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/partner/company',
      name: 'partner-company',
      component: () => import('@/views/app/Partner_Company/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST PARTNER COMPANIES',
        breadcrumb: [
          {
            text: 'OVERALL LIST PARTNER COMPANIES',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/partner/company/edit',
      name: 'partner-company-edit',
      component: () => import('@/views/app/Partner_Company/Edit.vue'),
      meta: {
        pageTitle: 'PARTNER COMPANIES EDIT',
        breadcrumb: [
          {
            text: 'PARTNER COMPANIES EDIT',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/partner/company/group',
      name: 'partner-company-group',
      component: () => import('@/views/app/partner-company-group/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST PARTNER GROUP ',
        breadcrumb: [
          {
            text: 'OVERALL LIST PARTNER GROUP',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/partner/company/group/edit',
      name: 'partner-company-group-edit',
      component: () => import('@/views/app/partner-company-group/Edit.vue'),
      meta: {
        pageTitle: 'PARTNER GROUP EDIT',
        breadcrumb: [
          {
            text: 'PARTNER GROUP EDIT',
            active: true,
          },
        ],
      },
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

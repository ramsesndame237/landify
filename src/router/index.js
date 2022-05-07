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
      path: '/app/users/edit',
      name: 'user-edit',
      component: () => import('@/views/app/Users/Edit.vue'),
      meta: {
        pageTitle: 'Edit User',
        navActiveLink: 'users-list',
        breadcrumb: [
          {
            text: 'Overall list users',
            to: {name: 'users-list'},
            active: false
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
        navActiveLink: "customer-groups",
        breadcrumb: [
          {
            text: 'List of Cusotmer Groups',
            to: {name: 'customer-groups'},
            active: false,
          },
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
      path: '/app/contact-person/edit',
      name: 'contact-person-edit',
      component: () => import('@/views/app/Contact_Person/Edit.vue'),
      meta: {
        pageTitle: 'CONTACT PERSON',
        navActiveLink:"contact-person",
        breadcrumb: [         
          {
            text: 'Overall List Contact Person',
            to: {name: 'company-list'},
            active: false,
          },
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
        pageTitle: 'EDIT PAYMENT Data',
        navActiveLink:'payment',
        breadcrumb: [
          {
            text: 'Overall List Payment Data',
            to: {name: 'company-list'},
            active: false,
          },
          {
            text: 'EDIT PAYMENT Data',
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
        navActiveLink:"partner-company",
        breadcrumb: [
          {
            text: 'Overall List Partner Companies',
            to: {name: 'partner-company'},
            active: false,
          },
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
        navActiveLink:'partner-company-group',
        breadcrumb: [
          {
            text: 'Overall List Partner Group',
            to: {name: 'partner-company-group'},
            active: false,
          },
          {
            text: 'PARTNER GROUP EDIT',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/address',
      name: 'address-list',
      component: () => import('@/views/app/Address/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST ADDRESS ',
        breadcrumb: [
          {
            text: 'OVERALL LIST ADDRESS ',
            active: true,
          },
        ],
      },
    },

    {
      path: '/app/address/edit',
      name: 'address-edit',
      component: () => import('@/views/app/Address/Edit.vue'),
      meta: {
        pageTitle: 'ADDRESS EDIT',
        navActiveLink: 'address-list',
        breadcrumb: [
          {
            text: 'Overall List Address',
            to: {name: 'address-list'},
            active: false,
          },
          {
            text: 'ADDRESS EDIT',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/contact-title',
      name: 'contact-title-list',
      component: () => import('@/views/app/Contact_Title/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST CONTACT TITLE ',
        breadcrumb: [
          {
            text: 'OVERALL LIST CONTACT TITLE ',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/contact-title/edit',
      name: 'contact-title-edit',
      component: () => import('@/views/app/Contact_Title/Edit.vue'),
      meta: {
        pageTitle: 'CONTACT TITLE EDIT',
        navActiveLink: 'contact-title-list',
        breadcrumb: [
          {
            text: 'Overall List Contact Title',
            to: {name: 'contact-title-list'},
            active: false,
          },
          {
            text: 'CONTACT TITLE EDIT',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/salutation',
      name: 'salutation-list',
      component: () => import('@/views/app/Salutation/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST SALUTATION ',
        breadcrumb: [
          {
            text: 'OVERALL LIST SALUTATION ',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/salutation/edit',
      name: 'salutation-edit',
      component: () => import('@/views/app/Salutation/Edit.vue'),
      meta: {
        pageTitle: 'SALUTATION EDIT',
        navActiveLink: 'salutation-list',
        breadcrumb: [
          {
            text: 'Overall List Salutation',
            to: {name: 'salutation-list'},
            active: false,
          },
          {
            text: 'SALUTATION EDIT',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/city',
      name: 'city-list',
      component: () => import('@/views/app/City/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST CITIES ',
        breadcrumb: [
          {
            text: 'OVERALL LIST CITIES ',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/city/edit',
      name: 'city-edit',
      component: () => import('@/views/app/City/Edit.vue'),
      meta: {
        pageTitle: 'CITY EDIT',
        navActiveLink: 'city-list',
        breadcrumb: [
          {
            text: 'Overall List Cities',
            to: {name: 'city-list'},
            active: false,
          },
          {
            text: 'CITY EDIT',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/currency',
      name: 'currency-list',
      component: () => import('@/views/app/Currency/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST CURRENCIES ',
        breadcrumb: [
          {
            text: 'OVERALL LIST CURRENCIES ',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/currency/edit',
      name: 'currency-edit',
      component: () => import('@/views/app/Currency/Edit.vue'),
      meta: {
        pageTitle: 'CURRENCY EDIT',
        navActiveLink: 'currency-list',
        breadcrumb: [
          {
            text: 'Overall List Currencies',
            to: {name: 'currency-list'},
            active: false,
          },
          {
            text: 'CURRENCY EDIT',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/country',
      name: 'country-list',
      component: () => import('@/views/app/Country/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST COUNTRY ',
        breadcrumb: [
          {
            text: 'OVERALL LIST COUNTRY ',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/country/edit',
      name: 'country-edit',
      component: () => import('@/views/app/Country/Edit.vue'),
      meta: {
        pageTitle: 'COUNTRY EDIT',
        navActiveLink: 'country-list',
        breadcrumb: [
          {
            text: 'Overall List Country',
            to: {name: 'country-list'},
            active: false,
          },
          {
            text: 'COUNTRY EDIT',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/language',
      name: 'language-list',
      component: () => import('@/views/app/Language/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST LANGUAGE ',
        breadcrumb: [
          {
            text: 'OVERALL LIST LANGUAGE ',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/language/edit',
      name: 'language-edit',
      component: () => import('@/views/app/Language/Edit.vue'),
      meta: {
        pageTitle: 'LANGUAGE EDIT',
        navActiveLink: 'language-list',
        breadcrumb: [
          {
            text: 'Overall List langauge',
            to: {name: 'language-list'},
            active: false,
          },
          {
            text: 'LANGUAGE EDIT',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/partner-type',
      name: 'partner-type-list',
      component: () => import('@/views/app/Partner_Type/index.vue'),
      meta: {
        pageTitle: 'OVERALL LIST PARTNER TYPE ',
        breadcrumb: [
          {
            text: 'OVERALL LIST PARTNER TYPE ',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/partner-type/edit',
      name: 'partner-type-edit',
      component: () => import('@/views/app/Partner_Type/Edit.vue'),
      meta: {
        pageTitle: 'PARTNER TYPE EDIT',
        navActiveLink: 'partner-type-list',
        breadcrumb: [
          {
            text: 'Overall List Partner Type',
            to: {name: 'partner-type-list'},
            active: false,
          },
          {
            text: 'PARTNER TYPE EDIT',
            active: true,
          },
        ],
      },
    },

    {
      path: '/app/new_business',
      name: 'new-business',
      component: () => import('@/views/app/SPNB/Index.vue'),
      meta: {
        pageTitle: 'NEW BUSINESS',
        breadcrumb: [
          {
            text: 'NEW BUSINESS',
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

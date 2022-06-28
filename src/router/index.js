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
      component: () => import('@/views/app/Generic/index.vue'),
      meta: {
        pageTitle: '',
        breadcrumb: [],
      },
    },
    {
      path: '/app/table/:table/view/:id',
      name: 'table-view',
      component: () => import('@/views/app/Generic/Edit.vue'),
      meta: {
        pageTitle: '',
        breadcrumb: [],
      },
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

    // workpackage 2
    {
      path: '/app/partner-type/edit',
      name: 'partner-type-edit',
      component: () => import('@/views/app/Partner_Type/Edit.vue'),
      meta: {
        pageTitle: 'app.page_title.partner_type_edit',
        navActiveLink: 'partner-type-list',
        breadcrumb: [
          {
            text: 'app.page_title.partner_type',
            to: { name: 'partner-type-list' },
            active: false,
          },
          {
            text: 'app.page_title.partner_type_edit',
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
      path: '/app/p-o-s',
      name: 'pos-list',
      component: () => import('@/views/app/POS/index.vue'),
      meta: {
        pageTitle: 'app.page_title.pos_list',
        breadcrumb: [
          {
            text: 'app.page_title.pos_list',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/p-o-s/edit',
      name: 'pos-edit',
      component: () => import('@/views/app/POS/Edit.vue'),
      meta: {
        pageTitle: 'app.page_title.pos_edit',
        navActiveLink: 'pos-list',
        breadcrumb: [
          {
            text: 'app.page_title.pos_list',
            to: { name: 'pos-list' },
            active: false,
          },
          {
            text: 'app.page_title.pos_edit',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/area',
      name: 'area-list',
      component: () => import('@/views/app/Area/index.vue'),
      meta: {
        pageTitle: 'app.page_title.area',
        breadcrumb: [
          {
            text: 'app.page_title.area',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/area/edit',
      name: 'area-edit',
      component: () => import('@/views/app/Area/Edit.vue'),
      meta: {
        pageTitle: 'app.page_title.area_type_edit',
        navActiveLink: 'area-list',
        breadcrumb: [
          {
            text: 'app.page_title.area_edit',
            to: { name: 'area-list' },
            active: false,
          },
          {
            text: 'app.page_title.area_edit',
            active: true,
          },
        ],
      },
    },

    {
      path: '/app/types/area',
      name: 'area-type-list',
      component: () => import('@/views/app/Types/index.vue'),
      navActiveLink: 'area-type-list',
      meta: {
        pageTitle: 'app.page_title.area_type',
        breadcrumb: [
          {
            text: 'app.page_title.area_type',
            active: true,
          },
        ],
        type: 'area',
        formTitle: 'app.content.create_new_area_type',
      },
    },
    {
      path: '/app/types/contract',
      name: 'contract-type-list',
      component: () => import('@/views/app/Types/index.vue'),
      navActiveLink: 'contract-type-list',
      meta: {
        pageTitle: 'app.page_title.contract_type',
        breadcrumb: [
          {
            text: 'app.page_title.contract_type',
            active: true,
          },
        ],
        type: 'contract',
        formTitle: 'app.content.create_new_contract_type',
      },
    },
    {
      path: '/app/types/contract/criteria-type',
      name: 'contract-criteria-type',
      component: () => import('@/views/app/Types/index.vue'),
      navActiveLink: 'contract-criteria-type',
      meta: {
        pageTitle: 'app.page_title.C_C_type',
        breadcrumb: [
          {
            text: 'app.page_title.C_C_type',
            active: true,
          },
        ],
        type: 'contractCrieria',
        formTitle: 'app.content.create_new_C_C_type',
      },
    },
    {
      path: '/app/types/location',
      name: 'location-type',
      component: () => import('@/views/app/Types/index.vue'),
      navActiveLink: 'location-type',
      meta: {
        pageTitle: 'app.page_title.location_type',
        breadcrumb: [
          {
            text: 'app.page_title.location_type',
            active: true,
          },
        ],
        type: 'location',
        formTitle: 'app.content.create_new_location_type',
      },
    },
    {
      path: '/app/types/maturity',
      name: 'maturity-type',
      component: () => import('@/views/app/Types/index.vue'),
      navActiveLink: 'maturity-type',
      meta: {
        pageTitle: 'app.page_title.maturity_type',
        breadcrumb: [
          {
            text: 'app.page_title.maturity_type',
            active: true,
          },
        ],
        type: 'maturity',
        formTitle: 'app.content.create_new_maturity_type',
      },
    },
    {
      path: '/app/types/recurring-payment',
      name: 'recurring-payment-type',
      component: () => import('@/views/app/Types/index.vue'),
      navActiveLink: 'recurring-payment-type',
      meta: {
        pageTitle: 'app.page_title.R_P_type',
        breadcrumb: [
          {
            text: 'app.page_title.R_P_type',
            active: true,
          },
        ],
        type: 'recurringPayment',
        formTitle: 'app.content.create_new_R_P_type',
      },
    },
    {
      path: '/app/types/services-objects',
      name: 'service-object-type',
      component: () => import('@/views/app/Types/index.vue'),
      navActiveLink: 'services-object-type',
      meta: {
        pageTitle: 'app.page_title.S_O_type',
        breadcrumb: [
          {
            text: 'app.page_title.S_O_type',
            active: true,
          },
        ],
        type: 'serviceObject',
        formTitle: 'app.content.create_new_S_O_type',
      },
    },
    {
      path: '/app/types/usages',
      name: 'usage-type',
      component: () => import('@/views/app/Types/index.vue'),
      navActiveLink: 'usage-type',
      meta: {
        pageTitle: 'app.page_title.usage_type',
        breadcrumb: [
          {
            text: 'app.page_title.usage_type',
            active: true,
          },
        ],
        type: 'usages',
        formTitle: 'app.content.create_new_usage_type',
      },
    },
    {
      path: '/app/choices',
      name: 'choices',
      component: () => import('@/views/app/Choices/index.vue'),
      navActiveLink: 'usage-type',
      meta: {
        pageTitle: 'app.page_title.choice',
        breadcrumb: [
          {
            text: 'app.page_title.choice',
            active: true,
          },
        ],
        formTitle: 'app.content.create_new_choice',
      },
    },
    {
      path: '/app/units',
      name: 'units',
      component: () => import('@/views/app/Unit/index.vue'),
      meta: {
        pageTitle: 'app.page_title.unit',
        breadcrumb: [
          {
            text: 'app.page_title.unit',
            active: true,
          },
        ],
        formTitle: 'app.content.create_new_unit',
      },
    },
    {
      path: '/app/tags',
      name: 'tags',
      component: () => import('@/views/app/Tag/index.vue'),
      meta: {
        pageTitle: 'app.page_title.tag',
        breadcrumb: [
          {
            text: 'app.page_title.tag',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/tags/edit',
      name: 'tag-edit',
      component: () => import('@/views/app/Tag/Edit.vue'),
      meta: {
        navActiveLink: 'tags',
        pageTitle: 'app.page_title.tag_edit',
        breadcrumb: [
          {
            text: 'app.page_title.tag',
            to: { name: 'tags' },
          },
          {
            text: 'app.page_title.tag_edit',
            active: true,
          },
        ],
      },
    },

    // {
    //   path: '/app/types/area/edit',
    //   name: 'area-type-edit',
    //   component: () => import('@/views/app/AreaType/Edit.vue'),
    //   navActiveLink: 'area-type-list',
    //   meta: {
    //     pageTitle: 'app.page_title.area_type_edit',
    //     breadcrumb: [
    //       {
    //         text: 'app.page_title.area_type',
    //         to: { name: 'area-list' },
    //       },
    //       {
    //         text: 'app.page_title.area_type_edit',
    //         active: true
    //       },
    //     ],
    //   },
    // },
    {
      path: '/app/location',
      name: 'location-list',
      component: () => import('@/views/app/Location/index.vue'),
      meta: {
        pageTitle: 'app.page_title.location',
        breadcrumb: [
          {
            text: 'app.page_title.location',
          }],
      },
    },
    {
      path: '/app/location/view',
      name: 'location-view',
      component: () => import('@/views/app/Location/View.vue'),
      meta: {
        pageTitle: 'app.page_title.location_view',
        navActiveLink: 'location-list',
        breadcrumb: [
          {
            text: 'app.page_title.location',
            to: { name: 'location-list' },
            active: false,
          },
          {
            text: 'app.page_title.location_view',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/location/edit',
      name: 'location-edit',
      component: () => import('@/views/app/Location/Edit.vue'),
      meta: {
        pageTitle: 'app.page_title.location_edit',
        navActiveLink: 'location-edit',
        breadcrumb: [
          {
            text: 'app.page_title.location_edit',
            to: { name: 'location-list' },
            active: false,
          },
          {
            text: 'app.page_title.location_edit',
            active: true,
          },
        ],
      },
    },

    {
      path: '/app/contracts',
      name: 'contracts-list',
      component: () => import('@/views/app/Contracts/index.vue'),
      meta: {
        pageTitle: 'app.page_title.contract',
        breadcrumb: [
          {
            text: 'app.page_title.contract',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/contract/edit',
      name: 'contracts-view',
      component: () => import('@/views/app/Contracts/View.vue'),
      meta: {
        pageTitle: 'app.page_title.contract_edit',
        navActiveLink: 'contracts-list',
        breadcrumb: [
          {
            text: 'app.page_title.contract',
            to: { name: 'contracts-list' },
            active: false,
          },
          {
            text: 'app.page_title.contract_edit',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/contract/lease',
      name: 'contracts-lease',
      component: () => import('@/views/app/Contracts/lease/index.vue'),
      meta: {
        pageTitle: 'app.page_title.contract_lease',
        breadcrumb: [
          {
            text: 'app.page_title.contract_lease',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/contract/lease/edit',
      name: 'contracts-lease-view',
      component: () => import('@/views/app/Contracts/lease/View.vue'),
      meta: {
        pageTitle: 'app.page_title.contract_view',
        navActiveLink: 'contracts-lease',
        breadcrumb: [
          {
            text: 'app.page_title.contract_lease',
            to: { name: 'contracts-lease' },
            active: false,
          },
          {
            text: 'app.page_title.contract_view',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/services-object',
      name: 'services-object-list',
      component: () => import('@/views/app/Services_object/index.vue'),
      meta: {
        pageTitle: 'app.page_title.services',
        breadcrumb: [
          {
            text: 'app.page_title.services',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/services-object/edit',
      name: 'services-object-view',
      component: () => import('@/views/app/Services_object/View.vue'),
      meta: {
        pageTitle: 'app.page_title.service_view',
        navActiveLink: 'services-object-list',
        breadcrumb: [
          {
            text: 'app.page_title.services',
            to: { name: 'services-object-list' },
            active: false,
          },
          {
            text: 'app.page_title.service_view',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/criteria',
      name: 'criteria-list',
      component: () => import('@/views/app/Criteria/index.vue'),
      meta: {
        pageTitle: 'app.page_title.criteria',
        breadcrumb: [
          {
            text: 'app.page_title.criteria',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/criteria/view',
      name: 'criteria-view',
      component: () => import('@/views/app/Criteria/View.vue'),
      meta: {
        pageTitle: 'app.page_title.criteria_view',
        navActiveLink: 'criteria-list',
        breadcrumb: [
          {
            text: 'app.page_title.criteria',
            to: { name: 'criteria-list' },
            active: false,
          },
          {
            text: 'app.page_title.criteria_view',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/index_clause',
      name: 'index-clause-list',
      component: () => import('@/views/app/Index_clause/index.vue'),
      meta: {
        pageTitle: 'app.page_title.index_clause',
        breadcrumb: [
          {
            text: 'app.page_title.index_clause',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/index_clause/view',
      name: 'index-clause-view',
      component: () => import('@/views/app/Index_clause/View.vue'),
      meta: {
        pageTitle: 'app.page_title.index_clause_view',
        navActiveLink: 'index-clause-list',
        breadcrumb: [
          {
            text: 'app.page_title.index_clause',
            to: { name: 'index-clause-list' },
            active: false,
          },
          {
            text: 'app.page_title.index_clause_view',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/special-right',
      name: 'special-right-list',
      component: () => import('@/views/app/Special_right/index.vue'),
      meta: {
        pageTitle: 'app.page_title.special_right',
        breadcrumb: [
          {
            text: 'app.page_title.special_right',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/special-right/view',
      name: 'special-right-view',
      component: () => import('@/views/app/Special_right/View.vue'),
      meta: {
        pageTitle: 'app.page_title.special_right_view',
        navActiveLink: 'special-right-list',
        breadcrumb: [
          {
            text: 'app.page_title.special_right',
            to: { name: 'special-right-list' },
            active: false,
          },
          {
            text: 'app.page_title.special_right_view',
            active: true,
          },
        ],
      },
    },

    {
      path: '/app/recurring-payment',
      name: 'recurring-payment-list',
      component: () => import('@/views/app/Recurring_payment/index.vue'),
      meta: {
        pageTitle: 'app.page_title.recurring_payment',
        breadcrumb: [
          {
            text: 'app.page_title.recurring_payment',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/recurring-payment/view',
      name: 'recurring-payment-view',
      component: () => import('@/views/app/Recurring_payment/View.vue'),
      meta: {
        pageTitle: 'app.page_title.recurring_payment_view',
        navActiveLink: 'recurring-payment-list',
        breadcrumb: [
          {
            text: 'app.page_title.recurring_payment',
            to: { name: 'recurring-payment-list' },
            active: false,
          },
          {
            text: 'app.page_title.recurring_payment_view',
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

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
      path: '/app/pos',
      name: 'pos',
      component: () => import('@/views/app/POS.vue'),
      meta: {
        pageTitle: 'app.page_title.pos',
        breadcrumb: [
          {
            text: 'app.page_title.pos',
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
      path: '/app/users',
      name: 'users-list',
      component: () => import('@/views/app/Users/index.vue'),
      meta: {
        pageTitle: 'app.page_title.users_rights',
        breadcrumb: [
          {
            text: 'app.page_title.users_rights',
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
        pageTitle: 'app.page_title.users_rights_edit',
        navActiveLink: 'users-list',
        breadcrumb: [
          {
            text: 'app.page_title.users_rights',
            to: {name: 'users-list'},
            active: false
          },
          {
            text: 'app.page_title.users_rights_edit',
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

    {
      path: '/app/Authorization',
      name: 'authorization',
      component: () => import('@/views/app/Authorization/index.vue'),
      meta: {
        pageTitle: 'app.page_title.auth',
        breadcrumb: [
          {
            text: 'app.page_title.auth',
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
        pageTitle: 'app.page_title.auth_edit',
        breadcrumb: [
          {
            text: 'app.page_title.auth_edit',
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
        pageTitle: 'app.page_title.teams',
        breadcrumb: [
          {
            text: 'app.page_title.teams',
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
        pageTitle: 'app.page_title.team_edit',
        breadcrumb: [
          {
            text: 'app.page_title.team_edit',
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
        pageTitle: 'app.page_title.user_type',
        breadcrumb: [
          {
            text: 'app.page_title.user_type',
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
        pageTitle: 'app.page_title.customer_group',
        breadcrumb: [
          {
            text: 'app.page_title.customer_group',
            active: true,
          },
        ],
      },
    },
    {
      path: '/app/customer-groups/edit',
      name: 'customer-groups-edit',
      component: () => import('@/views/app/Customers/Edit.vue'),
      meta: {
        pageTitle: 'app.page_title.customer_group',
        navActiveLink: "customer-groups",
        breadcrumb: [
          {
            text: 'app.page_title.customer_group',
            to: {name: 'customer-groups'},
            active: false,
          },
          {
            text: 'app.page_title.customer_group_edit',
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
        pageTitle: 'app.page_title.company',
        breadcrumb: [
          {
            text: 'app.page_title.company',
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
        pageTitle: 'app.page_title.company_edit',
        navActiveLink: 'company-list',
        breadcrumb: [
          {
            text: 'app.page_title.company',
            to: {name: 'company-list'},
            active: false,
          },
          {
            text: 'app.page_title.company_edit',
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
        pageTitle: 'app.page_title.contact_person',
        breadcrumb: [
          {
            text: 'app.page_title.contact_person',
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
        pageTitle: 'app.page_title.contact_person_edit',
        navActiveLink:"contact-person",
        breadcrumb: [
          {
            text: 'app.page_title.contact_person',
            to: {name: 'contact-person'},
            active: false,
          },
          {
            text: 'app.page_title.contact_person_edit',
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
        pageTitle: 'app.page_title.payment',
        breadcrumb: [
          {
            text: 'app.page_title.payment',
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
        pageTitle: 'app.page_title.payment_edit',
        navActiveLink:'payment',
        breadcrumb: [
          {
            text: 'app.page_title.payment',
            to: {name: 'payment'},
            active: false,
          },
          {
            text: 'app.page_title.payment_edit',
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
        pageTitle: 'app.page_title.partner_company',
        breadcrumb: [
          {
            text: 'app.page_title.partner_company',
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
        pageTitle: 'app.page_title.partner_company_edit',
        navActiveLink:"partner-company",
        breadcrumb: [
          {
            text: 'app.page_title.partner_company',
            to: {name: 'partner-company'},
            active: false,
          },
          {
            text: 'app.page_title.partner_company_edit',
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
        pageTitle: 'app.page_title.partner_company_group',
        breadcrumb: [
          {
            text: 'app.page_title.partner_company_group',
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
        pageTitle: 'app.page_title.partner_company_edit',
        navActiveLink:'partner-company-group',
        breadcrumb: [
          {
            text: 'app.page_title.partner_company_group',
            to: {name: 'partner-company-group'},
            active: false,
          },
          {
            text: 'app.page_title.partner_company_edit',
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
        pageTitle: 'app.page_title.address',
        breadcrumb: [
          {
            text: 'app.page_title.address',
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
        pageTitle: 'app.page_title.address_edit',
        navActiveLink: 'address-list',
        breadcrumb: [
          {
            text: 'app.page_title.address',
            to: {name: 'address-list'},
            active: false,
          },
          {
            text: 'app.page_title.address_edit',
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
        pageTitle: 'app.page_title.contact_title',
        breadcrumb: [
          {
            text: 'app.page_title.contact_title',
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
        pageTitle: 'app.page_title.contact_title_edit',
        navActiveLink: 'contact-title-list',
        breadcrumb: [
          {
            text: 'app.page_title.contact_title',
            to: {name: 'contact-title-list'},
            active: false,
          },
          {
            text: 'app.page_title.contact_title_edit',
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
        pageTitle: 'app.page_title.salutation',
        breadcrumb: [
          {
            text: 'app.page_title.salutation',
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
        pageTitle: 'app.page_title.salutation_edit',
        navActiveLink: 'salutation-list',
        breadcrumb: [
          {
            text: 'app.page_title.salutation',
            to: {name: 'salutation-list'},
            active: false,
          },
          {
            text: 'app.page_title.salutation_edit',
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
        pageTitle: 'app.page_title.city',
        breadcrumb: [
          {
            text: 'app.page_title.city',
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
        pageTitle: 'app.page_title.city_edit',
        navActiveLink: 'city-list',
        breadcrumb: [
          {
            text: 'app.page_title.city',
            to: {name: 'city-list'},
            active: false,
          },
          {
            text: 'app.page_title.city_edit',
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
        pageTitle: 'app.page_title.currency',
        breadcrumb: [
          {
            text: 'app.page_title.currency',
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
        pageTitle: 'app.page_title.city_edit',
        navActiveLink: 'currency-list',
        breadcrumb: [
          {
            text: 'app.page_title.currency',
            to: {name: 'currency-list'},
            active: false,
          },
          {
            text: 'app.page_title.city_edit',
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
        pageTitle: 'app.page_title.country',
        breadcrumb: [
          {
            text: 'app.page_title.country',
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
        pageTitle: 'app.page_title.country_edit',
        navActiveLink: 'country-list',
        breadcrumb: [
          {
            text: 'app.page_title.country',
            to: {name: 'country-list'},
            active: false,
          },
          {
            text: 'app.page_title.country_edit',
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
        pageTitle: 'app.page_title.lang',
        breadcrumb: [
          {
            text: 'app.page_title.lang',
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
        pageTitle: 'app.page_title.lang_edit',
        navActiveLink: 'language-list',
        breadcrumb: [
          {
            text: 'app.page_title.lang',
            to: {name: 'language-list'},
            active: false,
          },
          {
            text: 'app.page_title.lang_edit',
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
        pageTitle: 'app.page_title.partner_type',
        breadcrumb: [
          {
            text: 'app.page_title.partner_type',
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
        pageTitle: 'app.page_title.partner_type_edit',
        navActiveLink: 'partner-type-list',
        breadcrumb: [
          {
            text: 'app.page_title.partner_type',
            to: {name: 'partner-type-list'},
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
            to: {name: 'pos-list'},
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
      component: () => import('@/views/app/AreaType/index.vue'),
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
        pageTitle: 'app.page_title.contract_type',
        breadcrumb: [
          {
            text: 'app.page_title.contract_type',
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
          }]
        }
      },
    {
      path: '/app/location/view',
      name: 'location-view',
      component: () => import('@/views/app/Location/View.vue'),
      meta: {
        pageTitle: 'app.page_title.location_view',
        navActiveLink: 'location-view',
        breadcrumb: [
          {
            text: 'app.page_title.location_view',
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

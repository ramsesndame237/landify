export default [
  {
    header: 'Apps',
  },
  {
    title: 'app.sidebar.dashboard',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'app.sidebar.tasks',
    route: 'vorgange',
    icon: 'CheckSquareIcon',
    children: [
      {
        title: 'sub-items 1',
        route: '/',
      },
      {
        title: 'sub-items 2',
        route: '/',
      },
    ],
  },
  {
    title: 'app.sidebar.deadlines',
    route: 'deadlines',
    icon: 'CalendarIcon',
  },
  {
    title: 'app.sidebar.doc',
    route: 'documents',
    icon: 'FileTextIcon',
  },
  {
    title: 'app.sidebar.pos',
    route: 'pos',
    icon: 'GridIcon',
  },

  {
    title: 'app.sidebar.admin.parent',
    route: '',
    icon: 'UserIcon',
    children: [
      {
        title: 'app.sidebar.admin.children.user_manager',
        route: '/',
      },
      {
        title: 'app.sidebar.admin.children.bd',
        route: '/',
      },
      {
        title: 'app.sidebar.admin.children.costs',
        route: '/',
      },
      {
        title: 'app.sidebar.admin.children.elt',
        route: '/',
      },
      {
        title: 'app.sidebar.admin.children.bdc',
        route: '/',
      },
      {
        title: 'app.sidebar.admin.children.contract',
        route: '/',
      },
      {
        title: 'app.sidebar.admin.children.process',
        route: '/',
      },
      {
        title: 'app.sidebar.admin.children.country_currency',
        route: '/',
      },
      {
        title: 'app.sidebar.admin.children.access_protocol',
        route: '/',
      },
      {
        title: 'app.sidebar.admin.children.text_templates',
        route: '/',
      },
    ],
  },
  {
    title: 'app.sidebar.properties',
    route: 'properties',
    icon: 'GitCommitIcon',
  },
  {
    title: 'app.sidebar.users_rights',
    route: 'users-list',
    icon: 'UserIcon',
  },
  {
    title: 'app.sidebar.auth',
    route: 'authorization',
    icon: 'KeyIcon',
  },
  {
    title: 'app.sidebar.teams',
    route: 'teams',
    icon: 'UsersIcon',
  },
  {
    title: 'app.sidebar.user_type',
    route: 'users-type',
    icon: 'UsersIcon',
  },
  {
    title: 'app.sidebar.templates',
    route: 'templates',
    icon: 'FeatherIcon',
  },
  {
    title: 'app.sidebar.master_data',
    route: 'master-data',
    icon: 'GridIcon',
  },
  {
    title: 'app.sidebar.work_pack_2.title',
    route: 'work package',
    icon: 'CheckSquareIcon',
    children: [
      {
        title: 'app.sidebar.work_pack_2.children.customer_group',
        route: 'customer-groups',
      },
      {
        title: 'app.sidebar.work_pack_2.children.company',
        route: 'company-list',
      },
      {
        title: 'app.sidebar.work_pack_2.children.contact_person',
        route: 'contact-person',
      },
      {
        title: 'app.sidebar.work_pack_2.children.payment',
        route: 'payment',
      },
      {
        title: 'app.sidebar.work_pack_2.children.partner_company',
        route: 'partner-company',
      },
      {
        title: 'app.sidebar.work_pack_2.children.partner_compan_group',
        route: 'partner-company-group',
      },
      {
        title: 'app.sidebar.work_pack_2.children.address',
        route: 'address-list',
      },
      {
        title: 'app.sidebar.work_pack_2.children.contact_title',
        route: 'contact-title-list',
      },
      {
        title: 'app.sidebar.work_pack_2.children.salutation',
        route: 'salutation-list',
      },
      {
        title: 'app.sidebar.work_pack_2.children.city',
        route: 'city-list',
      },
      {
        title: 'app.sidebar.work_pack_2.children.currency',
        route: 'currency-list',
      },
      {
        title: 'app.sidebar.work_pack_2.children.country',
        route: 'country-list',
      },
      {
        title: 'app.sidebar.work_pack_2.children.lang',
        route: 'language-list',
      },
      {
        title: 'app.sidebar.work_pack_2.children.partner_type',
        route: 'partner-type-list',
      },
      {
        title: 'app.sidebar.work_pack_2.children.s_p_n_b',
        route: 'new-business',
      },
    ],
  },

  {
    title: 'app.sidebar.work_pack_3.title',
    route: 'work package',
    icon: 'CheckSquareIcon',
    children: [
      {
        title: 'app.sidebar.work_pack_3.children.pos',
        route: 'pos-list',
      },
      {
        title: 'app.sidebar.work_pack_3.children.area',
        route: 'area-list',
      },
      {
        title: 'app.sidebar.work_pack_3.children.location',
        route: 'location-list',
      },
      {
        title: 'app.sidebar.work_pack_3.children.contract',
        route: 'contracts-list',
      },
      {
        title: 'app.sidebar.work_pack_3.children.lease_contract',
        route: 'contracts-lease',
      },
      {
        title: 'app.sidebar.work_pack_3.children.poservice_objects',
        route: 'services-object-list',
      },
      {
        title: 'app.sidebar.work_pack_3.children.criteria',
        route: 'criteria-list',
      },
      {
        title: 'app.sidebar.work_pack_3.children.index_clause',
        route: 'index-clause-list',
      },
      {
        title: 'app.sidebar.work_pack_3.children.special_right',
        route: 'special-right-list',
      },
      {
        title: 'app.sidebar.work_pack_3.children.tag',
        route: 'recurring-payment-list',
      },
      {
        title: 'app.sidebar.work_pack_3.children.unit',
        route: '/',
      },
      {
        title: 'app.sidebar.work_pack_3.children.choice',
        route: '/',
      },

    ],
  },
]

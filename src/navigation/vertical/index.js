function table(name) {
  return { name: 'table', params: { table: name } }
}

export default [
  {
    header: 'Apps',
  },
  {
    title: 'app.sidebar.dashboard',
    route: 'home',
    icon: 'HomeIcon',
  },
  // region Work Package 1
  {
    title: 'app.sidebar.users_rights',
    route: table('user'),
    icon: 'UserIcon',
  },
  {
    title: 'app.sidebar.auth',
    route: table('role'),
    icon: 'KeyIcon',
  },
  {
    title: 'app.sidebar.teams',
    route: table('team'),
    icon: 'UsersIcon',
  },
  {
    title: 'app.sidebar.user_type',
    route: table('usertype'),
    icon: 'UsersIcon',
  },
  {
    title: 'app.sidebar.table',
    route: table('tablename'),
    icon: 'UsersIcon',
  },
  {
    title: 'app.sidebar.tablegroup',
    route: table('tablegroup'),
    icon: 'UsersIcon',
  },
  {
    title: 'app.sidebar.crud',
    route: table('crud'),
    icon: 'UsersIcon',
  },
  // endregion Work Package 1

  // Work Package 2
  {
    title: 'app.sidebar.work_pack_2.title',
    route: 'work package',
    icon: 'CheckSquareIcon',
    children: [
      {
        title: 'app.sidebar.work_pack_2.children.customer_group',
        route: table('customergroup'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.company',
        route: table('company'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.contact_person',
        route: table('contactperson'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.payment',
        route: table('payment'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.partner_company',
        route: table('partnercompany'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.partner_compan_group',
        route: table('partnergroup'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.address',
        route: table('address'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.contact_title',
        route: table('contacttitle'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.salutation',
        route: table('contactsalutation'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.city',
        route: table('city'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.currency',
        route: table('currency'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.country',
        route: table('country'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.lang',
        route: table('language'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.partner_type',
        route: table('partnertype'),
      },
      {
        title: 'app.sidebar.work_pack_2.children.s_p_n_b',
        route: 'new-business',
      },
    ],
  },
  {
    title: 'app.sidebar.work_pack_3.title',
    icon: 'CheckSquareIcon',
    children: [
      {
        title: 'app.sidebar.work_pack_3.children.pos',
        route: table('pos'),
      },
      {
        title: 'app.sidebar.work_pack_3.children.area',
        route: table('area'),
      },
      {
        title: 'app.sidebar.work_pack_3.children.location',
        route: table('location'),
      },
      {
        title: 'app.sidebar.work_pack_3.children.contract',
        route: table('contract'),
      },
      {
        title: 'app.sidebar.work_pack_3.children.lease_contract',
        route: table('contractlease'),
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
        title: 'app.sidebar.work_pack_3.children.payment',
        route: 'recurring-payment-list',
      },
      {
        title: 'app.sidebar.work_pack_3.children.tag',
        route: table('tag'),
      },
      {
        title: 'app.sidebar.work_pack_3.children.unit',
        route: table('unit'),
      },
      {
        title: 'app.sidebar.work_pack_3.children.choice',
        route: table('choice'),
      },
      {
        title: 'app.sidebar.work_pack_3.children.types.title',
        route: 'work package',
        icon: 'CheckSquareIcon',
        children: [
          {
            title: 'app.sidebar.work_pack_3.children.types.children.area_type',
            route: table('areatype'),
          },
          {
            title: 'app.sidebar.work_pack_3.children.types.children.contract_type',
            route: table('contracttype'),
          },
          {
            title: 'app.sidebar.work_pack_3.children.types.children.contract_criteria_type',
            route: table('criteriatype'),
          },
          {
            title: 'app.sidebar.work_pack_3.children.types.children.location_type',
            route: table('locationtype'),
          },
          {
            title: 'app.sidebar.work_pack_3.children.types.children.maturity_type',
            route: table('maturitytype'),
          },
          {
            title: 'app.sidebar.work_pack_3.children.types.children.recurring_payment_type',
            route: 'recurring-payment-type',
          },
          {
            title: 'app.sidebar.work_pack_3.children.types.children.services_object_type',
            route: 'service-object-type',
          },
          {
            title: 'app.sidebar.work_pack_3.children.types.children.usage_type',
            route: table('usagetype'),
          },
        ],
      },

    ],
  },
  {
    title: 'Work Package 4',
    icon: 'CheckSquareIcon',
    children: [
      {
        title: 'Invoices',
        route: table('invoice'),
      },
      {
        title: 'Invoice Positions',
        route: table('invoiceposition'),
      },
      {
        title: 'Inspection results',
        route: table('inspectionresult'),
      },
      {
        title: 'Cost Types',
        route: table('costtype'),
      },
      {
        title: 'Claim Types',
        route: table('claimtype'),
      },
      {
        title: 'Invoice Criterias',
        route: table('invoicecriteria'),
      },
      {
        title: 'Invoice Value Types',
        route: table('invoicevaluetype'),
      },
      {
        title: 'Ratings',
        route: table('rating'),
      },
      {
        title: 'Result Categorization',
        route: table('resultcategorization'),
      },
      {
        title: 'Saving Types',
        route: table('savingtype'),
      },
    ],
  },
  {
    title: 'Kanban',
    route: 'kanban',
    icon: 'CheckSquareIcon',
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
    title: 'app.sidebar.templates',
    route: 'templates',
    icon: 'FeatherIcon',
  },
  {
    title: 'app.sidebar.master_data',
    route: 'master-data',
    icon: 'GridIcon',
  },

]

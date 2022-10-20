function table(name) {
  return { name: 'table', params: { table: name } }
}

function item(title, tablename, icon) {
  return {
    title,
    route: table(tablename),
    icon: 'UserIcon',
    action: 'read',
    resource: tablename,
  }
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
    title: 'Work Package 1',
    icon: 'CheckSquareIcon',
    children: [
      item('app.sidebar.users_rights', 'user', 'UserIcon'),
      item('app.sidebar.auth', 'role', 'KeyIcon'),
      item('app.sidebar.teams', 'team', 'UsersIcon'),
      item('app.sidebar.user_type', 'usertype', 'UsersIcon'),
      item('app.sidebar.table', 'tablename', 'UsersIcon'),
      item('app.sidebar.tablegroup', 'tablegroup', 'UsersIcon'),
      item('app.sidebar.crud', 'crud', 'UsersIcon'),
    ],
  },
  // endregion Work Package 1

  // Work Package 2
  {
    title: 'app.sidebar.work_pack_2.title',
    route: 'work package',
    icon: 'CheckSquareIcon',
    children: [
      item('app.sidebar.work_pack_2.children.customer_group', 'customergroup'),
      item('app.sidebar.work_pack_2.children.company', 'company'),
      item('app.sidebar.work_pack_2.children.contact_person', 'contactperson'),
      item('app.sidebar.work_pack_2.children.payment', 'payment'),
      item('app.sidebar.work_pack_2.children.partner_company', 'partnercompany'),
      item('Partner Group', 'partnergroup'),
      item('app.sidebar.work_pack_2.children.address', 'address'),
      item('app.sidebar.work_pack_2.children.contact_title', 'contacttitle'),
      item('app.sidebar.work_pack_2.children.salutation', 'contactsalutation'),
      item('app.sidebar.work_pack_2.children.city', 'city'),
      item('app.sidebar.work_pack_2.children.currency', 'currency'),
      item('app.sidebar.work_pack_2.children.country', 'country'),
      item('app.sidebar.work_pack_2.children.lang', 'language'),
      item('app.sidebar.work_pack_2.children.partner_type', 'partnertype'),
      {
        title: 'app.sidebar.work_pack_2.children.s_p_n_b',
        route: { name: 'new-business', params: { id: 1 } },
      },
    ],
  },
  {
    title: 'app.sidebar.work_pack_3.title',
    icon: 'CheckSquareIcon',
    children: [
      item('app.sidebar.work_pack_3.children.pos', 'pos'),

      item('app.sidebar.work_pack_3.children.area', 'area'),
      item('app.sidebar.work_pack_3.children.location', 'location'),
      item('app.sidebar.work_pack_3.children.contract', 'contract'),
      item('app.sidebar.work_pack_3.children.poservice_objects', 'serviceobject'),
      item('app.sidebar.work_pack_3.children.criteria', 'criteria'),
      item('app.sidebar.work_pack_3.children.index_clause', 'indexclause'),
      item('app.sidebar.work_pack_3.children.special_right', 'specialright'),
      item('app.sidebar.work_pack_3.children.payment', 'recurringpayment'),
      item('app.sidebar.work_pack_3.children.tag', 'tag'),
      item('app.sidebar.work_pack_3.children.unit', 'unit'),
      item('app.sidebar.work_pack_3.children.choice', 'choice'),
      {
        title: 'app.sidebar.work_pack_3.children.types.title',
        route: 'work package',
        icon: 'CheckSquareIcon',
        children: [
          item('app.sidebar.work_pack_3.children.types.children.area_type', 'areatype'),
          item('app.sidebar.work_pack_3.children.types.children.contract_type', 'contracttype'),
          item('app.sidebar.work_pack_3.children.types.children.contract_criteria_type', 'criteriatype'),
          item('app.sidebar.work_pack_3.children.types.children.location_type', 'locationtype'),
          item('app.sidebar.work_pack_3.children.types.children.maturity_type', 'maturitytype'),
          item('app.sidebar.work_pack_3.children.types.children.recurring_payment_type', 'recurringpaymenttype'),
          item('app.sidebar.work_pack_3.children.types.children.services_object_type', 'serviceobjecttype'),
          item('app.sidebar.work_pack_3.children.types.children.usage_type', 'usagetype'),
        ],
      },

    ],
  },
  {
    title: 'Work Package 4',
    icon: 'CheckSquareIcon',
    children: [
      item('Invoices', 'invoice'),
      item('Inspection results', 'inspectionresult'),
      item('Cost Types', 'costtype'),
      item('Claim Types', 'claimtype'),
      item('Invoice Criterias', 'invoicecriteria'),
      item('Invoice Value Types', 'invoicevaluetype'),
      item('Ratings', 'rating'),
      item('Result Categorization', 'resultcategorization'),
      item('Saving Types', 'savingtype'),
    ],
  },
  {
    title: 'Work Package 5',
    icon: 'CheckSquareIcon',
    children: [
      item('Contradictions', 'contradiction'),
      item('Contradictions Packages', 'contradictionpackage'),
    ],
  },
  {
    title: 'Work Package 6',
    icon: 'CheckSquareIcon',
    children: [
      {
        title: 'Boards',
        route: table('board'),
      },
      {
        title: 'Advanced Kanban',
        route: 'advanced-kanban',
        icon: 'CheckSquareIcon',
      },
      {
        title: 'Operations',
        route: 'operations',
        icon: 'CheckSquareIcon',
      },
    ],
  },
  {
    title: 'Work Package 7',
    icon: 'CheckSquareIcon',
    children: [
      {
        title: 'BackOffice',
        route: 'backoffice',
        icon: 'CheckSquareIcon',
      },
    ],
  },
  {
    title: 'Import',
    icon: 'CheckSquareIcon',
    children: [
      {
        title: 'Import Xlsx file',
        route: 'import',
        icon: 'CheckSquareIcon',
      },
    ],
  },
]

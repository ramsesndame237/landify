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
    header: 'Main',
  },
  {
    title: 'app.sidebar.dashboard',
    route: 'home',
    icon: 'HomeIcon',
    action: 'read',
    resource: 'dashboard',
  },
  {
    title: 'My Task and tickets',
    children: [
      item('Boards', 'board'),
      item('Tickets', 'ticket'),
      {
        title: 'Document Upload',
        route: 'comming-soon',
      },
    ],
  },
  {
    title: 'Classification',
    route: 'comming-soon',
  },
  item('app.sidebar.work_pack_3.children.pos', 'pos'),
  {
    title: 'Contracts',
    children: [
      {
        title: 'Condition List',
        route: 'comming-soon',
      },
      {
        title: 'Deadline list',
        route: 'comming-soon',
      },
      {
        title: 'Payment list',
        route: 'comming-soon',
      },
    ],
  },
  {
    title: 'app.sidebar.work_pack_2.children.s_p_n_b',
    route: { name: 'new-business', params: { id: 1 } },
  },
  {
    header: 'Master Data',
  },
  {
    title: 'Account Data',
    children: [
      item('app.sidebar.work_pack_2.children.customer_group', 'customergroup'),
      item('app.sidebar.work_pack_2.children.company', 'company'),
      item('Partner Group', 'partnergroup'),
      item('app.sidebar.work_pack_2.children.partner_company', 'partnercompany'),
      item('app.sidebar.work_pack_2.children.contact_person', 'contactperson'),
    ],
  },
  {
    title: 'Rentals and contracts',
    children: [
      item('app.sidebar.work_pack_3.children.pos', 'pos'),
      item('app.sidebar.work_pack_3.children.contract', 'contract'),
      item('app.sidebar.work_pack_3.children.area', 'area'),
      item('app.sidebar.work_pack_3.children.location', 'location'),
      item('app.sidebar.work_pack_2.children.payment', 'payment'),
      item('app.sidebar.work_pack_3.children.poservice_objects', 'serviceobject'),
    ],
  },
  {
    header: 'Operations',
  },
  {
    title: 'Invoice and contradiction',
    children: [
      item('Invoices', 'invoice'),
      item('Inspection results', 'inspectionresult'),
      item('Trackrecord', 'trackrecord'),
      item('Contradictions', 'contradiction'),
      item('Contradictions Packages', 'contradictionpackage'),
    ],
  },
  {
    title: 'Facility services',
    children: [
      item('Tickets', 'ticket'),
      item('app.sidebar.work_pack_3.children.poservice_objects', 'serviceobject'),
    ],
  },
  {
    header: 'Configuration',
  },
  {
    title: 'Account data related',
    children: [
      item('app.sidebar.work_pack_2.children.address', 'address'),
      item('app.sidebar.work_pack_2.children.city', 'city'),
      item('app.sidebar.work_pack_2.children.contact_title', 'contacttitle'),
      item('app.sidebar.work_pack_2.children.salutation', 'contactsalutation'),
      item('app.sidebar.work_pack_2.children.partner_type', 'partnertype'),
      {
        title: 'Product',
        route: 'comming-soon',
      },
      item('app.sidebar.work_pack_3.children.tag', 'tag'),
    ],
  },
  {
    title: 'Contract data related',
    children: [
      item('app.sidebar.work_pack_3.children.criteria', 'criteria'),
      item('app.sidebar.work_pack_3.children.index_clause', 'indexclause'),
      item('app.sidebar.work_pack_3.children.special_right', 'specialright'),
      item('app.sidebar.work_pack_3.children.payment', 'recurringpayment'),
      item('app.sidebar.work_pack_3.children.choice', 'choice'),
      item('app.sidebar.work_pack_3.children.types.children.contract_type', 'contracttype'),
      {
        title: 'Document Contract Type',
        route: 'comming-soon',
      },
      item('app.sidebar.work_pack_3.children.types.children.contract_criteria_type', 'criteriatype'),
      item('app.sidebar.work_pack_3.children.types.children.maturity_type', 'maturitytype'),
      item('app.sidebar.work_pack_3.children.types.children.recurring_payment_type', 'recurringpaymenttype'),

    ],
  },
  {
    title: 'Object data related',
    children: [
      item('app.sidebar.work_pack_3.children.types.children.location_type', 'locationtype'),
      item('app.sidebar.work_pack_3.children.types.children.area_type', 'areatype'),
      item('app.sidebar.work_pack_3.children.types.children.usage_type', 'usagetype'),
      item('app.sidebar.work_pack_3.children.types.children.services_object_type', 'serviceobjecttype'),
    ],
  },
  {
    title: 'Invoice and contradiction related data',
    children: [
      item('Cost Types', 'costtype'),
      {
        title: 'Cost type abstract',
        route: 'comming-soon',
      },
      item('Claim Types', 'claimtype'),
      item('Saving Types', 'savingtype'),
      item('Ratings', 'rating'),
      item('Result Categorization', 'resultcategorization'),
      item('Invoice Criterias', 'invoicecriteria'),
      item('Invoice Value Types', 'invoicevaluetype'),
    ],
  },
  {
    title: 'Ticket related data',
    children: [
      item('Boards', 'board'),
      {
        title: 'Ticket type',
        route: 'comming-soon',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    children: [
      item('app.sidebar.work_pack_2.children.lang', 'language'),
      item('app.sidebar.work_pack_2.children.country', 'country'),
      item('app.sidebar.work_pack_2.children.currency', 'currency'),
      item('app.sidebar.work_pack_3.children.unit', 'unit'),
      {
        title: 'Document Types',
        route: 'comming-soon',
      },
    ],
  },
  {
    header: 'Administration',
  },
  {
    title: 'User',
    children: [
      item('app.sidebar.users_rights', 'user', 'UserIcon'),
      item('app.sidebar.teams', 'team', 'UsersIcon'),
      item('app.sidebar.user_type', 'usertype', 'UsersIcon'),
    ],
  },
  {
    title: 'Rights',
    children: [
      item('app.sidebar.auth', 'role', 'KeyIcon'),
      item('app.sidebar.table', 'tablename', 'UsersIcon'),
      item('app.sidebar.tablegroup', 'tablegroup', 'UsersIcon'),
      item('app.sidebar.crud', 'crud', 'UsersIcon'),
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

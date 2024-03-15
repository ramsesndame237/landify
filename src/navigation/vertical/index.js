import { ACCESS } from '@/config/config-access'

function table(name) {
  return { name: 'table', params: { table: name } }
}

function item(tablename, title, route, permissions) {
  return {
    title: `menu~${title || tablename}`,
    route: route || table(tablename),
    // icon: 'UserIcon',
    action: `menu~${title || tablename}`,
    resource: 'menu',
    permissions,
  }
}

function headerItem(itemKey, permissions) {
  return {
    header: `menu~${itemKey}`,
    action: `menu~${itemKey}`,
    resource: 'menu',
    permissions,
  }
}

function key(val) {
  return `menu~${val}`
}

export default [
  headerItem('main', ACCESS.menuAccess.main),
  {
    title: key('dashboard'),
    icon: 'HomeIcon',
    action: 'menu~dashboard',
    resource: 'menu',
    permissions: ACCESS.menuAccess.main,
    children: [
      item(null, 'dashboard', 'home', ACCESS.menuAccess.dashbaord_home),
      item(null, 'ticketdashboard', 'ticketDashboard', ACCESS.menuAccess.ticket_dashboard),
    ],
  },
  {
    title: key('ticket'),
    permissions: ACCESS.menuAccess.ticket_menu,
    children: [
      item('board', 'ticketboard', null, ACCESS.menuAccess.ticket_board),
      item('ticket', 'ticketlist', null, ACCESS.menuAccess.ticket_list),
      item(null, 'ticketlistupdate', 'updateTicket', ACCESS.menuAccess.ticket_list_update),
      // {
      //   title: key('documentupload'),
      //   route: 'document-classification',
      // }
    ],
  },
  item('classification', null, 'incoming-mails', ACCESS.menuAccess.incomming_mails),
  // {
  //   title: `menu~summary`,
  //   route: 'classification-summary',
  //   // icon: 'UserIcon',
  //   action: `menu~classification`,
  //   resource: 'menu',
  // },
  item('pos', null, null, ACCESS.menuAccess.pos_menu),
  {
    title: key('contractlists'),
    permissions: ACCESS.menuAccess.contract_list,
    children: [
      {
        title: key('contractcondition'),
        action: 'menu~contractcondition',
        resource: 'menu',
        permissions: ACCESS.menuAccess.condictions_list,
        route: { name: 'condition-list' },
      },
      {
        title: key('contractdeadline'),
        action: 'menu~contractdeadline',
        resource: 'menu',
        permissions: ACCESS.menuAccess.deadlines_list,
        route: { name: 'deadline-list' },
      },
      {
        title: key('contractpaymentslist'),
        action: 'menu~contractpaymentslist',
        resource: 'menu',
        permissions: ACCESS.menuAccess.payment_list,
        route: { name: 'payments-list' },
      },
      // {
      //   title: key('payment'),
      //   action: 'menu~payment',
      //   resource: 'menu',
      //   route: 'comming-soon',
      // },
    ],
  },
  {
    title: key('newbus'),
    action: 'menu~newbus',
    resource: 'menu',
    permissions: ACCESS.menuAccess.new_business,
    route: { name: 'new-business', params: { id: 1 } },
  },
  headerItem('masterdata', ACCESS.menuAccess.master_data_menu_header),
  {
    title: key('company_base'),
    permissions: ACCESS.menuAccess.company_menu,
    children: [
      item('customergroup', null, null, ACCESS.menuAccess.customer_group),
      item('company', null, null, ACCESS.menuAccess.company),
      item('pos', null, null, ACCESS.menuAccess.pos),
      item('area', null, null, ACCESS.menuAccess.area),

    ],
  },
  {
    title: key('partnercompany_base'),
    permissions: ACCESS.menuAccess.partner_company_menu,
    children: [
      item('partnergroup', null, null, ACCESS.menuAccess.partner_group),
      item('partnercompany', null, null, ACCESS.menuAccess.partner_company),
    ],
  },
  item('contactperson', null, null, ACCESS.menuAccess.contact_person),
  {
    title: key('rentalsandcontracts'),
    permissions: ACCESS.menuAccess.rentals_and_contracts_menu,
    children: [
      item('contract', null, null, ACCESS.menuAccess.contract),
      item('invoice', null, null, ACCESS.menuAccess.invoice),
      item('location', null, null, ACCESS.menuAccess.location),
      item('payment', null, null, ACCESS.menuAccess.payment_info),
      item('serviceobject', null, null, ACCESS.menuAccess.service_object),
    ],
  },
  headerItem('operations'),
  {
    title: key('invoicesandcontradictions'),
    children: [
      item('invoiceposition'),
      item('inspectionresult'),
      item('trackrecord'),
      item('contradiction'),
      item('contradictionpackage'),
    ],
  },
  {
    title: key('facilityservices'),
    children: [
      item('ticket'),
      item('serviceobject'),
    ],
  },
  headerItem('configuration'),
  {
    title: key('configurationaccountdata'),
    children: [
      item('address'),
      item('city'),
      item('contacttitle'),
      item('contactsalutation'),
      item('partnertype'),
      item('product'),
      item('tag'),
      item('function'),
    ],
  },
  {
    title: key('configurationcontractdata'),
    children: [
      item('criteria'),
      item('indexclause'),
      item('recurringpayment'),
      item('choice'),
      item('contracttype'),
      item('documentcontracttype'),
      item('criteriatype'),
      item('maturitytype'),
      item('recurringpaymenttype'),

    ],
  },
  {
    title: key('configurationobjectdata'),
    children: [
      item('locationtype'),
      item('areatype'),
      item('usagetype'),
      item('serviceobjecttype'),
    ],
  },
  {
    title: key('configurationinvoicecontradictiondata'),
    children: [
      item('costtype'),
      item('textmodule'),
      item('texttemplate'),
      item('texttemplate_variable'),
      // {
      //   title: key('costtypeabstract'),
      //   route: 'comming-soon',
      // },
      item('claimtype'),
      item('savingtype'),
      item('rating'),
      item('resultcategorization', 'resultcategory'),
      item('invoicecriteria'),
      item('invoicevaluetype'),
    ],
  },
  {
    title: key('ticket'),
    children: [
      item('board', 'ticketboard'),
      item('priority'),
      {
        title: key('tickettype'),
        route: 'comming-soon',
      },
    ],
  },
  {
    title: key('configurationmisc'),
    children: [
      item('language'),
      item('country'),
      item('currency'),
      item('unit'),
      item('documenttype'),
      // {
      //   title: key('documenttype'),
      //   route: 'comming-soon',
      // },
    ],
  },
  headerItem('administration'),
  {
    title: key('administrationuser'),
    children: [
      item('user'),
      item('team'),
      item('usertype'),
      item('role', 'authorization'),
    ],
  },
  // {
  //   title: key('administrationrights'),
  //   children: [
  //     item('role', 'authorization'),
  //     {
  //       title: key('menu'),
  //       action: 'menu~menu',
  //       resource: 'menu',
  //       route: 'menu',
  //     },
  //     item('access'),
  //     item('tablename', 'table'),
  //     item('tablegroup'),
  //     item('crud'),
  //   ],
  // },
  {
    title: key('import'),
    action: 'menu~import',
    resource: 'menu',
    children: [
      {
        title: key('importstandard'),
        action: 'menu~importstandard',
        resource: 'menu',
        route: 'import',
      },
      {
        title: key('importcontract'),
        action: 'menu~importcontract',
        resource: 'menu',
        route: 'import-contract',
      },
    ],
  },
  {
    title: key('translation'),
    action: 'menu~import',
    resource: 'menu',
    route: table('1__translation'),
  },
  {
    title: key('attribute'),
    action: 'menu~import',
    resource: 'menu',
    route: table('1__attribute_nice'),
  },
]

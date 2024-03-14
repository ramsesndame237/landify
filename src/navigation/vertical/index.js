import { USER_PERMISSIONS } from '@/config/config-permissions'

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
  headerItem('main', [USER_PERMISSIONS.lead]),
  {
    title: key('dashboard'),
    icon: 'HomeIcon',
    action: 'menu~dashboard',
    resource: 'menu',
    permissions: [USER_PERMISSIONS.lead],
    children: [
      item(null, 'dashboard', 'home', [USER_PERMISSIONS.lead]),
      item(null, 'ticketdashboard', 'ticketDashboard'),
    ],
  },
  {
    title: key('ticket'),
    permissions: [USER_PERMISSIONS.lead],
    children: [
      item('board', 'ticketboard', null, [USER_PERMISSIONS.lead]),
      item('ticket', 'ticketlist', null, [USER_PERMISSIONS.lead]),
      item(null, 'ticketlistupdate', 'updateTicket', [USER_PERMISSIONS.lead]),
      // {
      //   title: key('documentupload'),
      //   route: 'document-classification',
      // }
    ],
  },
  item('classification', null, 'incoming-mails'),
  // {
  //   title: `menu~summary`,
  //   route: 'classification-summary',
  //   // icon: 'UserIcon',
  //   action: `menu~classification`,
  //   resource: 'menu',
  // },
  item('pos', null, null, [USER_PERMISSIONS.lead]),
  {
    title: key('contractlists'),
    permissions: [USER_PERMISSIONS.lead],
    children: [
      {
        title: key('contractcondition'),
        action: 'menu~contractcondition',
        resource: 'menu',
        permissions: [USER_PERMISSIONS.lead],
        route: { name: 'condition-list' },
      },
      {
        title: key('contractdeadline'),
        action: 'menu~contractdeadline',
        resource: 'menu',
        permissions: [USER_PERMISSIONS.lead],
        route: { name: 'deadline-list' },
      },
      {
        title: key('contractpaymentslist'),
        action: 'menu~contractpaymentslist',
        resource: 'menu',
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
    route: { name: 'new-business', params: { id: 1 } },
  },
  headerItem('masterdata'),
  {
    title: key('company_base'),
    children: [
      item('customergroup'),
      item('company'),
      item('pos'),
      item('area'),

    ],
  },
  {
    title: key('partnercompany_base'),
    children: [
      item('partnergroup'),
      item('partnercompany'),
    ],
  },
  item('contactperson'),
  {
    title: key('rentalsandcontracts'),
    permissions: [USER_PERMISSIONS.lead],
    children: [
      item('contract', null, null, [USER_PERMISSIONS.lead]),
      item('invoice'),
      item('location'),
      item('payment', null, null, [USER_PERMISSIONS.lead]),
      item('serviceobject', null, null, [USER_PERMISSIONS.lead]),
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

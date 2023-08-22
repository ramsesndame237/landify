function table(name) {
  return { name: 'table', params: { table: name } }
}

function item(tablename, title, route) {
  return {
    title: `menu~${title || tablename}`,
    route: route || table(tablename),
    // icon: 'UserIcon',
    action: `menu~${title || tablename}`,
    resource: 'menu',
  }
}

function headerItem(itemKey) {
  return {
    header: `menu~${itemKey}`,
    action: `menu~${itemKey}`,
    resource: 'menu',
  }
}

function key(val) {
  return `menu~${val}`
}

export default [
  headerItem('main'),
  {
    title: key('dashboard'),
    icon: 'HomeIcon',
    action: 'menu~dashboard',
    resource: 'menu',
    children: [
      item(null, 'dashboard1', 'home'),
      item(null, 'dashboard2', 'home'),
      item(null, 'dashboard3', 'home'),
    ],
  },
  {
    title: key('ticket'),
    children: [
      item('board', 'ticketboard'),
      item('ticket', 'ticketlist'),
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
  item('pos'),
  {
    title: key('contractlists'),
    children: [
      {
        title: key('contractcondition'),
        action: 'menu~contractcondition',
        resource: 'menu',
        route: { name: 'condition-list' },
      },
      {
        title: key('contractdeadline'),
        action: 'menu~contractdeadline',
        resource: 'menu',
        route: { name: 'deadline-list' },
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
    children: [
      item('contract'),
      item('invoice'),
      item('location'),
      item('payment'),
      item('serviceobject'),
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
      item('specialright'),
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
    ],
  },
  {
    title: key('administrationrights'),
    children: [
      item('role', 'authorization'),
      {
        title: key('menu'),
        action: 'menu~menu',
        resource: 'menu',
        route: 'menu',
      },
      item('access'),
      item('tablename', 'table'),
      item('tablegroup'),
      item('crud'),
    ],
  },
  {
    title: 'Work Package 7',
    children: [
      {
        title: 'BackOffice',
        route: 'backoffice',
        icon: 'CheckSquareIcon',
      },
    ],
  },
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

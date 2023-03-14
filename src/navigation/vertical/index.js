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

function headerItem(key) {
  return {
    header: `menu~${key}`,
    action: `menu~${key}`,
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
    route: 'home',
    icon: 'HomeIcon',
    action: 'menu~dashboard',
    resource: 'menu',
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
    title: key('accountdata'),
    children: [
      item('customergroup'),
      item('company'),
      item('partnergroup'),
      item('partnercompany'),
      item('contactperson'),
    ],
  },
  {
    title: key('rentalsandcontracts'),
    children: [
      item('pos'),
      item('contract'),
      item('area'),
      item('location'),
      item('payment'),
      item('serviceobject'),
    ],
  },
  headerItem('operations'),
  {
    title: key('invoicesandcontradictions'),
    children: [
      item('invoice'),
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
      {
        title: key('documenttype'),
        route: 'comming-soon',
      },
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

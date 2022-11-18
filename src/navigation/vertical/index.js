function table(name) {
  return { name: 'table', params: { table: name } }
}

function item(tablename, title, icon) {
  return {
    title: `global.menu-${title || tablename}`,
    route: table(tablename),
    // icon: 'UserIcon',
    action: 'read',
    resource: tablename,
  }
}

function key(val) {
  return `global.menu-${val}`
}

export default [
  {
    header: key('main'),
  },
  {
    title: key('dashboard'),
    route: 'home',
    icon: 'HomeIcon',
    action: 'read',
    resource: 'dashboard',
  },
  {
    title: 'My Task and tickets',
    children: [
      item('board'),
      item('ticket'),
      {
        title: 'Document Upload',
        route: 'comming-soon',
      },
    ],
  },
  {
    title: key('classification'),
    route: 'comming-soon',
  },
  item('pos'),
  {
    title: key('contract'),
    children: [
      {
        title: key('condition'),
        route: 'comming-soon',
      },
      {
        title: key('deadline'),
        route: 'comming-soon',
      },
      {
        title: key('payment'),
        route: 'comming-soon',
      },
    ],
  },
  {
    title: key('newbus'),
    route: { name: 'new-business', params: { id: 1 } },
  },
  {
    header: key('masterdata'),
  },
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
    title: 'Rentals and contracts',
    children: [
      item('pos'),
      item('contract'),
      item('area'),
      item('location'),
      item('payment'),
      item('serviceobject'),
    ],
  },
  {
    header: key('operations'),
  },
  {
    title: 'Invoice and contradiction',
    children: [
      item('invoice'),
      item('inspectionresult'),
      item('trackrecord'),
      item('contradiction'),
      item('contradictionpackage'),
    ],
  },
  {
    title: 'Facility services',
    children: [
      item('ticket'),
      item('serviceobject'),
    ],
  },
  {
    header: key('configuration'),
  },
  {
    title: 'Account data related',
    children: [
      item('address'),
      item('city'),
      item('contacttitle'),
      item('contactsalutation'),
      item('partnertype'),
      {
        title: key('product'),
        route: 'comming-soon',
      },
      item('tag'),
    ],
  },
  {
    title: 'Contract data related',
    children: [
      item('criteria'),
      item('indexclause'),
      item('specialright'),
      item('recurringpayment'),
      item('choice'),
      item('contracttype'),
      {
        title: key('document_contract_type'),
        route: 'comming-soon',
      },
      item('criteriatype'),
      item('maturitytype'),
      item('recurringpaymenttype'),

    ],
  },
  {
    title: 'Object data related',
    children: [
      item('locationtype'),
      item('areatype'),
      item('usagetype'),
      item('serviceobjecttype'),
    ],
  },
  {
    title: 'Invoice and contradiction related data',
    children: [
      item('costtype'),
      {
        title: 'Cost type abstract',
        route: 'comming-soon',
      },
      item('claimtype'),
      item('savingtype'),
      item('rating'),
      item('resultcategorization'),
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
    title: key('miscellaneous'),
    children: [
      item('language'),
      item('country'),
      item('currency'),
      item('unit'),
      {
        title: key('document_type'),
        route: 'comming-soon',
      },
    ],
  },
  {
    header: key('administration'),
  },
  {
    title: key('user'),
    children: [
      item('user', null, 'UserIcon'),
      item('team'),
      item('usertype'),
    ],
  },
  {
    title: key('rights'),
    children: [
      item('role'),
      item('tablename'),
      item('tablegroup'),
      item('crud'),
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

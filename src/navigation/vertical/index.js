function table(name) {
  return { name: 'table', params: { table: name } }
}

function item(tablename, title, icon) {
  return {
    title: `menu~${title || tablename}`,
    route: table(tablename),
    // icon: 'UserIcon',
    action: 'read',
    resource: tablename,
  }
}

function key(val) {
  return `menu~${val}`
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
    title: key('ticket'),
    children: [
      item('board', 'ticketboard'),
      item('ticket', 'ticketlist'),
      {
        title: key('documentupload'),
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
        title: key('contractcondition'),
        route: table('conditionlist'),
      },
      {
        title: key('contractdeadline'),
        route: table('deadlinelist'),
      },
      {
        title: key('payment'),
        route: "comming-soon",
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
  {
    header: key('operations'),
  },
  {
    title: key('invoicesandcontradictions'),
    children: [
      item('invoice'),
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
  {
    header: key('configuration'),
  },
  {
    title: key('configurationaccountdata'),
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
    title: key('configurationcontractdata'),
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
      {
        title: key('costtypeabstract'),
        route: 'comming-soon',
      },
      item('claimtype'),
      item('savingtype'),
      item('rating'),
      item('resultcategorization','resultcategory'),
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
  {
    header: key('administration'),
  },
  {
    title: key('administrationuser'),
    children: [
      item('user', null, 'UserIcon'),
      item('team'),
      item('usertype'),
    ],
  },
  {
    title: key('administrationrights'),
    children: [
      item('role','authorization'),
      item('tablename', 'table'),
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

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
        title: 'Pays / Monnaies',
        route: '/',
      },
      {
        title: 'Protocole d\'accès',
        route: '/',
      },
      {
        title: 'Modèles de texte',
        route: '/',
      },
    ],
  },
  {
    title: 'Properties',
    route: 'properties',
    icon: 'GitCommitIcon',
  },
  {
    title: 'Users & Rights',
    route: 'users-list',
    icon: 'UserIcon',
  },
  {
    title: 'Authorization',
    route: 'authorization',
    icon: 'KeyIcon',
  },
  {
    title: 'Teams',
    route: 'teams',
    icon: 'UsersIcon',
  },
  {
    title: 'User Type',
    route: 'users-type',
    icon: 'UsersIcon',
  },
  {
    title: 'Templates',
    route: 'templates',
    icon: 'FeatherIcon',
  },
  {
    title: 'Master Data',
    route: 'master-data',
    icon: 'GridIcon',
  },
  {
    title: 'Work package 2',
    route: 'work package',
    icon: 'CheckSquareIcon',
    children: [
      {
        title: 'Customer Group',
        route: 'customer-groups',
      },
      {
        title: 'Company',
        route: 'companies',
      },
      {
        title: 'Contact Person',
        route: 'contact-person',
      },
      {
        title: 'Payment',
        route: 'payment',
      },
      {
        title: 'Partner Company',
        route: 'partner-company',
      },
      {
        title: 'Partner Company Group',
        route: '/',
      },
      {
        title: 'Address',
        route: '/',
      },
      {
        title: 'Contact Title',
        route: '/',
      },
      {
        title: 'Salutation',
        route: '/',
      },
      {
        title: 'City',
        route: '/',
      },
      {
        title: 'Currrency',
        route: '/',
      },
      {
        title: 'Country',
        route: '/',
      },
      {
        title: 'Language',
        route: '/',
      },
      {
        title: 'Partner Type',
        route: '/',
      },
      {
        title: 'Standart path new Business',
        route: '/',
      },
    ],
  },

  {
    title: 'Work package 3',
    route: 'work package',
    icon: 'CheckSquareIcon',
    children: [
      {
        title: 'Customer Group',
        route: '/',
      },
    ]
  }
]

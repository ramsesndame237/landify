export default [
  {
    header: 'Apps',
  },
  {
    title: 'Dashboard',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'Tasks & Tickets',
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
    title: 'Deadlines',
    route: 'deadlines',
    icon: 'CalendarIcon',
  },
  {
    title: 'Documents',
    route: 'documents',
    icon: 'FileTextIcon',
  },
  {
    title: 'Point of Sales',
    route: 'pos',
    icon: 'GridIcon',
  },

  {
    title: 'Administration',
    route: '',
    icon: 'UserIcon',
    children: [
      {
        title: 'Gestion des utilisateurs',
        route: '/',
      },
      {
        title: 'Base de données d\'adresses',
        route: '/',
      },
      {
        title: 'Types de coûts\n',
        route: '/',
      },
      {
        title: 'Éléments de texte Waderspruch',
        route: '/',
      },
      {
        title: 'Base de données clients',
        route: '/',
      },
      {
        title: 'Contrats',
        route: '/',
      },
      {
        title: 'Processus',
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
    route: 'users-lists',
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
]

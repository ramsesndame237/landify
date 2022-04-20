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
    title: 'Vorgänge',
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
    title: 'Fristen',
    route: 'fristen',
    icon: 'CalendarIcon',
  },
  {
    title: 'Dokumente',
    route: 'dokumente',
    icon: 'FileTextIcon',
  },
  {
    title: 'Prozessansicht',
    route: 'prozessansicht',
    icon: 'GridIcon',
  },
  {
    header: 'VERWALTUNG',
  },
  {
    title: 'Einstellungen',
    route: 'einstellungen',
    icon: 'GitCommitIcon',
  },
  {
    title: 'Benutzer & Rechte',
    route: 'benutzer-bechte',
    icon: 'UserIcon',
  },
  {
    title: 'Vorlagen',
    route: 'vorlagen',
    icon: 'FeatherIcon',
  },
  {
    header: 'WECHSELN ZU KIM',
  },
]

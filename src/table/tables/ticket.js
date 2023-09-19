export default {
  customIndex: () => import('@/views/app/Ticket/TicketList.vue'),
  customPage: () => import('@/views/app/Ticket/TicketDetail.vue'),
  fieldComponent: () => import('@/views/app/CreateComponent/TicketForm.vue'),
  create: false,
  entity: 'frontend_6_1_6_overview',
  entityEndpoint: '/tickets/list',
  fields: [
    { key: 'ticket_id', auto: true },
    // { key: 'ticket_deadline', type: 'date', time: true },
    {
      key: 'ticket_deadline_yellow', type: 'date', time: true, hideOnIndex: true,
    },
    {
      key: 'ticket_deadline_red', type: 'date', time: true, hideOnIndex: true,
    },
    {
      key: 'ticket_deadline_status',
      time: true,
      hideOnForm: true,
      withBadge: true,
      setVariant: value => {
        const TICKETS_DEADLINE_VARIANT = {
          before_deadline: 'success',
          critical_yellow: 'warning',
          over_due_red: 'danger',
        }
        const { item, field } = value

        return TICKETS_DEADLINE_VARIANT[item[field.key]]
      },
      formatter: value => {
        const TICKETS_DEADLINE_STATUS = {
          before_deadline: window.$vue.$t('headline~dashboard~subframe~open_tickets_intime'),
          critical_yellow: window.$vue.$t('headline~dashboard~subframe~open_tickets_afteryellow'),
          over_due_red: window.$vue.$t('headline~dashboard~subframe~open_tickets_afterred'),
        }

        return TICKETS_DEADLINE_STATUS[value]
      },
    },
    {
      key: 'team_name',
      listLabel: 'pos_name',
      hideOnForm: true,
    },
    { key: 'board_name', hideOnForm: true },
    { key: 'ticket_name' },
    { key: 'priority_name', hideOnForm: true },
    { key: 'pos_name', hideOnForm: true },
    {
      key: 'ticket_closed',
      label: 'Status',
      hideOnForm: true,
      formatter: val => window.$vue.$t(val ? 'header~board~status~closed' : 'header~board~status~open'),
    },
    { key: 'ticket_description', type: 'textarea', required: false },
    {
      key: 'pos_id',
      listLabel: 'pos_name',
      type: 'list',
      list: 'frontend_2_1_3_8',
      filter_key: 'company_id',
      relationEntity: 'ticket_pos_rel',
      hideOnIndex: true,
    },
    {
      key: 'contract_id',
      listLabel: 'contract_name',
      type: 'list',
      list: 'frontend_4_2_1_contract_selector',
      filter_key: 'pos_id',
      relationEntity: 'ticket_contract_rel',
      required: false,
      hideOnIndex: true,
    },
    {
      key: 'priority_id', type: 'list', list: 'priority', listLabel: 'priority_name', hideOnIndex: true,
    },

    // { key: 'column_name', hideOnForm: true },
    {
      key: 'ticket_creation_time', type: 'date', time: true, hideOnForm: true,
    },
    // { key: 'contract_id', hideOnForm: true },
    // { key: 'contract_name', hideOnForm: true },
    // { key: 'pos_id', hideOnForm: true },
    // { key: 'sub_ticket_count', hideOnForm: true },
  ],
  default: {
    ticket_progress: 10,
    ticket_deadline: '2000-01-01 00:00:00',
  },
  filters: [
    {
      key: 'customergroup_id',
      type: 'list',
      list: 'customergroup',
      listLabel: 'customergroup_name',
      required: false,
    },
    {
      key: 'company_id',
      type: 'list',
      list: 'frontend_2_2_3_1',
      listLabel: 'company_name',
      filter_key: 'customergroup_id',
      required: false,
    },
    {
      key: 'pos_id',
      type: 'list',
      list: 'frontend_2_1_3_8',
      listLabel: 'pos_name',
      filter_key: 'company_id',
      required: false,
    },
    {
      key: 'contract_id',
      listLabel: 'contract_name',
      type: 'list',
      list: 'frontend_4_2_1_contract_selector',
      filter_key: 'pos_id',
      required: false,
    },
    {
      key: 'start_date',
      label: 'Start Date',
      type: 'date',
      required: false,
      hideOnForm: true,
    },
    {
      key: 'end_date',
      label: 'End Date',
      type: 'date',
      required: false,
      hideOnForm: true,
    },
    {
      key: 'filter_date',
      label: 'Deadline Date',
      type: 'date-picker',
      required: false,
      send: false,
    },
    {
      key: 'team_id',
      label: 'Team',
      type: 'list',
      entityCustomEndPoint: '/teams',
      required: false,
      listLabel: 'team_name',
    },
    {
      key: 'user_id',
      label: 'User',
      type: 'list',
      filter_key: 'team_id',
      list: 'user_team_grp',
      listLabel: 'user_email',
      required: false,

    },
    {
      key: 'ticket_deadline_status',
      label: 'Deadline Status',
      type: 'custom-select',
      required: false,
      items: [
        {
          label: 'All',
          value: null,
        },
        {
          label: 'Before deadline',
          value: 'before_deadline',
        },
        {
          label: 'Before critical deadline',
          value: 'critical_yellow',
        },
        {
          label: 'After critical deadline',
          value: 'over_due_red',
        },
      ],
    },
    {
      key: 'tickets',
      label: 'Tickets type',
      type: 'custom-select',
      required: false,
      items: [
        {
          label: 'All',
          value: null,
        },
        {
          label: 'Seybolds',
          value: 'seybolds',
        },
        {
          label: 'Customers',
          value: 'customers',
        },
      ],
    },
    {
      key: 'priority_id', type: 'list', list: 'priority', listLabel: 'priority_name', required: false,
    },
  ],
  note: 'frontend_0_8_2',
}

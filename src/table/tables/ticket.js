import { union } from 'lodash'

export default {
  customIndex: () => import('@/views/app/Ticket/TicketList.vue'),
  customPage: () => import('@/views/app/Ticket/TicketDetail.vue'),
  fieldComponent: () => import('@/views/app/CreateComponent/TicketForm.vue'),
  create: false,
  entity: 'frontend_6_1_6_overview',
  entityEndpoint: '/tickets/slims',
  defaultSortField: 'ticket_creation_time',
  /**
   * truncateBy : Représente la valeur en rem à appliquer sur tous les champs d'un tableau
   * @example truncateBy: 20 Va fixer le max-width des champs à 20 rem
   */
  truncateBy: 20,
  fields: [
    { key: 'ticket_id', auto: true },
    // { key: 'ticket_deadline', type: 'date', time: true },
    { key: 'ticket_name' },
    // { key: 'column_has_stamp', hideOnForm: true, type: 'boolean' },
    {
      key: 'ticket_deadline_yellow', type: 'date', time: true, hideOnIndex: true, minDate: 'today',
    },
    {
      key: 'ticket_deadline_red', type: 'date', time: true, hideOnIndex: true, minDate: 'today',
    },
    {
      key: 'ticket_deadline_status',
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
    // {
    //   key: 'team_name',
    //   listLabel: 'pos_name',
    //   hideOnForm: true,
    // },
    { key: 'board_name', hideOnForm: true },
    { key: 'column_name', hideOnForm: true },

    { key: 'priority_name', hideOnForm: true },
    // { key: 'pos_name', hideOnForm: true },
    {
      key: 'ticket_closed',
      label: 'Status',
      hideOnForm: true,
      formatter: val => window.$vue.$t(val ? 'header~board~status~closed' : 'header~board~status~open'),
    },
    // { key: 'ticket_description', type: 'textarea', required: false },
    // {
    //   key: 'pos_id',
    //   listLabel: 'pos_name',
    //   type: 'list',
    //   list: 'frontend_2_1_3_8',
    //   filter_key: 'company_id',
    //   relationEntity: 'ticket_pos_rel',
    //   hideOnIndex: true,
    // },
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
      noFetchOnInit: true,
      customPagination: {
        per_page: 15,
      },
    },
    {
      key: 'company_id',
      type: 'list',
      list: 'frontend_2_2_3_1',
      listLabel: 'company_name',
      filter_key: 'customergroup_id',
      required: false,
      // filter: (company, vm) => {
      //   const isUserExternClientNotDirector = vm.$store.getters['user/isUserExternClientNotDirector']
      //
      //   if (isUserExternClientNotDirector) {
      //     const { company: userCompany } = vm.$store.getters['user/user']
      //     // vm.isDisabled = true
      //     vm.$set(vm.entity, 'company_id', userCompany.company_id)
      //     // return userCompany.company_id === company.company_id
      //   }
      //
      //   return true
      // },
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
      list: 'teams',
      entityCustomEndPoint: '/teams',
      required: false,
      listLabel: 'team_name',
      withOptionAll: true,
      clearable: false,
      filter: (team, vm) => {
        const { team_id } = vm.$store.getters['user/user']
        const isUserExternClientNotDirector = vm.$store.getters['user/isUserExternClientNotDirector']

        const teams = vm.$store.getters['table/listCache']('teams')

        const seyboldTeams = teams.filter(t => t.team_is_customer === 0)

        if (isUserExternClientNotDirector) {
          vm.$set(vm.entity, 'team_id', -1)
          return union(seyboldTeams.map(t => t.team_id), team_id).includes(team.team_id)
        }
        if (vm.entity.team_id === undefined) {
          vm.$set(vm.entity, 'team_id', -1)
        }

        return true
      },
    },
    {
      key: 'user_id',
      label: 'User',
      type: 'list',
      filter_key: 'team_id',
      list: 'user_team_grp',
      listLabel: 'user_email',
      required: false,
      withOptionAll: true,
      clearable: false,
      filter: (user, vm) => {
        const { user_id } = vm.$store.getters['user/user']
        const isUserExternClientNotDirector = vm.$store.getters['user/isUserExternClientNotDirector']

        if (isUserExternClientNotDirector) {
          return user.user_id === user_id
        }
        if (vm.entity.user_id === undefined) {
          vm.$set(vm.entity, 'user_id', -1)
        }

        return true
      },
      change: (entity, vm) => {
        if (entity.team_id === -1) {
          vm.isDisabled = true
          vm.$set(entity, 'user_id', -1)
        } else {
          vm.isDisabled = false
        }
      },
    },
    {
      key: 'ticket_deadline_status',
      label: 'Deadline Status',
      type: 'custom-select',
      required: false,
      clearable: false,
      items: [
        {
          label: 'All',
          value: -1,
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
      change: (entity, vm) => {
        if (entity.ticket_deadline_status === undefined) {
          vm.$set(vm.entity, 'ticket_deadline_status', -1)
        }
      },
    },
    {
      key: 'tickets',
      label: 'Tickets type',
      type: 'custom-select',
      required: false,
      clearable: false,
      items: [
        {
          label: 'All',
          value: -1,
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
      change: (entity, vm) => {
        if (entity.tickets === undefined) {
          vm.$set(vm.entity, 'tickets', -1)
        }
      },
    },
    {
      key: 'priority_id', type: 'list', list: 'priority', listLabel: 'priority_name', required: false,
    },
  ],
  note: 'frontend_0_8_2',
}

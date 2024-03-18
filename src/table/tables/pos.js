import _ from 'lodash'
import { getUserData } from '@/auth/utils'

export default {
  entity: 'frontend_3_1_1',
  primaryKey: 'pos_id',
  createModal: 'modal',
  entityEndpoint: '/pos',
  filter: (item, vm) => {
    const user = getUserData()
    if (vm.$store.getters['user/isUserExternClient']) {
      if (user.customergroup) {
        const { customergroup_id } = user.customergroup
        return item.customergroup_id === customergroup_id
      }
      return false
    }
    return true
  },
  options: {
    id: 'siderbar_point_of_sale',
    shadow: true,
    rigth_position: true,
    no_header: true,
    custom_footer: false,
    backdrop: true,
    backdrop_variant: 'variant',
  },
  perPage: 100000,
  fields: [
    { key: 'pos_id', auto: true },
    {
      key: 'customergroup_id',
      type: 'list',
      list: 'customergroup',
      listLabel: 'customergroup_name',
      send: false,
      hideOnIndex: true,
      hideOnUpdate: true,
    },
    {
      key: 'company_id',
      type: 'list',
      list: 'company',
      cols: 12,
      listLabel: 'company_name',
      hideOnIndex: true,
      relationEntity: 'company_pos_rel',
      filter_key: 'customergroup_id',
    },
    { key: 'pos_name', cols: 12 },
    { key: 'pos_branchnumber', cols: 12 },
    { key: 'pos_name_external', required: false },
    // { key: 'location_count', hideOnForm: true },
    { key: 'area_count', hideOnForm: true },
    {
      key: 'pos_first_year', type: 'date', hideOnIndex: true,
    },
    {
      key: 'contactperson_id',
      type: 'list',
      list: 'frontend_2_1_3_5',
      listLabel: 'contactperson_name',
      hideOnIndex: true,
      relationEntity: 'contactperson_pos_rel',
      filter_key: 'company_id',
    },
    // {
    //   key: 'pos_first_year', type: 'date', required: false, hideOnIndex: true,cols: 12
    // },
    // {
    //   key: 'contactperson_id',
    //   type: 'list',
    //   list: 'frontend_2_1_3_5',
    //   listLabel: 'contactperson_name',
    //   hideOnIndex: true,
    //   relationEntity: 'contactperson_pos_rel',
    //   filter_key: 'company_id',
    // },
  ],
  filters: [
    {
      key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
    },
    {
      key: 'company_id',
      type: 'list',
      list: 'frontend_2_2_3_1',
      listLabel: 'company_name',
      filter_key: 'customergroup_id',
    },
    {
      key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name', required: false,
    },
  ],
  filter_vertical: true,
  relations: [
    {
      primaryKey: 'location_id',
      entity: 'frontend_3_1_3_7',
      entityView: 'location',
      update: false,
      create: false,
      delete: false,
      fields: [
        { key: 'location_name', hideOnForm: true },
        { key: 'manager_name', hideOnForm: true },
        { key: 'owner_name' },
        { key: 'location_area_space_sum' },
        { key: 'city_name' },
        { key: 'city_zip' },
      ],
    },
    {
      customRequest: {
        endpoint: '/pos',
        relationKey: 'area_ids',
        entityKey: 'pos_id',
      },
      primaryKey: 'area_id',
      entity: 'frontend_3_1_3_1',
      entityForm: 'area_pos_rel',
      entityView: 'area',
      update: false,
      fields: [
        {
          key: 'area_id',
          sortable: true,
          type: 'list',
          list: 'area',
          listLabel: 'area_name',
          disableOnUpdate: true,
        },
        { key: 'area_name', hideOnForm: true },
        { key: 'area_name_external', hideOnForm: true },
        { key: 'location_id', hideOnForm: true },
        {
          key: 'location_name',
          hideOnForm: true,
        },
        {
          key: 'areatype_name',
          hideOnForm: true,
        },
        {
          key: 'area_last_change_time', hideOnForm: true, type: 'date', time: true,
        }, {
          key: 'area_space_value', hideOnForm: true,
        },
      ],
    },
    {
      primaryKey: 'contract_id',
      entity: 'frontend_3_1_3_2',
      entityForm: 'contract_area_unit_usagetype_rel',
      entityView: 'contract',
      fields: [
        {
          key: 'contract_id',
          sortable: true,
          type: 'list',
          list: 'contract',
          listLabel: 'contract_name',
          disableOnUpdate: true,
        },
        {
          key: 'contracttype_id',
          sortable: true,
          type: 'list',
          list: 'contracttype',
          listLabel: 'contractype_name',
          hideOnForm: true,
        },
        { key: 'area_name_external', sortable: true, hideOnForm: true },
        {
          key: 'area_id', sortable: true, type: 'list', list: 'area', listLabel: 'area_name',
        },
        {
          key: 'unit_id',
          sortable: true,
          composite: true,
          type: 'list',
          list: 'unit',
          listLabel: 'unit_name',
          hideOnIndex: true,
          disableOnUpdate: true,
        },
        {
          key: 'usagetype_id',
          sortable: true,
          type: 'list',
          list: 'usagetype',
          listLabel: 'usagetype_name',
          hideOnIndex: true,
          composite: true,
          disableOnUpdate: true,
        },
        {
          key: 'contract_area_unit_usagetype_detail_description',
        },
        {
          key: 'contract_area_unit_usagetype_mainusage', type: 'boolean',
        },
        {
          key: 'contract_area_unit_usagetype_valid_from_date', type: 'date', disableOnUpdate: true, composite: true,
        },
        {
          key: 'contract_area_unit_usagetype_valid_to_date', type: 'date',
        },
        {
          key: 'contract_first_possible_end_date', sortable: true, hideOnForm: true,
        },
        {
          key: 'contract_area_unit_usagetype_rentalspace_value', type: 'number',
        },
        {
          key: 'contract_area_unit_usagetype_allocationspace_value', type: 'number',
        },
        {
          key: 'document_id', hideOnForm: true, sortable: true,
        },
      ],
      create: false,
      delete: false,
      update: false,
    },
    {
      customRequest: {
        endpoint: '/pos',
        relationKey: 'tag_ids',
        entityKey: 'pos_id',
      },
      primaryKey: 'tag_id',
      entity: 'frontend_3_1_3_3',
      entityForm: 'pos_tag_rel',
      entityView: 'tag',
      update: false,
      fields: [
        {
          key: 'tag_id',
          label: 'Tag ID',
          sortable: true,
          type: 'list',
          list: 'tag',
          listLabel: 'tag_name',
          disableOnUpdate: true,
        },
        { key: 'tag_name', sortable: true, hideOnForm: true },
        { key: 'tag_description', hideOnForm: true },
      ],
    },
    {
      title: 'headline~ticket~tab',
      primaryKey: 'ticket_id',
      // entity: 'frontend_3_1_3_4',
      entityEndpoint: '/tickets/slims',
      entityForm: 'ticket_pos_rel',
      entityView: 'ticket',
      fields: [
        {
          key: 'ticket_id',
          type: 'list',
          list: 'ticket',
          listLabel: 'ticket_name',
          disableOnUpdate: true,
        },
        { key: 'ticket_name', hideOnForm: true },
        { key: 'column_name', hideOnForm: true },
        { key: 'board_id', hideOnForm: true },
        { key: 'board_name', hideOnForm: true },
        { key: 'ticket_deadline', hideOnForm: true },
        { key: 'ticket_deadline_yellow', hideOnForm: true },
        { key: 'ticket_deadline_red', hideOnForm: true },
        { key: 'ticket_move_time_in', hideOnForm: true },
        { key: 'ticket_move_time_out', hideOnForm: true },
        { key: 'ticket_deadline_offset', hideOnForm: true },
      ],
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
      newRoute: { name: 'table-form', params: { table: 'ticket' } },
      update: false,
      delete: false,
    },
    {
      title: 'headline~contradictionpackage~tab',
      entity: 'frontend_3_1_3_5',
      fields: [
        {
          key: 'contradictionpackage_id',
          type: 'list',
          list: 'contradictionpackage',
          listLabel: 'contradictionpackage_name',
          disableOnUpdate: true,
        },
        { key: 'contradictionpackage_name', hideOnForm: true },
        { key: 'contradictionpackage_description', hideOnForm: true },
        { key: 'contradictionpackage_sum', hideOnForm: true },
        { key: 'contradictionpackage_last_change_time', hideOnForm: true },
      ],
      create: false,
      update: false,
      delete: false,
    },
    {
      entityView: 'invoice',
      update: false,
      create: false,
      delete: false,
      entity: 'frontend_3_1_3_6',
      fields: [
        { key: 'invoice_id', auto: true },
        { key: 'invoice_date', hideOnForm: true },
        { key: 'invoice_contract_year', hideOnForm: true },
        { key: 'invoice_company_name', hideOnForm: true },
        { key: 'invoice_allocationarea', hideOnForm: true },
        { key: 'invoice_payment_date', hideOnForm: true },
        { key: 'customergroup_name', hideOnForm: true },
        { key: 'partnercompany_name', hideOnForm: true },
      ],
    },
    {
      customRequest: {
        endpoint: '/pos',
        relationKey: 'document_ids',
        entityKey: 'pos_id',
      },
      title: 'headline~document~tab',
      primaryKey: 'document_id',
      entityForm: 'document_pos_rel',
      entity: 'frontend_3_1_3_8',
      fields: [
        {
          key: 'document_id',
          type: 'list',
          list: 'document',
          listLabel: 'document_name',
          alwaysNew: true,
          onlyForm: true,
          multiple: true,
        },
        { key: 'document_name', hideOnForm: true },
        { key: 'document_entry_time', hideOnForm: true },
        { key: 'documenttype_name', hideOnForm: true },
      ],
    },
  ],
  default: {
    pos_internal_id: '56',
  },
  note: 'frontend_0_8_3',
  submit: async (vm, entity, create) => {
    const attributes = [
      'company_id',
      'pos_name',
      'pos_first_year',
      'pos_branchnumber',
      'pos_name_external',
      'pos_internal_id',
      'pos_opening_date',
      'contactperson_id',
    ]
    if (create) {
      return vm.$http.post('/pos', _.pick(entity, attributes))
    }
    attributes.push('pos_id')
    return vm.$http.put('/pos', _.pick(entity, attributes))
  },
  panels: [
    {
      component: () => import('@/views/app/Generic/Panels/TrackRecord.vue'),
      props: {},
    },
  ],
}

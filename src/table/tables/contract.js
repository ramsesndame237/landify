import { getContractCriteriaFields } from '@/table/utils'
import _ from 'lodash'
import router from '@/router'

export default {
  // entity: 'frontend_3_4_1_1',
  entityEndpoint: '/contracts',
  fetchWithEntity: true,
  formComponent: () => import('@/views/app/FormComponent/ContractForm.vue'),
  createModal: 'otherPage',
  // createComponent: () => import('@/views/app/CreateComponent/ContractForm/ContractFormNew.vue'),
  fields: [
    { key: 'contract_id', auto: true },
    { key: 'contract_name', size: 40, cols: 6 },
    {
      key: 'contracttype_id',
      type: 'list',
      size: 40,
      cols: 6,
      list: 'contracttype',
      listLabel: 'contracttype_name',
      hideOnIndex: true,
      hideOnUpdate: true,
    },
    {
      key: 'customergroup_id',
      type: 'list',
      size: 40,
      cols: 6,
      list: 'customergroup',
      listLabel: 'customergroup_name',
      send: false,
      hideOnIndex: true,
      hideOnUpdate: true,
    },
    {
      key: 'company_id',
      type: 'list',
      size: 40,
      cols: 6,
      list: 'frontend_2_2_3_1',
      listLabel: 'company_name',
      filter_key: 'customergroup_id',
      send: false,
      hideOnIndex: true,
      hideOnUpdate: true,
    },
    {
      key: 'pos_id',
      type: 'list',
      size: 40,
      cols: 6,
      list: 'pos',
      entityCustomEndPoint: '/pos',
      listLabel: 'pos_name',
      hideOnIndex: true,
      hideOnUpdate: true,
      handleFieldChange: (newValue, oldValue, entity, vm) => {
        const { selectedValue } = vm
        vm.$set(entity, 'location_id', selectedValue.location_id)
      },
    },
    {
      key: 'location_id',
      size: 40,
      cols: 6,
      listLabel: 'location_name',
      type: 'list',
      list: 'frontend_3_1_3_7',
      relationEntity: 'contract_location_rel',
      filter_key: 'pos_id',
      hideOnIndex: true,
      hideOnUpdate: true,
    },
    {
      key: 'contracttype_name',
      cols: 6,
      hideOnCreate: true,
      disabled: true,
      required: false,
    },
    {
      key: 'customergroup_name',
      cols: 6,
      hideOnIndex: true,
      hideOnCreate: true,
      disabled: true,
      required: false,
    },
    {
      key: 'company_name',
      cols: 6,
      hideOnIndex: true,
      hideOnCreate: true,
      disabled: true,
      required: false,
    },
    {
      key: 'pos_name',
      hideOnIndex: true,
      cols: 6,
      hideOnCreate: true,
      disabled: true,
      required: false,
    },
    {
      key: 'location_name',
      hideOnIndex: true,
      cols: 6,
      hideOnCreate: true,
      disabled: true,
      required: false,
    },
    {
      key: 'location_name', hideOnForm: true, cols: 6,
    },

    {
      key: 'owner_name',
      // hideOnForm: true,
      cols: 6,
      category: 'patner',
      formatter: (value, key, item) => {
        const array = item.owners
        const ownersName = array.length > 0 ? array.map(obj => obj.owner_name) : []
        const result = ownersName.join(', ')

        return result || '-'
      },
    },
    {
      key: 'manager_name',
      // hideOnForm: true,
      category: 'patner',
      cols: 6,
      formatter: (value, key, item) => {
        const array = item.managers
        const managerName = array.length > 0 ? array.map(obj => obj.manager_name) : []
        const result = managerName.join(', ')

        return result || '-'
      },
    },
    {
      key: 'are_manager',
      listLabel: 'Are the owner and the manager the same ?',
      type: 'boolean',
      category: 'patner',
      swicth: true,
      cols: 12,
      inline: true,
    },
    {
      key: 'company_name',
      hideOnForm: true,
    },
    {
      key: 'pos_name',
      hideOnForm: true,
      formatter: (value, key, item) => {
        const array = item.pos
        const posName = array.length > 0 ? array.map(obj => obj.pos_name) : []
        const result = posName.join(', ')

        return result || '-'
      },
    },
    {
      key: 'pos_id',
      type: 'list',
      list: 'frontend_2_1_3_8',
      listLabel: 'pos_name',
      filter_key: 'company_id',
      hideOnUpdate: true,
      hideOnCreate: true,
      hideOnIndex: true,

    },

    {
      key: 'contract_resiliation',
      hideOnForm: true,
      hideOnIndex: true,
      formatter: value => (value === 1 ? 'Resiliated' : 'Pending'),
      type: 'custom-select',
      items: [{ label: 'Resiliated', value: 1 }, { label: 'Pending', value: 0 }],
      disabled: true,
      visible: entity => entity.contract_resiliation === 1,
    },
    {
      key: 'contract_begin_date', type: 'date', category: 'date', hideOnIndex: true,
    }, // La clé category  permet de classer les champs dans les tabs en function de sa categorie
    {
      key: 'contract_end_date', type: 'date', hideOnIndex: true, category: 'date',
    },
    {
      key: 'contract_first_possible_end_date',
      type: 'date',
      hideOnIndex: true,
      category: 'date',
      hideOnForm: true,
    },
    {
      key: 'contract_last_change_time',
      type: 'date',
      hideOnIndex: true,
      hideOnCreate: true,
      rules: { regex: false },
      category: 'date',
      disabled: true,
      send: false,
    },
    {
      key: 'contract_creation_time',
      hideOnIndex: true,
      hide: true,
      send: false,
    },
    {
      key: 'action_begin',
      type: 'date',
      hideOnIndex: true,
      required: false,
      disabled: true,
      category: 'date',
      hideOnCreate: true,
    },
    {
      key: 'action_ende_soll',
      hideOnIndex: true,
      required: false,
      disabled: true,
      category: 'date',
      hideOnCreate: true,
      type: 'date',
    },
    {
      key: 'action_ende_final',
      type: 'date',
      hideOnIndex: true,
      required: false,
      disabled: true,
      category: 'date',
      hideOnCreate: true,
    },
    {
      key: 'actual_action_notice_period',
      hideOnForm: true,
      hideOnIndex: true,
      required: false,
      disabled: true,
      category: 'date',
      hideOnCreate: true,
      type: 'date',
    },
    {
      key: 'next_possible_end_of_contract',
      hideOnIndex: true,
      required: false,
      disabled: true,
      category: 'date',
      hideOnCreate: true,
      type: 'date',
    },
    {
      key: 'last_possible_end_of_contract',
      hideOnIndex: true,
      required: false,
      disabled: true,
      category: 'date',
      hideOnCreate: true,
      type: 'date',
    },
    {
      key: 'actual_action_notice_day',
      type: 'date',
      hideOnIndex: true,
      hideOnForm: true,
      required: false,
      disabled: true,
      category: 'date',
      hideOnCreate: true,
    },
    { key: 'contract_sum_allarea_rentalspace', hideOnForm: true, hideOnIndex: true },
    { key: 'contract_sum_allarea_allocationspace', hideOnForm: true, hideOnIndex: true },

    { key: 'contract_count_area', hideOnForm: true },
    {
      key: 'currency_id',
      type: 'list',
      list: 'currency',
      category: 'price',
      listLabel: 'currency_name',
      hideOnIndex: true,
      hideOnUpdate: true,
    },
    {
      key: 'currency_name', hideOnIndex: true, hideOnCreate: true, disabled: true, category: 'price',
    },

    {
      key: 'contract_migration_checked',
      type: 'boolean',
      hideOnIndex: true,
      hideOnUpdate: true,
      hideOnForm: true,
    },

  ],
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
      filter_key: 'customergroup_id',
      listLabel: 'company_name',
      required: false,
    },
    {
      key: 'manager_id',
      type: 'list',
      list: 'partnercompany',
      listLabel: 'partnercompany_name',
      tableKey: 'partnercompany_id',
      required: false,
    },
    {
      key: 'owner_id',
      type: 'list',
      list: 'partnercompany',
      listLabel: 'partnercompany_name',
      tableKey: 'partnercompany_id',
      required: false,
    },
  ],
  default: {
    contract_migration_checked: 0,
  },
  relations: [
    {
      primaryKey: 'invoice_id',
      entity: 'frontend_3_4_3_6',
      entityForm: 'invoice_contract_rel',
      entityView: 'invoice',
      create: false,
      update: false,
      fields: [
        {
          key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_description',
        },
        { key: 'invoice_date', type: 'date', hideOnForm: true },
        { key: 'invoice_payment_date', type: 'date', hideOnForm: true },
        { key: 'invoice_creation_time', hideOnForm: true },
        { key: 'invoice_date_of_order', hideOnForm: true },
        { key: 'invoice_billing_year', hideOnForm: true },
        { key: 'invoiceposition_count', hideOnForm: true },
        { key: 'invoice_contract_year', type: 'number' },
        { key: 'invoice_billing_period_from_date', type: 'date' },
        { key: 'invoice_billing_period_to_date', type: 'date' },
      ],
    },

    {
      entity: 'frontend_3_4_3_10',
      entityView: 'area',
      entityForm: 'contract_area_unit_usagetype_rel',
      primaryKey: 'area_id',
      fields: [
        {
          key: 'area_id', type: 'list', list: 'area', listLabel: 'area_name', disableOnUpdate: true,
        },
        { key: 'area_name', hideOnForm: true },
        { key: 'city_name', hideOnForm: true },
        { key: 'country_name', hideOnForm: true },
        { key: 'contract_area_unit_usagetype_allocationspace_value', hideOnForm: true },
        { key: 'contract_area_unit_usagetype_rentalspace_value', hideOnForm: true },
        { key: 'contract_area_unit_usagetype_valid_from_date', hideOnForm: true },
        { key: 'contract_area_unit_usagetype_valid_to_date', hideOnForm: true },
        { key: 'usagetype_name', hideOnForm: true },
        {
          key: 'usagetype_id',
          sortable: true,
          type: 'list',
          list: 'usagetype',
          listLabel: 'usagetype_name',
          hideOnIndex: true,
          composite: true,
        },
        {
          key: 'contract_area_unit_usagetype_detail_description', type: 'textarea', hideOnIndex: true,
        },
        {
          key: 'unit_id',
          sortable: true,
          type: 'list',
          list: 'unit',
          listLabel: 'unit_name',
          hideOnIndex: true,
          composite: true,
          disabled: true,
        },
        {
          key: 'contract_area_unit_usagetype_rentalspace_value', type: 'number', hideOnIndex: true,
        },
        {
          key: 'contract_area_unit_usagetype_valid_from_date',
          type: 'date',
          disableOnUpdate: true,
          hideOnIndex: true,
        },
        {
          key: 'contract_area_unit_usagetype_valid_to_date', type: 'date', hideOnIndex: true,
        },
        {
          key: 'contract_area_unit_usagetype_allocationspace_value', type: 'number', hideOnIndex: true,
        },
        {
          key: 'contract_area_unit_usagetype_mainusage', type: 'boolean',
        },

      ],
      default: {
        unit_id: 1,
      },
    },
    {
      entity: 'frontend_3_4_3_11',
      entityView: 'partnercompany',
      fields: [
        // { key: 'area_id' },
        { key: 'location_id' },
        // { key: 'partnercompany_id' },
        { key: 'partnercompany_name' },
        { key: 'partnercompany_shortname' },
        { key: 'partnertype_name' },
        { key: 'partnergroup_name' },
        { key: 'city_name' },
        { key: 'location_partnercompany_partnertype_valid_from_date' },
        { key: 'location_partnercompany_partnertype_valid_to_date' },
      ],
      create: false,
      update: false,
      delete: false,
    },
    {
      primaryKey: 'document_id',
      entity: 'frontend_3_4_3_1_bottom',
      entityForm: 'document_contract_documentcontracttype_rel',
      entityView: 'document',
      fields: [
        {
          key: 'document_id',
          composite: true,
          type: 'list',
          list: 'document',
          onlyForm: true,
          alwaysNew: true,
          defaultEntity: { documenttype_id: 1 },
          // disabled: ['documenttype_id'],
        },
        { key: 'document_name', hideOnForm: true },
        { key: 'documenttype_name', hideOnForm: true },
        { key: 'document_entry_time', hideOnForm: true },
        { key: 'documentcontracttype_name', hideOnForm: true },
        {
          key: 'documentcontracttype_id',
          type: 'list',
          list: 'documentcontracttype',
          listLabel: 'documentcontracttype_name',
          hideOnIndex: true,
          relationEntity: false,
        },
      ],
    },
    {
      title: 'Deadlines',
      primaryKey: 'contractaction_id',
      entity: 'contractaction',
      entityEndpoint: '/contracts/deadlines',
      component: () => import('@/views/app/Contracts/Relations/Deadlines/DeadlineTable.vue'),
      tool: () => import('@/views/app/Contracts/Relations/Deadlines/DeadlinesTools.vue'),
      search: false,
      create: false,
      delete: false,
      defaultSortField: 'contractaction_id',
      fields: [
        {
          key: 'contractaction_id',
          hideOnIndex: true,
        },
        {
          key: 'contractaction_acting_by',
          label: 'Acting by',
          type: 'custom-select',
          items: [
            { label: ' Mieter & Vermieter', value: 'mieter_vermieter' },
            { label: 'Mieter', value: 'mieter' },
            { label: 'Vermieter', value: 'vermieter' },
          ],
        },
        {
          key: 'contractaction_type',
          label: 'Action Type',
          type: 'custom-select',
          items: [
            { label: 'Active Option', value: 'active_option' },
            { label: 'Automatic Option', value: 'automatic_option' },
            { label: 'Automatic extension', value: 'automatic_extension' },
            { label: 'Resiliation', value: 'resiliation' },
            { label: 'Special Resiliation', value: '"special_resiliation"' },
          ],
          formatter: value => {
            const types = {
              active_option: 'Active Option',
              automatic_option: 'Automatic Option',
              automatic_extension: 'Automatic extension',
              resiliation: 'Resiliation',
              special_resiliation: 'Special Resiliation',
            }
            return types[value]
          },
        },
        {
          key: 'contractaction_resiliation_date',
          type: 'date',
          label: 'Resiliation date',
        },
        {
          key: 'contractaction_options',
          type: 'number',
          label: 'Expected number of options',
          formatter: (value, key, item) => {
            const { contractaction_unlimited_options, contractaction_type } = item
            if (contractaction_unlimited_options === 1 && ['automatic_extension'].includes(contractaction_type)) return '\u{221E}'
            return (!value ? '--' : value)
          },
        },
        {
          key: 'contractaction_extension_value', type: 'number', label: 'Extension value', hideOnIndex: true,
        },
        { key: 'contractaction_extension_unit', label: 'Extension unit', hideOnIndex: true },
        {
          key: 'contractaction_extension',
          label: 'Extension',
          hideOnForm: true,
          send: false,
          formatter: (value, key, item) => {
            const {
              contractaction_extension_value,
              contractaction_extension_unit,
              contractaction_type,
            } = item

            if ((!contractaction_extension_value && !contractaction_extension_unit) || ['resiliation', 'special_resiliation'].includes(contractaction_type)) {
              return '--'
            }
            return `${contractaction_extension_value}  ${contractaction_extension_unit}`
          },
        },
        { key: 'contractaction_notice_period_value', type: 'number', hideOnIndex: true },
        {
          key: 'contractaction_notice_period_unit',
          hideOnIndex: true,
          type: 'custom-select',
          items: [
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
            { label: 'Year', value: 'year' },
          ],
        },
        {
          key: 'contractaction_notice_period',
          label: 'Notice period',
          hideOnForm: true,
          send: false,
          formatter: (value, key, item) => {
            const { contractaction_notice_period_value, contractaction_notice_period_unit } = item
            return `${contractaction_notice_period_value}  ${contractaction_notice_period_unit}`
          },
        },
        {
          key: 'contractaction_notice_date',
          label: 'Notice date',
          hideOnForm: true,
          send: false,
          hideOnIndex: true,
        },
        {
          key: 'contractaction_creation_time',
          type: 'date',
          label: 'Creation date',
          hideOnForm: true,

        },
        {
          key: 'contractaction_status',
          hideOnForm: true,
          label: 'Status',
          formatter: value => {
            const status = {
              active: 'Active', unactive: 'Unactive', cancelled: 'Cancelled', pulled: 'Pulled',
            }

            return status[value]
          },
        },
      ],
    },
    {
      primaryKey: 'recurringpayment_id',
      entity: 'frontend_3_4_3_3',
      entityForm: 'contract_recurringpayment_rel',
      entityView: 'recurringpayment',
      fields: [
        {
          key: 'recurringpayment_id',
          type: 'list',
          list: 'recurringpayment',
          listLabel: 'recurringpayment_name',
          alwaysNew: true,
          onlyForm: true,
          without: 'contract_id',
        },
        {
          key: 'recurringpayment_name',
          hideOnForm: true,
        },
        {
          key: 'recurringpaymenttype_name',
          hideOnForm: true,
        },
        {
          key: 'recurringpayment_sum_per_month',
          hideOnForm: true,
        },
        { key: 'recurringpayment_begin_date', type: 'date', hideOnForm: true },
        {
          key: 'recurringpaymenttype_name',
          hideOnForm: true,
        },
        {
          key: 'maturitytype_name',
          hideOnForm: true,
        },
        {
          key: 'indexclause_name', hideOnForm: true,
        },
      ],
    },
    {
      primaryKey: 'serviceobject_id',
      entity: 'frontend_3_4_3_7',
      entityForm: 'serviceobject_contract_rel',
      entityView: 'serviceobject',
      fields: [
        {
          key: 'serviceobject_id',
          type: 'list',
          list: 'serviceobject',
          alwaysNew: true,
          onlyForm: true,
          withFields: [
            {
              key: 'area_id',
              type: 'list',
              list: 'area',
              entityList: 'frontend_3_4_3_10',
              filter: (area, vm) => {
                const { id: contract_id } = vm.$route.params
                const { contract_id: areaContract_id } = area

                return Number(contract_id) === areaContract_id
              },
              listLabel: 'area_name',
              hideOnIndex: true,
              relationEntity: 'area_serviceobject_rel',
            },
          ],
        },
        { key: 'serviceobject_name', hideOnForm: true },
        { key: 'serviceobjecttype_name', hideOnForm: true },
        { key: 'area_name', hideOnForm: true },
        { key: 'location_name', hideOnForm: true },
      ],
    },
    {
      primaryKey: 'costtype_id',
      entity: 'frontend_3_4_3_5',
      entityForm: 'contract_costtype_rel',
      entityView: 'costtype',
      fields: [
        {
          key: 'costtype_id',
          type: 'list',
          list: 'costtype',
          listLabel: 'costtype_name',
        },
        { key: 'costtype_name', hideOnForm: true },
        { key: 'contract_costtype_comment' },
      ],
    },

    {
      primaryKey: 'criteria_id',
      entity: 'frontend_3_4_3_4',
      entityForm: 'contract_criteria_rel',
      entityView: 'criteria',
      fieldComponent: () => import('@/views/app/CreateComponent/ContractCriteria'),
      fields: [
        {
          key: 'criteria_id',
          type: 'list',
          list: 'criteria',
          listLabel: 'criteria_name',
          composite: true,
          disableOnUpdate: true,
          hideOnIndex: true,
        },
        { key: 'criteria_name', hideOnForm: true },
        ...getContractCriteriaFields(),
      ],
      // update: false,
    },
  ],
  note: 'frontend_0_8_1',
  fetch: async vm => {
    try {
      const response = await vm.$http.get(`/contracts/${vm.entityId}`)
      const { data } = response
      if (data.company) {
        data.company_id = data.company.company_id
        data.company_name = data.company.company_name
        if (data.company.customergroup) {
          data.customergroup_id = data.company.customergroup.customergroup_id
          data.customergroup_name = data.company.customergroup.customergroup_name
        }
      }

      if (data.areas) {
        data.contract_count_area = data.areas.length
        data.contract_sum_allarea_allocationspace = data.areas.reduce(
          (acc, currentValue) => acc + currentValue.contract_area_unit_usagetype_allocationspace_value,
          0,
        )
        data.contract_sum_allarea_rentalspace = data.areas.reduce(
          (acc, currentValue) => acc + currentValue.contract_area_unit_usagetype_rentalspace_value,
          0,
        )
      }

      if (data.contracttype) {
        data.contracttype_id = data.contracttype.contracttype_id
        data.contracttype_name = data.contracttype.contracttype_name
      }

      if (data.currency) {
        data.currency_id = data.currency.currency_id
        data.currency_name = data.currency.currency_name
      }

      if (data.documentcontracttypes.length > 0) {
        data.documentcontracttype_id = data.documentcontracttypes[0].documentcontracttype_id
        data.documentcontracttype_name = data.documentcontracttypes[0].documentcontracttype_name
      }

      if (data.location) {
        data.location_id = data.location.location_id
        data.location_name = data.location.location_name
      }

      if (data.pos.length > 0) {
        data.pos_id = data.pos[0].pos_id
        data.pos_name = data.pos[0].pos_name
      }

      if (data.owners.length > 0) {
        data.owner_id = data.owners[0].owner_id
        data.owner_name = data.owners[0].owner_name
      }
      if (data.managers.length > 0) {
        data.manager_id = data.managers[0].manager_id
        data.manager_name = data.managers[0].manager_name
      }

      if (data.action_begin === null) {
        data.action_begin = ''
      }
      if (data.action_ende_final === null) {
        data.action_ende_final = ''
      }
      if (data.action_ende_soll === null) {
        data.action_ende_soll = ''
      }
      return data
    } catch (error) {
      console.log({ error })
    }
    return null
  },
  submit: async (vm, entity, create) => {
    const attributes = ['contract_name',
      'contract_begin_date',
      'contract_end_date',
      'contract_first_possible_end_date',
      'contract_migration_checked',
      'contracttype_id',
      'company_id',
      'location_id',
      'currency_id',
      'pos_id',
    ]
    if (create) {
      await vm.$http.post('/contracts/step/0', _.pick(entity, attributes))
    } else {
      return vm.$http.put(`/contracts/step/0/${entity.contract_id}`, _.pick(entity, attributes))
    }
  },
  panels: [
    {
      component: () => import('@/views/app/Generic/Panels/TrackRecord.vue'),
      props: {},
    },
  ],
}

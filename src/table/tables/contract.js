import { getContractCriteriaFields } from '@/table/utils'
import moment from 'moment'

export default {
  entity: 'frontend_3_4_1_1',
  entityEndpoint: '/contracts',
  fetchWithEntity: true,
  // createModal: false,
  // createComponent: () => import('@/views/app/CreateComponent/ContractForm/Index.vue'),
  fields: [
    { key: 'contract_id', auto: true },
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
      list: 'frontend_2_2_3_1',
      listLabel: 'company_name',
      filter_key: 'customergroup_id',
      send: false,
      hideOnIndex: true,
      hideOnUpdate: true,
    },
    // {
    //   key: 'pos_id',
    //   type: 'list',
    //   list: 'frontend_2_1_3_8',
    //   listLabel: 'pos_name',
    //   filter_key: 'company_id',
    //   send: false,
    //   hideOnIndex: true,
    //   hideOnUpdate: true,
    // },
    {
      key: 'location_id',
      type: 'list',
      list: 'frontend_3_1_3_7',
      listLabel: 'location_name',
      relationEntity: 'contract_location_rel',
      // filter_key: 'pos_id',
      hideOnIndex: true,
      hideOnUpdate: true,
    },
    {
      key: 'customergroup_name', hideOnIndex: true, hideOnCreate: true, disabled: true,
    },
    {
      key: 'company_name', hideOnIndex: true, hideOnCreate: true, disabled: true,
    },
    {
      key: 'location_name', hideOnIndex: true, hideOnCreate: true, disabled: true,
    },
    {
      key: 'pos_name', hideOnIndex: true, hideOnCreate: true, disabled: true,
    },
    { key: 'contracttype_name', hideOnCreate: true, disabled: true },
    { key: 'contract_name' },
    { key: 'location_name', hideOnForm: true },
    {
      key: 'owner_name',
      hideOnForm: true,
      formatter: (value, key, item) => {
        const array = item.owners
        const ownersName = array.length > 0 ? array.map(obj => obj.owner_name) : [];
        const result = ownersName.join(", ");

        return result || '-';
      }
    },
    {
      key: 'manager_name',
      hideOnForm: true,
      formatter: (value, key, item) => {
        const array = item.managers
        const managerName = array.length > 0 ? array.map(obj => obj.manager_name) : [];
        const result = managerName.join(", ");

        return result || '-';
      }
    },
    {
      key: 'pos_name',
      hideOnForm: true,
      formatter: (value, key, item) => {
        const array = item.pos
        const posName = array.length > 0 ? array.map(obj => obj.pos_name) : [];
        const result = posName.join(", ");

        return result || '-';
      }
    },
    { key: 'contract_begin_date', type: 'date' },
    { key: 'contract_end_date', type: 'date', hideOnIndex: true },
    { key: 'contract_first_possible_end_date', type: 'date', hideOnIndex: true },
    { key: 'contract_last_change_time', type: 'date', hideOnIndex: true, rules: {regex: false} },
    { key: 'contract_sum_allarea_rentalspace', hideOnForm: true },
    { key: 'contract_sum_allarea_allocationspace', hideOnForm: true },
    { key: 'currency_name', hideOnCreate: true, disabled: true },
    { key: 'contract_count_area', hideOnForm: true },
    {
      key: 'currency_id',
      type: 'list',
      list: 'currency',
      listLabel: 'currency_name',
      hideOnIndex: true,
      hideOnUpdate: true,
    },
    {
      key: 'contracttype_id',
      type: 'list',
      list: 'contracttype',
      listLabel: 'contracttype_name',
      hideOnIndex: true,
      hideOnUpdate: true,
    },
    {
      key: 'contract_migration_checked',
      type: 'boolean',
      hideOnIndex: true,
      hideOnUpdate: true,
      hideOnForm: true,
    },

  ],
  default: {
    contract_migration_checked: 0,
  },
  relations: [

    // {
    //   entity: 'frontend_3_4_3_8',
    //   entityView: 'company',
    //   fields: [
    //     { key: 'company_id' },
    //     { key: 'company_name' },
    //     { key: 'company_shortname' },
    //     { key: 'city_name' },
    //     { key: 'customergroup_name' },
    //   ],
    //   create: false,
    //   update: false,
    //   delete: false,
    // },
    // {
    //   entity: 'frontend_3_4_3_9',
    //   entityView: 'pos',
    //   fields: [
    //     { key: 'pos_id' },
    //     { key: 'pos_name' },
    //     { key: 'pos_branchnumber' },
    //     { key: 'pos_name_external' },
    //     { key: 'area_count' },
    //   ],
    //   create: false,
    //   update: false,
    //   delete: false,
    // },
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
          key: 'contract_area_unit_usagetype_valid_from_date', type: 'date', disableOnUpdate: true, hideOnIndex: true,
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
        // { key: 'location_id' },
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
      view: false,
      fields: [
        {
          key: 'document_id',
          composite: true,
          type: 'list',
          list: 'document',
          onlyForm: true,
          alwaysNew: true,
          defaultEntity: { documenttype_id: 1 },
          disabled: ['documenttype_id'],
        },
        { key: 'document_name', hideOnForm: true },
        { key: 'documenttype_name', hideOnForm: true },
        // { key: 'document_mime_type', hideOnForm: true },
        { key: 'documentcontracttype_name', hideOnForm: true },
        {
          key: 'documentcontracttype_id',
          type: 'list',
          list: 'documentcontracttype',
          listLabel: 'documentcontracttype_name',
          hideOnIndex: true,
          composite: true,
        },
      ],
    },
    {
      primaryKey: 'specialright_id',
      entity: 'frontend_3_4_3_2',
      entityForm: 'contract_specialright_rel',
      entityView: 'specialright',
      withContinue: true,
      createComponent: () => import('@/views/app/CreateComponent/SpecialrightForm/Index.vue'),
      updateComponent: () => import('@/views/app/UpdateComponent/SpecialrightForm.vue'),
      fields: [
        {
          key: 'specialright_id', type: 'list', list: 'specialright', listLabel: 'specialright_name',
        },
        { key: 'specialright_name', hideOnForm: true },
        { key: 'contract_specialright_description', type: 'textarea' },
        { key: 'contract_specialright_actual_options', type: 'number', disabled: true, hideOnForm: true },
        { key: 'contract_specialright_total_number_options', hideOnForm: true, type: 'number' },
        { key: 'contract_specialright_available_options', type: 'number', disabled: true, hideOnForm: true},
        { key: 'contract_specialright_automatic_renewal_in_months', type: 'number', hideOnForm: true },
        { key: 'contract_specialright_renewal_in_months', type: 'number' },
        { key: 'contract_specialright_prior_notice_period', type: 'date' },
        { key: 'contract_specialright_prior_notice_date', type: 'date' },
        { key: 'contract_specialright_date_added', type: 'date' },
        {
          key: 'contract_specialright_termination_date',
          type: 'date',
          composite: true,
          visible: entity => [1, 2].includes(entity.specialright_id),
          change: (entity, vm) => {
            const date = entity.contract_specialright_termination_date
            if (date && moment().isSameOrAfter(date)) {
              vm.$set(vm.entity, 'contract_specialright_is_passive', 1)
              vm.$set(vm.entity, 'contract_specialright_is_availed', 0)
            }
          },
        },
        { key: 'contract_specialright_extensions', type: 'number' },
        { key: 'contract_specialright_measurement_unit', hideOnForm: true, hideOnIndex: true, },
        { key: 'contract_specialright_is_obsolete', hideOnForm: true, hideOnIndex: true, },
        {
          key: 'contract_specialright_date', type: 'date', composite: true, hideOnForm: true, hideOnIndex: true,
        },
        { key: 'contract_specialright_is_passive', type: 'boolean' },
        { key: 'contract_specialright_is_availed', type: 'boolean' },
      ],
      default: {
        contract_specialright_date: '1990-01-01',
      },
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
        },
        {
          key: 'contract_criteria_value',
          unit_key: 'contract_criteria_unit_id',
          unit_label: 'unit_name',
          isUnitOnLeft: false,
        },
        ...getContractCriteriaFields(),
      ],
      // update: false,
    },
  ],
  note: 'frontend_0_8_1',
}

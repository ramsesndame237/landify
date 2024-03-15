import _ from 'lodash'
import { getUserData } from '@/auth/utils'
import Vue from 'vue'
import emailModal from '@/views/app/Ticket/EmailModal.vue'

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
      entity: 'frontend_3_1_3_4',
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
        method: 'delete',
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
          hideOnIndex: true,
        },
        { key: 'document_name', hideOnForm: true },
        { key: 'document_entry_time', hideOnForm: true },
        { key: 'documenttype_name', hideOnForm: true },
      ],
    },
    {
      customRequest: {
        endpoint: '/pos',
        relationKey: 'area_ids',
        entityKey: 'pos_id',
      },
      title: 'Email',
      primaryKey: 'email_id',
      entityEndpoint: '/pos/emails',
      entity: 'frontend_3_1_3_1',
      entityForm: 'area_pos_rel',
      entityView: 'Email',
      update: false,
      delete: false,
      create: false,
      onViewElement: element => {
        const EmailModal = Vue.extend(emailModal)
        const emailModalInstance = new EmailModal({
          i18n: window.$vue.$i18n,
          router: window.$vue.$i18n,
          store: window.$vue.$store,
        })
        emailModalInstance.$mount()
        emailModalInstance.show(true, element)
      },
      fields: [
        {
          key: 'email_received_datetime',
          sortable: true,
          type: 'list',
          list: 'area',
          listLabel: 'area_name',
          disableOnUpdate: true,
        },
        { key: 'email_from', hideOnForm: true },
        { key: 'email_subject', hideOnForm: true },
        // { key: 'location_id', hideOnForm: true },
        // {
        //   key: 'location_name',
        //   hideOnForm: true,
        // },
        // {
        //   key: 'areatype_name',
        //   hideOnForm: true,
        // },
        // {
        //   key: 'area_last_change_time', hideOnForm: true, type: 'date', time: true,
        // }, {
        //   key: 'area_space_value', hideOnForm: true,
        // },
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

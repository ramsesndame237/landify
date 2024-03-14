import {
  comercialRegistryNoRegex,
  isValidIBANNumber,
  taxRegex,
  websiteRegex,
} from '@/libs/utils'

export default {
  entity: 'frontend_2_5_1',
  primaryKey: 'partnercompany_id',
  // formComponent: () => import('@/views/app/FormComponent/PartnerCompanyForm.vue'),
  fields: [
    { key: 'partnercompany_id', auto: true },
    {
      key: 'partnergroup_is_internal',
      label: 'partner group type',
      type: 'custom-select',
      hideOnIndex: true,
      required: false,
      items: [
        { value: 1, label: 'Internal' },
        { value: 0, label: 'External' },
      ],
      send: false,
    },
    // {
    //   key: 'partnercompany_role',
    //   // label: 'Role',
    //   type: 'hidden',
    //   hideOnIndex: true,
    //   required: false,
    //   items: [
    //     { value: 'Manager_Owner', label: 'Owner / Manager' },
    //     { value: 'Manager', label: 'Manager' },
    //     { value: 'Owner', label: 'Owner' },
    //   ],
    //   send: false,
    // },
    {
      key: 'partnergroup_id',
      type: 'list',
      list: 'partnergroup',
      listLabel: 'partnergroup_name',
      hideOnIndex: true,
      filter_key: 'partnergroup_is_internal',
      noFetchOnChange: true,
    },
    { key: 'partnercompany_name' },
    { key: 'partnercompany_shortname', maxLength: 10 },
    { key: 'partnergroup_name', hideOnForm: true },
    { key: 'city_name', hideOnForm: true },
    { key: 'contactdetails_email', hideOnForm: true },
    { key: 'contactpersons_count', hideOnForm: true },
    { key: 'locations_count', hideOnForm: true },
    /* {
      key: 'address_id',
      hideOnIndex: true,
      type: 'list',
      list: 'address',
      listLabel: 'address_street',
      withNew: true,
      alwaysNew: true,
      onlyForm: true,
    },
    {
      key: 'contactdetails_id',
      hideOnIndex: true,
      type: 'list',
      list: 'contactdetails',
      listLabel: 'contactdetails_email',
      withNew: true,
      alwaysNew: true,
      onlyForm: true,
    },
    {
      key: 'companydetails_id',
      hideOnIndex: true,
      type: 'list',
      list: 'companydetails',
      listLabel: 'companydetails_commercialregisterno',
      withNew: true,
      alwaysNew: true,
      onlyForm: true,
    }, */
    // {
    //   key: 'partnercompany_type',
    //   type: 'checkbox',
    //   items: [
    //     { label: 'Option A', value: 0 },
    //     { label: 'Option B', value: 1 },
    //     { label: 'Option C', value: 3 },
    //   ],
    // },
    {
      key: 'partnertype_id',
      type: 'list',
      list: 'partnertype',
      listLabel: 'partnertype_name',
      hideOnIndex: true,
      noFetchOnChange: true,
    },
  ],
  filter_vertical: true,
  filters: [
    {
      key: 'partnercompany_id',
      type: 'list',
      list: 'partnercompany',
      listLabel: 'partnercompany_name',
    },
  ],
  relations: [
    {
      title: 'bankdata',
      entity: 'bankdata',
      primaryKey: 'bankdata_id',
      entityEndpoint: vm => `/partners/${vm.$route.params.id}/bankdata`,
      fields: [
        {
          key: 'bankdata_iban',
          type: 'string',
        },
        {
          key: 'iban_id',
          type: 'number',
        },
        {
          key: 'bankdata_bank_name',
          required: false,
        },
      ],
      async submit(vm, entity, create) {
        try {

          const method = create ? 'post' : 'put'
          const url = create ? `/partners/${vm.$route.params.id}/bankdata` : `/partners/${vm.$route.params.id}/bankdata/${entity.bankdata_id}`

          const dataForServer = {
            ...entity,
          }

          await vm.$http[method](url, dataForServer)
        } catch (error) {
          throw Error(error?.response?.data?.detail
            ?? vm.$t(String(error.message)?.startsWith('errors~')
              ? vm.$t(error.message)
              : 'errors~unexpected~error~ocurred'))
        }
      },
    },
    {
      title: 'kreditornumber',
      entity: 'kreditornumber',
      primaryKey: 'kreditornumber_id',
      entityEndpoint: vm => `/partners/${vm.$route.params.id}/kreditornumber`,
      fields: [
        {
          key: 'company_id',
          type: 'list',
          list: 'company',
          listLabel: 'company_name',
          required: true,
          hideOnUpdate: true,
        },
        {
          key: 'company_name',
          hideOnForm: true,
        },
        {
          key: 'kreditornumber',
          type: 'number',
        },
      ],
      async submit(vm, entity, create) {
        try {
          console.log({ entity, create })

          const method = create ? 'post' : 'put'
          const url = create ? `/partners/${vm.$route.params.id}/kreditornumber` : `/partners/${vm.$route.params.id}/kreditornumber/${entity.kreditornumber_id}`
          const dataForServer = {
            ...entity,
          }

          await vm.$http[method](url, dataForServer)
        } catch (error) {
          throw Error(error?.response?.data?.detail
            ?? vm.$t(String(error.message)?.startsWith('errors~')
              ? vm.$t(error.message)
              : 'errors~unexpected~error~ocurred'))
        }
      },
    },
    /* {
      title: 'ticket',
      primaryKey: 'ticket_id',
      entity: 'frontend_2_5_3_1_tickets',
      create: false,
      update: false,
      delete: false,
      fields: [
        {
          key: 'ticket_id', type: 'list', list: 'ticket', listLabel: 'ticket_name',
        },
        { key: 'ticket_name', hideOnForm: true },
        { key: 'column_id', hideOnForm: true },
        { key: 'board_name', hideOnForm: true },
        { key: 'ticket_deadline', hideOnForm: true },
        { key: 'ticket_progress', hideOnForm: true },
      ],
    },
    {
      title: 'Contradictions',
      primaryKey: 'contradiction_id',
      entity: 'frontend_2_5_3_2',
      create: false,
      update: false,
      delete: false,
      entityView: 'contradiction',
      fields: [
        {
          key: 'contradiction_id', type: 'list', list: 'contradiction', listLabel: 'contradiction_name',
        },
        { key: 'contradiction_name', hideOnForm: true },
        { key: 'contradiction_last_change_time', hideOnForm: true },
        { key: 'contradiction_letter_send_time', hideOnForm: true },
        { key: 'contradiction_ready_to_comm', hideOnForm: true },
        { key: 'contradiction_payment_received', hideOnForm: true },
        { key: 'contradictiontask_count', hideOnForm: true },
        { key: 'contradictionpoint_count', hideOnForm: true },
      ],
    },
    {
      title: 'Reviews Invoices',
      primaryKey: 'invoice_id',
      entity: 'frontend_2_5_3_3',
      create: false,
      update: false,
      delete: false,
      entityView: 'invoice',
      fields: [
        {
          key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_description',
        },
        { key: 'invoice_date', type: 'date', hideOnForm: true },
        { key: 'invoice_contract_year', type: 'number', hideOnForm: true },
        { key: 'Invoice_company_name', hideOnForm: true },
        { key: 'invoice_payment_date', hideOnForm: true },
        { key: 'customergroup_name', hideOnForm: true },
        { key: 'partnercompany_name', hideOnForm: true },
      ],
    },
    {
      title: 'Contact Persons',
      primaryKey: 'contactperson_id',
      entity: 'frontend_2_5_3_5',
      update: false,
      entityView: 'contactperson',
      fields: [
        {
          key: 'contactperson_id',
          type: 'list',
          list: 'contactperson',
          listLabel: 'contactperson_lastname',
          alwaysNew: true,
          onlyForm: true,
        },
        { key: 'contactperson_lastname', hideOnForm: true },
        { key: 'contactperson_firstname', hideOnForm: true },
        { key: 'city_name', hideOnForm: true },
        { key: 'contactdetails_email', hideOnForm: true },
        { key: 'contactdetails_phone', hideOnForm: true },
        { key: 'contactdetails_Mobile', hideOnForm: true },
        { key: 'contactperson_department', hideOnForm: true },
      ],
    },
    {
      title: 'Locations',
      primaryKey: 'location_id',
      entity: 'frontend_2_5_3_7',
      entityForm: 'location_partnercompany_partnertype_rel',
      entityView: 'location',
      fields: [
        {
          key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
        },
        { key: 'location_name', hideOnForm: true },
        { key: 'partnercompany_name', hideOnForm: true },
        { key: 'partnertype_name', hideOnForm: true },
        { key: 'locationtype_name', hideOnForm: true },
        { key: 'city_name', hideOnForm: true },
        { key: 'country_name', hideOnForm: true },
        { key: 'area_count', hideOnForm: true },
        {
          key: 'partnertype_id',
          hideOnIndex: true,
          type: 'list',
          composite: true,
          list: 'partnertype',
          listLabel: 'partnertype_name',
          disableOnUpdate: true,
        },
        {
          key: 'location_partnercompany_partnertype_valid_from_date',
          type: 'date',
          composite: true,
          disableOnUpdate: true,
        },
        { key: 'location_partnercompany_partnertype_valid_to_date', type: 'date' },
      ],
    },
    {
      title: 'Users',
      primaryKey: 'user_id',
      entity: 'frontend_2_5_3_8',
      entityForm: 'user_partnercompany_rel',
      entityView: 'user',
      fields: [
        {
          key: 'user_id', type: 'list', list: 'user', listLabel: 'user_lastname',
        },
        { key: 'user_lastname', hideOnForm: true },
        { key: 'user_firstname', hideOnForm: true },
        { key: 'user_email', hideOnForm: true },
        { key: 'user_last_login_time', hideOnForm: true },
        { key: 'user_locked', hideOnForm: true },
        {
          key: 'user_partnercompany_valid_from',
          sortable: true,
          type: 'date',
          composite: true,
          disableOnUpdate: true,
        },
        {
          key: 'user_partnercompany_valid_to',
          sortable: true,
          type: 'date',
          rules: { date_after: ['@user_partnercompany_valid_from'] },
        },
      ],
    }, */
  ],
  note: 'frontend_0_8_4',
  async submit(vm, entity, create) {
    try {

      const fieldsComponent = vm.getFieldComponents()
      const addressField = fieldsComponent.find(f => f.field.key === 'address_id')
      const companydetails = fieldsComponent.find(f => f.field.key === 'companydetails_id')
      /* if (!taxRegex.exec(companydetails?.subEntity.companydetails_salestaxno)) {
        throw Error('errors~invalid~salestaxno')
      }
      if (!comercialRegistryNoRegex.exec(companydetails?.subEntity.companydetails_commercialregisterno)) {
        throw Error('errors~invalid~commercialregisterno')
      }
      if (!websiteRegex.exec(companydetails?.subEntity.companydetails_website)) {
        throw Error('errors~invalid~website')
      }

      const contactdetails = fieldsComponent.find(f => f.field.key === 'contactdetails_id')
      const cityField = addressField?.getSubFields().find(f => f.field.key === 'city_id')

      const { state, ...cityObj } = cityField?.subEntity || {} */
      const method = create ? 'post' : 'put'

      const dataForServer = {
        ...entity,
        /* contactdetail: contactdetails?.subEntity,
        companydetail: companydetails?.subEntity,
        address: {
          ...(addressField?.subEntity || {}),
          city: {
            ...cityObj,
            city_state: state,
          },
        }, */
      }

      dataForServer.partnergroup = {
        partnergroup_id: dataForServer.partnergroup_id,
      }
      delete dataForServer.partnergroup_id
      delete dataForServer.partnergroup_is_internal

      await vm.$http[method]('/partners/new', dataForServer)
    } catch (error) {
      throw Error(error?.response?.data?.detail
        ?? vm.$t(String(error.message)?.startsWith('errors~')
          ? vm.$t(error.message)
          : 'errors~unexpected~error~ocurred'))
    }
  },
}

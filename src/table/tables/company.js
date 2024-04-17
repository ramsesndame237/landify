import { getUserData } from '@/auth/utils'
import { ACCESS } from '@/config/config-access'

export default {
  entityEndpoint: '/companies',
  primaryKey: 'company_id',
  permissions: ACCESS.tableAccess.company.main,
  // createModal: 'otherPage',
  formComponent: () => import('@/views/app/CreateComponent/CompanyForm.vue'),
  /**
   * Cette fonction permettra d'effectuer un filtre sur l'entité de manière globale
   * @param item L'élément sur lequel on effectue le teste
   * @param vm L'instance de vue
   */
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
  perPage: 100000, // Si cette entité à un nombre d'éléments fixe par page différent de celui par default (10)
  fields: [
    { key: 'company_id', auto: true },
    {
      key: 'customergroup_id',
      hideOnIndex: true,
      type: 'list',
      list: 'customergroup',
      listLabel: 'customergroup_name',
      // withPopup: true,
      cols: 12,
      relationEntity: 'customergroup_company_rel',
    },
    { key: 'company_name', cols: 5 },
    { key: 'company_shortname', cols: 4 },
    // BuchungsKreis
    {key: 'company_buchungskreis', cols: 3, required: false},
    // { key: 'customergroup_name', sortable: true, hideOnForm: true },
    // {
    //   key: 'address_id',
    //   type: 'list',
    //   category: 'adress',
    //   list: 'address',
    //   listLabel: 'address_street',
    //   withNew: true,
    //   alwaysNew: true,
    //   onlyForm: true,
    //   hideOnIndex: true,
    // },
    // {
    //   key: 'contactdetails_id',
    //   type: 'list',
    //   list: 'contactdetails',
    //   listLabel: 'contactdetails_email',
    //   withNew: true,
    //   alwaysNew: true,
    //   hideOnIndex: true,
    //   onlyForm: true,
    //   category: 'contact',
    // },
    // {
    //   key: 'companydetails_id',
    //   type: 'list',
    //   list: 'companydetails',
    //   listLabel: 'companydetails_salestaxno',
    //   withNew: true,
    //   alwaysNew: true,
    //   hideOnIndex: true,
    //   cols: 12,
    //   onlyForm: true,
    //   category: 'price',
    // },
    // {
    //   key: 'create_contactperson',
    //   type: 'boolean',
    //   category: 'contact',
    //   hideOnUpdate: true,
    //   hideOnIndex: true,
    //   change: (entity, vm) => {
    //     console.log('entity', entity)
    //     if (entity.create_contactperson === 1) {
    //       console.log('ici vm', vm)
    //       const companyAddressField = vm.$parent.$children[3]
    //       const companyCityField = companyAddressField.getSubFields()[3]

    //       const contactPersonAddressField = vm.$parent.$children[7].$children[0].$children[7]
    //       const contactPersonCityField = contactPersonAddressField.getSubFields()[3]

    //       Object.keys(companyAddressField.subEntity).forEach(key => {
    //         contactPersonAddressField.$set(contactPersonAddressField.subEntity, key, companyAddressField.subEntity[key])
    //       })

    //       Object.keys(companyCityField.subEntity).forEach(key => {
    //         contactPersonCityField.$set(contactPersonCityField.subEntity, key, companyCityField.subEntity[key])
    //       })
    //     }
    //   },
    //   hideOnForm: true,
    // },
    // // {
    // //   key: 'contactperson_id',
    // //   type: 'list',
    // //   list: 'contactperson',
    // //   listLabel: 'contactperson_name',
    // //   withNew: true,
    // //   alwaysNew: true,
    // //   hideOnIndex: true,
    // //   onlyForm: true,
    // //   visible: entity => entity.create_contactperson === 1,
    // // },

    // { key: 'city_name', sortable: true, hideOnForm: true },
    // { key: 'contactdetails_phone', sortable: true, hideOnForm: true },
    // { key: 'contactdetails_email', sortable: true, hideOnForm: true },
    // {
    //   key: 'contactpersons_count', sortable: true, hideOnForm: true,
    // },
  ],
  default: {
    company_template_coverletter_subject: 'Un Template de teste',
  },
  filter_vertical: true,
  filters: [
    {
      key: 'customergroup_id',
      type: 'list',
      required: true,
      list: 'customergroup',
      listLabel: 'customergroup_name',
    },
  ],
  relations: [
    {
      title: 'ticket',
      primaryKey: 'ticket_id',
      entity: 'frontend_2_1_3_1_read_ticket',
      permissions: ACCESS.tableAccess.company.relations.tickets,
      newRoute: { name: 'table-form', params: { table: 'ticket' } },
      fields: [
        {
          key: 'ticket_id', type: 'list', list: 'ticket', listLabel: 'ticket_name',
        },
        { key: 'ticket_name', hideOnForm: true },
        { key: 'board_name', hideOnForm: true },
        { key: 'ticket_deadline', hideOnForm: true },
        { key: 'ticket_progress', hideOnForm: true },
      ],
    },
    {
      title: 'contradiction',
      primaryKey: 'contradiction_id',
      entity: 'frontend_2_1_3_2',
      permissions: ACCESS.tableAccess.company.relations.contradiction,
      create: false,
      update: false,
      // delete: false,
      fields: [
        {
          key: 'contradiction_id', type: 'list', list: 'contradiction', listLabel: 'contradiction_name',
        },
        { key: 'contradiction_name', hideOnForm: true },
        { key: 'contradiction_last_change_time', type: 'date', hideOnForm: true },
        { key: 'contradiction_letter_send_time', type: 'date', hideOnForm: true },
        { key: 'contradiction_ready_to_comm', hideOnForm: true },
        { key: 'contradiction_payment_received', hideOnForm: true },
        { key: 'contradictiontask_count', type: 'number', hideOnForm: true },
        { key: 'contradictionpoint_count', type: 'number', hideOnForm: true },
      ],
    },
    {
      title: 'Reviews Invoices',
      primaryKey: 'invoice_id',
      entity: 'frontend_2_1_3_3',
      permissions: ACCESS.tableAccess.company.relations.review_invoices,
      create: false,
      delete: false,
      entityView: 'invoice',
      update: false,
      fields: [
        {
          key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_name',
        },
        { key: 'invoice_date', type: 'date', hideOnForm: true },
        { key: 'invoice_contract_year', type: 'number', hideOnForm: true },
        { key: 'invoice_allocation_area', hideOnForm: true },
        { key: 'invoice_payment_date', type: 'date', hideOnForm: true },
        { key: 'customergroup_name', hideOnForm: true },
        {
          key: 'customergroup_id',
          type: 'list',
          list: 'customergroup',
          listLabel: 'customergroup_name',
          hideOnIndex: true,
        },
      ],
    },
    {
      title: 'Sales Order SFM',
      primaryKey: 'product_id',
      entity: 'frontend_2_1_3_4',
      entityForm: 'company_product_rel',
      permissions: ACCESS.tableAccess.company.relations.sales_order,
      view: false,
      fields: [
        {
          key: 'product_id', type: 'list', list: 'product', listLabel: 'product_name',
        },
        { key: 'product_short' },
        { key: 'product_name' },
        { key: 'salesorder_valid_from_date', type: 'date', composite: true },
        { key: 'salesorder_valid_to_date', type: 'date' },
        { key: 'product_active_from_date', type: 'date', required: false },
        { key: 'product_active_to_date', type: 'date', required: false },
        { key: 'salesorder_confirmation_date', type: 'date' },
      ],
    },
    {
      title: 'Contact Persons',
      primaryKey: 'contactperson_id',
      entity: 'frontend_2_1_3_5',
      entityForm: 'contactperson_company_rel',
      entityView: 'contactperson',
      permissions: ACCESS.tableAccess.company.relations.contact_person,
      update: false,
      importQueryParams: vm => ({
        from_detail: true,
        primary_key: 'company_id',
        primary_key_value: vm.$route.params.id,
        entity: 'contactperson',
      }),
      importEntityName: 'contactperson',
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
        { key: 'contactdetails_mobile', hideOnForm: true },
        { key: 'contactperson_department', hideOnForm: true },
      ],
    },
    {
      title: 'Appointment Track',
      permissions: ACCESS.tableAccess.company.relations.appointment_track,
      create: false,
      delete: false,
      update: false,
    },
    {
      title: 'Point of Sales',
      entity: 'frontend_2_1_3_8',
      primaryKey: 'pos_id',
      entityForm: 'company_pos_rel',
      entityView: 'pos',
      permissions: ACCESS.tableAccess.company.relations.pos,
      update: false,
      fields: [
        {
          key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
        },
        { key: 'pos_name', hideOnForm: true },
        { key: 'pos_branchnumber', hideOnForm: true },
        { key: 'pos_name_external', hideOnForm: true },
        { key: 'location_count', hideOnForm: true },
        { key: 'area_count', hideOnForm: true },
        { key: 'pos_first_year', hideOnForm: true },
      ],
    },
    {
      title: 'Payments',
      primaryKey: 'payment_id',
      entity: 'frontend_2_1_3_9',
      entityForm: 'company_payment_rel',
      entityView: 'payment',
      permissions: ACCESS.tableAccess.company.relations.payments,
      fields: [
        {
          key: 'payment_id', type: 'list', list: 'payment', alwaysNew: true, onlyForm: true, without: 'company_id',
        },
        { key: 'payment_info', hideOnForm: true },
        { key: 'payment_debitor', hideOnForm: true },
        { key: 'payment_value', type: 'number', hideOnForm: true },
        { key: 'payment_objectreference', hideOnForm: true },
        { key: 'payment_date', type: 'date', hideOnForm: true },
        { key: 'payment_type', hideOnForm: true },
      ],
    },
    {
      title: 'Users',
      primaryKey: 'user_id',
      entity: 'frontend_2_1_3_10',
      entityForm: 'user_company_rel',
      entityView: 'user',
      permissions: ACCESS.tableAccess.company.relations.users,
      fields: [
        {
          key: 'user_id', type: 'list', list: 'user', listLabel: 'user_firstname',
        },
        { key: 'user_lastname', hideOnForm: true },
        { key: 'user_firstname', hideOnForm: true },
        { key: 'usertype_name', hideOnForm: true },
        { key: 'team_name', hideOnForm: true },
        { key: 'user_last_login_time', hideOnForm: true },
        {
          key: 'user_company_valid_from', sortable: true, type: 'date', composite: true, disableOnUpdate: true,
        },
        {
          key: 'user_company_valid_to',
          sortable: true,
          type: 'date',
          rules: { date_after: ['@user_company_valid_from'] },
        },
      ],
    },
    {
      title: 'Tax rate',
      primaryKey: 'user_id',
      entity: 'tax_rates',
      permissions: ACCESS.tableAccess.company.relations.tax_rates,
      entityEndpoint: vm => `/companies/${vm.$route.params.id}/tax-rates`,
      importQueryParams: vm => ({
        from_detail: true,
        primary_key: 'company_id',
        primary_key_value: vm.$route.params.id,
      }),
      view: false,
      update: true,
      customRequest: {
        method: 'delete',
        endpoint: () => `/companies/${window.$vue.$route.params.id}/tax-rates`,
        payload: entities => {
          return entities.map(e => e.id)
        },
      },
      submit: async (vm, entity, create) => {
        const method = create ? 'post' : 'put'
        const url = create ? `/companies/${vm.$route.params.id}/tax-rates` : `/companies/${vm.$route.params.id}/tax-rates/${entity.id}`

        const dataForServer = {
          ...entity,
        }

        await vm.$http[method](url, dataForServer)
      },
      fields: [
        { key: 'id', listLabel: 'ID', type: 'list', hideOnForm: true },
        { key: 'code', hideOnForm: false, type: 'string' },
        { key: 'value', hideOnForm: false, type: 'number' },
      ],
    },
  ],
  note: 'frontend_0_8_11',
  async submit(vm, entity) {
    // const fieldsComponent = vm.getFieldComponents()
    // const addressField = fieldsComponent.find(f => f.field.key === 'address_id')
    // const companydetails = fieldsComponent.find(f => f.field.key === 'companydetails_id')
    // const contactdetails = fieldsComponent.find(f => f.field.key === 'contactdetails_id')
    // const cityField = addressField.getSubFields().find(f => f.field.key === 'city_id')

    const dataForServer = {
      ...entity,
      // contactdetail: contactdetails.subEntity,
      // companydetail: companydetails.subEntity,
      // address: {
      //   ...addressField.subEntity,
      //   city: cityField.subEntity,
      // },
    }
    let response

    try {
      const isUpdate = window.location.href?.split('?')[1]?.split('edit=')[1]?.split('&')[0] === 'true'
      console.log({ hello: new URLSearchParams().entries() })
      response = await vm.$http[isUpdate ? 'put' : 'post']('/companies/', dataForServer)

      console.log('Response from company creation', { response })
    } catch (err) {
      vm.$errorToast('Error while saving the company')
      throw err
    }

    return response
  },
}

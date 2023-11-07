import { updateInvoiceFlatRate, updateInvoiceApportionable } from '@/table/utils'

export default {
  entity: 'frontend_4_1_1',
  createModal: 'otherPage',
  entityEndpoint: '/invoices',
  formComponent: () => import('@/views/app/FormComponent/InvoiceForm.vue'),
  fields: [
    { key: 'invoice_id', auto: true },
    {
      key: 'ticket_id', type: 'list', list: 'ticket', relationEntity: 'ticket_invoice_rel', hideOnIndex: true,
    },
    { key: 'invoice_date', type: 'date' },
    { key: 'invoice_date_of_order', type: 'date', hideOnIndex: true },
    { key: 'invoice_contract_year', disabled: true, type: 'number' },
    { key: 'invoice_company_name' },
    { key: 'invoice_allocationarea', type: 'number' },
    { key: 'invoice_payment_date', type: 'date' },
    { key: 'company_name', hideOnForm: true },
    { key: 'location_name', hideOnForm: true },
    { key: 'manager_name', hideOnForm: true },
    { key: 'owner_name', hideOnForm: true },
    {
      key: 'contract_id',
      type: 'list',
      list: 'contract',
      entity: 'invoice_contract_rel',
      with: ['invoice_contract_year'],
    },
    {
      key: 'area_id',
      list: 'area',
      type: 'list',
      entity: 'invoice_area_rel',
      multiple: true,
    },
    {
      key: 'partnertype_id', type: 'list', list: 'partnertype', listLabel: 'partnertype_name', hideOnIndex: true,
    },
    { key: 'invoice_description', type: 'textarea', hideOnIndex: true },
    { key: 'invoice_number' },
    { key: 'invoice_billing_period_from_date', type: 'date', hideOnIndex: true },
    {
      key: 'invoice_billing_period_to_date',
      type: 'date',
      rules: { date_after: ['@invoice_billing_period_from_date'] },
      hideOnIndex: true,
    },
  ],
  filters: [
    {
      key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
    },
    {
      key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name',
    },
    {
      key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
    },
    {
      key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
    },
    {
      key: 'area_id', type: 'list', list: 'area', listLabel: 'area_name',
    },
    {
      key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name',
    },
    { key: 'invoice_contract_year', type: 'number' },
    {
      key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_name',
    },
  ],
  actions: [
    {
      text: 'Start contradiction',
      loading: false,
      async onClick(invoices, vm) {
        console.log(invoices)
        try {
          // this.loading = true
          await vm.$http.post('/contradiction_generators/start', {
            invoice_ids: Array.isArray(invoices) ? invoices.map(i => i.invoice_id) : [invoices.invoice_id],
          })
          vm.$successToast('Contradictions generated')
        } catch (e) {
          console.error(e)
          vm.$errorToast('Generator Error')
        } finally {
          // this.loading = false
        }
      },
    },
  ],
  relations: [
    // {
    //   title: 'headline~invoice~tab~contract_document',
    //   entity: 'frontend_4_2_1_bottom',
    //   entityForm: 'document',
    //   primaryKey: 'document_id',
    //   create: false,
    //   delete: false,
    //   fields: [
    //     {
    //       key: 'invoice_id',
    //       type: 'list',
    //       relationEntity: 'document_invoice_rel',
    //       hideOnForm: true,
    //       hideOnIndex: true,
    //     },
    //     { key: 'document_name' },
    //     { key: 'document_content' },
    //     { key: 'document_entry_time', hideOnForm: true },
    //   ],
    //   default: {
    //     document_mime_type: 'png',
    //   },
    // },
    {
      tool: () => import('@/views/app/InvoicePositionTools.vue'),
      lazy: false,
      // title: 'Invoice Positions',
      entity: 'frontend_4_2_5',
      entityForm: 'invoice_invoiceposition_rel',
      primaryKey: 'invoiceposition_id',
      view: false,
      fields: [
        {
          key: 'invoiceposition_id', type: 'list', list: 'invoiceposition', alwaysNew: true, onlyForm: true,
        },
        { key: 'invoiceposition_name', hideOnForm: true },
        { key: 'invoiceposition_total_units', hideOnForm: true },
        { key: 'invoiceposition_units_customer', hideOnForm: true },
        { key: 'externalcosttype_name', hideOnForm: true },
        { key: 'costtype_name', hideOnForm: true },
        {
          key: 'invoiceposition_flat_rate',
          type: 'boolean',
          editable: true,
          onChange: updateInvoiceFlatRate,
          hideOnForm: true,
        },
        { key: 'invoiceposition_amount_total', hideOnForm: true },
        { key: 'invoiceposition_amount_customer', hideOnForm: true },
        {
          key: 'invoiceposition_apportionable',
          type: 'boolean',
          editable: true,
          onChange: updateInvoiceApportionable,
          hideOnForm: true,
        },
      ],
    },
    {
      title: 'headline~invoice~tab~invoice_document',
      entityForm: 'document_invoice_rel',
      primaryKey: 'document_id',
      fields: [
        {
          key: 'invoice_id',
          type: 'list',
          relationEntity: 'document_invoice_rel',
          hideOnForm: true,
          hideOnIndex: true,
        },
        { key: 'document_name' },
        { key: 'document_content' },
        { key: 'document_entry_time', hideOnForm: true },
      ],
      default: {
        document_mime_type: 'png',
      },
    },
    {
      entity: 'frontend_4_2_2',
      lazy: false,
      entityForm: 'invoice_invoicevaluetype_rel',
      primaryKey: 'invoicevaluetype_id',
      view: false,
      fields: [
        {
          key: 'invoicevaluetype_id',
          type: 'list',
          list: 'invoicevaluetype',
          listLabel: 'invoicevaluetype_name',
        },
        // { key: 'invoice_name' },
        { key: 'invoicevaluetype_name', hideOnForm: true },
        { key: 'invoicevaluetype_description', hideOnForm: true },
        { key: 'invoice_invoicevaluetype_value' },
        { key: 'unit_name', hideOnForm: true },
      ],
    },
    {
      // title: 'Invoice Criteria',
      entity: 'frontend_4_2_3',
      entityForm: 'invoice_invoicecriteria_rel',
      primaryKey: 'invoicecriteria_id',
      view: false,
      fields: [
        {
          key: 'invoicecriteria_id',
          type: 'list',
          list: 'invoicecriteria',
          listLabel: 'invoicecriteria_name',
        },
        { key: 'invoicecriteria_name', hideOnForm: true },
        { key: 'invoicecriteria_description', hideOnForm: true },
        { key: 'invoice_invoicecriteria_is_set', type: 'boolean' },
      ],
    },
    {
      // title: 'Invoice Deadlines',
      entity: 'frontend_4_2_4',
      entityForm: 'invoice_invoicedeadline_rel',
      primaryKey: 'invoicedeadline_id',
      view: false,
      fields: [
        {
          key: 'invoicedeadline_id',
          type: 'list',
          list: 'invoicedeadline',
          listLabel: 'invoicedeadline_name',
        },
        { key: 'invoicedeadline_name', hideOnForm: true },
        { key: 'invoicedeadline_description', hideOnForm: true },
        { key: 'invoice_invoicedeadline_date', type: 'date' },
      ],
    },

    {
      // title: 'Service Objects',
      entity: 'frontend_4_2_6',
      primaryKey: 'serviceobject_id',
      entityView: 'serviceobject',
      fields: [
        {
          key: 'serviceobject_id',
          type: 'list',
          list: 'serviceobject',
          listLabel: 'serviceobject_name',
          // alwaysNew: true,
          // onlyForm: true,
        },
        { key: 'serviceobject_name', hideOnForm: true },
        { key: 'serviceobjecttype_name', hideOnForm: true },
      ],
    },
  ],
  fetch(vm) {
    return vm.$http.get(`/invoices/${vm.entityId}`)
      .then(response => response.data)
  },
  note: 'frontend_0_8_6',
}

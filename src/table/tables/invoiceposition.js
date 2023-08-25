import { updateInvoiceApportionable, updateInvoiceFlatRate } from '@/table/utils'

export default {
  fieldComponent: () => import('@/views/app/CreateComponent/InvoicePositionForm.vue'),
  create: false,
  entity: 'frontend_4_5_1',
  fields: [
    { key: 'invoiceposition_id', auto: true },
    {
      key: 'externalcosttype_id',
      type: 'list',
      list: 'externalcosttype',
      listLabel: 'externalcosttype_name',
      hideOnIndex: true,
    },
    {
      key: 'costtype_id',
      type: 'list',
      list: 'frontend_4_7_3_1',
      filter_key: 'externalcosttype_id',
      relationEntity: 'invoiceposition_costtype_rel',
      listLabel: 'costtype_name',
      hideOnIndex: true,
    },
    { key: 'invoiceposition_name' },
    {
      key: 'unit_id', type: 'list', list: 'unit', listLabel: 'unit_name', hideOnIndex: true,
    },
    { key: 'invoiceposition_total_units', type: 'number' },
    { key: 'invoiceposition_units_customer', type: 'number', rules: { lower: ['@invoiceposition_total_units'] } },
    { key: 'costtype_name', hideOnForm: true },
    {
      key: 'invoiceposition_flat_rate',
      type: 'boolean',
      editable: true,
      onChange: updateInvoiceFlatRate,
    },
    { key: 'invoiceposition_amount_total', type: 'number' },
    {
      key: 'invoiceposition_amount_customer', type: 'number',
      // rules: { lower: ['@invoiceposition_amount_total'] }
    },
    {
      key: 'invoiceposition_apportionable',
      type: 'boolean',
      editable: true,
      onChange: updateInvoiceApportionable,
    },
  ],
  filters: [
    {
      key: 'customergroup_id',
      required: false,
      type: 'list',
      list: 'customergroup',
      listLabel: 'customergroup_name',
      send: false,
    },
    {
      key: 'company_id',
      required: false,
      type: 'list',
      list: 'frontend_2_2_3_1',
      listLabel: 'company_name',
      filter_key: 'customergroup_id',
    },
    {
      key: 'pos_id',
      required: false,
      type: 'list',
      list: 'frontend_2_1_3_8',
      listLabel: 'pos_name',
      filter_key: 'company_id',
    },
    {
      key: 'contract_id',
      required: false,
      type: 'list',
      list: 'frontend_4_2_1_contract_selector',
      listLabel: 'contract_name',
      filter_key: 'pos_id',
    },
    { key: 'billing_year', required: false, type: 'number' },
    {
      key: 'invoice_id', required: false, type: 'list', list: 'invoice', listLabel: 'invoice_name',
    },
  ],
}

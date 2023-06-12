export default {
  entity: 'frontend_2_4_1',
  fields: [
    { key: 'payment_id', auto: true },
    {
      key: 'company_id',
      type: 'list',
      list: 'company',
      listLabel: 'company_name',
      relationEntity: 'company_payment_rel',
    },
    { key: 'company_name', hideOnForm: true },
    { key: 'payment_info' },
    { key: 'payment_debitor' },
    { key: 'payment_objectreference' },
    { key: 'payment_value' },
    { key: 'payment_date', type: 'date' },
    { key: 'payment_type' },
  ],
}

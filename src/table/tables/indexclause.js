export default {
  entity: 'frontend_3_7_1',
  fields: [
    { key: 'indexclause_id', auto: true },
    { key: 'indexclause_name' },
    { key: 'indexclause_adjustment_rule' },
    { key: 'indexclause_adjustment_description', type: 'textarea', required: false },
    { key: 'indexclause_baseyear', type: 'number' },
    { key: 'indexclause_begin_date', type: 'date' },
    { key: 'indexclause_indextransmission_percent' },
    { key: 'indexclause_change_in_percent', type: 'boolean', send: false },
    {
      key: 'indexclause_minimal_percent_change_agreed',
      type: 'decimal',
      required: false,
      visible: entity => entity.indexclause_change_in_percent,
    },
    {
      key: 'indexclause_minimal_point_change_agreed',
      type: 'decimal',
      visible: entity => !entity.indexclause_change_in_percent,
      required_if_null: 'indexclause_minimal_percent_change_agreed',
    },
  ],
  relations: [
    {
      title: 'Recurring Payments',
      primaryKey: 'recurringpayment_id',
      entity: 'frontend_3_7_3',
      entityForm: 'recurringpayment_indexclause_rel',
      fields: [
        {
          key: 'recurringpayment_id', type: 'list', list: 'recurringpayment', listLabel: 'recurringpayment_name',
        },
        { key: 'contract_id', hideOnForm: true },
        { key: 'contract_name', hideOnForm: true },
        { key: 'recurringpayment_condition_comment', hideOnForm: true },
        { key: 'indexclause_baseyear', hideOnForm: true },
        { key: 'recurringpaymenttype_name', hideOnForm: true },
        { key: 'maturitytype_name', hideOnForm: true },
        { key: 'recurringpayment_begin_date', hideOnForm: true },
        { key: 'recurringpayment_percentage', hideOnForm: true },
        { key: 'recurringpayment_sum_per_month', hideOnForm: true },
      ],
    },
  ],
}

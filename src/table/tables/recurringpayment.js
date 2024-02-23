function visibleByRecurringPaymentType(indexes) {
  return (entity, vm) => {
    const list = vm.$store.state.table.listCache.recurringpaymenttype
    if (!list) return false
    const selected = list.find(i => i.recurringpaymenttype_id === entity.recurringpaymenttype_id)
    return selected ? indexes.indexOf(parseInt(entity.recurringpaymenttype_id)) >= 0 : false
  }
}
export default {
  entity: 'frontend_3_9_1',
  formComponent: () => import('@/views/app/FormComponent/RecurringPaymentContractForm.vue'),
  submit: async (vm, entity, create) => {
    console.log({ entity })
    const payload = {
      contract_id: 0,
      recurringpayments: [
        {
          recurringpaymenttype_id: 0,
          recurringpayment_id: 0,
          recurringpayment_name: 'string',
          recurringpayment_sum_per_month: 0,
          recurringpayment_condition_percentage: 0,
          recurringpayment_percentage: 0,
          recurringpayment_begin_date: '2024-02-23',
          recurringpayment_end_date: '2024-02-23',
          recurringpayment_description: 'string',
          recurringpayment_condition_comment: '',
          maturitytype_id: 0,
          recurringpayment_maturity_date: '2024-02-23',
          recurringpayment_maturity_daily_range: 0,
          recurringpayment_maturity_monthly_range: 0,
          recurringpayment_value_deposit: 0,
          indexclause_id: 0,
        },
      ],
    }
  },
  fields: [
    { key: 'recurringpayment_id', auto: true },
    { key: 'recurringpayment_name' },
    { key: 'contract_name', hideOnForm: true },
    {
      key: 'contract_id',
      type: 'list',
      list: 'contract',
      listLabel: 'contract_name',
      hideOnIndex: true,
      relationEntity: 'contract_recurringpayment_rel',
      entityKey: 'contract_id',
    },
    {
      key: 'partnercompany_id',
      type: 'list',
      list: 'frontend_3_4_3_11',
      listLabel: 'partnercompany_name',
      tableKey: 'partnercompany_id',
      filter_key: 'contract_id',
      required: false,
    },
    {
      key: 'bankdata_id',
      entityKey: 'partnercompany_bankdata_id',
      type: 'list',
      list: 'company',
      useWholeResponse: true,
      entityCustomEndPoint: vm => `/partners/${vm.entity.partnercompany_id}/bankdata`,
      listLabel: 'iban_id',
      filter_key: 'partnercompany_id',
      filter: () => true,
      hideOnIndex: true,
      noCache: true,
    },
    {
      key: 'id',
      entityKey: 'tax_rate_id',
      label: 'Tax rate',
      type: 'list',
      list: 'tax_rate',
      useWholeResponse: true,
      entityCustomEndPoint: '/contracts/tax-rates',
      listLabel: 'code',
      filter_key: 'contract_id',
      filter: () => true,
      hideOnIndex: true,
      noCache: true,
    },
    {
      key: 'recurringpaymenttype_id',
      type: 'list',
      list: 'recurringpaymenttype',
      listLabel: 'recurringpaymenttype_name',
      orderByField: 'recurringpaymenttype_name',
      hideOnIndex: true,
    },
    { key: 'recurringpaymenttype_name', hideOnForm: true },
    {
      key: 'recurringpayment_sum_per_month',
      hideOnIndex: true,
      visible: visibleByRecurringPaymentType([1, 3, 6, 7, 8, 9, 10]),
    },
    {
      key: 'recurringpayment_condition_percentage',
      hideOnIndex: true,
      visible: visibleByRecurringPaymentType([]),
    },
    {
      key: 'recurringpayment_percentage',
      hideOnIndex: true,
      visible: visibleByRecurringPaymentType([2, 4, 5]),
    },
    { key: 'recurringpayment_begin_date', type: 'date', hideOnIndex: true },
    { key: 'recurringpayment_end_date', type: 'date', hideOnIndex: true },
    {
      key: 'recurringpayment_condition_comment', hideOnIndex: true, type: 'textarea', required: false,
    },
    {
      key: 'maturitytype_id',
      type: 'list',
      list: 'maturitytype',
      listLabel: 'maturitytype_name',
      hideOnIndex: true,
    },
    {
      key: 'recurringpayment_maturity_date',
      type: 'date',
      hideOnIndex: true,
      visible: entity => entity.maturitytype_id === 1,
    },
    {
      key: 'recurringpayment_maturity_daily_range',
      hideOnIndex: true,
      visible: entity => entity.maturitytype_id === 2,
    },
    {
      key: 'recurringpayment_maturity_monthly_range',
      hideOnIndex: true,
      visible: entity => entity.maturitytype_id === 2,
    },
    { key: 'recurringpayment_value_deposit', type: 'boolean', required: false },
    {
      key: 'indexclause_id',
      type: 'list',
      list: 'indexclause',
      listLabel: 'indexclause_name',
      hideOnIndex: true,
      withNew: true,
      rules: { required: false },
      visible: entity => entity.recurringpayment_value_deposit === 1,
      // hideOnUpdate: true,
    },
    { key: 'maturitytype_name', hideOnForm: true },
    { key: 'indexclause_name', hideOnForm: true },
  ],
  relations: [
    {
      title: 'Index Clause',
      entity: 'frontend_3_9_3',
      entityForm: 'recurringpayment_indexclause_rel',
      primaryKey: 'indexclause_id',
      entityView: 'indexclause',
      update: false,
      create: false,
      fields: [
        {
          key: 'indexclause_id', type: 'list', list: 'indexclause', listLabel: 'indexclause_name',
        },
        { key: 'indexclause_name', hideOnForm: true },
        { key: 'indexclause_adjustment_description', hideOnForm: true },
        { key: 'indexclause_adjustment_rule', hideOnForm: true },
        { key: 'indexclause_begin_date', hideOnForm: true },
        { key: 'indexclause_baseyear', hideOnForm: true },
        { key: 'indexclause_indextransmission_percent', hideOnForm: true },
        { key: 'indexclause_minimal_percent_change_agreed', hideOnForm: true },
        { key: 'indexclause_minimal_point_change_agreed', hideOnForm: true },
      ],
    },
  ],
  default: {
    recurringpayment_condition_comment: '',
  },
}

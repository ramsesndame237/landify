function visibleByRecurringPaymentType(indexes) {
  return (entity, vm) => {
    const list = vm.$store.state.table.listCache.recurringpaymenttype
    if (!list) return false
    const selected = list.find(i => i.recurringpaymenttype_id === entity.recurringpaymenttype_id)
    return selected ? indexes.indexOf(parseInt(selected.recurringpaymenttype_name.split('-')[0])) >= 0 : false
  }
}
export default {
  entity: 'frontend_3_9_1',
  fields: [
    {
      key: 'recurringpayment_id',
      auto: true,
    },
    {
      key: 'recurringpayment_name',
    },
    {
      key: 'recurringpayment_object',
      type: 'textarea',
      required: false,
      hideOnIndex: true,
    },
    {
      key: 'recurringpayment_tax',
      type: 'number',
      required: false,
      hideOnIndex: true,
    },
    {
      key: 'zahlanteil',
      type: 'number',
      required: false,
      hideOnIndex: true,
    },
    {
      key: 'contract_name',
      hideOnForm: true,
    },
    {
      key: 'contract_id',
      type: 'list',
      list: 'contract',
      listLabel: 'contract_name',
      hideOnIndex: true,
      relationEntity: 'contract_recurringpayment_rel',
    },
    {
      key: 'recurringpaymenttype_id',
      type: 'list',
      list: 'recurringpaymenttype',
      listLabel: 'recurringpaymenttype_name',
      hideOnIndex: true,
    },
    {
      key: 'recurringpaymenttype_name',
      hideOnForm: true,
    },
    {
      key: 'recurringpayment_sum_per_month',
      hideOnIndex: true,
      visible: visibleByRecurringPaymentType([1, 3, 4, 5, 6, 7]),
    },
    {
      key: 'recurringpayment_condition_percentage',
      hideOnIndex: true,
      visible: visibleByRecurringPaymentType([2, 5]),
    },
    {
      key: 'recurringpayment_percentage',
      hideOnIndex: true,
      visible: visibleByRecurringPaymentType([2]),
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
      key: 'partnercompany_bankdata_id',
      type: 'list',
      list: 'bankdata',
      listLabel: 'partnercompany_bankdata_name',
      required: false,
      multiple: true,
      hideOnIndex: true,
      // visible: entity => entity.team_type === 'extern_client' && entity.team_for_all_customer === 0,
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
    {
      key: 'recurringpayment_penality_date',
      type: 'date',
      hideOnIndex: true,
    },
    { key: 'maturitytype_name', hideOnForm: true },
    { key: 'indexclause_name', hideOnForm: true },
  ],
  // filter_vertical: true,
  // filters: [
  //   {
  //     key: 'customergroup_id',
  //     type: 'list',
  //     list: 'customergroup',
  //     listLabel: 'customergroup_name',
  //     required: false,
  //   },
  //   {
  //     key: 'company_id',
  //     type: 'list',
  //     list: 'company',
  //     listLabel: 'company_name',
  //     filter_key: 'customergroup_id',
  //     required: false,
  //   },
  // ],
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

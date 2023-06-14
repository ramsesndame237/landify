export default {
  fieldComponent: () => import('@/views/app/CreateComponent/ContradictionPoint'),
  fields: [
    { key: 'contradictionpoint_id', auto: true, hideOnForm: true },
    { key: 'contradictionpoint_rank' },
    { key: 'contradictionpoint_title' },
    { key: 'contradictionpoint_maximum_claim_green', type: 'number', required: false },
    { key: 'contradictionpoint_maximum_claim_yellow', type: 'number', required: false },
    { key: 'contradictionpoint_maximum_claim_red', type: 'number', required: false },
    {
      key: 'contradictionpoint_accommodation_standard_green', type: 'number', hideOnIndex: true, required: false,
    },
    {
      key: 'contradictionpoint_accommodation_standard_yellow', type: 'number', hideOnIndex: true, required: false,
    },
    {
      key: 'contradictionpoint_accommodation_standard_red', type: 'number', hideOnIndex: true, required: false,
    },
    {
      key: 'contradictionpoint_additional_accommodation', type: 'number', hideOnIndex: true, required: false,
    },
    {
      key: 'contradictionpoint_owner_offer', type: 'number', hideOnIndex: true, required: false,
    },
    { key: 'contradictionpoint_text', type: 'html', hideOnIndex: true },
    { key: 'contradictionpoint_text_customer', type: 'html', hideOnIndex: true },
    {
      key: 'textmodule_id', type: 'list', list: 'textmodule', listLabel: 'textmodule_name', hideOnIndex: true,
    },
  ],
  default: {
    contradictionpoint_legally_clear: 1,
    contradictionpoint_hidden: 0,
  },
}

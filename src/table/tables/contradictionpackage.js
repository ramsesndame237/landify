export default {
  customPage: () => import('@/views/app/Page/ContradictionPackage.vue'),
  createModal: false,
  fields: [
    { key: 'contradictionpackage_id', auto: true },
    { key: 'contradictionpackage_name' },
    { key: 'contradictionpackage_sum' },
    { key: 'contradictionpackage_description', hideOnIndex: true },
    { key: 'contradiction_count', hideOnForm: true },
  ],
  filters: [
    {
      key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
    },
    {
      key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name',
    },
    {
      key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
    },
    {
      key: 'user_id', type: 'list', list: 'user', listLabel: 'user_firstname',
    },
    {
      key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
    },
    {
      key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
    },
    {
      key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name',
    },
    {
      key: 'savingtype_id', type: 'list', list: 'savingtype', listLabel: 'savingtype_name',
    },
  ],
  note: 'frontend_0_8_9',
}

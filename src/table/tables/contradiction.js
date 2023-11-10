export default {
  customPage: () => import('@/views/app/Page/Contradiction/Index.vue'),
  createModal: 'otherPage',
  formComponent: () => import('@/views/app/FormComponent/ContradictionForm.vue'),
  fields: [
    { key: 'contradiction_id', auto: true },
    { key: 'contradiction_name' },
    { key: 'contradiction_last_change_time', hideOnUpdate: true, hideOnIndex: true },
    { key: 'pos_name', hideOnForm: true },
    { key: 'company_name', hideOnForm: true },
    { key: 'contradiction_creation_time', hideOnForm: true },
    // { key: 'contradictiontask_count', hideOnForm: true },
    // { key: 'contradictionpoint_count', hideOnForm: true },
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
  default: {
    contradiction_ready_to_comm: 0,
    contradiction_sender_abbreviation: 'dfsdf',
    contradiction_signature1: 0,
    contradiction_signature2: 0,
    contradiction_comment_for_customer: 'dsfsdfds',
    contradiction_addendum_necessary: 0,
  },
  note: 'frontend_0_8_8',
}

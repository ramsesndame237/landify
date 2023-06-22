export default {
  create: false,
  fields: [
    { key: 'inspectionresult_id', auto: true },
    { key: 'inspectionresult_value' },
    { key: 'inspectionresult_realised' },
    { key: 'inspectionresult_unique_or_perennial' },
    { key: 'inspectionresult_legally_clear' },
    { key: 'inspectionresult_legally_clear' },
    { key: 'claimtype_name' },
    { key: 'saving_name' },
    { key: 'rating_name' },
    { key: 'resultcategorization_name' },
    { key: 'invoiceposition_count', hideOnForm: true },
  ],
  filters: [
    {
      key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
    },
    {
      key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name',
    },
    {
      key: 'user_id', type: 'list', list: 'user', listLabel: 'user_email',
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
    { key: 'invoice_contract_year', type: 'number' },
    {
      key: 'inspectionresult_realised', type: 'yesno',
    },
    {
      key: 'board_id', type: 'list', list: 'board', listLabel: 'board_name',
    },
    {
      key: 'costtype_id', type: 'list', list: 'costtype', listLabel: 'costtype_name',
    },
    {
      key: 'contradictionpackage_id',
      type: 'list',
      list: 'contradictionpackage',
      listLabel: 'contradictionpackage_name',
    },
    {
      key: 'owner_id',
      type: 'list',
      list: 'partnercompany',
      listLabel: 'partnercompany_name',
      tableKey: 'partnercompany_id',
    },
    {
      key: 'manager_id',
      type: 'list',
      list: 'partnercompany',
      listLabel: 'partnercompany_name',
      tableKey: 'partnercompany_id',
    },
    {
      key: 'inspectionresultimpacttype_id',
      type: 'list',
      list: 'inspectionresultimpacttype',
      listLabel: 'inspectionresultimpacttype_name',
    },
    {
      key: 'inspectionresult_legally_clear', type: 'yesno',
    },
    {
      key: 'savingtype_id',
      type: 'list',
      list: 'savingtype',
      listLabel: 'savingtype_name',
    },
    {
      key: 'ratingtype_id',
      type: 'list',
      list: 'ratingtype',
      listLabel: 'ratingtype_name',
    },
    {
      key: 'claimtype_id',
      type: 'list',
      list: 'claimtype',
      listLabel: 'claimtype_name',
    },
  ],
  note: 'frontend_0_8_7',
}

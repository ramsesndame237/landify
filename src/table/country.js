export default {
  primaryKey: 'country_id',
  entity: 'frontend_2_12_1',
  fields: [
    { key: 'country_id', sortable: true, auto: true },
    { key: 'country_name', sortable: true },
    {
      key: 'currency_id',
      sortable: true,
      type: 'list',
      list: 'currency',
      listLabel: 'currency_name',
      hideOnIndex: true,
    },
    { key: 'currency_name', sortable: true, hideOnForm: true },
    { key: 'country_short', sortable: true },
  ],
}

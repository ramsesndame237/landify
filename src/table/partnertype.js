export default {
  inlineEdit: true,
  primaryKey: 'partnertype_id',
  fields: [
    { key: 'partnertype_id', sortable: true, auto: true },
    { key: 'partnertype_name', sortable: true },
    { key: 'partnertype_description', sortable: true, type: 'textarea' },
  ],
}

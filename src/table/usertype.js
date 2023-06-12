export default {
  fields: [
    { key: 'usertype_id', label: 'Id', auto: true },
    { key: 'usertype_name' },
    {
      key: 'usertype_description',
      type: 'textarea',
    },
    { key: 'usertype_external', type: 'boolean' },
  ],
}

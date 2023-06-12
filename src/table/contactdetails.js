export default {
  primaryKey: 'contactdetails_id',
  fields: [
    {
      key: 'contactdetails_id', sortable: true, auto: true, hiddenOnForm: true,
    },
    { key: 'contactdetails_email', required: false },
    { key: 'contactdetails_phone', required: false },
    { key: 'contactdetails_mobile', required: false },
    { key: 'contactdetails_fax', required: false },
  ],
}

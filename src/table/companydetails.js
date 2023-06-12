export default {
  primaryKey: 'companydetails_id',
  fields: [
    {
      key: 'companydetails_id', sortable: true, auto: true, hiddenOnForm: true,
    },
    { key: 'companydetails_salestaxno', required: false },
    { key: 'companydetails_commercialregisterno', required: false },
    { key: 'companydetails_website', required: false },
  ],
}

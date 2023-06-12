export default {
  fields: [
    { key: 'bankdata_id', auto: true },
    { key: 'bankdata_iban' },
    { key: 'bankdata_bic', required: false },
    { key: 'bankdata_bank_name' },
    { key: 'bankdata_account_number', required: false },
    { key: 'bankdata_vat', required: false },
    { key: 'bankdata_is_active', type: 'boolean' },
  ],
}

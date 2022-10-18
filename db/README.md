# changes

## in table invoice

created 
* invoice_billing_period_from_date
* invoice_billing_period_to_date

## in table invoice_contract_rel

deleted
* invoice_contract_billing_period_from_date
* invoice_contract_billing_period_to_date


```
0 1 686 51779 Alexander@helix9:~/digitalsuxess/kim_pro_frontend/db>grep '^| invoice ' kim_pro_COLUMNS.txt
| invoice                                         | invoice_id                                          |
| invoice                                         | invoice_creation_time                               |
| invoice                                         | invoice_last_change_time                            |
| invoice                                         | invoice_company_name                                |
| invoice                                         | invoice_date_of_order                               |
| invoice                                         | invoice_date                                        |
| invoice                                         | invoice_billing_period_from_date                    |
| invoice                                         | invoice_billing_period_to_date                      |
| invoice                                         | invoice_allocationarea                              |
| invoice                                         | invoice_description                                 |
| invoice                                         | invoice_payment_date                                |
| invoice                                         | invoice_closingdate                                 |
| invoice                                         | invoice_number                                      |
0 1 686 51779 Alexander@helix9:~/digitalsuxess/kim_pro_frontend/db>grep '^| invoice_contract_rel ' kim_pro_COLUMNS.txt
| invoice_contract_rel                            | invoice_id                                          |
| invoice_contract_rel                            | contract_id                                         |
| invoice_contract_rel                            | invoice_contract_year                               |

```

## todo for frontend

```
Alexander@helix9:~/digitalsuxess/kim_pro_frontend>fxg2  invoice_contract_billing_period
db/kim_pro_COLUMNS.txt:| 1__delme__invoice_contract_rel                  | invoice_contract_billing_period_from_date           |
db/kim_pro_COLUMNS.txt:| 1__delme__invoice_contract_rel                  | invoice_contract_billing_period_to_date             |
db/README.md:* invoice_contract_billing_period_from_date
db/README.md:* invoice_contract_billing_period_to_date
src/libs/i18n/locales/de.json:        "invoice_contract_billing_period_from_date": "Rechnung Vertrag Abrechnungszeitraum von Datum",
src/libs/i18n/locales/de.json:        "invoice_contract_billing_period_To_date":"Rechnung Vertrag Abrechnungszeitraum bis Datum",
src/libs/i18n/locales/en.json:        "invoice_contract_billing_period_from_date": "Invoice Contract Billing Period From Date",
src/libs/i18n/locales/en.json:        "invoice_contract_billing_period_To_date": "Invoice Contract Billing Period To Date",
src/libs/i18n/locales/fr.json:        "invoice_contract_billing_period_from_date": "Date de facturation de la période de facturation du contrat",
src/libs/i18n/locales/fr.json:        "invoice_contract_billing_period_To_date":"Facture Contrat Période de facturation à ce jour",
src/table/index.js:          { key: 'invoice_contract_billing_period_from_date', type: 'date' },
src/table/index.js:          { key: 'invoice_contract_billing_period_to_date', type: 'date' },
src/table/index.js:        with: ['invoice_contract_billing_period_from_date', 'invoice_contract_billing_period_to_date', 'invoice_contract_year'],
src/table/index.js:      { key: 'invoice_contract_billing_period_from_date', type: 'date', hideOnIndex: true },
src/table/index.js:        key: 'invoice_contract_billing_period_to_date',
src/table/index.js:        rules: { date_after: ['@invoice_contract_billing_period_from_date'] },
src/views/app/FormComponent/InvoiceForm.vue:              <field ref="fields" :disabled="isDisabledFromName('invoice_contract_billing_period_from_date')"
src/views/app/FormComponent/InvoiceForm.vue:                     :field="getField('invoice_contract_billing_period_from_date')"/>
src/views/app/FormComponent/InvoiceForm.vue:              <field ref="fields" :disabled="isDisabledFromName('invoice_contract_billing_period_to_date')"
src/views/app/FormComponent/InvoiceForm.vue:                     :field="getField('invoice_contract_billing_period_to_date')"/>
src/views/app/FormComponent/InvoiceForm.vue:    'entity.invoice_contract_billing_period_to_date': function () {
src/views/app/FormComponent/InvoiceForm.vue:      this.entity.invoice_contract_year = getYearFormDateString(this.entity.invoice_contract_billing_period_to_date)
src/views/app/FormComponent/InvoiceForm.vue:    this.entity.invoice_contract_year = getYearFormDateString(this.entity.invoice_contract_billing_period_to_date)
Alexander@helix9:~/digitalsuxess/kim_pro_frontend>
```

0 1 686 50322 Alexander@helix9:~/digitalsuxess/kim_pro_frontend>find src | grep vue | xargs pcregrep -ho1 "getField\('(.*)'\)"  | sort -u

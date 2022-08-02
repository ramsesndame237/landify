// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs')
// eslint-disable-next-line import/no-extraneous-dependencies
const XLSX = require('xlsx')
const axios = require('axios')

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://contabo.lx42.de/8001/',
  timeout: 30000,
  headers: { Authorization: 'Bearer johndoe@example.com' },
})

const api = data => axiosIns.post('/api/', { a: data })

const workbook = XLSX.readFile('Attributes.xlsx')

workbook.SheetNames.forEach(async name => {
  if (name === 'Company') {
    const companySheet = workbook.Sheets.Company

    const range = XLSX.utils.decode_range(companySheet['!ref'])
    // get the number of rows entries
    const rowNumber = range.e.r - 4

    for (let i = 1; i <= rowNumber; i++) {
      const rowPos = i + 5

      const companyName = companySheet[`B${rowPos}`]?.v
      const customergroup_name = companySheet[`C${rowPos}`]?.v
      const city_name = companySheet[`D${rowPos}`]?.v
      const address_street = companySheet[`E${rowPos}`]?.v
      const address_house_number = companySheet[`F${rowPos}`]?.v
      const address_extra = companySheet[`G${rowPos}`]?.v
      const contactdetails_email = companySheet[`H${rowPos}`]?.v
      const contactdetails_phone = companySheet[`I${rowPos}`]?.v
      const contactdetails_mobile = companySheet[`J${rowPos}`]?.v
      const contactdetails_fax = companySheet[`K${rowPos}`]?.v
      const companydetails_salestaxno = companySheet[`L${rowPos}`]?.v
      const companydetails_commercialregisterno = companySheet[`M${rowPos}`]?.v
      const companydetails_website = companySheet[`N${rowPos}`]?.v
      const bankdata_iban = companySheet[`O${rowPos}`]?.v
      const bankdata_bic = companySheet[`P${rowPos}`]?.v
      const bankdata_bank_name = companySheet[`Q${rowPos}`]?.v

      // Create company

      const customergroup = await api({
        entity: 'customergroup',
        action: 'read-rich',
        filter: { 'customergroup_name': customergroup_name },
      })

      const city = await api({
        entity: 'city',
        action: 'read-rich',
        filter: { 'city_name': city_name },
      })

      const address = await api({
        entity: 'address',
        action: 'read-rich',
        filter: { 'address_house_number': address_house_number },
      })

      const companydetails = await api({
        entity: 'companydetails',
        action: 'read-rich',
        filter: { 'companydetails_commercialregisterno': companydetails_commercialregisterno },
      })

      const contactdetails = await api({
        entity: 'contactdetails',
        action: 'read-rich',
        filter: { 'contactdetails_email': contactdetails_email },
      })

      const companyEntity = {
        company_name: companyName,
        customergroup_id: customergroup.data.data.data[0].customergroup_id,
        customergroup_name: customergroup_name,
        city_id: city.data.data.data[0].city_id,
        city_name: city_name,
        address_id: address.data.data.data[0].address_id,
        address_street: address_street,
        address_house_number: address_house_number,
        address_extra: address_extra,
        companydetails_id: companydetails.data.data.data[0].companydetails_id,
        companydetails_website: companydetails_website,
        companydetails_salestaxno: companydetails_salestaxno,
        contactdetails_id: contactdetails.data.data.data[0].contactdetails_id,
        contactdetails_mobile: contactdetails_mobile,
        contactdetails_phone: contactdetails_phone,
        contactdetails_fax: contactdetails_fax,
        contactdetails_email: contactdetails_email,
      }

      const companyresponse = await api({
        entity: 'company',
        action: 'create',
        data: [companyEntity]
      })

      const companyId = companyresponse.data.data.data[0][0].company_id

      const companyaddressrelEntity = {
        company_id: companyId,
        address_id: companyEntity.address_id
      }

      const company_companydetails_rel = {
        companydetails_id: companyEntity.companydetails_id,
        company_id: companyId
      }

      const company_contactdetails_rel = {
        company_id: companyId,
        contactdetails_id: companyEntity.contactdetails_id
      }

      const addressrelResponse = await api({
        entity: 'company_address_rel',
        action: 'create',
        data: [companyaddressrelEntity]
      })

      const companydetailsrelResponse = await api({
        entity: 'company_companydetails_rel',
        action: 'create',
        data: [company_companydetails_rel]
      })

      const contactdetailsrelResponse = await api({
        entity: 'company_contactdetails_rel',
        action: 'create',
        data: [company_contactdetails_rel]
      })
    }
  }
})

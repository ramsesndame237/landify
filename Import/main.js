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

const api = data => {
  console.log("api call", data)
  return axiosIns.post('/api/', { a: data })
    .then(response => {
      console.log("response", response.data)
      return Promise.resolve(response)
    })
}

const workbook = XLSX.readFile('Attributes.xlsx')

workbook.SheetNames.forEach(async name => {
  if (name === '1Partner Company') {
    const partnercompanySheet = workbook.Sheets['Partner Company']

    const range = XLSX.utils.decode_range(partnercompanySheet['!ref'])
    // get the number of rows entries
    const rowNumber = range.e.r - 4

    for (let i = 1; i <= rowNumber; i++) {
      const rowPos = i + 5

      const partnercompany_name = partnercompanySheet[`B${rowPos}`]?.v
      const partnercompany_shortname = partnercompanySheet[`C${rowPos}`]?.v
      const partnergroup_name = partnercompanySheet[`D${rowPos}`]?.v
      const partnertype_name = partnercompanySheet[`E${rowPos}`]?.v
      const city_name = partnercompanySheet[`F${rowPos}`]?.v
      const address_street = partnercompanySheet[`G${rowPos}`]?.v
      const address_house_number = partnercompanySheet[`H${rowPos}`]?.v
      const address_extra = partnercompanySheet[`I${rowPos}`]?.v
      const contactdetails_email = partnercompanySheet[`J${rowPos}`]?.v
      const contactdetails_phone = partnercompanySheet[`K${rowPos}`]?.v
      const contactdetails_mobile = partnercompanySheet[`L${rowPos}`]?.v
      const contactdetails_fax = partnercompanySheet[`M${rowPos}`]?.v
      const companydetails_salestaxno = partnercompanySheet[`N${rowPos}`]?.v
      const companydetails_commercialregisterno = partnercompanySheet[`O${rowPos}`]?.v
      const companydetails_website = partnercompanySheet[`P${rowPos}`]?.v

      // Create Partner Company
      const partnercompanyEntity = {
        partnercompany_name: partnercompany_name,
        partnercompany_shortname: partnercompany_shortname
      }

      const partnercompanyResponse = await api({
        entity: 'partnercompany',
        action: 'create',
        data: [partnercompanyEntity]
      })


      // create contactdetail
      const contactdetailsEntity = {
        contactdetails_mobile: contactdetails_mobile,
        contactdetails_fax: contactdetails_fax,
        contactdetails_phone: contactdetails_phone,
        contactdetails_email: contactdetails_email
      }

      const contactdetails = await api({
        entity: 'contactdetails',
        action: 'create',
        data: [contactdetailsEntity],
      })

      // Create Contact Detail Relation
      const partnercompany_contactdetails_rel_response = await api({
        entity: 'partnercompany_contactdetails_rel',
        action: 'create',
        data: [{
          partnercompany_id: (await partnercompanyResponse).data.data.data[0][0].partnercompany_id,
          contactdetails_id: contactdetails.data.data.data[0][0].contactdetails_id
        }]
      })
      // Create Company Detail
      const companydetails = await api({
        entity: 'companydetails',
        action: 'create',
        data: [{
          companydetails_commercialregisterno,
          companydetails_salestaxno,
          companydetails_website,
        }],
      })

      // Create Company Details Relation
      const partnercompany_companydetails_rel_response = await api({
        entity: 'partnercompany_companydetails_rel',
        action: 'create',
        data: [{
          partnercompany_id: (await partnercompanyResponse).data.data.data[0][0].partnercompany_id,
          companydetails_id: companydetails.data.data.data[0][0].companydetails_id
        }]
      })


      // Create Partner Group Relation
      const partnergroup = await api({
        entity: 'partnergroup',
        action: 'read-rich',
        filter: { 'partnergroup_name': partnergroup_name },
      })

      const partnercompany_partnergroup_rel_response = await api({
        entity: 'partnercompany_partnergroup_rel',
        action: 'create',
        data: [{
          partnercompany_id: (await partnercompanyResponse).data.data.data[0][0].partnercompany_id,
          partnergroup_id: partnergroup.data.data.data[0].partnergroup_id
        }]
      })

      // Create Partner Type Relation
      const partnertype = await api({
        entity: 'partnertype',
        action: 'read-rich',
        filter: { 'partnertype_name': partnertype_name },
      })

      const partnercompany_partnertype_rel_response = await api({
        entity: 'partnercompany_partnertype_rel',
        action: 'create',
        data: [{
          partnercompany_id: (await partnercompanyResponse).data.data.data[0][0].partnercompany_id,
          partnertype_id: partnertype.data.data.data[0].partnertype_id
        }]
      })

      // Create Address Relation
      const addressEntity = {
        address_street: address_street,
        address_house_number: address_house_number,
        address_extra: address_extra
      }

      const address = await api({
        entity: 'address',
        action: 'create',
        data: [addressEntity]
      })
      const partnercompany_address_rel_response = await api({
        entity: 'partnercompany_address_rel',
        action: 'create',
        data: [{
          partnercompany_id: (await partnercompanyResponse).data.data.data[0][0].partnercompany_id,
          address_id: address.data.data.data[0][0].address_id
        }]
      })
      const city = await api({
        entity: 'city',
        action: 'read-rich',
        filter: { 'city_name': city_name },
      })

      await api({
        entity: 'address_city_rel',
        action: 'create',
        data: [{
          city_id: city.data.data.data[0].city_id,
          address_id: address.data.data.data[0][0].address_id
        }]
      })

    }
  }
  else if (name === '1Contact Person') {
    const contactPersonSheet = workbook.Sheets['Contact Person']

    const range = XLSX.utils.decode_range(contactPersonSheet['!ref'])
    // get the number of rows entries
    const rowNumber = range.e.r - 4

    for (let i = 1; i <= rowNumber; i++) {
      const rowPos = i + 5

      const contactperson_firstname = contactPersonSheet[`B${rowPos}`]?.v
      const contactperson_lastname = contactPersonSheet[`C${rowPos}`]?.v
      const contactperson_department = contactPersonSheet[`D${rowPos}`]?.v
      const contactperson_shortname = contactPersonSheet[`E${rowPos}`]?.v
      const contactperson_function = contactPersonSheet[`F${rowPos}`]?.v
      const user_email = contactPersonSheet[`G${rowPos}`]?.v
      const contactdetails_email = contactPersonSheet[`H${rowPos}`]?.v
      const contactdetails_phone = contactPersonSheet[`I${rowPos}`]?.v
      const contactdetails_mobile = contactPersonSheet[`J${rowPos}`]?.v
      const contactdetails_fax = contactPersonSheet[`K${rowPos}`]?.v
      const company_name = contactPersonSheet[`L${rowPos}`]?.v
      const partnercompany_name = contactPersonSheet[`M${rowPos}`]?.v
      const city_name = contactPersonSheet[`N${rowPos}`]?.v
      const address_street = contactPersonSheet[`O${rowPos}`]?.v
      const address_house_number = contactPersonSheet[`P${rowPos}`]?.v
      const address_extra = contactPersonSheet[`Q${rowPos}`]?.v
      const contactsalutation_name = contactPersonSheet[`R${rowPos}`]?.v
      const contacttitle_name = contactPersonSheet[`S${rowPos}`]?.v


      const user = await api({
        entity: 'user',
        action: 'read-rich',
        filter: { 'user_email': user_email }
      })

      const city = await api({
        entity: 'city',
        action: 'read-rich',
        filter: { 'city_name': city_name }
      })

      const contactpersonEntity = {
        contactperson_firstname: contactperson_firstname,
        contactperson_lastname: contactperson_lastname,
        contactperson_department: contactperson_department,
        contactperson_shortname: contactperson_shortname,
        contactperson_function: contactperson_function,
      }

      const contactpersonResponse = await api({
        entity: 'contactperson',
        action: 'create',
        data: [contactpersonEntity]
      })
      const contactperson_id = contactpersonResponse.data.data.data[0][0].contactperson_id

      // Relations

      // Contact title
      const contacttitle = await api({
        entity: 'contacttitle',
        action: 'read-rich',
        filter: { 'contacttitle_name': contacttitle_name }
      })

      const contactperson_contacttitle_rel = {
        contactperson_id: contactperson_id,
        contacttitle_id: contacttitle.data.data.data[0].contacttitle_id
      }

      const contactperson_contacttitle_rel_response = await api({
        entity: 'contactperson_contacttitle_rel',
        action: 'create',
        data: [contactperson_contacttitle_rel]
      })

      // contact salutation

      const contactsalutation = await api({
        entity: 'contactsalutation',
        action: 'read-rich',
        filter: { 'contactsalutation_name': contactsalutation_name }
      })

      const contactperson_contactsalutation_rel = {
        contactperson_id: contactperson_id,
        contactsalutation_id: contactsalutation.data.data.data[0].contactsalutation_id
      }

      const contactperson_contactsalutation_rel_response = await api({
        entity: 'contactperson_contactsalutation_rel',
        action: 'create',
        data: [contactperson_contactsalutation_rel]
      })

      // Company

      const company = await api({
        entity: 'company',
        action: 'read-rich',
        filter: { 'company_name': company_name }
      })

      const contactperson_company_rel = {
        contactperson_id: contactperson_id,
        company_id: company.data.data.data[0].company_id
      }

      const contactperson_company_rel_response = await api({
        entity: 'contactperson_company_rel',
        action: 'create',
        data: [contactperson_company_rel]
      })

      // Contactdetails

      const contactdetailsEntity = {
        contactdetails_mobile: contactdetails_mobile,
        contactdetails_fax: contactdetails_fax,
        contactdetails_phone: contactdetails_phone,
        contactdetails_email: contactdetails_email
      }

      const contactdetailsResponse = await api({
        entity: 'contactdetails',
        action: 'create',
        data: [contactdetailsEntity]
      })

      const contactperson_contactdetails_rel = {
        contactperson_id: contactperson_id,
        contactdetails_id: contactdetailsResponse.data.data.data[0][0].contactdetails_id
      }

      const contactperson_contactdetails_rel_response = await api({
        entity: 'contactperson_contactdetails_rel',
        action: 'create',
        data: [contactperson_contactdetails_rel]
      })

      // address

      const addressEntity = {
        address_street: address_street,
        address_house_number: address_house_number,
        address_extra: address_extra,
      }

      const addressResponse = await api({
        entity: 'address',
        action: 'create',
        data: [addressEntity]
      })

      const address_city_rel = {
        address_id: addressResponse.data.data.data[0][0].address_id,
        city_id: city.data.data.data[0].city_id
      }

      const address_city_rel_response = await api({
        entity: 'address_city_rel',
        action: 'create',
        data: [address_city_rel]
      })

      const contactperson_address_rel = {
        contactperson_id: contactperson_id,
        address_id: addressResponse.data.data.data[0][0].address_id
      }

      const contactperson_address_rel_response = await api({
        entity: 'contactperson_address_rel',
        action: 'create',
        data: [contactperson_address_rel]
      })
    }
  }
  else if (name === '1Company') {
    const companySheet = workbook.Sheets.Company

    const range = XLSX.utils.decode_range(companySheet['!ref'])
    // get the number of rows entries
    const rowNumber = range.e.r - 4

    for (let i = 1; i <= rowNumber; i++) {
      const rowPos = i + 5

      const companyName = companySheet[`B${rowPos}`]?.v
      const customergroup_name = companySheet[`C${rowPos}`]?.v
      const company_template_coverletter_subject = companySheet[`D${rowPos}`]?.v
      const company_template_coverletter_text = companySheet[`E${rowPos}`]?.v
      const city_name = companySheet[`F${rowPos}`]?.v
      const address_street = companySheet[`G${rowPos}`]?.v
      const address_house_number = companySheet[`H${rowPos}`]?.v
      const address_extra = companySheet[`I${rowPos}`]?.v
      const contactdetails_email = companySheet[`J${rowPos}`]?.v
      const contactdetails_phone = companySheet[`K${rowPos}`]?.v
      const contactdetails_mobile = companySheet[`L${rowPos}`]?.v
      const contactdetails_fax = companySheet[`M${rowPos}`]?.v
      const companydetails_salestaxno = companySheet[`N${rowPos}`]?.v
      const companydetails_commercialregisterno = companySheet[`O${rowPos}`]?.v
      const companydetails_website = companySheet[`P${rowPos}`]?.v
      const bankdata_iban = companySheet[`Q${rowPos}`]?.v
      const bankdata_bic = companySheet[`Q${rowPos}`]?.v
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
      }

      const companyresponse = await api({
        entity: 'company',
        action: 'create',
        data: [companyEntity]
      })

      const companyId = companyresponse.data.data.data[0][0].company_id

      // Relations

      // Address
      const addressEntity = {
        address_street: address_street,
        address_house_number: address_house_number,
        address_extra: address_extra,
      }

      const addressResponse = await api({
        entity: 'address',
        action: 'create',
        data: [addressEntity]
      })

      const companyaddressrelEntity = {
        company_id: companyId,
        address_id: addressResponse.data.data.data[0][0].address_id
      }

      // Company details

      const companydetailsEntity = {
        companydetails_commercialregisterno: companydetails_commercialregisterno,
        companydetails_salestaxno: companydetails_salestaxno,
        companydetails_website: companydetails_website
      }

      const companydetailsResponse = await api({
        entity: 'companydetails',
        action: 'create',
        data: [companydetailsEntity]
      })

      const company_companydetails_rel = {
        companydetails_id: companydetailsResponse.data.data.data[0][0].companydetails_id,
        company_id: companyId
      }

      const company_companydetails_rel_response = await api({
        entity: 'company_companydetails_rel',
        action: 'create',
        data: [company_companydetails_rel]
      })

      // Contactdetails

      const contactdetailsEntity = {
        contactdetails_mobile: contactdetails_mobile,
        contactdetails_fax: contactdetails_fax,
        contactdetails_phone: contactdetails_phone,
        contactdetails_email: contactdetails_email,
      }

      const contactdetailsResponse = await api({
        entity: 'contactdetails',
        action: 'create',
        data: [contactdetailsEntity]
      })

      const company_contactdetails_rel = {
        contactdetails_id: contactdetailsResponse.data.data.data[0][0].contactdetails_id,
        company_id: companyId
      }

      const company_contactdetails_rel_response = await api({
        entity: 'company_contactdetails_rel',
        action: 'create',
        data: [company_contactdetails_rel]
      })

      // Bankdata
      const bankdataEntity = {
        bankdata_iban: bankdata_iban,
        bankdata_bic: bankdata_bic,
        bankdata_bank_name: bankdata_bank_name
      }

      const bankdataResponse = await api({
        entity: 'bankdata',
        action: 'create',
        data: [bankdataEntity]
      })

      const company_bankdata_rel = {
        bankdata_id: bankdataResponse.data.data.data[0][0].bankdata_id,
        company_id: companyId
      }

      const company_bankdata_rel_response = await api({
        entity: 'company_bankdata_rel',
        action: 'create',
        data: [company_bankdata_rel]
      })
    }
  }
  else if (name === '1Pos') {
    const posSheet = workbook.Sheets['Pos']

    const range = XLSX.utils.decode_range(posSheet['!ref'])
    // get the number of rows entries
    const rowNumber = range.e.r - 4

    for (let i = 1; i <= rowNumber; i++) {
      const rowPos = i + 5

      const pos_name = posSheet[`B${rowPos}`]?.v
      const pos_branchnumber = posSheet[`C${rowPos}`]?.v
      const pos_name_external = posSheet[`D${rowPos}`]?.v
      const pos_first_year = posSheet[`E${rowPos}`]?.v
      const company_name = posSheet[`F${rowPos}`]?.v
      const tag_name = posSheet[`G${rowPos}`]?.v

      const tag = await api({
        entity: 'tag',
        action: 'read-rich',
        filter: { 'tag_name': tag_name }
      })

      const posEntity = {
        pos_name: pos_name,
        pos_branchnumber: pos_branchnumber,
        pos_name_external: pos_name_external,
        pos_first_year: pos_first_year,
        pos_internal_id: '',
      }

      const posResponse = await api({
        entity: 'pos',
        action: 'create',
        data: [posEntity]
      })

      const pos_tag_rel = {
        tag_id: tag.data.data.data[0].tag_id,
        pos_id: posResponse.data.data.data[0][0].pos_id
      }

      const pos_tag_rel_response = await api({
        entity: 'pos_tag_rel',
        action: 'create',
        data: [pos_tag_rel]
      })
    }
  }
  else if (name === '1Area') {
    const areaSheet = workbook.Sheets['Area']

    const range = XLSX.utils.decode_range(areaSheet['!ref'])
    // get the number of rows entries
    const rowNumber = range.e.r - 4

    for (let i = 1; i <= rowNumber; i++) {
      const rowPos = i + 5

      const area_name = areaSheet[`B${rowPos}`]?.v
      const area_name_external = areaSheet[`C${rowPos}`]?.v
      const area_space_value = areaSheet[`D${rowPos}`]?.v
      const location_name = areaSheet[`E${rowPos}`]?.v
      const usagetype_name = areaSheet[`F${rowPos}`]?.v
      const areatype_name = areaSheet[`G${rowPos}`]?.v
      const pos_name = areaSheet[`H${rowPos}`]?.v

      const location = await api({
        entity: 'location',
        action: 'read-rich',
        filter: { 'location_name': location_name }
      })

      const areatype = await api({
        entity: 'areatype',
        action: 'read-rich',
        filter: { 'areatype_name': areatype_name }
      })

      const usagetype = await api({
        entity: 'usagetype',
        action: 'read-rich',
        filter: { 'usagetype_name': usagetype_name }
      })

      const areaEntity = {
        area_name: area_name,
        area_name_external: area_name_external,
        area_space_value: area_space_value,
      }

      const areaResponse = await api({
        entity: 'area',
        action: 'create',
        data: [areaEntity]
      })

      const area_id = areaResponse.data.data.data[0][0].area_id

      // relations
      const area_location_rel = {
        location_id: location.data.data.data[0].location_id,
        area_id: area_id
      }

      const area_location_rel_response = await api({
        entity: 'area_location_rel',
        action: 'create',
        data: [area_location_rel]
      })

      const area_areatype_rel = {
        areatype_id: areatype.data.data.data[0].areatype_id,
        area_id: area_id
      }

      const area_areatype_rel_response = await api({
        entity: 'area_areatype_rel',
        action: 'create',
        data: [area_areatype_rel]
      })

      const area_usagetype_rel = {
        usagetype_id: usagetype.data.data.data[0].usagetype_id,
        area_id: area_id
      }

      const area_usagetype_rel_response = await api({
        entity: 'area_usagetype_rel',
        action: 'create',
        data: [area_usagetype_rel]
      })
    }
  }
  else if (name === 'Location') {
    const locationSheet = workbook.Sheets.Location

    const range = XLSX.utils.decode_range(locationSheet['!ref'])
    // get the number of rows entries
    const rowNumber = range.e.r - 4

    for (let i = 1; i <= rowNumber; i++) {
      const rowPos = i + 5

      const location_name = locationSheet[`B${rowPos}`]?.v
      const location_objectdescription = locationSheet[`C${rowPos}`]?.v
      const location_total_area = locationSheet[`D${rowPos}`]?.v
      const location_start_date = locationSheet[`E${rowPos}`]?.w
      const partnercompany_name = locationSheet[`F${rowPos}`]?.v
      const locationtype_name = locationSheet[`G${rowPos}`]?.v
      const city_name = locationSheet[`H${rowPos}`]?.v
      const address_street = locationSheet[`I${rowPos}`]?.v
      const address_house_number = locationSheet[`J${rowPos}`]?.v
      const address_extra = locationSheet[`K${rowPos}`]?.v

      const partnercompany = await api({
        entity: 'partnercompany',
        action: 'read-rich',
        filter: { 'partnercompany_name': partnercompany_name }
      })

      const city = await api({
        entity: 'city',
        action: 'read-rich',
        filter: { 'city_name': city_name },
      })

      const locationtype = await api({
        entity: 'locationtype',
        action: 'read-rich',
        filter: { 'locationtype_name': locationtype_name },
      })

      const locationEntity = {
        location_objectdescription: location_objectdescription,
        location_name: location_name,
        location_total_area: location_total_area,
        location_start_date: location_start_date
      }

      const locationResponse = await api({
        entity: 'location',
        action: 'create',
        data: [locationEntity]
      })

      // Relations

      const addressEntity = {
        address_street: address_street,
        address_house_number: address_house_number,
        address_extra: address_extra,
        city_id: city.data.data.data[0].city_id
      }

      const addressResponse = await api({
        entity: 'address',
        action: 'create',
        data: [addressEntity]
      })

      const location_locationtype_rel = {
        location_id: locationResponse.data.data.data[0][0].location_id,
        locationtype_id: locationtype.data.data.data[0].locationtype_id
      }

      const location_locationtype_rel_response = await api({
        entity: 'location_locationtype_rel',
        action: 'create',
        data: [location_locationtype_rel]
      })

      const location_address_rel = {
        location_id: locationResponse.data.data.data[0][0].location_id,
        address_id: addressResponse.data.data.data[0][0].address_id
      }

      const location_address_rel_response = await api({
        entity: 'location_address_rel',
        action: 'create',
        data: [location_address_rel]
      })

    }
  }
})

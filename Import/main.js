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
  else if (name == 'Contact Person') {
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

      const user = await api({
        entity: 'user',
        action: 'read-rich',
        filter: { 'user_email': user_email }
      })

      const contactpersonEntity = {
        contactperson_firstname: contactperson_firstname,
        contactperson_lastname: contactperson_lastname,
        contactperson_department: contactperson_department,
        contactperson_shortname: contactperson_shortname,
        contactperson_function: contactperson_function,
        user_id: user.data.data.data[0].user_id
      }

      const contactpersonResponse = await api({
        entity: 'contactperson',
        action: 'create',
        data: [contactpersonEntity]
      })
    }
  }
  else if (name === 'Pos') {
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
      const customergroup_name = posSheet[`F${rowPos}`]?.v
      const company_name = posSheet[`G${rowPos}`]?.v

      const company = await api({
        entity: 'company',
        action: 'read-rich',
        filter: { 'company_name': company_name }
      })

      const customergroup = await api({
        entity: 'customergroup',
        action: 'read-rich',
        filter: { 'customergroup_name': customergroup_name }
      })

      const posEntity = {
        pos_name: pos_name,
        pos_branchnumber: pos_branchnumber,
        pos_name_external: pos_name_external,
        pos_first_year: pos_first_year,
        pos_internal_id: 3
      }

      const posResponse = await api({
        entity: 'pos',
        action: 'create',
        data: [posEntity]
      })

      console.log(posResponse.data.data.errors)

      const company_pos_rel = {
        company_id: company.data.data.data[0].company_id,
        pos_id: posResponse.data.data.data[0][0].pos_id
      }

      const company_pos_rel_response = await api({
        entity: 'company_pos_rel',
        action: 'create',
        data: [company_pos_rel]
      })
    }
  }
  else if (name === 'Area') {
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
        address_id: addressResponse.data.data.data[0].address_id
      }

      const location_address_rel_response = await api({
        entity: 'location_address_rel',
        action: 'create',
        data: [location_address_rel]
      })

    }
  }
  else if (name === 'Partner Company') {
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

      const partnercompanyEntity = {
        partnercompany_name: partnercompany_name,
        partnercompany_shortname: partnercompany_shortname
      }

      const partnercompanyResponse = await api({
        entity: 'partnercompany',
        action: 'create',
        data: [partnercompanyEntity]
      })

      const city = await api({
        entity: 'city',
        action: 'read-rich',
        filter: { 'city_name': city_name },
      })

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

      const companydetails = await api({
        entity: 'companydetails',
        action: 'read-rich',
        filter: { 'companydetails_commercialregisterno': companydetails_commercialregisterno },
      })

      const partnergroup = await api({
        entity: 'partnergroup',
        action: 'read-rich',
        filter: { 'partnergroup_name': partnergroup_name },
      })

      const partnertype = await api({
        entity: 'partnertype',
        action: 'read-rich',
        filter: { 'partnertype_name': partnertype_name },
      })

      // relations
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

      const partnercompany_partnergroup_rel = {
        partnercompany_id: (await partnercompanyResponse).data.data.data[0][0].partnercompany_id,
        partnergroup_id: partnergroup.data.data.data[0].partnergroup_id
      }

      const partnercompany_partnergroup_rel_response = await api({
        entity: 'partnercompany_partnergroup_rel',
        action: 'create',
        data: [partnercompany_partnergroup_rel]
      })

      const partnercompany_partnertype_rel = {
        partnercompany_id: (await partnercompanyResponse).data.data.data[0][0].partnercompany_id,
        partnertype_id: partnertype.data.data.data[0].partnertype_id
      }

      const partnercompany_partnertype_rel_response = await api({
        entity: 'partnercompany_partnertype_rel',
        action: 'create',
        data: [partnercompany_partnertype_rel]
      })

      const partnercompany_contactdetails_rel = {
        partnercompany_id: (await partnercompanyResponse).data.data.data[0][0].partnercompany_id,
        contactdetails_id: contactdetails.data.data.data[0][0].contactdetails_id
      }

      const partnercompany_contactdetails_rel_response = await api({
        entity: 'partnercompany_contactdetails_rel',
        action: 'create',
        data: [partnercompany_contactdetails_rel]
      })

      const partnercompany_companydetails_rel = {
        partnercompany_id: (await partnercompanyResponse).data.data.data[0][0].partnercompany_id,
        companydetails_id: companydetails.data.data.data[0].companydetails_id
      }

      const partnercompany_companydetails_rel_response = await api({
        entity: 'partnercompany_companydetails_rel',
        action: 'create',
        data: [partnercompany_companydetails_rel]
      })

      const partnercompany_address_rel = {
        partnercompany_id: (await partnercompanyResponse).data.data.data[0][0].partnercompany_id,
        address_id: address.data.data.data[0][0].address_id
      }

      const partnercompany_address_rel_response = await api({
        entity: 'partnercompany_address_rel',
        action: 'create',
        data: [partnercompany_address_rel]
      })
    }
  }
})

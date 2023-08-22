// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs')
// eslint-disable-next-line import/no-extraneous-dependencies
const XLSX = require('xlsx')
const axios = require('axios')

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://api.dev-zelos.de', // url to the backend
  timeout: 30000, // timeout in ms
  headers: { Authorization: 'Bearer johndoe@example.com' }, // authentication token
})

// send request to the sever
const api = data => {
  console.log("api call", data)
  return axiosIns.post('/api/', { a: data })
    .then(response => {
      console.log("response", response.data)

      if (data.action === 'create') {
        if (response.data.data.errors.length > 0) console.log("error: ", response.data.data.errors[0])
      }
      return Promise.resolve(response)
    })
}

async function createAddress(entity_name, entity_id, country_name, city_name, city_zip, address, entity_address_rel_name = null) {

  // Get the country
  const country = await api({
    entity: 'country',
    action: 'read-rich',
    filter: { 'country_name': country_name }
  })

  if (country.data.data.data.length === 0) return

  // Create city
  const city = await api({
    entity: 'city',
    action: 'create',
    data: [{
      city_name,
      city_zip
    }]
  })

  if (city.data.data.data.length === 0) return

  // Create address entity
  const addressEntity = await api({
    entity: 'address',
    action: 'create',
    data: [address]
  })

  if (addressEntity.data.data.data.length === 0) return

  // Relations

  // Create city country rel
  await api({
    entity: 'city_country_rel',
    action: 'create',
    data: [{
      city_id: city.data.data.data[0][0].city_id,
      country_id: country.data.data.data[0].country_id
    }]
  })

  // Create entity address rel
  const entity_id_name = `${entity_name}_id`
  await api({
    entity: entity_address_rel_name ? entity_address_rel_name : entity_name + "_address_rel",
    action: 'create',
    data: [{
      [entity_id_name] : entity_id,
      address_id: addressEntity.data.data.data[0][0].address_id
    }],
  })

  // Create address city rel
  await api({
    entity: 'address_city_rel',
    action: 'create',
    data: [{
      city_id: city.data.data.data[0][0].city_id,
      address_id: addressEntity.data.data.data[0][0].address_id
    }]
  })
}

// Excel Document
const workbook = XLSX.readFile('Attributes.xlsx')

// Penser a prendre en compte les noms des feuilles et non l'ordre dans lequel elles sont
workbook.SheetNames.forEach(async name => {
  if (name === 'Partner Company') {
    const partnercompanySheet = workbook.Sheets['Partner Company']

    const range = XLSX.utils.decode_range(partnercompanySheet['!ref'])
    // get the number of rows entries
    const rowNumber = range.e.r - 5

    for (let i = 1; i <= rowNumber; i++) {
      const rowPos = i + 6

      const partnercompany_name = partnercompanySheet[`B${rowPos}`]?.v
      const partnercompany_shortname = partnercompanySheet[`C${rowPos}`]?.v
      const partnergroup_name = partnercompanySheet[`D${rowPos}`]?.v
      const partnertype_name = partnercompanySheet[`E${rowPos}`]?.v
      const city_zip = partnercompanySheet[`F${rowPos}`]?.v
      const city_name = partnercompanySheet[`G${rowPos}`]?.v
      const address_street = partnercompanySheet[`H${rowPos}`]?.v
      const address_house_number = partnercompanySheet[`I${rowPos}`]?.v
      const address_extra = partnercompanySheet[`J${rowPos}`]?.v
      const country_name = partnercompanySheet[`K${rowPos}`]?.v
      const contactdetails_email = partnercompanySheet[`L${rowPos}`]?.v
      const contactdetails_phone = partnercompanySheet[`M${rowPos}`]?.v
      const contactdetails_mobile = partnercompanySheet[`N${rowPos}`]?.v
      const contactdetails_fax = partnercompanySheet[`O${rowPos}`]?.v
      const companydetails_salestaxno = partnercompanySheet[`P${rowPos}`]?.v
      const companydetails_commercialregisterno = partnercompanySheet[`Q${rowPos}`]?.v
      const companydetails_website = partnercompanySheet[`R${rowPos}`]?.v

      // Create Partner Company

      const partnercompanyResponse = await api({
        entity: 'partnercompany',
        action: 'create',
        data: [{
          partnercompany_name: partnercompany_name,
          partnercompany_shortname: partnercompany_shortname
        }]
      })


      // create contactdetail

      const contactdetails = await api({
        entity: 'contactdetails',
        action: 'create',
        data: [{
          contactdetails_mobile: contactdetails_mobile,
          contactdetails_fax: contactdetails_fax,
          contactdetails_phone: contactdetails_phone,
          contactdetails_email: contactdetails_email
        }],
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
      let partnergroup = await api({
        entity: 'partnergroup',
        action: 'read-rich',
        filter: { 'partnergroup_name': partnergroup_name },
      })

      // If partner group doesnt exist, create a new
      if (partnergroup.data.data.data.length == 0) {
        partnergroup = await api({
          entity: 'partnergroup',
          action: 'create',
          data: [{
            partnergroup_name: partnergroup_name,
            partnergroup_description: 'Description here',
          }],
        })
      }

      const partnercompany_partnergroup_rel_response = await api({
        entity: 'partnercompany_partnergroup_rel',
        action: 'create',
        data: [{
          partnercompany_id: (await partnercompanyResponse).data.data.data[0][0].partnercompany_id,
          partnergroup_id: partnergroup.data.data.data[0].partnergroup_id != undefined ? partnergroup.data.data.data[0].partnergroup_id : partnergroup.data.data.data[0][0].partnergroup_id
        }]
      })

      // Create Partner Type Relation
      let partnertype = await api({
        entity: 'partnertype',
        action: 'read-rich',
        filter: { 'partnertype_name': partnertype_name },
      })

      // If partner type doesnt exist, create a new
      if (partnertype.data.data.data.length == 0) {
        partnertype = await api({
          entity: 'partnertype',
          action: 'create',
          data: [{
            partnertype_name,
            partnertype_description: 'Description here',
          }],
        })
      }

      const partnercompany_partnertype_rel_response = await api({
        entity: 'partnercompany_partnertype_rel',
        action: 'create',
        data: [{
          partnercompany_id: (await partnercompanyResponse).data.data.data[0][0].partnercompany_id,
          partnertype_id: partnertype.data.data.data[0].partnertype_id != undefined ? partnertype.data.data.data[0].partnertype_id : partnertype.data.data.data[0][0].partnertype_id
        }]
      })

      const address = {
        address_street,
        address_house_number,
        address_extra
      }

      await createAddress("partnercompany", partnercompanyResponse.data.data.data[0][0].partnercompany_id, country_name, city_name, city_zip, address)
    }
  }
  else if (name === 'Contact Person') {
    const contactPersonSheet = workbook.Sheets['Contact Person']

    const range = XLSX.utils.decode_range(contactPersonSheet['!ref'])
    // get the number of rows entries
    const rowNumber = range.e.r - 5

    for (let i = 1; i <= rowNumber; i++) {
      const rowPos = i + 6

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
      const customergroup_name = contactPersonSheet[`M${rowPos}`]?.v
      const partnercompany_name = contactPersonSheet[`N${rowPos}`]?.v
      const partnertype_name = contactPersonSheet[`O${rowPos}`]?.v
      const city_name = contactPersonSheet[`P${rowPos}`]?.v
      const address_street = contactPersonSheet[`Q${rowPos}`]?.v
      const address_house_number = contactPersonSheet[`R${rowPos}`]?.v
      const address_extra = contactPersonSheet[`S${rowPos}`]?.v
      const contactsalutation_name = contactPersonSheet[`T${rowPos}`]?.v
      const contacttitle_name = contactPersonSheet[`U${rowPos}`]?.v
      const city_zip = contactPersonSheet[`V${rowPos}`]?.v
      const country_name = contactPersonSheet[`W${rowPos}`]?.v


      const user = await api({
        entity: 'user',
        action: 'read-rich',
        filter: { 'user_email': user_email }
      })

      const contactpersonResponse = await api({
        entity: 'contactperson',
        action: 'create',
        data: [{
          contactperson_firstname,
          contactperson_lastname,
          contactperson_department,
          contactperson_shortname,
          contactperson_function,
        }]
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

      await api({
        entity: 'contactperson_contacttitle_rel',
        action: 'create',
        data: [contactperson_contacttitle_rel]
      })

      // contact salutation

      let contactsalutation = await api({
        entity: 'contactsalutation',
        action: 'read-rich',
        filter: { 'contactsalutation_name': contactsalutation_name }
      })

      if (contactsalutation.data.data.data.length == 0) {
        contactsalutation = await api({
          entity: 'contactsalutation',
          action: 'create',
          data: [{
            contactsalutation_name,
          }],
        })
      }

      await api({
        entity: 'contactperson_contactsalutation_rel',
        action: 'create',
        data: [{
          contactsalutation_id: contactsalutation.data.data.data[0].contactsalutation_id != undefined ? contactsalutation.data.data.data[0].contactsalutation_id : contactsalutation.data.data.data[0][0].contactsalutation_id,
          contactperson_id: contactpersonResponse.data.data.data[0][0].contactperson_id
        }]
      })

      // Company

      const company = await api({
        entity: 'company',
        action: 'read-rich',
        filter: { 'company_name': company_name }
      })

      await api({
        entity: 'contactperson_company_rel',
        action: 'create',
        data: [{
          contactperson_id: contactperson_id,
          company_id: company.data.data.data[0].company_id
        }]
      })

      // Contactdetails

      const contactdetailsResponse = await api({
        entity: 'contactdetails',
        action: 'create',
        data: [{
          contactdetails_mobile: contactdetails_mobile,
          contactdetails_fax: contactdetails_fax,
          contactdetails_phone: contactdetails_phone,
          contactdetails_email: contactdetails_email
        }]
      })

      await api({
        entity: 'contactperson_contactdetails_rel',
        action: 'create',
        data: [{
          contactperson_id: contactperson_id,
          contactdetails_id: contactdetailsResponse.data.data.data[0][0].contactdetails_id
        }]
      })

      // partnertype
      let partnertype = await api({
        entity: 'partnertype',
        action: 'read-rich',
        filter: { partnertype_name },
      })

      // If partner type doesnt exist, create a new
      if (partnertype.data.data.data.length == 0) {
        partnertype = await api({
          entity: 'partnertype',
          action: 'create',
          data: [{
            partnertype_name,
            partnertype_description: 'Description here',
          }],
        })
      }

      // customergroup
      let customergroup = await api({
        entity: 'customergroup',
        action: 'read-rich',
        filter: { customergroup_name },
      })

      // If partner type doesnt exist, create a new
      if (customergroup.data.data.data.length == 0) {
        customergroup = await api({
          entity: 'customergroup',
          action: 'create',
          data: [{
            customergroup_name,
            customergroup_description: 'Description here',
          }],
        })
      }

      await api({
        entity: 'contactperson_customergroup_rel',
        action: 'create',
        data: [{
          customergroup_id: customergroup.data.data.data[0].customergroup_id != undefined ? customergroup.data.data.data[0].customergroup_id : customergroup.data.data.data[0][0].customergroup_id,
          contactperson_id: contactpersonResponse.data.data.data[0][0].contactperson_id
        }]
      })

      // partnercompany
      let partnercompany = await api({
        entity: 'partnercompany',
        action: 'read-rich',
        filter: { partnercompany_name },
      })

      // If partner company doesnt exist, create a new
      if (partnercompany.data.data.data.length == 0) {
        partnercompany = await api({
          entity: 'partnercompany',
          action: 'create',
          data: [{
            partnercompany_name,
            partnercompany_description: 'Description here',
          }],
        })
      }

      // partnercompany partnertype rel
      await api({
        entity: 'partnercompany_partnertype_rel',
        action: 'create',
        data: [{
          partnertype_id: partnertype.data.data.data[0].partnertype_id != undefined ? partnertype.data.data.data[0].partnertype_id : partnertype.data.data.data[0][0].partnertype_id,
          partnercompany_id: partnercompany.data.data.data[0].partnercompany_id != undefined ? partnercompany.data.data.data[0].partnercompany_id : partnercompany.data.data.data[0][0].partnercompany_id
        }]
      })

      // partnercompany contactdetails rel
      await api({
        entity: 'partnercompany_contactdetails_rel',
        action: 'create',
        data: [{
          partnercompany_id: partnercompany.data.data.data[0].partnercompany_id != undefined ? partnercompany.data.data.data[0].partnercompany_id : partnercompany.data.data.data[0][0].partnercompany_id,
          contactdetails_id: contactdetailsResponse.data.data.data[0][0].contactdetails_id
        }]
      })

      // contactperson contactdetails rel
      await api({
        entity: 'contactperson_contactdetails_rel',
        action: 'create',
        data: [{
          contactdetails_id: contactdetailsResponse.data.data.data[0][0].contactdetails_id,
          contactpersone_id: contactpersonResponse.data.data.data[0][0].contactperson_id
        }]
      })

      // Address
      const address = {
        address_street,
        address_house_number,
        address_extra
      }

      await createAddress("contactperson",contactpersonResponse.data.data.data[0][0].contactperson_id , country_name, city_name, city_zip, address)

      // Create user relation
      if (user.data.data.data.length == 0) continue
      await api({
        entity: 'contactperson_user_rel',
        action: 'create',
        data: [{
          contactperson_id: contactperson_id,
          user_id: user.data.data.data[0].user_id
        }]
      })
    }
  }
  else if (name === 'Company') {
    const companySheet = workbook.Sheets.Company

    const range = XLSX.utils.decode_range(companySheet['!ref'])
    // get the number of rows entries
    const rowNumber = range.e.r - 5

    for (let i = 1; i <= rowNumber; i++) {
      const rowPos = i + 6

      const companyName = companySheet[`B${rowPos}`]?.v
      const company_shortname = companySheet[`C${rowPos}`]?.v
      const customergroup_name = companySheet[`D${rowPos}`]?.v
      const company_template_coverletter_subject = companySheet[`E${rowPos}`]?.v
      const company_template_coverletter_text = companySheet[`F${rowPos}`]?.v
      const city_zip = companySheet[`G${rowPos}`]?.v
      const city_name = companySheet[`H${rowPos}`]?.v
      const address_street = companySheet[`I${rowPos}`]?.v
      const address_house_number = companySheet[`J${rowPos}`]?.v
      const address_extra = companySheet[`K${rowPos}`]?.v
      const country_name = companySheet[`L${rowPos}`]?.v
      const contactdetails_email = companySheet[`M${rowPos}`]?.v
      const contactdetails_phone = companySheet[`N${rowPos}`]?.v
      const contactdetails_mobile = companySheet[`O${rowPos}`]?.v
      const contactdetails_fax = companySheet[`P${rowPos}`]?.v
      const companydetails_salestaxno = companySheet[`Q${rowPos}`]?.v
      const companydetails_commercialregisterno = companySheet[`R${rowPos}`]?.v
      const companydetails_website = companySheet[`S${rowPos}`]?.v
      const bankdata_iban = companySheet[`T${rowPos}`]?.v
      const bankdata_bic = companySheet[`U${rowPos}`]?.v
      const bankdata_bank_name = companySheet[`V${rowPos}`]?.v

      // Create company

      let customergroup = await api({
        entity: 'customergroup',
        action: 'read-rich',
        filter: { 'customergroup_name': customergroup_name },
      })

      const companydetails = await api({
        entity: 'companydetails',
        action: 'read-rich',
        filter: { 'companydetails_commercialregisterno': companydetails_commercialregisterno },
      })

      const contactdetails = await api({
        entity: 'contactdetails',
        action: 'create',
        data: [{
          contactdetails_mobile,
          contactdetails_fax,
          contactdetails_phone,
          contactdetails_email
        }],
      })

      const companyEntity = {
        company_name: companyName,
        company_shortname,
        company_template_coverletter_subject,
        company_template_coverletter_text
      }

      const companyresponse = await api({
        entity: 'company',
        action: 'create',
        data: [companyEntity]
      })

      const companyId = companyresponse.data.data.data[0][0].company_id

      // Relations


      // If partner group doesnt exist, create a new
      if (customergroup.data.data.data.length == 0) {
        customergroup = await api({
          entity: 'customergroup',
          action: 'create',
          data: [{
            customergroup_name: customergroup_name,
            customergroup_description: 'Description here',
          }],
        })
      }

      await api({
        entity: 'customergroup_company_rel',
        action: 'create',
        data: [{
          company_id: companyId,
          customergroup_id: customergroup.data.data.data[0].customergroup_id != undefined ? customergroup.data.data.data[0].customergroup_id : customergroup.data.data.data[0][0].customergroup_id
        }]
      })

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

      const company_contactdetails_rel_response = await api({
        entity: 'company_contactdetails_rel',
        action: 'create',
        data: [{
          contactdetails_id: contactdetails.data.data.data[0][0].contactdetails_id,
          company_id: companyId
        }]
      })

      // Bankdata

      const bankdataResponse = await api({
        entity: 'bankdata',
        action: 'create',
        data: [{
          bankdata_iban: bankdata_iban,
          bankdata_bic: bankdata_bic,
          bankdata_bank_name: bankdata_bank_name
        }]
      })

      const company_bankdata_rel_response = await api({
        entity: 'company_bankdata_rel',
        action: 'create',
        data: [{
          bankdata_id: bankdataResponse.data.data.data[0][0].bankdata_id,
          company_id: companyId
        }]
      })

      const address = {
        address_street,
        address_house_number,
        address_extra,
      }

      await createAddress('company', companyresponse.data.data.data[0][0].company_id, country_name, city_name, city_zip, address)
    }
  }
  else if (name === 'Pos') {
    const posSheet = workbook.Sheets['Pos']

    const range = XLSX.utils.decode_range(posSheet['!ref'])
    // get the number of rows entries
    const rowNumber = range.e.r - 5

    for (let i = 1; i <= rowNumber; i++) {
      const rowPos = i + 6

      const pos_name = posSheet[`B${rowPos}`]?.v
      const pos_branchnumber = posSheet[`C${rowPos}`]?.v
      const pos_name_external = posSheet[`D${rowPos}`]?.v
      const pos_first_year = posSheet[`E${rowPos}`]?.v
      const company_name = posSheet[`F${rowPos}`]?.v
      const tag_name = posSheet[`G${rowPos}`]?.v
      const tag_name2 = posSheet[`H${rowPos}`]?.v
      const tag_name3 = posSheet[`I${rowPos}`]?.v
      const tag_name4 = posSheet[`J${rowPos}`]?.v
      const tag_name5 = posSheet[`K${rowPos}`]?.v

      const posResponse = await api({
        entity: 'pos',
        action: 'create',
        data: [{
          pos_name: pos_name,
          pos_branchnumber: pos_branchnumber,
          pos_name_external: pos_name_external,
          pos_first_year: pos_first_year,
          pos_internal_id: '',
        }]
      })

      // Create company relation
      const company = await api({
        entity: 'company',
        action: 'read-rich',
        filter: { 'company_name': company_name }
      })

      await api({
        entity: 'company_pos_rel',
        action: 'create',
        data: [
          {
            company_id: company.data.data.data[0].company_id,
            pos_id: posResponse.data.data.data[0][0].pos_id
          }
        ]
      })

      // region Tags
      if (tag_name != undefined)
      {
        let tag = await api({
          entity: 'tag',
          action: 'read-rich',
          filter: { tag_name }
        })

        if (tag.data.data.data.length === 0)
        {
          tag = await api({
            entity: 'tag',
            action: 'create',
            data: [{
              tag_name: tag_name,
              tag_description: 'Description Here'
            }]
          })
        }

        await api({
          entity: 'pos_tag_rel',
          action: 'create',
          data: [{
            tag_id: tag.data.data.data[0].tag_id != undefined ? tag.data.data.data[0].tag_id : tag.data.data.data[0][0].tag_id,
            pos_id: posResponse.data.data.data[0][0].pos_id
          }]
        })
      }

      if (tag_name2 != undefined)
      {
        let tag = await api({
          entity: 'tag',
          action: 'read-rich',
          filter: { tag_name: tag_name2 }
        })

        if (tag.data.data.data.length === 0)
        {
          tag = await api({
            entity: 'tag',
            action: 'create',
            data: [{
              tag_name: tag_name2,
              tag_description: 'Description Here'
            }]
          })
        }

        await api({
          entity: 'pos_tag_rel',
          action: 'create',
          data: [{
            tag_id: tag.data.data.data[0].tag_id != undefined ? tag.data.data.data[0].tag_id : tag.data.data.data[0][0].tag_id,
            pos_id: posResponse.data.data.data[0][0].pos_id
          }]
        })
      }

      if (tag_name3 != undefined)
      {
        let tag = await api({
          entity: 'tag',
          action: 'read-rich',
          filter: { tag_name: tag_name3 }
        })

        if (tag.data.data.data.length === 0)
        {
          tag = await api({
            entity: 'tag',
            action: 'create',
            data: [{
              tag_name: tag_name3,
              tag_description: 'Description Here'
            }]
          })
        }

        await api({
          entity: 'pos_tag_rel',
          action: 'create',
          data: [{
            tag_id: tag.data.data.data[0].tag_id != undefined ? tag.data.data.data[0].tag_id : tag.data.data.data[0][0].tag_id,
            pos_id: posResponse.data.data.data[0][0].pos_id
          }]
        })
      }

      if (tag_name4 != undefined)
      {
        let tag = await api({
          entity: 'tag',
          action: 'read-rich',
          filter: { tag_name: tag_name4 }
        })

        if (tag.data.data.data.length === 0)
        {
          tag = await api({
            entity: 'tag',
            action: 'create',
            data: [{
              tag_name: tag_name4,
              tag_description: 'Description Here'
            }]
          })
        }

        await api({
          entity: 'pos_tag_rel',
          action: 'create',
          data: [{
            tag_id: tag.data.data.data[0].tag_id != undefined ? tag.data.data.data[0].tag_id : tag.data.data.data[0][0].tag_id,
            pos_id: posResponse.data.data.data[0][0].pos_id
          }]
        })
      }

      if (tag_name5 != undefined)
      {
        let tag = await api({
          entity: 'tag',
          action: 'read-rich',
          filter: { tag_name: tag_name5 }
        })

        if (tag.data.data.data.length === 0)
        {
          tag = await api({
            entity: 'tag',
            action: 'create',
            data: [{
              tag_name: tag_name5,
              tag_description: 'Description Here'
            }]
          })
        }

        await api({
          entity: 'pos_tag_rel',
          action: 'create',
          data: [{
            tag_id: tag.data.data.data[0].tag_id != undefined ? tag.data.data.data[0].tag_id : tag.data.data.data[0][0].tag_id,
            pos_id: posResponse.data.data.data[0][0].pos_id
          }]
        })
      }

      // end region
    }
  }
  else if (name === 'Area') {
    const areaSheet = workbook.Sheets['Area']

    const range = XLSX.utils.decode_range(areaSheet['!ref'])
    // get the number of rows entries
    const rowNumber = range.e.r - 5

    for (let i = 1; i <= rowNumber; i++) {
      const rowPos = i + 6

      const area_name = areaSheet[`B${rowPos}`]?.v
      const area_name_external = areaSheet[`C${rowPos}`]?.v
      const area_space_value = parseFloat((areaSheet[`D${rowPos}`]?.v).replace(',', '.')).toFixed(2)
      const location_name = areaSheet[`E${rowPos}`]?.v
      const usagetype_name = areaSheet[`F${rowPos}`]?.v
      const areatype_name = areaSheet[`G${rowPos}`]?.v
      const pos_name = areaSheet[`H${rowPos}`]?.v



      let location = await api({
        entity: 'location',
        action: 'read-rich',
        filter: { 'location_name': location_name }
      })

      // If location doesnt exist, create new
      if (location.data.data.data.length == 0) {
        location = await api({
          entity: 'location',
          action: 'create',
          data: [{
            location_name,
            location_description: 'Description here'
          }],
        })
      }

      let pos = await api({
        entity: 'pos',
        action: 'read-rich',
        filter: { 'pos_name': pos_name }
      })

      // If location doesnt exist, create new
      if (location.data.data.data.length == 0) continue

      let areatype = await api({
        entity: 'areatype',
        action: 'read-rich',
        filter: { 'areatype_name': areatype_name }
      })

      if (areatype.data.data.data.length === 0) {
        areatype = await api({
          entity: 'areatype',
          action: 'create',
          data: [{
            areatype_name,
            areatype_description: 'Description Here'
          }]
        })
      }

      let usagetype = await api({
        entity: 'usagetype',
        action: 'read-rich',
        filter: { 'usagetype_name': usagetype_name }
      })

      if (usagetype.data.data.data.length === 0) {
        usagetype = await api({
          entity: 'usagetype',
          action: 'create',
          data: [{
            usagetype_name,
            usagetype_description: 'Description Here',
          }]
        })
      }

      const areaResponse = await api({
        entity: 'area',
        action: 'create',
        data: [{
          area_name: area_name,
          area_name_external: area_name_external,
          area_space_value: area_space_value,
        }]
      })

      const area_id = areaResponse.data.data.data[0][0].area_id

      // relations

      // pos rel
      await api({
        entity: 'area_pos_rel',
        action: 'create',
        data: [{
          area_id,
          pos_id: pos.data.data.data[0].pos_id != undefined ? pos.data.data.data[0].pos_id : pos.data.data.data[0][0].pos_id
        }]
      })

      await api({
        entity: 'area_location_rel',
        action: 'create',
        data: [{
          location_id: location.data.data.data[0].location_id,
          area_id
        }]
      })

      await api({
        entity: 'area_areatype_rel',
        action: 'create',
        data: [{
          areatype_id: areatype.data.data.data[0].areatype_id != undefined ? areatype.data.data.data[0].areatype_id : areatype.data.data.data[0][0].areatype_id,
          area_id
        }]
      })

      await api({
        entity: 'area_usagetype_rel',
        action: 'create',
        data: [{
          usagetype_id: usagetype.data.data.data[0].usagetype_id != undefined ? usagetype.data.data.data[0].usagetype_id : usagetype.data.data.data[0][0].usagetype_id,
          area_id,
          area_usagetype_valid_from_date: '2022-05-24',
          area_usagetype_valid_to_date: '2024-05-24',
        }]
      })
    }
  }
  else if (name === 'Location') {
    const locationSheet = workbook.Sheets.Location

    const range = XLSX.utils.decode_range(locationSheet['!ref'])
    // get the number of rows entries
    const rowNumber = range.e.r - 5

    for (let i = 1; i <= rowNumber; i++) {
      const rowPos = i + 6

      const location_name = locationSheet[`B${rowPos}`]?.v
      const location_objectdescription = locationSheet[`C${rowPos}`]?.v
      const location_total_area = locationSheet[`D${rowPos}`]?.v
      const location_start_date = (locationSheet[`E${rowPos}`]?.w).replace('/', '-')
      const partnercompany_name_1 = locationSheet[`F${rowPos}`]?.v
      const partnercompany_name_2 = locationSheet[`G${rowPos}`]?.v
      const locationtype_name = locationSheet[`H${rowPos}`]?.v
      const city_name = locationSheet[`I${rowPos}`]?.v
      const address_street = locationSheet[`J${rowPos}`]?.v
      const address_house_number = locationSheet[`K${rowPos}`]?.v
      const address_extra = locationSheet[`L${rowPos}`]?.v
      const city_zip = locationSheet[`M${rowPos}`]?.v
      const country_name = locationSheet[`N${rowPos}`]?.v

      //------------

      let locationtype = await api({
        entity: 'locationtype',
        action: 'read-rich',
        filter: { 'locationtype_name': locationtype_name },
      })

      // If locationtype doesnt exist, create new
      if (locationtype.data.data.data.length == 0) {
        locationtype = await api({
          entity: 'locationtype',
          action: 'create',
          data: [{
            locationtype_name,
            locationtype_description: 'Description here'
          }],
        })
      }

      const locationResponse = await api({
        entity: 'location',
        action: 'create',
        data: [{
          location_objectdescription: location_objectdescription,
          location_name: location_name,
          location_total_area: location_total_area,
          location_start_date: location_start_date
        }]
      })

      // Relations
      // Create location_locationtype_rel

      await api({
        entity: 'location_locationtype_rel',
        action: 'create',
        data: [{
          location_id: locationResponse.data.data.data[0][0].location_id,
          locationtype_id: locationtype.data.data.data[0].locationtype_id != undefined ? locationtype.data.data.data[0].locationtype_id : locationtype.data.data.data[0][0].locationtype_id
        }]
      })

      // Create partnercompanies rel

      if (partnercompany_name_1 != undefined) {

        let partnercompany = await api({
          entity: 'partnercompany',
          action: 'read-rich',
          filter: { 'partnercompany_name': partnercompany_name_1 }
        })

        // If partner companies dont exist, create new
        if (partnercompany.data.data.data.length == 0) {
          partnercompany = await api({
            entity: 'partnercompany',
            action: 'create',
            data: [{
              partnercompany_name: partnercompany_name_1,
            }],
          })
        }

        // Search partner type Ids
        const owner = await api({
          entity: 'partnertype',
          action: 'read-rich',
          filter: { partnertype_name: 'Owner (Type 1)' }
        })

        await api({
          entity: ' location_partnercompany_partnertype_rel',
          action: 'create',
          data: [{
            location_id: locationResponse.data.data.data[0][0].location_id,
            partnercompany_id: partnercompany.data.data.data[0].partnercompany_id != undefined ? partnercompany.data.data.data[0].partnercompany_id : partnercompany.data.data.data[0][0].partnercompany_id,
            partnertype_id: owner.data.data.data[0].partnertype_id
          }]
        })
      }

      if (partnercompany_name_2 != undefined) {

        let partnercompany_manager = await api({
          entity: 'partnercompany',
          action: 'read-rich',
          filter: { 'partnercompany_name': partnercompany_name_2 }
        })

        if (partnercompany_manager.data.data.data.length == 0) {
          partnercompany_manager = await api({
            entity: 'partnercompany',
            action: 'create',
            data: [{
              partnercompany_name: partnercompany_name_2,
            }],
          })
        }

        const manager = await api({
          entity: 'partnertype',
          action: 'read-rich',
          filter: { partnertype_name: 'Property Manager (Type 2)' }
        })

        await api({
          entity: ' location_partnercompany_partnertype_rel',
          action: 'create',
          data: [{
            location_id: locationResponse.data.data.data[0][0].location_id,
            partnercompany_id: partnercompany_manager.data.data.data[0].partnercompany_id != undefined ? partnercompany_manager.data.data.data[0].partnercompany_id : partnercompany_manager.data.data.data[0][0].partnercompany_id,
            partnertype_id: manager.data.data.data[0].partnertype_id
          }]
        })
      }

      const address = {
        address_street,
        address_house_number,
        address_extra
      }

      await createAddress("location", locationResponse.data.data.data[0][0].location_id, country_name, city_name, city_zip, address)

    }
  }
})

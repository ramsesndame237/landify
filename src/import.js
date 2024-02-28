/* eslint-disable */
async function importPartnercompany(a, data) {

  // eslint-disable-next-line no-param-reassign
  let rapport = a.result.find(x => x.Table === 'Partner Company')

  const start = 7
  const end = data.length
  rapport.Imported = 0

  let err = a.errors.find(x => x.Table === 'Partner Company').errors

  // Get variables
  for (let i = start; i < end; i++) {
    const partnercompany_name = data[i][1] ?? ""
    const partnercompany_shortname = data[i][2] ?? ""
    const partnergroup_name = data[i][3] ?? ""
    const city_Zip = data[i][4] ?? ""
    const city_name = data[i][5] ?? ""
    const address_street = data[i][6] ?? ""
    const address_house_number = data[i][7] ?? ""
    const address_extra = data[i][8] ?? ""
    const country_name = data[i][9] ?? ""
    const contactdetails_email = data[i][10] ?? ""
    const contactdetails_phone = data[i][11] ?? ""
    const contactdetails_mobile = data[i][12] ?? ""
    const contactdetails_fax = data[i][13] ?? ""
    const companydetails_salestaxno = data[i][14] ?? ""
    const companydetails_commercialregisterno = data[i][15] ?? ""
    const companydetails_website = data[i][16] ?? ""

    console.log(`imported ${i - start + 1} partnercompany`)
    rapport.Imported++

    let success = true

    // Get partnergroup
    let partnergroup = await a.$api({
      entity: 'partnergroup',
      action: 'read-rich',
      data: [{ partnergroup_name }]
    })

    // Check if the Partner Group exists
    if (partnergroup.data.data.data.length === 0) {
      // Create a new one
      partnergroup = await a.$api({
        entity: 'partnergroup',
        action: 'create',
        data: [{
          partnergroup_name,
          partnergroup_description: 'Description Here'
        }]
      })
      // We Cannot create a partner company without its group
      // so if we have an error in the creation, we have an error
      if (partnergroup.data.data.data[0].length === 0) {
        rapport.Failed++
        pushErrors(partnergroup, err, i + 1)
        continue
      }
    }

    // Check if partnercompany exists
    let partnercompany = await a.$api({
      entity: 'partnercompany',
      action: 'read-rich',
      data: [{ partnercompany_name }]
    })

    // If the partnercompany already exists
    if (partnercompany.data.data.data.length > 0) {
      rapport.Updated++
      continue
    }
    else {
        // Create partnercompany
      partnercompany = await a.$api({
        entity: 'partnercompany',
        action: 'create',
        data: [{
          partnercompany_name,
          partnercompany_shortname
        }]
      })

      rapport.Created++

      // Create partnergroup relation
      await a.$api({
        entity: 'partnercompany_partnergroup_rel',
        action: 'create',
        data: [{
          partnercompany_id: partnercompany.data.data.data[0][0].partnercompany_id,
          partnergroup_id: partnergroup.data.data.data[0].partnergroup_id !== undefined ? partnergroup.data.data.data[0].partnergroup_id : partnergroup.data.data.data[0][0].partnergroup_id
        }]
      })

      // Create contactdetails
      await createContactDetails(a, 'partnercompany', partnercompany.data.data.data[0][0].partnercompany_id, {
        contactdetails_email,
        contactdetails_phone,
        contactdetails_mobile,
        contactdetails_fax
      }, rapport, i, success, err)

      // Create Company Details
      createCompanyDetails(a, 'partnercompany', partnercompany.data.data.data[0][0].partnercompany_id, {
        companydetails_website,
        companydetails_commercialregisterno,
        companydetails_salestaxno
      }, rapport, i, success, err)

      // Create address informations
      await createAddress(a, 'partnercompany', partnercompany.data.data.data[0][0].partnercompany_id, country_name, city_name, city_Zip, {
        address_extra,
        address_street,
        address_house_number
      }, rapport, i, success, err)

      if (success) rapport.Success++
    }
  }
}

async function importCompany(a, data) {
  // eslint-disable-next-line no-param-reassign

  let rapport = a.result.find(x => x.Table === 'Company')

  let e = a.errors.find(x => x.Table === 'Company').errors

  const start = 7
  const end = data.length
  rapport.Imported = 0

  console.log('Starting import Companies...')

  // Get variables
  for (let i = start; i < end; i++) {
    const company_name = data[i][1] ?? ""
    const company_shortname = data[i][2] ?? ""
    const customergroup_name = data[i][3] ?? ""
    const company_template_coverletter_subject = data[i][4] ?? ""
    const company_template_coverletter_text = data[i][5] ?? ""
    const city_zip = data[i][6] ?? ""
    const city_name = data[i][7] ?? ""
    const address_street = data[i][8] ?? ""
    const address_house_number = data[i][9] ?? ""
    const address_extra = data[i][10] ?? ""
    const country_name = data[i][11] ?? ""
    const contactdetails_email = data[i][12] ?? ""
    const contactdetails_phone = data[i][13] ?? ""
    const contactdetails_mobile = data[i][14] ?? ""
    const contactdetails_fax = data[i][15] ?? ""
    const companydetails_salestaxno = data[i][16] ?? ""
    const companydetails_commercialregisterno = data[i][17] ?? ""
    const companydetails_website = data[i][18] ?? ""
    const bankdata_iban = data[i][19] ?? ""
    const bankdata_bic = data[i][20] ?? ""
    const bankdata_name = data[i][21] ?? ""
    const payment_date = data[i][22] ?? ""
    const payment_debitor = data[i][23] ?? ""
    const payment_info = data[i][24] ?? ""
    const payment_objectreference = data[i][25] ?? ""
    const payment_type = data[i][26] ?? ""
    const payment_value = data[i][27] ?? ""


    console.log(`imported ${i - start + 1} Company`)

    let success = true
    rapport.Imported++

    // Get customer group
    let customergroup = await a.$api({
      entity: 'customergroup',
      action: 'read-rich',
      data: [{ customergroup_name }]
    })

    if (customergroup.data.data.data.length === 0) {
      customergroup = await a.$api({
        entity: 'customergroup',
        action: 'create',
        data: [{
          customergroup_name,
          customergroup_description: 'Description Here'
        }]
      })


      // We Cannot create a partner company without its group
      // so if we have an error in the creation, we have an error
      if (customergroup.data.data.data[0].length === 0) {
        rapport.Failed++
        pushErrors(customergroup, e, i + 1)
        success = false
        continue
      }
    }

    // Create company
    const company = await a.$api({
      entity: 'company',
      action: 'create',
      data: [{
        company_name,
        company_shortname,
        company_template_coverletter_subject,
        company_template_coverletter_text
      }]
    })

    // If error exit
    if (company.data.data.data[0].length === 0) {
      rapport.Failed++
      pushErrors(company, e, i + 1)
      continue
    }

    rapport.Created++

    // Bank datas
    const bankdata = await a.$api({
      entity: 'bankdata',
      action: 'create',
      data: [{
        bankdata_bic,
        bankdata_name,
        bankdata_iban
      }]
    })

    if (bankdata.data.data.data[0].length > 0) {
      // Create bankdata relation
      await a.$api({
        entity: 'company_bankdata_rel',
        action: 'create',
        data: [{
          bankdata_id: bankdata.data.data.data[0][0].bankdata_id,
          company_id: company.data.data.data[0][0].company_id
        }]
      })
    }
    else {
      rapport.Error++
      success = false
      pushErrors(bankdata, e, i + 1)
    }

    // Payment infos
    const payment = await a.$api({
      entity: 'payment',
      action: 'create',
      data: [{
        payment_date,
        payment_info,
        payment_type,
        payment_debitor,
        payment_objectreference,
        payment_value
      }]
    })

    if (payment.data.data.data[0].length > 0) {
      // Create payment relation
      await a.$api({
        entity: 'company_payment_rel',
        action: 'create',
        data: [{
          payment_id: bankdata.data.data.data[0][0].payment_id,
          company_id: company.data.data.data[0][0].company_id
        }]
      })
    }
    else {
      rapport.Error++
      success = false
      pushErrors(payment, e, i + 1)
    }

    // Create address
    await createAddress(a, 'company', company.data.data.data[0][0].company_id, country_name, city_name, city_zip, {
      address_extra,
      address_street,
      address_house_number
    }, rapport, i, success, e)


    // Create contact details
    await createContactDetails(a, 'company', company.data.data.data[0][0].company_id, {
      contactdetails_phone,
      contactdetails_mobile,
      contactdetails_fax,
      contactdetails_email
    }, rapport, i, success, e)

    // Create company details
    await createCompanyDetails(a, 'company', company.data.data.data[0][0].company_id, {
      companydetails_website,
      companydetails_commercialregisterno,
      companydetails_salestaxno
    }, rapport, i, success, e)

    if (success) rapport.Success++
  }
}

async function importContactPerson(a, data) {
  // eslint-disable-next-line no-param-reassign

  let rapport = a.result.find(x => x.Table === 'Contact Person')

  let e = a.errors.find(x => x.Table === 'Contact Person').errors

  const start = 7
  const end = data.length
  rapport.Imported = 0

  console.log('Starting import Contact person...')

  // Get variables
  for (let i = start; i < end; i++) {
    const contactperson_firstname = data[i][1] ?? ""
    const contactperson_lastname = data[i][2] ?? ""
    const contactperson_department = data[i][3] ?? ""
    const contactperson_function = data[i][4] ?? ""
    const user_email = data[i][5] ?? ""
    const contactdetails_email = data[i][6] ?? ""
    const contactdetails_phone = data[i][7] ?? ""
    const contactdetails_mobile = data[i][8] ?? ""
    const contactdetails_fax = data[i][9] ?? ""
    const company_name = data[i][10] ?? ""
    const customergroup_name = data[i][11] ?? ""
    const partnercompany_name = data[i][12] ?? ""
    const city_name = data[i][13] ?? ""
    const address_street = data[i][14] ?? ""
    const address_house_number = data[i][15] ?? ""
    const address_extra = data[i][16] ?? ""
    const contactsalutation_name = data[i][17] ?? ""
    const contacttitle_name = data[i][18] ?? ""
    const city_zip = data[i][19] ?? ""
    const country_name = data[i][20] ?? ""

    rapport.Imported++
    let success = true


      // Create contact person
      const contactperson = await a.$api({
        entity: 'contactperson',
        action: 'create',
        data: [{
          contactperson_firstname,
          contactperson_lastname,
          contactperson_department,
          contactperson_function,
        }]
      })

      // Exit if error
      if (contactperson.data.data.data[0].length === 0) {
        pushErrors(contactperson, e, i + 1)
        rapport.Error++
        success = false
        continue
      }

    // Get user
    const user = await a.$api({
      entity: 'user',
      action: 'read-rich',
      data: [{ user_email }]
    })

    if (user.data.data.data.length === 0) {
      e.push(`Line ${i + 1} - User doesnt exist`)
      rapport.Failed++
    }else {

      // Create user relation
      const userRel = await a.$api({
        entity: 'contactperson_user_rel',
        action: 'create',
        data: [{
          user_id: user.data.data.data[0].user_id,
          contactperson_id: contactperson.data.data.data[0][0].contactperson_id
        }]
      })

      if (userRel.data.data.data[0].length === 0) {
        rapport.Failed++
        success = false
        pushErrors(userRel, e, i + 1)
        continue
      }
    }

    // Get contact salutation
    const contactsalutation = await a.$api({
      entity: 'contactsalutation',
      action: 'read-rich',
      data: [{ contactsalutation_name }]
    })

    if (contactsalutation.data.data.data.length === 0) {
      e.push(`Line ${i + 1} - contact salutation doesnt exist`)
      success = false
      rapport.Error++
    }
    else {
      // Create relation
      await a.$api({
        entity: 'contactperson_contactsalutation_rel',
        action: 'create',
        data: [{
          contactperson_id: contactperson.data.data.data[0][0].contactperson_id,
          contactsalutation_id: contactsalutation.data.data.data[0].contactsalutation_id
        }]
      })
    }

    // Get contact title
    const contacttitle = await a.$api({
      entity: 'contacttitle',
      action: 'read-rich',
      data: [{ contacttitle_name }]
    })

    if (contacttitle.data.data.data.length === 0) {
      e.push(`Line ${i + 1} - contacttitle doesnt exist`)
      success = false
      rapport.Error++
    }
    else {
      // Create relation
      await a.$api({
        entity: 'contactperson_contacttitle_rel',
        action: 'create',
        data: [{
          contactperson_id: contactperson.data.data.data[0][0].contactperson_id,
          contacttitle_id: contacttitle.data.data.data[0].contacttitle_id
        }]
      })
    }

    // Get company
    const company = await a.$api({
      entity: 'company',
      action: 'read-rich',
      data: [{ company_name }]
    })

    if (company.data.data.data.length === 0) {
      e.push(` Line ${i + 1} - Error, Company doesn't exist`)
      success = false
      rapport.Error++
    }
    else {
      // Create relation
      await a.$api({
        entity: 'contactperson_company_rel',
        action: 'create',
        data: [{
          contactperson_id: contactperson.data.data.data[0][0].contactperson_id,
          company_id: company.data.data.data[0].company_id
        }]
      })
    }

    // Get partnercompany
    const partnercompany = await a.$api({
      entity: 'partnercompany',
      action: 'read-rich',
      data: [{ partnercompany_name }]
    })

    if (partnercompany.data.data.data.length === 0) {
      e.push(` Line ${i + 1} - Error, Partner Company doesn't exist`)
      success = false
      rapport.Error++
    }
    else {
      // Create relation
      await a.$api({
        entity: 'contactperson_partnercompany_rel',
        action: 'create',
        data: [{
          contactperson_id: contactperson.data.data.data[0][0].contactperson_id,
          partnercompany_id: partnercompany.data.data.data[0].partnercompany_id
        }]
      })
    }

    // Get customergroup
    const customergroup = await a.$api({
      entity: 'customergroup',
      action: 'read-rich',
      data: [{ customergroup_name }]
    })

    if (customergroup.data.data.data.length === 0) {
      e.push(` Line ${i + 1} - Error, Customergroup name doesn't exist`)
      success = false
      rapport.Error++
    }
    else {
      // Create relation
      await a.$api({
        entity: 'contactperson_customergroup_rel',
        action: 'create',
        data: [{
          contactperson_id: contactperson.data.data.data[0][0].contactperson_id,
          customergroup_id: customergroup.data.data.data[0].customergroup_id
        }]
      })
    }

    // Create contactdetails
    await createContactDetails(a, 'contactperson', contactperson.data.data.data[0][0].contactperson_id, {
      contactdetails_email,
      contactdetails_phone,
      contactdetails_mobile,
      contactdetails_fax
    }, rapport, i, success, e)

    // Create address
    await createAddress(a, 'contactperson', contactperson.data.data.data[0][0].contactperson_id, country_name, city_name, city_zip, {
      address_extra,
      address_street,
      address_house_number
    }, rapport, i, success, e)

    if (success) rapport.Success++
  }data.length}

async function importLocation(a, data) {
  // eslint-disable-next-line no-param-reassign

  let rapport = a.result.find(x => x.Table === 'Location')

  let e = a.errors.find(x => x.Table === 'Location').errors

  const start = 7
  const end = data.length
  rapport.Imported = 0

  console.log('Starting import Location...')

  // Get variables
  for (let i = start; i < end; i++) {
    const location_name = data[i][1] ?? ""
    const location_objectdescription = data[i][2] ?? ""
    const location_total_area = data[i][3] ?? ""
    const partnercompany_name = data[i][4] ?? ""
    const location_partnercompany_partnertype_valid_from_date = data[i][5] ?? ""
    const location_partnercompany_partnertype_valid_to_date = data[i][6] ?? ""
    const partnercompany_name2 = data[i][7] ?? ""
    const location_partnercompany_partnertype_valid_from_date2 = data[i][8] ?? ""
    const location_partnercompany_partnertype_valid_to_date2 = data[i][9] ?? ""
    const locationtype_name = data[i][10] ?? ""
    const city_name = data[i][11] ?? ""
    const address_street = data[i][12] ?? ""
    const address_house_number = data[i][13] ?? ""
    const address_extra = data[i][14] ?? ""
    const city_zip = data[i][15] ?? ""
    const country_name = data[i][16] ?? ""

    let success = true
    rapport.Imported++

    // Check if location_name exists
    let location = await a.$api({
      entity: 'location',
      action: 'read-rich',
      data: [{ location_name }]
    })

    if (location.data.data.data.length > 0) {
      rapport.Updated++
      rapport.Success++
      continue
    }

    // create new location
    location = await a.$api({
      entity: 'location',
      action: 'create',
      data: [{
        location_name,
        location_objectdescription,
        location_total_area
      }]
    })

    if (location.data.data.data[0].length === 0) {
      success = false
      rapport.Failed++
      pushErrors(location, e, i + 1)
      continue
    }

    rapport.Created++

    // Create the location's owner
    // get owner ID
    const owner = await a.$api({
      entity: 'partnercompany',
      action: 'read-rich',
      data: [{ partnercompany_name }]
    })

    if (owner.data.data.data.length === 0) {
      rapport.Error++
      success = false
      e.push(`${i + 1} - Error , partnercompany(owner) doesn't exist`)
    }
    else {
      // Get partnertype owner ID
      let ownertype = await a.$api({
        entity: 'partnertype',
        action: 'read-rich',
        filter: { partnertype_name: 'Owner' }
      })

      if (ownertype.data.data.data.length === 0) {
        rapport.Error++
        success = false
        e.push(`${i + 1} - Error , Make sure to create an ownertype 'Owner'`)
      }else{
        // Create relation
        await a.$api({
          entity: 'location_partnercompany_partnertype_rel',
          action: 'create',
          data: [{
            location_id: location.data.data.data[0][0].location_id,
            partnercompany_id: owner.data.data.data[0].partnercompany_id,
            partnertype_id: ownertype.data.data.data[0].partnertype_id,
            location_partnercompany_partnertype_valid_from_date: location_partnercompany_partnertype_valid_from_date,
            location_partnercompany_partnertype_valid_to_date: location_partnercompany_partnertype_valid_to_date
          }]
        })
      }
    }

    // Create the location's manager
    // get manager ID
    const manager = await a.$api({
      entity: 'partnercompany',
      action: 'read-rich',
      data: [{ partnercompany_name: partnercompany_name2 }]
    })

    if (manager.data.data.data.length === 0) {
      rapport.Error++
      success = false
      e.push(`${i + 1} - Error , partnercompany(manager) doesn't exist`)
    }
    else {
      // Get partnertype manager ID
      let managertype = await a.$api({
        entity: 'partnertype',
        action: 'read-rich',
        filter: { partnertype_name: 'Property Manager' }
      })

      if (managertype.data.data.data.length === 0) {
        rapport.Error++
        success = false
        e.push(`${i + 1} - Error , Make sure to create an managertype 'Property Manager'`)
      }else{
        // Create relation
        await a.$api({
          entity: 'location_partnercompany_partnertype_rel',
          action: 'create',
          data: [{
            location_id: location.data.data.data[0][0].location_id,
            partnercompany_id: manager.data.data.data[0].partnercompany_id,
            partnertype_id: managertype.data.data.data[0].partnertype_id,
            location_partnercompany_partnertype_valid_from_date: location_partnercompany_partnertype_valid_from_date2,
            location_partnercompany_partnertype_valid_to_date: location_partnercompany_partnertype_valid_to_date2
          }]
        })
      }
    }

    // Location type
    const locationtype = await a.$api({
      entity: 'locationtype',
      action: 'read-rich',
      data: [{ locationtype_name }]
    })

    if (locationtype.data.data.data.length === 0) {
      success = false
      rapport.Error++
      e.push(`${i + 1} - Error, location type doesnt exist`)
    }
    else {
      // Create relation
      await a.$api({
        entity: 'location_locationtype_rel',
        action: 'create',
        data: [{
          location_id: location.data.data.data[0][0].location_id,
          locationtype: locationtype.data.data.data[0].locationtype_id
        }]
      })
    }

    // Address infos
    await createAddress(a, 'location', location.data.data.data[0][0].location_id, country_name, city_name, city_zip, {
      address_extra,
      address_street,
      address_house_number
    }, rapport, i, success, e)

    if (success) rapport.Success++
  }
}

async function importPos(a, data) {
  // eslint-disable-next-line no-param-reassign

  let rapport = a.result.find(x => x.Table === 'Pos')

  let e = a.errors.find(x => x.Table === 'Pos').errors

  const start = 7
  const end = data.length
  rapport.Imported = 0

  console.log('Starting import Pos...')

  // Get variables
  for (let i = start; i < end; i++) {
    const pos_name = data[i][1] ?? ""
    const pos_branchnumber = data[i][2] ?? ""
    const pos_name_external = data[i][3] ?? ""
    const pos_first_year = data[i][4] ?? "2000"
    const company_name = data[i][5] ?? ""

    rapport.Imported++
    let success = true

    // Check if pos exist
    let pos = await a.$api({
      entity: 'pos',
      action: 'read-rich',
      data: [{ pos_name }]
    })

    if (pos.data.data.data.length > 0) {
      rapport.Updated++
      continue
    }
    else {
      pos = await a.$api({
        entity: 'pos',
        action: 'create',
        data: [{
          pos_name,
          pos_branchnumber,
          pos_name_external,
          pos_first_year
        }]
      })
    }

    if (pos.data.data.data[0].length === 0) {
      rapport.Failed++
      success = false
      pushErrors(pos, e, i + 1)
      continue
    }

    rapport.Created++

    // Get company
    const company = await a.$api({
      entity: 'company',
      action: 'read-rich',
      data: [{ company_name }]
    })

    // Create relation
    if (company.data.data.data.length === 0) {
      success = false
      rapport.Error++
      e.push(`${i + 1} - Error, company doesnt exist, pos create ID = ${pos.data.data.data[0][0].pos_id}`)
      console.log(pos.data.data)
    }else {
      await a.$api({
        entity: 'company_pos_rel',
        action: 'create',
        data: [{
          pos_id: pos.data.data.data[0][0].pos_id,
          company_id: company.data.data.data[0].company_id
        }]
      })
    }

    // Create tags
    for (let j = 6; j < data[i].length; j++) {
      const tag_name = data[i][j]

      if (tag_name === null) continue

      let tag = await a.$api({
        entity: 'tag',
        action: 'read-rich',
        data: [{ tag_name }]
      })

      if (tag.data.data.data.length === 0) {
        tag = await a.$api({
          entity: 'tag',
          action: 'create',
          data: [{ tag_name, tag_description: "description tag" }]
        })
      }

      // Create relation
      await a.$api({
        entity: 'pos_tag_rel',
        action: 'create',
        data: [{
          pos_id: pos.data.data.data[0][0].pos_id,
          tag_id: tag.data.data.data[0].tag_id !== undefined ? tag.data.data.data[0].tag_id : tag.data.data.data[0][0].tag_id
        }]
      })
    }

    if (success) rapport.Success++
  }data.length}

async function importArea(a, data) {

  // eslint-disable-next-line no-param-reassign
  let rapport = a.result.find(x => x.Table === 'Area')

  const start = 7
  const end = data.length
  rapport.Imported = 0

  let err = a.errors.find(x => x.Table === 'Area').errors

  // Get variables
  for (let i = start; i < end; i++) {
    const area_name = data[i][1] ?? ""
    const area_name_external = data[i][2] ?? ""
    const area_space_value = data[i][3] ?? ""
    const location_name = data[i][4] ?? ""
    const usagetype_name = data[i][5] ?? ""
    const areatype_name = data[i][6] ?? ""
    const pos_name = data[i][7] ?? ""
    const area_usagetype_valid_from_date  = data[i][8] ?? ""
    const area_usagetype_valid_to_date = data[i][9] ?? ""

    rapport.Imported++
    let success = true

    // Check if area_name already exists
    let area = await a.$api({
      entity: 'area',
      action: 'read-rich',
      data: [{ area_name }]
    })

    if (area.data.data.data.length > 0) {
      rapport.Updated++
      continue
    }

    // Create area
    area = await a.$api({
      entity: 'area',
      action: 'create',
      data: [{
        area_name,
        area_space_value,
        area_name_external
      }]
    })

    if (area.data.data.data[0].length === 0) {
      pushErrors(area, err, i + 1)
      success = false
      rapport.Failed++
      continue
    }

    rapport.Created++

    // Get location
    const location = await a.$api({
      entity: 'location',
      action: 'read-rich',
      data: [{ location_name }]
    })

    if (location.data.data.data.length === 0) {
      rapport.Error++
      success = false
      err.push(`${i + 1} - Error, location_name doesnt found`)
    }
    else {
      // Create relation
      await a.$api({
        entity: 'area_location_rel',
        action: 'create',
        data: [{
          location_id: location.data.data.data[0].location_id,
          area_id: area.data.data.data[0][0].area_id
        }]
      })
    }

    // Get pos
    const pos = await a.$api({
      entity: 'pos',
      action: 'read-rich',
      data: [{ pos_name }]
    })

    if (pos.data.data.data.length === 0) {
      rapport.Error++
      success = false
      err.push(`${i + 1} - Error, pos_name doesnt found`)
    }
    else {
      // Create relation
      await a.$api({
        entity: 'area_pos_rel',
        action: 'create',
        data: [{
          pos_id: pos.data.data.data[0].pos_id,
          area_id: area.data.data.data[0][0].area_id
        }]
      })
    }

    // Get areatype
    const areatype = await a.$api({
      entity: 'areatype',
      action: 'read-rich',
      data: [{ areatype_name }]
    })

    if (areatype.data.data.data.length === 0) {
      rapport.Error++
      success = false
      err.push(`${i + 1} - Error, areatype_name doesnt found`)
    }
    else {
      // Create relation
      await a.$api({
        entity: 'area_areatype_rel',
        action: 'create',
        data: [{
          areatype_id: areatype.data.data.data[0].areatype_id,
          area_id: area.data.data.data[0][0].area_id
        }]
      })
    }

    // Get usagetype
    const usagetype = await a.$api({
      entity: 'usagetype',
      action: 'read-rich',
      data: [{ usagetype_name }]
    })

    if (usagetype.data.data.data.length === 0) {
      rapport.Error++
      success = false
      err.push(`${i + 1} - Error, usagetype_name doesnt found`)
    }
    else {
      // Create relation
      await a.$api({
        entity: 'area_usagetype_rel',
        action: 'create',
        data: [{
          usagetype_id: usagetype.data.data.data[0].usagetype_id,
          area_id: area.data.data.data[0][0].area_id,
          area_usagetype_valid_from_date,
          area_usagetype_valid_to_date
        }]
      })
    }

    if (success) rapport.Success++
  }
}

async function createAddress(a, entity_name, entity_id, country_name, city_name, city_zip, address, rapport, row_id, success, err) {
  // Create address entity
  // If it is impossible to create address(or if address datas are invalid), return
  const addressEntity = await a.$api({
    entity: 'address',
    action: 'create',
    data: [address]
  })

  if (addressEntity.data.data.data[0].length === 0) {
    success = false
    pushErrors(addressEntity, err, row_id + 1)
    rapport.Error++
    return
  }

  // Get the country
  const country = await a.$api({
    entity: 'country',
    action: 'read-rich',
    filter: { 'country_name': country_name }
  })

  if (country.data.data.data.length === 0) {
    success = false
    err.push(`Line ${row_id + 1} - Country ${country_name} doesnt exist`)
    rapport.Error++
    return
  }

  // Create city
  const city = await a.$api({
    entity: 'city',
    action: 'create',
    data: [{
      city_name,
      city_zip
    }]
  })

  if (city.data.data.data[0].length === 0) {
    success = false
    pushErrors(city, err, row_id + 1)
    rapport.Error++
    return
  }

  // Relations

  // Create city country rel
  await a.$api({
    entity: 'city_country_rel',
    action: 'create',
    data: [{
      city_id: city.data.data.data[0][0].city_id,
      country_id: country.data.data.data[0].country_id
    }]
  })

  // Create entity address rel
  const entity_id_name = `${entity_name}_id`
  await a.$api({
    entity: entity_name + "_address_rel",
    action: 'create',
    data: [{
      [entity_id_name] : entity_id,
      address_id: addressEntity.data.data.data[0][0].address_id
    }],
  })

  // Create address city rel
  await a.$api({
    entity: 'address_city_rel',
    action: 'create',
    data: [{
      city_id: city.data.data.data[0][0].city_id,
      address_id: addressEntity.data.data.data[0][0].address_id,
    }]
  })
}
async function createContactDetails(context, entity_name, entity_id, contactdetailsInfos, rapport, row_id, success, err) {
  // Create contact details
  const contactdetails = await context.$api({
    entity: 'contactdetails',
    action: 'create',
    data: [{
      contactdetails_mobile: contactdetailsInfos.contactdetails_mobile,
      contactdetails_fax: contactdetailsInfos.contactdetails_fax,
      contactdetails_phone: contactdetailsInfos.contactdetails_phone,
      contactdetails_email: contactdetailsInfos.contactdetails_email
    }],
  })

  // Create Contact Details Relation
  const entity_id_name = `${entity_name}_id`
  if (contactdetails.data.data.data[0][0].contactdetails_id !== undefined) {
    await context.$api({
      entity: entity_name + "_contactdetails_rel",
      action: 'create',
      data: [{
        [entity_id_name]: entity_id,
        contactdetails_id: contactdetails.data.data.data[0][0].contactdetails_id
      }]
    })
  }
  else {
    rapport.Error++
    success = false
    pushErrors(contactdetails, err, row_id + 1)
    rapport.Error++
  }
}
async function createCompanyDetails(context, entity_name, entity_id, companydetailsInfos, rapport, row_id, success, err) {

  const companydetails = await context.$api({
    entity: 'companydetails',
    action: 'create',
    data: [{
      companydetails_commercialregisterno: companydetailsInfos.companydetails_commercialregisterno,
      companydetails_salestaxno: companydetailsInfos.companydetails_salestaxno,
      companydetails_website: companydetailsInfos.companydetails_website,
    }],
  })

  // Create Company Details Relation
  if (companydetails.data.data.data[0][0].companydetails_id !== undefined) {
    await context.$api({
      entity: 'partnercompany_companydetails_rel',
      action: 'create',
      data: [{
        partnercompany_id: entity_id,
        companydetails_id: companydetails.data.data.data[0][0].companydetails_id
      }]
    })
  }
  else {
    rapport.Error++
    success = false
    pushErrors(companydetails, err, row_id + 1)
    rapport.Error++
  }
}

function pushErrors(response, errors, idx) {
  errors.push(`Line ${idx} - ${response.data.data?.errors[0]['Failed executing sql']?.err}`)
}

function pushWarnings(response, warnings) {
  return response
}

export { importPartnercompany, importCompany, importContactPerson, importLocation, importPos, importArea }

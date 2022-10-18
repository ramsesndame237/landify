/* eslint-disable */
async function importPartnercompany(a, data, rapport) {

  // eslint-disable-next-line no-param-reassign
    const start = 26
  const end = data.length
  rapport.Imported = end - start

  // Get variables
  for (let i = start; i < end; i++) {
    const partnercompany_name = data[i][1]
    const partnercompany_shortname = data[i][2]
    const partnergroup_name = data[i][3]
    const city_Zip = data[i][4]
    const city_name = data[i][5]
    const address_street = data[i][6]
    const address_house_number = data[i][7]
    const address_extra = data[i][8]
    const country_name = data[i][9]
    const contactdetails_email = data[i][10]
    const contactdetails_phone = data[i][11]
    const contactdetails_mobile = data[i][12]
    const contactdetails_fax = data[i][13]
    const companydetails_salestaxno = data[i][14]
    const companydetails_commercialregisterno = data[i][15]
    const companydetails_website = data[i][16]

    // Get partnergroup
    console.log('Getting partnergroup by name')
    let partnergroup = await a.$api({
      entity: 'partnergroup',
      action: 'read-rich',
      filter: { partnergroup_name }
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
    }
    // We Cannot create a partner company without its group
    // so if we have an error in the creation, we have an error
    if (partnergroup.data.data.data.length === 0 && partnergroup.data.data.data[0][0].length === 0) {
      rapport.Failed++
      a.errors.push(`${i+1} - Error while creating partnergroup`)
      continue
    }

    // Check if partnercompany exists
    let partnercompany = await a.$api({
      entity: 'partnercompany',
      action: 'read-rich',
      data: [{ partnercompany_name }]
    })

    if (partnercompany.data.data.data.length > 0) {
      rapport.Updated++
      continue
    }

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

    // Create contact details
    const contactdetails = await a.$api({
      entity: 'contactdetails',
      action: 'create',
      data: [{
        contactdetails_mobile: contactdetails_mobile,
        contactdetails_fax: contactdetails_fax,
        contactdetails_phone: contactdetails_phone,
        contactdetails_email: contactdetails_email
      }],
    })

    // Create Contact Details Relation
    if (contactdetails.data.data.data[0][0].contactdetails_id !== undefined) {
      console.log('Contact details created, creating relation')
      await a.$api({
        entity: 'partnercompany_contactdetails_rel',
        action: 'create',
        data: [{
          partnercompany_id: partnercompany.data.data.data[0][0].partnercompany_id,
          contactdetails_id: contactdetails.data.data.data[0][0].contactdetails_id
        }]
      })
    }
    else {
      rapport.Error++
      a.errors.push(`${i} - Error while creating contact details`)
    }
    // Create Company Detail
    const companydetails = await a.$api({
      entity: 'companydetails',
      action: 'create',
      data: [{
        companydetails_commercialregisterno,
        companydetails_salestaxno,
        companydetails_website,
      }],
    })

    // Create Company Details Relation
    if (companydetails.data.data.data[0][0].companydetails_id !== undefined) {
      console.log('Company details created, creating relation')
      await a.$api({
        entity: 'partnercompany_companydetails_rel',
        action: 'create',
        data: [{
          partnercompany_id: partnercompany.data.data.data[0][0].partnercompany_id,
          companydetails_id: companydetails.data.data.data[0][0].companydetails_id
        }]
      })
    }
    else {
      rapport.Error++
      a.errors.push(`${i} - Error while creating company details`)
    }

    // Create address informations
    await createAddress(a, 'partnercompany', partnercompany.data.data.data[0][0].partnercompany_id, country_name, city_name, city_Zip, {
      address_extra,
      address_street,
      address_house_number
    }, rapport, i)

    if (a.errors.length === 0) rapport.Success++
  }

  a.currentStatus = 2
  rapport.Error += a.errors.length
  a.result.push(rapport)
}

function importCompany() {

}

async function createAddress(a, entity_name, entity_id, country_name, city_name, city_zip, address, rapport, row_id) {
  // Create address entity
  // If it is impossible to create address(or if address datas are invalid), return
  const addressEntity = await a.$api({
    entity: 'address',
    action: 'create',
    data: [address]
  })

  if (addressEntity.data.data.data[0].length === 0) {
    a.errors.push(`${row_id+1} - Error while creating address, check address's informations`)
    return
  }

  // Get the country
  const country = await a.$api({
    entity: 'country',
    action: 'read-rich',
    filter: { 'country_name': country_name }
  })

  if (country.data.data.data.length === 0) {
    a.errors.push([`Country ${country_name} doesnt exist`])
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
    a.errors.push(`${row_id} - Cannot create the city`)
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

export { importPartnercompany, importCompany }

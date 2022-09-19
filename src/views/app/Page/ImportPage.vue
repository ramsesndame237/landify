<template>
  <div class="">
    <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate>
        <h1>Upload A File</h1>
        <div class="dropbox">
          <input type="file" :name="uploadFieldName" :disabled="isSaving" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                 class="input-file" @change="currentStatus = 4; fileCount = $event.target.files.length; file = $event.target.files[0]"
          >
          <p v-if="isInitial">
            Drag your file here to begin<br> or click to browse
          </p>
          <p v-if="isCharged">
            File charged
          </p>
          <p v-if="isSaving" class="loader">
            <b-icon-arrow-repeat />
          </p>
          <div v-if="isSuccess" class="loader">
            <b-icon-check />
            <h4>done</h4>
          </div>
        </div>
        <div class="mt-2">
          <b-button
            variant="danger"
            @click="save(file)"
          >Upload</b-button>
        </div>
      </form>
      <div class="mt-5" v-if="result && currentStatus === 2">
        <b-table responsive="sm" :items="result"/>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { BButton, BIconArrowRepeat, BIconCheck, BTable } from 'bootstrap-vue'
import XLSX from 'xlsx'
import readXlsxFile from 'read-excel-file'

const STATUS_INITIAL = 0; const STATUS_SAVING = 1; const STATUS_SUCCESS = 2; const STATUS_FAILED = 3; const STATUS_CHARGED = 4
export default {
  name: 'ImportPage',
  components: {
    BButton,
    BIconArrowRepeat,
    BIconCheck,
    BTable,
  },
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'file',
      fileCount: 0,
      file: null,
      result: [],
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED
    },
    isCharged() {
      return this.currentStatus === STATUS_CHARGED
    },
  },
  mounted() {
    this.reset()
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    async save(file) {
      if (file == null) return

      this.currentStatus = STATUS_SAVING


      let rapport = {
        Table: 'Partner Company',
        Imported: 0,
        Success: 0,
        Error: 0,
        Failed: 0,
        Created: 0,
        Updated: 0
      }

      // Import Partner Comapnies
      readXlsxFile(file, { sheet: 'Partner Company' }).then(async data => {
        await create_partner_company(this, data, rapport)
      })
    },
    async upload(file) {
      if (file === null) return

      this.currentStatus = STATUS_SAVING

      // save the file
      const formData = new FormData()
      formData.append('file', file)

      const response = await this.$upload(formData)
        .then(data => {
          this.currentStatus = STATUS_SUCCESS
          this.result = data.data.data
        })

      console.log(response)
    },
  },
}
async function create_partner_company(a, data, rapport) {

  rapport.Imported = data.length - 7

  // Get variables
  for (let i = 7; i < 10; i++) {
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
      console.log('partnergroup doesnt exist, create')
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
      console.log('Error creating partnercompany')
      continue
    }

    // Check if partnercompany exists
    let partnercompany = await a.$api({
      entity: 'partnercompany',
      action: 'read-rich',
      filter: { partnercompany_name }
    })

    if (partnercompany.data.data.data.length > 0) {
      rapport.Updated++
      console.log('Updating partner company')
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
      console.log('Error while creating contact details relation')
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
      console.log('Error while creating company details relation')
    }

    // Create address informations
    await createAddress(a, 'partnercompany', partnercompany.data.data.data[0][0].partnercompany_id, country_name, city_name, city_Zip, {
      address_extra,
      address_street,
      address_house_number
    }, rapport)

    rapport.Success++
  }

  a.currentStatus = STATUS_SUCCESS
  a.result.push(rapport)
}

// Function to create address
async function createAddress(a, entity_name, entity_id, country_name, city_name, city_zip, address, rapport, entity_address_rel_name = null) {


  // Create address entity
  // If it is impossible to create address(or if address datas are invalid), return
  console.log('Creating address')
  const addressEntity = await a.$api({
    entity: 'address',
    action: 'create',
    data: [address]
  })

  console.log('address', addressEntity)

  if (addressEntity.data.data.data[0].length === 0) return

  // Get the country
  console.log('Get the country')
  const country = await a.$api({
    entity: 'country',
    action: 'read-rich',
    filter: { 'country_name': country_name }
  })

  console.log('country', country)

  if (country.data.data.data.length === 0) {
    console.log('Country doesnt exist')
    return
  }

  // Create city
  console.log('Create the city')
  const city = await a.$api({
    entity: 'city',
    action: 'create',
    data: [{
      city_name,
      city_zip
    }]
  })

  console.log('city', city)

  if (city.data.data.data[0].length === 0) {
    console.log('Error while creating city')
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
    entity: entity_address_rel_name ? entity_address_rel_name : entity_name + "_address_rel",
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
      address_id: addressEntity.data.data.data[0][0].address_id
    }]
  })
}
</script>

<style scoped lang="scss">
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

  .dropbox .loader {
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    padding: 70px 0;
  }

  .bi-arrow-repeat {
    -animation: spin .7s infinite linear;
    -webkit-animation: spin2 .7s infinite linear;
  }

  @-webkit-keyframes spin2 {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    from {
      transform: scale(1) rotate(0deg);
    }

    to {
      transform: scale(1) rotate(360deg);
    }
  }
</style>

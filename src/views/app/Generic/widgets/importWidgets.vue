<script>
import ticket from '@/table/tables/ticket'

const fields = {
  partnercompany: [
    'partnercompany_id',
    'partnercompany_name',
    'partnergroup_id',
    'address_street',
    'address_house_number',
    'city_zip',
    'city_name',
    'contactdetails_email',
  ],
  customergroup: ['customergroup_id', 'customergroup_name', 'customergroup_description'],
  partnergroup: ['partnergroup_id', 'partnergroup_name', 'partnergroup_is_internal', 'partnergroup_description'],
  tax_rates: [
    'tax_rate_id',
    'company_id',
    'code',
    'value',
  ],
  company: ['company_id', 'company_name', 'customergroup_id', 'company_shortname', 'company_buchungskreis',
  ],
  contactperson: ['contactperson_id', 'contactsalutation_id', 'contactperson_firstname', 'contactperson_lastname', 'contactdetails_email',
    'contactdetails_phone', 'company_id', 'partnercompany_id',
  ],
  bankdata: ['bankdata_id', 'partnercompany_id', 'bankdata_iban', 'iban_id', 'bankdata_bank_name'],
  kreditornumber: ['kreditornumber_id', 'partnercompany_id', 'company_id', 'kreditornumber'],
  location: ['address_street', 'address_house_number', 'address_extra', 'location_name',
    'location_objectdescription', 'location_total_area',
    'location_start_date', 'partnercompany_name',
    'location_partnercompany_partnertype_valid_from_date', 'location_partnercompany_partnertype_valid_to_date',
    'partnertype_name',
    'partnercompany_name',
    'location_partnercompany_partnertype_valid_from_date',
    'location_partnercompany_partnertype_valid_to_date',
    'partnertype_name',
    'locationtype_name',
    'country_name',
    'city_name',
    'city_zip',
  ],
  pos: ['pos_name', 'pos_branchnumber', 'pos_name_external', 'pos_first_year', 'company_name'],
  area: ['area_name', 'area_name_external', 'area_space_value', 'usagetype_name','area_usagetype_valid_from_date','area_usagetype_valid_to_date'],
}

export default {
  name: 'ImportWidgets',
  data: () => ({
    loading: false,
    success: false,
    uploadFieldName: 'file',
    fileCount: 0,
    file: null,
    errors: [],
    errorsCnt: 0,
    disabled: false,
    tables: [],
    result: null,
    selected: {},
    titles: {
      partner_companies: 'Partner Company',
      companies: 'Company',
      contact_persons: 'Contact Person',
      locations: 'Location',
      pos: 'Pos',
      areas: 'Area',
    },
    statusList: [
      {text: 'All', value: 'all'},
      {text: 'Added', value: 'added'},
      {text: 'Changed', value: 'changed'},
      {text: 'Unchanged', value: 'unchanged'},
      {text: 'Failed', value: 'failed'},
    ],
    status: 'all',
    importAll: false,
  }),
  computed: {
    routeName() {
      return this.$route.query.entity || this.$route.params.name
    },
    ticket() {
      return ticket
    },
    fields() {
      return {
        ...fields,
        contactperson: this.$route.query.from_detail
          ? ['contactperson_id', 'contactsalutation_id', 'contactperson_firstname', 'contactperson_lastname', 'contactdetails_email', 'contactdetails_phone']
          : fields.contactperson,
        bankdata: this.$route.query.from_detail
          ? ['bankdata_id', 'bankdata_iban', 'iban_id', 'bankdata_bank_name']
          : fields.bankdata,
        kreditornumber: this.$route.query.from_detail
          ? ['kreditornumber_id', 'company_id', 'kreditornumber']
          : fields.kreditornumber,
        tax_rates: this.$route.query.from_detail
          ? ['tax_rate_id', 'code', 'value']
          : fields.tax_rates,
      }
    },
  },
  watch: {
    status(newValue) {
      this.result = this.result.filter(x => x.status === newValue)
    },
  },
  methods: {
    onSelectChange(entity) {
      // this.result.forEach(row => {
      //   row.__selected = !row.__selected
      // })

      this.result = this.result.map(row => ({...row, __selected: !row.__selected}))
    },
    getResult() {
      console.log('this is the stat', [this.status, this.result])
      if (!this.status) return this.result
      return this.result.filter(row => row.status === this.status)
    },
    getSelected(entity) {
      return this.result.filter(row => row.__selected)
    },
    importData(all) {
      if (this.loading) return
      this.importAll = all
      this.loading = true
      let params
      const pk = this.$route.query.primary_key
      const pk_value = this.$route.query.primary_key_value
      if (pk && pk_value) {
        params = {
          [pk]: pk_value,
        }
      }
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('obj_in', JSON.stringify({
        lines: (all ? this.result : this.getSelected(this.currentEntity)).map(el => el.line),
      }))
      this.$http.post(`/synchronizations/${this.routeName === 'tax_rates' ? 'tax-rate' : this.routeName}/save`, formData, {
        headers: {
          'content-type': 'form-data',
        },
        params,
      })
        .then(({data}) => {
          this.$successToast('Import Done.')
          this.upload()

          // add __imported attribute to lines
        })
        .catch(e => {
          this.$errorToast('Something went wrong !!!')
        })
        .finally(() => this.loading = false)
    },

    async upload() {
      if (!this.file) return this.$errorToast('Please insert a file')
      if (!this.routeName) return this.$errorToast('Please select a table')
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('leaves', this.routeName)
      this.loading = true
      const routeName = this.routeName === 'tax_rates' ? 'tax-rate' : this.routeName
      this.$http.post(`/synchronizations/${routeName}/checking`, formData, {headers: {'content-type': 'form-data'}})
        .then(({data}) => {
          console.log({data})
          data = data.map(obj => {
            const missingKeys = this.fields[this.routeName].filter(key => !obj.columns.some(column => column.name === key))

            const newColumns = missingKeys.map(key => ({
              column: this.fields[this.routeName].indexOf(key) + 1,
              name: key,
              action: 'unchanged',
              new_value: '',
              old_value: '',
            }))

            const res = {
              ...obj,
              columns: [...obj.columns, ...newColumns]
                .filter(column => this.fields[this.routeName].includes(column.name))
                .sort((a, b) => (this.fields[this.routeName].indexOf(a.name) > this.fields[this.routeName].indexOf(b.name) ? 1 : -1)),
            }
            console.log({ res })
            return res
          })
          this.result = data.map(row => Object.assign(row, {
            show_old: false,
            __selected: false,
            status: row.columns.find(c => c.action === 'failed') ? 'failed' : row.columns.find(c => c.action === 'changed') ? 'changed' : row.columns.find(c => c.action === 'added') ? 'added' : 'unchanged'
          }))
          this.success = true
        })
        .catch(error => {
          console.log('this is the data', error)
          this.$errorToast('Server Error')
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<template>
  <div>
    <form enctype="multipart/form-data" novalidate>
      <h1>Upload A File for {{ $route.params.name }} </h1>
      <div class="dropbox">
        <input type="file" :name="uploadFieldName" :disabled="loading"
               accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
               class="input-file"
               @change="fileCount = $event.target.files.length; file = $event.target.files[0];uploadFieldName= $event.target.files[0].name">
        <p v-if="!file">
          Drag your file here to begin<br> or click to browse
        </p>
        <p v-if="file" style="font-size: 45px">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="#4db051"
                  d="M16 0H8C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6zm4 18H8V2h7v5h5zM4 4v18h16v2H4c-1.1 0-2-.9-2-2V4zm6 6v2h8v-2zm0 4v2h5v-2z"/>
          </svg>
          {{ uploadFieldName }}
        </p>
      </div>
      <div class="mt-2">
        <b-button variant="danger" :disabled="loading" @click="upload">
          Check File
          <b-spinner v-if="loading" small/>
        </b-button>
      </div>
    </form>
    <b-card v-if="result">
      <div class=" d-flex align-items-center ml-auto w-100 justify-content-end mb-2">
        <template v-if="['added','changed','all'].indexOf(status)>=0 && result.length>0">
          <b-button :disabled="loading" class="mr-1" variant="primary" @click="importData(true)">
            Import All
            <b-spinner v-if="loading && importAll" small/>
          </b-button>
          <b-button v-if="getSelected($route.params.name).length>0" :disabled="loading" class="mr-1" variant="primary"
                    @click="importData()">
            Import selected ({{ getSelected($route.params.name).length }})
            <b-spinner v-if="loading && !importAll" small/>
          </b-button>
        </template>
        <label class="mr-1">Status</label>
        <b-form-select v-model="status" :options="statusList" style="width: 100px"/>
      </div>
      <b-table-simple responsive class="table-responsive w-100" style="max-height: 70vh">
        <b-thead>
          <b-tr>
            <b-th>
              <b-form-checkbox v-model="selected[$route.params.name]" :disabled="disabled"
                               @change="onSelectChange($route.params.name)"/>
            </b-th>
            <b-th>Line</b-th>
            <b-th v-for="(field,i) in fields[$route.params.name]" :key="i">
              {{ $t('attribute.' + field) }}
            </b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-if="result.length===0">
            <b-td :colspan="3+fields[$route.params.name].length" class="text-center">
              No Data available
            </b-td>
          </b-tr>
          <template v-for="(row, i) in result">
            <b-tr :key="i">
              <b-td>
                <b-form-checkbox v-model="row.__selected" :disabled="disabled"/>
              </b-td>
              <b-td class="d-flex align-items-center cursor-pointer">
                <feather-icon :icon="row.show_old?'ChevronUpIcon':'ChevronDownIcon'"
                              size="20" @click="()=> row.show_old = !row.show_old"/>
                <span class="ml-1">{{ row.line }}</span>
              </b-td>
              <template v-for="(item,j) in row.columns">
                <b-td v-if="item" :key="`${i}-${j}`" :title="item.new_value"
                      :style="{color: item.action ==='failed' ? 'white' : 'inherit', background: item.action === 'changed' ? 'yellow':item.action ==='failed' ? 'red' :item.action ==='added' ? 'greenyellow' :'' }">
                  {{ item.name === 'partnergroup_is_internal' && item.new_value === 0 ? 'is external' : item.name === 'partnergroup_is_internal' && item.new_value === 1 ? 'is internal' : (item.reason || item.new_value) }}
                </b-td>
                <b-td v-else :key="`${i}-${j}`"/>
              </template>
            </b-tr>
            <!--                                  Old Values-->
            <b-tr v-if="row.show_old" :key="i+'n'" class="table-secondary">
              <b-td/>
              <b-td/>
              <b-td v-for="(column,j) in row.columns" :key="`${i}-${j}-n`">
                {{ column && column.name === 'partnergroup_is_internal' && column.old_value === 0 ? 'is external' : column && column.name === 'partnergroup_is_internal' && column.old_value === 1 ? 'is internal' : column ? column.old_value : '' }}
              </b-td>
            </b-tr>
          </template>

        </b-tbody>
      </b-table-simple>
    </b-card>
  </div>
</template>

<style scoped lang="scss">
.table, .table t-body th {
  font-size: 12px;
}

.table {
  outline: solid red;
}

.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 100px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 100px;
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
  //padding: 70px 0;
}
</style>

<template>
  <div class="">
    <!--UPLOAD-->
    <form v-if="!result" enctype="multipart/form-data" novalidate>
      <h1>Upload A File</h1>
      <div class="dropbox">
        <input type="file" :name="uploadFieldName" :disabled="loading"
               accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
               class="input-file" @change="fileCount = $event.target.files.length; file = $event.target.files[0]">
        <p v-if="!file">
          Drag your file here to begin<br> or click to browse
        </p>
        <p v-if="file">
          File charged
        </p>
      </div>
      <b-form-group class="mt-2" label="Tables to import">
        <b-form-checkbox-group v-model="tables"
                               :options="entities.map(entity => ({text: titles[entity], value: titles[entity]}))"/>
      </b-form-group>
      <div class="mt-2">
        <b-button variant="danger" :disabled="loading" @click="upload">
          Check File
          <b-spinner v-if="loading" small/>
        </b-button>
      </div>
    </form>
    <div v-else>
      <b-card>
        <b-tabs ref="tabs" :disabled="loading" pills v-model="activeTab">
          <b-tab v-for="(entity, index) in entities.filter(e => !!result[e])" :key="index" :title="titles[entity]"  >
            <b-table-simple class="table-responsive" style="max-height: 70vh">
              <b-thead>
                <b-tr>
                  <b-th>
                    <b-form-checkbox v-model="selected[entity]" :disabled="disabled" @change="onSelectChange(entity)"/>
                  </b-th>
                  <b-th>Line</b-th>
                  <b-th v-for="(field,i) in fields[entity]" :key="i">
                    {{ $t('attribute.' + field) }}
                  </b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-if="getResult(entity).length===0">
                  <b-td :colspan="3+fields[entity].length" class="text-center">
                    No Data available
                  </b-td>
                </b-tr>
                <template v-for="(row, i) in getResult(entity)">
                  <b-tr :key="i">
                    <b-td>
                      <b-form-checkbox v-model="row.__selected" :disabled="disabled"/>
                    </b-td>
                    <b-td class="d-flex align-items-center">
                      <feather-icon :icon="row.show_old?'ChevronUpIcon':'ChevronDownIcon'"
                                    size="20" @click="()=> row.show_old = !row.show_old"/>
                      <span class="ml-1">{{ row.line }}</span>
                    </b-td>
                    <template v-for="(column,j) in fields[entity]">
                      <b-td v-if="row[column]" :key="`${i}-${j}`" :title="row[column].reason"
                            :style="{background: row[column].color}">
                        {{ row[column].new_value }}
                      </b-td>
                      <b-td v-else :key="`${i}-${j}`"/>
                    </template>
                  </b-tr>
                  <!--                  Old Values-->
                  <b-tr v-if="row.show_old" :key="i+'n'" class="table-secondary">
                    <b-td/>
                    <b-td/>
                    <b-td v-for="(column,j) in fields[entity]" :key="`${i}-${j}-n`">
                      {{ row[column] ? row[column].old_value : '' }}
                    </b-td>
                  </b-tr>
                </template>

              </b-tbody>
            </b-table-simple>
          </b-tab>
          <template #tabs-end>
            <div class=" d-flex align-items-center ml-auto">
              <template v-if="['added','changed','all'].includes(status)">
                <b-button :disabled="loading" class="mr-1" variant="primary" @click="importData(true)">
                  Import All
                  <b-spinner v-if="loading && importAll" small/>
                </b-button>
                <b-button v-if="getSelected(entities[activeTab]).length>0" :disabled="loading" class="mr-1" variant="primary"
                          @click="importData()">
                  Import selected ({{ getSelected(entities[activeTab]).length }})
                  <b-spinner v-if="loading && !importAll" small/>
                </b-button>
              </template>
              <label class="mr-1">Status</label>
              <b-form-select v-model="status" :options="statusList" style="width: 100px"/>
            </div>
          </template>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { BButton, BIconArrowRepeat, BIconCheck, BTable, BCard, BTab, BTabs } from 'bootstrap-vue'
import { BCardActions } from '@core/components/b-card-actions'
import DataTables from "@/layouts/components/DataTables";

export default {
  name: 'ImportPage',
  components: {
    DataTables,
    BButton,
    BIconArrowRepeat,
    BIconCheck,
    BTable,
    BCard, BTab, BTabs,
    BCardActions,
  },
  data() {
    return {
      loading: false,
      success: false,
      uploadFieldName: 'file',
      fileCount: 0,
      file: null,
      errors: [],
      errorsCnt: 0,
      disabled: false,
      tables: [],
      activeTab:0,
      entities: [
        'partner_companies', 'companies', 'contact_persons', 'locations', 'pos', 'areas'
      ],
      titles: {
        'partner_companies': 'Partner Company',
        'companies': 'Company',
        'contact_persons': 'Contact Person',
        'locations': 'Location',
        'pos': 'Pos',
        'areas': 'Area'
      },
      selected: {},
      fields: {
        'partner_companies': [
          'partnercompany_name',
          'partnercompany_shortname',
          'partnergroup_name',
          'city_zip',
          'city_name',
          'address_street',
          'address_house_number',
          'address_extra',
          'country_name',
          'contactdetails_email',
          'contactdetails_phone',
          'contactdetails_mobile',
          'contactdetails_fax',
          // { key: 'contactdetails_salestaxno' },
          // { key: 'contactdetails_commercialregisterno' },
          // { key: 'contactdetails_website' },
        ],
        'companies': ['company_name', 'company_shortname', 'customergroup_name', 'company_template_coverletter_subject',
          'company_template_coverletter_text', 'city_zip', 'city_name', 'address_street', 'address_house_number',
          'address_extra', 'country_name', 'contactdetails_email', 'contactdetails_phone', 'contactdetails_mobile',
          'contactdetails_fax', 'companydetails_salestaxno', 'companydetails_commercialregisterno',
          'companydetails_website', 'bankdata_iban', 'bankdata_bic', 'bankdata_name', 'payment_date',
          'payment_debitor', 'payment_info', 'payment_objectreference', 'payment_type', 'payment_value'
        ],
        'contact_persons': ['contactperson_firstname', 'contactperson_lastname', 'contactperson_department',
          'contactperson_shortname', 'contactperson_function', 'user_email', 'contactdetails_email',
          'contactdetails_phone', 'contactdetails_mobile', 'contactdetails_fax', 'company_name', 'customergroup_name',
          'partnercompany_name', 'city_name', 'address_street', 'address_house_number', 'address_extra'
          , 'contactsalutation_name', 'contacttitle_name', 'city_zip', 'country_name'
        ],
        'locations': ['location_name', 'location_objectdescription', 'location_total_area', 'location_start_date',
          'partnercompany_name', 'location_partnercompany_partnertype_valid_from_date',
          'location_partnercompany_partnertype_valid_to_date', 'partnercompany_name',
          'location_partnercompany_partnertype_valid_from_date', 'location_partnercompany_partnertype_valid_to_date',
          'locationtype_name', 'city_name', 'address_street', 'address_house_number', 'address_extra', 'city_zip',
          'country_name'
        ],
        'pos': ['pos_name', 'pos_branchnumber', 'pos_name_external', 'pos_first_year', 'company_name', 'tag_name',],
        'areas': ['area_name', 'area_name_external', 'area_space_value', 'location_name', 'usagetype_name',
          'areatype_name', 'pos_name', 'area_usagetype_valid_from_date', 'area_usagetype_valid_to_date']
      },
      result: null,
      statusList: [
        { text: 'All', value: 'all' },
        { text: 'Added', value: 'added' },
        { text: 'Changed', value: 'changed' },
        { text: 'Unchanged', value: 'unchanged' },
        { text: 'Failed', value: 'failed' }
      ],
      status: 'all',
      importAll: false,
    }
  },
  computed: {
    currentEntity() {
      return this.entities.filter(e => !!this.result[e])[this.entities[this.activeTab]]
    }
  },

  mounted() {
    this.reset()
  },
  methods: {
    onSelectChange(entity) {
      this.result[entity].forEach(row => {
        row.__selected = !!this.selected[entity]
      })
    },
    getResult(entity) {
      if (!this.status || this.status === 'all') return this.result[entity]
      return this.result[entity]?.filter(row => row.status === this.status) || []
    },
    getSelected(entity) {
      return this.getResult(entity).filter(row => row.__selected)
    },
    getEntity(e) {
      return {
        ...e,
        ...e.columns.reduce((obj, c) => {
          obj[c.name] = c.new_value
          return obj
        }, {})
      }
    },
    getCount(entity, status) {
      const results = this.result[entity]
      if (!status) return results.length
      return results.filter(row => row.status === status).length
    },
    reset() {
      // reset form to initial state
      this.currentStatus = 0
      this.uploadedFiles = []
      this.uploadError = null
    },
    importData(all) {
      console.log("this is the entity", this.entities[this.activeTab])
      if (this.loading) return
      this.importAll = all
      this.loading = true
      const formData = new FormData
      formData.append('file', this.file)
      formData.append('leaves', JSON.stringify({
        data: [{
          leave: this.titles[this.entities[this.activeTab]],
          lines: (all ? this.getResult(this.entities[this.activeTab]) : this.getSelected(this.entities[this.activeTab])).map(el => el.line)
        }]
      }))
      this.$http.post('/provisionings/partnercompany/save', formData, { headers: { 'content-type': 'form-data' } })
        .then(({ data }) => {
          this.$successToast("Import Done.")
          // add __imported attribute to lines
        })
        .catch(e=>{
          this.$errorToast("Something went wrong !!!")
        })
        .finally(() => this.loading = false)
    },
    async upload() {
      if (!this.file) return this.$errorToast('Please insert a file')
      if (!this.tables.length) return this.$errorToast('Please select a table')
      const formData = new FormData
      formData.append('file', this.file)
      formData.append('leaves', this.tables)
      this.loading = true
      this.$http.post('/provisionings/partnercompany/checking', formData, { headers: { 'content-type': 'form-data' } })
        .then(({ data }) => {
          console.log(data)
          this.entities.forEach(function (entity) {
            if (!data.data[entity]) return
            data.data[entity].forEach(row => {
              row.__selected = false
              row.show_old = false
              // set status
              if (row.columns.find(c => c.action === 'failed')) row.status = 'failed'
              else if (row.columns.find(c => c.action === 'changed')) row.status = 'changed'
              else if (row.columns.find(c => c.action === 'added')) row.status = 'added'
              else row.status = 'unchanged'
              // set colors
              row.columns.forEach(column => {
                row[column.name] = column
                switch (column.action) {
                  case 'added':
                    column.color = 'greenyellow'
                    break
                  case 'changed':
                    column.color = 'yellow'
                    break
                  case 'failed':
                    column.color = 'red'
                }
              })
            })
          })
          this.result = data.data
          this.success = true
        })
        .catch(() => {
          this.$errorToast('Server Error')
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
}
</script>

<style scoped lang="scss">
.table, .table t-body th {
  font-size: 12px;
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

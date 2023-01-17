<template>
  <div class="">
    <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate>
        <h1>Upload A File</h1>
        <div class="dropbox">
          <input type="file" :name="uploadFieldName" :disabled="processing"
                 accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                 class="input-file" @change="fileCount = $event.target.files.length; file = $event.target.files[0]">
          <p v-if="!file">
            Drag your file here to begin<br> or click to browse </p>
          <p v-if="file">
            File charged </p>
          <p v-if="processing" class="loader">
            <b-icon-arrow-repeat/>
          </p>
          <div v-if="success" class="loader">
            <b-icon-check/>
            <h4>done</h4>
          </div>
        </div>
        <div class="mt-2">
          <b-button variant="danger" @click="upload(file)">Import</b-button>
        </div>
      </form>
      <div class="mt-5">
        <b-card v-if="success">
          <b-tabs ref="tabs" pills>
            <b-tab v-for="(entity, index) in entities" :key="index" :title="entity" lazy>
              <data-tables :entity="entity" :selectable="false" :with-actions="false" :fields="fields" :items="getResult(entity)"/>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { BButton, BIconArrowRepeat, BIconCheck, BTable, BCard, BTab, BTabs } from 'bootstrap-vue'
import { BCardActions } from '@core/components/b-card-actions'
import readXlsxFile from 'read-excel-file'
import { importPartnercompany, importCompany } from '@/import'
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
      processing: false,
      success: false,
      uploadFieldName: 'file',
      fileCount: 0,
      file: null,
      errors: [],
      errorsCnt: 0,
      entities: [
        'partner_companies', 'companies', 'contact_persons', 'locations', 'pos', 'areas'
      ],
      fields: [
        { key: 'id' },
        { key: 'name' },
        { key: 'status' },
      ],
      result: {},
    }
  },
  computed: {
  },
  mounted() {
    this.reset()
  },
  methods: {
    getResult(entity) {
      if (!this.result[entity]) return []
      return [
        ...this.result[entity].success.map(e => ({ ...e, status: 'success' })),
        ...this.result[entity].updated.map(e => ({ ...e, status: 'updated' })),
        ...this.result[entity].failed.map(e => ({ ...e, status: 'failed' })),
      ]
    },
    reset() {
      // reset form to initial state
      this.currentStatus = 0
      this.uploadedFiles = []
      this.uploadError = null
    },
    async upload(file) {
      if (!file) this.$errorToast('Please insert a file')
      const formData = new FormData
      formData.append('file', file)
      this.processing = true
      this.$http.post('provisionings/partnercompany', formData, { headers: { 'content-type': 'form-data' } })
        .then(({ data }) => {
          console.log(data)
          this.result = data.data.data
          this.success = true
        })
        .catch(() => {
          this.$errorToast('Server Error')
        })
        .finally(() => {
          this.processing = false
        })
    }
  },
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
  //padding: 70px 0;
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

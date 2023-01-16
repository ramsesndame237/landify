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
        <b-form-group class="mt-2" label="Table to import" >
          <b-form-radio-group v-model="table"
                              :options="['Partner Company','Company','Contact Person','Location','Pos','Area']"
                              name="radio-inline"/>
        </b-form-group>
        <div class="mt-2">
          <b-button
            variant="danger"
            @click="upload(file)"
          >Upload</b-button>
        </div>
      </form>
      <div v-if="result" class="mt-5">
        <b-table responsive="sm" :items="result" />
      </div>
      <h2 v-if="errors.length > 0" style="font-weight: 700" class="mt-5 mb-3">
        Errors
      </h2>
      <div v-for="(error, idx) in errors" :key="idx" class="errors">
        <div v-if="error.errors.length > 0" class="mb-3">
          <b-card-actions action-collapse collapsed :title="`${error.Table} - (${error.errors.length})`">
            <div v-for="(e, index) in error.errors" :key="index" style="color: red">
              {{ e }}
            </div>
          </b-card-actions>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { BButton, BIconArrowRepeat, BIconCheck, BTable, BCard } from 'bootstrap-vue'
import { BCardActions } from '@core/components/b-card-actions'
import readXlsxFile from 'read-excel-file'
import {
  importPartnercompany,
  importCompany,
  importContactPerson,
  importLocation,
  importPos,
  importArea
} from '@/import'

const STATUS_INITIAL = 0; const STATUS_SAVING = 1; const STATUS_SUCCESS = 2; const STATUS_FAILED = 3; const STATUS_CHARGED = 4
const stats = {
  Imported: 0,
  Success: 0,
  Error: 0,
  Failed: 0,
  Created: 0,
  Updated: 0
}
export default {
  name: 'ImportPage',
  components: {
    BButton,
    BIconArrowRepeat,
    BIconCheck,
    BTable,
    BCardActions,
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
      errors: [],
      errorsCnt: 0,
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
    async upload(file) {
      if (!this.table) return this.$errorToast('Please select a table')
      if (file == null) return this.$errorToast('Please insert a file')
      this.currentStatus = STATUS_SAVING

      // Import Partner Comapnies
      await readXlsxFile(file, { sheet: 'Partner Company' }).then(async data => {
        console.log(data.length)
        this.$successToast('Table Partner Company upload started.')
        this.result.push({Table: 'Partner Company', ...stats})
        this.errors.push({Table: 'Partner Company', errors: []})
        await importPartnercompany(this, data)
        this.$successToast('Table Partner Company upload finished')
      })

      // Import Companies
      await readXlsxFile(file, { sheet: 'Company' }).then(async data => {
        this.$successToast('Table Partner Company upload started')
        this.result.push({Table: 'Company', ...stats})
        this.errors.push({Table: 'Company', errors: []})
        await importCompany(this, data)
        this.$successToast('Table Company upload finished')
      })

      // Import Contact Person
      await readXlsxFile(file, { sheet: 'Contact Person' }).then(async data => {
        return
        this.result.push({Table: 'Contact Person', ...stats})
        this.errors.push({Table: 'Contact Person', errors: []})
        await importContactPerson(this, data)
      })

      // Import Location
      await readXlsxFile(file, { sheet: 'Location' }).then(async data => {
        return
        this.$successToast('Table Partner Company upload started')
        this.result.push({Table: 'Location', ...stats})
        this.errors.push({Table: 'Location', errors: []})
        await importLocation(this, data)
        this.$successToast('Table Location upload finished')
      })

      // Import Pos
      await readXlsxFile(file, { sheet: 'Pos' }).then(async data => {
        return
        this.$successToast('Table Partner Pos upload started')
        this.result.push({Table: 'Pos', ...stats})
        this.errors.push({Table: 'Pos', errors: []})
        await importPos(this, data)
        this.$successToast('Table Pos upload finished')
      })

      // Import Area
      await readXlsxFile(file, { sheet: 'Area' }).then(async data => {
        return
        this.$successToast('Table Partner Area upload started')
        this.result.push({Table: 'Area', ...stats})
        this.errors.push({Table: 'Area', errors: []})
        await importArea(this, data)
        this.$successToast('Table Area upload finished')
      })

      this.currentStatus = STATUS_SUCCESS
    },
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

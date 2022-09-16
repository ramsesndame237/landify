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
            @click="upload(file)"
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
import { BButton, BIconArrowRepeat, BIconCheck, BTable } from 'bootstrap-vue'

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
      result: null,
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

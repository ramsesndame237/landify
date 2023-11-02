<script>


import AutoCompleteInput from "@/components/AutoCompleteInput.vue";
import {BFormFile} from "bootstrap-vue";
import document from "src/store/modules/document-module";
import {mapActions} from "vuex";

export default {
  name: "AddOrUpdateDocumentsTicket",
  components: {AutoCompleteInput,BFormFile},
  props: {
    initialState: {
      type: Object,
      default: null
    },
    typeAddDocument: {
      type: String,
      default: 'ticket'
    }
  },
  data() {
    return {
      documentData: {
        documenttype_id: '',
        subdocumenttype_id: '',
        document_files: []
      },
      subdocumenttype: []
    }
  },
  computed: {
    state() {

    },
    documentType(){
      return this.$store.state.document.documentType || []
    },
    formatFileInputNames() {
      return this.documentData.document_files.length === 1 ? this.documentData.document_files[0].name : `${this.documentData.document_files.length} files selected`
    },
    invalidFeedback() {
      if (this.documentData.documenttype_id) {
        return 'Please select a type of the document'
      } else if (this.documentData.subdocumenttype_id) {
        return 'Please select a subtype document'
      } else if (this.documentData.document_files) {
        return 'Please upload a file'
      } else {
        return
      }
    }
  },
  methods: {
    ...mapActions('document-module',['fetchGetAllDocumentsTicket']),
    openModal(create, data, title) {
      this.initialData = data
      this.forceTitle = title
      this.create = create
      this.$refs.documentModalRef.show()
    },
    async updateFilesData(event, validate) {
      const selectedFiles = event.target.files

      // ensure that the selected file doesn't exit in the files data
      let index = -1
      for (const file in selectedFiles) {
        if (Object.hasOwnProperty.call(selectedFiles, file)) {
          index = this.files.findIndex(
            elt => elt.name === selectedFiles[file].name
              && elt.size === selectedFiles[file].size,
          )
          if (index === -1) {
            this.files.push(selectedFiles[file])
            // console.log('this.files: ', this.files)
          }
        }
      }
      await validate(this.files)
      this.formatFileInputNames()
    },
  },
  mounted() {
    this.fetchGetAllDocumentsTicket()
  }

}
</script>

<template>
  <b-modal id="documentModal" ref="documentModalRef" :title="initialState ? 'Update the document': 'Add new document'">
    <validation-observer ref="form" v-slot="{ passes }">

      <b-row>
        <b-col>
          <b-form-group
            id="fieldset-1"
            label="Choose the type"
            label-for="input-1"
            :invalid-feedback="invalidFeedback"
            :state="state"
          >
            <AutoCompleteInput
              :options="documenttype"
              key_value="documenttype_id"
              key-label="documenttype_name"
              icon_open="ChevronUpIcon"
              icon_close="ChevronDownIcon"
            />
          </b-form-group>
          <b-form-group
            id="fieldset-1"
            label="Choose the subtype"
            label-for="input-1"
            :invalid-feedback="invalidFeedback"
            :state="state"
          >
            <AutoCompleteInput
              :options="documentType"
              key_value="documenttype_id"
              key-label="documenttype_name"
              icon_open="ChevronUpIcon"
              icon_close="ChevronDownIcon"
              :disable="documentData.documenttype_id === ''"
            />
          </b-form-group>
          <b-form-group
            id="fieldset-1"
            label="Choose the subtype"
            label-for="input-1"
            :invalid-feedback="invalidFeedback"
            :state="state"
          >
            <b-form-file ref="file" type="file" placeholder="Choose a file or drop it here..."
                         drop-placeholder="Drop file here..."  required
                         :file-name-formatter="formatFileInputNames" @change="updateFilesData($event, validate)"/>
          </b-form-group>
        </b-col>
      </b-row>
    </validation-observer>
  </b-modal>

</template>

<style>

</style>

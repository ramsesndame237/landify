<script>
import DataTable from '@/views/app/CustomComponents/DataTable/DataTable.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import Table from '@/table'
import { getDocumentLink, getDocumentLinkPreview, getStampedDocumentLink } from '@/libs/utils'
import EditPageMixin from '@/views/app/Generic/EditPageMixin'
import TicketMixin from '@/views/app/Kanban/TicketMixin'
import { mapMutations } from 'vuex'

export default {
  name: 'DocumentsWidgetView',
  components: {
    GenericModal,
    DataTable,
  },
  mixins: [EditPageMixin, TicketMixin],
  props: {
    documents: Array,
    ticket_id: Number,
    column_has_stamp: Boolean,
  },
  data() {
    return {
      previewModalOpen: false,
      currentDoc: null,
      isCreate: true,
      initialState: {},
      columDataDocument: [
        {
          id: 'document_entry_time',
          key: 'document_entry_time',
          type: 'date',
          header: {
            name: 'datum',
          },
        },
        {
          id: 'document_name',
          key: 'document_name',
          header: {
            name: 'document name',
          },
        },
        {
          id: 'documenttype_id',
          key: 'documenttype_id',
          getValue: doc => (doc?.documenttype?.documenttype_name),
          header: {
            name: 'documenttype_id',
          },
        },
        {
          id: 'subdocumenttype_id',
          key: 'subdocumenttype_id',
          getValue: doc => (doc?.subdocumenttype?.documenttype_name),
          header: {
            name: 'subdocumenttype_id',
          },
        },
        {
          id: 'document_status',
          key: 'document_status',
          getValue: doc => (doc?.document_already_stamp ? 'Stamped' : 'Not stamp'),
          header: {
            name: 'status',
          },
        },
      ],
    }
  },
  computed: {
    documentDef() {
      return this.isCreate ? { ...Table.document, customRequest: Table.document.customRequestCreate } : Table.document
    },
  },
  watch: {
    currentDoc(val) {
      this.previewModalOpen = !!val
    },
    previewModalOpen(val) {
      if (!val) {
        this.currentDoc = null
      }
    },
  },
  methods: {
    previewDocument(document) {
      this.currentDoc = document
    },
    getDocumentLinkPreview,
    downloadDocument() {
      window.open(getDocumentLink(this.currentDoc))
    },
    createDocument() {
      this.isCreate = true
      console.log('this this the ticket id ', this.ticket_id)
      this.$refs.documentModal.openModal(true, { ticket_id: this.ticket_id })
    },
    deleteDocument() {
      console.log('this is the delete ')
    },
    stampDocument(document) {
      console.log('this is the document', document)
      this.$router.push({
        name: 'sign-document',
        params: { id: document.document_id, ticket_id: this.ticket_id, entity: document },
      })
    },
    editDocument(document) {
      this.isCreate = false
      this.definition.fields.filter(doc => !doc.hideOnForm && (this.create || !doc.hideOnUpdate) && (!this.create || !doc.hideOnCreate)).map((document_modified, k) => {
        document_modified.document_name = document.document_name
        document_modified.documenttype_id = document.documenttype_id
      })
      console.log('this is the document to edit', document, this.definition.fields)
      // const regex = new RegExp(/\.[^/.]+$/)

      let document_name = ''
      let document_extension = ''
      if (document.document_name) {
        const wordsArr = document.document_name.split('.')
        if (wordsArr.length <= 1) {
          document_name = document.document_name
        } else {
          document_name = wordsArr.filter((_, i) => i !== wordsArr.length - 1).join('.')
          document_extension = `.${wordsArr[wordsArr.length - 1]}`
        }
      }
      this.$refs.documentModal.openModal(false, {
        ticket_id: this.ticket_id,
        // documenttype_name: document.document_name.replace(regex, ''),
        document_name,
        documenttype_id: document.documenttype?.documenttype_id,
        subdocumenttype_id: document.subdocumenttype?.documenttype_id,
        document_id: document.document_id,
        document_extension,
      })
    },
    onStampClicked(document) {
      this.$router.push({
        path: `/app/preview/document?document_id=${document?.document_id || ''}`,
        params: { document, ticket_id: this.ticket_id },
      })
      this.$store.dispatch('document/createDocumentPreview',
        {
          document,
          ticket_id: this.ticket_id,
          col_stamp: this.column_has_stamp,
        })
      const stamp = document.document_already_stamp
      if (stamp) return getStampedDocumentLink(document)
      getDocumentLinkPreview(document)
    },
  },
}
</script>
<template>
  <div>
    <div>
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h4 class="font-weight-bolder">
          {{ $t('headline~ticket~documents') }}
        </h4>
        <div class="search-container">
          <div class="searchinput mr-3 d-flex">
            <!--          <input type="text">-->
            <!--          <div class="bg-primary mx-2 cursor-pointer d-flex align-items-center justify-content-center" style="width: 50px; height: 35px">-->
            <!--            <feather-icon icon="SearchIcon" size="25" class="text-white"/>-->
            <!--          </div>-->
            <!--          <div class="bg-primary cursor-pointer d-flex align-items-center justify-content-center" style="width: 50px; height: 35px">-->
            <!--            <feather-icon icon="DownloadIcon" size="25" class="text-white"/>-->
            <!--          </div>-->
          </div>
          <b-button variant="primary" @click="createDocument">
            {{ $t('button~newdocument') }}
          </b-button>
        </div>
      </div>
      <section>
        <DataTable ref="dataTableRef" :columns="columDataDocument" :url="`/tickets/documents?ticket_id=${ticket_id}`"
                   :on-details-click="previewDocument" hide-top-bar="true"
                   :on-update-click="editDocument"
                   :resolve-data="data =>data.data"
                   :custom-actions="$can('read', '/app/preview/document') ? [{icon:'FeatherIcon',onClick:onStampClicked, label:'Stamp'}] : []"/>
      </section>

    </div>

    <b-modal v-model="previewModalOpen" size="xl" hide-footer>
      <template #modal-header>
        <div class="d-flex justify-content-between align-items-center flex-grow-1">
          <h4 class="d-inline-block mr-1 mb-0">
            Document preview
          </h4>
          <div>
            <b-button variant="dark" class="mr-2" size="sm" @click="downloadDocument">
              <feather-icon icon="ArrowDownIcon" />
              Download
            </b-button>
            <b-button variant="light" size="sm" @click="previewModalOpen=false">
              <feather-icon icon="XIcon" />
            </b-button>
          </div>
        </div>
      </template>
      <iframe
        v-if="currentDoc"
        id="document-preview-iframe"
        title="Preview"
        :src="getDocumentLinkPreview(currentDoc)"
        width="100%"
        style="border: 0; height: 90vh;"
      />
    </b-modal>

    <generic-modal ref="documentModal" :fetch-data="false" table="document" :definition="documentDef"
                   table-definition-key="document" title="Update the document"
                   @reload-table="$refs.dataTableRef.getData()"/>
    <!--    <AddOrUpdateDocumentsTicket-->
    <!--    :initial-state="initialState"-->
    <!--    />-->
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/variables/variables";

.search-container {
  display: flex;

  .searchinput {
    flex-grow: 1;

    input {
      width: 100%;
      height: 100%;
      outline: none;
      padding-left: 20px;
      border: 1px solid $primary;
    }
  }
}

.modal-body {
  padding: 0;
}

</style>

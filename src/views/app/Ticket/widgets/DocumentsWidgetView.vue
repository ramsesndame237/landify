<script>
import DataTable from '@/views/app/CustomComponents/DataTable/DataTable.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import Table from '@/table'

export default {
  name: 'DocumentsWidgetView',
  components: { GenericModal, DataTable },
  props: {
    documents: Array,
    ticket_id: String,
  },
  data() {
    return {
      documentDef: Table.document,
      columDataDocument: [
        {
          id: 'document_entry_time',
          key: 'document_entry_time',
          type:'date',
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
      ],
    }
  },
  methods: {
    createDocument() {
      console.log('this this the ticket id ', this.ticket_id)
      this.$refs.documentModal.openModal(true, { ticket_id: this.ticket_id })
    },
    deleteDocument() {
      console.log('this is the delete ')
    },
  },
}
</script>
<template>
  <div>
    <h4 class="font-weight-bolder">
      {{ $t('headline~ticket~documents') }}
    </h4>
    <div>
      <div class="search-container mb-5 ">
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
      <section>
        <DataTable v-if="ticket_id" :columns="columDataDocument" :url="`/tickets/documents?ticket_id=${ticket_id}`" :on-delete-click="deleteDocument  " hide-top-bar="true" :resolve-data="data =>data.data" />
      </section>

    </div>
    <generic-modal ref="documentModal" :fetch-data="false" table="document" :definition="documentDef"
                   table-definition-key="document" title="Update the document"
                   @reload-table="onDocumentUpdate"/>
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

</style>

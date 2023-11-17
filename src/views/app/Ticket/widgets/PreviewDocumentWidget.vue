<script>

import {
  getDocumentLink,
  getDocumentLinkPreviewWithId,
  getDocumentLinkWithId,
  getStampedDocumentPreviewLink
} from "@/libs/utils";
import Table from "@/table";
import {mapGetters} from "vuex";

export default {
  name: "PreviewDocumentWidget",
  data() {
    return {
      document_name: null,
      documentDef: Table.document,
    }
  },

  computed:{
    get_link_document(){
      return this.$store.state.document.previewDocument.document.document_already_stamp ? getStampedDocumentPreviewLink(this.$store.state.document.previewDocument.document) :getDocumentLinkPreviewWithId(this.$store.state.document.previewDocument.document.document_id)
    }
  },
  methods: {
    openModal() {
      this.$refs.previewDocumentModalRef.show()
    },
    downloadDocument(){
        var link = document.createElement("a");
        link.setAttribute('download', this.$store.state.document.previewDocument.document.document_name);
        link.href = getDocumentLinkWithId(this.$store.state.document.previewDocument.document.document_id);
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
    stampDocument() {
      this.$router.push({
        name: 'sign-document',
        params: {id: this.$store.state.document.previewDocument.document.document_id, ticket_id: this.$store.state.document.previewDocument.ticket_id, entity: document}
      })
    },
  },
  mounted() {
    console.log("this is the data ", this.$store.state.document.previewDocument.document.document_id)
    this.document_name = getDocumentLinkPreviewWithId(this.$store.state.document.previewDocument.document.document_id)
  }

}
</script>

<template>
  <div>
    <div class="header-preview-page d-flex justify-content-center align-items-center">
      <div class="header_title d-flex">
        <h2 class="font-weight-bold text-white">
          {{$store.state.document.previewDocument.document.document_name}}
        </h2>
        <feather-icon v-b-tooltip.hover title="Download" icon="DownloadCloudIcon" size="25"
                      class="cursor-pointer mx-2" @click="downloadDocument" />
        <feather-icon v-if="$store.state.document.previewDocument.col_stamp && !$store.state.document.previewDocument.document.document_already_stamp" v-b-tooltip.hover title="Stamp" icon="FeatherIcon" @click="stampDocument" size="25" class="cursor-pointer"/>
      </div>
    </div>
    <div class="document_body_preview">
      <iframe style="height: 90vh;width: 100%" :src="get_link_document" ></iframe>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/variables/variables';

.header-preview-page {
  height: 80px;
  background: $primary;
  color: #fff;
}
.document_body_preview{
  width: 100%;
  height: calc(100vh-80px);
}

</style>

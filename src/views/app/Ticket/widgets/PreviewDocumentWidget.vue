<script>

import {getDocumentLinkPreviewWithId} from "@/libs/utils";
import Table from "@/table";

export default {
  name: "PreviewDocumentWidget",
  props: ['document_id','name'],
  data() {
    return {
      document_name: null,
      documentDef: Table.document,
    }
  },

  computed:{
    get_link_document(){
      return  getDocumentLinkPreviewWithId(this.document_id)
    }
  },
  methods: {
    openModal() {
      this.$refs.previewDocumentModalRef.show()
    },
  },
  mounted() {
    console.log("this is the image preview", getDocumentLinkPreviewWithId(this.document_id))
    this.document_name = getDocumentLinkPreviewWithId(this.document_id)
  }

}
</script>

<template>
  <div>
    <div class="header-preview-page d-flex justify-content-center align-items-center">
      <div class="header_title d-flex">
        <h2 class="font-weight-bold text-white">
          {{ name }}
        </h2>
        <feather-icon v-b-tooltip.hover title="Download" icon="DownloadCloudIcon" size="25"
                      class="cursor-pointer mx-2"/>
        <feather-icon v-b-tooltip.hover title="Stamp" icon="FeatherIcon" size="25" class="cursor-pointer"/>
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

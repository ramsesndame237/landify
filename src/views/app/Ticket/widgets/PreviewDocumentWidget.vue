<script>

export default {
  name: "PreviewDocumentWidget",
  props: ['name'],
  data() {
    return {
      document_name: null
    }
  },
  methods: {
    openModal() {

      this.$refs.previewDocumentModalRef.show()
    },
  },
  mounted() {
    this.document_name = this.getDocumentLinkPreview(name)
    console.log("this is the image preview", this.document_name)
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
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/variables/variables';

.header-preview-page {
  height: 80px;
  background: $primary;
  color: #fff;
}


</style>

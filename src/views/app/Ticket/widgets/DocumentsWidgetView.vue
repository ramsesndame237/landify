<script>
export default {
  name: 'DocumentsWidgetView',
  props: {
    documents: Array,
  },
}
</script>
<template>
  <div>
    <h4 class="font-weight-bolder">
      {{ $t('headline~ticket~documents') }}
    </h4>
    <div>
      <div class="search-container">
        <div class="searchinput mr-3 d-flex">
          <input type="text">
          <div class="bg-primary mx-2 cursor-pointer d-flex align-items-center justify-content-center" style="width: 50px; height: 35px">
            <feather-icon icon="SearchIcon" size="25" class="text-white"/>
          </div>
          <div class="bg-primary cursor-pointer d-flex align-items-center justify-content-center" style="width: 50px; height: 35px">
            <feather-icon icon="DownloadIcon" size="25" class="text-white"/>
          </div>
        </div>
        <b-button variant="primary">
          {{ $t('button~newdocument') }}
        </b-button>
      </div>
    </div>
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

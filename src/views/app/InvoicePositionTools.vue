<template>
  <div class="d-flex align-items-center">
    <b-button class="mr-1" size="sm" variant="success">
      <span>Split Position</span>
    </b-button>
    <b-button class="mr-1" size="sm" variant="info"
              @click="$router.push({name:'table-positions-import', params: {invoice: $route.params.id, table: 'invoice'}})">
      <feather-icon icon="DownloadIcon" class="mr-50"/>
      <span>Import</span>
    </b-button>
  </div>
</template>

<script>
import { BButton } from "bootstrap-vue";

export default {
  name: 'InvoicePositionTools',
  components: { BButton },

}
</script>

<style scoped>

</style>

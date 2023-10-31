<template>
  <div
    class="d-flex flex-column align-items-center text-center"
    style="gap: 5px;"
  >
    <img
      :src="noData"
      alt="No data found"
      style="height: 100%; max-height: 300px;"
    >
    <h2 class="mb-0 pb-0">
      No data found
    </h2>
    <small>We didn't find any data. Try to refresh data please.</small>
    <b-button
      v-if="refresh"
      class="d-flex justify-content-center align-items-center mt-1"
      variant="dark"
      @click="getData"
    >
      <img
        :src="refreshIcon"
        height="24"
        alt="Refresh"
        style="filter: invert(1)"
      >
      <span>
        Refresh
      </span>
    </b-button>
  </div>
</template>

<script>
import refreshIcon from '@/assets/images/icons/refresh.svg'
import noData from '@/assets/images/icons/no-data.svg'

export default {
  name: 'NoData',
  props: {
    refresh: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      refreshIcon,
      noData,
    }
  },
}
</script>

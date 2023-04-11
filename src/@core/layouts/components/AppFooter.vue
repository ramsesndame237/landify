<template>
  <div class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      COPYRIGHT © {{ new Date().getFullYear() }}
      <b-link class="ml-25" href="https://www.digitalsuxess.de/" target="_blank">
        DSAG
      </b-link>
      <span class="d-none d-sm-inline-block">, All rights Reserved</span>
    </span>

    <div class="float-md-right d-none d-md-block">
      <b-button class="btn-icon mr-1" variant="flat-primary" title="Clear Cache" @click="hardRefresh">
        <feather-icon icon="RefreshCcwIcon"/>
      </b-button>
      <span>#{{ version }} - {{ buildTime }}</span>
    </div>
  </div>
</template>

<script>
import { BLink } from 'bootstrap-vue'
import { mapState } from 'vuex'

export default {
  components: {
    BLink,
  },
  data() {
    return {
      version: this.$store.state.app.commitVersion,
      buildTime: process.env.VUE_APP_BUILD_TIME,
    }
  },
  computed: {},
  methods: {
    hardRefresh() {
      localStorage.removeItem('app-data')
      window.location.reload()
    },
  },
}
</script>

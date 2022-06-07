<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      COPYRIGHT © {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        href="https://gohze.org"
        target="_blank"
      >GOHZE
      </b-link>
      <span class="d-none d-sm-inline-block">, All rights Reserved</span>
    </span>

    <span class="float-md-right d-none d-md-block">
      {{ version }}
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'
import { mapState } from 'vuex'

export default {
  components: {
    BLink,
  },
  computed: {
    ...mapState({
      version: 'app/commitVersion',
    }),
  },
}
</script>

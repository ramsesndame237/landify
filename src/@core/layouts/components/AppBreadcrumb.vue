<template>
  <b-row v-if="$route.meta.breadcrumb || $route.meta.pageTitle" class="content-header">

    <!-- Content Left -->
    <b-col class="content-header-left mb-2" cols="12" md="8">
      <b-row class="breadcrumbs-top">
        <b-col cols="12">
          <h2 class="content-header-title float-left pr-1 mb-0 text-uppercase">
            {{ $t($route.meta.pageTitle) }} </h2>
          <div class="breadcrumb-wrapper">
            <b-breadcrumb>
              <b-breadcrumb-item to="/">
                <feather-icon icon="HomeIcon" size="16" class="align-text-top"/>
              </b-breadcrumb-item>
              <b-breadcrumb-item v-for="item in $route.meta.breadcrumb" :key="item.text" :active="item.active"
                                 :to="item.to">
              <span class="text-capitalize">
                {{ $t(item.text) }}
              </span>
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
    </b-col>

    <!-- Content Right -->
    <b-col class="content-header-right text-md-right d-md-block d-none mb-1" md="4" cols="12" v-if="showPaginator">
      <b-button class="mr-1" variant="primary" size="sm" title="Previous" v-if="hasPrevious" @click="onPrevious">
        <feather-icon icon="ArrowLeftIcon" class="mr-1"/>
        <span>{{ $t('button~previous') }}</span>
      </b-button>
      <b-button class="mr-1" variant="primary" size="sm" title="Next" @click="onNext" v-if="hasNext">
        <feather-icon icon="ArrowRightIcon" class="mr-1"/>
        <span>{{ $t('button~next') }}</span>
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import {
  BBreadcrumb, BBreadcrumbItem, BRow, BCol, BDropdown, BDropdownItem, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
  },
  computed: {
    showPaginator() {
      return this.$route.name === 'table-view' && this.currentId != null
    },
    currentId() {
      return parseInt(this.$route.params.id)
    },
    ids() {
      return this.$route.params.ids || []
    },
    currentIndex() {
      return this.ids.indexOf(this.currentId)
    },
    hasPrevious() {
      return this.currentIndex > 0
    },
    hasNext() {
      return this.currentIndex < this.ids.length - 1
    },
  },
  methods: {
    onPrevious() {
      return this.$router.push({
        name: 'table-view',
        params: { table: this.$route.params.table, id: this.ids[this.currentIndex - 1], ids: this.ids },
      })
    },
    onNext() {
      return this.$router.push({
        name: 'table-view',
        params: { table: this.$route.params.table, id: this.ids[this.currentIndex + 1], ids: this.ids },
      })
    },
  },
}
</script>

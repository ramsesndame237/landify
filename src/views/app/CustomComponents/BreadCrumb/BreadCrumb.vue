<template>
  <div class="breadcrumb-wrapper">
    <b-breadcrumb class="px-0">
      <b-breadcrumb-item to="/">
        <feather-icon icon="HomeIcon" size="16" class="align-text-top"/>
      </b-breadcrumb-item>
      <b-breadcrumb-item
        v-for="(item, index) in $route.meta.breadcrumb"
        :key="`route-meta-${item.text}-${index}`"
        :active="item.active"
        :to="item.to"
      >
        <span class="text-capitalize">
          {{ $t(item.text) }}
        </span>
      </b-breadcrumb-item>
      <b-breadcrumb-item
        v-for="(item, index) in data"
        :key="`data-meta-${item.text}-${index}`"
        :active="item.active"
        :to="item.to"
      >
        <span class="text-capitalize">
          {{ $t(item.text) }}
        </span>
      </b-breadcrumb-item>
    </b-breadcrumb>
  </div>
</template>

<script>
import { BBreadcrumb, BBreadcrumbItem } from 'bootstrap-vue'

export default {
  components: {
    BBreadcrumbItem,
    BBreadcrumb,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    noRouteMeta: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

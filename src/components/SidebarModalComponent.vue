<script>

import {BSidebar} from 'bootstrap-vue'

export default {
  name: "SidebarModalComponent",
  components: {
    BSidebar
  },
  errorCaptured(err, vm, info) {
    console.log("this is the error ", err)
    console.log("this is the info ", info)
  },
  props: {
    options: {
      type: Object,
      default: function () {
        return {
          id: 'siderbar_location',
          shadow: false,
          rigth_position: false,
          no_header: false,
          custom_footer: false,
          backdrop: true,
          backdrop_variant: 'variant'
        }
      }
    },
    title: {
      type: String
    },
    sidebar_class: {
      type: Array
    },

  },
  data: () => {
    return {
      openSidebar: false
    }
  },

  methods: {
    openSidebarComponent() {
      this.openSidebar = !this.openSidebar
    }
  },
}
</script>

<template>
  <div>
    <b-sidebar
      ref="sidebarRef"
      :id="options.id || 'sidebarId'"
      :title="$t(title || '')"
      :backdrop-variant="options.backdrop_variant || 'variant'"
      :backdrop="options.backdrop"
      :shadow="options.shadow"
      :no-header="options.no_header"
      :right="options.rigth_position"
      :visible="openSidebar"
      :width="options.width || '350px'"
    >
      <slot v-if="options.no_header" name="custom-header"></slot>
      <component :is="options.createOrUpdateForm"/>
      <slot v-if="options.custom_footer" name="custom-footer"></slot>
    </b-sidebar>
  </div>
</template>

<style scoped>

</style>

<script>

import {BSidebar} from 'bootstrap-vue'
import EntityForm from "@/views/app/Generic/EntityForm.vue";

export default {
  name: "SidebarModalComponent",
  components: {
    BSidebar,
    EntityForm
  },
  errorCaptured(err, vm, info) {

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
    definition: Object,
    componentProps: null

  },
  data: () => {
    return {
      openSidebar: false
    }
  },
  methods: {
    openSidebarComponent() {
      this.openSidebar = !this.openSidebar
    },

  },
}
</script>

<template>
  <div>
    <b-sidebar
      ref="sidebarRef"
      :id="options.id || 'sidebarId'"
      :title="$t(title || '')"
      :backdrop-variant="options.backdrop_variant || 'dark'"
      :backdrop="options.backdrop"
      :shadow="options.shadow"
      :no-header="options.no_header"
      :right="options.rigth_position"
      v-model="openSidebar"
      :width="options.width || '450px'"
      class="overflow-x-hidden "
    >
      <slot v-if="options.no_header" name="customHeader"></slot>
      <div class="px-2 overflow-hidden sidebar-content ">
        <component :is="definition.formComponent || 'entity-form' || componentProps" :definition="definition"/>
      </div>
      <slot v-if="options.custom_footer" name="custom-footer"></slot>
    </b-sidebar>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/variables/variables";
.b-sidebar-body{
  background:$body-bg-white ;
}
.sidebar-content {
  height: 90%;
}
</style>

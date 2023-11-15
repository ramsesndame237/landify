<script>

import { BSidebar } from 'bootstrap-vue'
import EntityForm from '@/views/app/Generic/EntityForm.vue'

export default {
  name: 'SidebarModalComponent',
  components: {
    BSidebar,
    EntityForm,
  },
  errorCaptured(err, vm, info) {

  },
  props: {
    title: {
      type: String,
    },
    options: {
      type: Object,
      default() {
        return {
          id: 'siderbar_location',
          shadow: false,
          rigth_position: false,
          no_header: false,
          custom_footer: false,
          backdrop: true,
          backdrop_variant: 'variant',
        }
      },
    },
    sidebar_class: {
      type: Array,
    },
    definition: Object,
    componentProps: null,
    table: String,
    cacheKey: String,
    tableDefinitionKey: String,

  },
  data() {
    return {
      openSidebar: false,
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
      :id="(options && options.id) || 'sidebarId'"
      ref="sidebarRef"
      v-model="openSidebar"
      :title="$t(title || '')"
      :backdrop-variant="options.backdrop_variant || 'dark'"
      :backdrop="options.backdrop"
      :shadow="options.shadow"
      :no-header="options.no_header"
      :right="options.rigth_position"
      :width="options.width || '350px'"
      :class="['overflow-x-hidden'] "
    >
      <slot v-if="options.no_header" name="customHeader"/>
      <div class="px-2 overflow-hidden sidebar-content ">
        <component :is="definition.formComponent || 'entity-form' || componentProps" :definition="definition"/>
      </div>
      <slot v-if="options.custom_footer" name="custom-footer"/>
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

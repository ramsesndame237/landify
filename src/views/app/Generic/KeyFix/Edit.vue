<template>
  <component :is="definition.customPage || 'edit'" :key="$route.path"/>
</template>

<script>
import table from '@/table/index'
import Edit from '../Edit.vue'

export default {
  name: 'EditPage',
  components: { Edit },
  computed: {
    definition() {
      return table[this.$route.params.table]
    },
  },
  beforeRouteEnter(to, from, next) {
    to.meta.pageTitle = `List of ${to.params.table}`
    to.meta.breadcrumb = [
      {
        text: to.params.table,
        to: { name: 'table', params: { table: to.params.table } },
        active: false,
      },
      {
        text: 'Details',
        active: true,
      },
    ]
    next()
  },
  beforeRouteUpdate(to, from, next) {
    to.meta.pageTitle = `List of ${to.params.table}`
    to.meta.breadcrumb = [
      {
        text: to.params.table,
        to: { name: 'table', params: { table: to.params.table } },
        active: false,
      },
      {
        text: 'Details',
        active: true,
      },
    ]
    next()
  },
}
</script>

<style scoped>

</style>

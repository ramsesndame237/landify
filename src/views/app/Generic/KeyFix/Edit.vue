<template>
  <edit :key="$route.path"/>
</template>

<script>
import Edit from '../Edit'

export default {
  name: 'EditPage',
  components: { Edit },
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

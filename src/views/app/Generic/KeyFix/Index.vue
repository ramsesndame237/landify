<template>
  <component :is="definition.customIndex || 'index'" :key="$route.path"/>
</template>

<script>
import Table from '@/table'
import table from '@/table'
import Index from '../index'

export default {
  name: 'IndexPage',
  components: { Index },
  computed: {
    definition() {
      return table[this.$route.params.table]
    },
  },
  beforeRouteEnter(to, from, next) {
    to.meta.pageTitle = Table[to.params.table]?.title || `headline~${to.params.table}~list`
    next()
  },
  beforeRouteUpdate(to, from, next) {
    to.meta.pageTitle = Table[to.params.table]?.title || `headline~${to.params.table}~list`
    next()
  },
}
</script>

<style scoped>

</style>

<template>
  <index :key="$route.path"/>
</template>

<script>
import Index from '../index'

export default {
  name: 'IndexPage',
  components: { Index },
  beforeRouteEnter(to, from, next) {
    to.meta.pageTitle = `List of ${to.params.table}`
    next()
  },
  beforeRouteUpdate(to, from, next) {
    to.meta.pageTitle = `List of ${to.params.table}`
    next()
  },
}
</script>

<style scoped>

</style>

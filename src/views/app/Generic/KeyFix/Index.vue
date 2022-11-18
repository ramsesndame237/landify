<template>
  <index :key="$route.path"/>
</template>

<script>
import Index from '../index'

export default {
  name: 'IndexPage',
  components: { Index },
  beforeRouteEnter(to, from, next) {
    to.meta.pageTitle = `global.headline-${to.params.table}-list`
    next()
  },
  beforeRouteUpdate(to, from, next) {
    to.meta.pageTitle = `global.headline-${to.params.table}-list`
    next()
  },
}
</script>

<style scoped>

</style>

<template>
  <div>
    <Databases :displayOption="true" :actions="true" />
  </div>
</template>

<script>
const Databases = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    Databases,
  },
}
</script>

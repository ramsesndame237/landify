<template>
  <div>
    <Databases :actions="true" />
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

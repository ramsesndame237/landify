<script>
import MenuProfileMatrix from '@/views/app/MenuProfile/MenuProfileMatrix.vue'

export default {
  components: { MenuProfileMatrix },
  data() {
    return {
      age: 5,
    }
  },
}
</script>

<template>
  <div class="">
    <MenuProfileMatrix config_key="menu" label-key="access_name" />
  </div>
</template>

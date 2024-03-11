<script>
export default {
  name: 'KanbanViewDisplay',
  props: {
    classes: null,
    styles: null
  },
}
</script>

<template>
  <div :class="[classes]">
    <slot/>
  </div>
</template>

<style scoped>

</style>

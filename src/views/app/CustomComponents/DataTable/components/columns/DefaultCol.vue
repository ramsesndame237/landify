<template>
  <span
    class="d-inline-block text-truncate w-100"
    :title="value"
    :class="{'font-weight-bold': bold}"
  >
    {{ value ? value : '--/--' }}
  </span>
</template>
<script>
export default {
  name: 'DefaultCol',
  props: {
    col: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    bold: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    value() {
      let finalValue = ''
      if (!this.col?.getValue) {
        (this.col?.key?.split('.') || []).forEach(key => {
          finalValue = this.data?.[key]
        })
      } else {
        finalValue = this.col.getValue(this.data)
      }
      return finalValue
    },
  },
}
</script>

<template>
  <span
    class="d-inline-block text-truncate w-100"
    :title="value"
    :class="{'font-weight-bold': bold}"
  >
    {{ value }}
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
      let finalValue = '';
      (this.col?.key?.split('.') || []).forEach(key => {
        finalValue = this.data?.[key]
        console.log({ data: this.data, key })
      })
      return finalValue
    },
  },
}
</script>

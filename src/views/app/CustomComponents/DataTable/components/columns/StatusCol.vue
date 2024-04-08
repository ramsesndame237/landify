<template>
  <div class="d-flex align-items-center justify-content w-100">
    <b-badge :variant="col.variant && col.variant({data, col})" class="text-truncate" style="min-width: 50px;">
      {{ $t(value) }}
    </b-badge>
  </div>
</template>

<script>
export default {
  name: 'StatusCol',
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

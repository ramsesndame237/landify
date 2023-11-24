<template>
  <div class="d-flex align-items-center justify-content w-100">
    <b-badge :variant="col.variant && col.variant({data, col})" class="text-truncate" style="min-width: 50px;">
      {{ col.getValue ? $t(col.getValue({data, col})) : $t(value) }}
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
      let finalValue = '';
      (this.col?.key?.split('.') || []).forEach(key => {
        finalValue = this.data?.[key]
      })
      return finalValue
    },
  },
}
</script>

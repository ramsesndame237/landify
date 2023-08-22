<template>
  <div v-if="isExpectedFromDateNotArrived">
    <b-button variant="primary" size="sm" @click="removeActiveDeadline">Remove</b-button>
  </div>
</template>

<script>
import moment from 'moment'

export default ({
  props: ['rowData', 'data', 'items'],
  data() {
    return {

    }
  },
  computed: {
    isExpectedFromDateNotArrived() {
      const { contractdeadline_expected_from } = this.rowData.item
      return moment(contractdeadline_expected_from).isBefore(moment())
    },
  },
  methods: {
    removeActiveDeadline() {
      console.log('Ici delete deadline')
    },

  },
  mounted() {
    console.log({ items: this.items, rowData: this.rowData, data: this.data });
  },
})
</script>

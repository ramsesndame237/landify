<template>
  <div
    class="d-flex align-items-center w-100"
    :title="value ? formatDate(value) : '--/--'"
  >
    <b-button>
      <span>
        Kanban
      </span>
    </b-button>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'KanbanButton',
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
  methods: {
    formatDate(date) {
      const dateTime = moment(date)
        .toDate()
        .getTime()
      const dayBeginTime = moment()
        .hours(0)
        .minutes(0)
        .seconds(0)
        .toDate()
        .getTime()
      const sevenDayBeforeTime = moment()
        .subtract(7, 'd')
        .toDate()
        .getTime()

      // eslint-disable-next-line no-nested-ternary
      return dateTime < sevenDayBeforeTime ? moment(date, true).format('MMM, DD')
        : dateTime < dayBeginTime
          ? moment(date, true).format('MMM, DD HH:mm A')
          : moment(date).format('LT')
    },
    moment,
    display() {
      this.$emit('show-details')
    },
  },
}
</script>

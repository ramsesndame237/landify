<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment/moment'

export default {
  name: 'CustomDatePicker',
  components: { DatePicker },
  props: {
    datePickerOptions: {
      type: Object,
      default: () => ({
        datePickerOptions: {
          // type: 'week',
          range: true,
          format: 'D MMM YYYY',
          valueType: 'YYYY-MM-DD',
          placeholder: 'Filter by date',
          confirm: true,
          // inline: true,
          // showWeekNumber: true
          shortcuts: [
            { text: 'Today', onClick: () => [moment().toDate(), moment().toDate()] },
            {
              text: 'Yesterday',
              onClick: () => {
                const date = moment().subtract(1, 'day')

                return [date.toDate(), moment().toDate()]
              },
            },
            {
              text: '7 day ago',
              onClick: () => {
                const date = moment().subtract(1, 'week').format('YYYY-MM-DD')
                return [moment(date).toDate(), moment().toDate()]
              },
            },
            {
              text: 'This Month',
              onClick: () => {
                const date = moment().startOf('month').toDate()
                return [date, moment().toDate()]
              },
            },
          ],
        },
      }),
    },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
  },
  data() {
    return {
      date: [this.startDate, this.endDate],
    }
  },
  methods: {
    datePickerHandler(date) {
      this.$emit('input-start-date', date[0])
      this.$emit('input-end-date', date[1])
    },
  },
}
</script>

<template>
  <date-picker v-model="date" class="w-100" v-bind="datePickerOptions" @change="datePickerHandler"/>
</template>

<style scoped>

</style>

export default {
  data() {
    return {
      actionsType: [
        { label: 'Active Option', value: 'active_option' },
        { label: 'Automatic Option', value: 'automatic_option' },
        { label: 'Automatic extension', value: 'automatic_extension' },
        { label: 'Resiliation', value: 'resiliation' },
        { label: 'Special Resiliation', value: 'special_resiliation' },
      ],
      deadlinesStatus: [
        { label: 'Deactivate', value: 'deactivate' },
        { label: 'Active', value: 'active' },
        { label: 'Pulled', value: 'pulled' },
        { label: 'Not Due', value: 'notdue' },
      ],
      period: [
        { label: 'Day', value: 'Day' },
        { label: 'Week', value: 'Week' },
        { label: 'Month', value: 'Month' },
        { label: 'Year', value: 'Year' },
      ],
    }
  },
  methods: {
    typeFormatter(value) {
      const val = this.actionsType.find(type => type.value === value)
      if (!val) return '-'
      return val.label
    },
    statusDeadlineFormatter(value) {
      const val = this.deadlinesStatus.find(type => type.value === value)
      if (!val) return '-'
      return val.label
    },
  },
}

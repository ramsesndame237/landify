<template>
  <div v-if="isExpectedFromDateNotArrived">
    <b-button variant="primary" :disabled="!isRecentAddedDeadline" size="sm" @click="removeActiveDeadline">
      Remove
    </b-button>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['rowData', 'data', 'items'],
  data() {
    return {

    }
  },
  computed: {
    isExpectedFromDateNotArrived() {
      const { contractdeadline_expected_from } = this.deadline
      return moment().isBefore(moment(contractdeadline_expected_from))
    },
    /*
    * Cette variable permet de controller la deadline ajouté en dernier dans le tableau des deadline pulled,
    * afin d'être retiré en premier s'il le faut
     */
    isRecentAddedDeadline() {
      const { contractdeadline_expected_from } = this.deadline
      const itemsExpectedFromDates = this.items.map(item => moment(item.contractdeadline_expected_from))

      return moment.max(itemsExpectedFromDates).isSame(contractdeadline_expected_from)
    },
    deadline() {
      return this.rowData.item
    },
    deadlineTableComponent() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent
    },
    contractFormComponent() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs.form
    },
  },
  methods: {
    async removeActiveDeadline() {
      this.data.reload(true)
      try {
        await this.$http.put(`/contracts/deadlines/checkout/${this.deadline.contractdeadline_id}`)
        this.$successToast('Deadline Successful remove !!!')

        await this.deadlineTableComponent.getDeadlines()
        this.data.reload(false)
        await this.contractFormComponent.loadEntity()
        await this.deadlineTableComponent.getActions(true)
      } catch (error) {
        if (error.response) {
          this.$errorToast(error.response.data.detail)
        } else {
          this.$errorToast(error.message)
        }
        console.log({ error })
      }
    },

  },
}
</script>

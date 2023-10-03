<template>
  <div class="d-flex">
    <b-button variant="info" size="sm" :disabled="!canUpdateDeadlineStatus" @click="activeDeadline">
      <feather-icon icon="CheckCircleIcon" />
    </b-button>
    <b-button variant="primary" size="sm" :disabled="!canUpdateDeadlineStatus" class="ml-1" @click="deactiveDeadline">
      <feather-icon icon="XCircleIcon" />
    </b-button>
  </div>
</template>

<script>
import moment from 'moment'

export default ({
  name: 'UnactiveDeadlinesActions',
  props: ['rowData', 'data', 'items'],
  data() {
    return {
      deadlines: [],
    }
  },
  computed: {
    entityData() {
      return this.contractFormComponent.entity
    },
    canUpdateDeadlineStatus() {
      // Je récupère les données du contract
      const { action_begin } = this.entityData

      if (!moment(action_begin).isSameOrBefore(moment())) return false
      const { contractdeadline_expected_from, contractdeadline_status } = this.deadline

      if (contractdeadline_status === 'deactivate') return false

      const unDeactivateDeadlines = this.items.filter(item => !['deactivate'].includes(item.contractdeadline_status))

      const unDeactivateDeadlinesExpectedFrom = unDeactivateDeadlines.map(item => moment(item.contractdeadline_expected_from))

      return moment.min(unDeactivateDeadlinesExpectedFrom).isSame(moment(contractdeadline_expected_from))
    },
    deadline() {
      return this.rowData.item
    },
    deadlineTableComponent() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent
    },
    contractFormComponent() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs.form
    },
  },
  mounted() {
    // Je récupère les deadlines du composant parent
    if (this.data.getDeadlines) {
      this.deadlines = this.data.getDeadlines()
    }
  },
  methods: {
    async activeDeadline() {
      this.data.reload(true)
      try {
        await this.$http.put(`/contracts/deadlines/activeAction/${this.deadline.contractaction_id}`)
        this.$successToast('Deadline activated successfully !!!')
        await this.deadlineTableComponent.getDeadlines()
        this.data.reload(false)
        await this.deadlineTableComponent.getActions(true)
        await this.contractFormComponent.loadEntity(true)
      } catch (error) {
        console.log({ error })
      } finally {
        this.data.reload(false)
      }
    },
    async deactiveDeadline() {
      this.data.reload(true)

      try {
        const response = await this.$http.put(`/contracts/deadlines/deactivate/${this.deadline.contractdeadline_id}`)
        console.log({ response })
        await this.deadlineTableComponent.getDeadlines()
        this.data.reload(false)
      } catch (error) {
        console.log({ error })
      } finally {
        this.data.reload(false)
      }
    },

  },
})
</script>

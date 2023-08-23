<template>
  <div class="d-flex">
    <b-button variant="info" size="sm" :disabled="!canActivate" @click="activeDeadline">
      <feather-icon icon="CheckCircleIcon" />
    </b-button>
    <b-button variant="primary" size="sm" :disabled="!canDeactivate" class="ml-1" @click="deactiveDeadline">
      <feather-icon icon="XCircleIcon" />
    </b-button>
  </div>
</template>

<script>
import sortBy from 'lodash/sortBy'
import findIndex from 'lodash/findIndex'
import minBy from 'lodash/minBy'

export default ({
  name: 'UncativeDeadlinesActions',
  props: ['rowData', 'data', 'items'],
  data() {
    return {
      deadlines: [],
    }
  },
  computed: {
    canActivate() {
      // Les conditions pour tester l apossibilité de modification
      const {
        isItemOnTopStatusNotDue,
        isItemActionCancelled,
        isItemOnTopActionCancelled,
        isItemOnTopDeactivate,
        itemIndex,
        contractdeadline_id,
        contractdeadline_status,
        _rowVariant,
        isItemDeactivate,
      } = this.getItemOnTop()

      if (itemIndex <= 0 && !isItemActionCancelled && !isItemDeactivate) {
        return true
      } if (!isItemDeactivate && (isItemOnTopActionCancelled || isItemOnTopDeactivate || !isItemOnTopStatusNotDue)) {
        return true
      }

      return false
    },
    canDeactivate() {
      // Les conditions pour tester l apossibilité de modification
      const {
        isItemOnTopStatusNotDue,
        isItemActionCancelled,
        isItemOnTopActionCancelled,
        isItemOnTopDeactivate,
        itemIndex,
        contractdeadline_id,
        contractdeadline_status,
        _rowVariant,
        isItemDeactivate,
      } = this.getItemOnTop()

      return (!isItemDeactivate && isItemOnTopDeactivate) || (itemIndex <= 0 && !isItemDeactivate)
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
      const deadlines = this.data.getDeadlines()
      this.deadlines = sortBy(deadlines, ['contractdeadline_id'])
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
    getItemOnTop() {
      const { contractdeadline_id, contractdeadline_status, _rowVariant } = this.rowData.item
      const itemIndex = findIndex(this.items, ['contractdeadline_id', contractdeadline_id])
      const isItemDeactivate = contractdeadline_status === 'deactivate'
      let isItemOnTopStatusNotDue = false
      const isItemActionCancelled = _rowVariant === 'danger'
      let isItemOnTopActionCancelled = false
      let isItemOnTopDeactivate = false
      const itemOnTop = this.items[itemIndex - 1]

      if (itemOnTop) {
        isItemOnTopActionCancelled = itemOnTop._rowVariant === 'danger'
        isItemOnTopDeactivate = itemOnTop.contractdeadline_status === 'deactivate'
        isItemOnTopStatusNotDue = ['notdue'].includes(itemOnTop.contractdeadline_status)
      }

      return {
        isItemOnTopStatusNotDue,
        isItemActionCancelled,
        isItemOnTopActionCancelled,
        isItemOnTopDeactivate,
        itemIndex,
        contractdeadline_id,
        contractdeadline_status,
        _rowVariant,
        isItemDeactivate,
      }
    },
  },
})
</script>

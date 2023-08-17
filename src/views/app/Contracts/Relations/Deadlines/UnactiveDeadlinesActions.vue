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

      return !isItemDeactivate
    },
  },
  mounted() {
    // Je recupère les deadlines du composant parent
    if (this.data.getDeadlines) {
      const deadlines = this.data.getDeadlines()
      this.deadlines = sortBy(deadlines, ['contractdeadline_id'])
      console.log({ dedalines: this.deadlines })
    }
  },
  methods: {
    async activeDeadline() {
      const { contractdeadline_id } = this.rowData.item
      try {
        const response = await this.$http.put(`/contracts/deadlines/active/${contractdeadline_id}`)

        const deadlineTableComponent = this.$parent.$parent.$parent.$parent.$parent.$parent.$parent;
        const contractFormComponent = this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs.form;
        await deadlineTableComponent.getDeadlines(true)
        await deadlineTableComponent.getActions(true)
        await contractFormComponent.loadEntity(true)
      } catch (error) {
        console.log({ error });
      }
    },
    deactiveDeadline() {
      console.log('Ici deactive')
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

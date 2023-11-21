<script>
export default {
  name: 'ColumnPriorityAction',
  data() {
    return {
      isEditing: false,
      loading: false,
    }
  },
  computed: {
    columnPriorityComponent() {
      const { currentTab, tabs } = this.$parent
      return tabs[currentTab].$children[0]
    },
  },
  methods: {
    onEdit() {
      this.isEditing = !this.isEditing
      this.columnPriorityComponent.isEditing = true
    },
    onCancel() {
      this.isEditing = !this.isEditing
      this.isEditing = false
      this.columnPriorityComponent.isEditing = false
    },
    async onSave() {
      this.loading = true
      await this.columnPriorityComponent.saveColumnPriority()
      this.columnPriorityComponent.loading = true
      this.loading = false
      this.isEditing = false
    },
  },
}
</script>

<template>
  <div class="">

    <div v-if="isEditing" class="">
      <b-button size="sm" variant="info" class="mr-1" :disabled="loading" @click="onSave">
        <b-spinner v-if="loading" small class="mr-50"/>
        <feather-icon v-else icon="SaveIcon" class="mr-50"/>
        {{ $t('button~save') }}
      </b-button>
      <b-button size="sm" variant="primary" @click="onCancel">
        {{ $t('button~cancel') }}
      </b-button>
    </div>
    <b-button v-else size="sm" variant="info" class="mr-1" @click="onEdit">
      <feather-icon icon="EditIcon" class="mr-50"/>
      {{ $t('button~edit') }}
    </b-button>
  </div>
</template>

<style scoped>

</style>

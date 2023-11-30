<template>
  <b-overlay :show="loading">
    <b-table-simple striped responsive :busy="loading">
      <template #table-busy>
        <div class="text-center text-danger">
          <b-spinner class="align-middle"/>
          <strong class="ml-1">{{ $t('table~message~loading') }}</strong>
        </div>
      </template>
      <b-thead>
        <b-th>{{ $t('attribute.' + labelKey) }}</b-th>
        <b-th v-for="(priority, index) in priorities" :key="index">
          {{ priority }}
        </b-th>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(row,i) in rows" :key="i">
          <b-td>{{ row.column[labelKey] }}</b-td>
          <b-td v-for="(priority, idx) in row.priorities" :key="idx">
            <b-form-input v-if="isEditing" v-model="priority.onEditValue" size="sm" type="number" />
            <span v-else>{{ `${priority.priority_deadline_value} h` }}</span>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-overlay>
</template>

<script>

export default {
  name: 'ColumnPriority',
  props: {
    entityId: {
      type: String,
      required: true,
    },
    relation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      labelKey: 'column_name',
      isEditing: false,
      rows: [],
    }
  },
  computed: {
    priorities() {
      return this.rows[0]?.priorities.map(priority => priority.priority?.priority_name)
    },
  },
  async mounted() {
    await this.getColumnPriority()
  },
  methods: {
    async getColumnPriority() {
      this.loading = true
      try {
        const response = await this.$http.get('/boards/priority-deadline-value-columns-board', {
          params: {
            board_id: this.entityId,
          },
        })
        const data = response.data.data
        this.rows = this.transformData(data)
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
    async saveColumnPriority() {
      const payload = {
        board_id: this.entityId,
        columns: this.rows.map(column => ({
          column_id: column.column.column_id,
          priorities: column.priorities.map(priority => ({
            priority_id: priority.priority.priority_id,
            priority_deadline_value: priority.onEditValue,
          })),
        })),
      }

      try {
        this.loading = true
        const response = await this.$http.put('/boards/priority-deadline-value-columns-board', payload)
        this.rows = response.data
        this.isEditing = !this.isEditing
        this.$successToast('success~operation~alert')
      } catch (error) {
        console.log({ error })
        this.$errorToast('error~operation~alert')
      } finally {
        this.loading = false
      }
    },
    cancelEdition() {
      this.isEditing = false
    },
    transformData(rows) {
      return rows.map(row => {
        row.priorities.forEach(priority => {
          priority.onEditValue = priority.priority_deadline_value
        })

        return row
      })
    },
  },
}
</script>

<template>
  <b-overlay :show="loading">
    <b-card no-body class="mt-2">
      <b-table-simple striped responsive :busy.sync="loading">
        <b-thead>
          <b-th>{{ $t('attribute.' + labelKey) }}</b-th>
          <b-th v-for="(priority, index) in priorities" :key="index">
            {{ priority }}
          </b-th>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(row,i) in rows" :key="i">
            <b-td>{{ row[labelKey] }}</b-td>
            <b-td v-for="(priority, idx) in row.priorities" :key="idx">
              <b-form-input v-if="isEditing" v-model="priority.onEditValue" size="sm" type="number" />
              <span v-else>{{ `${priority.value} h` }}</span>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-card>
  </b-overlay>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      labelKey: 'column_name',
      isEditing: false,
      rows: [
        {
          column_name: 'Zuordnung prüfen',
          priorities: [
            { priority_name: 'Normal', value: 24, onEditValue: 24 },
            { priority_name: 'Critical', value: 24, onEditValue: 10 },
            { priority_name: 'High', value: 3, onEditValue: 5 },
            { priority_name: 'Low', value: 84, onEditValue: 84 },
            { priority_name: 'Low', value: 84, onEditValue: 84 },
          ],
        },
        {
          column_name: 'Metadaten Vertragserfassung',
          priorities: [
            { priority_name: 'Normal', value: 72, onEditValue: 72 },
            { priority_name: 'Critical', value: 48, onEditValue: 48 },
            { priority_name: 'High', value: 30, onEditValue: 30 },
            { priority_name: 'Low', value: 48, onEditValue: 48 },
            { priority_name: 'Low', value: 84, onEditValue: 84 },
          ],
        },
      ],
    }
  },
  computed: {
    priorities() {
      return this.rows[0].priorities.map(priority => priority.priority_name)
    },
  },
  methods: {
    async getColumnPriority() {
      try {
        const response = await this.$http.get('/boards/deadline-column-priority')
        this.rows = response.data.data
      } catch (error) {
        console.log({ error })
      }
    },
    async saveColumnPriority() {
      console.log('Ici save priority', { rows: this.rows })
      setTimeout(() => {
        this.loading = false
        this.isEditing = false
      }, 1000)
    },
  },
}
</script>

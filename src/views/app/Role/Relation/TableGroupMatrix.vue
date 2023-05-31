<template>
  <b-overlay :show="loading">
    <b-table-simple striped responsive>
      <b-thead>
        <b-th>{{ $t('attribute.' + labelKey) }}</b-th>
        <b-th>Create</b-th>
        <b-th>Update</b-th>
        <b-th>Read</b-th>
        <b-th>Delete</b-th>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(row,i) in rows" :key="i">
          <b-td>{{ row[labelKey] }}</b-td>
          <b-td>
            <b-form-checkbox v-model="row.c"/>
          </b-td>
          <b-td>
            <b-form-checkbox v-model="row.u"/>
          </b-td>
          <b-td>
            <b-form-checkbox v-model="row.r"/>
          </b-td>
          <b-td>
            <b-form-checkbox v-model="row.d"/>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-overlay>
</template>
<script>

export default {
  name: 'TableGroupMatrix',
  props: { relation: Object, entityId: {} },
  data() {
    return {
      rows: [],
      loading: false,
    }
  },
  computed: {
    table() {
      return this.relation.entityView
    },
    labelKey() {
      return this.table === 'tablegroup' ? 'tablegroup_name' : 'table_name'
    },
  },
  async mounted() {
    this.loading = true
    const data = await this.$store.dispatch('table/fetchList', { entity: this.table })
    data.forEach(tg => {
      tg.c = true
      tg.r = false
      tg.u = false
      tg.d = false
    })
    this.rows = data
    this.loading = false
    this.$root.$on('update-matrix', this.submit)
  },
  beforeDestroy() {
    this.$root.$off('update-matrix', this.submit)
  },
  methods: {
    async submit() {
      const payload = {
        role_id: this.entityId,
        data: this.rows,
      }
      console.log(payload)
      this.loading = true
      try {
        await this.$http.post('/custom-endpoint', payload)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>

</style>

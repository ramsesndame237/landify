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
    endpoint() {
      const baseRoute = `/permissions/${this.table === 'tablegroup' ? 'tablegroups' : 'tablenames'}`;
      let indexRoute, updateRoute = baseRoute

      if (this.relation.entityName && this.relation.entityName !== 'role') {
        indexRoute = `${baseRoute}/${this.relation.entityName}/${this.entityId}`;
        updateRoute = `${baseRoute}/${this.relation.entityName}`;
      } else {
        indexRoute = `${baseRoute}/${this.entityId}`;
        updateRoute = `${baseRoute}/${this.entityId}`;
      }

      return {
        baseRoute,
        indexRoute,
        updateRoute
      }
    },
    rows() {
      return this.$store.getters['table/listCache'](`table-group-${this.entityId}`)
    }
  },
  async mounted() {
    if (this.rows.length <= 0) {
      await this.loadData()
    }
  },
  beforeDestroy() {
    this.$root.$off('update-matrix', this.submit)
  },
  methods: {
    async submit() {
      const payload = {
        [`${this.relation.entityName}_id`]: this.entityId,
        data: this.rows,
      }
      this.loading = true
      try {
        await this.$http.put(this.endpoint.updateRoute, payload)
        this.$successToast('Table Group assigned successfully')
      } catch (err) {
        console.error('err: ', err)
      } finally {
        this.loading = false
      }
    },
    async loadData() {
      this.loading = true
      await this.$http.get(this.endpoint.indexRoute)
        .then(resp => {
          const { data } = resp
          this.$store.dispatch('table/setListData', { entity: `table-group-${this.entityId}`, data: data })

          this.loading = false
          this.$root.$on('update-matrix', this.submit)
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
}
</script>

<style scoped>

</style>

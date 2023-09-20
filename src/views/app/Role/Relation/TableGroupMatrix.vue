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
            <b-form-checkbox v-model="row.c" :disabled="isDisabled(row, 'c')"/>
          </b-td>
          <b-td>
            <b-form-checkbox v-model="row.u" :disabled="isDisabled(row, 'u')"/>
          </b-td>
          <b-td>
            <b-form-checkbox v-model="row.r" :disabled="isDisabled(row, 'r')"/>
          </b-td>
          <b-td>
            <b-form-checkbox v-model="row.d" :disabled="isDisabled(row, 'd')"/>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-overlay>
</template>
<script>

export default {
  name: 'TableGroupMatrix',
  props: { relation: { type: Object, default: () => {} }, entityId: { type: String, required: true }, roleId: { type: Number, default: undefined } },
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
      const baseRoute = `/permissions/${this.table === 'tablegroup' ? 'tablegroups' : 'tablenames'}`
      let indexRoute; let updateRoute = baseRoute

      if (this.relation.entityName && this.relation.entityName !== 'role') {
        indexRoute = `${baseRoute}/${this.relation.entityName}/${this.entityId}`
        updateRoute = `${baseRoute}/${this.relation.entityName}`
      } else {
        indexRoute = `${baseRoute}/${this.entityId}`
        updateRoute = baseRoute
      }

      return {
        baseRoute,
        indexRoute,
        updateRoute,
      }
    },
    rows() {
      return this.$store.getters['table/listCache'](`table-group-${this.relation.entityName}-${this.entityId}`)
    },
    userRolePermissions() {
      return this.$store.getters['table/listCache'](`table-group-${this.roleId}`)
    },
  },
  async mounted() {
    if (this.rows.length <= 0) {
      await this.loadData()
    }
    if (this.relation.entityName === 'user') {
      await this.getUserRolePermissions()
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
        this.$successToast('Table Group updated successfully')
      } catch (err) {
        console.error('err: ', err)
      } finally {
        this.loading = false
      }
    },
    async loadData(customLoad = false) {
      this.loading = true
      let endpoint
      if (!customLoad) {
        endpoint = this.endpoint.indexRoute
      } else {
        endpoint = `${this.endpoint.baseRoute}/${this.roleId}`
      }
      await this.$http.get(endpoint)
        .then(resp => {
          const { data } = resp
          if (!customLoad) {
            this.$store.dispatch('table/setListData', { entity: `table-group-${this.relation.entityName}-${this.entityId}`, data })
            this.$root.$on('update-matrix', this.submit)
          } else {
            this.$store.dispatch('table/setListData', { entity: `table-group-${this.roleId}`, data })
          }
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    async getUserRolePermissions() {
      if (this.userRolePermissions.length <= 0) {
        try {
          // Je récupère les permissions liées au rôle de l'utilisateur
          await this.loadData(true)
        } catch (error) {
          console.log({ error })
        }
      }
    },
    isDisabled(row, operation) {
      const tablegroup = this.userRolePermissions.find(tgroup => row.tablegroup_id === tgroup.tablegroup_id)
      if (tablegroup) {
        return tablegroup[operation]
      }

      return false
    },
  },
}
</script>
<style scoped>

</style>

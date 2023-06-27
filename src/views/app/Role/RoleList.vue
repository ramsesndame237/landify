<template>
  <div class="">
    <p>A role provided access to predefined menus and features so that depending on assigned role an administrator can have access to what he need.</p>
    <b-overlay :show="roleLoading" rounded="sm">
      <div class="row">
        <div v-for="role in roles.slice(0,5)" :key="role.role_id" class="col-lg-4 col-sm-3 col-12">
          <b-card>
            <div class="d-flex justify-content-between align-items-center">
              <span class="h5">Total {{ role.users_number }} users</span>
              <b-avatar-group size="30px">
                <template v-for="user in role.users">
                  <b-avatar :key="user.user_id" :text="avatarPlaceholder(user)" />
                </template>
                <b-avatar v-if="role.users_number > 4">
                  <feather-icon
                    icon="PlusIcon"
                    size="18"
                  />
                </b-avatar>
              </b-avatar-group>
            </div>
            <b-card-text class="my-1">
              <h3>{{ role.role_name }}</h3>
            </b-card-text>
            <b-card-text class="d-flex justify-content-between">
              <b-link href="#" class="card-link">
                Edit role
              </b-link>
              <b-link href="#">
                <feather-icon
                  icon="CopyIcon"
                  size="18"
                />
              </b-link>
            </b-card-text>
          </b-card>
        </div>
        <div class="col-lg-4 col-sm-3 col-12">
          <b-card class="pt-2 pl-3" img-src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/assets/girl-using-mobile-26d497df.png" img-left>
            <div class="text-right">
              <b-card-text>
                <b-button variant="primary" class="capitalize">
                  Add new role
                </b-button>
              </b-card-text>
              <b-card-text>
                <span>Add Role, if it doesn't exist.</span>
              </b-card-text>
            </div>

          </b-card>
        </div>
      </div>
    </b-overlay>
    <b-card body-class="p-0">
      <table-pagination :search.sync="search" :per-page.sync="perPage" :current-page.sync="currentPage"
                        :total-rows="totalRows"
                        @filter="$refs.filter.openModal()"
      >
        <b-button size="sm" variant="primary" class="mr-1 btn-icon" hidden @click="$refs.filter.openModal()">
          <feather-icon icon="FilterIcon" />
        </b-button>
        <b-form-select v-model="filterValue" placeholder="Select an option" :options="filterOptions" class="mr-2" />
        <generic-filter ref="filter" vertical :table="table" :definition="definition" :initial-data="initialFilterData"/>
      </table-pagination>
    </b-card>
    <b-overlay :show="usersRoleLoading" rounded="sm">
      <b-card>
        <Datatable :key="table" ref="table" :selectable="false" :search="search" primary-key-column="user_id"
                   entity="role" :fields="definition.fields" :items="usersRoles" :total-rows.sync="totalRows"
                   :per-page="perPage" :current-page.sync="currentPage" entity-view="user" :with-delete="false"
                   :with-edit="false"
        />
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
import Tables from '@/table'
import TablePagination from '@/layouts/components/TablePagination.vue'
import GenericFilter from '@/views/app/Generic/Filter.vue'

const Datatable = () => import('@/layouts/components/DataTables.vue')

export default {
  name: 'RoleIndex',
  components: {
    Datatable,
    TablePagination,
    GenericFilter,
  },
  data() {
    const payload = this.$store.getters['table/tableData'](this.$route.params.table)
    return {
      table: this.$route.params.table,
      initialSortBy: payload?.sortBy,
      initialSortDesc: payload?.sortDesc ?? true,
      initialFilterData: payload?.filter,
      ids: this.$route.params.ids,
      search: payload?.search || '',
      perPage: payload?.perPage || 10,
      currentPage: payload?.currentPage || 1,
      totalRows: payload?.totalRows || 0,
      roles: [],
      roleLoading: false,
      usersRoleLoading: false,
      usersRoles: [],
      filterValue: '',
    }
  },
  computed: {
    definition() {
      return Tables[this.table]
    },
    filterOptions() {
      const filterOptions = this.roles.map(role => ({ text: role.role_name, value: role.role_id }))
      return [{ text: 'All', value: '' }, ...filterOptions]
    },
  },
  watch: {
    filterValue() {
      this.getUsersRoles()
    },
  },
  mounted() {
    this.getRoles()
    this.getUsersRoles()
  },
  beforeDestroy() {
    this.$store.commit('table/setTableData', {
      table: this.table,
      payload: {
        search: this.search,
        currentPage: this.currentPage,
        perPage: this.perPage,
        totalRows: this.totalRows,
        // filter: { ...this.$refs.filter.data },
        sortBy: this.$refs.table.sortBy,
        sortDesc: this.$refs.table.sortDesc,
      },
    })
  },
  methods: {
    avatarPlaceholder(user) {
      return user?.user_firstname.charAt(0)
     + user?.user_lastname.charAt(0)
    },
    async getRoles() {
      this.roleLoading = true
      const payload = { customEnpoint: '/users/roles', data: [{ per_page: this.perPage }] }
      try {
        const response = await this.$store.dispatch('table/fetchList', payload)
        this.roles = response
      } catch (error) {
        console.log({ error })
      } finally {
        this.roleLoading = false
      }
    },
    async getUsersRoles() {
      this.usersRoleLoading = true
      const payload = { customEnpoint: '/users/list-role', data: [{ per_page: this.perPage }, this.filterValue ? { role: this.filterValue } : {}] }
      try {
        const usersListRole = await this.$store.dispatch('table/fetchList', payload)
        this.usersRoles = usersListRole
        this.totalRows = usersListRole.length
      } catch (error) {
        console.log({ error })
      } finally {
        this.usersRoleLoading = false
      }
    },
  },
}
</script>

<style scoped>
.card-img-left{
  width: 6.2rem
}
</style>

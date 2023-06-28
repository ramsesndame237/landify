<template>
  <div class="">
    <p>A role provided access to predefined menus and features so that depending on assigned role an administrator can have access to what he need.</p>
    <b-overlay :show="roleLoading" rounded="sm">
      <div class="row">
        <div v-for="role in roles.slice(0,5)" :key="role.role_id" class="col-lg-4 col-sm-3 col-12">
          <b-card>
            <div class="d-flex justify-content-between align-items-center">
              <span class="h5"> {{ $t('text~role~nbr_users').replace(':users_number', role.users_number) }}</span>
              <b-avatar-group size="30px">
                <template v-for="user in role.users">
                  <b-avatar :key="user.user_id" :text="avatarPlaceholder(user)" />
                </template>
                <b-avatar v-if="role.users_number > 4">
                  <feather-icon
                    icon="PlusIcon"
                    size="12"
                  />
                  {{ role.users_number - 4 }}
                </b-avatar>
              </b-avatar-group>
            </div>
            <b-card-text class="my-1">
              <h3>{{ role.role_name }}</h3>
            </b-card-text>
            <b-card-text class="d-flex justify-content-between">
              <b-button class="card-link p-0" variant="link" @click="roleDetail(true, role)">
                {{ $t('button~edit_role') }}
              </b-button>
              <b-button class="p-0" variant="link" :title="$t('tooltip~btn-icon~detail-role')" @click="roleDetail(false, role)">
                <feather-icon
                  icon="EyeIcon"
                  size="18"
                />
              </b-button>
            </b-card-text>
          </b-card>
        </div>
        <div class="col-lg-4 col-sm-3 col-12">
          <b-card class="pt-2 pl-3" img-src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/assets/girl-using-mobile-26d497df.png" img-left>
            <div class="text-right">
              <b-card-text>
                <b-button variant="primary" class="capitalize" @click="$refs.modal.openModal(true,{})">
                  {{ $t('headline~role~new') }}
                </b-button>
              </b-card-text>
              <b-card-text>
                <span>{{ $t('text~role~add_if_not_exist') }}</span>
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
        <generic-filter ref="filter" vertical :table="table" :definition="definition" :initial-data="initialFilterData" />
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
    <generic-modal ref="modal" :fetch-data="false" :cache-key="table + '-'" :table="table"
                   :definition="definition" with-continue :table-definition-key="table" :title="`headline~${table}~new`"
                   @reload-table="getRoles"
    />
  </div>
</template>

<script>
import Tables from '@/table'
import TablePagination from '@/layouts/components/TablePagination.vue'
import GenericFilter from '@/views/app/Generic/Filter.vue'
import GenericModal from '@/views/app/Generic/modal.vue'

const Datatable = () => import('@/layouts/components/DataTables.vue')

export default {
  name: 'RoleIndex',
  components: {
    Datatable,
    TablePagination,
    GenericFilter,
    GenericModal,
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
    roleDetail(isEdit, role) {
      this.$router.push({
        name: 'table-view',
        params: {
          table: this.table, entity: role, id: role.role_id,
        },
        query: { edit: `${isEdit}` },
      })
    },
    /**
     * Afin de s'accommoder au visuel demandé et du fait que notre système ne possède pas d'avatar,
     * cette fonction renvoie les premières lettres du nom et prénom pour l'utiliser comme avatar
     * @param user
     * @returns string
     */
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
  width: 5.9rem
}
</style>

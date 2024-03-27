<template>
  <div class="">
    <div v-if="$isUserAdmin" class="row">
      <b-col v-for="(stat,index) in usersStatistics" :key="index" :sm="stat.cols.sm" :lg="stat.cols.lg">
        <b-overlay :show="loading">
          <b-card>
            <div class="d-flex justify-content-between">
              <div class="">
                <b-card-text class="h5">
                  {{ stat.title }}
                </b-card-text>
                <b-card-text class="d-flex h2 mt-1 align-items-center justify-content-between">
                  <span class="mr-1">{{ stat.number }}</span>
                </b-card-text>
                <b-card-text class="h4">
                  {{ stat.text }}
                </b-card-text>
              </div>
              <div class="">
                <b-avatar :variant="stat.avatarVariant">
                  <feather-icon :icon="stat.icon" size="20"/>
                </b-avatar>
              </div>
            </div>
          </b-card>
        </b-overlay>
      </b-col>
    </div>
    <b-card v-if="$isUserAdmin" title="Search Filter">
      <InlineFilter ref="filter" :table="table" :definition="definition" :initial-data="initialFilterData"
                    :with-actions="false" @filter="filter"/>
    </b-card>
    <b-card body-class="p-0">
      <table-pagination :search.sync="search" :per-page.sync="perPage" :current-page.sync="currentPage" :entity="table"
                        :on-new-element="definition.create ===false ? null : onNewElement" :total-rows="totalRows"
                        :with-filter="definition.filters && definition.filters.length > 0"
                        :inline-filter="!definition.inline_filter"
                        :show-input="definition.showInput"
                        :on-delete-elements="definition.delete !== false ? (()=> $refs.table.deleteSelected()):null"
                        :actions="definition.actions" @action="(a)=>$refs.table.onAction(a)"
                        @filter="$refs.filter.openModal()"/>
    </b-card>
    <b-card>
      <Datatable :key="table" ref="table" :search="search" :entity="table" :entity-list="definition.entity"
                 :with-delete="definition.delete !== false" :with-edit="definition.update !== false"
                 :default-sort-column="initialSortBy||definition.defaultSortField" :default-sort-desc="initialSortDesc"
                 :per-page="perPage" :current-page.sync="currentPage" :total-rows.sync="totalRows"
                 :on-edit-element="definition.inlineEdit ? editElement : null" :fields="definition.fields"
                 :primary-key-column="definition.primaryKey" :ids="ids" :entity-endpoint="definition.entityEndpoint"
                 :selectable="false" :can-read-item="canReadItem"
      />
    </b-card>
    <generic-modal ref="modal" :fetch-data="false" :cache-key="table+'-'" :table="table"
                   :definition="definition" with-continue :table-definition-key="table" :title="`headline~${table}~new`"
                   @reload-table="$refs.table.reload()"/>
    <SidebarModalComponent
      ref="sidebarComponent"
      :title="`headline~${table}~new`"
      :definition="definition"
      :options="definition.options || null"
    >
      <div slot="customHeader" class="header-customer mb-3 d-flex align-items-center justify-content-center bg-white  ">
        <span>
          {{ $t(`headline~${table}~new`) }}
        </span>
      </div>
    </SidebarModalComponent>
  </div>
</template>
<script>
import InlineFilter from '@/views/app/Generic/InlineFilter.vue'
import TablePagination from '@/layouts/components/TablePagination.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import SidebarModalComponent from '@/components/SidebarModalComponent.vue'

const Datatable = () => import('@/layouts/components/DataTables.vue')

export default ({
  name: 'UserIndex',
  components: {
    InlineFilter, Datatable, TablePagination, GenericModal, SidebarModalComponent,
  },
  props: ['definition'],
  data() {
    const payload = this.$store.getters['table/tableData'](this.$route.params.table)
    console.log('initial payload', payload)

    return {
      search: payload?.search || '',
      perPage: payload?.perPage || 10,
      currentPage: payload?.currentPage || 1,
      totalRows: payload?.totalRows || 0,
      initialFilterData: payload?.filter,
      initialSortBy: payload?.sortBy,
      initialSortDesc: payload?.sortDesc ?? true,
      table: this.$route.params.table,
      ids: this.$route.params.ids,
      total_active_users: 0,
      total_locked_users: 0,
      total_users: 0,
      loading: false,
    }
  },
  computed: {
    useModalToCreate() {
      return this.definition.createModal === 'modal'
    },
    usersStatistics() {
      return [
        {
          title: 'Users',
          number: this.total_users,
          text: 'Total Users',
          icon: 'UsersIcon',
          cols: {
            sm: 6,
            lg: 4,
          },
          avatarVariant: 'info',
        },
        {
          title: 'Status',
          number: this.total_locked_users,
          text: 'Locked Users',
          icon: 'UserXIcon',
          cols: {
            sm: 6,
            lg: 4,
          },
          avatarVariant: 'primary',
        },
        {
          title: 'Status',
          number: this.total_active_users,
          text: 'Active Users',
          icon: 'UserCheckIcon',
          cols: {
            sm: 6,
            lg: 4,
          },
          avatarVariant: 'success',
        },
      ]
    },
  },
  mounted() {
    this.getUsersStatistics()
  },
  beforeDestroy() {
    this.$store.commit('table/setTableData', {
      table: this.table,
      payload: {
        search: this.search || '',
        perPage: this.perPage || 10,
        currentPage: this.currentPage || 1,
        totalRows: this.totalRows || 0,
        initialFilterData: this.filter,
        initialSortBy: this.sortBy,
        initialSortDesc: this.sortDesc ?? true,
        ids: this.ids,
        total_active_users: this.total_active_users,
        total_locked_users: this.total_locked_users,
        total_users: this.total_users,
        loading: this.loading,
      },

    })
  },
  methods: {
    filter(data) {
      console.log('on filter', data)
      this.currentPage = 1
      this.$refs.table.filter(data)
    },
    onNewElement() {
      // if (this.useModalToCreate) this.$refs.modal.openModal(true, {})
      // else {
      //   this.$router.push({
      //     name: 'table-form',
      //     params: { table: this.table },
      //   })
      // }
      this.definition.createModal === 'sidebar' ? this.$refs.sidebarComponent.openSidebarComponent() : this.useModalToCreate ? this.$refs.modal.openModal(true, {}) : this.$router.push({
        name: 'table-form',
        params: { table: this.table },
      })
    },
    async getUsersStatistics() {
      this.loading = true
      try {
        const response = await this.$http.get('/statistics/users')
        const { data } = response
        this.total_active_users = data.total_active_users
        this.total_locked_users = data.total_locked_users
        this.total_users = data.total_users
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
    canReadItem() {
      return !this.$isUserExtern
    },
  },
})
</script>
<style lang="scss">
    .header-customer {
      height: 5.859375vh;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      span{
        font-size:1.389vw;
        font-weight: 700;
      }
    }

</style>

<template>
  <div>
    <b-card-actions :title="$t('general~filter')" action-collapse>
      <validation-observer ref="form" v-slot="{ passes }">
        <b-form @submit.prevent="passes(filter)">
          <b-row>
            <b-col v-for="(field, index) in filters" :key="index" cols="12" :md="4">
              <field
                ref="fields"
                :entity="filtersData"
                :disabled="$refs.dataTable && $refs.dataTable.tableStore.pagination.isLoading"
                :field="field"
              />
            </b-col>
          </b-row>
          <div class="d-flex justify-content-end">
            <b-button
              variant="primary"
              type="submit"
            >
              {{ $t('search') }}
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </b-card-actions>
    <div class="overflow-auto">
      <tab-component
        :nowrap="true"
        :active-tab-item="activeTabItem"
        :tab-title="tabTitles"
        @selected-item="getActiveItemData"
      />
    </div>

    <data-table
      ref="dataTable"
      :data="tData"
      :columns="cols"
      :no-initial-fetch="true"
      :floating-actions="false"
      :actions-at-the-last-column="true"
      :list-all-actions="true"
      :custom-actions="[
        { icon:'LockIcon',onClick: () => null, label:'Stamp' },
        { icon:'RefreshCwIcon',onClick: () => null, label:'Stamp' },
        { icon:'ArrowDownIcon',onClick: () => null, label:'Stamp' },
        { icon:'UploadIcon',onClick: () => null, label:'Stamp' },
      ]"
    />
  </div>
</template>

<script>
import TabComponent from '@/components/TabComponent.vue'
import { EXTERN_TEAMS_IDS, INTERN_TEAMS_IDS } from '@/config/config-access'
import { USER_PERMISSIONS, buildPermissions } from '@/config/config-access/config-permissions'
import { USER_ROLES } from '@/config/config-access/config-roles'
import DeadlineMixin from '@/views/app/Contracts/Relations/Deadlines/DeadlineMixin'
import Field from '@/views/app/Generic/Field'
import BCardActions from '@core/components/b-card-actions/BCardActions'
import {
  BCol,
  BForm, BRow,
} from 'bootstrap-vue'

const DataTable = () => import('@/views/app/CustomComponents/DataTable/DataTable.vue')

const BEGIN_YEAR_PAYMENT_LIST = 2022
const years = Array((new Date().getFullYear() + 1) - BEGIN_YEAR_PAYMENT_LIST).fill('').map((_, i) => (BEGIN_YEAR_PAYMENT_LIST + i)).reverse()
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].reverse()

export default {
  components: {
    Field,
    BCardActions,
    DataTable,
    BForm,
    BRow,
    BCol,
    TabComponent,
  },
  mixins: [DeadlineMixin],
  data() {
    const tData = [
      {
        name: 'Zahlung of Paul Org',
        company_name: 'Paul Org',
        status: 'Approved',
      },
    ]
    const tabTitles = months.map(year => ({
      id: year,
      title: year,
      show: true,
      count: 0,
    }))
    const payload = this.$store.getters['table/tableData'](this.$route.params.table)
    console.log('initial payload', payload)
    return {
      activeTabItem: tabTitles[0],
      tabTitles,
      filtersData: {},
      tData,
      cols: [
        {
          key: 'name',
          header: {
            name: 'zhalung_list_name',
          },
          props: {
            style: 'min-width: 320px;',
          },
        },
        {
          key: 'company_name',
          header: {
            name: 'Company',
          },
        },
        {
          key: 'status',
          header: {
            name: 'Status',
          },
        },
      ],
      filters: [
        {
          key: 'customergroup_id',
          type: 'list',
          list: 'customergroup',
          listLabel: 'customergroup_name',
          required: false,
        },
        {
          key: 'company_id',
          type: 'list',
          list: 'frontend_2_2_3_1',
          listLabel: 'company_name',
          filter_key: 'customergroup_id',
          required: false,
        },
        {
          key: 'year',
          type: 'custom-select',
          items: () => years.map(year => ({ label: year, value: year })),
        },
      ],
      permissions: buildPermissions({
        list: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.ext_team_member.withTeams(
            EXTERN_TEAMS_IDS.FM,
            EXTERN_TEAMS_IDS.MVM,
          ),
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.FM,
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.NKA,
            INTERN_TEAMS_IDS.BuHa,
          ),
          USER_PERMISSIONS.team_member.withTeams(
            INTERN_TEAMS_IDS.FM,
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.BuHa,
          ),
          USER_PERMISSIONS.lawyer,
        ],
        read: [USER_PERMISSIONS.lead, USER_PERMISSIONS.admin],
      }),
    }
  },
  computed: {
    canSeeActions() {
      return this.$isAdminOr(
        USER_ROLES.admin,
        USER_ROLES.lead,
        USER_ROLES.expansion_manager,
        USER_ROLES.ext_team_member.withTeams(
          EXTERN_TEAMS_IDS.BuHa,
          EXTERN_TEAMS_IDS.FM,
          EXTERN_TEAMS_IDS.MVM,
        ),
      )
    },
  },
  methods: {
    getActiveItemData(item) {
      this.activeTabItem = item
    },
  },
}
</script>

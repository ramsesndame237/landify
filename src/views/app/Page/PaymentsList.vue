<template>
  <div>
    <b-card-actions :title="$t('general~filter')" action-collapse>
      <validation-observer ref="form" v-slot="{ passes }">
        <b-form @submit.prevent="passes(getPaymentListData)">
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
              <feather-icon icon="SearchIcon" /> {{ $t('payment~list~search') }}
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </b-card-actions>

    <tab-component
      :nowrap="true"
      :active-tab-item="activeTabItem"
      :tab-title="visibleTabs"
      @selected-item="getActiveItemData"
    />

    <data-table
      ref="paymentListTable"
      url="/contracts/payment-list"
      :columns="cols"
      :floating-actions="false"
      :actions-at-the-last-column="true"
      :include-in-query="getFilters()"
      :list-all-actions="true"
      :custom-actions="[
        {
          icon: row => row.blocked ? 'UnlockIcon' : 'LockIcon',
          onClick: row => lockPaymentList(row),
          label: row => row.blocked ? 'payment~list~unlock' : 'payment~list~lock',
        },
        { icon: 'RefreshCwIcon', onClick: row => refreshPaymentList(row), label:'payment~list~refresh' },
        { icon: 'ArrowDownIcon', onClick: row => downloadDocument(row.document), label: 'payment~list~download~payment~list' },
        // { icon: 'UploadIcon', onClick: row => { paymentListToShare = row }, label:'payment~list~download~provision' },
      ]"
    />

    <b-modal
      v-model="modalShow"
      :title="$t('payment~list~select~a~board')"
      :ok-title="$t('payment~list~assign~to~this~board')"
      :ok-disabled="!shareEntity.board_id"
      @ok="provisionPaymentList"
    >
      <h3>{{ $t('payment~list~select~a~board') }}</h3>
      <p class="mb-1">{{ $t('payment~list~in~which~board~do~you~want~to~move') }}</p>
      <div class="mb-2">
        <field
          :entity="shareEntity"
          :field="{
            key: 'board_id',
            type: 'list',
            list: 'board',
            listLabel: 'board_name',
            noLabel: true,
          }"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import TabComponent from '@/components/TabComponent.vue'
import { EXTERN_TEAMS_IDS, INTERN_TEAMS_IDS } from '@/config/config-access'
import { USER_PERMISSIONS, buildPermissions } from '@/config/config-access/config-permissions'
import { USER_ROLES } from '@/config/config-access/config-roles'
import Field from '@/views/app/Generic/Field'
import BCardActions from '@core/components/b-card-actions/BCardActions'
import {
  BCol,
  BForm, BRow,
} from 'bootstrap-vue'
import { getDocumentLink } from '@/libs/utils'
import StatusCol from '../CustomComponents/DataTable/components/columns/StatusCol.vue'
import { handleConfirm } from '../CustomComponents/DataTable/state/data-table-store'

const DataTable = () => import('@/views/app/CustomComponents/DataTable/DataTable.vue')

const BEGIN_YEAR_PAYMENT_LIST = 2022
const years = Array((new Date().getFullYear() + 1) - BEGIN_YEAR_PAYMENT_LIST).fill('').map((_, i) => (BEGIN_YEAR_PAYMENT_LIST + i)).reverse()
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].reverse()

export default {
  name: 'PaymentList',
  components: {
    Field,
    BCardActions,
    DataTable,
    BForm,
    BRow,
    BCol,
    TabComponent,
  },
  data() {
    const tabTitles = months.map(month => ({
      id: month,
      title: month,
      show: true,
      count: 0,
    }))

    return {
      paymentListToShare: null,
      modalShow: false,
      loadedFirstTime: false,
      shareEntity: {},
      activeTabItem: tabTitles[tabTitles.length - (new Date().getMonth() + 1)],
      tabTitles,
      filtersData: {
        year: new Date().getFullYear(),
      },
      cols: [
        {
          key: 'document_name',
          getValue: data => data.document.document_name,
          header: {
            name: 'payment~list~payment~list~name',
          },
          props: {
            style: 'min-width: 320px; font-weight: bold;',
          },
        },
        {
          key: 'company_name',
          getValue: data => data.company.company_name,
          header: {
            name: 'payment~list~company',
          },
        },
        {
          key: 'status',
          component: StatusCol,
          variant: ({ data }) => (data.blocked ? 'success' : 'warning'),
          getValue: data => this.$t(
            data.blocked ? 'payment~list~locked' : 'payment~list~unlocked',
          ),
          header: {
            name: 'general~status',
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
          items: () => years.map(year => ({
            label: year,
            value: year,
          })),
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
    visibleTabs() {
      if (this.filtersData.year === (new Date().getFullYear())) {
        return [...this.tabTitles].slice(this.tabTitles.length - (new Date().getMonth() + 1), this.tabTitles.length)
      }
      return this.tabTitles
    },
  },
  watch: {
    paymentListToShare(val) {
      this.modalShow = !!val
    },
    modalShow(val) {
      if (!val) {
        this.paymentListToShare = null
      }
    },
    activeTabItem() {
      this.getPaymentListData()
    },
  },
  methods: {
    getActiveItemData(item) {
      this.activeTabItem = item
    },
    getFilters() {
      return {
        ...this.filtersData,
        month: this.tabTitles.length - (this.tabTitles.findIndex(tab => tab.id === this.activeTabItem.id)),
      }
    },
    getPaymentListData() {
      this.$refs.paymentListTable.getData(this.getFilters())
    },
    lockPaymentList(paymentList) {
      handleConfirm({
        swal: this.$swal,
        http: this.$http,
        url: `/contracts/payment-list/blocked?blocked=${!paymentList.blocked}`,
        title: this.$t(`payment~list~really~want~to~${paymentList.blocked ? 'un' : ''}lock`),
        method: 'put',
        body: [paymentList.id],
        cb: () => {
          const updatedPayment = this.$refs.paymentListTable.tableStore.rows.list.find(paymentListRow => paymentList.id === paymentListRow.id)
          updatedPayment.blocked = !paymentList.blocked
        },
      })
    },
    refreshPaymentList(paymentList) {
      if (paymentList.blocked) {
        return this.$swal.fire({
          icon: 'warning',
          title: this.$t('payment~list~unlock~the~document~first')
        })
      }
      handleConfirm({
        swal: this.$swal,
        http: this.$http,
        url: `/contracts/payment-list/export?company_id=${paymentList.company.company_id}`,
        title: this.$t('payment~list~really~want~to~refresh~the~file'),
        method: 'post',
        body: [paymentList.id],
        cb: this.getPaymentListData,
      })
    },
    downloadDocument(doc) {
      window.open(getDocumentLink(doc))
    },
    provisionPaymentList() {
      const body = {
        ticket_name: "string",
        contract_id: 0,
        board_id: 0,
        priority_id: 0
      }
      handleConfirm({
        swal: this.$swal,
        http: this.$http,
        title: this.$t('payment~list~really~want~to~provision'),
        url: `/tickets/payment-list/${this.paymentListToShare.id}`,
        method: 'put',
        body,
        cb: this.getPaymentListData,
      })
      this.shareEntity.board_id = undefined
    },
  },
}
</script>

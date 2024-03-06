<template>
  <div class="">
    <template v-if="isOptionsVisible">
      <b-overlay :show="loadingDeadline" spinner-variant="primary">
        <div class="d-flex justify-content-between my-2">
          <b-card-text class="mb-0">
            <b-button variant="primary" size="sm" @click="isOptionsVisible = false">
              <feather-icon icon="ArrowLeftIcon" class="mr-50" />
              Back
            </b-button>
          </b-card-text>
          <b-card-text class="d-flex align-items-center">
            <b-button  class="my-1" size="sm" variant="info" >
              See Available Options
               <feather-icon :icon="collapseVisible ? 'ChevronsDownIcon' : 'ChevronsUpIcon'" /> <!--v-b-toggle.available-options -->
            </b-button>
          </b-card-text>
        </div>

        <b-collapse id="available-options" >
          <b-card no-body>
            <b-card-text>
              <h3>Active Options</h3>
              <data-tables
                :fields="unactiveDeadlinesFieldsToShow"
                :multi-select="false" :with-actions="false"
                :items="unactivatedDeadlines"
                :entity="relation.entity"
                default-sort-column="contractdeadline_expected_from"
                :selectable="false"
                with-nested
                sub-fields-type="component"
                :sub-fields-component="DeadlineComments"
                sub-fields-data-key="contractdeadline_negotiations"
                :sub-fields-data="{modalSize: 'sm', modalTitle: 'Comments', insertAtIndex: 5, btnText: 'Show comments', theadText: 'Comments'}"
              />
            </b-card-text>
          </b-card>
        </b-collapse>
        <!-- <b-card-text>
          <h3>Active Options</h3>
          <data-tables
            :fields="deadlinesFieldsToShow"
            :multi-select="false" :with-actions="false"
            :items="activatedDeadlines"
            :entity="relation.entity"
            default-sort-column="contractdeadline_expected_from"
            :selectable="false"
            @table-refreshed="getActions"
          />
        </b-card-text> -->
      </b-overlay>
    </template>

    <template v-else>
      <b-overlay :show="loadingAction" spinner-variant="primary">
        <data-tables
          :fields="relation.fields"
          :items="actions"
          :selectable="false"
          :default-sort-column="relation.defaultSortField"
          :entity="relation.entity"
          :with-view="false"
          :can-make-delete-call="false"
          :on-edit-element="editAction"
          :can-update-item="canUpdateItem"
          :can-delete-item="canDeleteItem"
          @table-refreshed="getActions"
          @delete-items="deleteAction"
        />
         <b-collapse id="available-options" v-show="isOptionsVisible">
          <b-card no-body >
            <b-card-text>
              <h3>Available Options</h3>
              <data-tables
                :fields="unactiveDeadlinesFieldsToShow"
                :multi-select="false" :with-actions="false"
                :items="unactivatedDeadlines"
                :entity="relation.entity"
                default-sort-column="contractdeadline_expected_from"
                :selectable="false"
                with-nested
                sub-fields-type="component"
                :sub-fields-component="DeadlineComments"
                sub-fields-data-key="contractdeadline_negotiations"
                :sub-fields-data="{modalSize: 'sm', modalTitle: 'Comments', insertAtIndex: 5, btnText: 'Show comments', theadText: 'Comments'}"
              />
            </b-card-text>
          </b-card>
        </b-collapse>
        <b-card-text class="text-right">
           <b-button v-b-toggle.available-options variant="primary" @click="showOptions" > <!--@click="collapseVisible = !collapseVisible" -->
            viewed all Options
          </b-button>
        </b-card-text>
        <DeadlinesTools ref="modal" force-title="Edit Action" :is-button-showed="false" />
      </b-overlay>
    </template>
  </div>
</template>
<script>
import moment from 'moment'
import sortBy from 'lodash/sortBy'
import DataTables from '@/layouts/components/DataTables.vue'
import DeadlinesTools from '@/views/app/Contracts/Relations/Deadlines/DeadlinesTools.vue'
import DeadlineComments from '@/views/app/Contracts/Relations/Deadlines/DeadlineComments.vue'

export default {
  name: 'DeadlineTable',
  components: { DeadlinesTools, DataTables },
  props: { relation: Object, entityId: {} },
  data() {
    return {
      acting_by: [
        { label: ' Mieter & Vermieter', value: 'mieter_vermieter' },
        { label: 'Mieter', value: 'mieter' },
        { label: 'Vermieter', value: 'vermieter' },
      ],
      deadlineFields: [
        {
          key: 'contractdeadline_type',
          hideOnForm: true,
          send: false,
          label: 'Action',
          formatter: (value, key, item) => {
            const { contractdeadline_option_position } = item
            return contractdeadline_option_position !== 1 ? `then ${this.types[value]}` : this.types[value]
          },
        },
        {
          key: 'contractdeadline_id',
          hideOnForm: true,
          hideOnIndex: true,
          auto: true,
        },
        {
          key: 'contractdeadline_acting_by',
          label: 'Acting by',

          type: 'custom-select',
          items: this.acting_by,
        },
        {
          key: 'contractdeadline_option_position', type: 'number', label: 'N° options', hideOnIndex: true,
        },
        {
          key: 'contractdeadline_options',
          type: 'number',
          label: 'To Activate',
          formatter: (value, key, item) => {
            const { contractdeadline_unlimitted_option, contractdeadline_type } = item
            if (contractdeadline_unlimitted_option === 1 && ['automatic_extension'].includes(contractdeadline_type)) return '\u{221E}'
            return (!value ? '--' : value)
          },
        },
        {
          key: 'contractdeadline_available_options',
          label: 'Available options',
          hideOnForm: true,
          formatter: (value, key, item) => {
            const {
              contractaction_id,
              contractdeadline_option_position,
              contractdeadline_status,
              contractdeadline_unlimitted_option,
              contractdeadline_type,
            } = item

            if (contractdeadline_status === 'resiliated') {
              return 0
            }
            if (contractdeadline_unlimitted_option === 1 && ['automatic_extension'].includes(contractdeadline_type)) return '\u{221E}'

            const deadlineByActionId = this.deadlines.filter(deadline => deadline.contractaction_id === contractaction_id)
            const greaterThanItemDeadline = deadlineByActionId.filter(deadline => deadline.contractdeadline_option_position > contractdeadline_option_position)
            const deactivateDeadlines = greaterThanItemDeadline.filter(deadline => ['deactivate'].includes(deadline.contractdeadline_status))
            return greaterThanItemDeadline.length - deactivateDeadlines.length
          },
        },
        {
          key: 'contractaction_extension_value', type: 'number', label: 'Extension value', hideOnIndex: true,
        },
        { key: 'contractaction_extension_unit', label: 'Extension unit', hideOnIndex: true },
        { key: 'contractdeadline_notice_period_value', type: 'number', hideOnIndex: true },
        {
          key: 'contractdeadline_notice_period_unit',
          hideOnIndex: true,
          type: 'custom-select',
          items: [
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
            { label: 'Year', value: 'year' },
          ],
        },
        {
          key: 'contractdeadline_notice_period',
          label: 'Notice period',
          hideOnForm: true,
          send: false,
          formatter: (value, key, item) => {
            const { contractdeadline_notice_period_value, contractdeadline_notice_period_unit } = item
            return `${contractdeadline_notice_period_value}  ${contractdeadline_notice_period_unit}`
          },
        },
        {
          key: 'contractdeadline_expected_from',
          label: 'Expected from',
          type: 'date',
          hideOnForm: true,
          send: false,
          hideOnIndex: true,
        },
        {
          key: 'contractdeadline_expected_to',
          label: 'Expected to',
          type: 'date',
          hideOnForm: true,
          send: false,
          hideOnIndex: true,
        },
        {
          key: 'contractaction_extension',
          label: 'Extension',
          hideOnForm: true,
          send: false,
          formatter: (value, key, item) => {
            const { contractdeadline_extension_value, contractdeadline_extension_unit } = item
            return `${contractdeadline_extension_value}  ${contractdeadline_extension_unit}`
          },
        },
        {
          key: 'contractdeadline_resiliation_date', type: 'date', hideOnForm: true, label: 'Resiliation date', formatter: value => (!value ? '--' : value),
        },
        {
          key: 'contractdeadline_status',
          hideOnForm: true,
          label: 'Status',
          formatter: value => {
            const status = {
              passed: 'Passed', active: 'Active', pulled: 'Pulled', unactive: 'Unactive',
            }

            return status[value]
          },
        },
        {
          key: 'action',
          hideOnForm: true,
          label: 'Action',
          type: 'component',
          component: () => import('@/views/app/Contracts/Relations/Deadlines/ActiveDeadlineActions.vue'),
          props: {
            getDeadlines: () => this.deadlines,
            reload: loading => { this.loadingDeadline = loading },
            fetchDeadlines: () => this.getDeadlines(),
          },
        },
      ],
      unactiveDeadlineFields: [
        {
          key: 'contractdeadline_type',
          hideOnForm: true,
          send: false,
          label: 'Action name',
          formatter: value => this.types[value],
        },
        {
          key: 'contractdeadline_id',
          hideOnForm: true,
          hideOnIndex: true,
          auto: true,
        },
        {
          key: 'contractdeadline_acting_by',
          label: 'Acting by',
          hideOnIndex: true,
          type: 'custom-select',
          items: this.acting_by,
        },
        {
          key: 'contractdeadline_option_position', type: 'number', label: 'N° options',
        },
        {
          key: 'contractdeadline_options', type: 'number', label: 'To Activate', hideOnIndex: true,
        },
        {
          key: 'contractdeadline_available_options',
          label: 'Available options',
          hideOnForm: true,
          formatter: (value, key, item) => {
            const { contractdeadline_options, contractdeadline_option_position, contractdeadline_status } = item
            if (contractdeadline_status === 'resiliated') {
              return 0
            }
            return contractdeadline_options - contractdeadline_option_position
          },
          hideOnIndex: true,
        },
        {
          key: 'contractaction_extension_value', type: 'number', label: 'Extension value', hideOnIndex: true,
        },
        { key: 'contractaction_extension_unit', label: 'Extension unit', hideOnIndex: true },
        {
          key: 'contractdeadline_resiliation_date', type: 'date', hideOnForm: true, hideOnIndex: true, label: 'Resiliation date', formatter: value => (!value ? '--' : value),
        },
        {
          key: 'contractaction_extension',
          label: 'Extension',
          hideOnForm: true,
          hideOnIndex: true,
          send: false,
          formatter: (value, key, item) => {
            const { contractdeadline_extension_value, contractdeadline_extension_unit } = item
            return `${contractdeadline_extension_value}  ${contractdeadline_extension_unit}`
          },
        },
        {
          key: 'contractdeadline_creation_time',
          hideOnForm: true,
          label: 'Activation date',
          hideOnIndex: true,
          type: 'date',
        },
        { key: 'contractdeadline_notice_period_value', type: 'number', hideOnIndex: true },
        {
          key: 'contractdeadline_notice_period_unit',
          hideOnIndex: true,
          type: 'custom-select',
          items: [
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
            { label: 'Year', value: 'year' },
          ],
        },
        {
          key: 'contractdeadline_notice_period',
          label: 'Notice period',
          hideOnForm: true,
          hideOnIndex: true,
          send: false,
          formatter: (value, key, item) => {
            const { contractdeadline_notice_period_value, contractdeadline_notice_period_unit } = item
            return `${contractdeadline_notice_period_value}  ${contractdeadline_notice_period_unit}`
          },
        },
        {
          key: 'contractdeadline_expected_from',
          label: 'Expected from',
          type: 'date',
          hideOnForm: true,
          send: false,
        },
        {
          key: 'contractdeadline_expected_to',
          label: 'Expected to',
          type: 'date',
          hideOnForm: true,
          send: false,
        },
        // {
        //   key: 'contractdeadline_notice_date',
        //   label: 'Notice date',
        //   hideOnForm: true,
        //   send: false,
        //   type: 'date',
        // },
        {
          key: 'contractdeadline_status',
          hideOnForm: true,
          label: 'Status',
          formatter: value => {
            const status = { notdue: 'Not Due', deactivate: 'Deactivate', negotiation: 'In Negotiation' }

            return status[value]
          },
        },
        {
          key: 'action',
          hideOnForm: true,
          label: 'Action',
          type: 'component',
          component: () => import('@/views/app/Contracts/Relations/Deadlines/UnactiveDeadlinesActions.vue'),
          props: {
            getDeadlines: () => this.deadlines,
            reload: loading => { this.loadingDeadline = loading },
            fetchDeadlines: () => this.getDeadlines(),
          },
        },
      ],
      totalRows: 0,
      perPage: 100000,
      currentPage: 1,
      search: '',
      actionSelectedId: null,
      loadingAction: false,
      loadingDeadline: false,
      isOptionsVisible: false,
      collapseVisible: false,
      types: {
        active_option: 'Active Option',
        automatic_option: 'Automatic Option',
        automatic_extension: 'Automatic extension',
        resiliation: 'Resiliation',
        special_resiliation: 'Special Resiliation',
      },
    }
  },
  computed: {
    DeadlineComments() {
      return DeadlineComments
    },
    deadlinesFieldsToShow() {
      return this.deadlineFields.filter(field => !field.hideOnIndex)
    },
    unactiveDeadlinesFieldsToShow() {
      return this.unactiveDeadlineFields.filter(field => !field.hideOnIndex)
    },
    actions() {
      return this.$store.getters['table/listCache'](`contract-actions-${this.entityId}`)
    },
    deadlines() {
      return this.$store.getters['table/listCache'](`contract-deadlines-${this.entityId}`)
    },
    isNoticeDateArrived() {
      const activeDeadline = this.deadlines.find(deadline => deadline.contractdeadline_status === 'active')

      if (activeDeadline) {
        const { contractdeadline_notice_date } = activeDeadline

        console.log({
          activeDeadline, now: moment(), deadlineNoticeDate: moment(contractdeadline_notice_date), isSameOrBefore: moment(contractdeadline_notice_date).isSameOrBefore(moment()),
        })

        return moment(contractdeadline_notice_date).isSameOrBefore(moment())
      }
      return false
    },
    actionsToShow() {
      const finishedActions = []
      const _actions = this.actions.filter(action => !['cancelled'].includes(action.contractaction_status))

      if (_actions.length <= 0) return []

      const activeActions = _actions.filter(action => action.contractaction_status === 'active')
      if (activeActions.length > 0) {
        const activeActionsIds = activeActions.map(action => action.contractaction_id)
        if (this.deadlines.length > 0) {
          const activeDeadlines = this.deadlines.filter(deadline => deadline.contractdeadline_status === 'active')

          activeDeadlines.forEach(deadline => {
            const { contractdeadline_option_position, contractdeadline_options, contractaction_id } = deadline
            if (activeActionsIds.includes(contractaction_id) && (contractdeadline_options - contractdeadline_option_position) <= 0) {
              finishedActions.push(contractaction_id)
              console.log('Ici if test available = 0', { finishedActions })
            }
          })
        }
      }

      return _actions.filter(action => !finishedActions.includes(action.contractaction_id)).map(action => ({
        label: this.types[action.contractaction_type], value: action.contractaction_id, type: action.contractaction_type, data: action,
      }))
    },
    activatedDeadlines() {
      return this.deadlines.filter(deadline => !['notdue', 'deactivate', 'negotiation'].includes(deadline.contractdeadline_status))
    },
    unactivatedDeadlines() {
      const _deadlines = this.deadlines.filter(deadline => ['notdue', 'deactivate', 'negotiation'].includes(deadline.contractdeadline_status))
      const cancelledActions = this.actions.filter(action => action.contractaction_status === 'cancelled').map(action => action.contractaction_id)
      // Ici, lorsque une deadline est lièe à une action qui a étét cancelled, je la mets en rouge

      return _deadlines.map(deadline => {
        if (cancelledActions.includes(deadline.contractaction_id)) {
          return { ...deadline, _rowVariant: 'danger' }
        }
        return deadline
      })
    },
    editComponent() {
      return this.$parent.$parent.$parent
    },
  },
  watch: {
    isOptionsVisible(newVal) {
      this.editComponent.showTool = !newVal
    },
  },
  mounted() {
    this.getActions()
  },
  methods: {
    async getActions(refresh = false) {
      if (this.actions.length <= 0 || refresh === true) {
        this.loadingAction = true
        try {
          const response = await this.$http.get('/contracts/actions', {
            params: {
              contract_id: this.entityId,
              size: this.perPage,
            },
          })
          const { data } = response.data
          const sortedData = sortBy(data, ['contractaction_id'])
          await this.$store.dispatch('table/setListData', { entity: `contract-actions-${this.entityId}`, data: sortedData })
          console.log({ response })
        } catch (error) {
          console.log({ error })
        } finally {
          this.loadingAction = false
        }
      }
    },
    async getDeadlines() {
      this.loadingDeadline = true
      try {
        const response = await this.$http.get('/contracts/deadlines', {
          params: {
            contract_id: this.entityId,
            size: this.perPage,
          },
        })
        const { data } = response.data
        const sortedData = sortBy(data, ['contractdeadline_id'])
        await this.$store.dispatch('table/setListData', { entity: `contract-deadlines-${this.entityId}`, data: sortedData })
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingDeadline = false
      }
    },
    async showOptions() {
      this.loadingAction = true
      if (this.deadlines.length <= 0) {
        await this.getDeadlines()
      }
      this.collapseVisible = !this.collapseVisible
      // this.loadingDeadline = true
      this.isOptionsVisible = true
      this.loadingAction = false
    },
    editAction(entity) {
      this.$refs.modal.openModal(false, entity, 'Edit Action Data')
    },
    async deleteAction(data) {
      console.log('From delete call', { data })
      try {
        await this.$http.delete(`/contracts/deadline/action/${data[0].contractaction_id}`)
        this.$successToast('Action delete successfully !!!')
        await this.getActions(true)
        await this.getDeadlines()
      } catch (error) {
        this.$errorToast(error.response.data.detail)
        console.log({ error })
      }
    },
    canUpdateItem(item) {
      const { contractaction_status } = item
      return ['active', 'cancelled'].includes(contractaction_status)
    },
    canDeleteItem(item) {
      const { contractaction_status } = item
      return ['active', 'cancelled'].includes(contractaction_status)
    },
  },
}
</script>

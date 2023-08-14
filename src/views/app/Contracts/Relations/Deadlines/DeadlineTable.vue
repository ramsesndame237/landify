<template>
  <div class="">
    <template v-if="isOptionsVisible">
      <b-overlay :show="loadingDeadline">
        <div class="d-flex justify-content-between my-2">
          <b-card-text class="mb-0">
            <b-button variant="primary" size="sm" @click="isOptionsVisible = false">
              <feather-icon icon="ArrowLeftIcon" class="mr-50" />
              Back
            </b-button>
          </b-card-text>
          <b-card-text class="d-flex align-items-center">
            <DeadlinesStatusSelect :actions="actionsToShow" :deadlines="deadlines" :is-notice-date-arrived="isNoticeDateArrived" />
          </b-card-text>
        </div>
        <data-tables
          :fields="deadlinesFieldsToShow"
          :multi-select="false" :with-actions="false"
          :items="deadlines"
          :entity="relation.entity"
          default-sort-column="contractdeadline_status"
          :selectable="false"
          @table-refreshed="getActions"
        />
      </b-overlay>
    </template>

    <template v-else>
      <b-overlay :show="loadingAction">
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
        <b-card-text class="text-right">
          <b-button variant="primary" @click="showOptions">
            viewed all Options
          </b-button>
        </b-card-text>
        <DeadlinesTools ref="modal" force-title="Edit Action" :is-button-showed="false" />
      </b-overlay>
    </template>
  </div>
</template>
<script>
import DataTables from '@/layouts/components/DataTables.vue'
import DeadlinesStatusSelect from '@/views/app/Contracts/Relations/Deadlines/DeadlinesStatusSelect.vue'
import DeadlinesTools from '@/views/app/Contracts/Relations/Deadlines/DeadlinesTools.vue'
import moment from 'moment'
import sortBy from 'lodash/sortBy'

export default {
  name: 'DeadlineTable',
  components: { DeadlinesTools, DeadlinesStatusSelect, DataTables },
  props: { relation: Object, entityId: {} },
  data() {
    return {
      deadlineFields: [
        {
          key: 'contractdeadline_type',
          hideOnForm: true,
          send: false,
          label: 'Action',
          formatter: (value, key, item) => {
            const types = {
              active_option: 'Active Option',
              automatic_option: 'Automatic Option',
              automatic_extension: 'Automatic extension',
              resiliation: 'Resiliation',
              special_resiliation: 'Special Resiliation',
            }
            const { contractdeadline_option_position } = item
            return contractdeadline_option_position !== 1 ? `then ${types[value]}` : types[value]
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
          items: [
            { label: 'Mieter', value: 'mieter' },
            { label: 'Vermieter', value: 'vermieter' },
          ],
        },
        {
          key: 'contractdeadline_option_position', type: 'number', label: 'N° options',
        },
        { key: 'contractdeadline_options', type: 'number', label: 'To Activate' },
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
        },
        {
          key: 'contractaction_extension_value', type: 'number', label: 'Extension value', hideOnIndex: true,
        },
        { key: 'contractaction_extension_unit', label: 'Extension unit', hideOnIndex: true },
        {
          key: 'contractdeadline_resiliation_date', hideOnForm: true, label: 'Resiliation date', formatter: value => (!value ? '--' : value),
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
          key: 'contractdeadline_creation_time',
          hideOnForm: true,
          label: 'Activation date',
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
          send: false,
          formatter: (value, key, item) => {
            const { contractdeadline_notice_period_value, contractdeadline_notice_period_unit } = item
            return `${contractdeadline_notice_period_value}  ${contractdeadline_notice_period_unit}`
          },
        },
        {
          key: 'contractdeadline_notice_date',
          label: 'Notice date',
          hideOnForm: true,
          send: false,
        },
        {
          key: 'contractdeadline_status',
          hideOnForm: true,
          label: 'Status',
        },
      ],
      totalRows: 0,
      perPage: 10,
      search: '',
      actionSelectedId: null,
      loadingAction: false,
      loadingDeadline: false,
      isOptionsVisible: false,
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
    deadlinesFieldsToShow() {
      return this.deadlineFields.filter(field => !field.hideOnIndex)
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
    },
    actionsToShow() {
      const finishedActions = []
      const _actions = this.actions.filter(action => !['cancelled'].includes(action.contractaction_status))
      console.log('Actionns différent of cancelled', {_actions})

      if (_actions.length <= 0) return []

      const activeActions = _actions.filter(action => action.contractaction_status === 'active')
      console.log('Actives actions', {activeActions})
      if (activeActions.length > 0) {
        const activeActionsIds = activeActions.map(action => action.contractaction_id)
        if (this.deadlines.length > 0) {
          console.log('There is deadlines', this.deadlines)

          const activeDeadlines = this.deadlines.filter(deadline => deadline.contractdeadline_status === 'active')
          console.log('There is active deadlines', {activeDeadlines})

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
    async getDeadlines(refresh = false) {
      if (this.deadlines.length <= 0 || refresh === true) {
        this.loadingDeadline = true
        try {
          const response = await this.$http.get('/contracts/deadlines', {
            params: {
              contract_id: this.entityId,
            },
          })
          const { data } = response.data
          const sortedData = sortBy(data, ['contractdeadline_id'])
          await this.$store.dispatch('table/setListData', { entity: `contract-deadlines-${this.entityId}`, data: sortedData })
          this.isOptionsVisible = true
        } catch (error) {
          console.log({ error })
        } finally {
          this.loadingDeadline = false
        }
      } else {
        this.isOptionsVisible = true
      }
    },
    async showOptions() {
      this.loadingAction = true
      await this.getDeadlines()
      if (!this.isOptionsVisible) {
        this.$errorToast('No options to show !!!')
      }
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

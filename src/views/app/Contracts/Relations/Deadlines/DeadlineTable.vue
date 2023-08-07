<script>
import DataTables from '@/layouts/components/DataTables.vue'
import DeadlinesStatusSelect from '@/views/app/Contracts/Relations/Deadlines/DeadlinesStatusSelect.vue'
import DeadlinesTools from '@/views/app/Contracts/Relations/Deadlines/DeadlinesTools.vue'

export default {
  name: 'DeadlineTable',
  components: { DeadlinesTools, DeadlinesStatusSelect, DataTables },
  props: { relation: Object, entityId: {} },
  data() {
    return {
      deadlineFields: [
        {
          key: 'action',
          hideOnForm: true,
          send: false,
          label: 'Action',
          formatter: (value, key, item) => {
            const { contractdeadline_status, contractdeadline_option_position } = item

            switch (contractdeadline_status) {
              case 'notdue': {
                return contractdeadline_option_position === 1 ? 'active option' : 'then active option'
              }
              case 'active': {
                return 'active option'
              }
            }
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
        { key: 'contractdeadline_resiliation_date', hideOnForm: true, label: 'Resiliation date' },
        { key: 'contractdeadline_extension', type: 'number', label: 'Extension(in year)' },
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
      actions: [],
      totalRows: 0,
      perPage: 10,
      search: '',
      actionSelectedId: null,
      deadlines: [],
      loadingAction: false,
      loadingDeadline: false,
      isOptionsVisible: false,
    }
  },
  computed: {
    deadlinesFieldsToShow() {
      return this.deadlineFields.filter(field => !field.hideOnIndex)
    },
  },
  mounted() {
    this.getActions()
  },
  methods: {
    async getActions() {
      this.loadingAction = true
      try {
        const response = await this.$http.get('/contracts/actions', {
          params: {
            contract_id: this.entityId,
          },
        })
        this.actions = response.data.data
        console.log({ response })
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingAction = false
      }
    },
    async getDeadlines() {
      this.loadingDeadline = true
      try {
        const response = await this.$http.get('/contracts/deadlines', {
          params: {
            contract_id: this.entityId,
          },
        })
        this.deadlines = response.data.data
        console.log({ response })
        this.isOptionsVisible = true
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingDeadline = false
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
    itemSelected(data) {
      console.log('selected Function', { data })
    },
    editAction(entity) {
      this.$refs.modal.openModal(false, entity, 'Edit Action Data')
    },
    async deleteAction(data) {
      console.log('From delete call', { data })
      try {
        const response = await this.$http.delete(`/contracts/deadline/action/${data[0].contractaction_id}`)
        this.$successToast('Action delete successfully !!!')
        await this.getActions()
      } catch (error) {
        this.$errorToast(error.response.data.detail)
        console.log({ error })
      }
    },
  },
}
</script>

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
            <DeadlinesStatusSelect :actions="actions" />
          </b-card-text>
        </div>
        <data-tables
          :fields="deadlinesFieldsToShow"
          :multi-select="false" :with-actions="false"
          :items="deadlines"
          :entity="relation.entity"
          default-sort-column="contractdeadline_id"
          :selectable="false"
          @selected="itemSelected"
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
          @selected="itemSelected"
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

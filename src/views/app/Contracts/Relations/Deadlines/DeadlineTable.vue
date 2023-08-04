<script>
import DataTables from '@/layouts/components/DataTables.vue'

export default {
  name: 'DeadlineTable',
  components: { DataTables },
  props: { relation: Object, entityId: {} },
  data() {
    return {
      actionsFields: [
        {
          key: 'action',
          hideOnForm: true,
          send: false,
          label: 'Action',
          formatter: (value, key, item) => {
            const { contractdeadline_status } = item

            switch (contractdeadline_status) {
              case 'notdue': {
                return 'then active option'
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
            const { contractdeadline_options, contractdeadline_option_position } = item
            return contractdeadline_options - contractdeadline_option_position
          },
        },
        { key: 'contractdeadline_resiliation_date', hideOnForm: true, label: 'Resiliation' },
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
          key: 'contractdeadline_status',
          hideOnForm: true,
          type: 'component',
          label: 'Status',
          component: () => import('@/views/app/Contracts/Relations/Deadlines/DeadlinesStatusSelect.vue'),
          props: {
            items: [
              { label: 'Pull Action', value: 'pull' },
              { label: 'Extend Contract', value: 'extend' },
              { label: 'Terminate Contract', value: 'END' },
            ],
          },
        },
      ],
      deadlines: [],
      totalRows: 0,
      perPage: 10,
      isOptionsVisible: false,
      search: '',
      actionSelectedId: null,
    }
  },
  computed: {
    selectedValues() {
      const action = this.deadlines.find(item => item.__selected === true)
      if (action) {
        this.actionSelectedId = action.contractaction_id
        return action
      }

      return this.deadlines.find(deadline => deadline.contractaction_id === this.actionSelectedId)
    },
    actionsFieldsToShow() {
      return this.actionsFields.filter(field => !field.hideOnIndex)
    },
    actionsDeadlines() {
      return this.selectedValues?.contractdeadlines
    },
  },
  mounted() {
    this.getDeadlines()
  },
  methods: {
    async getDeadlines() {
      try {
        const response = await this.$http.get('/contracts/deadlines', {
          params: {
            contract_id: this.entityId,
          },
        })
        this.deadlines = response.data.data
        console.log({ response })
      } catch (error) {
        console.log({ error })
      }
    },
    showOptions() {
      if (this.selectedValues.length <= 0 || this.selectedValues.length > 1) {
        this.$errorToast('Please Select one action')
        return
      }
      this.isOptionsVisible = true
    },
    itemSelected(data) {
      console.log('selected Function', { data })
    },
  },
}
</script>

<template>
  <div class="">
    <template v-if="isOptionsVisible">
      <data-tables
        :fields="actionsFieldsToShow"
        :multi-select="false" :with-actions="false"
        :items="actionsDeadlines"
        :entity="relation.entity"
        default-sort-column="contractdeadline_id"
        @selected="itemSelected"
        @table-refreshed="getDeadlines"
      />
      <b-card-text class="mt-3">
        <b-button variant="primary" size="sm" @click="isOptionsVisible = false">
          <feather-icon icon="ArrowLeftIcon" class="mr-50" />
          Back
        </b-button>
      </b-card-text>
    </template>
    <template v-else>
      <data-tables
        :fields="relation.fields"
        :with-actions="false"
        :items="deadlines"
        :multi-select="false"
        :default-sort-column="relation.defaultSortField"
        entity=""
        @selected="itemSelected"
        @table-refreshed="getDeadlines"
      />
      <b-card-text class="text-right">
        <b-button variant="primary" @click="showOptions">
          viewed all Options
        </b-button>
      </b-card-text>
    </template>
  </div>
</template>

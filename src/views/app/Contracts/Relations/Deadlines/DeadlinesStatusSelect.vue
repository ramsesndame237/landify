<script>

import { BForm, BModal } from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field.vue'

export default {
  name: 'DeadlinesStatusSelect',
  components: { Field, BForm, BModal },
  props: ['data', 'rowData'],
  data() {
    return {
      entity: {},
      loading: false,
      pullActionFields: [
        {
          key: 'contractaction_acting_by',
          type: 'custom-select',
          label: 'Acting by',
          items: [
            { label: 'Mieter', value: 'mieter' },
            { label: 'Vermieter', value: 'vermieter' },
          ],
        },
        {
          key: 'contractaction_notice_period_value', type: 'number', hideOnIndex: true, label: 'Notice period value',
        },
        {
          key: 'contractaction_notice_period_unit',
          label: 'Notice period unit',
          hideOnIndex: true,
          type: 'custom-select',
          items: [
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
            { label: 'Year', value: 'year' },
          ],
        },
      ],
    }
  },
  computed: {
    isSelectVisible() {
      const { contractdeadline_option_position, contractdeadline_status } = this.selectedDeadlineAction

      if (contractdeadline_status === 'notdue' && contractdeadline_option_position === 1) {
        return true
      } return false
    },
    selectedDeadlineAction() {
      return this.rowData.item
    },
      isDeadlineActive(){
        return this.selectedDeadlineAction.contractdeadline_status === 'active'
      }
  },
  methods: {
    pullAction(item) {
      this.$refs.modal.show()
    },
    async submit() {
      const isFormValid = await this.$refs.statusform.validate()
      console.log('ici this, from submit', this)

      if (!isFormValid) return

      this.loading = true
      try {
        const { item } = this.rowData
        await this.$http.get(`/contracts/deadlines/active/${item.contractdeadline_id}`)
        this.$emit('reload')
        this.$refs.statusform.reset()
        this.$refs.modal.hide()
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div class="">
    <template v-if="isSelectVisible">
      <b-dropdown :field="data.field" :entity="entity" text="Pull Action" variant="primary" size="sm">
        <b-dropdown-item v-for="(item, index) in data.items" :key="index" text="Pull Action" @click="pullAction(item)">
          {{ item.label }}
        </b-dropdown-item>
      </b-dropdown>
    </template>
    <template v-else>
      <p v-if="isDeadlineActive">Active</p>
      <p v-else>Not due yet</p>
    </template>
    <b-modal ref="modal" title="Pull Action" ok-title="Pull" cancel-title="Cancel" modal-class="modal-primary"
             size="sm" centered @ok="submit"
    >
      <!--      Form-->
      <validation-observer ref="statusform" v-slot="{ passes }" tag="div" class="my-2">
        <b-form>
          <b-row>
            <b-col v-for="(field, index) in pullActionFields" :key="index" cols="12">
              <field :field="field" :entity="entity" :inline="true" />
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
      <template v-slot:modal-footer>
        <b-button variant="warning" :disabled="loading" @click="$refs.modal.hide()">
          Cancel
        </b-button>
        <b-button variant="primary" :disabled="loading" @click="submit">
          <b-spinner v-if="loading" small />
          Pull action
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<style scoped>

</style>

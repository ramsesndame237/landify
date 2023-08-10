<script>

import { BForm, BModal } from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field.vue'

export default {
  name: 'DeadlinesStatusSelect',
  components: { Field, BForm, BModal },
  props: ['actions', 'isNoticeDateArrived', 'deadlines'],
  data() {
    return {
      entity: {},
      loading: false,
      fields: [],
    }
  },
  methods: {
    pullAction() {
        console.log('Pulling actions', this.actions)
      this.fields = [
        {
          key: 'contractaction_id',
          type: 'custom-select',
          label: 'Actions',
          items: this.actions,
        },
        {
          key: 'resiliation_date',
          type: 'date',
          label: 'Resiliation date',
          change: (entity, vm) => {
            const selectedAction = this.actions.find(option => option.value === entity?.contractaction_id)
            vm.field.disabled = !(selectedAction && selectedAction.type === 'special_resiliation')
          },
          visible: (entity, vm) => vm.field.disabled === false,
          disabled: true,
        },
        {
          key: 'contractdeadline_comment',
          type: 'textarea',
          label: 'Deadline comment',
          change: (entity, vm) => {
            const selectedAction = this.actions.find(option => option.value === entity?.contractaction_id)
            vm.field.required = selectedAction && selectedAction.type === 'special_resiliation'
          },
          required: false,
        },
      ]
      this.$refs.modal.show()
    },
    async submit() {
      const isFormValid = await this.$refs.deadlineform.validate()

      if (!isFormValid) return

      console.log('Submit vm', this)
      this.loading = true
      try {
        const response = await this.$http.put(`/contracts/deadlines/activeAction/${this.entity.contractaction_id}`, this.entity)
        this.$emit('reload')
        this.$refs.deadlineform.reset()
        this.$refs.modal.hide()
        await this.$parent.$parent.getDeadlines(true)
        await this.$parent.$parent.getActions(true)
      } catch (error) {
        this.$errorToast(error.message)
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
    <b-button v-if="isNoticeDateArrived || (deadlines.length <= 0 || actions.length > 0)" variant="primary" size="sm" @click="pullAction">
      Pull action
    </b-button>
    <b-modal ref="modal" title="Pull Action" modal-class="modal-primary"
             size="sm" centered @ok="submit"
    >
      <!--      Form-->
      <validation-observer ref="deadlineform" v-slot="{ passes }" tag="div" class="my-2">
        <b-form>
          <b-row>
            <b-col v-for="(field, index) in fields" :key="index" cols="12">
              <field :field="field" :entity="entity" :inline="true" :disabled="field.disabled" />
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

<script>

import { BForm, BModal } from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field.vue'
import {editorProps as resut} from "@tinymce/tinymce-vue/lib/es2015/main/ts/components/EditorPropTypes";

export default {
  name: 'DeadlinesStatusSelect',
  components: { Field, BForm, BModal },
  props: ['actions'],
  data() {
    return {
      types: { active_option: 'Active Option', automatic_option: 'Automatic Option', automatic_extension: 'Automatic extension' },
      entity: {},
      loading: false,
      fields: [],
      actionType: 'pull',
    }
  },
  computed: {
    actionsToShow() {
      return this.actions.map(action => ({ label: this.types[action.contractaction_type], value: action.contractaction_id }))
    },
    getActionTexte() {
      return this.actionType === 'pull' ? 'Pull actions' : 'Terminate contract'
    },
  },
  methods: {
    pullAction() {
      this.actionType = 'pull'
      this.fields = [
        {
          key: 'contractaction_id',
          type: 'custom-select',
          label: 'Actions',
          items: this.actionsToShow,
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
      ]
      this.$refs.modal.show()
    },
    terminateContract() {
      this.actionType = 'terminate'
      this.fields = [
        {
          key: 'contractaction_acting_by',
          label: 'Acting by',
          type: 'custom-select',
          items: [
            { label: 'Mieter', value: 'mieter' },
            { label: 'Vermieter', value: 'vermieter' },
          ],
        },
        {
          key: 'contractaction_resiliation_date',
          label: 'Resiliation Date',
          type: 'date',
        },
      ]
      this.$refs.modal.show()
    },
    async submit() {
      const isFormValid = await this.$refs.form.validate()

      if (!isFormValid) return

      this.loading = true
      if (this.actionType === 'pull') {
        try {
          const response = await this.$http.get(`/contracts/deadlines/activeAction/${this.entity.contractaction_id}`)
          console.log({ response })
          console.log('vm from statusselecet', this)
          this.$emit('reload')
          this.$refs.form.reset()
          this.$refs.modal.hide()
        } catch (error) {
          this.$errorToast(error.message)
          console.log({ error })
        } finally {
          this.loading = false
        }
      } else {
        const result = await this.$swal({
          title: 'Are you sure?',
          text: "This contract will be ended.You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, terminate it!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        })
          if (!resut.value) return false
        try {
          const response = await this.$http.post('/contracts/deadlines/resiliated', this.entity)
          console.log({ response })
          this.$emit('reload')
          this.$refs.form.reset()
          this.$refs.modal.hide()
        } catch (error) {
          this.$errorToast(error.message)
          console.log({ error })
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>

<template>
  <div class="">
    <b-button variant="primary" size="sm" @click="pullAction">
      Pull action
    </b-button>
    <b-button variant="primary" size="sm" class="ml-2" @click="terminateContract">
      Terminate Contract
    </b-button>
    <b-modal ref="modal" :title="getActionTexte" modal-class="modal-primary"
             size="sm" centered @ok="submit"
    >
      <!--      Form-->
      <validation-observer ref="form" v-slot="{ passes }" tag="div" class="my-2">
        <b-form>
          <b-row>
            <b-col v-for="(field, index) in fields" :key="index" cols="12">
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
          {{ getActionTexte }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<style scoped>

</style>

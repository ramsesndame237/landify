<script>
import { BForm, BModal } from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field.vue'

export default {
  name: 'DeadlinesTools',
  components: {
    Field, BModal, BForm,
  },
  props: {
    isButtonShowed: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      fields: [
        {
          key: 'contractaction_id',
          hideOnForm: true,
          hideOnIndex: true,
          auto: true,
        },
        {
          key: 'contractaction_acting_by',
          type: 'custom-select',
          items: [
            { label: 'Mieter', value: 'mieter' },
            { label: 'Vermieter', value: 'vermieter' },
            { label: 'Mieter & Vermieter', value: 'Mieter & Vermieter' },
          ],
        },
        {
          key: 'contractaction_type',
          label: 'Action Type',
          type: 'custom-select',
          items: [
            { label: 'Active Option', value: 'active_option' },
            { label: 'Automatic Option', value: 'automatic_option' },
            { label: 'Automatic extension', value: 'automatic_extension' },
            { label: 'Resiliation', value: 'resiliation' },
            { label: 'Special Resiliation', value: 'special_resiliation' },
          ],
        },
        {
          key: 'contractaction_unlimited_options',
          label: 'is Number of options unlimited ?',
          type: 'boolean',
          visible: entity => entity.contractaction_type === 'automatic_extension',
        },
        {
          key: 'contractaction_resiliation_date',
          type: 'date',
          label: 'Resiliation date',
          visible: entity => entity.contractaction_type === 'special_resiliation',
        },
        {
          key: 'contractaction_options',
          visible: entity => !['resiliation', 'special_resiliation'].includes(entity.contractaction_type),
          type: 'number',
          disabled: false,
          change: (entity, vm) => {
            if (entity.contractaction_unlimited_options === 1 && entity.contractaction_type === 'automatic_extension') {
              vm.field.disabled = true
              entity.contractaction_options = 99
            } else {
              vm.field.disabled = false
            }
          },
        },
        {
          key: 'contractaction_extension_value',
          visible: entity => !['resiliation', 'special_resiliation'].includes(entity.contractaction_type),
          type: 'number',
          label: 'Extension Value',
          required: true,
        },
        {
          key: 'contractaction_extension_unit',
          visible: entity => !['resiliation', 'special_resiliation'].includes(entity.contractaction_type),
          type: 'custom-select',
          label: 'Extension Unit',
          items: [
            { label: 'Day', value: 'Day' },
            { label: 'Week', value: 'Week' },
            { label: 'Month', value: 'Month' },
            { label: 'Year', value: 'Year' },
          ],
          required: true,
        },
        { key: 'contractaction_notice_period_value', type: 'number' },
        {
          key: 'contractaction_notice_period_unit',
          type: 'custom-select',
          items: [
            { label: 'Day', value: 'Day' },
            { label: 'Week', value: 'Week' },
            { label: 'Month', value: 'Month' },
            { label: 'Year', value: 'Year' },
          ],
        },
        {
          key: 'contractaction_comment',
          type: 'textarea',
          label: 'Action comment',
          change: (entity, vm) => {
            vm.field.required = entity.contractaction_type === 'special_resiliation'
          },
          required: false,
        },
      ],
      entity: {
        contract_id: this.$route.params.id,
      },
      create: true,
      forceTitle: '',
    }
  },
  methods: {
    openModal(create, data, title) {
      this.entity = { ...data, contract_id: this.$route.params.id }
      this.create = create
      this.forceTitle = title
      this.$refs.modal.show()
    },
    async submit() {
      const isFormValid = await this.$refs.toolform.validate()

      if (!isFormValid) {
        return
      }
      this.loading = true
      try {
        await this.$http({
          method: this.create ? 'post' : 'put',
          url: `/contracts/deadline${!this.create ? '/action' : ''}`,
          data: this.entity,
        })

        this.$refs.toolform.reset()
        this.$refs.modal.hide()
        this.$successToast(`Action ${this.create ? 'added' : 'updated'} successfully !!!`)
        if (this.create) {
          const { currentTab, tabs } = this.$parent
          const tab = tabs[currentTab]
          await tab.$children[0].getActions(true)
          await tab.$children[0].getDeadlines()
        } else {
          const { getActions } = this.$parent.$parent
          await getActions(true)
        }
      } catch (error) {
        if (error.response) {
          this.$errorToast(error.response.data.detail)
        } else {
          this.$errorToast(error.message)
        }
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div class="d-flex align-items-center">
    <b-button v-if="isButtonShowed" class="mr-1" size="sm" variant="info" @click="openModal">
      <span>New</span>
    </b-button>
    <b-modal ref="modal" :title="$t(forceTitle || 'Action Data')" ok-title="Save" cancel-title="Cancel" modal-class="modal-primary"
             size="lg" centered @ok="submit"
    >
      <!--      Form-->
      <validation-observer ref="toolform" v-slot="{ passes }" tag="div" class="my-2">
        <b-form @submit.prevent="passes(submit)">
          <b-row>
            <b-col v-for="(field,index) in fields.filter(_field => !_field.hideOnForm)" :key="index" cols="12">
              <field :field="field" :disabled="field.disabled" :entity="entity" :inline="true" />
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
          Save
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<style scoped>

</style>

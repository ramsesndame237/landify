<script>
import { USER_ROLES } from '@/config/config-access/config-roles'
import Field from '@/views/app/Generic/Field.vue'
import { BForm, BModal } from 'bootstrap-vue'

const period = [
  { label: 'Day', value: 'Day' },
  { label: 'Week', value: 'Week' },
  { label: 'Month', value: 'Month' },
  { label: 'Year', value: 'Year' },
]

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
      entity: {
        contract_id: this.$route.params.id,
      },
      create: true,
      forceTitle: '',
    }
  },
  computed: {
    canCreate() {
      return this.$isUserA(USER_ROLES.admin)
    },
    fields() {
      return [
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
            ...(!this.isThereAutomaticOption ? [{ label: 'Active Option', value: 'active_option' },
              { label: 'Automatic Option', value: 'automatic_option' }, { label: 'Automatic extension', value: 'automatic_extension' }] : []),
            ...(!this.isThereResiliationOption ? [{ label: 'Resiliation', value: 'resiliation' }] : []),
            ...(!this.isThereSpecialResiliationOption ? [{ label: 'Special Resiliation', value: 'special_resiliation' }] : []),
          ],
          handleFieldChange: (newValue, oldValue, entity, vm) => {
            if (newValue !== 'automatic_extension') {
              vm.$set(vm.entity, 'contractaction_options', undefined)
            } else {
              vm.$set(vm.entity, 'contractaction_options', '\u{221E}')
            }
          },
        },
        {
          key: 'contractaction_unlimited_options',
          label: 'is Number of options unlimited ?',
          type: 'boolean',
          visible: entity => entity.contractaction_type === 'automatic_extension',
          default: 1,
          handleFieldChange: (newValue, oldValue, entity, vm) => {
            if (newValue === 1 && entity.contractaction_type === 'automatic_extension') {
              vm.$set(vm.entity, 'contractaction_options', '\u{221E}')
            } else {
              vm.$set(vm.entity, 'contractaction_options', undefined)
            }
          },
        },
        {
          key: 'contractaction_options',
          visible: entity => !['resiliation', 'special_resiliation'].includes(entity.contractaction_type),
          type: 'number',
          handleFieldChange: (newValue, oldValue, entity, vm) => {
            if (newValue === '\u{221E}') {
              vm.field.type = 'text'
              vm.field.disabled = true
            } else if (newValue === undefined) {
              vm.field.type = 'number'
              vm.field.disabled = false
            }
          },
        },
        {
          key: 'contractaction_resiliation_date',
          type: 'date',
          label: 'Resiliation date',
          visible: entity => entity.contractaction_type === 'special_resiliation',
        },
        {
          key: 'contractaction_extension_value',
          visible: entity => !['resiliation', 'special_resiliation'].includes(entity.contractaction_type),
          type: 'decimal',
          label: 'Extension Value',
          required: true,
          unit: () => period,
          unit_key: 'contractaction_extension_unit',
          unit_label_key: 'label',
          unit_value_key: 'value',
        },
        {
          key: 'contractaction_notice_period_value',
          type: 'decimal',
          unit: () => period,
          unit_key: 'contractaction_notice_period_unit',
          unit_label_key: 'label',
          unit_value_key: 'value',
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
      ]
    },
    actionsList() {
      return this.$store.getters['table/listCache'](`contract-actions-${this.$route.params.id}`)
    },
    isThereAutomaticOption() {
      return this.actionsList.some(action => ['automatic_extension'].includes(action.contractaction_type))
    },
    isThereResiliationOption() {
      return this.actionsList.some(action => ['resiliation'].includes(action.contractaction_type))
    },
    isThereSpecialResiliationOption() {
      return this.actionsList.some(action => ['special_resiliation'].includes(action.contractaction_type))
    },
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
      const payload = {
        ...this.entity,
        ...(this.entity.contractaction_options === '\u{221E}' && { contractaction_options: 99 }),
        ...(this.entity.contractaction_type !== 'automatic_extension' && { contractaction_unlimited_options: 0 }),
      }
      try {
        await this.$http({
          method: this.create ? 'post' : 'put',
          url: `/contracts/deadline${!this.create ? '/action' : ''}`,
          data: payload,
        })

        this.$refs.toolform.reset()
        this.$refs.modal.hide()
        this.$successToast(`Action ${this.create ? 'added' : 'updated'} successfully !!!`)
        if (this.create) {
          const { currentTab, tabs } = this.$parent
          const tab = tabs[currentTab]
          await tab.$children[0].getActions(true)
          await tab.$children[0].getDeadlines()
          const { loadEntity } = this.$parent.$parent.$refs.form
          await loadEntity()
        } else {
          const { getActions } = this.$parent.$parent
          const { loadEntity } = this.$parent.$parent.$parent.$parent.$parent.$refs.form
          await getActions(true)
          await loadEntity()
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
    <b-button v-if="canCreate && isButtonShowed" class="mr-1" size="sm" variant="info" @click="openModal">
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

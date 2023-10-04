<template>
  <div class="d-flex">
    <b-button variant="info" size="sm" :disabled="!canUpdateDeadlineStatus" @click="activeDeadline">
      <feather-icon icon="CheckCircleIcon" />
    </b-button>
    <b-button variant="info" :disabled="!canUpdateDeadlineStatus" size="sm" class="ml-1" @click="addComment">
      <feather-icon icon="MessageCircleIcon" :badge="commentsCount" />
    </b-button>
    <b-button variant="primary" size="sm" :disabled="!canUpdateDeadlineStatus" class="ml-1" @click="deactiveDeadline">
      <feather-icon icon="XCircleIcon" />
    </b-button>

    <b-modal ref="modal" title="Add Comment" ok-title="Save" cancel-title="Cancel" modal-class="modal-primary"
             size="md" centered @ok="submit"
    >
      <!--      Form-->
      <validation-observer ref="form" v-slot="{ passes }" tag="div" class="my-2">
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

<script>
import moment from 'moment'
import DeadlineMixin from '@/views/app/Contracts/Relations/Deadlines/DeadlineMixin'
import Field from '@/views/app/Generic/Field.vue'

export default ({
  name: 'UnactiveDeadlinesActions',
  components: { Field },
  mixins: [DeadlineMixin],
  props: ['rowData', 'data', 'items'],
  data() {
    return {
      deadlines: [],
      fields: [
        {
          key: 'contractnegotiation_notice_date',
          type: 'date',
          label: 'Next Notification Date',
        },
        {
          key: 'contractnegotiation_comment',
          type: 'textarea',
          label: 'Comment',
        },
      ],
      loading: false,
      entity: {},
    }
  },
  computed: {
    entityData() {
      return this.contractFormComponent.entity
    },
    commentsCount() {
      return this.deadline.contractdeadline_negotiations.length
    },
    canUpdateDeadlineStatus() {
      // Je récupère les données du contract
      const { action_begin } = this.entityData

      if (!moment(action_begin).isSameOrBefore(moment())) return false
      const { contractdeadline_expected_from, contractdeadline_status } = this.deadline

      if (contractdeadline_status === 'deactivate') return false

      const unDeactivateDeadlines = this.items.filter(item => !['deactivate'].includes(item.contractdeadline_status))

      const unDeactivateDeadlinesExpectedFrom = unDeactivateDeadlines.map(item => moment(item.contractdeadline_expected_from))

      return moment.min(unDeactivateDeadlinesExpectedFrom).isSame(moment(contractdeadline_expected_from))
    },
    deadline() {
      return this.rowData.item
    },
    deadlineTableComponent() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent
    },
    contractFormComponent() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs.form
    },
  },
  mounted() {
    // Je récupère les deadlines du composant parent
    if (this.data.getDeadlines) {
      this.deadlines = this.data.getDeadlines()
    }
  },
  methods: {
    addComment() {
      this.$refs.modal.show()
    },
    async submit() {
      const isFormValid = await this.$refs.form.validate()

      if (!isFormValid) {
        return
      }

      this.loading = true

      const payload = {
        contractdeadline_id: this.deadline.contractdeadline_id,
        ...this.entity,
      }
      try {
        await this.$http.post('/contracts/deadline/negotiation', payload)

        this.$refs.form.reset()
        this.$refs.modal.hide()
        this.$successToast('Comment added')
        console.log('data', this.data)
        await this.data.fetchDeadlines()
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
    async activeDeadline() {
      this.data.reload(true)
      try {
        await this.$http.put(`/contracts/deadlines/activeAction/${this.deadline.contractaction_id}`)
        this.$successToast('Deadline activated successfully !!!')
        await this.deadlineTableComponent.getDeadlines()
        this.data.reload(false)
        await this.deadlineTableComponent.getActions(true)
        await this.contractFormComponent.loadEntity(true)
      } catch (error) {
        console.log({ error })
      } finally {
        this.data.reload(false)
      }
    },
    async deactiveDeadline() {
      this.data.reload(true)

      try {
        const response = await this.$http.put(`/contracts/deadlines/deactivate/${this.deadline.contractdeadline_id}`)
        console.log({ response })
        await this.deadlineTableComponent.getDeadlines()
        this.data.reload(false)
      } catch (error) {
        console.log({ error })
      } finally {
        this.data.reload(false)
      }
    },

  },
})
</script>

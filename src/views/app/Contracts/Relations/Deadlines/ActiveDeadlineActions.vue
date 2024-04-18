<template>
  <div>
    <b-button  v-if="isExpectedFromDateNotArrived" variant="primary mr-1" :disabled="!isRecentAddedDeadline" size="sm" @click="removeActiveDeadline">
      Remove
    </b-button>
    <b-button variant="info mt-0.5 " :disabled="!isStopableAddedDeadline" size="sm" @click="endDateToShare=deadline">
      Stop
    </b-button>
     <b-modal
      v-model="modalShow"
      :title="$t('Stop~active~option')"
      :ok-title="$t('Stop')"
      :ok-disabled="!shareEntity.contract_end_date"
      @ok="stopActiveDeadline"
    >
      <h3>{{ $t('contract~deadline~change~end~date') }}</h3>
      <p class="mb-1">{{ $t('enter the new contrat end date ') }}</p>
      <div class="mb-2">
        <field
          :entity="shareEntity"
          :field="{
            key: 'contract_end_date',
            type: 'date',
            listLabel: 'contract_end_date',
            noLabel: true,
          }"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
import Field from '@/views/app/Generic/Field'
export default {
  props: ['rowData', 'data', 'items'],
  components:{
    Field
  },
  data() {
    return {
      modalShow: false,
      shareEntity: {},
      endDateToShare: null
    }
  },
  computed: {
    isExpectedFromDateNotArrived() {
      const { contractdeadline_expected_from } = this.deadline
      return moment().isBefore(moment(contractdeadline_expected_from))
    },
    /*
    * Cette variable permet de controller la deadline ajouté en dernier dans le tableau des deadline pulled,
    * afin d'être retiré en premier s'il le faut
     */
    isStopableAddedDeadline () {
      return this.deadline.contractdeadline_type === "active_option" && this.deadline.contractdeadline_status === "active" && !this.deadline.contractdeadline_is_stopped
    },
    isRecentAddedDeadline() {
      const { contractdeadline_expected_from } = this.deadline
      const itemsExpectedFromDates = this.items.map(item => moment(item.contractdeadline_expected_from))
      return moment.max(itemsExpectedFromDates).isSame(contractdeadline_expected_from)
    },
    deadline() {
      return this.rowData.item
    },
    deadlineTableComponent() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent
    },
    contractFormComponent() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs.form
    },
  },
  watch:{
        endDateToShare(val) {
      this.modalShow = !!val
    },
    modalShow(val) {
      if (!val) {
        this.endDateToShare = null
      }
    },
  },
  methods: {
    async removeActiveDeadline() {
      this.data.reload(true)
      try {
        await this.$http.put(`/contracts/deadlines/checkout/${this.deadline.contractdeadline_id}`)
        this.$successToast('Deadline Successful remove !!!')

        await this.deadlineTableComponent.getDeadlines()
        this.data.reload(false)
        await this.contractFormComponent.loadEntity()
        await this.deadlineTableComponent.getActions(true)
      } catch (error) {
        if (error.response) {
          this.$errorToast(error.response.data.detail)
        } else {
          this.$errorToast(error.message)
        }
        console.log({ error })
      }
    },
    async stopActiveDeadline() {
      try {
        this.data.reload(true)
        await this.$http.put(`/contracts/deadline/${this.deadline.contractdeadline_id}/stop`,  this.shareEntity)
        this.$successToast('Deadline Successful Stop !!!')
        await this.deadlineTableComponent.getDeadlines()
        await this.contractFormComponent.loadEntity()
        await this.deadlineTableComponent.getActions(true)
      } catch (error) {
        if (error.response) {
          this.$errorToast(error.response.data.detail)
        } else {
          this.$errorToast(error.message)
        }
        console.log({ error })
      } finally {
        this.data.reload(false)
      }
    },

  },
}
</script>

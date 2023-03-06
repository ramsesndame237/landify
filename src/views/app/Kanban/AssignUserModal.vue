<template>
  <b-modal ref="modal" :ok-title="$t('button~assignto')" :cancel-title="$t('button~cancel')" modal-class="modal-primary" centered :busy="loading"
           :title="$t('headline~ticket~newassignto') +' '+ ticket.ticket_name" size="md" @ok="assignUserTicket">
    <validation-observer ref="form">
      <field :field="{key: 'user_id', type:'list',listLabel: 'user_email', list: 'user', ids, noShowButton: true}"
             :entity="entity" inline="true"/>
    </validation-observer>
  </b-modal>
</template>

<script>
import Field from "@/views/app/Generic/Field";
import moment from "moment-business-time";

export default {
  name: "AssignUserModal",
  components: { Field },
  data() {
    return {
      entity: {},
      ticket: {},
      ids: [],
      loading: false,
    }
  },
  methods: {
    openModal(ticket, ids) {
      this.ticket = ticket
      this.ids = ids
      this.entity = {}
      this.$refs.modal.show()
    },
    async assignUserTicket(e) {
      e.preventDefault()
      const valid = await this.$refs.form.validate()
      if (!valid) return
      this.loading = true
      try {
        (await this.$api({
          entity: 'ticket_columnx_user_rel',
          action: 'create',
          data: [{
            ticket_id: this.ticket.ticket_id,
            column_id: this.ticket.columns[0].column_id,
            user_id: this.entity.user_id,
            ticket_columnx_user_creationtime: moment().format('YYYY-MM-DD HH:mm:ss'),
          }],
        }))
      } finally {
        this.loading = false
      }
      this.$successToast('User is assigned to the ticket')
      this.$refs.modal.hide()
      this.$emit('reload')
    },
  },
}
</script>

<style scoped>

</style>

<template>
  <b-modal ref="modal" ok-title="Assign" cancel-title="Cancel" modal-class="modal-primary" centered
           :title="'Assign user to ticket '+ ticket.ticket_name" size="md" @ok="assignUserTicket">
    <validation-observer ref="form">
      <field
        :field="{key: 'user_id', type:'list',listLabel: 'user_email', list: 'user_team_grp', ...(team_id?{filter_key: 'team_id'}: {})}"
        :entity="entity" :filter-value="team_id" inline="true"/>
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
      team_id: null,
    }
  },
  methods: {
    openModal(ticket, team_id) {
      this.ticket = ticket
      this.entity.team_id = team_id
      this.$refs.modal.show()
    },
    async assignUserTicket() {
      const valid = await this.$refs.form.validate()
      if (!valid) return
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
      this.$refs.modal.hide()
      this.$successToast('User is assigned to the ticket')
      this.$emit('reload')
    },
  },
}
</script>

<style scoped>

</style>

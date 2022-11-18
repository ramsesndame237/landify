export default {
  methods: {
    async toggleTicket(ticket) {
      const result = await this.$swal({
        title: 'Are you sure?',
        text: ticket.ticket_closed ? 'This ticket will be re-opened' : 'This ticket will be closed',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
      if (!result.value) return
      const updated = (await this.$api({
        action: 'update',
        entity: 'ticket',
        data: [{ ticket_id: ticket.ticket_id, ticket_closed: !ticket.ticket_closed }],
      })).data.data.data[0][0]
      ticket.ticket_closed = updated.ticket_closed
      this.$successToast(ticket.ticket_closed ? 'The ticket is closed' : 'The ticket is open')
    },
  },
}

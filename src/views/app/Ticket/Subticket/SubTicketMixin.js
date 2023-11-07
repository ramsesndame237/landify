import Table from '@/table'

export default {
  name: 'SubTicketMixin',
  data() {
    return {
      subTickets: [],
      loading: false,
    }
  },
  computed: {
    subTicketDef() {
      const subTicketDef = JSON.parse(JSON.stringify(Table.ticket))
      let index = subTicketDef.fields.findIndex(f => f.key === 'column_id')
      subTicketDef.fields.splice(index, 1)
      index = subTicketDef.fields.findIndex(f => f.key === 'pos_id')
      subTicketDef.fields.splice(index, 1)
      index = subTicketDef.fields.findIndex(f => f.key === 'contract_id')
      subTicketDef.fields.splice(index, 1)
      subTicketDef.submit = this.submitSubticket

      return subTicketDef
    },
    ticketId() {
      return this.ticket?.ticket_id || this.entityId
    },
  },
  methods: {
    createSubTicket() {
      const ticketId = this.ticketId || this.entityId
      this.$refs.modal.openModal(true, {
        ticket_id_group: parseInt(ticketId),
      })
    },
    async fetchSubTickets() {
      this.loading = true
      // load subtickets
      try {
        const response = await this.$http.get('/tickets/sub-tickets', {
          params: { ticket_id: this.ticketId },
        })
        this.subTickets = response.data.data
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
    async submitSubticket(vm) {
      const data = { ...vm.entity }

      try {
        const response = await this.$http.post('/tickets/subticket', data)
        await this.fetchSubTickets()
        return response
      } catch (error) {
        console.log(error)
      }
    },
  },
}

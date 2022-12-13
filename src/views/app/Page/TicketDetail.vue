<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1" v-if="entity">
      <div>
        <h4 class="mb-0 font-weight-bolder">{{ entity.ticket_name }}</h4>
        <p class="mb-0">{{ entity.ticket_description }}</p>
      </div>
      <div>
        <b-button v-if="!entity.ticket_closed" variant="primary">
          Edit
        </b-button>
        <b-button variant="primary" class="ml-2" @click="toggleTicket(entity)">
          {{ entity.ticket_closed ? 'Re-open' : 'Close' }}
        </b-button>
      </div>
    </div>
    <b-row>
      <b-col lg="8">
        <b-card-actions title="Informations" action-collapse collapsed>
          <table class="mt-2 mt-xl-0 w-100">
            <tr v-for="(item,i) in items" :key="i">
              <th class="pb-50 font-weight-bold">
                {{ item[0] }}
              </th>
              <td class="pb-50">{{ item[1] }}</td>
            </tr>
          </table>
        </b-card-actions>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h2>Sub tasks</h2>
          <b-button variant="primary" v-if="!entity.ticket_closed" @click="createSubTicket">Add Sub task</b-button>
        </div>
        <generic-modal ref="modal" table="ticket" :definition="ticketDef" table-definition-key="ticket"
                       title="Create a sub task" @reload-table="onNewTicket"/>
        <sub-ticket-card v-for="(ticket,idx) in subTickets" :key="idx" :ticket="ticket"/>
        <p v-if="subTickets.length===0" class="text-center">No sub ticket available</p>
        <b-card-actions v-if="entity.columns" class="mt-3" title="Timeline" action-collapse collapsed>
          <app-timeline>
            <app-timeline-item v-for="(column,idx) in entity.columns" :key="idx" :title="column.column_name" subtitle=""
                               :time="column.ticket_move_time_in" variant="success"/>
          </app-timeline>
        </b-card-actions>
      </b-col>
      <b-col lg="4">
        <h4 class="font-weight-bolder">Documents</h4>
        <b-row>
          <b-col lg="6">
            <b-card>
              <div class="">
                <h6 style="color: #ccc">abcbcaoasjsijs</h6>
                <h4 class="font-weight-bolder mb-2" style="color: black">Title</h4>
                <b-button class="m-auto" variant="danger">Open</b-button>
              </div>
            </b-card>
          </b-col>
        </b-row>
        <div>
          <b-button variant="primary">Add a new document</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BButton,
  BCol,
  BRow,
  BCard,
  BCardBody,
  BIconAlarm,
  BDropdown,
  BDropdownItem,
  BIconCalendarWeek,
  BIconCaretDown,
} from 'bootstrap-vue'
import AdditionalCostsCard from '@/views/app/CustomComponents/WP6/AdditionalCostsCard'
import OperationRecapCard from '@/views/app/CustomComponents/WP6/OperationRecapCard'
import EditPageMixin from "@/views/app/Generic/EditPageMixin";
import Table from '@/table'
import GenericModal from "@/views/app/Generic/modal";
import SubTicketCard from "@/views/app/CustomComponents/WP6/SubTicketCard";
import AppTimeline from "@core/components/app-timeline/AppTimeline";
import AppTimelineItem from "@core/components/app-timeline/AppTimelineItem";
import BCardActions from "@core/components/b-card-actions/BCardActions";
import TicketMixin from "@/views/app/Kanban/TicketMixin";

export default {
  name: 'TicketDetail',
  components: {
    BCardActions,
    AppTimelineItem,
    AppTimeline,
    SubTicketCard,
    GenericModal,
    BButton,
    BCol,
    BRow,
    BCard,
  },
  mixins: [EditPageMixin, TicketMixin],
  data() {
    const ticketDef = JSON.parse(JSON.stringify(Table.ticket))
    let index = ticketDef.fields.findIndex(f => f.key === 'column_id')
    ticketDef.fields.splice(index, 1)
    index = ticketDef.fields.findIndex(f => f.key === 'pos_id')
    ticketDef.fields.splice(index, 1)
    // ticketDef.fields.push({
    //   key: 'ticket_id_group',
    //   type: 'list',
    //   list: 'ticket',
    //   listLabel: 'ticket_name',
    //   relationEntity: 'ticket_ticket_rel',
    //   tableKey: 'ticket_id',
    //   // visible: () => false,
    // })
    return {
      ticketDef,
      subTickets: [],
    }
  },
  computed: {
    items() {
      return [
        ['Customer Group', this.entity.customergroup_name],
        ['Company', this.entity.company_name],
        ['Deadline Yellow', this.entity.ticket_deadline_yellow],
        ['Deadline Red', this.entity.ticket_deadline_red],
      ]
    },
  },
  methods: {
    createSubTicket() {
      this.$refs.modal.openModal(true, { ticket_id_group: parseInt(this.entityId) })
    },
    async onNewTicket(ticket) {
      // Save subticket relation
      await this.$api({
        entity: 'ticket_ticket_rel',
        action: 'create',
        data: [{ ticket_id: ticket.ticket_id, ticket_id_group: parseInt(this.entityId), ticket_type: 'test' }],
      })
      this.fetchSubTickets()
    },
    async fetchSubTickets() {
      // load subtickets
      this.subTickets = (await this.$api({
        entity: 'frontend_6_1_6_listall',
        action: 'read-rich',
        per_page: 1000000,
        data: [{ ticket_id_group: this.entity.ticket_id }],
      })).data.data.data
    }
  },
  async mounted() {
    if (!this.entity) {
      this.entity = await this.$store.dispatch('table/fetchSingleItem', {
        entity: 'ticket',
        id: this.$route.params.id,
        primaryKey: 'ticket_id',
      })
    }
    await this.fetchSubTickets()
  },
}
</script>

<style scoped>

</style>

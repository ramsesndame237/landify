<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1" v-if="entity">
      <div>
        <h4 class="mb-0 font-weight-bolder">{{ entity.ticket_name }}</h4>
        <p class="mb-0">{{ entity.ticket_description }}</p>
      </div>
      <div>
        <div class="bg-white p-1 mr-1 d-inline-block">
          <strong class="mr-1">Customer Group:</strong>
          <span>Some Group</span>
        </div>
        <div class="bg-white p-1 d-inline-block">
          <strong class="mr-1">Company:</strong>
          <span>Some Company</span>
        </div>
      </div>
      <div>
        <span class="mr-1">Filiale AB</span>
        <strong>Verwalter XY</strong>
      </div>
    </div>
    <b-row>
      <b-col lg="8">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h2>Sub tasks</h2>
          <b-button variant="primary" @click="createSubTicket">Add Sub task</b-button>
        </div>
        <generic-modal ref="modal" table="ticket" :definition="ticketDef" table-definition-key="ticket"
                       title="Create a sub task" @reload-table="onNewTicket"/>
        <sub-ticket-card v-for="(ticket,idx) in subTickets" :key="idx" :ticket="ticket"/>
        <p v-if="subTickets.length===0" class="text-center">No sub ticket available</p>
        <b-card v-if="entity.columns" class="mt-3" title="Timeline">
          <app-timeline>
            <app-timeline-item v-for="(column,idx) in entity.columns" :key="idx" :title="column.column_name"
                               subtitle="" :time="column.ticket_move_time_in" variant="success"/>
          </app-timeline>
        </b-card>
      </b-col>
      <b-col lg="4">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="font-weight-bolder">Upcoming Events</h4>
          <b-dropdown variant="outline-danger">
            <template #button-content>
              <b-icon-calendar-week class="mr-1"/>
              <span>Calendar</span>
              <!--            <b-icon-caret-down/>-->
            </template>
            <b-dropdown-item>option 1</b-dropdown-item>
            <b-dropdown-item>option 2</b-dropdown-item>
            <b-dropdown-item>option 3</b-dropdown-item>
          </b-dropdown>
        </div>
        <operation-recap-card/>
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

export default {
  name: 'OperationsPage',
  components: {
    AppTimelineItem,
    AppTimeline,
    SubTicketCard,
    GenericModal,
    BButton,
    BCol,
    BRow,
    BCard,
    BCardBody,
    BIconAlarm,
    AdditionalCostsCard,
    BDropdown,
    BDropdownItem,
    BIconCalendarWeek,
    BIconCaretDown,
    OperationRecapCard,
  },
  mixins: [EditPageMixin],
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
      this.subTickets.push(ticket)
    },
  },
  async mounted() {
    if (!this.entity) {
      this.entity = await this.$store.dispatch('table/fetchSingleItem', {
        entity: 'ticket',
        id: this.$route.params.id,
        primaryKey: 'ticket_id',
      })
    }
    // load subtickets
    this.subTickets = (await this.$api({
      entity: 'frontend_6_1_6_listall',
      action: 'read-rich',
      per_page: 1000000,
      data: [{ ticket_id_group: this.entity.ticket_id }],
    })).data.data.data
  },
}
</script>

<style scoped>

</style>

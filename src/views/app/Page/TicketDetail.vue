<template>
  <div v-if="entity">
    <div class="d-flex justify-content-between align-items-center mb-1" >
      <div>
        <h4 class="mb-0 font-weight-bolder">{{ entity.ticket_id }}</h4>
        <p class="mb-0">{{ entity.ticket_name }}</p>
      </div>
      <div>
        <b-button v-if="!entity.ticket_closed" variant="primary" @click="moveToNextColumn">
          Move to next column
        </b-button>
        <b-button v-if="!entity.ticket_closed" variant="primary" class="ml-2" @click="updateTicket">
          Edit
        </b-button>
        <b-button variant="primary" class="ml-2" @click="toggleTicket(entity)">
          {{ entity.ticket_closed ? 'Re-open' : 'Close' }}
        </b-button>
      </div>
    </div>
    <b-row>
      <b-col lg="8">
        <b-card-actions title="Informations" action-collapse>
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
        <generic-modal ref="modal" table="ticket" :definition="subTicketDef" table-definition-key="ticket"
                       title="Create a sub task" @reload-table="onNewTicket"/>
        <sub-ticket-card v-for="(ticket,idx) in subTickets" :key="idx" :ticket="ticket"/>
        <p v-if="subTickets.length===0" class="text-center">No sub ticket available</p>
        <b-card-actions v-if="entity.columns" class="mt-3" title="Timeline" action-collapse collapsed>
          <app-timeline>
            <app-timeline-item v-for="(column,idx) in entity.columns" :key="idx" :title="column.column_name" subtitle=""
                               :time="column.ticket_move_time_in" :variant="getColumnColor(column)"/>
          </app-timeline>
        </b-card-actions>
      </b-col>
      <b-col lg="4">
        <h4 class="font-weight-bolder">Documents</h4>
        <b-row>
          <b-col v-for="(document,i) in documents" :key="i" md="6">
            <b-card>
              <div class="">
                <h6 style="color: #ccc">{{ document.document_name }}</h6>
                <h4 class="font-weight-bolder mb-2" style="color: black">{{ document.document_mime_type }}</h4>
                <b-link class="m-auto" variant="danger" target="_blank" :href="getDocumentLink(document)">
                  Open
                </b-link>
              </div>
            </b-card>
          </b-col>
        </b-row>
        <div>
          <b-button variant="primary" @click="createDocument">Add a new document</b-button>
        </div>
        <generic-modal ref="documentModal" table="document" :definition="documentDef" table-definition-key="document"
                       title="Add new documents" @reload-table="onNewDocuments"/>
        <generic-modal ref="ticketModal" table="ticket" :definition="subTicketDef" table-definition-key="ticket"
                       title="Update the ticket" @reload-table="onTicketUpdate"/>
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
  BLink,
} from 'bootstrap-vue'
import EditPageMixin from "@/views/app/Generic/EditPageMixin";
import Table from '@/table'
import GenericModal from "@/views/app/Generic/modal";
import SubTicketCard from "@/views/app/CustomComponents/WP6/SubTicketCard";
import AppTimeline from "@core/components/app-timeline/AppTimeline";
import AppTimelineItem from "@core/components/app-timeline/AppTimelineItem";
import BCardActions from "@core/components/b-card-actions/BCardActions";
import TicketMixin from "@/views/app/Kanban/TicketMixin";
import { getDocumentLink } from "@/libs/utils";
import moment from 'moment'

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
    BLink,
  },
  mixins: [EditPageMixin, TicketMixin],
  data() {
    const subTicketDef = JSON.parse(JSON.stringify(Table.ticket))
    let index = subTicketDef.fields.findIndex(f => f.key === 'column_id')
    subTicketDef.fields.splice(index, 1)
    index = subTicketDef.fields.findIndex(f => f.key === 'pos_id')
    subTicketDef.fields.splice(index, 1)
    index = subTicketDef.fields.findIndex(f => f.key === 'contract_id')
    subTicketDef.fields.splice(index, 1)
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
      subTicketDef,
      ticketDef: Table.ticket,
      documentDef: Table.document,
      subTickets: [],
      documents: [],
    }
  },
  computed: {
    items() {
      return [
        ['Ticket ID', this.entity?.ticket_id],
        ['Customer Group', this.entity?.customergroup_name],
        ['Company', this.entity?.company_name],
        ['Pos', this.entity?.pos_id],
        ['Contract', this.entity?.contract_name],
        ['Ticket Name', this.entity?.ticket_name],
        ['Ticket Description', this.entity?.ticket_description],
        ['Active Column', ''],
        ['Assigned To', ''],
        ['Deadline Yellow', this.entity?.ticket_deadline_yellow],
        ['Deadline Red', this.entity?.ticket_deadline_red],
      ]
    },
  },
  methods: {
    getColumnColor(column){
      if (moment(column.ticket_move_time_out).isAfter(column.ticket_deadline_offset_red)) return 'danger'
      if (moment(column.ticket_move_time_out).isAfter(column.ticket_deadline_offset_yellow)) return 'warning'
      return 'success'
    },
    getDocumentLink,
    createSubTicket() {
      this.$refs.modal.openModal(true, { ticket_id_group: parseInt(this.entityId) })
    },
    createDocument() {
      this.$refs.documentModal.openModal(true, {})
    },
    updateTicket() {
      this.$refs.ticketModal.openModal(false, this.entity)
    },
    async onNewTicket(ticket) {
      // Save subticket relation
      await this.$api({
        entity: 'ticket_ticket_rel',
        action: 'create',
        data: [{ ticket_id: ticket.ticket_id, ticket_id_group: parseInt(this.entityId), ticket_type: 'test' }],
      })
      await this.fetchSubTickets()
    },
    async onNewDocuments(documents) {
      // Save document relation
      await this.$api({
        entity: 'document_ticket_rel',
        action: 'create',
        data: documents.map(document => ({ document_id: document.document_id, ticket_id: parseInt(this.entityId) })),
      })
      await this.fetchDocuments()
    },
    async onTicketUpdate(ticket) {
      this.entity = ticket
    },
    async fetchSubTickets() {
      // load subtickets
      this.subTickets = (await this.$api({
        entity: 'frontend_6_1_6_listall',
        action: 'read-rich',
        per_page: 1000000,
        data: [{ ticket_id_group: this.entity.ticket_id }],
      })).data.data.data
    },
    async fetchDocuments() {
      const results = (await this.$api({
        entity: 'document_ticket_rel',
        action: 'read-rich',
        per_page: 100000,
        data: [{ ticket_id: this.entity.ticket_id }],
      })).data.data.data
      if (!results.length) return
      this.documents = (await this.$api({
        entity: 'frontend_document_list',
        action: 'read-rich',
        per_page: 1000,
        data: results.map(r => ({ document_id: r.document_id })),
      })).data.data.data
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
    await this.fetchSubTickets()
    await this.fetchDocuments()
  },
}
</script>

<style scoped>

</style>

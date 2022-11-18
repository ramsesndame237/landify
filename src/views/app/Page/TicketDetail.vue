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
        <b-row>
          <additional-costs-card title="NEBENKOSTENABRECHNUNGEN" color="#ccc" cols="6" hours="54" percent="75"/>
          <additional-costs-card title="NEBENKOSTENABRECHNUNGEN" color="#ccc" cols="6" hours="54" percent="75"/>
        </b-row>
        <div class="d-flex justify-content-between align-items-center">
          <h2>Sub tasks</h2>
          <b-button variant="primary" @click="createSubTicket">Add Sub task</b-button>
        </div>
        <generic-modal ref="modal" table="ticket" :definition="ticketDef" table-definition-key="ticket"
                       title="Create a sub task" @reload-table="onNewTicket"/>
        <validation-card title="Kunde XY" subtitle="Emeut an diese Aufgabe erinnert werden"/>
        <validation-card title="Fililalleiter V" subtitle="Emeut an diese Aufgabe erinnert werden"/>
        <validation-card title="Fililalleiter V" subtitle="Emeut an diese Aufgabe erinnert werden"/>
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
        <operation-recap-card/>
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
import ValidationCard from '@/views/app/CustomComponents/WP6/ValidationCard'
import OperationRecapCard from '@/views/app/CustomComponents/WP6/OperationRecapCard'
import EditPageMixin from "@/views/app/Generic/EditPageMixin";
import Table from '@/table'
import GenericModal from "@/views/app/Generic/modal";

export default {
  name: 'OperationsPage',
  components: {
    GenericModal,
    BButton,
    BCol,
    BRow,
    BCard,
    BCardBody,
    BIconAlarm,
    AdditionalCostsCard,
    ValidationCard,
    BDropdown,
    BDropdownItem,
    BIconCalendarWeek,
    BIconCaretDown,
    OperationRecapCard,
  },
  mixins: [EditPageMixin],
  data() {
    const ticketDef = JSON.parse(JSON.stringify(Table.ticket))
    ticketDef.fields.push({
      key: 'ticket_id_group',
      type: 'list',
      list: 'ticket',
      listLabel: 'ticket_name',
      visible: () => false,
    })
    const index = ticketDef.fields.findIndex(f => f.key === 'column_id')
    ticketDef.fields.splice(index, 1)
    return {
      ticketDef,
    }
  },
  methods: {
    createSubTicket() {
      this.$refs.modal.openModal(true, { ticket_id_group: this.entity.ticket_id })
    },
    async onNewTicket(ticket) {
      // await this.moveToColumn(ticket, this.columns[0])
      // this.loadTickets()
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
  },
}
</script>

<style scoped>

</style>

<script>
import KanbanViewDisplay from '@/components/KanbanDisplayView.vue'
import GenericFilter from '@/views/app/Generic/Filter.vue'
import TicketMixin from '@/views/app/Kanban/TicketMixin'
import Table from '@/table'
import InvoiceTicketCard from '@/views/app/CustomComponents/WP6/InvoiceTicketCard.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import AssignUserModal from '@/views/app/Kanban/AssignUserModal.vue'

export default {
  name: 'KabanView',
  components: {
    AssignUserModal, GenericModal, InvoiceTicketCard, GenericFilter, KanbanViewDisplay,
  },
  mixins: [TicketMixin],
  data() {
    return {
      table: 'ticket',
      previousScrollEvent: [],
      dropColumn: null,
      rollbackTickets: [],
      columnData: [],
      sourceModel: null,
      targetModel: null,
      movingNode: null,

      isMovingTicket: false,

      advanced: true,
      showErrorBox: false,
      ticketValue: null,
      search: '',
      dismissSecs: 10,
      dismissCountDown: 0,
      ticketName: '',
      columnName: '',
      previousColumnName: '',
      filterId: null,
      urlApi: '/tickets/change-ticket-column',
      boardIssueUrl: '/tickets/statistics/timing/board/',
      boardColumnUrl: '/tickets/columnxs',
      comment: '',
      loadingSaveError: false,
      errorData: null,
      loadingTicket: null,
      filterOptions: [
        {
          text: this.$t('header~board~status~open'), value: 0,
        },
        { text: this.$t('header~board~status~my'), value: 1 },
        { text: this.$t('header~board~status~closed'), value: 2 }, {
          text: this.$t('header~board~status~notassigned'),
          value: 3,
        },
      ],
      filterValue: 0,
      definition: Table.ticket,
      showSubTickets: true,
      loading: true,
      initialFetch: false,
      size: 3,
      page: 1,
    }
  },
  computed: {
    board_name() {
      return this.columns[0]?.board_name
    },
  },
  watch: {
    columnData(newValue) {
      if (newValue.length !== 0 && this.initialFetch) {
        console.log('this is the new value of the column', newValue)
        newValue.forEach(element => {
          this.fetchTicketOfTheColumn(element.column_id)
        })
        this.loadingTicket = newValue.map(item => ({ id: item.column_id, value: false }))
        console.log('this is the loading state')
      }
    },
  },
  created() {
    this.fetchColumnOfTheBoard()
    this.fetchTeamsSystem()
  },
  methods: {
    async handleScroll(event, value) {
      const previousEvent = this.previousScrollEvent.find(x => x.id === value.column_id)
      console.log("this is the previous element ", this.previousScrollEvent)
      console.log("this is the column", value.column_id)
      console.log("this is the previousevent", previousEvent)
      if (previousEvent && previousEvent.value > event.target.scrollTop) {
        console.log('you are going doing')
        this.page += 1
        await this.fetchTicketOfTheColumn(value.column_id)
      } else {
        this.previousScrollEvent.push({ id: value.column_id, value: event.target.scrollTop })
        // this.columnData.find(column => column.column_id === value.column_id).tickets.push({
        //   ticket_id: this.generateUuid(),
        //   ticket_name: `ticket-${this.generateUuid()}`,
        // })
      }
    },
    handleDrag(event, column, ticket) {
      if (event.type === 'dragend') {
        console.log('this is the value of the colum', column)
        console.log('this is the value of the ticket', ticket)
        if (this.dropColumn) {
          console.log('this is the column dropColumn', this.dropColumn)
        }
        if (event.target.classList.contains('card_draggable')) {
          event.target.classList.remove('card_draggable')
        }
      } else {
        console.log('the drag start', event)
        event.target.classList.add('card_draggable')
      }
      event.dataTransfer.setData('text', event.target.id)
      event.dataTransfer.effectAllowed = 'move'
    },
    handleDragOver(event) {
      console.log(
        `dragOver: dropEffect = ${event.dataTransfer.dropEffect} ; effectAllowed = ${event.dataTransfer.effectAllowed}`,
      )
      event.preventDefault()
      // Set the dropEffect to move
      event.dataTransfer.dropEffect = 'move'
    },
    handleDrop(event, column_id) {
      console.log('this is the drop event', event)
      console.log('this is the drop column', column_id)
      this.dropColumn = column_id
    },
    fetchTicketOfTheColumn(id) {
      console.log('this i sth fetch', id)
      if (id) {
        this.$http.get(`/tickets/slims?column_id=${id}&board_id=${this.$route.params.id}&size=${this.size}&page=${this.page}`).then(response => {
          console.log('this is the ticket of the column', response.data.data)
          const oldticket = this.columnData.find(element => element.column_id === id).tickets
          console.log("this is the old ticket",oldticket)
          if(oldticket.length > 0){
            console.log("this is the data", [...oldticket,...response.data.data])
            this.columnData.find(column => column.column_id === id).tickets = [...oldticket,...response.data.data]
          }else{
            this.columnData.find(column => column.column_id === id).tickets = response.data.data
          }
          console.log('this is the column data', this.columnData)
        }).catch(error => {
          console.error(error)
        })
      }
    },
    fetchTeamsSystem() {
      this.$http.get('/teams').then(response => {
        this.teams = response.data.data
      }).catch(error => {
        console.error(error)
      })
    },
    fetchColumnOfTheBoard() {
      this.$http.get(`${this.boardColumnUrl}?board_id=${this.$route.params.id}`).then(response => {
        this.columnData = response.data.data.map(items => ({ ...items, tickets: [] }))
        this.initialFetch = true
      }).catch(error => {
        console.error(error)
      })
    },

  },
}
</script>

<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <img class="mr-1" src="@/assets/images/icons/people.svg" alt="">
          <h4 class="mb-0">
            Board: {{ board_name }} </h4>
        </div>
        <div class="d-flex align-items-center">
          <b-button size="sm" variant="primary" class="mr-1 btn-icon" @click="$refs.filter.openModal()">
            <feather-icon icon="FilterIcon"/>
          </b-button>
          <!--          <generic-filter ref="filter" vertical :table="table" :definition="definition" @filter="filter"/>-->
          <b-form-checkbox v-model="advanced" switch title="Advanced Mode"/>
          <b-form-select v-model="filterValue" placeholder="Select an option" :options="filterOptions"/>
          <b-button v-b-tooltip.hover :title="showSubTickets ? 'Hide Subtasks' : 'Show Subtasks' "
                    :variant="showSubTickets ? 'primary' : ''" class="mx-1 btn-icon"
                    @click="showSubTickets = !showSubTickets">
            <icon icon="mdi:subtasks" width="16"/>
          </b-button>
          <b-button v-if="$can('create', table)" variant="primary" class="mr-1" block>
            {{ $t('button~newticket') }}
          </b-button>
          <b-form-input v-model="search" debounce="500" type="search" class="w-16" placeholder="Search.."/>
        </div>
      </div>
    </b-card>
    <div class="h-100">
      <KanbanViewDisplay classes="d-flex kanbanContainer" :styles="'border:solid green'">
        <b-card v-for="item in columnData" :key="item.column_id" class="columnBoardElement"
                @scrollend.passive="(e)=>handleScroll(e,item)"
                @drop.prevent="(event)=> handleDrop(event,item.column_id)"
                @dragover.prevent="(event) =>handleDragOver(event)">
          <template #header>
            <div class="border-bottom-2 border-bottom-primary w-100">
              <h5>
                {{ item.column_name }}
              </h5>
            </div>
          </template>
          <div v-for="ticket in item.tickets" :id="ticket.ticket_id" :key="ticket.ticket_id" draggable="true"
               class="cursor-pointer" style="height: 250px;margin-top: 15px;"
               @dragend="(event)=> handleDrag(event,item,ticket)"
               @dragstart="(event)=> handleDrag(event)">
            <invoice-ticket-card v-if="ticket.ticket_id_group === null || showSubTickets" class="bg-white"
                                 :advanced="advanced"
                                 :ticket="{...ticket, column_id:item.column_id,column_is_qualitygate:item.column_is_qualitygate}"
                                 :team-users="teams.filter(team => team.team_id === ticket.team_id)"
                                 @moredetails="$router.push({name: 'table-view', params: {table: 'ticket', id: ticket.ticket_id, entity: ticket, columns, teams}})"
                                 @assign="$refs.assign.openModal(ticket, userIdsOfTeam(ticket.team_id))"
                                 @subticket-updated="fetchTicketOfTheColumn(item.column_id)"/>
          </div>
        </b-card>
        <generic-modal ref="modal" :table="table" :definition="definition" :table-definition-key="table"
                       :title="$t('headline~ticket~newticket')" @reload-table="()=>{}"/>
        <!--        <assign-user-modal ref="assign" @reload="fetchTicketOfTheColumn()"/>-->
      </KanbanViewDisplay>
    </div>

  </div>
</template>

<style scoped>
.kanbanContainer {
  overflow-x: auto;
  gap: 15px;
  height: 80vh;
  user-select: none;
}

.columnBoardElement {
  background: #bbbcbe;
  min-width: 450px;
  max-height: 100vh;
  margin-bottom: 15px;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;

}

.card_draggable {
  border: dashed;
}
</style>

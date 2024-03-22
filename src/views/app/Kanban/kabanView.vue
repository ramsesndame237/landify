<script>
import KanbanViewDisplay from '@/components/KanbanDisplayView.vue'
import GenericFilter from '@/views/app/Generic/Filter.vue'
import TicketMixin from '@/views/app/Kanban/TicketMixin'
import Table from '@/table'
import InvoiceTicketCard from '@/views/app/CustomComponents/WP6/InvoiceTicketCard.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import AssignUserModal from '@/views/app/Kanban/AssignUserModal.vue'
import NoData from '@/views/app/CustomComponents/NoData/NoData.vue'
import moment from 'moment-business-time'

export default {
  name: 'KabanView',
  components: {
    AssignUserModal, GenericModal, InvoiceTicketCard, GenericFilter, KanbanViewDisplay, NoData,
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
      loadingTicket: [],
      filterOptions: [
        {
          text: this.$t('header~board~status~open'), value: 'opened',
        },
        {text: this.$t('header~board~status~my'), value: 'my_tickets'},
        {text: this.$t('header~board~status~closed'), value: 'closed'}, {
          text: this.$t('header~board~status~notassigned'),
          value: 'not_assigned',
        },
      ],
      filterValue: 'opened',
      definition: Table.ticket,
      showSubTickets: true,
      loading: true,
      initialFetch: false,
      size: 10,
      previousScrollValue: 0,
      pages: [],
    }
  },
  computed: {
    board_name() {
      return this.$route.params.name
    },
    columnIsScroll() {

    },
  },
  watch: {
    columnData(newValue) {
      if (newValue.length !== 0 && this.initialFetch) {
        console.log('this is the new value of the column', newValue)
        newValue.forEach(element => {
          this.pages.push({column_id: element.column_id, page: 1})
          this.fetchTicketOfTheColumn(element.column_id, false)
        })
        console.log('this is the loading state')
      }
    },
    filterValue(newValue) {
      this.fetchTicketOfTheColumn(undefined, false, {status: newValue})
    }
  },
  created() {
    this.fetchColumnOfTheBoard()
    this.fetchTeamsSystem()
  },
  methods: {
    async handleScroll(event, value) {
      if (event.target.scrollTop + event.target.offsetHeight >= event.target.scrollHeight) {
        this.pages.find(elet => elet.column_id === value.column_id).page += 1
        await this.fetchTicketOfTheColumn(value.column_id, false)
      }
    },
    async handleDrag(event, column, ticket) {
      if (event.type === 'dragend') {
        if (this.dropColumn) {
          console.log('this is the column dropColumn', this.dropColumn)
          // const result = await this.$swal({
          //   title: 'Are you sure?',
          //   text: `This ticket ${ticket.ticket_name} will be moved to the column: ${this.dropColumn.column_name}`,
          //   icon: 'warning',
          //   showCancelButton: true,
          //   confirmButtonText: 'Yes',
          //   customClass: {
          //     confirmButton: 'btn btn-primary',
          //     cancelButton: 'btn btn-outline-danger ml-1',
          //   },
          //   buttonsStyling: false,
          // })
          if (event.target.classList.contains('card_draggable')) {
            event.target.classList.remove('card_draggable')
          }
          // if (!result.value) return false
          this.loading = true
          try {
            await this.changeTicketColumn(event, column.column_id, this.dropColumn.column_id, '', ticket)
          } finally {
            this.loading = false
          }
          return true
        }
        if (event.target.classList.contains('card_draggable')) {
          event.target.classList.remove('card_draggable')
        }
      } else {
        event.target.classList.add('card_draggable')
      }
      event.dataTransfer.setData('text', event.target.id)
      return event.dataTransfer.effectAllowed = 'move'
    },
    changeTicketColumn(event, previous_column_id, next_column_id, next_column_name, ticket) {
      const payload = {
        previous_column_id,
        next_column_id,
        board_id: this.$route.params.id || ticket.board_id,
        ticket_id: ticket.ticket_id,
      }
      this.$http.post('/tickets/change-ticket-column', payload).then(response => {
        this.columnData.find(elet => elet.column_id === previous_column_id).tickets = this.columnData.find(elet => elet.column_id === previous_column_id).tickets.filter(elt => elt.ticket_id !== ticket.ticket_id)
        this.columnData.find(elet => elet.column_id === next_column_id).tickets.unshift({
          ...ticket,
          column_id: next_column_id,
          column_name: next_column_name,
        })
      }).catch(error => {
        console.error(error)
      })
      if (event.target.classList.contains('card_draggable')) {
        event.target.classList.remove('card_draggable')
      }
    },
    handleDragOver(event) {
      event.preventDefault()
      // Set the dropEffect to move
      const bottomTicket = this.insertAboveTicket(event.target.offsetParent, event.clientY)
      const curTicket = document.querySelector('.card_draggable')

      const containerWidth = this.$refs.KanbanContainer.$el.clientWidth
      const containerScrollWidth = this.$refs.KanbanContainer.$el.scrollWidth
      if (containerWidth < containerScrollWidth && event.clientX >= containerWidth) {
        if (this.previousScrollEvent <= event.clientX) {
          this.$refs.KanbanContainer.$el.scrollTo(this.$refs.KanbanContainer.$el.scrollLeft + 10, 0)
        } else {
          this.$refs.KanbanContainer.$el.scrollTo(this.$refs.KanbanContainer.$el.scrollLeft - 10, 0)
        }
        this.previousScrollEvent = event.clientX
      }

      if (!bottomTicket) {
        event.target.offsetParent.querySelector('.card-body').appendChild(curTicket)
      } else {
        event.target.offsetParent.querySelector('.card-body').insertBefore(curTicket, bottomTicket)
      }
      // event.dataTransfer.dropEffect = 'move'
    },
    handleDrop(event, column_id, column_name) {
      this.dropColumn = {column_id, column_name}
    },
    insertAboveTicket(column, mouseY) {
      const elements = column.offsetParent.querySelector('.card-body').querySelectorAll('.ticket:not(.card_draggable)')
      let closestTask = null
      let closestOffset = Number.NEGATIVE_INFINITY
      elements.forEach(ticket => {
        const {top} = ticket.getBoundingClientRect()

        const offset = mouseY - top

        if (offset < 0 && offset > closestOffset) {
          closestOffset = offset
          closestTask = ticket
        }
      })

      return closestTask
    },
    fetchTicketOfTheColumn(id, reloading, filterData) {
      for (const idKey in filterData) {
        if (filterData[idKey] === -1) {
          delete filterData[idKey]
        }
      }
      this.loadingTicket.push(id)
      console.log('this i sth fetch', id)
      if (id) {
        this.$http.get(`/tickets/slims?column_id=${id}&board_id=${this.$route.params.id}&size=${this.size}&page=${this.pages.find(pageElement => pageElement.column_id === id).page}&order_filed=ticket_id`).then(response => {
          console.log('this is the ticket of the column', response.data.data)
          this.loadingTicket = []
          const oldticket = this.columnData.find(element => element.column_id === id).tickets
          if (oldticket.length > 0 && !reloading) {
            console.log('this is the data', [...oldticket, ...response.data.data])
            this.columnData.find(column => column.column_id === id).tickets = [...oldticket, ...response.data.data]
          } else {
            this.columnData.find(column => column.column_id === id).tickets = response.data.data
          }
          console.log('this is the column data', this.columnData)
        }).catch(error => {
          console.error(error)
        })
      } else {
        this.columnData.forEach(element => {
          this.loadingTicket.push(element.column_id)
          this.$http.get(`/tickets/slims?column_id=${element.column_id}&board_id=${this.$route.params.id}&size=${this.size}&page=${this.pages.find(pageElement => pageElement.column_id === element.column_id).page}&order_filed=ticket_id`, {
            params: {...filterData},
          }).then(response => {
            this.loadingTicket = this.loadingTicket.filter(x => x !== element.column_id)
            this.columnData.find(column => column.column_id === element.column_id).tickets = response.data.data
          }).catch(error => {
            console.error(error)
          })
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
    createTicket() {
      console.log('this is the creatioin of the data')
      const now = moment()
      const column = this.columnData[0]
      console.log('this i sthe column is the data', column.default_deadline_red)
      const deadline_yellow = now.clone().addWorkingTime(1, 'hours').format('YYYY-MM-DD HH:mm:ss')
      const deadline_red = now.clone().addWorkingTime(1, 'hours').format('YYYY-MM-DD HH:mm:ss')
      this.$refs.modal.openModal(true, {
        column_id: column.column_id,
        board_id: this.$route.params.id,
        ticket_deadline_yellow: deadline_yellow,
        ticket_deadline_red: deadline_red,
        ticket_planned_treatment_week: 'KW42',
      })
    },
    fetchColumnOfTheBoard() {
      this.$http.get(`${this.boardColumnUrl}?board_id=${this.$route.params.id}&order_filed=rank_order`).then(response => {
        console.log('this is the data', response.data.data)
        this.columnData = response.data.data.sort((a, b) => a.rank_order - b.rank_order).map(items => ({...items, tickets: []}))
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
          <generic-filter ref="filter" vertical :table="table" :definition="definition"
                          @filter="(value)=>fetchTicketOfTheColumn(undefined,false,value)"/>
          <b-form-checkbox v-model="advanced" switch title="Advanced Mode"/>
          <b-form-select v-model="filterValue" placeholder="Select an option" :options="filterOptions"/>
          <b-button v-b-tooltip.hover :title="showSubTickets ? 'Hide Subtasks' : 'Show Subtasks' "
                    :variant="showSubTickets ? 'primary' : ''" class="mx-1 btn-icon"
                    @click="showSubTickets = !showSubTickets">
            <icon icon="mdi:subtasks" width="16"/>
          </b-button>
          <b-button v-if="$can('create', table)" variant="primary" class="mr-1" block @click="createTicket()">
            {{ $t('button~newticket') }}
          </b-button>
          <b-form-input v-model="search" debounce="500" type="search" class="w-16" placeholder="Search.."/>
        </div>
      </div>
    </b-card>
    <div class="h-100 position-relative">
      <KanbanViewDisplay ref="KanbanContainer" classes="d-flex kanbanContainer position-relative">
        <div class="w-100" v-if="columnData.length === 0">
          <NoData/>
        </div>
        <b-card v-for="item in columnData" :key="item.column_id" class="columnBoardElement"
                @drop.prevent="(event)=> handleDrop(event,item.column_id,item.column_name)"
                @dragover.prevent="(event) =>handleDragOver(event)" body-class="position-relative" :header="item.column_name"
                 header-text-variant="black" >
<!--          <template #header>-->
<!--            <div class="border-bottom-2 border-bottom-primary  w-100">-->
<!--              <h5>-->
<!--                {{ i }}-->
<!--              </h5>-->
<!--            </div>-->
<!--          </template>-->
          <div class="card-body-container"  @scrollend.passive="(e)=>handleScroll(e,item)">
            <div v-for="ticket in item.tickets" :id="ticket.ticket_id" :key="ticket.ticket_id" draggable="true"
                 class="cursor-pointer" style="height: auto;margin-top: 15px;z-index: 0;position: relative"
                 @dragend="(event)=> handleDrag(event,item,ticket)"
                 @dragstart="(event)=> handleDrag(event)">
              <invoice-ticket-card v-if="ticket.ticket_id_group === null || showSubTickets" class="bg-white"
                                   :advanced="advanced"
                                   :ticket="{...ticket, column_id:item.column_id,column_is_qualitygate:item.column_is_qualitygate}"
                                   :team-users="teams.filter(team => team.team_id === ticket.team_id)"
                                   @moredetails="$router.push({name: 'table-view', params: {table: 'ticket', id: ticket.ticket_id, entity: ticket, columns, teams}})"
                                   @assign="$refs.assign.openModal(ticket, userIdsOfTeam(ticket.team_id))"
                                   @subticket-updated="fetchTicketOfTheColumn(item.column_id,true)"/>
            </div>
            <div class="flex align-items-center justify-content-center w-100  text-center mt-2 position-absolute"
                 style="top:-35px">
              <b-spinner v-if="loadingTicket.includes(item.column_id)" variant="primary"
                         style="width: 3rem; height: 3rem;"/>
            </div>
          </div>
<!--          <b-button v-if="item.tickets.length <= 3 && !loading" block variant="primary" class="mt-2"-->
<!--                    @click="fetchTicketOfTheColumn(item.column_id,false)">-->
<!--            Load More Ticket-->
<!--          </b-button>-->
        </b-card>
        <generic-modal ref="modal" :table="table" :definition="definition" :table-definition-key="table"
                       :title="$t('headline~ticket~newticket')"
                       @reload-table="(value) =>fetchTicketOfTheColumn(value.column_id,true)"/>
        <!--        <assign-user-modal ref="assign" @reload="fetchTicketOfTheColumn()"/>-->
      </KanbanViewDisplay>
    </div>

  </div>
</template>

<style scoped lang="scss">
.kanbanContainer {
  overflow-x: auto;
  gap: 15px;
  height: 80vh;
  user-select: none;
  background: transparent;
}

.columnBoardElement {
  background: #E9E9E9;
  position: relative;
  min-width: 450px;
  max-width: 460px;
  max-height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .card-header{
    z-index: 10;
    height: 40px;
    background: #E9E9E9;
  }
  .card-body-container{
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }

}


.card_draggable {
  border: dashed;
}
</style>

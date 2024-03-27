<script>
import KanbanViewDisplay from '@/components/KanbanDisplayView.vue'
import Table from '@/table'
import NoData from '@/views/app/CustomComponents/NoData/NoData.vue'
import InvoiceTicketCard from '@/views/app/CustomComponents/WP6/InvoiceTicketCard.vue'
import GenericFilter from '@/views/app/Generic/Filter.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import AssignUserModal from '@/views/app/Kanban/AssignUserModal.vue'
import TicketMixin from '@/views/app/Kanban/TicketMixin'
import moment from 'moment-business-time'
import dragula from 'dragula'
import _ from 'lodash'

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
      debounced: null,

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
    canOpenTicket() {
      return this.$isAbleTo('read', this.definition.permissions)
    },
    board_name() {
      return this.$route.params.name
    },
    localBlocks() {
      return this.columnData
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
    filterValue() {
      this.getTicketWithFilters()
    },
    /** Reload tickets when the search value change */
    search() {
      this.getTicketWithFilters()
    },
  },
  created() {
    this.fetchColumnOfTheBoard()
    this.fetchTeamsSystem()
  },
  updated() {
    this.drake.containers = this.$refs.list
    this.drake.mirrorContainer = this.$el
  },
  mounted() {
    this.drake = dragula(this.$refs.list).on('drag', (el, source) => {
      // this.$emit('drag', el, source)
      console.log('this is the move', el)
      el.classList.add('is-moving')
      this.allowedTargets(el, source).forEach(c => c.classList.add('allowed'))
      this.forbiddenTargets(el, source).forEach(c => c.classList.add('forbidden'))
    }).on('dragend', el => {
      console.log('this is the dragend function', el)
      el.classList.remove('is-moving')
      this.drake.containers.forEach(c => c.classList.remove('allowed', 'forbidden'))
      window.setTimeout(() => {
        el.classList.add('is-moved')
        window.setTimeout(() => {
          el.classList.remove('is-moved')
        }, 600)
      }, 100)
    })
      .on('drop', (block, list, source, sibling) => {
        this.$emit('drop', block, list, source, sibling)
        console.log('this is the drop element', [block, source, sibling, list])
        let index = 0
        for (index = 0; index < list.children.length; index += 1) {
          if (list.children[index].classList.contains('is-moving')) break
        }

        let newState = list.dataset.status

        if (this.machine) {
          const transition = this.findTransition(list, source)
          if (!transition) return
          newState = this.machine.transition(source.dataset.status, transition).value
        }

        this.$emit('update-block', block.dataset.blockId, newState, index)
        this.changeTicketColumn(null, source.id, list.id, source.innerText, block.id)
      })
      .on('cancel', (el, container, source) => {
        this.$emit('cancel', el, container, source)
      })
      .on('remove', (el, container, source) => {
        this.$emit('remove', el, container, source)
      })
      .on('shadow', (el, container, source) => {
        this.$emit('shadow', el, container, source)
      })
      .on('over', (el, container, source) => {
        this.$emit('over', el, container, source)
      })
      .on('out', (el, container, source) => {
        this.$emit('out', el, container, source)
      })
      .on('cloned', (clone, original, type) => {
        this.$emit('cloned', clone, original, type)
      })
  },
  methods: {
    async handleScroll(event, value) {
      if (event.target.scrollTop + event.target.offsetHeight >= event.target.scrollHeight) {
        this.pages.find(elet => elet.column_id === value.column_id).page += 1
        await this.fetchTicketOfTheColumn(value.column_id, false)
      }
    },
    allowedTargets(el, source) {
      const block = this.localBlocks.find(b => b[this.idProp] === el.dataset.blockId)
      return this.drake.containers.filter(c => this.config.accepts(block, c, source))
    },

    forbiddenTargets(el, source) {
      return this.drake.containers.filter(c => !this.allowedTargets(el, source).includes(c))
    },
    async handleDrag(event, column, ticket) {
      if (event.type === 'dragend') {
        if (this.dropColumn) {
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
    changeTicketColumn(event, previous_column_id, next_column_id, next_column_name, ticket_id) {
      const payload = {
        previous_column_id,
        next_column_id,
        board_id: this.$route.params.id,
        ticket_id: ticket_id,
      }
      this.$http.post('/tickets/change-ticket-column', payload).then(response => {
        console.info('this is the response', response)
      }).catch(error => {
        console.error(error)
      })
    },
    // handleDragOver(event) {
    //   event.preventDefault()
    //   // Set the dropEffect to move
    //   const bottomTicket = this.insertAboveTicket(event.target.offsetParent, event.clientY)
    //   const curTicket = document.querySelector('.card_draggable')
    //
    //   console.log("this is the current ticket", bottomTicket)
    //   console.log("this is the event target", event.target.offsetParent.querySelector('.card-body-container'))
    //   const containerWidth = this.$refs.KanbanContainer.$el.clientWidth
    //   const containerScrollWidth = this.$refs.KanbanContainer.$el.scrollWidth
    //   if (containerWidth < containerScrollWidth && event.clientX >= containerWidth) {
    //     if (this.previousScrollEvent <= event.clientX) {
    //       this.$refs.KanbanContainer.$el.scrollTo(this.$refs.KanbanContainer.$el.scrollLeft + 10, 0)
    //     } else {
    //       this.$refs.KanbanContainer.$el.scrollTo(this.$refs.KanbanContainer.$el.scrollLeft - 10, 0)
    //     }
    //     this.previousScrollEvent = event.clientX
    //   }
    //
    //   if (!bottomTicket) {
    //     event.target.offsetParent.querySelector('.card-body-container').appendChild(curTicket)
    //   } else {
    //     event.target.offsetParent.querySelector('.card-body-container').insertBefore(curTicket, bottomTicket)
    //   }
    //   // event.dataTransfer.dropEffect = 'move'
    // },
    handleDrop(event, column_id, column_name) {
      this.dropColumn = {column_id, column_name}
    },
    // insertAboveTicket(column, mouseY) {
    //   console.log('this is the parent ', [column.offsetParent.querySelector('.card-body-container').querySelectorAll('.ticket:not(.card-body-container)')])
    //   const elements = column.offsetParent.querySelector('.card-body-container').querySelectorAll('.ticket:not(.card_draggable)')
    //   let closestTask = null
    //   let closestOffset = Number.NEGATIVE_INFINITY
    //   if (elements) {
    //     elements.forEach(ticket => {
    //       const {top} = ticket.getBoundingClientRect()
    //
    //       const offset = mouseY - top
    //       console.log("this is the offset", offset)
    //       console.log("this is the offset", closestOffset)
    //
    //       if (offset < 0 && offset > closestOffset) {
    //         closestOffset = offset
    //         closestTask = ticket
    //       }
    //     })
    //   }
    //
    //   return closestTask
    // },
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
        this.columnData = response.data.data.sort((a, b) => a.rank_order - b.rank_order).map(items => ({
          ...items,
          tickets: [],
        }))
        this.initialFetch = true
      }).catch(error => {
        console.error(error)
      })
    },
    /** Filter tickets based on the value in the modal
     * `filters` and the value of the `search` prop */
    getTicketWithFilters() {
      if (this.debounced) {
        this.debounced.cancel()
      }
      this.debounced = _.debounce(() => this.fetchTicketOfTheColumn(
        undefined,
        false,
        {
          ...(this.$refs.filter?.data || {}),
          keyword: this.search,
          status: this.filterValue,
        },
      ).finally(() => {
        this.debounced = null
      }), 500)
      this.debounced()
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
                          @filter="getTicketWithFilters"/>
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
        <div v-if="columnData.length === 0" class="w-100">
          <NoData/>
        </div>
        <b-card v-for="item in columnData" :key="item.column_id" class="columnBoardElement"
                body-class="position-relative"
                :header="item.column_name" header-text-variant="black">
          <div :id="item.column_id" ref="list" class="card-body-container"
               @scrollend.passive="(e)=>handleScroll(e,item)">
            <div v-for="ticket in item.tickets" :id="ticket.ticket_id" :key="ticket.ticket_id" draggable="true"
                 class="cursor-pointer" style="height: auto;margin-top: 15px;z-index: 0;position: relative">
              <invoice-ticket-card v-if="ticket.ticket_id_group === null || showSubTickets" class="bg-white"
                                   :advanced="advanced"
                                   :ticket="{...ticket, column_id:item.column_id,column_is_qualitygate:item.column_is_qualitygate}"
                                   :team-users="teams.filter(team => team.team_id === ticket.team_id)"
                                   @moredetails="!canOpenTicket ? undefined : $router.push({name: 'table-view', params: {table: 'ticket', id: ticket.ticket_id, entity: ticket, columns, teams}})"
                                   @assign="!canOpenTicket ? undefined : $refs.assign.openModal(ticket, userIdsOfTeam(ticket.team_id))"
                                   @subticket-updated="!canOpenTicket ? undefined : fetchTicketOfTheColumn(item.column_id,true)"/>
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

  .card-header {
    z-index: 10;
    height: 40px;
    background: #E9E9E9;
  }

  .card-body-container {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    padding: 10px;
  }

}

.card_draggable {
  border: dashed;
}

.notClickable {
  pointer-events: none;
}

.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 0.8;
  list-style-type: none;
}

.gu-hide {
  display: none !important;
}

.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}

.gu-transit {
  opacity: 0.2;
}

</style>

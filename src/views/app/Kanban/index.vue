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
          <generic-filter ref="filter" vertical :table="table" :definition="definition" @filter="filter"/>
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
    <div v-if="loading">
      <b-row>
        <b-col v-for="(item,index) in 4" lg="3" md="3" sm="2">
          <div class="kanban-container">
            <div class="header-kaban">
              <b-skeleton animation="wave" type="input"/>
            </div>
            <div class="body-kanban">
              <b-card>
                <div v-for="(item,index) in 2" :class="[index ===1 ? 'mt-3' :'']">
                  <b-skeleton-img no-aspect height="250px"/>
                </div>
              </b-card>

            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <kanban-board v-show="!loading" ref="kanbanRef" :class="{ movingTicket: isMovingTicket }" :blocks="visibleTickets" :stages="stages" :config="config" status-prop="column_name"
                  id-prop="ticket_id" @update-block="updateBlock">
      <div v-for="stage in stages" :key="stage" :slot="stage"
           class="w-100 d-flex justify-content-between align-items-center">
        <!-- <b-badge @click="()=>{
          if(getColumnPendingData(stage) > 0){
            $router.push({path:'/app/dashboard/issue/board/' + $route.params.id})
          }
        }" v-b-tooltip.hover title="Number of pending issues ticket" class="cursor-pointer" variant="warning">
          {{ getColumnPendingData(stage) }}<span class="sr-only cursor-pointer">tickets</span></b-badge> -->
        <h2 :title="getColumnTitle(stage)">
          {{ stage }}
        </h2>
        <div :title="isQualityGate(stage)?'Quality Gate Column':''">
          <feather-icon v-if="isQualityGate(stage)" class="text-primary" icon="StarIcon"/>
        </div>

      </div>
      <div v-for="ticket in visibleTickets" :slot="ticket.ticket_id" :key="ticket.ticket_id" class="item">
        <invoice-ticket-card v-if="ticket.ticket_id_group === null || showSubTickets" :advanced="advanced"
                             :ticket="ticket"
                             :team-users="teams.filter(team => team.team_id === ticket.columns[0].team_id)"
                             @moredetails="$router.push({name: 'table-view', params: {table: 'ticket', id: ticket.ticket_id, entity: ticket, columns, teams}})"
                             @assign="$refs.assign.openModal(ticket, userIdsOfTeam(ticket.columns[0].team_id))"
                             @subticket-updated="loadBoardTickets"/>
      </div>
    </kanban-board>
    <generic-modal ref="modal" :table="table" :definition="definition" :table-definition-key="table"
                   :title="$t('headline~ticket~newticket')" @reload-table="onNewTicket"/>
    <assign-user-modal ref="assign" @reload="loadBoardTickets()"/>
    <!-- <AlertErrorModal :show-error-box="showErrorBox" :ticket-value="ticketValue" ref="alertModal" @openReasonModal="$refs.errorModal.openModal()"/>
    <ReasonErrorModal :loading-save-error="loadingSaveError"
                      :ticket="{ticketName:ticketName,previousColumnName:previousColumnName,columnName:columnName}"
                      @saveError="saveError" ref="errorModal" @comment="updateComment"/> -->

  </div>
</template>
<script>
import {
  BButton, BCard, BFormInput, BFormSelect, BFormCheckbox, BSkeleton, BSkeletonImg, BFormTextarea,
} from 'bootstrap-vue'
// eslint-disable-next-line import/extensions
import GenericModal from '@/views/app/Generic/modal'
import Table from '@/table'
import InvoiceTicketCard from '@/views/app/CustomComponents/WP6/InvoiceTicketCard'
import moment from 'moment-business-time'
import {getUserData} from '@/auth/utils'
import GenericFilter from '@/views/app/Generic/Filter'
import AssignUserModal from '@/views/app/Kanban/AssignUserModal'
import Fuse from 'fuse.js'
import TicketMixin from '@/views/app/Kanban/TicketMixin'

export default {
  name: 'Kanban',
  components: {
    AssignUserModal,
    GenericFilter,
    InvoiceTicketCard,
    GenericModal,
    BButton,
    BFormCheckbox,
    BFormSelect,
    BCard,
    BFormInput,
    BSkeleton,
    BSkeletonImg,
    BFormTextarea
  },
  mixins: [TicketMixin],
  data() {
    return {
      table: 'ticket',
      rollbackTickets: [],

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
      comment: '',
      loadingSaveError: false,
      errorData: null,
      filterOptions: [
        {
          text: this.$t('header~board~status~open'), value: 0,
        },
        {text: this.$t('header~board~status~my'), value: 1},
        {text: this.$t('header~board~status~closed'), value: 2}, {
          text: this.$t('header~board~status~notassigned'),
          value: 3,
        },
      ],
      filterValue: 0,
      definition: Table.ticket,
      showSubTickets: true,
      loading: true,
    }
  },
  computed: {
    stages() {
      return this.columns.map(c => c.column_name)
    },
    board_name() {
      return this.columns[0]?.board_name
    },
    visibleTickets() {
      const user = getUserData()
      let prefiltered = this.tickets.filter(ticket => {
        if (this.filterValue === 0) {
          return !ticket.ticket_closed
        }
        if (this.filterValue === 1) {
          return ticket.columns[0].user_id_assigned === user.user_id
        }
        if (this.filterValue === 2) {
          return ticket.ticket_closed
        }
        if (this.filterValue === 3) {
          return ticket.columns[0].user_id_assigned == null
        }
        return true
      })
      if (this.search && prefiltered[0]) {
        const fuse = new Fuse(prefiltered, {
          keys: Object.keys(prefiltered[0]),
          shouldSort: true,
        })
        prefiltered = fuse.search(this.search).map(({item}) => item)
      }

      return prefiltered
    },
    board_id() {
      return this.$route.params.id
    },
  },
  mounted() {
    this.loading = true
    this.fetchIssueBoardData()
    this.$refs.kanbanRef.drake.on('drop', (el, target, source) => {
      this.sourceModel = source
      this.targetModel = target
      this.movingNode = el
    })
    try {
      this.loadStages(this.board_id)
      this.loadBoardTickets(null, false)

    } finally {
      // this.loading = false
    }
  },
  methods: {
    async fetchIssueBoardData() {
      await this.$http.get(this.boardIssueUrl + this.$route.params.id).then((response) => {
        this.errorData = response.data
      }).catch((error) => this.$errorToast('and error occured'))

    },
    updateComment(value){
      this.comment = value
    },
    getColumnPendingData(stage) {
      let numberOfPendingTicket = 0

      const dataFind = this.errorData.find((issue) => issue.column_name === stage)
      if (dataFind) {
        numberOfPendingTicket = dataFind.column_stats.pending
      }
      return numberOfPendingTicket

    },
    async saveError() {
      this.loadingSaveError = true
      const server_send_data = {
        previous_column_id: this.tickets.find(ticket => ticket.ticket_id === Number(this.filterId)).columns?.[0].column_id,
        error_column_id: this.tickets.find(ticket => ticket.ticket_id === Number(this.filterId)).columns?.[1].column_id,
        switch_action: "previous",
        comment: this.comment,
        board_id: this.$route.params.id,
        error_board_id: this.$route.params.id,
        ticket_id: this.tickets.find(ticket => ticket.ticket_id === Number(this.filterId)).ticket_id
      }
      await this.$http.post(this.urlApi, server_send_data).then((response) => {
        this.$successToast('The error is successfuly send')
        this.$refs.errorModal.hide()
        this.comment = ''
      }).catch((error) => this.$errorToast('And error occured')).finally(() => {
        this.$refs.errorModal.hide()
        this.loadingSaveError = false
      })
    },
    showAlert() {
      this.showErrorBox = true
      // this.$refs.alertModal.openModal()
    },
    async loadBoardTickets(data, loader = true) {
      if (loader) this.loading = true
      try {
        await this.loadTickets({board_id: this.board_id, ...data})
        // console.log(this.tickets)
      } finally {
        if (loader) this.loading = false
      }
      this.loading = false
    },
    filter(data) {
      this.loadBoardTickets(data)
    },
    isQualityGate(stage) {
      return this.columns.find(c => c.column_name === stage).column_is_qualitygate
    },
    getColumnTitle(stage) {
      const column = this.columns.find(c => c.column_name === stage)
      return `Team: ${column.team_name || 'None'}`
    },
    createBlock(stage) {
      this.blocks.push({
        id: this.blocks[this.blocks.length - 1].id + 1,
        status: stage,
        title: 'New Block',
        description: 'My block description',
      })
    },
    updateBlock(id, status) {
      const destinationColumn = this.tickets.find(ticket => ticket.ticket_id === Number(id)).columns?.[0]
      const recepientColumn = this.columns.find(column => column.column_name === status)
      this.ticketName = this.tickets.find(ticket => ticket.ticket_id === Number(id)).ticket_name
      this.columnName = status
      this.previousColumnName = destinationColumn.column_name
      this.filterId = id
      if (destinationColumn.rank_order > recepientColumn.rank_order) {
        this.showAlert()
        this.ticketValue = this.tickets.find(ticket => ticket.ticket_id === Number(id))
      }
      this.moveToColumn(this.tickets.find(t => t.ticket_id === Number(id)), this.columns.find(c => c.column_name === status))
      // this.blocks.find(b => b.id === Number(id)).status = status;
    },
    createTicket() {
      const now = moment()
      const column = this.columns[0]
      const deadline_yellow = now.clone().addWorkingTime(column.default_deadline_yellow, 'hours').format('YYYY-MM-DD HH:mm:ss')
      console.log("this i sthe column is the data", column.default_deadline_yellow)
      const deadline_red = now.clone().addWorkingTime(column.default_deadline_red, 'hours').format('YYYY-MM-DD HH:mm:ss')
      this.$refs.modal.openModal(true, {
        column_id: column.column_id,
        board_id: column.board_id,
        ticket_deadline_yellow: deadline_yellow,
        ticket_deadline_red: deadline_red,
        ticket_planned_treatment_week: 'KW42',
      })
    },
    async onNewTicket(ticket) {
      // await this.moveToColumn(ticket, this.columns[0])
      this.loadBoardTickets()
    },
  },
}
</script>

<style lang="scss">
/*@import '~vue-kanban/src/assets/kanban.scss';*/
$ease-out: all .3s cubic-bezier(0.23, 1, 0.32, 1);
$on-hold: #FB7D44;
$in-progress: #2A92BF;
$needs-review: #F4CE46;
$approved: #00B961;

.alert {
  background: $on-hold !important;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.drag-container {
  margin: 20px auto;
  overflow-x: auto;
  min-height: 50vh;
  padding-bottom: 20px;
}

.drag-list {
  display: flex;
  align-items: flex-start;
  //max-height: 80vh;

  @media (max-width: 690px) {
    display: block;
  }
}

.drag-column {
  flex: 1;
  margin: 0 10px;
  position: relative;
  background: #E9E9E9;
  overflow: hidden;
  //flex-basis: 250px;
  min-width: 400px;
  border-radius: 15px;

  @media (max-width: 690px) {
    margin-bottom: 30px;
  }

  h2 {
    font-size: 0.8rem;
    margin: 0;
    text-transform: uppercase;
    font-weight: 600;
  }

  &-on-hold {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $on-hold;
    }
  }

  &-in-progress {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $in-progress;
    }
  }

  &-needs-review {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $needs-review;
    }
  }

  &-approved {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $approved;
    }
  }
}

.drag-column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.drag-inner-list {
  min-height: 50vh;
  max-height: calc(80vh - 30px);
  overflow-x: hidden;
  overflow-y: auto;
}

.drag-item {
  margin: 10px;
  background: rgba(white, 1);
  //transition: $ease-out;

  &.is-moving {
    transform: scale(1.1);
    background: rgba(white, 0.8);
  }

}

.drag-header-more {
  cursor: pointer;
}

.drag-options {
  position: absolute;
  top: 44px;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  transform: translateX(100%);
  opacity: 0;
  transition: $ease-out;

  &.active {
    transform: translateX(0);
    opacity: 1;
  }

  &-label {
    display: block;
    margin: 0 0 5px 0;

    input {
      opacity: 0.6;
    }

    span {
      display: inline-block;
      font-size: 0.9rem;
      font-weight: 400;
      margin-left: 5px;
    }
  }
}

/* Dragula CSS  */

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

/* Demo info */

.section {
  padding: 20px;
  text-align: center;

  a {
    color: white;
    text-decoration: none;
    font-weight: 300;
  }

  h4 {
    font-weight: 400;

    a {
      font-weight: 600;
    }
  }
}

.movingTicket {
  opacity: 0.5;
  pointer-events: none;
}
</style>

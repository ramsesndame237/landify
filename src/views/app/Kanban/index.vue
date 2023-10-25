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
          <b-button v-b-tooltip.hover :title="showSubTickets ? 'Hide Sub-tickets' : 'Show Sub-tickets' " :variant="showSubTickets ? 'primary' : ''" class="ml-1 btn-icon" @click="showSubTickets = !showSubTickets">
            <Icon icon="mdi:subtasks" width="16" />
          </b-button>
          <b-button variant="primary" class="mx-1" block @click="createTicket()">
            {{ $t('button~newticket') }}
          </b-button>
          <b-form-input v-model="search" debounce="500" type="search" class="w-16" placeholder="Search.."/>
        </div>
      </div>
    </b-card>
    <b-overlay :show="loading">
      <kanban-board :blocks="visibleTickets" :stages="stages" :config="config" status-prop="column_name"
                    id-prop="ticket_id" @update-block="updateBlock">
        <div v-for="stage in stages" :key="stage" :slot="stage"
             class="w-100 d-flex justify-content-between align-items-center">
          <h2 :title="getColumnTitle(stage)">
            {{ stage }}
          </h2>
          <div :title="isQualityGate(stage)?'Quality Gate Column':''">
            <feather-icon v-if="isQualityGate(stage)" class="text-primary" icon="StarIcon"/>
          </div>

        </div>
        <div v-for="ticket in visibleTickets" :slot="ticket.ticket_id" :key="ticket.ticket_id" class="item">
          <invoice-ticket-card v-if="ticket.ticket_id_group === null || showSubTickets" :advanced="advanced" :ticket="ticket" :team-users="teams.filter(team => team.team_id === ticket.columns[0].team_id)"
                               @moredetails="$router.push({name: 'table-view', params: {table: 'ticket', id: ticket.ticket_id, entity: ticket, columns, teams}})"
                               @assign="$refs.assign.openModal(ticket, userIdsOfTeam(ticket.columns[0].team_id))"/>
        </div>
      </kanban-board>
    </b-overlay>
    <generic-modal ref="modal" :table="table" :definition="definition" :table-definition-key="table"
                   title="Create a new Ticket" @reload-table="onNewTicket"/>
    <assign-user-modal ref="assign" @reload="loadBoardTickets()"/>
  </div>
</template>
<script>
import {
  BButton, BCard, BFormInput, BFormSelect, BFormCheckbox,
} from 'bootstrap-vue'
// eslint-disable-next-line import/extensions
import GenericModal from '@/views/app/Generic/modal'
import Table from '@/table'
import InvoiceTicketCard from '@/views/app/CustomComponents/WP6/InvoiceTicketCard'
import moment from 'moment-business-time'
import { getUserData } from '@/auth/utils'
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
  },
  mixins: [TicketMixin],
  data() {
    return {
      table: 'ticket',
      advanced: true,
      search: '',
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
      loading: false,
      showSubTickets: true,
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
        if (ticket.ticket_id_group) {
          console.log('Ici subticket')
          console.log({ ticket })
        }
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
        prefiltered = fuse.search(this.search).map(({ item }) => item)
      }

      return prefiltered
    },
    board_id() {
      return this.$route.params.id
    },
  },
  mounted() {
    this.loading = true
    try {
      this.loadStages(this.board_id)
      this.loadBoardTickets(null, false)
    } finally {
      this.loading = false
    }
  },
  methods: {
    async loadBoardTickets(data, loader = true) {
      if (loader) this.loading = true
      try {
        await this.loadTickets({ board_id: this.board_id, ...data })
        // console.log(this.tickets)
      } finally {
        if (loader) this.loading = false
      }
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
      console.log(id, status, 'move')
      this.moveToColumn(this.tickets.find(t => t.ticket_id === Number(id)), this.columns.find(c => c.column_name === status))
      // this.blocks.find(b => b.id === Number(id)).status = status;
    },
    createTicket() {
      const now = moment()
      const column = this.columns[0]
      const deadline_yellow = now.clone().addWorkingTime(column.default_deadline_yellow, 'hours').format('YYYY-MM-DD HH:mm:ss')
      const deadline_red = now.clone().addWorkingTime(column.default_deadline_red, 'hours').format('YYYY-MM-DD HH:mm:ss')
      this.$refs.modal.openModal(true, {
        column_id: column.column_id,
        ticket_deadline_yellow: deadline_yellow,
        ticket_deadline_red: deadline_red,
        ticket_planned_treatment_week: 'KW42',
      })
    },
    async onNewTicket(ticket) {
      await this.moveToColumn(ticket, this.columns[0])
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
  min-height: 50px;
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
</style>

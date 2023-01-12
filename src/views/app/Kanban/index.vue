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
          <b-button @click="$refs.filter.openModal()" size="sm" variant="primary" class="mr-1 btn-icon">
            <feather-icon icon="FilterIcon"/>
          </b-button>
          <generic-filter ref="filter" :table="table" :definition="definition" @filter="filter"/>
          <b-form-checkbox v-model="advanced" switch title="Advanced Mode"/>
          <b-form-select v-model="filterValue" placeholder="Select an option" :options="filterOptions"/>
          <b-button variant="primary" class="mx-1" block @click="createTicket()">
            {{ $t('button~newticket') }}
          </b-button>
          <b-form-input v-model="search" debounce="500" type="search" class="w-16" placeholder="Search.."/>
        </div>
      </div>
    </b-card>
    <kanban-board :blocks="visibleTickets" :stages="stages" :config="config" status-prop="column_name"
                  id-prop="ticket_id" @update-block="updateBlock">
      <div v-for="stage in stages" :key="stage" :slot="stage" class="w-100 d-flex justify-content-between"
           :title="isQualityGate(stage)?'Quality Gate Column':''">
        <h2>{{ stage }}</h2>
        <feather-icon v-if="isQualityGate(stage)" class="text-primary" icon="StarIcon"/>
      </div>
      <div v-for="ticket in visibleTickets" :slot="ticket.ticket_id" :key="ticket.ticket_id" class="item">
        <invoice-ticket-card :advanced="advanced" :ticket="ticket"
                             @assign="$refs.assign.openModal(ticket, ticket.columns[0].team_id)"/>
      </div>
    </kanban-board>
    <generic-modal ref="modal" :table="table" :definition="definition" :table-definition-key="table"
                   title="Create a new Ticket" @reload-table="onNewTicket"/>
    <assign-user-modal ref="assign" @reload="loadTickets"/>
  </div>
</template>
<script>
import {
  BAvatarGroup, BAvatar, BButton, BCard, BFormInput, BFormSelect, BFormCheckbox
} from 'bootstrap-vue'
// eslint-disable-next-line import/extensions
import GenericModal from '@/views/app/Generic/modal'
import Table from '@/table'
import InvoiceTicketCard from '@/views/app/CustomComponents/WP6/InvoiceTicketCard'
import moment from 'moment-business-time'
import { getUserData } from '@/auth/utils'
import _ from 'lodash'
import GenericFilter from "@/views/app/Generic/Filter";
import AssignUserModal from "@/views/app/Kanban/AssignUserModal";

export default {
  name: 'Kanban',
  components: {
    AssignUserModal,
    GenericFilter,
    InvoiceTicketCard,
    GenericModal,
    BAvatarGroup,
    BAvatar,
    BButton,
    BFormCheckbox,
    BFormSelect,
    BCard,
    BFormInput,
  },
  data() {
    return {
      table: 'ticket',
      advanced: true,
      search: '',
      filterOptions: [{ text: 'All openned', value: 0 }, { text: 'My tickets', value: 1 },
        { text: 'All closed', value: 2 }, { text: 'Not assigned', value: 3 },
      ],
      filterValue: 0,
      definition: Table.ticket,
      columns: [],
      tickets: [],
      teams: [],
      loading: false,
      config: {
        // Don't allow blocks to be moved out of the approved stage
        accepts: (block, target, source) => {
          // console.log(target.dataset, source.dataset, 'moved')
          const columnSourceIdx = this.columns.findIndex(c => c.column_name === source.dataset.status)
          const columnTargetIdx = this.columns.findIndex(c => c.column_name === target.dataset.status)
          // check if user is in the right team
          const teamId = this.columns[columnSourceIdx].team_id
          let isInTeam = true
          if (teamId) isInTeam = this.currentUserInTeam(teamId)
          if (!isInTeam) return false
          // +1 -1 movements
          if (columnTargetIdx === columnSourceIdx + 1 || columnTargetIdx === columnSourceIdx - 1) return true
          // target column before next quality gate column
          const columnNextQualityGateIdx = this.columns.findIndex((c, idx) => c.column_is_qualitygate && idx > columnSourceIdx)
          if (columnNextQualityGateIdx >= 0) {
            if (columnTargetIdx <= columnNextQualityGateIdx) return true
          }
          return false
        },
      },
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
      return this.tickets.filter(ticket => {
        if (this.filterValue === 0) {
          return !ticket.ticket_closed
        }
        if (this.filterValue === 1) {
          return this.currentUserInTeam(ticket.columns[0].team_id)
        }
        if (this.filterValue === 2) {
          return ticket.ticket_closed
        }
        return true
      })
    },
  },
  mounted() {
    this.loadStages()
    this.loadTickets()
  },
  methods: {
    filter(data) {
      console.log('on filter', data)
      this.loadTickets(data)
    },
    isQualityGate(stage) {
      return this.columns.find(c => c.column_name === stage).column_is_qualitygate
    },
    currentUserInTeam(teamId) {
      const user = getUserData()
      const email = user.user.user_email
      return this.teams.find(team => team.team_id === teamId && team.user_email === email && moment().isBetween(moment(team.user_team_valid_from), moment(team.user_team_valid_to), 'day')) != null
    },
    createBlock(stage) {
      this.blocks.push({
        id: this.blocks[this.blocks.length - 1].id + 1,
        status: stage,
        title: 'New Block',
        description: 'My block description',
      })
    },
    loadStages() {
      this.loading = true
      this.$api({
        entity: 'frontend_column_list',
        action: 'read-rich',
        order_by: 'rank_order',
        order_dir: 'ASC',
        data: [{ board_id: this.$route.params.id }],
      })
        .then(({ data }) => {
          this.columns = data.data.data.sort(c => c.rank_order)
          const ids = this.columns.map(c => c.team_id).filter(c => c != null)
          if (ids.length === 0) return
          return this.$api({
            entity: 'user_team_grp',
            action: 'read-rich',
            data: ids.map(id => ({ team_id: id })),
          }).then(({ data }) => {
            this.teams = data.data.data
          })
        })
        .finally(() => this.loading = false)
    },
    updateBlock(id, status) {
      console.log(id, status, 'move')
      this.moveToColumn(this.tickets.find(t => t.ticket_id === Number(id)), this.columns.find(c => c.column_name === status))
      // this.blocks.find(b => b.id === Number(id)).status = status;
    },
    createTicket() {
      this.$refs.modal.openModal(true, { column_id: this.columns[0].column_id })
    },
    loadTickets(filterData) {
      this.$api({
        entity: 'frontend_6_1_6_listall',
        action: 'read-rich',
        per_page: 1000000,
        data: [{ board_id: this.$route.params.id, ...filterData }],
      })
        .then(({ data }) => {
          const rawData = data.data.data
          this.tickets = Object.values(_.groupBy(rawData, 'ticket_id')).map(r => {
            const obj = _.pick(r[0], ['ticket_creation_time', 'ticket_deadline',
              'ticket_deadline_red',
              'ticket_deadline_yellow',
              'ticket_description',
              'ticket_id',
              'ticket_last_change_time',
              'ticket_name',
              'ticket_planned_treatment_week',
              'ticket_closed',
              'ticket_progress'])
            obj.columns = _.orderBy(r, 'ticket_move_time_in', 'desc').map(i => _.pick(i, ['ticket_id', 'column_id', 'column_name', 'user_email_assigned', 'user_id_assigned', 'team_name', 'team_id', 'ticket_move_time_in', 'ticket_move_time_out', 'ticket_deadline_offset', 'ticket_deadline_offset_yellow', 'ticket_deadline_offset_red']))
            obj.column_name = obj.columns[0].column_name
            return obj
          })
        })
    },
    async onNewTicket(ticket) {
      await this.moveToColumn(ticket, this.columns[0])
      const user = getUserData()
      const user_id = user.user.user_id
      await this.assignToUser(ticket, user_id)
      this.loadTickets()
    },

    async moveToColumn(ticket, column) {
      const now = moment()
      const deadline = now.clone().addWorkingTime(column.default_deadline_period, 'hours').format('YYYY-MM-DD HH:mm:ss')
      const deadline_yellow = now.clone().addWorkingTime(column.default_deadline_yellow, 'hours').format('YYYY-MM-DD HH:mm:ss')
      const deadline_red = now.clone().addWorkingTime(column.default_deadline_red, 'hours').format('YYYY-MM-DD HH:mm:ss')
      const columnTicket = (await this.$api({
        action: 'create',
        entity: 'ticket_columnx_rel',
        data: [
          {
            ticket_id: ticket.ticket_id,
            column_id: column.column_id,
            ticket_move_time_in: now.format('YYYY-MM-DD HH:mm:ss'),
            ticket_deadline_offset: deadline,
            ticket_deadline_offset_yellow: deadline_yellow,
            ticket_deadline_offset_red: deadline_red,
          },
        ],
      })).data.data.data[0][0]
      columnTicket.column_name = this.columns.find(c => c.column_id === columnTicket.column_id).column_name
      if (!ticket.columns) ticket.columns = []
      ticket.columns.prepend(columnTicket)
      if (ticket.columns && ticket.columns[1]) {
        const updatedColumnTicket = (await this.$api({
          action: 'update',
          entity: 'ticket_columnx_rel',
          data: [{
            ..._.pick(ticket.columns[0], ['ticket_id', 'column_id', 'ticket_move_time_in']),
            ticket_move_time_out: now.format('YYYY-MM-DD HH:mm:ss'),
          }],
        })).data.data.data[0][0]
        ticket.columns[1].ticket_move_time_out = updatedColumnTicket.ticket_move_time_out
      }
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
  //max-width: 1000px;
  margin: 20px auto;
  overflow-x: auto;
}

.drag-list {
  display: flex;
  align-items: flex-start;

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
  min-width: 300px;

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

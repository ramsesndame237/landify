import moment from "moment-business-time";
import { getUserData } from "@/auth/utils";

export default {
  data() {
    return {
      columns: [],
      tickets: [],
      teams: [],
      config: {
        // Don't allow blocks to be moved out of the approved stage
        accepts: (block, target, source, isback) => {
          // console.log(target.dataset, source.dataset, 'moved')
          if (this.columns.length === 0) return false
          const columnSourceIdx = this.columns.findIndex(c => c.column_name === source.dataset.status)
          const columnTargetIdx = this.columns.findIndex(c => c.column_name === target.dataset.status)
          // check if user is in the right team
          const teamId = this.columns[columnSourceIdx].team_id
          let isInTeam = true
          if (teamId) isInTeam = this.currentUserInTeam(teamId)
          if (!isInTeam) return false
          if (isback) return true
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
  methods: {
    async moveToNextColumn(ticket) {
      const column = this.columns[this.columns.findIndex(c => c.column_name === ticket.column_name) + 1]
      const result = await this.$swal({
        title: 'Are you sure?',
        text: `This ticket will be moved to the column: ${column.column_name}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
      if (!result.value) return false
      this.loading = true
      try {
        await this.moveToColumn(ticket, column)
      } finally {
        this.loading = false
      }
      return true
    },
    async moveToPreviousColumn(ticket) {
      const column = this.columns.find(c => c.column_name === this.entity.columns[1].column_name)
      const result = await this.$swal({
        title: 'Are you sure?',
        text: `This ticket will be moved back to the column: ${column.column_name}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
      if (!result.value) return false
      this.loading = true
      try {
        await this.moveToColumn(ticket, column)
      } finally {
        this.loading = false
      }
      return true
    },
    async toggleTicket(ticket) {
      const result = await this.$swal({
        title: 'Are you sure?',
        text: ticket.ticket_closed ? 'This ticket will be re-opened' : 'This ticket will be closed',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
      if (!result.value) return
      const updated = (await this.$api({
        action: 'update',
        entity: 'ticket',
        data: [{ ticket_id: ticket.ticket_id, ticket_closed: !ticket.ticket_closed }],
      })).data.data.data[0][0]
      ticket.ticket_closed = updated.ticket_closed
      this.$successToast(ticket.ticket_closed ? 'The ticket is closed' : 'The ticket is open')
    },
    loadTickets(filterData) {
      return this.$api({
        entity: 'frontend_6_1_6_listall',
        action: 'read-rich',
        per_page: 1000000,
        data: [filterData],
      })
        .then(({ data }) => {
          const rawData = data.data.data
          this.tickets = Object.values(_.groupBy(rawData, 'ticket_id')).map(r => {
            const obj = _.pick(r[0], [
              'board_id', 'board_name',
              'ticket_creation_time', 'ticket_deadline',
              'ticket_deadline_red',
              'ticket_deadline_yellow',
              'ticket_description',
              'ticket_id',
              'ticket_last_change_time',
              'ticket_name',
              'ticket_planned_treatment_week',
              'ticket_closed',
              'ticket_progress',
              'invoice_id', 'invoice_number',
              'contract_name', 'contract_id', 'company_name', 'company_id', 'pos_id', 'pos_name', 'customergroup_id', 'customergroup_name',
            ])
            obj.columns = _.orderBy(r, 'ticket_move_time_in', 'desc').map(i => _.pick(i, ['ticket_id', 'column_id', 'column_name', 'rank_order', 'user_email_assigned', 'user_id', 'user_email', 'user_id_assigned', 'team_name', 'team_id', 'ticket_move_time_in', 'ticket_move_time_out', 'ticket_deadline_offset', 'ticket_deadline_offset_yellow', 'ticket_deadline_offset_red']))
            obj.column_name = obj.columns[0].column_name
            return obj
          })
        })
    },
    loadStages(boardId) {
      this.$api({
        entity: 'frontend_column_list',
        action: 'read-rich',
        order_by: 'rank_order',
        order_dir: 'ASC',
        data: [{ board_id: boardId }],
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
    },
    async moveToColumn(ticket, column) {
      const now = moment()
      const user = getUserData()
      const deadline = now.clone().addWorkingTime(column.default_deadline_period || 0, 'hours').format('YYYY-MM-DD HH:mm:ss')
      const deadline_yellow = now.clone().addWorkingTime(column.default_deadline_yellow || 0, 'hours').format('YYYY-MM-DD HH:mm:ss')
      const deadline_red = now.clone().addWorkingTime(column.default_deadline_red || 0, 'hours').format('YYYY-MM-DD HH:mm:ss')
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
            user_id: user.user_id,
          },
        ],
      })).data.data.data[0][0]
      columnTicket.column_name = this.columns.find(c => c.column_id === columnTicket.column_id).column_name
      if (!ticket.columns) ticket.columns = []
      ticket.columns.unshift(columnTicket)
      if (ticket.columns && ticket.columns[1]) {
        const updatedColumnTicket = (await this.$api({
          action: 'update',
          entity: 'ticket_columnx_rel',
          data: [{
            ..._.pick(ticket.columns[1], ['ticket_id', 'column_id']),
            ticket_move_time_in: moment(ticket.columns[1].ticket_move_time_in).format('YYYY-MM-DD HH:mm:ss'),
            ticket_move_time_out: now.format('YYYY-MM-DD HH:mm:ss'),
          }],
        })).data.data.data[0][0]
        ticket.columns[1].ticket_move_time_out = updatedColumnTicket.ticket_move_time_out
      }
    },
    currentUserInTeam(teamId) {
      const user = getUserData()
      const email = user.user_email
      return this.teams.find(team => team.team_id === teamId && team.user_email === email && moment().isBetween(team.user_team_valid_from, team.user_team_valid_to, 'day')) != null
    },
    userIdsOfTeam(teamId) {
      return this.teams.filter(team => team.team_id === teamId && moment().isBetween(team.user_team_valid_from, team.user_team_valid_to, 'day')).map(t => t.user_id)
    },
  },

}

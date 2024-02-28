import moment from 'moment-business-time'
import { getUserData } from '@/auth/utils'
import _, { uniqBy } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  data() {
    const TICKET_DEADLINE_STATUS = {
      before_deadline: {
        text: this.$t('headline~dashboard~subframe~open_tickets_intime'), color: 'success',
      },
      critical_yellow: {
        text: this.$t('headline~dashboard~subframe~open_tickets_afteryellow'), color: 'warning',
      },
      over_due_red: {
        text: this.$t('headline~dashboard~subframe~open_tickets_afterred'), color: 'danger',
      },
    }
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
      TICKET_DEADLINE_STATUS,
    }
  },
  computed: {
    ...mapGetters('user', ['isUserAdmin']),
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
    async closeTicket(ticket, force = false) {
      try {
        await this.$http.put(`/tickets/${ticket.ticket_id}/close-ticket`, { force_closed: force })
        ticket.ticket_closed = 1
        this.$successToast('The ticket is closed')
      } catch (e) {
        if (e.response && e.response.status === 412) {
          if (!force) {
            const result = await this.$swal({
              title: 'Ticket has sub tickets that are openned?',
              text: 'Do you want to close all sub tickets on this ticket ?',
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
            await this.closeTicket(ticket, true)
            return
          }
        }
        throw e
      }
    },
    async openTicket(ticket) {
      await this.$http.put(`/tickets/${ticket.ticket_id}/open-ticket`, {})
      ticket.ticket_closed = 0
      this.$successToast('The ticket is open')
    },
    async toggleTicket(e, ticket) {
      e.stopPropagation()
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
      try {
        if (ticket.ticket_closed) {
          await this.openTicket(ticket)
        } else {
          await this.closeTicket(ticket, false)
        }
      } catch (error) {
        this.$errorToast(error.message || 'Unknown error')
      }
    },
    loadTickets(filterData) {
      return this.$http.get('/tickets/list', {
        params: { ...filterData, size: 1_000_000 },
      })
        .then(({ data }) => {
          const rawData = data.data
          this.tickets = Object.values(_.groupBy(rawData, 'ticket_id')).map(r => {
            const obj = _.pick(r[0], [
              'board_id', 'board_name',
              'ticket_creation_time', 'ticket_deadline',
              'ticket_deadline_red',
              'ticket_deadline_yellow',
              'ticket_description',
              'ticket_id',
              'read',
              'ticket_last_change_time',
              'ticket_name',
              'column_has_stamp',
              'team_type',
              'ticket_closed', 'ticket_deadline_status', 'priority_deadline_value', 'ticket_deadline', 'ticket_priority_deadline_value',
              'ticket_progress', 'ticket_id_group', 'ticket_name_group',
              'priority_id', 'priority_name', 'priority_color', 'priority_smiley',
              'invoice_id', 'invoice_number',
              'contract_name', 'contract_id', 'company_name', 'company_id', 'pos_id', 'pos_name',
              'customergroup_id', 'customergroup_name', 'ticket_subticket_count', 'ticket_subticket_closed_count',
            ])
            obj.columns = _.orderBy(r, 'ticket_move_time_in', 'desc').map(i => _.pick(i, ['ticket_id', 'column_id', 'board_id', 'column_name', 'rank_order', 'user_email_assigned', 'user_id', 'user_email', 'user_id_assigned', 'team_name','read', 'team_id', 'team_type', 'ticket_move_time_in', 'ticket_move_time_out', 'ticket_deadline_offset', 'ticket_deadline_offset_yellow', 'ticket_deadline_offset_red']))
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
        per_page: 9999,
        data: [{ board_id: boardId }],
      })
        .then(({ data }) => {
          this.columns = data.data.data.sort(c => c.rank_order)
          const ids = this.columns.map(c => c.team_id).filter(c => c != null)
          if (ids.length === 0) return
          const payload = uniqBy(ids.map(id => ({ team_id: id })), 'team_id')
          this.$api({
            entity: 'user_team_grp',
            action: 'read-rich',
            per_page: 9999,
            data: payload,
          }).then(({ data: respData }) => {
            this.teams = respData.data.data
          })
        })
    },
    async moveToColumn(ticket, column) {
      this.isMovingTicket = true
      try {
        const previousColumn = ticket?.columns?.[0]

        if (!previousColumn) {
          throw new Error('Unknown error')
        }

        const payload = {
          previous_column_id: previousColumn.column_id,
          next_column_id: column.column_id,
          board_id: column.board_id,
          ticket_id: ticket.ticket_id,
        }

        const { data: updatedTicket } = await this.$http.post('/tickets/change-ticket-column', payload)

        Object.keys(ticket).forEach(key => {
          if (key in updatedTicket) {
            ticket[key] = updatedTicket[key]
          }
        })

        if (!ticket.columns) ticket.columns = []
        ticket.columns.unshift(column)
      } catch (e) {
        this.$refs.kanbanRef.drake.cancel(true)
        if (this.sourceModel && this.targetModel && this.movingNode) {
          const elCopy = this.movingNode.cloneNode(true)

          this.movingNode.remove()
          this.sourceModel.prepend(elCopy)
        }
        this.$errorToast('Error while moving the ticket')
      } finally {
        this.isMovingTicket = false
      }
    },
    async moveToColumnOld(ticket, column) {
      const now = moment()
      const user = getUserData()
      const deadline = now.clone().addWorkingTime(column.default_deadline_period || 0, 'hours').format('YYYY-MM-DD HH:mm:ss')
      const deadlineYellow = now.clone().addWorkingTime(column.default_deadline_yellow || 0, 'hours').format('YYYY-MM-DD HH:mm:ss')
      const deadlineRed = now.clone().addWorkingTime(column.default_deadline_red || 0, 'hours').format('YYYY-MM-DD HH:mm:ss')
      const columnTicket = (await this.$api({
        action: 'create',
        entity: 'ticket_columnx_rel',
        data: [
          {
            ticket_id: ticket.ticket_id,
            column_id: column.column_id,
            ticket_move_time_in: now.format('YYYY-MM-DD HH:mm:ss'),
            ticket_deadline_offset: deadline,
            ticket_deadline_offset_yellow: deadlineYellow,
            ticket_deadline_offset_red: deadlineRed,
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
      if (this.isUserAdmin) return true
      const user = getUserData()
      const email = user.user_email
      return this.teams.find(team => team.team_id === teamId && team.user_email === email && moment().isBetween(team.user_team_valid_from, team.user_team_valid_to, 'day', '[]')) != null
    },
    userIdsOfTeam(teamId) {
      return this.teams.filter(team => team.team_id === teamId).map(t => t.user_id)
    },
  },

}

<template>
  <b-tr>
    <b-td>
      <b-link @click="$router.push({name: 'table-view', params: {table: 'ticket', id: subticket.ticket_id, entity: subticket}})">
        <p v-b-tooltip class="w-90 text-truncate" :title=" subticket.ticket_name ">
          {{ subticket.ticket_name }}
        </p>
      </b-link>
    </b-td>
    <b-td>
      <p v-b-tooltip class="w-90 text-truncate" :title=" subticket.board_name ">
        {{ subticket.board_name }}
      </p>
    </b-td>
    <b-td>
      <p v-b-tooltip class="w-90 text-truncate" :title=" subticket.column_name ">
        {{ subticket.column_name }}
      </p>
    </b-td>
    <b-td>
      {{ formatDate(subticket.ticket_creation_time) }}
    </b-td>
    <b-td>
      <template v-if="subticket.user_id_assigned !== null">
        <p v-b-tooltip class="w-90 text-truncate" :title="subticket.user_email_assigned">
          {{ subticket.user_email_assigned }}
        </p>

      </template>
      <template v-else>
        <!--        <b-button variant="primary" size="sm" @click="$refs.assign.openModal(subticket,[], users)">-->
        <!--          {{ $t('btn~assign') }}-->
        <!--        </b-button>-->
        <span class="text-italic">Not assigned</span>
      </template>

    </b-td>
    <assign-user-modal ref="assign" @reload="$emit('subticket-assigned')"/>
  </b-tr>
</template>
<script>
import Field from '@/views/app/Generic/Field.vue'
import { pick } from 'lodash'
import AssignUserModal from '@/views/app/Kanban/AssignUserModal.vue'
import { formatDate } from '../../../../libs/utils'

export default {
  name: 'SubticketTr',
  components: { AssignUserModal, Field },
  props: {
    subticket: { type: Object, required: true },
    teamUsers: { type: Array, required: true },
  },
  data() {
    return {
      entity: {},
      statusOptions: [{ label: 'Open', value: 'open' }, { label: 'In progress', value: 'inprogress' }, { label: 'Close', value: 'close' }],
    }
  },
  computed: {
    users() {
      return this.teamUsers.map(user => ({ label: `${user.user_lastname} ${user.user_firstname}`, value: user.user_id, ...user }))
    },
  },
  created() {
    this.entity = pick(this.subticket, ['ticket_name', 'ticket_status', 'ticket_creation_time', 'user_id_assigned', 'ticket_id', 'column_name'])
  },
  methods: { formatDate },
}
</script>

<style scoped>
.w-80{
  width: 80% !important;
}
.w-90{
  width: 90% !important;
}
</style>

<template>
  <b-overlay :show="loading">
    <b-table-simple fixed hover small>
      <b-thead>
        <b-tr>
          <b-th>Name</b-th>
          <b-th>Board</b-th>
          <b-th>
            Status
          </b-th>
          <b-th>Start Date</b-th>
          <b-th>Assigned To</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <subticket-tr
          v-for="(subticket, index) in subtickets"
          :key="index"
          :team-users="teamUsers"
          :subticket="subticket"
        />
      </b-tbody>
      <b-tfoot>
        <b-tr variant="secondary">
          <b-td>
            Summary : {{ subtickets.length }}
          </b-td>
          <b-td/>
          <b-td/>
          <b-td/>
          <b-td/>
        </b-tr>
      </b-tfoot>
    </b-table-simple>
  </b-overlay>
</template>
<script>
import SubticketTr from '@/views/app/Ticket/Subticket/SubticketTr.vue'

export default {
  name: 'SubticketTable',
  components: { SubticketTr },
  props: {
    teamUsers: {
      type: Array,
      required: true,
    },
    subtickets: {
      type: Array,
      required: true,
    },
    loading: Boolean,
  },
}
</script>

<template>
  <b-tr>
    <b-td>
      <b-link>{{ subticket.ticket_name }}</b-link>
    </b-td>
    <b-td>
      <field :entity="entity" :no-label="true"
             :field="{ key: 'ticket_status', type: 'custom-select', items: statusOptions, required: false, clearable: false }" />
    </b-td>
    <b-td>
      <field :entity="entity" :no-label="true"
             :field="{ key: 'ticket_creation_time', type: 'date', required: false, clearable: false }" />
    </b-td>
    <b-td>
      <field :entity="entity" :no-label="true"
             :field="{ key: 'user_id_assigned', type: 'custom-select', items: users, required: false, clearable: false }" />
    </b-td>
  </b-tr>
</template>
<script>
import Field from '@/views/app/Generic/Field.vue'

export default {
  name: 'SubticketTr',
  components: { Field },
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
    this.entity = pick(this.subticket, ['ticket_name', 'ticket_status', 'ticket_creation_time', 'user_id_assigned', 'ticket_id'])
    this.$watch('entity', (newValue, oldValue) => {
      this.$emit('entity-updated', newValue)
    }, { deep: true })
  },
}
</script>

<style scoped></style>

<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('app.content.create_customer_group') }}
    </b-col>
    <b-col cols="12" md="6">
      <field :field="{key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name'}"
             :entity="entity" :disabled="disabled"/>
    </b-col>

    <b-col cols="12" md="6">
      <field :field="{key: 'customergroup_name'}" :entity="entity" :disabled="disabled"/>
    </b-col>
  </b-row>
</template>

<script>
import Field from "@/views/app/Generic/Field";
import {
  BRow, BCol,
} from 'bootstrap-vue'

export default {
  name: 'Step1',
  props: ['context', 'disabled'],
  data() {
    return {
      entity: { customergroup_id: this.context.customergroup_id },
    }
  },
  components: { Field, BRow, BCol },
  methods: {
    async validate() {
      if (!this.entity.customergroup_id && !this.entity.customergroup_name) {
        this.$errorToast('Please selection a customer group or enter a new customer group name')
        return Promise.reject(new Error('Invalid form'))
      }
      let entityId
      if (this.entity.customergroup_id) {
        entityId = this.entity.customergroup_id
      } else {
        const response = await this.$api({
          entity: 'customergroup',
          action: 'create',
          data: [{
            customergroup_name: this.entity.customergroup_name,
            customergroup_description: 'WIP',
          }],
        })
        console.log(response);
        entityId = response.data.data.data[0][0].customergroup_id
      }
      return entityId
    },
  },
}
</script>

<style scoped>

</style>

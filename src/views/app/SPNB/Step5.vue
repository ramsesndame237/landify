<template>
  <b-row v-if="currentStep == 5" class="">
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('app.content.create_pos') }}
    </b-col>
    <b-col cols="12" md="6" class="p-0">
      <entity-form table="pos" :definition="Table.pos" table-definition-key="pos" create :initial-data="{}"
                   cols="12"/>
    </b-col>
    <b-col cols="12" md="6" class="p-0">
      <Databases ref="datatable" :filter="filter" link="user-edit" :current-page="1" :page-options="[3, 5, 10]"
                 :items="items" :fields="fields"/>
      <div class="d-flex justify-content-center">
        <b-button size="md" class="d-flex align-items-center mt-2" variant="info">
          {{ $t('app.btn.save_add_location') }}
        </b-button>
      </div>
      <div class="bg-light mt-2 p-1 text-sm">
        <small>
          {{ $t('app.content.new_busness_text_pos_msg') }}
        </small>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import Field from "@/views/app/Generic/Field";
import {
  BRow, BCol,
} from 'bootstrap-vue'

export default {
  name: 'Step5',
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

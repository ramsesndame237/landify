<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)">
      <b-row>
<!--        <b-col cols="6" md="6">-->
<!--          <field disabled :entity="entity" :field="{key: 'ticket_id'}"/>-->
<!--        </b-col>-->
<!--        <b-col cols="6"></b-col>-->
        <b-col cols="6" md="6">
          <field :disabled="disabled" :entity="entity" :field="getField('contradiction_id')"/>
        </b-col>
        <b-col cols="12" md="6">
          <field :disabled="disabled" :entity="entity" :field="getField('contradiction_name')"/>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import FormMixin from "@/views/app/Generic/FormMixin";

export default {
  name: 'ContradictionForm',
  mixins: [FormMixin],
}
</script>

<style scoped>

</style>

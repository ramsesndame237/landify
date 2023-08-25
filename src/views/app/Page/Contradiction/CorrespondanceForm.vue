<template>
  <b-card>
    <validation-observer>
      <b-row>
        <b-col md="6">
          <field :entity="entity" :field="getField('correspondancetype_id')"/>
          <field :entity="entity" :field="getField('contactperson_id')"/>
          <field :entity="entity" :field="getField('documenttype_id')"/>
        </b-col>
        <b-col md="6" class="text-right">
          Right part
        </b-col>
      </b-row>
      <div>
        <field :entity="entity" :field="getField('coverletter_title')"/>
        <field :entity="entity" :field="getField('coverletter_text')"/>
        <field :entity="entity" :field="getField('files')"/>
      </div>
    </validation-observer>
  </b-card>

</template>

<script>
import Field from '@/views/app/Generic/Field'

export default {
  name: 'CorrespondanceForm',
  components: { Field },
  data() {
    return {
      fields: [
        {
          key: 'correspondancetype_id',
          type: 'list',
          list: 'correspondancetype',
          listLabel: 'correspondancetype_name',
        },
        {
          key: 'contactperson_id',
          type: 'list',
          list: 'contactperson',
          listLabel: 'contactperson_name',
        },
        {
          key: 'documenttype_id', type: 'list', list: 'documenttype', listLabel: 'documenttype_name',
        },
        { key: 'coverletter_title', type: 'text' },
        { key: 'coverletter_text', type: 'html' },
        { key: 'files', type: 'file', multiple: true },
      ],
      entity: {},
    }
  },
  methods: {
    getField(key) {
      return this.fields.find(f => f.key === key)
    },
  },
}
</script>

<style scoped>

</style>

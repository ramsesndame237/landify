<script>
import formMixin from '@/views/app/Generic/FormMixin'

const contractDocumentsFields = [
  {
    key: 'documenttype_id',
    type: 'list',
    list: 'documenttype',
    listLabel: 'documenttype_name',
    placeholder: 'Not specified',
    noCache: true,
    hideOnIndex: true,
    filter: (data, field) => data.parent_documenttype_id == null && field.list?.some(dtype => dtype.parent_documenttype_id === data?.documenttype_id),
  },
  {
    key: 'documenttype_id',
    entityKey: 'subdocumenttype_id',
    type: 'list',
    list: 'documenttype',
    label: 'Sub document type',
    listLabel: 'documenttype_name',
    placeholder: 'Not specified',
    noFetch: true,
    hideOnIndex: true,
    filter: (data, field) => data.parent_documenttype_id === field.entity?.documenttype_id,
  },
  {
    key: 'documentcontracttype_id',
    type: 'list',
    list: 'documentcontracttype',
    listLabel: 'documentcontracttype_name',
    hideOnIndex: true,
    relationEntity: false,
  },
  {
    key: 'files',
    hideOnIndex: true,
    type: 'file',
    rules: { size: 100000 },
    hideOnUpdate: true,
    accepted: '.pdf',
    multiple: false,
  },
  {
    key: 'document_name',
    hideOnCreate: true,
  },
]

export default {
  name: 'LocationForm',
  mixins: [formMixin],
  data: () => ({
    loading: false,
    contractDocumentsFields,
  }),
  mounted() {
    console.log('this is the field of the location', this.formFields)
  },
}
</script>

<template>
  <validation-observer ref="form" v-slot="{ passes }" slim>
    <b-form autocomplete="off" @submit.prevent="passes(handleSubmit)">
      <b-row>
        <b-col v-for="(field,index) in contractDocumentsFields" :key="index" cols="12"
               :md="field.cols || cols"
        >
          <field v-if="create || (!create && !field.hideOnUpdate)" ref="fields" :disabled="disabled || field.disabled || (!create && field.disableOnUpdate)"
                 :create="create"
                 :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"
          />
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>

</template>

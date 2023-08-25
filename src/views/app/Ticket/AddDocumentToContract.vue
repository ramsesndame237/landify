<template>
  <b-modal ref="modal" :ok-title="$t('button~add')" :cancel-title="$t('button~cancel')" modal-class="modal-primary"
           centered :busy="loading" :title="$t('headline~ticket~adddocumenttocontract')" size="md"
           @ok="addDocumentToContract">
    <validation-observer ref="form">
      <field
        :field="{key: 'documenttype_id', type:'list',listLabel: 'documenttype_name', list: 'documenttype'}"
        :entity="entity" :inline="false"/>
      <field
        :field="{key: 'documentcontracttype_id', type:'list',listLabel: 'documentcontracttype_name', list: 'documenttype_documentcontracttype_grp', filter_key: 'documenttype_id'}"
        :entity="entity" :inline="false"/>
    </validation-observer>
  </b-modal>
</template>

<script>
import Field from '@/views/app/Generic/Field'

export default {
  name: 'AddDocumentToContract',
  components: { Field },
  data() {
    return {
      entity: {},
      document: null,
      loading: false,
    }
  },
  methods: {
    openModal(document, contract_id) {
      this.entity = { document_id: document.document_id, contract_id }
      this.document = document
      this.$refs.modal.show()
    },
    async addDocumentToContract(e) {
      e.preventDefault()
      const valid = await this.$refs.form.validate()
      if (!valid) return
      this.loading = true
      try {
        (await this.$api({
          entity: 'document_contract_documentcontracttype_rel',
          action: 'create',
          data: [this.entity],
        }))
        this.document.contract_id = this.entity.contract_id
        this.$emit('reload')
      } finally {
        this.loading = false
      }
      this.$successToast('Document added to contract')
      this.$refs.modal.hide()
    },
  },
}
</script>

<style scoped>

</style>

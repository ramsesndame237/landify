<template>
  <b-modal ref="modal" :ok-title="$t('button~add')" :cancel-title="$t('button~cancel')" modal-class="modal-primary"
           centered :busy="loading" :title="$t('headline~ticket~adddocumenttopos')" size="md"
           @ok="addDocumentToPos">
    <validation-observer ref="form">
      <field
        :field="{key: 'documenttype_id', type:'list',listLabel: 'documenttype_name', list: 'documenttype'}"
        :entity="entity" inline="true"/>
    </validation-observer>
  </b-modal>
</template>

<script>
import Field from "@/views/app/Generic/Field";
import moment from "moment-business-time";

export default {
  name: "AddDocumentToPos",
  components: { Field },
  data() {
    return {
      entity: {},
      document: null,
      loading: false,
    }
  },
  methods: {
    openModal(document, pos_id) {
      this.entity = { document_id: document.document_id, pos_id }
      this.document = document
      this.$refs.modal.show()
    },
    async addDocumentToPos(e) {
      e.preventDefault()
      const valid = await this.$refs.form.validate()
      if (!valid) return
      this.loading = true
      try {
        await this.$api({
          action: 'create',
          entity: 'document_pos_rel',
          data: [{ document_id: this.document.document_id, pos_id: this.entity.pos_id }],
        })
        document.pos_id = this.entity.pos_id
      } finally {
        this.loading = false
      }
      this.$successToast(this.$t('ticket~adddocumenttopos~message~success'))
      this.$refs.modal.hide()
    },
  },
}
</script>

<style scoped>

</style>

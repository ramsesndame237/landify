<template>
  <b-modal ref="mailContent" title="Mail Content" size="lg" :ok-title="view?'Close':'Save'" :ok-only="view" @ok="submit"
           :busy="loading">
    <b-overlay :show="loading">
      <b-row>
        <b-col v-if="view" cols="6">
          <field :field="{key: 'email_id', auto: true}" :entity="item" disabled/>
        </b-col>
        <b-col v-if="view" cols="6">
          <field :field="{key: 'email_received_datetime'}" :entity="item" disabled/>
        </b-col>
        <b-col cols="6">
          <field :field="{key: 'email_from'}" :entity="item" disabled/>
        </b-col>
        <b-col cols="6">
          <field ref="contactperson" :field="{key: 'contactperson_id', type:'list', multiple: true, list: 'frontend_2_3_1', listLabel: 'contactperson_email',
            listLabel: option => `${option.user_email} - ${option.contactperson_firstname} ${option.contactperson_lastname}`}"
                 :entity="item" disabled/>
        </b-col>
        <b-col cols="12">
          <field :field="{key: 'email_subject'}" :entity="item" :disabled="view"/>
        </b-col>
        <b-col cols="12">
          <field :field="{key: 'email_body', type: 'html'}" :entity="item" :disabled="view"/>
        </b-col>
        <b-col cols="12">
          <field v-if="!view" ref="file" :field="{key: 'attachment', type: 'file', multiple: true}" :entity="item"
                 :disabled="view"/>
          <div v-else>
            <b-link v-for="(document, i) in item.documents" :key="i" class="mr-2" variant="danger" target="_blank"
                    :href="getDocumentLink(document)">
              {{ document.document_name }}
            </b-link>
          </div>
        </b-col>
      </b-row>
    </b-overlay>
  </b-modal>
</template>

<script>
import Field from '@/views/app/Generic/Field'
import { getDocumentLink } from "@/libs/utils";

export default {
  name: 'EmailModal',
  components: { Field },
  data() {
    return {
      item: {},
      view: true,
      loading: false,
    }
  },
  methods: {
    getDocumentLink,
    show(view, item) {
      if (view) {
        this.item = item
      } else {
        this.item = { email_from: 'test@seybold-fm.com' }
      }
      this.view = view
      this.$refs.mailContent.show()
    },
    async submit(event) {
      if (this.view) return
      event.preventDefault()
      this.loading = true
      try {
        console.log(this.$refs.file.getFiles(), 'files')
        const attachments = this.$refs.file.getFiles()
        if (attachments.length) {
          const formData = new FormData()
          for (let i = 0; i < attachments.length; i++) {
            formData.append('files', attachments[i])
          }
          const { data } = await this.$http.post('document/uploadfiles', formData, { headers: { 'content-type': 'form-data' } })
          console.log(data)
          this.item.attachments = data.data.map(d => d.document_id)
        }

        await this.$http.post('/emails/send', {
          email_to: this.$refs.contactperson.selectedValues.map(v => v.user_email).filter(v => !!v),
          email_subject: this.item.email_subject,
          email_body: this.item.email_body,
          email_attachements: this.item.attachments || [],
          ticket_id: this.$route.params.id,
        })
        this.$refs.mailContent.hide()
        this.$emit('reload')
      } catch (e) {
        console.error(e)
        this.$errorToast(e.response.data.detail)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>

</style>

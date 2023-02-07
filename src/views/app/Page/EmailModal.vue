<template>
  <b-modal ref="mailContent" title="Mail Content" size="lg" :ok-title="view?'Close':'Save'" :ok-only="view" @ok="submit"
           :busy="loading">
    <b-row>
      <b-col v-if="view" cols="6">
        <field :field="{key: 'email_id', auto: true}" :entity="item" disabled/>
      </b-col>
      <b-col v-if="view" cols="6">
        <field :field="{key: 'email_date_received'}" :entity="item" disabled/>
      </b-col>
      <b-col cols="6">
        <field :field="{key: 'email_from'}" :entity="item" disabled/>
      </b-col>
      <b-col cols="6">
        <field :field="{key: 'email_to'}" :entity="item" :disabled="view"/>
      </b-col>
      <b-col cols="12">
        <field :field="{key: 'email_subject'}" :entity="item" :disabled="view"/>
      </b-col>
      <b-col cols="12">
        <field :field="{key: 'email_body', type: 'html'}" :entity="item" disabled/>
      </b-col>
      <b-col cols="12">
        <field ref="file" :field="{key: 'attachment', type: 'file', multiple: true}" :entity="item" disabled/>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import Field from '@/views/app/Generic/Field'

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
        }
        await this.$http.post('/emails/send', {
          email_to: this.item.email_to,
          email_subject: this.item.email_subject,
          email_body: this.item.email_body,
          email_attachements: this.item.attachments,
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>

</style>

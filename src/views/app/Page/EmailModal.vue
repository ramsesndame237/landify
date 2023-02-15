<template>
  <b-modal ref="mailContent" title="Mail Content" size="lg" :ok-title="view?$t('button~close'):$t('button~email~send')"
           :ok-only="view" @ok="submit" :busy="loading">
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
          <field v-if="view" :field="{key: 'email_to'}" :entity="item" disabled/>
          <b-form-group v-else label="Email To">
            <vue-tags-input v-model="tag" :tags="tags" :validation="validation" :autocomplete-items="filteredItems"
                            @tags-changed="newTags => tags = newTags"/>
          </b-form-group>
          <!--          <field v-else ref="contactperson" :field="{key: 'contactperson_id', type:'list', multiple: true, list: 'frontend_2_3_1', listLabel: 'contactperson_email',-->
          <!--            listLabel: option => `${option.user_email} - ${option.contactperson_firstname} ${option.contactperson_lastname}`}"-->
          <!--                 :entity="item" disabled/>-->
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
import VueTagsInput from '@johmun/vue-tags-input';
import {
  email,
} from 'vee-validate/dist/rules'

export default {
  name: 'EmailModal',
  components: { Field, VueTagsInput },
  data() {
    return {
      item: {},
      view: true,
      loading: false,
      tag: '',
      tags: [],
      contactpersons: [],
      validation: [{
        classes: 'invalid',
        rule: tag => !email.validate(tag.text),
        disableAdd: true,
      }],
    }
  },
  computed: {
    filteredItems() {
      return this.contactpersons.filter(i => {
        return i.user_email && i.user_email.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1
      }).map(i => i.user_email)
    },
  },
  async mounted() {
    this.contactpersons = await this.$store.dispatch('table/fetchList', { entity: 'frontend_2_3_1' })
  },
  methods: {
    getDocumentLink,
    show(view, item) {
      if (view) {
        this.item = item
      } else {
        this.item = { email_from: 'zelos@seybold-fm.com' }
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
          email_to: this.tags.map(t => t.text),
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

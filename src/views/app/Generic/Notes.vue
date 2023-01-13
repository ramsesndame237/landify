<template>
  <div>
    <b-button v-b-modal.note-list variant="primary">
      Notes
    </b-button>
    <!-- modal -->
    <b-modal id="note-list" size="lg" title="Notes">
      <b-overlay :show="loadingNotes">
        <div v-for="(note,i) in notes" :key="i">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center gap-1">
              <h4>{{ note.user_email }}</h4>
              <b-button v-if="note.user_id === user_id" class="btn-icon" variant="flat-info" pill
                        @click="onUpdateClick(note)">
                <feather-icon icon="EditIcon"/>
              </b-button>
              <b-button v-if="note.user_id === user_id" class="btn-icon" variant="flat-primary" pill
                        @click="deleteNote(note)">
                <feather-icon icon="Trash2Icon"/>
              </b-button>
            </div>
            <div>
              <span class="mr-2">{{ note.note_visibility ? 'For all' : 'Only Internal' }}</span>
              <span>{{ note.note_timestamp }}</span>
            </div>
          </div>
          <p class="p-1 bg-secondary bg-lighten-2 text-white">
            {{ note.note_longtext }} </p>
        </div>
        <p v-if="notes.length===0" class="text-center">
          No note available </p>
      </b-overlay>
      <template v-slot:modal-footer>
        <!--        <b-button variant="secondary" @click="$refs.modal.hide()">-->
        <!--          Cancel-->
        <!--        </b-button>-->
        <b-button variant="primary" @click="onNewClick">
          New Note
        </b-button>
      </template>
    </b-modal>

    <!-- modal -->
    <b-modal id="new-note" ref="noteModal" title="Create a new note" cancel-title="Cancel"
             :ok-title="create?'Create':'Update'" @ok="createNote">
      <b-overlay :show="loading">
        <entity-form ref="form" cols="12" :definition="definition" table="note" table-definiton-key="note"
                     :initial-data="initialData" :create="create"/>
      </b-overlay>
    </b-modal>

  </div>
</template>

<script>
import EntityForm from '@/views/app/Generic/EntityForm.vue'
import { getUserData } from '@/auth/utils'

export default {
  name: 'Notes',
  components: { EntityForm },
  props: ['id', 'primaryKey', 'note', 'noteRel'],
  data() {
    const userData = getUserData()
    return {
      notes: [],
      definition: {
        primaryKey: 'note_id',
        fields: [
          { key: 'note_timestamp', auto: true },
          { key: 'note_longtext', type: 'textarea' },
          {
            key: 'note_visibility',
            type: 'custom-select',
            items: [{ value: 0, label: 'Only Internal' }, { value: 1, label: 'Every one' }],
          },
          // { key: 'document_id', type: 'list', list: 'document',onlyForm: true, alwaysNew: true, relationEntity: 'note_document_rel' }
        ],
        default: { note_del: 0 },
      },
      user_id: userData.user.user_id,
      is_internal: !userData.user.usertype_external,
      loadingNotes: false,
      loading: false,
      create: false,
      title: '',
      initialData: null,
    }
  },
  mounted() {
    this.loadNotes()
  },
  methods: {
    onNewClick() {
      this.create = true
      this.title = 'Create a new note'
      this.initialData = null
      this.$refs.noteModal.show()
    },
    onUpdateClick(note) {
      this.create = false
      this.title = 'Update a note'
      this.initialData = note
      this.$refs.noteModal.show()
    },
    async createNote(evt) {
      evt.preventDefault()
      let note
      if (this.loading) return
      this.loading = true
      try {
        note = await this.$refs.form.submit()
      } catch (e) {
        this.loading = false
        return
      }
      try {
        await this.$api({
          action: 'create',
          entity: this.noteRel,
          data: [
            { [this.primaryKey]: this.id, user_id: this.user_id, note_id: note.note_id },
          ],
        })
        this.$refs.noteModal.hide()
      } finally {
        this.loading = false
      }
      await this.loadNotes()
    },
    async deleteNote(note) {
      this.loading = true
      try {
        await this.$api({
          entity: 'note',
          action: 'update',
          data: [
            { ...note, note_del: 1 },
          ],
        })
      } finally {
        this.loading = false
      }
      await this.loadNotes()
    },
    async loadNotes() {
      this.loadingNotes = true
      try {
        this.notes = (await this.$api({
          entity: this.note,
          action: 'read-rich',
          data: [
            { [this.primaryKey]: this.id, note_del: 0, ...(this.is_internal ? {} : { note_visibility: 1 }) },
          ],
        })).data.data.data
      } finally {
        this.loadingNotes = false
      }
    },
  },
}
</script>

<style scoped>

</style>

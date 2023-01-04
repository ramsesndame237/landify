<template>
  <div>
    <b-button variant="primary" v-b-modal.note-list>Notes</b-button>
    <!-- modal -->
    <b-modal id="note-list" size="lg" title="Notes">
      <b-overlay :show="loadingNotes">
        <div v-for="(note,i) in notes" :key="i">
          <div class="d-flex justify-content-between">
            <h4>John Doe</h4>
            <div>
              <span class="mr-2">For all</span>
              <span>{{ note.note_timestamp }}</span>
            </div>
          </div>
          <p class="p-1 bg-gray">{{ note.note_longtext }}</p>
        </div>
        <p class="text-center" v-if="notes.length===0">No note available</p>
      </b-overlay>
      <template v-slot:modal-footer>
        <!--        <b-button variant="secondary" @click="$refs.modal.hide()">-->
        <!--          Cancel-->
        <!--        </b-button>-->
        <b-button variant="primary" v-b-modal.new-note>
          New Note
        </b-button>
      </template>
    </b-modal>

    <!-- modal -->
    <b-modal ref="newModal" id="new-note" title="Create a new note" cancel-title="Cancel" ok-title="Create"
             @ok="createNote">
      <b-overlay :show="loading">
        <entity-form ref="form" cols="12" :definition="definition" table="note" table-definiton-key="note"
                     :create="true"/>
      </b-overlay>
    </b-modal>

  </div>
</template>

<script>
import EntityForm from "@/views/app/Generic/EntityForm.vue";
import { getUserData } from "@/auth/utils";

export default {
  name: 'Notes',
  components: { EntityForm },
  props: ['id', 'primaryKey'],
  data() {
    return {
      notes: [],
      definition: {
        primaryKey: 'note_id',
        fields: [
          { key: 'note_timestamp', auto: true },
          { key: 'note_longtext', type: 'textarea' },
        ],
        default: { note_del: 0 },
      },
      user_id: getUserData().user.user_id,
      loadingNotes: false,
      loading: false,
    }
  },
  mounted() {
    this.loadNotes()
  },
  methods: {
    async createNote(evt) {
      evt.preventDefault()
      let note
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
          entity: 'note_user_contract_rel',
          data: [
            { [this.primaryKey]: this.id, user_id: this.user_id, note_id: note.note_id }
          ],
        })
        this.$refs.newModal.hide()
      } finally {
        this.loading = false
      }
      await this.loadNotes()
    },
    async deleteNote(note) {
      await this.$api({
        entity: 'note',
        action: 'update',
        data: [
          { ...note, note_del: 1 },
        ],
      })
    },
    async loadNotes() {
      this.loadingNotes = true
      try {
        const rels = (await this.$api({
          entity: 'note_user_contract_rel',
          action: 'read-rich',
          data: [
            { [this.primaryKey]: this.id },
          ],
        })).data.data.data
        if (!rels.length) return
        this.notes = (await this.$api({
          entity: 'note',
          action: 'read-rich',
          data: rels.map(r => ({ note_id: r.note_id })),
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

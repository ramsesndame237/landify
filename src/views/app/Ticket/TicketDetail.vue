<template>
  <b-overlay :show="loading">
    <div v-if="entity && entity.columns">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <div>
          <h4 class="mb-0 font-weight-bolder">{{ entity.ticket_id }}</h4>
          <p class="mb-0">{{ entity.ticket_name }}</p>
        </div>
        <div class="d-flex align-items-center">
          <notes v-if="definition.note" class="mr-2" :primary-key="primaryKey" :id="entityId" :note="definition.note"
                 :note-rel="'note_user_'+table+'_rel'"/>
          <b-button variant="primary" @click="createInvoice">{{ $t('button~newinvoice') }}</b-button>
          <b-button v-if="!entity.ticket_closed" variant="primary" class="ml-2"
                    @click="$refs.assign.openModal(entity, userIdsOfTeam(entity.columns[0].team_id))">
            {{ $t('button~assignto') }}
          </b-button>
          <b-button v-if="canMoveBack()" class="ml-2" variant="primary" @click="moveBack">
            {{ $t('button~moveback') }}
          </b-button>
          <b-button v-if="canMoveToNext()" class="ml-2" variant="primary" @click="moveToNext">
            {{ $t('button~movetonextcolumn') }}
          </b-button>
          <b-button v-if="!entity.ticket_closed" variant="primary" class="ml-2" @click="updateTicket">
            {{ $t('button~edit') }}
          </b-button>
          <b-button variant="primary" class="ml-2" @click="toggleTicket(entity)">
            {{ $t('button~ticket~' + (entity.ticket_closed ? 'reopen' : 'close')) }}
          </b-button>
          <assign-user-modal ref="assign" @reload="loadSingleTicket"/>
        </div>
      </div>
      <b-row>
        <b-col lg="8">
          <b-card-actions :title="$t('headline~ticket~information')" action-collapse>
            <table class="mt-2 mt-xl-0 w-100">
              <tr>
                <th class="pb-50 font-weight-bold">{{ $t('attribute.board_name') }}</th>
                <td class="pb-50">
                  <router-link v-if="entity.board_id"
                               :to="{name:'table-kanban',params: {table:'board',id: entity.board_id}}">
                    {{ entity.board_name }}
                  </router-link>
                </td>
              </tr>
                  <tr>
                    <th class="pb-50 font-weight-bold">{{ $t('attribute.ticket_id') }}</th>
                    <td class="pb-50">{{ entity.ticket_id }}</td>
                  </tr>
                  <tr>
                    <th class="pb-50 font-weight-bold">{{ $t('attribute.customergroup_name') }}</th>
                    <td class="pb-50">
                      <router-link v-if="entity.customergroup_id"
                                   :to="{name:'table-view',params: {table: 'customergroup', id: entity.customergroup_id}}">
                        {{ entity.customergroup_name }}
                      </router-link>
                    </td>
                  </tr>
                    <tr>
                      <th class="pb-50 font-weight-bold">{{ $t('attribute.company_name') }}</th>
                      <td class="pb-50">
                        <router-link v-if="entity.company_id"
                                     :to="{name:'table-view',params: {table: 'company', id: entity.company_id}}">
                          {{ entity.company_name }}
                        </router-link>
                      </td>
                    </tr>
                    <tr>
                      <th class="pb-50 font-weight-bold">{{ $t('attribute.pos_name') }}</th>
                      <td class="pb-50">
                        <router-link v-if="entity.pos_id"
                                     :to="{name:'table-view',params: {table: 'pos', id: entity.pos_id}}">
                          {{ entity.pos_name }}
                        </router-link>
                      </td>
                    </tr>
                    <tr>
                      <th class="pb-50 font-weight-bold">{{ $t('attribute.contract_name') }}</th>
                      <td class="pb-50">
                        <router-link v-if="entity.contract_id"
                                     :to="{name:'table-view',params: {table: 'contract', id: entity.contract_id}}">
                          {{ entity.contract_name }}
                        </router-link>
                      </td>
                    </tr>
                    <tr>
                      <th class="pb-50 font-weight-bold">{{ $t('attribute.invoice_number') }}</th>
                      <td class="pb-50">
                        <router-link v-if="entity.invoice_id"
                                     :to="{name:'table-view',params: {table: 'invoice', id: entity.invoice_id}}">
                          {{ entity.invoice_number }}
                        </router-link>
                      </td>
                    </tr>
                    <tr>
                      <th class="pb-50 font-weight-bold">{{ $t('attribute.ticket_name') }}</th>
                      <td class="pb-50">{{ entity.ticket_name }}</td>
                    </tr>
                    <tr>
                      <th class="pb-50 font-weight-bold">{{ $t('attribute.ticket_description') }}</th>
                      <td class="pb-50">{{ entity.ticket_description }}</td>
                    </tr>
                    <tr>
                      <th class="pb-50 font-weight-bold">{{ $t('attribute.priority_name') }}</th>
                      <td class="pb-50">{{ entity.priority_name }}</td>
                    </tr>
                    <tr>
                      <th class="pb-50 font-weight-bold">{{ $t('attribute.column_name') }}</th>
                      <td class="pb-50">{{ entity.columns[0].column_name }}</td>
                    </tr>
                    <tr>
                      <th class="pb-50 font-weight-bold">{{ $t('attribute.user_email') }}</th>
                      <td class="pb-50">{{ entity.columns[0].user_email }}</td>
                    </tr>
                    <tr>
                      <th class="pb-50 font-weight-bold">{{ $t('attribute.ticket_deadline_yellow') }}</th>
                      <td class="pb-50">{{ entity.ticket_deadline_yellow }}</td>
                    </tr>
                    <tr>
                      <th class="pb-50 font-weight-bold">{{ $t('attribute.ticket_deadline_red') }}</th>
                      <td class="pb-50">{{ entity.ticket_deadline_red }}</td>
                    </tr>
            </table>
          </b-card-actions>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h2>{{ $t('headline~ticket~subtasks') }}</h2>
            <b-button variant="primary" v-if="!entity.ticket_closed" @click="createSubTicket">
              {{ $t('button~newsubtask') }}
            </b-button>
          </div>
          <generic-modal ref="modal" table="ticket" :definition="subTicketDef" table-definition-key="ticket"
                         :title="$t('headline~ticket~newsubtask')" @reload-table="onNewTicket"/>
          <sub-ticket-card v-for="(ticket,idx) in subTickets" :key="idx" :ticket="ticket"/>
          <p v-if="subTickets.length===0" class="text-center">{{ $t('headline~ticket~nosubticket') }}</p>
          <b-card-actions v-if="entity.columns" class="mt-3" :title="$t('headline~ticket~timeline')" action-collapse
                          collapsed>
            <app-timeline>
              <app-timeline-item v-for="(column,idx) in entity.columns" :key="idx" :title="column.column_name"
                                 :time="(column.user_email?(column.user_email+' - '):'')+column.ticket_move_time_in"
                                 :variant="getColumnColor(column,idx)"/>
            </app-timeline>
          </b-card-actions>
          <b-card-actions no-body="dd" :title="$t('headline~ticket~emails')" class="mt-2" action-collapse>
            <b-overlay :show="loadingEmail">
              <b-table-simple class="mail-table">
                <b-thead>
                  <b-tr>
                    <b-th></b-th>
                    <b-th>{{ $t('attribute.email_received_datetime') }}</b-th>
                    <b-th>{{ $t('attribute.email_from') }}</b-th>
                    <b-th>{{ $t('attribute.email_subject') }}</b-th>
                    <b-th>{{ $t('attribute.documents') }}</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(email,i) in emails" :key="i">
                    <b-td>
                      <b-button class=" btn-icon" variant="flat-success" pill
                                @click="$refs.emailModal.show(true,email)">
                        <feather-icon icon="EyeIcon"/>
                      </b-button>
                    </b-td>
                    <b-td>{{ email.email_received_datetime }}</b-td>
                    <b-td>{{ email.email_from }}</b-td>
                    <b-td>{{ email.email_subject }}</b-td>
                    <b-td>
                      <b-form-checkbox v-if="email.documents.length" :checked="1" disabled
                                       :value="email.documents.length>0?1:0" :unchecked-value="0"/>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-overlay>
            <div class="text-right p-1">
              <b-button v-if="!entity.ticket_closed" variant="primary" @click="$refs.emailModal.show(false)">New Email
              </b-button>
            </div>
          </b-card-actions>
          <email-modal ref="emailModal" @reload="fetchEmail"/>
        </b-col>
        <b-col lg="4">
          <h4 class="font-weight-bolder">{{ $t('headline~ticket~documents') }}</h4>
          <b-row>
            <b-col v-for="(document,i) in documents" :key="i" cols="6">
              <b-overlay :show="document.loading">
                <b-card>
                  <div class="d-flex document-header justify-content-between">
                    <h5>{{
                        document.document_name + (document.document_already_stamp ? '(Stamped)' : '') + ' - ' + (document.document_type_name || '')
                      }}</h5>
                    <!--                    <b-link variant="danger" target="_blank" :href="getLink(document)">-->
                    <!--                      <feather-icon icon="EyeIcon"/>-->
                    <!--                    </b-link>-->
                    <b-dropdown variant="link-" toggle-class="p-0" right no-caret class="ml-auto document-header-dropdown">
                      <template v-slot:button-content>
                        <feather-icon icon="MoreHorizontalIcon"/>
                      </template>
                      <b-dropdown-item target="_blank" :href="getLink(document)">
                        {{ $t('button~view') }}
                      </b-dropdown-item>
                      <b-dropdown-item @click="$refs.documentModal.openModal(false, document)">
                        {{ $t('button~edit') }}
                      </b-dropdown-item>
                      <b-dropdown-item v-if="!document.pos_id && !document.contract_id" @click="addToPos(document)">
                        {{ $t('button~document~addtopos') }}
                      </b-dropdown-item>
                      <b-dropdown-item v-if="!document.pos_id && !document.contract_id"
                                       @click="addToContract(document)">
                        {{ $t('button~document~addtocontract') }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                  <h5 class="font-weight-bolder" style="color: black">
                    {{
                      document.document_mime_type + (document.pos_id ? ' (POS)' : (document.contract_id ? ' (Contract)' : ''))
                    }} </h5>
                  <div class="d-flex justify-content-between">
                    <h6>{{ document.document_entry_time }}</h6>
                    <b-link v-if="canStamp(document)"
                            :to="{name:'sign-document', params: {id: document.document_id,ticket_id: entity.ticket_id, entity: document}}"
                            class="ml-2">Stamp
                    </b-link>
                  </div>
                </b-card>
              </b-overlay>
            </b-col>
          </b-row>
          <div>
            <b-button variant="primary" @click="createDocument">{{ $t('button~newdocument') }}</b-button>
          </div>

          <generic-modal ref="documentModal" table="document" :definition="documentDef" table-definition-key="document"
                         :title="$t('headline~document~new')" @reload-table="onNewDocuments"/>
          <generic-modal ref="ticketModal" :fetch-data="false" table="ticket" :definition="ticketDef"
                         table-definition-key="ticket" title="Update the ticket" @reload-table="onTicketUpdate"/>
          <generic-modal ref="documentModal" :fetch-data="false" table="document" :definition="documentDef"
                         table-definition-key="document" title="Update the document" @reload-table="onDocumentUpdate"/>
          <add-document-to-contract ref="documentContractModal"/>
          <add-document-to-pos ref="documentPosModal"/>
        </b-col>
      </b-row>
    </div>
  </b-overlay>
</template>

<script>
import {
  BButton,
  BCol,
  BRow,
  BCard,
  BLink,
} from 'bootstrap-vue'
import EditPageMixin from "@/views/app/Generic/EditPageMixin";
import Table from '@/table'
import GenericModal from "@/views/app/Generic/modal.vue";
import SubTicketCard from "@/views/app/CustomComponents/WP6/SubTicketCard.vue";
import AppTimeline from "@core/components/app-timeline/AppTimeline.vue";
import AppTimelineItem from "@core/components/app-timeline/AppTimelineItem.vue";
import BCardActions from "@core/components/b-card-actions/BCardActions.vue";
import TicketMixin from "@/views/app/Kanban/TicketMixin";
import { getDocumentLink, getStampedDocumentLink } from "@/libs/utils";
import moment from 'moment'
import AssignUserModal from "@/views/app/Kanban/AssignUserModal.vue";
import Notes from "@/views/app/Generic/Notes.vue";
import _ from 'lodash'
import EmailModal from "@/views/app/Ticket/EmailModal.vue";
import AddDocumentToContract from "@/views/app/Ticket/AddDocumentToContract.vue";
import AddDocumentToPos from "@/views/app/Ticket/AddDocumentToPos.vue";

export default {
  name: 'TicketDetail',
  components: {
    AddDocumentToContract,
    AddDocumentToPos,
    EmailModal,
    Notes,
    AssignUserModal,
    BCardActions,
    AppTimelineItem,
    AppTimeline,
    SubTicketCard,
    GenericModal,
    BButton,
    BCol,
    BRow,
    BCard,
    BLink,
  },
  mixins: [EditPageMixin, TicketMixin],
  data() {
    const subTicketDef = JSON.parse(JSON.stringify(Table.ticket))
    let index = subTicketDef.fields.findIndex(f => f.key === 'column_id')
    subTicketDef.fields.splice(index, 1)
    index = subTicketDef.fields.findIndex(f => f.key === 'pos_id')
    subTicketDef.fields.splice(index, 1)
    index = subTicketDef.fields.findIndex(f => f.key === 'contract_id')
    subTicketDef.fields.splice(index, 1)
    // ticketDef.fields.push({
    //   key: 'ticket_id_group',
    //   type: 'list',
    //   list: 'ticket',
    //   listLabel: 'ticket_name',
    //   relationEntity: 'ticket_ticket_rel',
    //   tableKey: 'ticket_id',
    //   // visible: () => false,
    // })
    return {
      subTicketDef,
      ticketDef: Table.ticket,
      documentDef: Table.document,
      subTickets: [],
      documents: [],
      loading: false,
      emails: [],
      loadingEmail: false,
      contractDocument: {},
    }
  },
  computed: {
    invoiceTicket() {
      return true
    }
  },
  async mounted() {
    this.loading = true
    try {
      if (!this.entity || !this.entity.columns) {
        await this.loadSingleTicket(false)
        this.entity = this.tickets[0]
        await this.loadStages(this.entity.board_id)
      } else {
        this.columns = this.$route.params.columns
        this.teams = this.$route.params.teams
      }
      await this.fetchSubTickets()
      await this.fetchDocuments()
      await this.fetchEmail()
    } finally {
      this.loading = false
    }
  },
  methods: {
    async addToPos(document) {
      if (document.loading) return
      this.$refs.documentPosModal.openModal(document, this.entity.pos_id)
    },
    addToContract(document) {
      this.contractDocument.document_id = document.document_id
      this.$refs.documentContractModal.openModal(document, this.entity.contract_id)
    },
    canStamp(document) {
      if (!this.entity || !this.entity.columns) return false
      if (document.document_mime_type !== 'application/pdf') return false
      return this.columns.find(c => c.column_id === this.entity.columns[0].column_id).column_has_stamp
    },
    canMoveBack() {
      if (!this.entity) return false
      if (this.entity.ticket_closed) return false
      if (!this.entity.columns[1]) return false
      if (this.entity.columns[1].rank_order > this.entity.columns[0].rank_order) return false
      const column_name = this.entity.columns[1].column_name
      return this.config.accepts(null, { dataset: { status: column_name } }, { dataset: { status: this.entity.column_name } }, true)
    },
    canMoveToNext() {
      if (!this.entity) return false
      if (this.entity.ticket_closed) return false
      const colIdx = this.columns.findIndex(c => c.column_name === this.entity.column_name)
      if (colIdx === this.columns.length - 1) return false
      return this.config.accepts(null, { dataset: { status: this.columns[colIdx + 1].column_name } }, { dataset: { status: this.entity.column_name } })
    },
    async moveToNext() {
      const result = await this.moveToNextColumn(this.entity)
      if (result) await this.loadSingleTicket()
    },
    async moveBack() {
      const result = await this.moveToPreviousColumn(this.entity)
      if (result) await this.loadSingleTicket()
    },
    getColumnColor(column, idx) {
      const date = idx === 0 ? moment() : moment(column.ticket_move_time_out)
      if (date.isAfter(column.ticket_deadline_offset_red)) return 'danger'
      if (date.isAfter(column.ticket_deadline_offset_yellow)) return 'warning'
      return 'success'
    },
    getDocumentLink,
    getLink(document) {
      if (document.document_already_stamp) return getStampedDocumentLink(document)
      return getDocumentLink(document)
    },
    createSubTicket() {
      this.$refs.modal.openModal(true, {
        ticket_id_group: parseInt(this.entityId),

      })
    },
    createDocument() {
      this.$refs.documentModal.openModal(true, { ticket_id: this.entity.ticket_id })
    },
    createInvoice() {
      this.$router.push({
        name: 'table-form',
        params: { table: 'invoice', entity: { ticket_id: this.entity.ticket_id } },
      })
    },
    updateTicket() {
      this.$refs.ticketModal.openModal(false, this.entity)
    },
    async onNewTicket(ticket) {
      // Save subticket relation
      await this.$api({
        entity: 'ticket_ticket_rel',
        action: 'create',
        data: [{ ticket_id: ticket.ticket_id, ticket_id_group: parseInt(this.entityId), ticket_type: 'test' }],
      })
      await this.fetchSubTickets()
    },
    async onNewDocuments(documents) {
      // Save document relation
      await this.$api({
        entity: 'document_ticket_rel',
        action: 'create',
        data: documents.map(document => ({ document_id: document.document_id, ticket_id: parseInt(this.entityId) })),
      })
      await this.fetchDocuments()
    },
    async onTicketUpdate() {
      await this.loadSingleTicket()
    },
    onDocumentUpdate(data) {
      console.log(data)
      this.$api({
        action: 'create',
        entity: 'document_ticket_rel',
        data: data.map(doc => ({
          document_id: doc.document_id,
          ticket_id: this.entity.ticket_id,
        })),
      })
        .finally(() => {
          this.fetchDocuments()
        })
    },
    async fetchSubTickets() {
      // load subtickets
      this.subTickets = (await this.$api({
        entity: 'frontend_6_1_6_listall',
        action: 'read-rich',
        per_page: 1000000,
        data: [{ ticket_id_group: this.entity.ticket_id }],
      })).data.data.data
    },
    async fetchDocuments() {
      const documents = (await this.$api({
        entity: 'frontend_document_list',
        action: 'read-rich',
        per_page: 100000,
        data: [{ ticket_id: this.entity.ticket_id }],
      })).data.data.data
      documents.forEach(document => {
        document.loading = false
      })
      this.documents = documents
    },
    async fetchEmail() {
      this.loadingEmail = true
      try {
        const results = (await this.$api({
          entity: 'email_ticket_grp',
          action: 'read-rich',
          per_page: 100000,
          data: [{ ticket_id: this.entity.ticket_id }],
        })).data.data.data
        if (!results.length) return
        const documents = (await this.$api({
          entity: 'email_document_grp',
          action: 'read-rich',
          perPage: 100000,
          data: results.map(r => ({ email_id: r.email_id })),
        })).data.data.data
        this.emails = Object.values(_.groupBy(results, 'email_id')).map(r => {
          const obj = _.pick(r[0], ['email_id', 'email_from', 'email_received_datetime', 'email_to', 'email_cc', 'email_subject', 'email_body'])
          obj.documents = documents.filter(d => d.email_id === r[0].email_id)
          return obj
        })
      } finally {
        this.loadingEmail = false
      }
    },
    async loadSingleTicket(loader = true) {
      if (loader) this.loading = true
      try {
        await this.loadTickets({ ticket_id: this.$route.params.id })
        this.entity = this.tickets[0]
      } finally {
        if (loader) this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.mail-table {
  word-break: break-word;
}

.document-header-dropdown{
  align-self: flex-start;
}
</style>

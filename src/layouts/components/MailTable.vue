<template>
  <b-overlay :show="loading">
    <b-table-simple ref="table" class="mail-table" sticky-header striped hover responsive style="min-height: 50vh">
      <b-thead>
        <b-tr>
          <b-th/>
          <b-th>Email Id</b-th>
          <b-th>Received date</b-th>
          <b-th>From</b-th>
          <!--          <b-th>To</b-th>-->
          <b-th>Subject</b-th>
          <b-th class="text-center">
            Pos Id
          </b-th>
          <b-th class="text-center">
            Ticket Id
          </b-th>
          <b-th class="text-center">
            Create new subticket ?
          </b-th>
          <b-th class="text-center">
            Contract Id
          </b-th>
          <!-- <b-th>Attachments</b-th> -->
          <b-th>File Name</b-th>
          <b-th class="text-center">
            DocumentType
          </b-th>
          <b-th class="text-center">
            Board
          </b-th>
          <b-th class="text-center">
            Status
          </b-th>
          <b-th class="text-center">
            Action
          </b-th>
        </b-tr>
      </b-thead>
      <!--    <template #cell(__selected)="data">-->
      <!--      <b-form-checkbox v-if="currentItems[data.index]" v-model="currentItems[data.index].__selected"-->
      <!--                       :disabled="disabled" @change="onSelect(data.index)"/>-->
      <!--    </template>-->
      <template v-for="(item,idx) in items">
        <b-tbody :key="idx">
          <mail-tr :key="`email-${item.email_id}`" :table-el="$refs.table.$el" :item="item" @show-content="showMailContent(item)" @classify="({$vm, shouldCreateSubTicket}) => classifyNew(item, $vm, 'classify', { shouldCreateSubTicket })"
                   @reject="classifyNew(item, $vm, 'dismiss')" />
        </b-tbody>
        <transition :key="'c'+idx" name="slide">
          <b-tbody v-if="item.documents.length>0" v-show="item.open" :id="'collapse'+item.email_id">
            <mail-tr v-for="(child,idx) in item.documents" :key="`${child.document_id}-idx`" :table-el="$refs.table.$el" :item="child" child
                     style="background-color: white !important;" @classify="({$vm, shouldCreateSubTicket}, options) => classifyNew(child, $vm, 'classify', {parentEmail: item, shouldCreateSubTicket })"
                     @reject="classifyNew(child, $vm, 'dismiss', {parentEmail: item})"
            />
          </b-tbody>
        </transition>
      </template>
      <b-tbody v-if="items.length===0">
        <b-tr>
          <b-td colspan="14" class="text-center">
            No Data available
          </b-td>
        </b-tr>
      </b-tbody>
      <!--    <template v-if="withActions" #cell(Actions)="data">-->
      <!--      <div class="text-nowrap">-->
      <!--        <b-button v-if="withView" class=" btn-icon" style="margin-bottom: 3px" variant="flat-success" pill-->
      <!--                  @click="onViewClick(data)">-->
      <!--          <feather-icon icon="EyeIcon"/>-->
      <!--          &lt;!&ndash;        <span>{{ $t('button~view') }}</span>&ndash;&gt;-->
      <!--        </b-button>-->
      <!--      </div>-->
      <!--    </template>-->
    </b-table-simple>
    <b-modal ref="mailContent" title="Mail Content" size="lg" ok-title="Close" ok-only>
      <b-row v-if="item">
        <b-col cols="6">
          <field :field="{key: 'email_id'}" :entity="item" disabled/>
        </b-col>
        <b-col cols="6">
          <field :field="{key: 'email_received_datetime'}" :entity="item" disabled/>
        </b-col>
        <b-col cols="6">
          <field :field="{key: 'email_from'}" :entity="item" disabled/>
        </b-col>
        <b-col cols="6">
          <field :field="{key: 'email_to'}" :entity="item" disabled/>
        </b-col>
        <b-col cols="12">
          <field :field="{key: 'email_body', type: 'html'}" :entity="item" disabled/>
        </b-col>
      </b-row>
    </b-modal>
  </b-overlay>
</template>

<script>
import {
  BTableSimple,
} from 'bootstrap-vue'
import MailTr from '@/layouts/components/MailTr'
import Field from '@/views/app/Generic/Field'
import moment from 'moment-business-time'
import { getUserData } from '@/auth/utils'
import Fuse from 'fuse.js'

export default {
  components: {
    Field,
    MailTr,
    BTableSimple,
  },
  props: {
    search: {},
    perPage: Number,
    currentPage: Number,
    totalRows: Number,
    filterValue: {},
  },
  data() {
    return {
      api: process.env.VUE_APP_BASE_URL,
      loading: false,
      sortBy: 'email_received_datetime',
      sortDesc: 'DESC',
      selected: false,
      items: [],
      filterData: { ...this.initialFilter },
      item: null,
      listLoaded: false,
    }
  },
  computed: {
    primaryKey() {
      return this.primaryKeyColumn || this.fields.find(f => f.auto)?.key || `${this.entity}_id`
    },
    link() {
      return `table-${this.entity}-edit`
    },
    canDelete() {
      return this.$can('delete', this.entityForm || this.entity)
    },
    canUpdate() {
      return this.$can('update', this.entityForm || this.entity)
    },
    filteredEmail() {
      let prefiltered = this.items.filter(email => {
        if (this.filterValue === 0) return true
        if (this.filterValue === 1) {
          if (email.email_dismissed) return false
          if (email.ticket_id_created) return false
          // if (email.document.length > 0 && email.document.every(d => d.ticket_created || d.classification_dismissed) && (!email.email_dismissed && !email.ticket_id_created)) return false
          return true
        }
        if (email.email_dismissed) return true
        if (email.ticket_id_created) return true
        // if (email.document.every(d => d.ticket_created || d.classification_dismissed)) return true
        return false
      })
      if (this.search && prefiltered[0]) {
        const fuse = new Fuse(prefiltered, {
          keys: Object.keys(prefiltered[0]),
          shouldSort: true,
        })
        prefiltered = fuse.search(this.search).map(({ item }) => item)
      }
      return prefiltered
    },
  },
  watch: {
    perPage() {
      this.fetch()
    },
    currentPage() {
      this.fetch()
    },
    search() {
      this.fetch()
    },
    filterValue() {
      this.fetch()
    },
  },
  async mounted() {
    await this.fetch()
  },
  methods: {
    filteredDocuments(documents) {
      return documents.filter(document => {
        if (this.filterValue === 0) return true
        if (this.filterValue === 1) {
          if (document.ticket_created || document.classification_dismissed) return false
        } else if (!document.ticket_created && !document.classification_dismissed) return false
        return true
      })
    },
    async classifyNew(item, $tr, action, options) {
      const parentEmail = options?.parentEmail
      const create_subticket = !item.ticket_id || !!options?.shouldCreateSubTicket
      if (!item.ticket_id && action !== 'dismiss') {
        if (!item.pos_id) return this.$errorToast('Please select a pos')
        if (!item.contract_id) return this.$errorToast('Please select a contract')
        if (!item.board_id) return this.$errorToast('Please select a board')
      }
      try {
        this.loading = true
        // get first column of selected board
        const column = (await this.$api({
          entity: 'frontend_column_list',
          action: 'read-rich',
          order_by: 'rank_order',
          order_dir: 'ASC',
          data: [{ board_id: item.board_id }],
        })).data.data.data[0]

        const now = moment()
        // const user = getUserData()
        const deadline = now.clone().addWorkingTime(column.default_deadline_period || 0, 'hours').format('YYYY-MM-DD HH:mm:ss')
        const deadline_yellow = now.clone().addWorkingTime(column.default_deadline_yellow || 0, 'hours').format('YYYY-MM-DD HH:mm:ss')
        const deadline_red = now.clone().addWorkingTime(column.default_deadline_red || 0, 'hours').format('YYYY-MM-DD HH:mm:ss')

        const _payload = {
          pos_id: item.pos_id,

          board_id: item.board_id,

          // column_id: column.column_id,
          ticket_move_time_in: now.format('YYYY-MM-DD HH:mm:ss'),
          ticket_deadline_offset: deadline,
          ticket_deadline_offset_yellow: deadline_yellow,
          ticket_deadline_offset_red: deadline_red,

          ticket_id_group: item.ticket_id,

          email_id: item.email_id,

          contract_id: item.contract_id,
          document_id: item.document_id,
          documenttype_id: item.documenttype_id,

          action,
          create_subticket,
        }

        const payload = {}
        Object.keys(_payload).forEach(key => {
          if (typeof _payload[key] !== typeof undefined) {
            payload[key] = _payload[key]
          }
        })

        const { data } = await this.$http.put('/tickets/classification', payload)
        const ticket_id = data.ticket_id
        const master_ticket_id = item.ticket_id || ticket_id
        this.fetch()
        if (item.document_id) {
          this.$set(
            item,
            action === 'dismiss'
              ? 'classification_dismissed'
              : 'ticket_created',
            true,
          )
        }
        if (item.document_id) this.$set(item, 'processed', true)
        this.$set(
          item,
          action === 'dismiss'
            ? 'email_dismissed'
            : 'ticket_id_created',
          action === 'dismiss' ? true : master_ticket_id,
        )
        if (item.ticket_id) this.$set(item, 'subticket_id_created', ticket_id)

        // Make the mail proceed if it should be
        const currentEmail = (parentEmail || item)
        if (currentEmail) {
          currentEmail.email_processed = currentEmail.documents?.length > 0
            ? !(parentEmail || item).documents.map(doc => !!doc.processed || !!doc.classification_dismissed).includes(false)
            : true
        }
        // eslint-disable-next-line no-nested-ternary
        this.$successToast(action === 'dismiss' ? 'Dismiss success' : create_subticket ? 'Ticket Created' : 'Success')
        this.loading = false
      } catch (e) {
        if (e.response) this.$errorToast(e.response.data.detail)
        else this.$errorToast(e.message)
      } finally {
        this.loading = false
        const isEmailHasBeenClassified = !!(parentEmail || item)?.email_processed

        if (isEmailHasBeenClassified) {
          this.fetch(true)
        }
      }
      this.processStatus(this.items)
      return undefined
    },
    async classify(item, $tr) {
      if (!item.ticket_id) {
        if (!item.pos_id) return this.$errorToast('Please select a pos')
        // if (!item.contract_id) return this.$errorToast('Please select a contract')
        if (!item.board_id) return this.$errorToast('Please select a board')
      }
      this.loading = true
      try {
        let ticket_id = null
        let success = true

        item.contract_name = $tr.$refs.contract?.selectedValue?.contract_name
        item.ticket_name_created = $tr.$refs.ticket?.selectedValue?.ticket_name

        // create ticket
        if (item.ticket_id) {
          // create subticket
          const subticket = (await this.$api({
            action: 'create',
            entity: 'ticket',
            data: [
              {
                ticket_name: item.email_subject.substr(0, 20),
                ticket_progress: 0,
                ticket_closed: 0,
              },
            ],
          })).data.data.data[0][0]

          await this.$api({
            action: 'create',
            entity: 'ticket_ticket_rel',
            data: [{ ticket_id_group: item.ticket_id, ticket_id: subticket.ticket_id }],
          })
          ticket_id = subticket.ticket_id
        } else {
          // create ticket
          const ticket_name = item.email_subject.substr(0, 20)
          const ticket = (await this.$api({
            action: 'create',
            entity: 'ticket',
            data: [
              {
                ticket_name,
                // ticket_description: item.email_body,
                ticket_progress: 0,
                ticket_closed: 0,
              },
            ],
          })).data.data.data[0][0]

          item.ticket_name_created = ticket_name

          await this.$api({
            action: 'create',
            entity: 'ticket_pos_rel',
            data: [{ ticket_id: ticket.ticket_id, pos_id: item.pos_id }],
          })

          if (item.contract_id) {
            await this.$api({
              action: 'create',
              entity: 'ticket_contract_rel',
              data: [{ ticket_id: ticket.ticket_id, contract_id: item.contract_id }],
            })
          }

          // get first column of selected board
          const column = (await this.$api({
            entity: 'frontend_column_list',
            action: 'read-rich',
            order_by: 'rank_order',
            order_dir: 'ASC',
            data: [{ board_id: item.board_id }],
          })).data.data.data[0]

          const now = moment()
          const user = getUserData()
          const deadline = now.clone().addWorkingTime(column.default_deadline_period || 0, 'hours').format('YYYY-MM-DD HH:mm:ss')
          const deadline_yellow = now.clone().addWorkingTime(column.default_deadline_yellow || 0, 'hours').format('YYYY-MM-DD HH:mm:ss')
          const deadline_red = now.clone().addWorkingTime(column.default_deadline_red || 0, 'hours').format('YYYY-MM-DD HH:mm:ss')

          const columnTicket = (await this.$api({
            action: 'create',
            entity: 'ticket_columnx_rel',
            data: [
              {
                ticket_id: ticket.ticket_id,
                column_id: column.column_id,
                ticket_move_time_in: now.format('YYYY-MM-DD HH:mm:ss'),
                ticket_deadline_offset: deadline,
                ticket_deadline_offset_yellow: deadline_yellow,
                ticket_deadline_offset_red: deadline_red,
                user_id: user.user_id,
              },
            ],
          })).data.data.data[0][0]

          ticket_id = ticket.ticket_id
        }

        const master_ticket_id = item.ticket_id || ticket_id

        if (item.document_id) {
          success = (await this.$api({
            action: 'update',
            entity: 'classification_document_classficationtype_rel',
            data: [
              {
                classification_id: item.classification_id,
                document_id: item.document_id,
                documenttype_id: item.documenttype_id,
                ticket_id,
                ticket_created: 1,
              },
            ],
          })).data.data.data[0][0]

          await this.$api({
            action: 'create',
            entity: 'document_ticket_rel',
            data: [{
              ticket_id: master_ticket_id,
              document_id: item.document_id,
            }],
          })
        }
        // see later if we can remove this from else
        await this.$api({
          action: 'create',
          entity: 'email_ticket_rel',
          data: [{
            ticket_id: master_ticket_id,
            email_id: item.email_id,
          }],
        })

        if (success) {
          if (item.document_id) this.$set(item, 'ticket_created', true)
          this.$set(item, 'ticket_id_created', master_ticket_id)
          if (item.ticket_id) this.$set(item, 'subticket_id_created', ticket_id)
          this.$successToast('Ticket Created')
        } else {
          this.$errorToast('Error, Please try again')
        }
      } catch (e) {
        console.error(e)
        if (e.response) this.$errorToast(e.response.data.detail)
        else this.$errorToast(e.message)
      } finally {
        this.loading = false
      }
    },
    async reject(item) {
      this.loading = true
      try {
        const result = (await this.$api({
          action: 'update',
          entity: item.document_id ? 'classification_document_classficationtype_rel' : 'email',
          data: [
            {
              ...(item.document_id ? {
                document_id: item.document_id,
                classification_id: item.classification_id,
                classification_dismissed: 1,
              } : { email_id: item.email_id, email_dismissed: 1 }),
            },
          ],
        })).data.data.data[0][0]
        if (result) {
          this.$successToast(item.document_id ? 'Document Dismissed' : 'Mail Dismissed')
          if (item.document_id) this.$set(item, 'classification_dismissed', true)
          else this.$set(item, 'email_dismissed', true)
        } else {
          this.$errorToast('Error, Please try again')
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    showMailContent(email) {
      this.item = email
      this.$refs.mailContent.show()
    },
    async fetchList() {
      // this.loading = true
      try {
        const { data } = await this.$http.get('/emails/filters/data')
        // await this.$store.dispatch('table/setListData', { entity: 'frontend_6_1_6_overview', data: data.ticket })
        // await this.$store.dispatch('table/setListData', { entity: 'frontend_2_1_3_8', data: data.pos })
        // await this.$store.dispatch('table/setListData', {
        //   entity: 'frontend_4_2_1_contract_selector',
        //   data: data.contract,
        // })
        await this.$store.dispatch('table/setListData', { entity: 'board', data: data.board })
        await this.$store.dispatch('table/setListData', { entity: 'documenttype', data: data.documenttype })
        this.listLoaded = true
      } catch (e) {
        console.error(e)
      }
    },
    async refresh() {
      if (this.loading) return
      await this.fetch()
    },
    async fetch(ignoreLoading) {
      const payload = {
        // order_by: this.sortBy,
        // order_dir: this.sortDesc ? 'DESC' : 'ASC',
        size: this.perPage === 0 ? 1000000 : this.perPage,
        page: this.currentPage,
        query: this.search,
        lang: this.$i18n.locale,
        filter: this.filterValue,
        // data: [{ email_to: 'zelos@seybold-fm.com,' }],
      }
      // retrieve from cache
      // const cacheKey = this.getCacheKey(payload)
      // const fromCache = this.$store.getters['table/tableCache'](cacheKey)
      // if (fromCache) {
      //   this.loading = false
      //   return this.processData(fromCache)
      // }
      if (this.loading && !ignoreLoading) return
      this.loading = true

      const promises = [this.$http.get('/emails', { params: payload })]
      if (!this.listLoaded) promises.push(this.fetchList())
      const [result0, result1] = await Promise.allSettled(promises)
      console.log(result0, result1)
      if (result0.status === 'fulfilled') {
        await this.processData(result0.value.data)
      } else {
        const title = result0.value.response?.data.detail
        this.$errorToast(title)
      }
      this.loading = false
    },
    getCacheKey(payload) {
      return `${this.entity}-${JSON.stringify(payload)}`
    },
    processStatus(items) {
      items.forEach(item => {
        item.documents.forEach(async document => {
          if (document.classification_dismissed) document.status = 'dismiss'
          else if (document.ticket_created) document.status = 'done'
          else document.status = 'notprocess'
        })

        if (item.email_dismissed) item.status = 'dismiss'
        else if (item.email_processed) item.status = 'done'
        else if (item.documents.findIndex(d => d.status !== 'notprocess') >= 0) item.status = 'inprogress'
        else item.status = 'notprocess'
      })
    },
    async processData(data) {
      this.$emit('update:totalRows', data.total)
      data.items.forEach(el => {
        el.__selected = false
      })
      const items = data.items
      items.forEach(item => {
        item.open = false
        item.documents.forEach(async document => {
          document.email_subject = item.email_subject
          document.email_id = item.email_id
          if (!document.classification_id) {
            // fix classification
            const classification = (await this.$api({
              action: 'create',
              entity: 'classification',
              data: [
                {},
              ],
            })).data.data.data[0][0]

            const relData = (await this.$api({
              action: 'create',
              entity: 'classification_document_classficationtype_rel',
              data: [
                {
                  document_id: document.document_id,
                  classification_id: classification.classification_id,
                  ticket_created: 0,
                  documenttype_id: 0,
                },
              ],
            })).data.data.data[0][0]
            this.$set(document, 'classification_id', classification.classification_id)
          }
        })
      })
      this.processStatus(items)
      this.items = items
      return this.items
    },
    selectAll() {
      const newVal = this.selected
      this.currentItems.forEach(item => {
        this.$set(item, '__selected', newVal)
      })
    },
    reload() {
      this.$refs.table.refresh()
    },
    filter(data) {
      this.filterData = { ...data }
      this.reload()
    },
  },
}
</script>

<style lang="scss">
.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 1000px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.mail-table {
  .vs__selected {
    max-width: 150px;
  }
}
</style>

<template>
  <b-overlay :show="loading">
    <b-table-simple ref="table" sticky-header striped hover responsive>
      <b-thead>
        <b-tr>
          <b-th/>
          <b-th>Email Id</b-th>
          <b-th>Email received date</b-th>
          <b-th>Email From</b-th>
          <b-th>Email To</b-th>
          <b-th>Email Subject</b-th>
          <b-th class="text-center">
            Ticket Id
          </b-th>
          <b-th class="text-center">
            Pos Id
          </b-th>
          <b-th class="text-center">
            Contract Id
          </b-th>
          <b-th>Attachment</b-th>
          <b-th>File Name</b-th>
          <b-th class="text-center">
            DocumentType
          </b-th>
          <b-th class="text-center">
            Board
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
          <mail-tr :item="item" @show-content="showMailContent(item)" @classify="classify(item)"
                   @reject="reject(item)"/>
        </b-tbody>
        <b-tbody v-if="item.documents.length>0" :id="'collapse'+item.email_id">
          <mail-tr v-for="(child,idx) in item.documents" :key="idx" :item="child" child @classify="classify(item)"
                   @reject="reject(item)"/>
        </b-tbody>
      </template>
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
        <b-col col="12">
          <field :field="{key: 'email_body', type: 'html'}" :entity="item" disabled/>
        </b-col>
      </b-row>
    </b-modal>
  </b-overlay>
</template>

<script>
import {
  BTable, BButton, BFormCheckbox, BTableSimple,
} from 'bootstrap-vue'
import MailTr from '@/layouts/components/MailTr'
import Field from '@/views/app/Generic/Field'
import moment from 'moment-business-time'
import { getUserData } from '@/auth/utils'
import _ from 'lodash'

export default {
  components: {
    Field,
    MailTr,
    BTable,
    BButton,
    BFormCheckbox,
    BTableSimple,
  },
  props: {
    search: {},
    perPage: Number,
    currentPage: Number,
    totalRows: Number,
  },
  data() {
    return {
      loading: false,
      sortBy: 'email_id',
      sortDesc: this.defaultSortDesc,
      selected: false,
      items: [],
      filterData: { ...this.initialFilter },
      item: null,
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
  },
  watch: {
    currentItems: {
      deep: true,
      handler() {
        // if (this.currentItems.length === 0) return
        // if (this.currentItems.filter(item => !item.__selected).length === 0) this.selected = true
        // else if (this.currentItems.filter(item => item.__selected).length === 0) this.selected = false

      },
    },
    selected() {
      this.selectAll()
    },
    items() {
      this.currentItems = this.items
    },
  },
  async mounted() {
    this.loading = true
    await this.fetch()
    await this.fetchList()
  },
  methods: {
    async classify(item) {
      console.log(item)
      if (!item.ticket_id) {
        if (!item.pos_id) return this.$errorToast('Please select a pos')
        // if (!item.contract_id) return this.$errorToast('Please select a contract')
        if (!item.board_id) return this.$errorToast('Please select a board')
      }
      this.loading = true
      try {
        let ticket_id = null
        // create ticket
        if (item.ticket_id) {
          // create subticket
          const subticket = (await this.$api({
            action: 'create',
            entity: 'ticket',
            data: [
              {
                ticket_name: item.email_subject,
                // ticket_description: item.email_body,
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
          const ticket = (await this.$api({
            action: 'create',
            entity: 'ticket',
            data: [
              {
                ticket_name: item.email_subject.substr(0, 20),
                // ticket_description: item.email_body,
                ticket_progress: 0,
                ticket_closed: 0,
              },
            ],
          })).data.data.data[0][0]

          await this.$api({
            action: 'create',
            entity: 'ticket_pos_rel',
            data: [{ ticket_id: ticket.ticket_id, pos_id: item.pos_id }],
          })

          if (item.contract_id) {
            await this.$api({
              action: 'create',
              entity: 'ticket_contract_rel',
              data: [{ ticket_id: ticket.ticket_id, pos_id: item.contract_id }],
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
          const deadline = now.clone().addWorkingTime(column.default_deadline_period, 'hours').format('YYYY-MM-DD HH:mm:ss')
          const deadline_yellow = now.clone().addWorkingTime(column.default_deadline_yellow, 'hours').format('YYYY-MM-DD HH:mm:ss')
          const deadline_red = now.clone().addWorkingTime(column.default_deadline_red, 'hours').format('YYYY-MM-DD HH:mm:ss')

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
                user_id: user.user.user_id,
              },
            ],
          })).data.data.data[0][0]

          ticket_id = ticket.ticket_id
        }
        const result = (await this.$api({
          action: item.document_id ? (item.classification_id ? 'update' : 'create') : 'create',
          entity: item.document_id ? 'classification_document_classficationtype_rel' : 'email_ticket_rel',
          data: [
            {
              classification_id: item.classification_id,
              ...(item.document_id ? {
                document_id: item.document_id,
                documenttype_id: item.documenttype_id,
              } : { email_id: item.email_id }),
              ticket_id,
              ticket_created: 1,
            },
          ],
        })).data.data.data[0][0]
        if (result) {
          item.ticket_created = true
          this.$successToast('Classification Done')
        } else {
          this.$errorToast('Error, Please try again')
        }
      } catch (e) {
        console.error(e)
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
              } : { email_id: item.email_id, email_dismissed: 1, }),
            },
          ],
        })).data.data.data[0][0]
        if (result) {
          this.$successToast('Ticket Dismissed')
          if (item.document_id) item.classification_dismissed = true
          else item.email_dismissed = true
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
    fetchList() {
      return Promise.all([
        'frontend_6_1_6_overview', 'frontend_2_1_3_8', 'frontend_4_2_1_contract_selector',
        'board', 'documenttype', 'documenttype_board_grp',
      ].map(list => this.$store.dispatch('table/fetchList', { entity: list })))
    },
    onViewClick(data) {
      if (this.onViewElement) {
        this.onViewElement(this.currentItems[data.index])
        return
      }
      const routeData = {
        name: 'table-view',
        params: {
          table: this.entityView || this.entity,
          id: this.currentItems[data.index][this.primaryKey],
          entity: this.currentItems[data.index],
          ids: this.currentItems.map(i => i[this.primaryKey]),
        },
      }
      if (this.blankLink) {
        const route = this.$router.resolve(routeData)
        window.open(route.href, '_blank')
      } else this.$router.push(routeData)
    },
    fetch() {
      const payload = {
        action: 'read-rich',
        entity: 'email',
        attributes: ['email_id', 'email_subject', 'email_to', 'email_sent_datetime', 'email_received_datetime'],
        order_by: this.sortBy,
        order_dir: this.sortDesc ? 'DESC' : 'ASC',
        per_page: this.perPage === 0 ? 1000000 : this.perPage,
        from: 0,
        current_page: this.currentPage,
        filter_all: this.filter ?? '',
        lang: this.$i18n.locale,
        data: [{ email_to: 'zelos@seybold-fm.com,' }],
      }
      // retrieve from cache
      const cacheKey = this.getCacheKey(payload)
      const fromCache = this.$store.getters['table/tableCache'](cacheKey)
      if (fromCache) {
        this.loading = false
        return this.processData(fromCache)
      }
      this.loading = true
      return this.$api(payload)
        .then(async ({ data }) => {
          console.log(data)
          const items = await this.processData(data)
          // set in cache
          this.$store.commit('table/setTableCache', { key: cacheKey, data })
          return items
        })
        .catch(e => {
          console.log(e)
          const title = e.response?.data.detail
          this.$errorToast(title)
          return null
        })
        .finally(() => {
          this.loading = false
        })
    },
    getCacheKey(payload) {
      return `${this.entity}-${JSON.stringify(payload)}`
    },
    async processData(data) {
      this.$emit('update:totalRows', data.data.links.pagination.total)
      data.data.data.forEach(el => {
        el.__selected = false
      })
      // this.$store.commit('table/setDefinition', { data, table: this.table })
      const items = data.data.data
      const filterData = items.map(i => ({ email_id: i.email_id }))
      const email_documents = (await this.$api({
        action: 'read-rich',
        attribute: ['email_id', 'document_id', 'document_name'],
        entity: 'email_document_grp',
        per_page: 1000000,
        data: filterData,
      })).data.data.data
      const email_classfications = (await this.$api({
        action: 'read-rich',
        // entity: 'classification_email_grp',
        entity: 'email_ticket_rel',
        per_page: 1000000,
        data: filterData,
      })).data.data.data
      const document_classfications = (await this.$api({
        action: 'read-rich',
        // entity: 'classification_document_grp',
        entity: 'classification_document_classficationtype_rel',
        per_page: 1000000,
        data: _.uniqBy(email_documents, 'document_id').filter(i => i.document_id != null).map(ed => ({ document_id: ed.document_id })),
      })).data.data.data
      email_documents.forEach(item => {
        const cl = document_classfications.find(c => c.document_id === item.document_id)
        if (cl) {
          Object.keys(cl).forEach(k => (item[k] = cl[k]))
          console.log('set cl', item, cl)
        }
      })
      items.forEach(item => {
        const documents = email_documents.filter(d => d.email_id === item.email_id && d.document_id != null)
        item.documents = documents.map(d => ({ ...item, ...d, documents: [] }))
        // .filter(d => !d.ticket_created)
        // console.log('New Documents', item.email_id, item.documents)
        const cl = email_classfications.find(c => c.email_id === item.email_id)
        if (cl) {
          Object.keys(cl).forEach(k => (item[k] = cl[k]))
        }
        // process ticket data
        const id = item.email_subject.match(/^#\d+/g)
        if (id) {
          const ticket_id = parseInt(id[0].substr(1))
          item.ticket_id = ticket_id
          const list = this.$store.state.table.listCache.frontend_6_1_6_overview
          console.log('ticket_id', ticket_id)
          const el = list.find(e => e.ticket_id === item.ticket_id)
          if (el) {
            item.pos_id = el.pos_id
            item.contract_id = el.contract_id
          }
        }
      })
      this.items = items
      // .filter(d => !d.ticket_created)
      return this.items
    },
    getSelected() {
      return this.currentItems.filter(item => item.__selected)
    },
    deselectAll() {
      this.currentItems.forEach(item => {
        item.__selected = false
      })
    },
    deleteSelected() {
      const selected = this.getSelected()
      if (!selected.length) {
        return this.$errorToast('No element selected')
      }
      // show confirm box
      return this.deleteEntities(selected)
    },
    deleteElement(index) {
      return this.deleteEntities([this.currentItems[index]])
    },
    deleteEntities(entities) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(async result => {
        if (!result.value) return
        const entityToDelete = this.fields.find(f => f.alwaysNew)
        const data = {
          action: 'delete',
          entity: this.entityForm || this.entity,
          data: entities.map(entity => (this.fields.filter(field => field.composite).reduce(((acc, currentValue) => {
            acc[currentValue.key] = entity[currentValue.key]
            return acc
          }), {
            [this.primaryKey]: entity[this.primaryKey],
            [this.secondKey]: entity[this.secondKey],
          }))),
        }

        this.$api(data).then(async resp => {
          if (entityToDelete) {
            try {
              await this.$api({ ...data, entity: entityToDelete.list })
            } catch (e) {
              console.error(e)
            }
          }

          const count = resp.data.data.rowcount
          if (count > 0) this.$successToast(`${count} Element(s) where deleted`)
          else this.$errorToast(`${count} Element(s) where deleted`)
          // this.$successToast(this.$t(entities.length > 1 ? 'notification.elements_deleted' : 'notification.element_deleted'))
          this.$store.commit('table/deleteTableCacheKeyFromPrefix', `${this.entity}-`)
          // if all elements where deleted, go to page 1
          if (this.currentItems.length === count) {
            this.$emit('update:currentPage', 1)
          }
          this.$refs.table.refresh()
        })
          .catch(e => {
            console.error(e)
            this.$errorToast()
          })
      })
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
    onSelect(index) {
      console.log('index', index)
      if (!this.multiSelect) {
        this.currentItems.forEach((item, idx) => {
          if (idx !== index) this.$set(item, '__selected', false)
        })
        this.$emit('selected', this.currentItems[index])
      }
    },
    onRowClicked(record, index) {
      console.log('row clicked', record)
      this.$set(record, '__selected', !record.__selected)
    },
  },
}
</script>

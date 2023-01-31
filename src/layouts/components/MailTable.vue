<template>
  <b-overlay :show="loading">
    <b-table-simple sticky-header ref="table" striped hover responsive>
      <b-thead>
        <b-tr>
          <b-th>Email Id</b-th>
          <b-th>Email received date</b-th>
          <b-th>Email From</b-th>
          <b-th>Email To</b-th>
          <b-th>Email Subject</b-th>
          <b-th class="text-center">Ticket Id</b-th>
          <b-th class="text-center">Pos Id</b-th>
          <b-th class="text-center">Contract Id</b-th>
          <b-th>Attachment</b-th>
          <b-th>File Name</b-th>
          <b-th class="text-center">Classification</b-th>
          <b-th class="text-center">Action</b-th>
        </b-tr>
      </b-thead>
      <!--    <template #cell(__selected)="data">-->
      <!--      <b-form-checkbox v-if="currentItems[data.index]" v-model="currentItems[data.index].__selected"-->
      <!--                       :disabled="disabled" @change="onSelect(data.index)"/>-->
      <!--    </template>-->
      <template v-for="(item,idx) in items">
        <b-tbody :key="idx">
          <mail-tr :item="item" @show-content="showMailContent(item)"/>
        </b-tbody>
        <template v-if="item.childrens">
          <b-tbody v-for="(child,idx) in item.childrens" :key="idx">
            <mail-tr :item="child" child/>
          </b-tbody>
        </template>
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
          <field :field="{key: 'email_date_received'}" :entity="item" disabled/>
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
import MailTr from "@/layouts/components/MailTr";
import Field from "@/views/app/Generic/Field";

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
        if (this.currentItems.length === 0) return
        if (this.currentItems.filter(item => !item.__selected).length === 0) this.selected = true
        else if (this.currentItems.filter(item => item.__selected).length === 0) this.selected = false
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
    await this.fetchList()
    await this.fetch()
  },
  methods: {
    showMailContent(email) {
      this.item = email
      this.$refs.mailContent.show()
    },
    fetchList() {
      return Promise.all([
        'ticket', 'frontend_2_1_3_8', 'frontend_4_2_1_contract_selector', 'classification'
      ].map((list) => this.$store.dispatch('table/fetchList', { entity: list })))
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
        order_by: this.sortBy,
        order_dir: this.sortDesc ? 'DESC' : 'ASC',
        per_page: this.perPage === 0 ? 1000000 : this.perPage,
        from: 0,
        current_page: this.currentPage,
        filter_all: this.filter ?? '',
        lang: this.$i18n.locale,
      }
      // retrieve from cache
      const cacheKey = this.getCacheKey(payload)
      const fromCache = this.$store.getters['table/tableCache'](cacheKey)
      if (fromCache) {
        return this.processData(fromCache)
      }
      this.loading = true
      return this.$api(payload)
        .then(({ data }) => {
          console.log(data)
          const items = this.processData(data)
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
      return this.entity + '-' + JSON.stringify(payload)
    },
    processData(data) {
      this.$emit('update:totalRows', data.data.links.pagination.total)
      data.data.data.forEach(el => {
        el.__selected = false
      })
      // this.$store.commit('table/setDefinition', { data, table: this.table })
      this.items = data.data.data
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
          this.$store.commit('table/deleteTableCacheKeyFromPrefix', this.entity + '-')
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

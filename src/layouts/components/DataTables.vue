<template>
  <b-table :title="entityList||entity" ref="table" striped hover responsive :busy.sync="loading" :per-page="perPage"
           :current-page="currentPage" :items="items || provider" :fields="allFields" :sort-by.sync="sortBy"
           :sort-desc.sync="sortDesc" :filter="search" select-mode="multi" @row-clicked="onRowClicked">
    <template #cell(__selected)="data">
      <b-form-checkbox v-if="currentItems[data.index]" v-model="currentItems[data.index].__selected"
                       @change="onSelect(data.index)"/>
    </template>
    <template #cell()="data">
      <b-form-checkbox v-if="data.field.type==='boolean'" disabled="" v-model="data.value" :value="1"/>
      <b-button v-else-if="data.field.type==='button'" size="xs" @click="$router.push(data.field.getRoute(data.item))">
        {{ data.field.btnLabel }}
      </b-button>
      <span v-else>{{ data.value }}</span>
    </template>
    <template #head(__selected)>
      <b-form-checkbox v-if="multiSelect" v-model="selected"/>
      <span v-else></span>
    </template>

    <template v-if="withActions" #cell(Actions)="data">
      <b-button v-if="withView" size="xs" class="mr-1" style="margin-bottom: 3px" variant="outline-success" pill
                @click="onViewElement ? onViewElement(currentItems[data.index]) :$router.push({name: 'table-view', params: {table: entityView || entity,id: currentItems[data.index][primaryKey], entity: currentItems[data.index], ids: currentItems.map(i => i[primaryKey])}})">
        <feather-icon icon="EyeIcon" class="mr-50"/>
        <span>{{ $t('app.btn.view') }}</span>
      </b-button>
      <b-button v-if="withEdit && canUpdate" size="xs" variant="outline-info" class="mr-1" style="margin-bottom: 3px"
                pill
                @click="onEditElement ? onEditElement(currentItems[data.index]) : $router.push({name: 'table-view', params: {table: entity,id: currentItems[data.index][primaryKey], entity: currentItems[data.index], ids: currentItems.map(i => i[primaryKey])}, query: {edit: 'true'}})">
        <feather-icon icon="EditIcon" class="mr-50"/>
        <span>{{ $t('app.btn.edit') }}</span>
      </b-button>
      <b-button v-if="withDelete && canDelete" size="xs" variant="outline-primary" style="margin-bottom: 3px"
                @click="deleteElement(data.index)" pill>
        <feather-icon icon="Trash2Icon" class="mr-50"/>
        <span>{{ $t('app.btn.delete') }}</span>
      </b-button>
    </template>
  </b-table>
</template>

<script>
import {
  BTable, BButton, BFormCheckbox,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BButton,
    BFormCheckbox,
  },
  props: {
    entity: { type: String, required: true },
    entityList: { type: String },
    entityForm: { type: String, required: false },
    entityView: { type: String, required: false },
    fields: { type: Array, required: true },
    primaryKeyColumn: { type: String },
    withView: { type: Boolean, default: true },
    withEdit: { type: Boolean, default: true },
    withDelete: { type: Boolean, default: true },
    withActions: { type: Boolean, default: true },
    multiSelect: { type: Boolean, default: true },
    defaultSortColumn: { type: String, default: '' },
    secondKey: {},
    secondKeyValue: {},
    search: {},
    onEditElement: { type: Function },
    onViewElement: { type: Function },
    perPage: Number,
    currentPage: Number,
    totalRows: Number,
    selectable: { type: Boolean, default: true },
    defaultSortDesc: { type: Boolean, default: false },
    items: Array,
    ids: Array,
    initialFilter: Object,
  },
  data() {
    return {
      loading: false,
      sortBy: this.defaultSortColumn || this.fields[0].key,
      sortDesc: this.defaultSortDesc,
      selected: false,
      currentItems: this.items || [],
      filterData: { ...this.initialFilter },
    }
  },
  computed: {
    primaryKey() {
      return this.primaryKeyColumn || this.fields.find(f => f.auto)?.key || `${this.entity}_id`
    },
    link() {
      return `table-${this.entity}-edit`
    },
    allFields() {
      return [
        ...(this.selectable ? [{ key: '__selected' }] : []),
        ...this.fields.filter(f => !f.hideOnIndex).map(field => {
          const newField = { sortable: true, ...field }
          // if (newField.type === 'list') {
          //   newField.key = newField.listLabel
          // }
          return newField
        }),
        ...(this.withActions ? ['Actions'] : []),
      ]
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
  methods: {
    provider(ctx) {
      console.log('ctx', ctx)
      const {
        currentPage, perPage, filter, sortBy, sortDesc,
      } = ctx
      const payload = {
        action: 'read-rich',
        entity: this.entityList || this.entity,
        order_by: sortBy,
        order_dir: sortDesc ? 'DESC' : 'ASC',
        per_page: perPage,
        from: 0,
        current_page: currentPage,
        filter_all: filter ?? '',
        lang: this.$i18n.locale,
      }

      if (this.ids) {
        if (this.ids.length === 0) {
          this.currentItems = []
          return []
        }
        payload.data = this.ids.map(id => (typeof id === 'object' ? id : { [this.primaryKey]: id }))
      } else {
        const filterData = { ...this.filterData }
        if (this.secondKey) filterData[this.secondKey] = this.secondKeyValue
        if (Object.keys(filterData).length > 0) {
          payload.data = [filterData]
        }
      }
      return this.$api(payload)
        .then(({ data }) => {
          console.log(data)
          // this.totalRows = data.data.links.pagination.total
          this.$emit('update:totalRows', data.data.links.pagination.total)
          data.data.data.forEach(el => {
            el.__selected = false
          })
          this.$store.commit('table/setDefinition', { data, table: this.table })
          this.currentItems = data.data.data
          return this.currentItems
        })
        .catch(e => {
          console.log(e)
          const title = e.response?.data.detail
          this.$errorToast(title)
          return null
        })
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

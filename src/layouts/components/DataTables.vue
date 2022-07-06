<template>
  <b-table :title="entity" ref="table" striped hover responsive :busy.sync="loading" :per-page="perPage"
           :current-page="currentPage" :items="provider" :fields="allFields" :sort-by.sync="sortBy"
           :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="search" select-mode="multi">
    <template #cell(__selected)="data">
      <b-form-checkbox v-if="currentItems[data.index]" v-model="currentItems[data.index].__selected"/>
    </template>
    <template #head(__selected)>
      <b-form-checkbox v-model="selected"/>
    </template>

    <template #cell(Actions)="data">
      <b-button v-if="withView && !secondKey" size="xs" class="mr-1" style="margin-bottom: 3px" variant="info"
                @click="$router.push({name: 'table-view', params: {table: entity,id: currentItems[data.index][primaryKey], entity: currentItems[data.index]}})">
        <img src="@/assets/images/pages/plusIcons.svg" alt="" style="margin-right: 5px">
        <span>{{ $t('app.btn.view') }}</span>
      </b-button>
      <b-button v-if="withEdit" size="xs" variant="success" class="mr-1" style="margin-bottom: 3px"
                @click="onEditElement ? onEditElement(currentItems[data.index]) : $router.push({name: 'table-view', params: {table: entity,id: currentItems[data.index][primaryKey], entity: currentItems[data.index]}, query: {edit: 'true'}})">
        <img src="@/assets/images/pages/plusIcons.svg">
        <span>{{ $t('app.btn.edit') }}</span>
      </b-button>
      <b-button size="xs" variant="primary" style="margin-bottom: 3px" @click="deleteElement(data.index)">
        <img src="@/assets/images/pages/deleteIcons.svg" alt="">
        <span>{{ $t('app.btn.delete') }}</span>
      </b-button>
    </template>
  </b-table>
</template>

<script>
import {
  BTable, BButton, BFormCheckbox,
} from 'bootstrap-vue'
import { mapState } from 'vuex'

export default {
  components: {
    BTable,
    BButton,
    BFormCheckbox,
  },
  props: {
    entity: { type: String, required: true },
    entityForm: { type: String, required: false },
    fields: { type: Array, required: true },
    primaryKeyColumn: { type: String },
    withView: { type: Boolean, default: true },
    withEdit: { type: Boolean, default: true },
    defaultSortColumn: { type: String, default: '' },
    secondKey: {},
    secondKeyValue: {},
    search: {},
    onEditElement: { type: Function },
    perPage: Number,
    currentPage: Number,
    totalRows: Number,
  },
  data() {
    return {
      loading: false,
      sortBy: this.defaultSortColumn ?? this.fields[0].key,
      sortDesc: false,
      sortDirection: 'asc',
      selected: false,
      currentItems: [],
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
        { key: '__selected' },
        ...this.fields.filter(f => !f.hideOnIndex).map(field => {
          const newField = { sortable: true, ...field }
          if (newField.type === 'list') {
            newField.key = newField.listLabel
          }
          return newField
        }),
        'Actions']
    },
  },
  watch: {
    currentItems: {
      deep: true,
      handler() {
        if (this.currentItems.filter(item => !item.__selected).length === 0) this.selected = true
        else if (this.currentItems.filter(item => item.__selected).length === 0) this.selected = false
      },
    },
    selected() {
      this.selectAll()
    },
  },
  methods: {
    provider(ctx) {
      console.log('ctx', ctx)
      const {
        currentPage, perPage, filter, sortBy, sortDesc,
      } = ctx
      const filterData = {}
      if (this.secondKey) filterData[this.secondKey] = this.secondKeyValue
      return this.$api({
        action: 'read-rich',
        entity: this.entity,
        order_by: sortBy,
        order_dir: sortDesc ? 'DESC' : 'ASC',
        per_page: perPage,
        from: 0,
        current_page: currentPage,
        filter: filterData,
        filter_all: filter ?? '',
        lang: this.$i18n.locale,
      })
        .then(({ data }) => {
          console.log(data)
          // this.totalRows = data.data.links.pagination.total
          this.$emit('update:totalRows', data.data.links.pagination.total)
          data.data.data.forEach(el => {
            el.__selected = false
          })
          this.$store.commit('table/setDefinition', data)
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
    deleteSelected() {
      const selected = this.currentItems.filter(item => item.__selected)
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
      }).then(result => {
        if (!result.value) return
        this.$api({
          action: 'delete',
          entity: this.entityForm || this.entity,
          data: entities.map(entity => (this.fields.filter(field => field.composite).reduce(((acc, currentValue) => {
            acc[currentValue.key] = entity[currentValue.key]
            return acc
          }), {
            [this.primaryKey]: entity[this.primaryKey],
            [this.secondKey]: entity[this.secondKey],
          }))),
        }).then(() => {
          this.$successToast(this.$t(entities.length > 1 ? 'notification.elements_deleted' : 'notification.element_deleted'))
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
    }
  },
}
</script>

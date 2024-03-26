<template>
  <div class="">
    <b-table ref="table" sticky-header striped hover responsive :busy.sync="isLoadingData" :per-page="perPage"
             :current-page="currentPage" :items="items || provider" :fields="allFields" :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc" :filter="search" select-mode="multi" show-empty :tbody-tr-class="rowClass" @row-clicked="onRowClicked">
      <template #table-busy>
        <div class="text-center text-danger">
          <b-spinner class="align-middle"/>
          <strong class="ml-1">{{ $t('table~message~loading') }}</strong>
        </div>
      </template>
      <template #cell(__selected)="data">
        <b-form-checkbox v-if="currentItems[data.index]" v-model="currentItems[data.index].__selected"
                         :disabled="disabled" @change="onSelect(data.index)"/>
      </template>
      <template #cell()="data">
        <b-form-checkbox v-if="data.field.type === 'boolean'" v-model="data.value" :disabled="!data.field.editable"
                         :value="1" :unchecked-value="0"
                         @change="data.field.onChange ? data.field.onChange(data) : null"/>
        <b-button v-else-if="data.field.type === 'button'" size="xs" @click="$router.push(data.field.getRoute(data.item))">
          {{ data.field.btnLabel }}
        </b-button>
        <a v-else-if="data.field.type === 'download'" target="_blank" :href="data.field.getLink(data.item)">
          {{ data.field.btnLabel }}
        </a>
        <div v-else-if="data.field.type === 'html'" v-html="data.value"/>
        <div v-else-if="data.field.type === 'component'">
          <component :is="data.field.component" :items="items || provider" :row-data="data" :data="data.field.props"
                     @reload="reload"/>
        </div>
        <span v-else :class="{'text-truncate' : !!truncateBy}" :style="truncateStyle" :v-b-tooltip="!!truncateBy" :title="data.value">
          <b-badge v-if="data.field.withBadge" :variant="data.field.setVariant(data)">{{ data.value }}</b-badge>
          <template v-else-if="data.field.translateValue">{{ $t(data.value) }}</template>
          <template v-else>{{ data.value }}</template>
        </span>
      </template>
      <template #head(__selected)>
        <b-form-checkbox v-if="multiSelect" v-model="selected" :disabled="disabled"/>
        <span v-else/>
      </template>
      <template #empty>
        {{ $t('message~table~empty') }}
      </template>
      <template #emptyfiltered>
        {{ $t('message~table~emptyFiltered') }}
      </template>
      <template v-if="withActions" #cell(Actions)="data">
        <div class="text-nowrap">
          <b-button v-if="withView" class=" btn-icon" style="margin-bottom: 3px" variant="flat-success" pill
                    @click="onViewClick(data)">
            <feather-icon icon="EyeIcon"/>
            <!--        <span>{{ $t('button~view') }}</span>-->
          </b-button>
          <b-button v-if="withEdit && canUpdate" :disabled="canUpdateItem && canUpdateItem(currentItems[data.index])"
                    class="btn-icon" variant="flat-info" style="margin-bottom: 3px" pill
                    @click="onEditElement ? onEditElement(currentItems[data.index]) : $router.push({ name: 'table-view', params: { table: entity, id: currentItems[data.index][primaryKey], entity: currentItems[data.index], ids: currentItems.map(i => i[primaryKey]) }, query: { edit: 'true' } })">
            <feather-icon icon="EditIcon"/>
            <!--        <span>{{ $t('button~edit') }}</span>-->
          </b-button>
          <b-button v-if="withDelete && canDelete" :disabled="canDeleteItem && canDeleteItem(currentItems[data.index])"
                    class="btn-icon" variant="flat-primary" style="margin-bottom: 3px" pill
                    @click="deleteElement(data.index)">
            <feather-icon icon="Trash2Icon"/>
            <!--        <span>{{ $t('button~delete') }}</span>-->
          </b-button>
        </div>
      </template>
      <template v-if="withNested" #cell(ShowDetails)="row">
        <template v-if="(subFieldsData && subFieldsData.btnStyle === 'button')">
          <b-button v-if="row.item[subFieldsDataKey] && row.item[subFieldsDataKey].length > 0" size="sm" variant="secondary" @click="showDetails(row, $event.target)">
            {{ (subFieldsData && subFieldsData.btnText) || 'Show options' }}
          </b-button>
          <span v-else>No</span>
        </template>
        <template v-else>
          <b-button
            v-if="row.item[subFieldsDataKey] && row.item[subFieldsDataKey].length > 0"
            v-b-tooltip.hover
            title="See list of comments" class="btn-icon"
            variant="flat-success" style="margin-bottom: 3px" pill @click="showDetails(row, $event.target)">
            <feather-icon icon="EyeIcon"/>
            <!--        <span>{{ $t('button~edit') }}</span>-->
          </b-button>
        </template>
      </template>
    </b-table>
    <b-modal ref="modal_test" ok-only centered scrollable :size="(subFieldsData && subFieldsData.modalSize) || 'xl'" :title="(subFieldsData && subFieldsData.modalTitle) || infoModal.title">
      <template v-if="subFieldsType=== 'component'">
        <component :is="subFieldsComponent" :item="infoModal.content" />
      </template>
      <template v-else>
        <b-table :items="infoModal.content[subFieldsDataKey]" :fields="subFields" />
      </template>
    </b-modal>
  </div>
</template>

<script>
import { BButton, BFormCheckbox, BTable } from 'bootstrap-vue'
import { formatDate, getDocumentLink } from '@/libs/utils'
import flatten from 'lodash/flatten'
import { mapGetters } from 'vuex'

export default {
  components: {
    BTable,
    BButton,
    BFormCheckbox,
  },
  props: {
    initialFilterData: {
      type: Object,
      default: () => ({}),
    },
    noCache: { type: Boolean, default: false },
    isLoadingData: Boolean,
    entity: { type: String, required: true },
    entityList: { type: String },
    opacity: { type: Boolean, default: false },
    entityForm: { type: String, required: false },
    entityView: { type: String, required: false },
    entityEndpoint: { type: [String, Function], required: false }, // if it exist a specific route for retrieving data
    fields: { type: Array, required: true },
    primaryKeyColumn: { type: String },
    blankLink: { type: Boolean, default: false },
    withView: { type: Boolean, default: true },
    withEdit: { type: Boolean, default: true },
    withDelete: { type: Boolean, default: true },
    canMakeDeleteCall: { type: Boolean, default: true },
    withActions: { type: Boolean, default: true },
    withNested: { type: Boolean, default: false }, // Ce champ indique si on doit avoir des imbrications sous les lignes de tableau
    subFields: { type: Array, required: false }, // Ce champ donne les fields à afficher lorsqu'on veut afficher plus de détail d'une ligne
    subFieldsDataKey: { type: String, required: false }, // Ce champ indique la clé de l'objet du tableau qui contiendra les données du sous tableau
    subFieldsType: { type: String, required: false }, // Ce champ indique si les éléments à afficher sous le tableau est un composant ou un tableau
    subFieldsComponent: { type: Object, required: false }, // Ce champ indique le composant pour le sous tableau
    subFieldsData: { type: Object, required: false }, // Ce champ contient certaines configuration pour les données du subfields
    multiSelect: { type: Boolean, default: true },
    defaultSortColumn: { type: String, default: '' },
    secondKey: {},
    secondKeyValue: {},
    search: {},
    onDeleteElement: { type: Function },
    onEditElement: { type: Function },
    onViewElement: { type: Function },
    perPage: Number,
    currentPage: Number,
    totalRows: Number,
    selectable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    defaultSortDesc: { type: Boolean, default: false },
    items: Array,
    ids: Array,
    initialFilter: Object,
    filterItems: { type: Function, required: false }, // Cette function effectue le filtre sur les données de l'entité
    canUpdateItem: { type: Function, required: false }, // si un item du tableau est editable
    canReadItem: { type: Function, required: false, default: () => true }, // si un item du tableau est consultable
    canDeleteItem: { type: Function, required: false }, // si un item du tableau est supprimable
    customRequest: { type: Object, required: false }, // un object qui contient des données pour personnaliser les requêtes vers le back dans les relations
    /**
     * truncateBy : Représente la valeur en rem à appliquer sur tous les champs d'un tableau
     * @example truncateBy: 20 Va fixer le max-width des champs à 20 rem
     */
    truncateBy: { type: Number, required: false }, // un object qui contient des données pour personnaliser les requêtes vers le back dans les relations
  },
  data() {
    return {
      loading: false,
      sortBy: this.defaultSortColumn || this.fields.filter(f => !f.hideOnIndex && !f.auto)[0].key,
      sortDesc: this.defaultSortDesc,
      selected: false,
      currentItems: this.items || [],
      filterData: { ...this.initialFilter },
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
    }
  },
  computed: {
    truncateStyle() {
      return this.truncateBy ? { maxWidth: `${this.truncateBy}rem`, display: 'block' } : {}
    },
    primaryKey() {
      return this.primaryKeyColumn || this.fields.find(f => f.auto)?.key || `${this.entity}_id`
    },
    link() {
      return `table-${this.entity}-edit`
    },
    allFields() {
      const fields = [
        ...(this.selectable ? [{ key: '__selected', thStyle: { width: '50px' } }] : []),
        ...(this.withActions ? [{
          key: 'Actions',
          stickyColumn: true,
          tdClass: 'p-0',
          label: this.$t('attribute.general_actions'),
          variant: 'light',
          thStyle: { width: '80px' },
        }] : []),
        ...this.fields.filter(f => !f.hideOnIndex && !f.auto).map(field => {
          let newField = field
          if (typeof field === 'string') newField = { key: field }
          const f = { label: this.$t(`attribute.${newField.key}`), sortable: true, ...newField }
          if (f.type === 'date') {
            f.formatter = val => formatDate(val, f.time)
          }
          return f
        }),
      ]

      if (this.withNested) {
        const newField = {
          key: 'ShowDetails',
          stickyColumn: true,
          tdClass: 'p-0',
          label: (this.subFieldsData && this.subFieldsData.theadText) || 'Options',
          variant: 'none',
          thStyle: { width: '80px' },
        }

        if (this.subFieldsData && this.subFieldsData.insertAtIndex) {
          fields.splice(this.subFieldsData.insertAtIndex, 0, newField)
        } else {
          fields.splice(1, 0, newField)
        }
      }

      return fields
    },
    canDelete() {
      return this.$can('delete', this.entityForm || this.entity)
    },
    canUpdate() {
      return this.$can('update', this.entityForm || this.entity)
    },
    ...mapGetters('user', ['isUserExternClient']),
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
    filterData() {
      this.$refs.table.refresh()
      this.$emit('table-refreshed')
    },
  },
  methods: {
    onViewClick(data) {
      if (this.onViewElement) {
        this.onViewElement(this.currentItems[data.index])
        return
      }
      if (this.primaryKey === 'document_id') {
        window.open(getDocumentLink(this.currentItems[data.index]), '_blank')
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
    provider(ctx) {
      this.isLoadingData = true
      const {
        currentPage, perPage, filter, sortBy, sortDesc,
      } = ctx
      const payload = {
        action: 'read-rich',
        entity: this.entityList || this.entity,
        order_by: sortBy,
        order_dir: sortDesc ? 'DESC' : 'ASC',
        per_page: perPage === 0 ? 1000000 : perPage,
        size: perPage === 0 ? 1000000 : perPage,
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
      // retrieve from cache
      const cacheKey = this.getCacheKey(payload)
      const fromCache = this.$store.getters['table/tableCache'](cacheKey)
      if (fromCache && this.noCache) {
        return this.processData(fromCache)
      }

      // retrieve form specific endpoint
      if (this.entityEndpoint) {
        const filterData = {
          ...(this.initialFilterData ?? {}),
          ...this.filterData,
          keyword: filter,
          page: currentPage,
          size: payload.per_page,
          per_page: perPage === 0 ? 25 : perPage,
          order_filed: sortBy,
          order: sortDesc ? 'desc' : 'asc',
        }

        if (this.secondKey) filterData[this.secondKey] = this.secondKeyValue
        // create request query string
        const requestQuery = Object.keys(filterData)
          .filter(key => ![null, -1].includes(filterData[key]))
          .map(key => `${key}=${filterData[key]}`).join('&')
        return this.$http.get(`${this.entityEndpoint instanceof Function ? this.entityEndpoint(this) : this.entityEndpoint}?${requestQuery}`)
          .then(({ data }) => {
            let items
            if (Array.isArray(data.data)) {
              items = this.processData(data)
              // set in cache
              this.$store.commit('table/setTableCache', { key: cacheKey, data })
            } else if (typeof data.data === 'object' && data.data != null) {
              items = this.processData(data)
              // set in cache
              this.$store.commit('table/setTableCache', { key: cacheKey, data })
            } else if (Array.isArray(data)) {
              items = this.processData({ data })
              this.$store.commit('table/setTableCache', { key: cacheKey, data })
              this.$store.commit('table/setTableCache', { key: cacheKey, data })
            } else {
              throw new Error('invalid data')
            }
            this.isLoadingData = false
            return items
          })
          .catch(e => {
            console.log(e)
            this.isLoadingData = false
            const title = e.response?.data.detail
            this.$errorToast(title)
            return null
          })
      }

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
    },
    getCacheKey(payload) {
      return `${this.entity}-${JSON.stringify(payload)}`
    },
    processData(data) {
      if (this.primaryKeyColumn === 'location_id') {
        data.data = data.data.map(element => ({ ...element, address_name: element?.address?.address_name || element?.address_city_name }))
        data.data = data.data.map(element => ({ ...element, address_street: element?.address?.address_street || element?.address_city_name }))
        data.data = data.data.map(element => ({ ...element, address_house_number: element?.address?.address_house_number || element?.address_city_name }))
        data.data = data.data.map(element => ({ ...element, address_extra: element?.address?.address_extra || element?.address_city_name }))
        data.data = data.data.map(element => ({ ...element, address_city_zip_code: element?.address?.address_city_zip_code || element?.address_city_name }))
        data.data = data.data.map(element => ({ ...element, address_city_name: element?.address?.address_city_name }))
        data.data = data.data.map(element => ({ ...element, address_city_state: element?.address?.address_city_state || element?.address_city_name }))
        data.data = data.data.map(element => ({ ...element, company_name: element?.owner?.company_name || element?.company_id }))
      }
      console.log('this is the data process', data)
      if (this.entityEndpoint && Array.isArray(data.data)) {
        this.$emit('update:totalRows', data.total)
        data.data.forEach(el => {
          el.__selected = false
        })
        this.$store.commit('table/setDefinition', { data, table: this.table })
        const datas = data.data
        if (this.filterItems && typeof this.filterItems === 'function') {
          this.currentItems = datas.filter(item => this.filterItems(item, this))
          if (this.isUserExternClient) {
            this.$emit('update:totalRows', this.currentItems.length)
          }
        } else {
          this.currentItems = datas
        }
        this.$emit('items', this.currentItems)
        return this.currentItems
      }
      this.$emit('update:totalRows', data.data.links.pagination.total)
      data.data.data.forEach(el => {
        el.__selected = false
      })
      this.$store.commit('table/setDefinition', { data, table: this.table })
      const datas = data.data.data

      if (this.filterItems && typeof this.filterItems === 'function') {
        this.currentItems = datas.filter(item => this.filterItems(item, this))
        if (this.isUserExternClient) {
          this.$emit('update:totalRows', this.currentItems.length)
        }
      } else {
        this.currentItems = datas
      }

      this.$emit('items', this.currentItems)
      return this.currentItems
    },
    getSelected() {
      return this.currentItems.filter(item => item.__selected)
    },
    deselectAll() {
      this.currentItems.forEach(item => {
        item.__selected = false
      })
    },
    onAction(action) {
      const selected = this.getSelected()
      if (!selected.length) {
        return this.$errorToast('No element selected')
      }
      return action.onClick(selected, this)
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
        if (!this.canMakeDeleteCall) {
          this.$emit('delete-items', entities)
          // entities.forEach(f => {
          //   const index = this.items.findIndex(i => f === i)
          //   this.items.splice(index, 1)
          // });
          this.$refs.table.refresh()
          return
        }
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

        if (this.customRequest) {
          const payload = {
            [this.customRequest.relationKey]: entities.map(entity => entity[this.primaryKey]),
            action: 'delete',
            [this.customRequest.entityKey]: this.secondKeyValue,
          }
          await this.$http({
            method: this.customRequest.method ? this.customRequest.method : 'put',
            url: typeof this.customRequest.endpoint === 'function' ? this.customRequest.endpoint() : this.customRequest.endpoint,
            data: this.customRequest.payload ? this.customRequest.payload(entities) : payload,
          }).then(res => {
            this.$successToast('Delete Done.')
            this.$root.$emit('update-occured')
            this.$store.commit('table/deleteTableCacheKeyFromPrefix', `${this.entity}-`)
            this.$refs.table.refresh()
          }).catch(error => {
            console.log({ error })
          })

          return
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
          if (count > 0) this.$successToast(`${count} Element${count > 1 ? 's' : ''} were deleted`)
          else this.$errorToast(`${count} Element${count > 1 ? 's' : ''} were deleted`)
          // this.$successToast(this.$t(entities.length > 1 ? 'notification.elements_deleted' : 'notification.element_deleted'))
          this.$store.commit('table/deleteTableCacheKeyFromPrefix', `${this.entity}-`)
          // if all elements were deleted, go to page 1
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
      console.log('this is the data')
      this.$refs.table.refresh()
      this.$emit('table-refreshed')
    },
    filter(data) {
      console.log('this is the data of --------', data)
      this.filterData = { ...data }
      this.reload()
    },
    onSelect(index) {
      if (!this.multiSelect) {
        this.currentItems.forEach((item, idx) => {
          if (idx !== index) this.$set(item, '__selected', false)
        })
        this.$emit('selected', this.currentItems[index])
      }
    },
    onRowClicked(record, index) {
      console.log('row clicked', [record, index])
      this.$set(record, '__selected', !record.__selected)
    },
    rowClass(item) {
      return item?.ticket_closed === 1 ? 'statusBackground' : ''
    },
    downloadCsv(filename = 'export.csv') {
      const fields = this.allFields.filter(f => (['Actions', '__selected'].indexOf(f.key) === -1))
      let csvContent = `${fields.map(f => this.$t(`attribute.${f.key}`)).join(';').replaceAll('\r', '').replaceAll('\n', '')}\n${
        this.items.map(item => fields.map(f => item[f.export_key || f.key]).join(';')).join('\n')}`
      csvContent = `data:text/csv;charset=utf-8,%EF%BB%BF${encodeURI(csvContent)}`

      const link = document.createElement('a')
      link.setAttribute('href', csvContent)
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
    },
    showDetails(row, event) {
      this.infoModal.title = `Details of ${this.entity} ${row.item[`${this.entity}_name`]}`
      this.infoModal.content = row.item
      // this.$root.$emit('bv::show::modal', this.infoModal.id, event)
      this.$refs.modal_test.show()
    },
  },
}
</script>
<style>
.statusBackground {
  opacity: 0.3;
}
</style>

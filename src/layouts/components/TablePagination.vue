<template>
  <div class="d-flex justify-content-between flex-wrap" style="padding: 10px">
    <b-form-group class="mb-0">
      <label class="d-inline-block text-sm-left mr-50">{{ $t('headline~general~subframe~show') }}</label>
      <b-form-select id="perPageSelect" v-model="perPage" style="width: 60px" size="sm" :options="pageOptions"
                     class="w-10"/>
      <label class="d-inline-block text-sm-left ml-50">{{ $t('headline~general~subframe~entries') }}</label>
    </b-form-group>

    <div class="d-flex align-items-center">
      <span class="mr-1">
        {{
          $t('headline~general~subframe~pagination').replace('x', (currentPage - 1) * perPage + 1).replace('y', Math.min(perPage * currentPage, totalRows)).replace('z', totalRows)
        }}
      </span>
      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="center" class="my-0"
                    first-number last-number prev-class="prev-item" next-class="next-item"/>
    </div>

    <div class="d-flex align-items-center">
      <slot/>
      <b-button v-if="withFilter && inlineFilter" size="sm" variant="primary" class="mr-1 btn-icon"
                @click="$emit('filter')">
        <feather-icon icon="FilterIcon" :badge="filterBadge"/>
      </b-button>

      <b-dropdown v-if="canImport && importFunctionnality.includes(entity) && showInput" size="sm" variant="default"
                  toggle-class="text-decoration-none" no-caret >
        <template #button-content>
          <b-button variant="success">
            Ex./Import:{{ chooseTheImportExportItem }}
          </b-button>
        </template>

        <template v-if="chooseTheImportExportItem !== ''">
          <b-dropdown-item @click="onExportData(chooseTheImportExportItem)">
            <FeatherIcon icon="ArrowUpIcon"/>
            {{ $t('translate~key~export') }} {{ chooseTheImportExportItem }}
          </b-dropdown-item>
          <b-dropdown-item @click="()=>$router.push({name:'importView',params:{name:chooseTheImportExportItem}})">
            <FeatherIcon icon="ArrowDownIcon"/>
            {{ $t('translate~key~import') }} {{ chooseTheImportExportItem }}
          </b-dropdown-item>
        </template>
      </b-dropdown>
      <b-dropdown v-if="canImport && importFunctionnality.includes(entity) && showInput" size="sm" variant="default" toggle-class="text-decoration" no-caret style="margin-left: -45px!important;">
        <template #button-content>
          <b-button variant="success">
            <FeatherIcon icon="ChevronDownIcon"/>
          </b-button>
        </template>
        <b-dropdown-item v-for="(item,index) in arrayItem" :key="index" @click="()=>handleChooseItem(item)">
          {{ item.entity }}
        </b-dropdown-item>
      </b-dropdown>
      <b-button v-if="onNewElement!=null && canCreate" size="sm" variant="info" class="mr-1" @click="onNewElement">
        <feather-icon icon="PlusCircleIcon" class="mr-50"/>
        <span>{{ $t('button~new') }}</span>
      </b-button>
      <b-button v-if="onDeleteElements!=null && canDelete" size="sm" variant="primary" class="mr-1"
                @click="onDeleteElements">
        <feather-icon icon="Trash2Icon" class="mr-50"/>
        <span>{{ $t('button~delete') }}</span>
      </b-button>
      <b-button v-for="(action,i) in actions" :key="i" size="sm" variant="primary" class="mr-1"
                @click="$emit('action', action)">
        <!--        <feather-icon icon="Trash2Icon" class="mr-50"/>-->
        <span>{{ action.text }}</span>
      </b-button>
      <b-form-input v-if="!!showInput" id="filterInput" v-model="internalSearch" debounce="500" type="search"
                    class="w-auto"
                    placeholder="Search.."/>
    </div>

  </div>
</template>

<script>
import { USER_ROLES } from '@/config/config-access/config-roles'
import {
  BButton,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BPagination,
} from 'bootstrap-vue'

export default {
  name: 'TablePagination',
  components: {
    BFormGroup,
    BFormSelect,
    BFormInput,
    BPagination,
    BButton,
  },

  props: {
    onNewElement: Function,
    onDeleteElements: Function,
    onExportData: Function,
    withFilter: Boolean,
    pageOptions: {
      type: Array,
      default() {
        return [10, 30, 100, {text: 'All', value: 100000}]
      },
    },
    perPage: Number,
    currentPage: Number,
    search: String,
    totalRows: Number,
    entity: String,
    showInput: Boolean,
    showForChildreen: Boolean,
    actions: Array,
    importExportArrayItem: Array,
    filterBadge: Number,
    definition: {
      type: Object,
      default: null,
    },
    inlineFilter: Boolean, // Indique s'il s'agit d'un filtre en ligne, afin de masquer l'icône de filtre
  },
  data() {
    return {
      internalSearch: this.search,
      chooseTheImportExportItem: this.entity,
      arrayItem: [],
      importFunctionnality: ['partnercompany', 'contactperson', 'company', 'location', 'pos', 'area','customergroup','partnergroup'],
    }
  },
  computed: {
    canImport() {
      return this.$isAdminOr(USER_ROLES.admin)
    },
    canDelete() {
      return this.definition ? this.$isAbleTo('remove', this.definition.permissions) : true
    },
    canCreate() {
      return this.definition ? this.$isAbleTo('create', this.definition.permissions) : true
    },
  },
  watch: {
    internalSearch() {
      this.$emit('update:search', this.internalSearch)
    },
    perPage() {
      this.$emit('update:perPage', this.perPage)
    },
    currentPage() {
      this.$emit('update:currentPage', this.currentPage)
    },
  },

  methods: {
    handleChooseItem(value) {
      this.chooseTheImportExportItem = value.entity
    }
  },
  mounted() {
    this.arrayItem.push(...this.importExportArrayItem)
    this.arrayItem.unshift(({entity: this.entity, primaryKey: this.entity}))
  },

}
</script>

<style scoped>
.btn {
  white-space: nowrap;
}
</style>

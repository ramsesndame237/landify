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
      <b-dropdown v-if="importFunctionnality.includes(entity) && showInput" size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
        <template #button-content>
          <b-button id="popover-button-variant" size="sm" variant="success" class="mr-1 btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M12 18.5c0 .5.07 1 .18 1.5H6.5c-1.5 0-2.81-.5-3.89-1.57C1.54 17.38 1 16.09 1 14.58c0-1.3.39-2.46 1.17-3.48S4 9.43 5.25 9.15c.42-1.53 1.25-2.77 2.5-3.72S10.42 4 12 4c1.95 0 3.6.68 4.96 2.04C18.32 7.4 19 9.05 19 11c1.15.13 2.1.63 2.86 1.5c.24.26.43.55.6.86A6.37 6.37 0 0 0 18.5 12c-.5 0-1 .07-1.5.18V11c0-1.38-.5-2.56-1.46-3.54C14.56 6.5 13.38 6 12 6s-2.56.5-3.54 1.46C7.5 8.44 7 9.62 7 11h-.5c-.97 0-1.79.34-2.47 1.03c-.69.68-1.03 1.5-1.03 2.47s.34 1.79 1.03 2.5c.68.66 1.5 1 2.47 1h5.53c-.03.17-.03.33-.03.5m6-4c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.68 0 3.12-1.03 3.71-2.5H20a2.5 2.5 0 1 1-.23-3.27L18 18.5h4v-4l-1.17 1.17A3.99 3.99 0 0 0 18 14.5"/>
            </svg>
          </b-button>
        </template>
        <b-dropdown-item @click="onExportData(entity)">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M13 19c0 .34.04.67.09 1H6.5c-1.5 0-2.81-.5-3.89-1.57C1.54 17.38 1 16.09 1 14.58c0-1.3.39-2.46 1.17-3.48S4 9.43 5.25 9.15c.42-1.53 1.25-2.77 2.5-3.72S10.42 4 12 4c1.95 0 3.6.68 4.96 2.04C18.32 7.4 19 9.05 19 11c1.15.13 2.1.63 2.86 1.5c.51.57.84 1.21 1 1.92A5.908 5.908 0 0 0 19 13c-3.31 0-6 2.69-6 6m7-3h-2v4h-2l3 3l3-3h-2z"/>
          </svg>
          {{ $t('translate~key~export') }}
        </b-dropdown-item>
        <b-dropdown-item @click="()=>$router.push({name:'importView',params:{name:entity}})">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M13 19c0 .34.04.67.09 1H6.5c-1.5 0-2.81-.5-3.89-1.57C1.54 17.38 1 16.09 1 14.58c0-1.3.39-2.46 1.17-3.48S4 9.43 5.25 9.15c.42-1.53 1.25-2.77 2.5-3.72S10.42 4 12 4c1.95 0 3.6.68 4.96 2.04C18.32 7.4 19 9.05 19 11c1.15.13 2.1.63 2.86 1.5c.51.57.84 1.21 1 1.92A5.908 5.908 0 0 0 19 13c-3.31 0-6 2.69-6 6m3-1h2v4h2v-4h2l-3-3z"/>
          </svg>
          {{ $t('translate~key~import') }}
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
      <b-form-input id="filterInput" v-if="!showInput" v-model="internalSearch" debounce="500" type="search" class="w-auto"
                    placeholder="Search.."/>
    </div>

  </div>
</template>

<script>
import {
  BButton, BFormGroup, BFormInput, BFormSelect, BPagination,
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
    onExportData:Function,
    withFilter: Boolean,
    pageOptions: {
      type: Array,
      default() {
        return [10, 30, 100, { text: 'All', value: 100000 }]
      },
    },
    perPage: Number,
    currentPage: Number,
    search: String,
    totalRows: Number,
    entity: String,
    showInput: Boolean,
    actions: Array,
    filterBadge: Number,
    inlineFilter: Boolean, // Indique s'il s'agit d'un filtre en ligne, afin de masquer l'icône de filtre
  },
  data() {
    return { internalSearch: this.search, importFunctionnality: ['partnercompany', 'contactperson', 'company', 'location', 'pos', 'area'] }
  },
  computed: {
    canDelete() {
      return this.$can('delete', this.entity)
    },
    canCreate() {
      return this.$can('create', this.entity)
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

}
</script>

<style scoped>
.btn {
  white-space: nowrap;
}
</style>

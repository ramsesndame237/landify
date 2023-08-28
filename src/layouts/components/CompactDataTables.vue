<template>
<div class="">
  <div class="d-flex justify-content-between my-1">
    <div class="" v-if="withSize">
      <b-form-group class="mb-0">
        <b-form-select id="perPageSelect" size="lg" v-model="perPage"  :options="size"
                       class="w-10"/>
      </b-form-group>
    </div>
    <div class="" v-if="withSearch">
      <b-form-group>
        <b-form-input size="lg" id="filterInput" v-model="internalSearch" debounce="500" type="search" class="w-auto"
                      placeholder="Search.."/>
      </b-form-group>
    </div>
  </div>
  <div class="">
    <b-table :items="items" outlined :per-page="perPage" :current-page="currentPage"></b-table>
  </div>
  <div class="d-flex align-items-center justify-content-between mt-2">
    <b-card-text >
      <label class="font-small-3 text-muted">Showing {{ currentPage }} to {{ perPage }} of {{ totalRow }} entries</label>
    </b-card-text>
    <b-pagination size="lg" prev-text="Previous" next-text="Next" v-model="currentPage" :total-rows="totalRow" :per-page="perPage"></b-pagination>
  </div>
</div>
</template>
<script>
export default {
  name: "CompactDataTables",
  props:  {
    withSize: {
      type: Boolean, default: true
    },
    withSearch: {
      type: Boolean, default: true
    },
    withPagination: {
      type: Boolean, default: true
    },
    withActions: {
      type: Boolean, default: true
    },
    perPage: {
      type: Number, default: 10
    },
    currentPage: {
      type: Number, default: 1
    },
    totalRow: {
      type: Number, default: 10
    },
    size: {
      type: Array, default: () => [10, 30, 100, { text: 'All', value: 100000 }]
    }
},
  data() {
    return {
      items: [
        { first_name: 'Dickerson', last_name: 'MacDonald', age: 40 },
        { first_name: 'Larsen', last_name: 'Shaw', age: 21 },
        { first_name: 'Geneva', last_name: 'Wilson', age: 89 },
        { first_name: 'Geneva', last_name: 'Wilson', age: 89 },
        { first_name: 'Geneva', last_name: 'Wilson', age: 89 },
        { first_name: 'Geneva', last_name: 'Wilson', age: 89 },
        { first_name: 'Jami', last_name: 'Carney', age: 38 }
      ],
      internalSearch: ''
    }
  }
}
</script>



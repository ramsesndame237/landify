<template>
  <div class="track_record_list">
    <b-card-actions ref="card" title="Track Records" action-collapse action-refresh @refresh="loadData(true)">
      <track-record-item v-for="(item,idx) in items" :key="idx" :item="item" class=""/>
      <div v-if="items.length===0" class="text-center text-muted">
        No records available
      </div>

      <b-card-text v-if="!noMoreData" class="text-center mt-2">
        <b-button variant="primary" :disabled="noMoreData" @click="showMore">
          {{ noMoreData? 'No more data' : $t('button~showmore') }}
          <feather-icon icon="ChevronsDownIcon" />
        </b-button>
      </b-card-text>
    </b-card-actions>
  </div>
</template>

<script>
import TrackRecordItem from '@/views/app/TrackRecord/TrackRecordItem.vue'

export default {
  name: 'TrackRecord',
  components: { TrackRecordItem },
  props: {
    endpoint: String,
    definition: Object,
  },
  data() {
    return {
      page: 1,
      size: 5,
      noMoreData: false,
    }
  },
  computed: {
    items() {
      return this.$store.getters['table/listCache'](`trackrecords-${this.paramId}`)
    },
    paramId() {
      return this.$route.params.id
    },
  },
  async mounted() {
    if (this.$parent.$refs.form) {
      console.log('vm', this)
      this.$parent.$refs.form.$on('after-save', () => {
        this.loadData(true)
      })
    }
    if (this.items.length <= 0) {
      await this.loadData()
    }

    // Cet évènement permet de détecter les changements dans les relations des entitées
    this.$root.$on('update-occured', () => {
      this.page = 1
      this.loadData(true)
    })
  },
  methods: {
    async loadData(reset = false) {
      if (reset) {
        await this.$store.dispatch('table/setListData', { entity: `trackrecords-${this.paramId}`, data: [] })
      }
      this.$refs.card.showLoading = true
      try {
        const { data } = await this.$http.get(this.endpoint || '/trackrecords', {
          params: {
            page: this.page,
            size: this.size,
            [this.definition.primaryKey ?? this.definition.fields.find(f => f.auto)?.key]: this.paramId,
          },
        })
        const _items = [...this.items, ...data.data.data]
        await this.$store.dispatch('table/setListData', { entity: `trackrecords-${this.paramId}`, data: _items })

        const { current_page, last_page } = data.data.links.pagination
        if (current_page >= last_page) {
          this.noMoreData = true
        }
      } catch (e) {
        this.$errorToast(e.response ? e.response.data.message : e.message)
      } finally {
        this.$refs.card.showLoading = false
      }
    },
    showMore() {
      this.page++
      this.loadData()
    },
  },
}
</script>

<style scoped>

.track_record-item:not(:last-child) {
  border-bottom: none;
}
</style>

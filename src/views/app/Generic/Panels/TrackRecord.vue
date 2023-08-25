<template>
  <div class="track_record_list">
    <b-card-actions ref="card" title="Track Records" action-collapse action-refresh @refresh="loadData(true)">
      <track-record-item v-for="(item,idx) in items" :key="idx" :item="item" class=""/>
      <div v-if="items.length===0" class="text-center text-muted">
        No records available
      </div>
    </b-card-actions>
  </div>
</template>

<script>
import TrackRecordItem from '@/views/app/TrackRecord/TrackRecordItem.vue'

export default ({
  name: 'TrackRecord',
  components: { TrackRecordItem },
  props: {
    endpoint: String,
    definition: Object,
  },
  data() {
    return {
      items: [],
    }
  },
  async mounted() {
    this.$parent.$refs.form.$on('after-save', () => {
      this.loadData(true)
    })
    await this.loadData()
  },
  methods: {
    async loadData(reset = false) {
      if (reset) {
        this.items = []
      }
      this.$refs.card.showLoading = true
      try {
        const { data } = await this.$http.get(this.endpoint || '', {
          params: {
            [this.definition.primaryKey ?? this.definition.fields.find(f => f.auto)?.key]: this.$route.params.id,
          },
        })
        this.items.push(...data.data.data)
      } catch (e) {
        this.$errorToast(e.response ? e.response.data.message : e.message)
      } finally {
        this.$refs.card.showLoading = false
      }
    },
  },
})
</script>

<style scoped>

.track_record-item:not(:last-child) {
  border-bottom: none;
}
</style>

<template>
  <div class="track_record_list">
    <b-card title="Track Records">
      <track-record-item v-for="(item,idx) in items" :key="idx" :item="item" class=""/>
      <div v-if="items.length===0" class="text-center text-muted">
        No records available
      </div>
    </b-card>
  </div>
</template>

<script>
import TrackRecordItem from '@/views/app/TrackRecord/TrackRecordItem.vue'

export default ({
  name: 'TrackRecord',
  props: {
    endpoint: String,
  },
  components: [TrackRecordItem],
  data() {
    return {
      items: [],
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      const { data } = await this.$http.get(this.endpoint || '')
      this.items.push(...data.data.data)
    },
  },
})
</script>

<style scoped>

.track_record-item:not(:last-child) {
  border-bottom: none;
}
</style>

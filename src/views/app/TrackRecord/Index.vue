<template>
  <div class="track_record_list">
    <b-card>

      <track-record-item class="border track_record-item"/>
      <track-record-item class="border track_record-item"/>
    </b-card>
  </div>
</template>

<script>
import TrackRecordItem from '@/views/app/TrackRecord/TrackRecordItem.vue'

export default {
  components: {
    TrackRecordItem,
  },
}

</script>


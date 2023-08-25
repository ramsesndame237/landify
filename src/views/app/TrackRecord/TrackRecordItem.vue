<template>
  <div class="border track_record-item">
    <b-card no-body class="track_record  mb-0">
      <b-card-header class="track_record-header" header-tag="header" role="tab">
        <b-avatar :text="avatarPlaceholder(item.user)"/>
        <div class="track_record-details">
          <div class="text">
            {{ item.user.user_firstname + ' ' + item.user.user_lastname }} updated
            <div v-for="(vals, key) in changes" :key="key">
              <b-badge variant="light" class="text-dark">
                {{ $t('attribute.' + key) }}
              </b-badge>
              from
              <b-badge variant="light" class="text-dark">
                {{ vals.before }}
              </b-badge>
              to
              <b-badge variant="light" class="text-dark">
                {{ vals.after }}
              </b-badge>
            </div>
          </div>
          <p class="time"> {{ formatDateForHistory(item.history_save_time) }} </p>
        </div>
      </b-card-header>
    </b-card>
  </div>
</template>

<script>
import { BCardHeader, BBadge } from 'bootstrap-vue'
import { formatDateForHistory } from '@/libs/utils';

export default {
  components: {
    BCardHeader,
    BBadge,
  },
  props: {
    item: { type: Object },
  },
  computed: {
    changes() {
      const result = {}
      Object.keys(this.item.before[0]).forEach(key => {
        if (this.item.before[0][key] !== this.item.after[0][key]) {
          result[key] = { before: this.item.before[0][key], after: this.item.after[0][key] }
        }
      })
      return result
    },
  },
  methods: {
    avatarPlaceholder(user) {
      return user?.user_firstname.charAt(0)
        + user?.user_lastname.charAt(0)
    },
    formatDateForHistory,
  },

}

</script>

<style scoped>
.track_record {
  border-radius: 0;
  box-shadow: none;
}

.track_record .track_record-header {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
}

p {
  margin: 0;
  padding: 0;
}
</style>

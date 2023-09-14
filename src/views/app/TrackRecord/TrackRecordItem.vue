<template>
  <div class="border track_record-item">
    <b-card no-body class="track_record  mb-0">
      <b-card-header class="track_record-header" header-tag="header" role="tab">
        <b-avatar :text="avatarPlaceholder(item.user)"/>
        <div class="track_record-details">
          <div class="text">
            {{ item.user.user_firstname + ' ' + item.user.user_lastname }} <span class="font-italic">{{ item.action + 'd' }}</span>
            <template v-if="item.action === actions.UPDATE">
              <div v-for="(vals, key) in changes" :key="key">
                <span> {{ item.entity_name }}</span>
                <template v-if="item.entity">
                  <b-badge variant="light" class="text-dark seperate">
                    {{ item.entity[item.entity_name +'_name'] }}
                  </b-badge>
                </template> :
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
            </template>
            <template v-if="item.action === actions.CREATE">
              <div v-for="(vals, key) in changes" :key="key">
                {{ $t('attribute.' + key) }}
                <b-badge variant="light" class="text-dark seperate">
                  {{ vals.after }}
                </b-badge>
                to
                <span> {{ item.entity_name }}</span>
                <b-badge variant="light" class="text-dark seperate">
                  {{ item.entity[item.entity_name +'_name'] }}
                </b-badge>
              </div>
            </template>
            <template v-else-if="item.action === actions.DELETE">
              <div v-for="(vals, key) in changes" :key="key">
                {{ $t('attribute.' + key) }}
                <b-badge variant="light" class="text-dark seperate">
                  {{ vals.before }}
                </b-badge>
                from
                <span> {{ item.entity_name }}</span>
                <b-badge variant="light" class="text-dark seperate">
                  {{ item.entity[item.entity_name +'_name'] }}
                </b-badge>
              </div>
            </template>
          </div>
          <p class="time">
            {{ formatDateForHistory(item.history_save_time) }}
          </p>
        </div>
      </b-card-header>
    </b-card>
  </div>
</template>

<script>
import { BCardHeader, BBadge } from 'bootstrap-vue'
import { formatDateForHistory } from '@/libs/utils'

export default {
  components: {
    BCardHeader,
    BBadge,
  },
  props: {
    item: { type: Object },
  },
  data() {
    return {
      actions: { CREATE: 'create', DELETE: 'delete', UPDATE: 'update' },
    }
  },
  computed: {
    changes() {
      const result = {}
      switch (this.item.action) {
        case this.actions.UPDATE: {
          Object.keys(this.item.before[0]).forEach(key => {
            if (this.item.before[0][key] !== this.item.after[0][key]) {
              result[key] = { before: this.item.before[0][key], after: this.item.after[0][key] }
            }
          })
          break
        }
        case this.actions.CREATE: {
          Object.keys(this.item.after[0]).forEach(key => {
            result[key] = { after: this.item.after[0][key] }
          })
          break
        }
        case this.actions.DELETE: {
          Object.keys(this.item.before[0]).forEach(key => {
            result[key] = { before: this.item.before[0][key] }
          })
          break
        }
        default: {
          console.log('No situation')
        }
      }
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
.seperate{
  margin-left: .3rem;
}
</style>

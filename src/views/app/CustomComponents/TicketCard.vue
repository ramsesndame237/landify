<template>
  <b-card>
    <template #header>
      <div class="d-flex justify-content-between align-items-center w-100 p-0">
        <div class="left d-flex justify-content-center align-items-center" style="font-size: 14px">
          <div class="bigdot"/>
          <span class="header-text">{{ headerText }}</span>
        </div>
        <b-dropdown
          no-caret
          right
          text="..."
          variant="transparent"
          class="chart-dropdown"
          toggle-class="p-50"
          size="lg"
        >
          <template #button-content>
            <feather-icon icon="MoreHorizontalIcon" size="16" />
          </template>
          <b-dropdown-item
            v-for="option in options"
            :key="option"
          >
            {{ option }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </template>
    <b-card-text class="" >
      <div class=" my-1 d-flex align-items-center">
        <span style="margin-right: 5px; font-weight: 700; font-size: 35px" :style="{color: textColor}">{{ number }}</span>
        <div v-if="percents" class="my-auto ml-1">
          <span v-if="percents" class="d-flex align-items-center rounded" style="padding: 8px 12px; font-size: 14px" :style="{color: textColor, 'background-color': bgPercentColor}">{{ percents }}%</span>
        </div>
      </div>
    </b-card-text>
    <b-card-text>
      {{ footerText }}</b-card-text>
  </b-card>
</template>

<script>
import {
  BCard, BDropdown, BDropdownItem,
} from 'bootstrap-vue'

export default {
  name: 'TicketCard',
  components: {
    BCard,
    BDropdown,
    BDropdownItem,
  },
  props: ['color', 'number', 'percents', 'headerText', 'footerText', 'textColor', 'cols', 'loading'],
  data() {
    return {
      options: ['opt 1', 'opt 2', 'opt 3', 'opt 4'],
    }
  },
  computed: {
    bgPercentColor() {
      return this.color === '#fff' ? 'rgba(0, 0, 0, .1)' : 'rgba(2555, 255, 255, .5)'
    },
  },
}
</script>

<style scoped>
  .bigdot {
    height: 30px;
    width: 30px;
    background-color: #ccc;
    border-radius: 999px;
    margin-right: 5px;
  }
  .header-text {
    line-height: 30px;
    text-align: center;
  }
</style>

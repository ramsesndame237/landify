<template>
  <b-col :lg="cols">
    <div class="p-1" :style="{backgroundColor: color}">
      <div class="d-flex justify-content-between">
        <div class="left" style="font-size: 14px">{{ headerText }}</div>
        <b-dropdown
            no-caret
            right
            text="..."
            variant="transparent"
            class="chart-dropdown"
            toggle-class="p-50"
            size="sm"
        >
          <b-dropdown-item
              v-for="option in options"
              :key="option"
          >
            {{ option }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="my-2 d-flex">
        <span style="margin-right: 5px; font-weight: 700; font-size: 35px" :style="{color: textColor}">{{ number }}</span>
        <div class="my-auto">
          <span class="d-flex align-items-center" style="padding: 8px 12px; background-color: rgb(255, 255, 255, .5); font-size: 14px" :style="{color: textColor}">{{ percents }}%</span>
        </div>
      </div>
      <p style="font-weight: 500; font-size: 12px">{{ footerText }}</p>
    </div>
  </b-col>
</template>

<script>
import { BRow, BCard, BCol, BIcon, BDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  name: 'TicketCard',
  props: ['color', 'number', 'percents', 'headerText', 'footerText', 'textColor', 'cols'],
  components: {
    BRow,
    BCard,
    BCol,
    BIcon,
    BDropdown,
    BDropdownItem,
  },
  data() {
    return {
      options: ['opt 1', 'opt 2', 'opt 3', 'opt 4'],
    }
  },
}
</script>

<style scoped>
</style>

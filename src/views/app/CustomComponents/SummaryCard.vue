<template>
  <b-col :lg="cols">
    <b-card>
      <div class="d-flex justify-content-center align-content-center">
        <b-col class="col-10 d-flex align-content-center">
          <div class="bigdot d-flex justify-content-center align-content-center" :style="{'background-color': color+'80'}">
            <b-icon-flag v-if="title==='CRITICAL'" class="m-auto"></b-icon-flag>
            <b-icon-stopwatch v-if="title==='NEAR DEADLINE'" class="m-auto"></b-icon-stopwatch>
            <svg v-if="title==='OVER DUE'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar m-auto" viewBox="0 0 16 16">
              <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
            </svg>
          </div>
          <b-card-title class="card-title">{{ title }}</b-card-title>
        </b-col>
        <b-col class="col-2">
          <div class="dropdown-btn" @click="showDropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
          </div>
          <b-dropdown
              no-caret
              right
              text=""
              variant="transparent"
              class="chart-dropdown"
              toggle-class="p-50"
              size="sm"
              ref="dropdown"
          >
            <b-dropdown-item
                v-for="option in options"
                :key="option"
            >
              {{ option }}
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
      </div>
      <b-card-text>Value:
        <span style="font-size: 18px; font-weight: 600" :style="{ color: color }" class="value"> {{ value }}</span>
      </b-card-text>
      <b-row>
        <b-col sm="9" class="center-col">
          <b-progress
              :value="percent"
              max="100"
              height="6px"
              :variant="variant"
          ></b-progress>
          <div style="display: flex; justify-content: space-between; margin-top: 8px">
            <h6>% from overall</h6>
            <h6>{{ percent }}%</h6>
          </div>
        </b-col>
        <b-col sm="3">
          <h1 class="font-weight-bolder" style="font-size: 30px" :style="{color: color}">{{ number }}</h1>
        </b-col>
      </b-row>
    </b-card>
  </b-col>
</template>

<script>
import {
  BCard,
  BCardText,
  BLink,
  BCol,
  BRow,
  BProgress,
  BCardTitle,
  BDropdown,
  BDropdownItem,
  BIcon,
  BIconFlag,
  BIconStopwatch,
} from 'bootstrap-vue'

export default {
  name: 'SummaryCard',
  props: ['value', 'color', 'title', 'percent', 'number', 'variant', 'cols'],
  components: {
    BCard,
    BCardText,
    BCol,
    BRow,
    BProgress,
    BCardTitle,
    BDropdown,
    BDropdownItem,
    BIcon,
    BIconFlag,
    BIconStopwatch,
  },
  data() {
    return {
      options: ['opt 1', 'opt 2', 'opt 3', 'opt 4'],
    }
  },
  computed: {
    customColor() {
      return {
        color: this.color,
      }
    },
  },
  methods: {
    showDropdown() {
      this.$refs.dropdown.show()
    },
  },
}
</script>

<style scoped>
h6 {
  font-size: 12px;
  font-weight: 200;
}
.center-col { margin-top: 15px }

.col-10 { padding-left: unset }
.bigdot {
  height: 30px;
  width: 30px;
  border-radius: 999px;
  margin-right: 5px;
}
.card-title {
  line-height: 30px;
  text-align: center;
}
.dropdown-btn { cursor: pointer }
</style>

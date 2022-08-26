<template>
  <b-col :lg="cols">
    <b-card>
      <div class="d-flex justify-content-center align-content-center">
        <b-col class="col-10 d-flex align-content-center">
          <div class="bigdot"></div>
          <b-card-title class="card-title">{{ title }}</b-card-title>
        </b-col>
        <b-col class="col-2">
          <div class="dots"></div>
          <b-dropdown
              no-caret
              right
              text=""
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
        </b-col>
      </div>
      <b-card-text>Value:
        <span style="font-size: 18px; font-weight: 600" :style="{ color: color }"> {{ value }}</span>
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
            <h6 style="font-size: 12px; font-weight: 200">% from overall</h6>
            <h6 style="font-size: 12px; font-weight: 200">{{ percent }}%</h6>
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
import { BCard, BCardText, BLink, BCol, BRow, BProgress, BCardTitle, BDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  name: 'SummaryCard',
  props: ['value', 'color', 'title', 'percent', 'number', 'variant', 'cols'],
  components: {
    BCard,
    BCardText,
    BLink,
    BCol,
    BRow,
    BProgress,
    BCardTitle,
    BDropdown,
    BDropdownItem,
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
}
</script>

<style scoped>
.center-col { margin-top: 15px }

.col-10 { padding-left: unset }

.dots, .dots:before, .dots:after {
  width: 5px;
  height: 5px;
  background: black;
  border-radius: 50%;
}
.dots{
  margin: 0 auto;
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.dots:before {
  content: '';
  position: absolute;
  left: -8px;
}
.dots:after {
  content: '';
  position: absolute;
  right: -8px;
}

.bigdot {
  height: 30px;
  width: 30px;
  background-color: #ccc;
  border-radius: 999px;
  margin-right: 5px;
}
.card-title {
  line-height: 30px;
  text-align: center;
}
</style>

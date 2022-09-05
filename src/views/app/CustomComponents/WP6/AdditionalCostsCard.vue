<template>
  <b-col :lg="cols">
    <b-card>
      <div class="d-flex justify-content-between align-items-center mb-2">
        <b-col class="col-10 d-flex align-content-center">
          <div class="bigdot"></div>
          <h5 class="header-text">{{ title }}</h5>
        </b-col>
        <b-col class="col-2 d-flex justify-content-center align-items-center">
          <div class="dropdown-btn" @click="showDropdown">
            <p class="h1">
              <b-icon-three-dots></b-icon-three-dots>
            </p>
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
      <div>
        <b-row>
          <b-col sm="12" class="center-col">
            <div class="d-flex justify-content-between align-items-center col-sm-10 mb-1">
              <div class="date d-flex align-items-center">
                <b-icon-calendar-week style="margin-right: 4px;"/>
                <span>Aug 23, 2021</span>
              </div>
              <div class="hour d-flex align-items-center">
                <b-icon-clock-fill style="margin-right: 4px;"/>
                <span>13:30 - 15:00</span>
              </div>
            </div>
            <b-progress
                :value="percent"
                max="100"
                height="6px"
            ></b-progress>
            <div style="display: flex; justify-content: space-between; margin-top: 8px">
              <h6>{{ hours }} Stunden</h6>
              <h6>{{ percent }}%</h6>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </b-col>
</template>

<script>
import {
  BCard,
  BCardBody,
  BCol,
  BRow,
  BProgress,
  BDropdown,
  BDropdownItem,
  BIconThreeDots,
  BIconCalendarWeek,
  BIconClockFill
} from 'bootstrap-vue'
export default {
  name: 'AdditionalCostsCard',
  props: ['color', 'title', 'percent', 'cols', 'hours'],
  components: {
    BCard,
    BCardBody,
    BCol,
    BRow,
    BProgress,
    BDropdown,
    BDropdownItem,
    BIconThreeDots,
    BIconCalendarWeek,
    BIconClockFill,
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
  .bigdot {
    height: 10px;
    width: 10px;
    background-color: #ccc;
    border-radius: 999px;
    margin-right: 2px;
  }
  .header-text {
    line-height: 10px;
    text-align: center;
  }
  .dropdown-btn { cursor: pointer }

  .dropdown-menu {
    top: -32px!important;
  }
</style>

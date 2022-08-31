<template>
  <div class="card" style="background-color: rgba(0, 196, 177, .1); padding: 19px">
    <div class="c-header d-flex justify-content-between align-content-center">
      <div class="title text-black-500 d-flex justify-content-between align-content-center w-100" style="text-transform: uppercase">
        <div class="">widerspruchsfrist</div>
        <div class="">
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
        </div>
      </div>
      <div class="dots"></div>
    </div>
    <div class="schedule d-flex align-content-center font-weight-bolder" style="color: #00C4B1">
      <h1 class="mr-2" style="color: #00C4B1">23.11</h1>
      <span class="my-auto">10:00 - 10:45</span>
    </div>
    <div class="c-footer">
      Widerspruch lauft hier ab.
    </div>
  </div>
</template>

<script>
import {BDropdown, BDropdownItem, BIconThreeDots, } from 'bootstrap-vue'
export default {
  name: 'PeriodCard',
  components: {
    BDropdown,
    BDropdownItem,
    BIconThreeDots,
  },
  data() {
    return {
      options: ['opt 1', 'opt 2', 'opt 3', 'opt 4'],
    }
  },
  methods: {
    showDropdown() {
      this.$refs.dropdown.show()
    },
  },
}
</script>

<style scoped>
  .dropdown-btn { cursor: pointer }

  .dropdown {
    margin-top: -70px;
  }
</style>

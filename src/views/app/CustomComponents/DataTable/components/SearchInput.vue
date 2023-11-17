<template>
  <b-input-group
    class="border-1 border-light rounded-lg"
    :style="{'max-width': noMaxWidth ? undefined : '384px', 'flex-wrap': 'nowrap'}"
  >
    <div
      class="d-flex justify-content-center align-items-center pl-1"
    >
      <img
        :src="searchIcon"
        alt="Search"
      >
    </div>
    <b-form-input
      id="filterInput"
      v-model="inputValue"
      debounce="500"
      type="search"
      class="w-auto"
      style="border: none"
      placeholder="Search.."
    />
  </b-input-group>
</template>

<script>
import searchIcon from '@/assets/images/icons/search.svg'

export default {
  name: 'SearchInput',
  props: {
    noMaxWidth: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchIcon,
      inputValue: '',
    }
  },
  watch: {
    inputValue(val) { this.$emit('update:value', val) },
  },
}
</script>

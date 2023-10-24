<script>
export default {
  name: 'AutoCompleteInput',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    field_name: {
      type: String,
      default: '',
    },
    key_value: {
      type: String,
      required: true,
      default: '',
    },
    keyLabel: {
      required: true,
      type: String,
      default: '',
    },
    custom_options: {
      type: Boolean,
      default: false,
    },
    icon_open: {
      type: String,
    },
    icon_close: {
      type: String,
    },
    action_component: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openOption: false,
      selectedOptions: null,
      query: {},
    }
  },
  computed: {
    filteredOptions() {
      if (Object.keys(this.query).length > 0) {
        const optionsData = this.options.filter(option => option[this.keyLabel] !== undefined)
        const dataFilter = optionsData.filter(option => option[this.keyLabel].toLowerCase()
          .includes(this.query[this.keyLabel].toLowerCase()))
          .sort((a, b) => a[this.keyLabel].toLowerCase()
            .indexOf(this.query[this.keyLabel].toLowerCase()) - b[this.keyLabel].toLowerCase()
            .indexOf(this.query[this.keyLabel].toLowerCase()))
        return dataFilter
      }
      console.log('this is the ', Object.keys(this.query).length)
      return this.options
    },
  },
  watch: {
    query(newValue) {
      if (Object.keys(newValue).length === 0) {
        this.filteredOptions
      }
    },
  },
  methods: {
    getSelectionElement(item) {
      if (this.multiple) {
        this.selectedOptions.push(item)
      } else {
        this.query = item
      }
      this.openOption = false
    },
    onEnter() {
      this.selectedOptions = this.filteredOptions[this.selectedIndex]
    },
    onUp() {
      this.selectedIndex--
      if (this.selectedIndex < 0) {
        this.selectedIndex = this.filteredOptions.length - 1
      }
    },
    onDown() {
      // Déplacez la sélection vers le bas
      this.selectedIndex++
      if (this.selectedIndex >= this.filteredOptions.length) {
        this.selectedIndex = 0
      }
    },
    onBlur() {
      // Réinitialisez la sélection
      this.selectedIndex = -1
    },
    openOptionsList() {
      this.openOption = true
    },
    closeOptionsList() {
      this.openOption = false
    },
  },
}
</script>

<template>
  <div class="autocomplete_container">
    <div :class="['custom-autocomplete']">
      <input v-if="selectedOptions == null" v-model="query[keyLabel]" :data-tip="query[keyLabel]" type="text"
             @keyup.enter="onEnter" @keydown.up="onUp" @keydown.down="onDown" @focus="openOptionsList" >
      <div class="action_container">
        <slot v-if="action_component" name="action_button"/>
        <!--        <b-spinner small variant="primary"/>-->
        <button v-if="selectedOptions" @click="selectedOptions = null">
          <feather-icon icon="XIcon"/>
        </button>
        <button @click="openOption = !openOption">
          <feather-icon :icon="openOption ? icon_open : icon_close"/>
        </button>
      </div>
    </div>
    <transition name="slide-fade">
      <div v-if="openOption"
           :class="['rounded-sm', filteredOptions.length ===0 ? 'options_container_2':'options_container']">
        <slot v-if="custom_options" name="options_components"/>
        <ul v-if="custom_options === false && filteredOptions.length > 0">
          <li v-for="(option,index) in filteredOptions" :key="index" @click="getSelectionElement(option)">
            {{ option[keyLabel] }}
          </li>
        </ul>
        <span v-if="filteredOptions.length ===0">{{ $t(field_name) }} is not  available  </span>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" src="@/assets/scss/components/AutoCompleteInput.scss">

</style>

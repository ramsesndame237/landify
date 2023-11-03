<script>
import _ from 'lodash'

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
    disable: {
      type: Boolean,
      default: false
    }
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
      if (Object.keys(this.query).length !== 0) {
        const searchTerm = this.query[this.keyLabel].toLowerCase();
        let dataToSearch = [...this.options]
        if (searchTerm !== '') {
          return dataToSearch.filter((options) => options[this.keyLabel].toLowerCase() === searchTerm)
        }

      }
      return this.options
    },
  },
  watch: {
    query(newValue) {
      if (Object.keys(newValue).length === 0) {
        this.selectedIndex = -1;
      }
    },
  },
  mounted() {
    console.log("this is the options on label", this.filteredOptions)
  }

}
</script>
<template>
  <div class="autocomplete_container">
    <div :class="['custom-autocomplete', disable ? 'disable_input' : '']">
      <input v-if="selectedOptions == null" v-model="query[keyLabel]" :data-tip="query[keyLabel]" type="text"
             @keyup.enter="onEnter" @keydown.up="onUp" @keydown.down="onDown" @focus="openOptionsList"
             :disabled="disable" @blur="closeOptionsList">
      <div class="action_container">
        <slot v-if="action_component" name="action_button"/>
        <button v-if="selectedOptions" @click="selectedOptions = null">
          <feather-icon icon="XIcon"/>
        </button>
        <button @click="openOption = !openOption" :disabled="disable">
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

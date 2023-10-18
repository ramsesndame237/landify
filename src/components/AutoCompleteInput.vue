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
    key_label: {
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
  methods: {
    getSelectionElement(item) {
      if (this.multiple) {
        this.selectedOptions.push(item)
      } else {
        console.log('this is the item', item)
        this.query = item
      }
      this.openOption = !this.openOption
    },
  },
}
</script>

<template>
  <div class="autocomplete_container">
    <div :class="['custom-autocomplete']">
      <input v-if="selectedOptions == null" v-model="query[key_label]" type="text" @focusout="openOption=false" @focusin="openOption = true" >
      <div class="action_container">
        <slot v-if="action_component" name="action_button"/>
        <button v-if="selectedOptions" @click="selectedOptions = null">
          <feather-icon icon="XIcon"/>
        </button>
        <button @click="openOption = !openOption">
          <feather-icon :icon="openOption ? icon_open : icon_close"/>
        </button>
      </div>
    </div>
    <transition name="slide-fade">
      <div v-if="openOption" :class="['rounded-sm', options.length ===0 ? 'options_container_2':'options_container']">
        <slot v-if="custom_options" name="options_components"/>
        <ul v-if="custom_options === false && options.length > 0">
          <li v-for="(option,index) in options" :key="index" @click="getSelectionElement(option)">
            {{ option[key_label] }}
          </li>
        </ul>
        <span v-if="options.length ===0">{{ $t(field_name) }} is not  available  </span>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" src="@/assets/scss/components/AutoCompleteInput.scss">

</style>

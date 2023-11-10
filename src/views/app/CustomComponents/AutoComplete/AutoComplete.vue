<template>
  <div
    ref="autoCompleteRef"
    class="position-relative"
    :style="{
      pointerEvents: disabled ? 'none' : undefined,
      opacity: disabled ? 0.5 : undefined,
      maxWidth: currentOption ? 'calc(100% - 10px)' : undefined
    }">
    <div class="d-flex align-items-center" style="gap: 8px">
      <button
        class="form-control py-0 autocomplete-input-container d-flex align-items-center"
        style="gap: 8px;"
        onclick="this.querySelector('input').focus()"
      >
        <feather-icon class="flex-shrink-0" size="16" icon="SearchIcon" />
        <div v-if="!showInput" class="text-left text-truncate w-100">
          {{
            currentOption && getOptionValue(currentOption) === value
              ? getOptionLabel(currentOption)
              : "No data selected"
          }}
        </div>
        <input
          v-model="inputValue"
          class="autocomplete-input overflow-hidden"
          :style="{ width: showInput ? undefined : 0 }"
          @focus="showOptions"
          @blur="hideOptions"
        >
        <b-spinner
          v-if="loading"
          class="flex-shrink-0"
          style="height: 12px; width: 12px;"
        />
      </button>
      <feather-icon
        v-if="currentOption"
        class="flex-shrink-0"
        size="16"
        icon="XIcon"
        @click="$emit('update:value', undefined); currentOption=null; onChange(undefined)"
      />
    </div>
    <Teleport to="body">
      <div
        class="position-fixed"
        :style="{
          left: `${rect.left}px`,
          top: `${rect.top + rect.height + 5}px`,
          width: `${rect.width + 20}px`,
          pointerEvents: showOptionsList ? 'auto' : 'none',
          opacity: showOptionsList ? 1 : 0,
          zIndex: 100,
        }">
        <div
          v-if="options.length === 0"
          class="shadow-sm d-flex flex-column justify-content-center align-items-center bg-white rounded-lg border py-2 px-1"
        >
          <feather-icon size="24" icon="SearchIcon" />
          <p class="mt-50">
            No data avalaible
          </p>
        </div>
        <ul v-else class="autocomplete-list shadow-sm rounded-lg">
          <li
            v-for="(option, index) in Array.isArray(options) ? options : []"
            :key="getOptionLabel(option) + getOptionValue(option) + index"
          >
            <button
              class="autocomplete-option"
              @mousedown="onOptionSelected(option)"
            >
              {{ getOptionLabel(option) }}
            </button>
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>

<script>
import Teleport from 'vue2-teleport'

export default {
  name: 'AutoComplete',
  components: {
    Teleport,
  },
  props: {
    url: {
      type: Function,
      default: () => '',
    },
    onChange: {
      type: Function,
      default: option => option,
    },
    getOptionLabel: {
      type: Function,
      default: option => option.label,
    },
    getOptionValue: {
      type: Function,
      default: option => option.value,
    },
    resolveData: {
      type: Function,
      default: data => data?.data,
    },
    value: {
      default: '',
      validator(value) {
        return typeof value === 'string' || typeof value === 'number'
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    alwaysResetOnFocus: {
      type: Boolean,
      default: false,
    },
    initialOption: {
      type: Object,
      default: null,
    },
    elementsToListenOn: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: [],
      showOptionsList: false,
      showInput: false,
      inputValue: '',
      timeoutId: null,
      rect: {},
      loading: false,
      currentOption: null,
    }
  },
  watch: {
    inputValue(val) { this.handleInputChange(val) },
    showInput(val) {
      if (val && (this.alwaysResetOnFocus || this.options?.length === 0)) {
        this.handleInputChange('')
      }
      this.setListPosition()
    },
  },
  created() {
    window.addEventListener('resize', this.onWindowResize)
    window.addEventListener('scroll', this.setListPosition)
    window.addEventListener('keydown', this.onEscapePressed)
    this.currentOption = this.initialOption || null
    if (this.elementsToListenOn) {
      this.elementsToListenOn.map(el => el.addEventListener('scroll', this.setListPosition))
    }
  },
  mounted() {
    this.setListPosition()
  },
  destroyed() {
    clearTimeout(this.timeoutId)
    window.removeEventListener('resize', this.onWindowResize)
    window.removeEventListener('keydown', this.onEscapePressed)
    window.removeEventListener('scroll', this.setListPosition)
    if (this.elementsToListenOn) {
      this.elementsToListenOn.map(el => el.removeEventListener('scroll', this.setListPosition))
    }
  },
  methods: {
    onOptionSelected(option) {
      this.$emit('update:value', this.getOptionValue?.(option))
      this.currentOption = option
      this.onChange(option)
    },
    setListPosition() {
      const rect = this.$refs.autoCompleteRef?.getBoundingClientRect() || {}
      this.rect = rect
    },
    onWindowResize() { this.setListPosition() },
    onEscapePressed(e) {
      if (this.showOptionsList && e.key === 'Escape') {
        this.hideOptions()
      }
    },
    async handleInputChange(keyword) {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(async () => {
        try {
          this.loading = true
          const { data } = await this.$http.get(this.url(this.inputValue), {
            params: {
              page: 1,
              per_page: 10,
              keyword,
            },
          })
          this.options = this.resolveData(data) || []
        } finally {
          this.loading = false
        }
      }, 500)
    },
    showOptions() { this.showOptionsList = true; this.showInput = true },
    hideOptions() { this.showOptionsList = false; this.showInput = false },
  },
}
</script>

<style lang="scss">
  .autocomplete-option {
    width: 100%;
    padding: 8px 20px;
    font-weight: 600;
    text-align: left;
  }
  .autocomplete-input {
    outline: none;
    border: none;
    background: transparent;
    display: block;
    width: 100%;
  }
  .autocomplete-list-container {
    border-radius: 10px;
    border: 1px solid var(--light);
  }
  .autocomplete-list {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    max-height: 200px;
    overflow-y: auto;
  }

  .autocomplete-list li {
    list-style: none;
    font-size: smaller;
  }

  .autocomplete-list button {
    border: none;
    background: var(--white);
    outline: none;
    text-align: left;
  }

  .autocomplete-list button:hover {
    border: none;
    background: var(--light);
    outline: none;
  }
</style>

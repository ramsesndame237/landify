<script>
export default {
  name: 'SelectedButtonList',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    keyObject: {
      type: String,
      default: '',
    },
    labelString: {
      type: String,
    },
    classes: {
      type: Array,
    },
  },
  data() {
    return {
      selectedOptions: [],
    }
  },
  mounted() {
    console.log('thisi sithe key', this.options)
  },

  methods: {
    getTeamSelected(value) {
      if (this.selectedOptions.includes(value[this.keyObject])) {
        this.selectedOptions = this.selectedOptions.filter(x => x !== value[this.keyObject])
      } else {
        this.selectedOptions.push(value[this.keyObject])
      }
      this.$emit('selectedOptions',this.selectedOptions,this.keyObject)
    },
  },
}
</script>

<template>
  <div>
    <b-button v-for="(item,index) in options" :key="index"
              pill
              :variant="selectedOptions.includes(item[keyObject || '']) ? 'primary' : 'secondary'" :class="['m-1 button_container',classes]" @click="getTeamSelected(item)">
      <span >
        {{ item[labelString] }}
      </span>
    </b-button>
  </div>
</template>

<style>
.button_container {
  max-width: 161px;
  min-width: 160px;
  overflow: hidden;
  white-space: nowrap;
  span{
    text-overflow: ellipsis;
  }

}

</style>

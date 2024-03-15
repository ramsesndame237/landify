<template>
  <component :is="getPageComponent" ref="edit" :key="$route.path"/>
</template>

<script>
import table from '@/table/index'
import Table from '@/table'
import Edit from '../Edit.vue'

export default {
  name: 'EditPage',
  components: { Edit },
  computed: {
    definition() {
      return table[this.$route.params.table]
    },
    getPageComponent() {
      // Call the customPage function and return its result
      return this.definition.customPage ? this.resolveComponent(this.definition.customPage) : 'edit'
    },
  },
  methods: {
    async resolveComponent(customPageFunction) {
      try {
        // Call the customPage function and await its result
        const component = await customPageFunction()
        // Ensure the returned component is valid
        if (typeof component === 'object' && typeof component.default === 'object') {
          return component.default
        }
        throw new Error('Invalid component returned by customPage function')
      } catch (error) {
        console.error('Error resolving customPage:', error)
        // Fallback to default component ('edit') in case of error
        return 'edit'
      }
    },
    async handleRouteChange(next) {
      console.log('before route leave', this)
      if (!this.$refs.edit.view && this.$refs.edit.$refs.form && this.$refs.edit.$refs.form.hasChanges()) {
        const result = await this.$swal({
          title: 'Are you sure you want to leave?',
          text: 'Your changes will be loosed',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        })
        if (result.value) next()
      } else {
        next()
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    to.meta.pageTitle = Table[to.params.table]?.title || `headline~${to.params.table}~list`
    to.meta.breadcrumb = [
      {
        text: to.params.table,
        to: { name: 'table', params: { table: to.params.table } },
        active: false,
      },
      {
        text: 'Details',
        active: true,
      },
    ]
    next()
  },
  beforeRouteUpdate(to, from, next) {
    // if it is tab update
    if (to.params.id === from.params.id) return next()
    this.handleRouteChange(() => {
      to.meta.pageTitle = Table[to.params.table]?.title || `headline~${to.params.table}~list`
      to.meta.breadcrumb = [
        {
          text: to.params.table,
          to: { name: 'table', params: { table: to.params.table } },
          active: false,
        },
        {
          text: 'Details',
          active: true,
        },
      ]
      next()
    })
  },
  beforeRouteLeave(to, from, next) {
    this.handleRouteChange(next)
  },
}
</script>

<style scoped>

</style>

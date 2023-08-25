<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form autocomplete="off" @submit.prevent="passes(submit)">
      <b-tabs ref="user_detail_tabs" v-model="tabIndex" pills card >
        <template v-for="(tab,idx) in tabsData">
          <b-tab :key="idx" class="pt-0">
            <template #title>
              <feather-icon size="18" :icon="tab.icon" />
              {{ tab.title }}
            </template>
            <template v-if="tab.contentType ===  contentType.form">
              <b-card-text>
                <b-row>
                  <b-col v-for="(field,index) in tab.content" :key="index" cols="12" :md="cols">
                    <field v-if="field && field.key" ref="fields" :disabled="loading || disabled || field.disabled || (!create && field.disableOnUpdate)"
                           :create="create" :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"/>
                  </b-col>
                </b-row>
              </b-card-text>
            </template>
            <template v-else-if="tab.contentType === contentType.component">
              <b-card-text class="text-right ">
                <MatrixTool />
              </b-card-text>
              <component :is="tab.content" v-bind="tab.contentProps" />
            </template>
          </b-tab>
        </template>
      </b-tabs>
    </b-form>
  </validation-observer>
</template>

<script>
import FormMixin from '@/views/app/Generic/FormMixin'
import Table from '@/table'
import MatrixTool from "@/views/app/Role/Relation/MatrixTool.vue";

export default {
  name: 'UserForm',
  components: {MatrixTool},
  mixins: [FormMixin],
  data() {
    return {
      tabIndex: 0,
      contentType: { component: 'component', form: 'form' },
      relation: {
        entityView: 'tablegroup',
      },
    }
  },
  async mounted() {
    this.$parent.removeBody(true)
    await this.$http.get('/users/select')
      .then(resp => {
        const data = resp.data
        const definition = { ...Table.user }
        // add data for select fields in store
        let index = definition.fields.findIndex(f => f.key === 'usertype_id') // usertype_id field
        this.$store.dispatch('table/setListData', { entity: definition.fields[index].list, data: data?.usertype })

        index = definition.fields.findIndex(f => f.key === 'function_id') // function_id field
        this.$store.dispatch('table/setListData', { entity: definition.fields[index].list, data: data?.function })

        index = definition.fields.findIndex(f => f.key === 'user_functions') // user_functions field
        this.$store.dispatch('table/setListData', { entity: definition.fields[index].list, data: data?.function })

        index = definition.fields.findIndex(f => f.key === 'customergroup_id') // customer_group field
        this.$store.dispatch('table/setListData', { entity: definition.fields[index].list, data: data?.customergroup })

        index = definition.fields.findIndex(f => f.key === 'partnergroup_id') // partner group field
        this.$store.dispatch('table/setListData', { entity: definition.fields[index].list, data: data?.partnergroup })
      })
      .catch(e => {
        console.error(e)
        this.$errorToast(e.response ? e.response.data?.detail : 'Unknow Error')
      })
  },
  computed: {
    tabsData() {
      return [
        {
          icon: 'UserIcon',
          title: 'Account',
          subtitle: 'Account detail',
          contentType: this.contentType.form,
          content: this.formFields.filter(field => !['permission'].includes(field.category)),
          errors: 0,
        },
        {
          icon: 'LockIcon',
          title: 'Permissions',
          subtitle: 'Dates of contract',
          contentType: this.contentType.component,
          contentProps: {entityId: this.entityId, relation: this.relation},
          content: () => import('@/views/app/Role/Relation/TableGroupMatrix.vue'),
          errors: 0,
        },

      ]
    },
  },

  methods: {
    getCountryField(formField) {
      return {...formField.find(f => f.key === 'country_id')}
    },
  },
}

</script>

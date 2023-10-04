<template>
  <transition name="fade" v-if="!userType">
    <div  class="h-100 d-flex align-items-center justify-content-center">
      <b-card v-for="(item,index) in userTypeArray" :class="[ 'cursor-pointer card_user_type',index % 2 !== 0 ? 'mx-2' : '']" @click="choseUserType(item.usertype_id)">
        <feather-icon icon="UserPlusIcon"></feather-icon>
        <span>
          {{item.usertype_name}}
        </span>
      </b-card>
    </div>
  </transition>

  <transition name="slide-fade" v-else>
    <validation-observer ref="form" v-slot="{ passes }">
      <b-form autocomplete="off" @submit.prevent="passes(submit)">
        <b-row>
          <b-col v-for="(field, index) in formFields" :key="index" cols="12" :md="field.cols || cols">
            <field v-if="field && field.key" ref="fields"
                   :disabled="loading || disabled || field.disabled || (!create && field.disableOnUpdate)"
                   :create="create" :inline="inline" :entity="entity" :table-definition="tableDefinition"
                   :field="field"/>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </transition>
</template>

<script>
import FormMixin from '@/views/app/Generic/FormMixin'
import Table from '@/table'
import _ from 'lodash'

export default {
  name: 'UserForm',
  mixins: [FormMixin],
  data: () => {
    return {
      userType: '',
      userTypeArray: [],
      teamUserArray:[]
    }
  },
  methods:{
    getCountryField(formField) {
      return {...formField.find(f => f.key === 'country_id')}
    },
    choseUserType(value){
      this.userType = value
      this.entity.usertype_id = value
    }
  },
  async mounted() {
    console.log("this is the entity", this.entity)
    if (this.$parent.removeBody) {
      this.$parent.removeBody(true)
    }
    await this.$http.get('/users/select')
      .then(resp => {
        const data = resp.data
        this.userTypeArray=data?.usertype
        const definition = {...Table.user}
        // add data for select fields in store
        let index = definition.fields.findIndex(f => f.key === 'usertype_id') // usertype_id field
        this.$store.dispatch('table/setListData', {entity: definition.fields[index].list, data: data?.usertype})

        index = definition.fields.findIndex(f => f.key === 'function_id') // function_id field
        this.$store.dispatch('table/setListData', {entity: definition.fields[index].list, data: data?.function})

        index = definition.fields.findIndex(f => f.key === 'user_functions') // user_functions field
        this.$store.dispatch('table/setListData', {entity: definition.fields[index].list, data: data?.function})

        index = definition.fields.findIndex(f => f.key === 'customergroup_id') // customer_group field
        this.$store.dispatch('table/setListData', {entity: definition.fields[index].list, data: data?.customergroup})

        index = definition.fields.findIndex(f => f.key === 'partnergroup_id') // partner group field
        this.$store.dispatch('table/setListData', {entity: definition.fields[index].list, data: data?.partnergroup})
      })
      .catch(e => {
        console.error(e)
        this.$errorToast(e.response ? e.response.data?.detail : 'Unknow Error')
      })
  },
}

</script>
<style lang="scss">
@import '@/assets/scss/variables/variables';
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.card_user_type{
  transition:all .5s ease-in-out ;
  &:hover{
    transform: scale(1.15);
    border: solid 0.5px $primary;
  }
}
</style>

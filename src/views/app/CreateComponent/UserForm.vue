<template>

  <div v-if="!userType">
    <h4>
      Choose user type
    </h4>
    <b-row class="mt-3">
      <b-col v-for="(item,index) in userTypeArray" cols="6">
        <b-card :class="[ 'cursor-pointer card_user_type',index % 2 !== 0 ? 'mx-2' : '']"
                @click="choseUserType(item)">
          <feather-icon icon="UserPlusIcon"/>
          <span>
            {{ item.usertype_name }}
          </span>
        </b-card>
      </b-col>

    </b-row>
  </div>

  <div v-else>
    <div class="mb-3">
      <feather-icon icon="ArrowLeftCircleIcon" size="20" class="mr-1 cursor-pointer" @click="userType = null"/>
      <span class="h4">
        Create {{ userType.usertype_name }} user
      </span>
    </div>
    <validation-observer ref="form" v-slot="{ passes }">
      <b-form autocomplete="off" @submit.prevent="passes(submit)">
        <b-row>
          <d-stepper ref="stepsComponent" :handle-action="actionHanler" :steps="Math.round(formFields.length / 6)"
                     @send-step-value="getActiveStep"/>
          <b-col v-for="(field, index) in formFilterFields" :key="index" cols="12" :md="field.cols || cols">
            <field v-if="field && field.key" ref="fields"
                   :disabled="loading || disabled || field.disabled || (!create && field.disableOnUpdate)"
                   :create="create" :inline="inline" :entity="entity" :table-definition="tableDefinition"
                   :field="field"/>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <b-row class="mt-3">
      <b-col v-for="(action,index) in [{action_id:'1', action_name:'Previous'}, {action_id: '2', action_name: 'Next'}]" :key="index" :class="[action.action_id === '2'||action.action_id === '3' ? 'd-flex aligns-items-end justify-content-end' : '']" >
        <b-button v-if="!(activeStep === 0 && action.action_id === '1')" @click="handleAction(action.action_id ==='1' ? 'back' : 'next')" >
          <span v-if="activeStep === (Math.round(formFields.length / 6) - 1) && action.action_id ==='2'" >
            save
          </span>
          <span v-else>
            {{ action.action_name }}
          </span>
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import FormMixin from '@/views/app/Generic/FormMixin'
// eslint-disable-next-line import/no-cycle
import Table from '@/table'
import DStepper from '@/components/Stepper.vue'

export default {
  name: 'UserForm',
  components: { DStepper },
  mixins: [FormMixin],
  data: () => ({
    userType: null,
    userTypeArray: [],
    formFilterFields: [],
    teamUserArray: [],
    activeStep: 0,
    actionHanler: '',
    keyArrayForm: [
      {
        labelStep: 0,
        children: ['user_firstname', 'user_email', 'user_password', 'user_firstname', 'user_lastname', 'user_abbreviation', 'user_password_reset_required'],
      },
      {
        labelStep: 1,
        children: ['role_id', 'function_id','customergroup_id', 'company_id', 'user_fix_phonenumber', 'user_fax_phonenumber', 'user_mobile'],
      },
      {
        labelStep: 2,
        children: ['team_id'],
      },
    ],
  }),
  async mounted() {
    if (this.$parent.removeBody) {
      this.$parent.removeBody(true)
    }
    await this.$http.get('/users/select')
      .then(resp => {
        const data = resp.data
        this.userTypeArray = data?.usertype
        const definition = { ...Table.user }
        // add data for select fields in store
        let index = definition.fields.findIndex(f => f.key === 'usertype_id') // usertype_id field
        this.$store.dispatch('table/setListData', {
          entity: definition.fields[index].list,
          data: data?.usertype,
        })

        index = definition.fields.findIndex(f => f.key === 'function_id') // function_id field
        this.$store.dispatch('table/setListData', {
          entity: definition.fields[index].list,
          data: data?.function,
        })

        index = definition.fields.findIndex(f => f.key === 'user_functions') // user_functions field
        this.$store.dispatch('table/setListData', {
          entity: definition.fields[index].list,
          data: data?.function,
        })

        index = definition.fields.findIndex(f => f.key === 'customergroup_id') // customer_group field
        this.$store.dispatch('table/setListData', {
          entity: definition.fields[index].list,
          data: data?.customergroup,
        })

        index = definition.fields.findIndex(f => f.key === 'partnergroup_id') // partner group field
        this.$store.dispatch('table/setListData', {
          entity: definition.fields[index].list,
          data: data?.partnergroup,
        })
      })
      .catch(e => {
        console.error(e)
        this.$errorToast(e.response ? e.response.data?.detail : 'Unknow Error')
      })
  },

  methods: {
    getCountryField(formField) {
      return { ...formField.find(f => f.key === 'country_id') }
    },
    choseUserType(value) {
      this.userType = value
      this.entity.usertype_id = value
    },
    getActiveStep(value) {
      console.log("this si the form field", this.formFields)
      const filterData = this.keyArrayForm.find(x => x.labelStep === value)
      this.formFilterFields = this.formFields.filter(x => filterData.children.includes(x.key))
      this.activeStep = value
      this.actionHanler = ''
    },
    handleAction(action) {
      this.actionHanler = action
    },
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

.card_user_type {
  transition: all .5s ease-in-out;

  &:hover {
    transform: scale(1.05);
    border: solid 0.5px $primary;
  }
}

</style>

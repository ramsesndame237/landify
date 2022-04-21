<template>
<div>
  <b-card>
    <b-row class="mb-2">
<!--      <b-col md="8">-->
<!--        Josue nya-->
<!--      </b-col>-->
      <b-col md="-8">
        <b-button variant="secondary" class="mr-1">Create new User</b-button>
        <b-button variant="primary">Cancel</b-button>
      </b-col>
    </b-row>
    <b-form>
      <b-row>
        <b-col cols="12" md="12">
          <b-form-group>
            <b-form-input readonly id="name" value="Josue NYA"/>
          </b-form-group>
        </b-col>
        <!-- Field: email -->
        <b-col cols="12" md="6">
          <b-form-group label="E-mail*" label-for="username" placeholder="Enter here...">
            <b-form-input id="username" v-model="user.name"/>
          </b-form-group>
        </b-col>

        <!-- Field: password -->
        <b-col cols="12" md="6">
          <b-form-group label="Password*" label-for="full-name" placeholder="Enter here...">
            <b-form-input id="full-name" v-model="user.name" type="email"/>
          </b-form-group>
        </b-col>
<!--        check box -->

        <!-- Field: Name -->
        <b-col cols="12" md="6">
          <b-form-group label="NAME*" label-for="name">
            <b-form-input id="nameu" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="First name" label-for="name">
            <b-form-input id="firstname" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="Name abbreviation*" label-for="name">
            <b-form-input id="abbreviation" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="Function" label-for="name">
            <b-form-input id="firstname" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="Customer Group*" label-for="name">
            <b-form-input id="customer-group" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="Contact person" label-for="name">
            <b-form-input id="contact-person" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="USER TYPE" label-for="name">
            <b-form-input id="user-type" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="Title" label-for="name">
            <b-form-input id="title" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

      </b-row>
    </b-form>
  </b-card>

  <databases :displayOption="false" />
</div>
</template>

<script>
const Databases = () => import('@/layouts/components/DataTables.vue')
import {
  BCard, BRow, BCol, BForm, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BRow,
    BFormGroup,
    BCol,
    BForm,
    BFormInput,
    BButton,
    Databases,
  },
  data() {
    return {
      user: [
        {
          id: 1,
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
      ],
      selected: 'first',
      options: [
        { text: 'Benutzer muss bei nachster Anmeldung sein Passwort andern', value: 'first', disabled: false },
        { text: 'Benutzer gesperrt', value: 'second', disabled: false },
      ],
      options2: [
        { text: 'Mr.', value: 'first2', disabled: false },
        { text: 'Ms.', value: 'second2', disabled: false },
      ],
    }
  },
}
</script>

<style scoped>

</style>
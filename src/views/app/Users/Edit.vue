<template>
<div>
  <b-card class="">
    <div class="header">
        <div class="first-bloc">
          <img src="../../../assets/images/icons/people.svg" alt="">
          <span>Benutzer anlegen</span>
        </div>
        <div>
          <b-button size="sm" variant="info" class="mr-1">Create new User</b-button>
          <b-button size="sm" variant="primary">Cancel</b-button>
        </div>
      </div>
    <b-form>
      <b-row>
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

  <b-card>
    <b-tabs pills>
        <b-tab title="Roles" active>
          <databases />
        </b-tab>
        <b-tab title="Customers">
          <databases />
        </b-tab>
        <b-tab title="Equipe">
          <databases />
        </b-tab>
        <b-tab title="Point de vente">
          <databases />
        </b-tab>
        <b-tab title="Partner">
          <databases />
        </b-tab>

    </b-tabs>
  </b-card>
</div>
</template>

<script>
const Databases = () => import('@/layouts/components/DataTables.vue')
import {
  BCard, BCardText, BTab, BTabs, BRow, BCol, BForm, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BCardText,
    BCard,
    BTab,
    BTabs,
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
@import '../../../assets/scss/pages/page-users.scss';
</style>
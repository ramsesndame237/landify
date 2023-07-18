<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <img class="mr-1" src="@/assets/images/icons/people.svg" alt="">
          <span>{{ $t("headline~user~detail") }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex align-items-center">
            <template v-if="$can('update', 'user')">
              <b-button v-if="view" size="sm" variant="info" class="mr-1" @click="edit">
                <feather-icon icon="EditIcon" class="mr-50"/>
                {{ $t('button~edit') }}
              </b-button>
              <b-button v-else size="sm" variant="info" class="mr-1" @click="update" :disabled="loading">
                <b-spinner v-if="loading" small class="mr-50"/>
                <feather-icon v-else icon="SaveIcon" class="mr-50"/>
                {{ $t('button~save') }}
              </b-button>
            </template>
            <b-button v-if="!view" size="sm" variant="primary" @click="cancel">
              {{ $t('button~cancel') }}
            </b-button>
          </div>
        </div>
      </div>
    </b-card>
    <validation-observer ref="form" v-slot="{passes}">
      <b-form @submit.prevent="passes(save)" autocomplete="off">
        <b-overlay :show="loading">
          <b-card>
                <b-row>
                  <b-col
                    v-for="(field, index) in formFields.filter(f => f.key.includes('address') || f.key.includes('email') || f.key.includes('name'))"
                    :key="index" cols="12"
                    md="6"
                  >
                    <field
                      ref="fields"
                      :disabled="view || field.disabled || field.disableOnUpdate"
                      :field="field"
                      :entity="entity"
                      :inline="false"
                      table="user"
                      :table-definition="tableDefinition"
                    />
                  </b-col>
                </b-row>
          </b-card>
        </b-overlay>
      </b-form>
    </validation-observer>
  </div>


</template>

<script>
import FormMixin from '@/views/app/Generic/FormMixin'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: "UserProfileForm",
  mixins: [FormMixin],

  props: ['isView'],
  data(){
    return {
      view: this.isView
    }
  },


  methods: {
    cancel() {
      this.view = true
      this.$refs.form.reset()
    },
    edit() {
      this.view = false
    },

    async update(){
      const validated = await this.$refs.form.validate()
      if (validated)
        this.save()
      else
        return
    },
    async save() {
      this.loading = true
      const data = {
        user_firstname: this.entity.user_firstname,
        user_lastname: this.entity.user_lastname,
        user_email: this.entity.user_email,
      }
      const addressField = this.$refs.fields.find(f => f.field.key === 'address_id')
      data.address = structuredClone(addressField.subEntity)
      const cityField = addressField.getSubFields().find(f => f.field.key === 'city_id')
      data.address.city = structuredClone(cityField.subEntity)
      console.log('data: ', data);

      await this.$http.put("/users/update/profile", data)
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Profile updated',
              icon: 'BellIcon',
              variant: 'success'
            },
          })
        })
        .catch(()=>{
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Error when update your profile',
              icon: 'BellIcon',
            },
          })
        })
        .finally(()=>{
          this.loading = false
        })
    },
  }

}
</script>

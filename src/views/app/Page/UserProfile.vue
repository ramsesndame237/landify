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

    <!-- user infos -->
    <validation-observer ref="form" v-slot="{passes}">
      <b-form @submit.prevent="passes(emitSubmit)" autocomplete="off">
        <!-- main infos -->
        <b-overlay :show="loading">
          <b-card>
                <b-row>
                  <b-col
                    v-for="(field, index) in formFields"
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

    <validation-observer ref="passwordForm">

      <b-form @submit.prevent autocomplete="off">
        <!-- change password -->
        <!-- <b-overlay :show="loading"> -->
          <b-card>
            <b-row>

              <!-- old password-->
              <b-col cols="12">
                <b-form-group label="Enter your old password">
                  <validation-provider
                    #default="{ errors }"
                    name="OldPassword"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : null"
                    >
                      <b-input-group-prepend is-text>
                        <feather-icon class="cursor-pointer" icon="LockIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="oldPassword"
                        v-model="oldPassword"
                        :type="passwordFieldType"
                        name="old-password"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Old Password"
                      />

                      <b-input-group-append is-text>
                        <feather-icon
                          class="cursor-pointer"
                          :icon="passwordToggleIcon"
                          @click="togglePasswordVisibility"
                        />
                      </b-input-group-append>
                    </b-input-group>

                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- end old passsword -->

                <!-- new password -->
                <b-col md="6" cols="12">
                  <b-form-group label="Enter your new password">
                    <validation-provider
                      #default="{ errors }"
                      name="Password"
                      vid="confirmPass"
                      rules="required"
                    >
                      <b-input-group
                        class="input-group-merge"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                      >
                        <b-input-group-prepend is-text>
                          <feather-icon class="cursor-pointer" icon="LockIcon" />
                        </b-input-group-prepend>
                        <b-form-input
                          id="password"
                          v-model="password"
                          class="form-control-merge"
                          :type="newPasswordFieldType"
                          :state="errors.length > 0 ? false : null"
                          name="password"
                          placeholder="New Password"
                        />

                        <b-input-group-append is-text>
                          <feather-icon
                            class="cursor-pointer"
                            :icon="newPasswordToggleIcon"
                            @click="toggleNewPasswordVisibility"
                          />
                        </b-input-group-append>
                      </b-input-group>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <!-- end new password -->

                <!-- confirm new password -->
                <b-col md="6" cols="12">
                  <b-form-group label="Confirm your new password">
                    <validation-provider
                      #default="{ errors }"
                      name="PasswordConfirm"
                      rules="required|confirmed:confirmPass"
                    >
                      <b-input-group
                        class="input-group-merge"
                        :class="errors.length > 0 ? 'is-invalid' : null"
                      >
                        <b-input-group-prepend is-text>
                          <feather-icon class="cursor-pointer" icon="LockIcon" />
                        </b-input-group-prepend>
                        <b-form-input
                          id="passwordConfirm"
                          v-model="passwordConfirm"
                          type="password"
                          class="form-control-merge"
                          :state="errors.length > 0 ? false : null"
                          name="confirm-password"
                          placeholder="Confirm Password"
                        />


                      </b-input-group>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <!-- end confirm new password -->

            </b-row>
            <b-button size="sm" variant="primary" type="submit" class="mr-1" @click="updatePassword" :disabled="changePassLoading">
              <b-spinner v-if="changePassLoading" small class="mr-50"/>
              <feather-icon v-else icon="SaveIcon" class="mr-50"/>
              {{ $t('button~save_password') }}
            </b-button>
          </b-card>
        <!-- </b-overlay> -->

      </b-form>

    </validation-observer>


  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

import {
  BForm, BFormGroup, BFormInput,BButton, BSpinner,BRow,BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
} from "bootstrap-vue"
import Tables from '@/table'
import { required } from "@validations";

import { togglePasswordVisibility } from "@core/mixins/ui/forms"
import Field from '@/views/app/Generic/Field.vue'
import ToastificationContent from "@core/components/toastification/ToastificationContent";


export default {
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BButton,
    BSpinner,
    BRow,
    Field,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data(){
    return {
      view: this.$route.query.edit !== 'true',
      loading: false,
      changePassLoading: false,
      entityLoaded: false,
      originalEntity: {},
      definition: Tables.user,
      entity: { },
      entityId: this.getEntityId(),
      create: false,
      table: "user",
      oldPassword: "",
      password: "",
      passwordConfirm: "",
      //validation rules
      required,
    }
  },

  computed: {
    formFields(){
      return  this.definition.fields
        .filter(f => !f.hideOnForm && !f.hideOnUpdate && !f.hideOnCreate && f.key.includes("address") || f.key.includes('email') || f.key.includes("name"))
        .map(field => {
          if (typeof field === 'string') return { key: field }
          return field
        })
    },

    tableDefinition() {
      return this.$store.getters['table/tableDefinition']("user")
    },

    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    newPasswordToggleIcon() {
      return this.newPasswordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },

  },

  async mounted() {
    if (!this.tableDefinition) {
      this.loadDefinition()
    }
    // fetch data
    this.loading = true
    const entity = await this.definition.fetch(this)
    if (!entity) {
      this.$errorToast(`The entity with the id "${this.entityId}" doesnt exists`)
    } else {
      this.setData(entity)
    }
    this.loading = false
    // end fetch data
    this.entityLoaded = true
    this.originalEntity = { ...this.entity }
    console.log('mounted', this.entity)
    // if (!this.definition.fetch) await this.fillRelations(this.entity, this.originalEntity, this.formFields, "user", this.getPrimaryKey(this.definition))
  },

  methods: {
    cancel() {
      this.view = true
      this.$refs.form.reset()
    },
    edit() {
      this.view = false
    },
    update() {
      this.loading = true
      this.$refs.form.submit()
        // .then(data => {
        //   this.view = true
        //   if (this.create) {
        //     console.log('data', data)
        //     this.$router.push({ name: 'table-view', params: { id: data[this.primaryKey] }, query: { edit: true } })
        //   }
        //   this.$store.commit('table/deleteTableCacheKeyFromPrefix', this.table + '-')
        // })
        // .finally(() => {
        //   this.loading = false
        // })
    },
    updatePassword(){
      this.$refs.passwordForm.validate().then((success) => {
        if (success) {
          const data = {
            old_password: this.oldPassword,
            new_password: this.password,
          };
          const userId = JSON.parse(localStorage.getItem("userData")).user_id
          this.changePassLoading = true;
          this.$http
            .put(`/users/${userId}/password`, data)
            .then(async (resp) => {
              if (!resp.data.user_token) {
                this.message = this.$t(resp.data.message);
                this.show = false;
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Password changed',
                    icon: 'successIcon',
                    variant: 'success',
                  },
                })
              }
            })
            .catch((e) => {
              let title;
              if (e.response) {
                title = e.response.data.detail;
              }
              this.$errorToast(this.$t(title));
            })
            .finally(() => (this.changePassLoading = false));
        }
      });
    },
    emitSubmit() {
      this.$emit('submit')
    },
    getEntityId(){
      return JSON.parse(localStorage.getItem('userData')).user_id
    },
    async loadDefinition() {
      const { data } = await this.$api({
        action: 'read-rich',
        entity: this.table,
      })
      this.$store.commit('table/setDefinition', {
        data,
        table: "user"
      })
    },
    getPrimaryKey(definition) {
      return definition.primaryKey ?? definition.fields.find(f => f.auto)?.key
    },
    setData(entity) {

      this.entity = {
        ...this.entity,
        ...this.definition.default,
        ...this.definition.fields
          .filter(field => field.type !== 'password')
          .filter(field => entity[field.key] != null)
          .reduce((a, field) => ({
            ...a,
            [field.key]: entity[field.key],
          }), {}),
      }
    },

    fillRelations(entity, originalEntity, formFields, table, primaryKey) {
      return Promise.all(formFields.filter(field => field.type === 'list' && field.relationEntity !== false)
        .map(async field => {
          console.log("Fill relations", field, table, primaryKey, entity)
          if (entity[field.key] == null) {
            await this.$api({
              entity: field.relationEntity ?? (`${table}_${field.list}_rel`),
              action: 'read-rich',
              data: [{
                [primaryKey]: `${entity[primaryKey]}`,
              }],
            })
              .then(({ data }) => {
                const result = data.data.data[0]
                if (field.multiple) {
                  this.$set(entity, field.key, data.data.data.map(r => r[field.key]))
                  this.$set(originalEntity, field.key, data.data.data.map(r => r[field.key]))
                  return
                }
                if (!result) return
                this.$set(entity, field.key, result[field.key])
                this.$set(originalEntity, field.key, result[field.key])
                if (field.with) {
                  (typeof field.with === 'string' ? [field.with] : field.with).forEach(val => {
                    this.$set(entity, val, result[val])
                  })
                }
              })
          }
          if (field.alwaysNew) {
            const component = this.getFieldComponents().find(f => f.field === field)
            if (!component) return
            const { subDefinition } = component
            this.getFormFields(subDefinition)
              .forEach(f => {
                if (this.initialData[f.key]) {
                  this.$set(component.subEntity, f.key, this.initialData[f.key])
                  this.$set(component.subOriginalEntity, f.key, this.initialData[f.key])
                }
              })
            return this.fillRelations(component.subEntity, component.subOriginalEntity, this.getFormFields(subDefinition), field.list, this.getPrimaryKey(subDefinition))
          }
        }))
    },
    getFormFields(definition) {
      return definition.fields.filter(f => !f.hideOnForm && (this.create || !f.hideOnUpdate) && (!this.create || !f.hideOnCreate))
        .map(field => {
          if (typeof field === 'string') return { key: field }
          return field
        })
    },
  }


}
</script>

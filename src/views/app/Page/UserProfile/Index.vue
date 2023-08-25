<template>
  <div>

    <user-profile
      table="user"
      :definition="definition"
      :create="create"
      :entity-id="entityId"
      :is-view="true"
    />

    <validation-observer ref="passwordForm">

      <b-form autocomplete="off" @submit.prevent>
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
          <b-button size="sm" variant="primary" type="submit" class="mr-1" :disabled="changePassLoading" @click="updatePassword">
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BForm, BFormGroup, BFormInput, BButton, BSpinner, BRow, BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
} from 'bootstrap-vue'
import Tables from '@/table'
import { required } from '@validations'

import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import Field from '@/views/app/Generic/Field.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import UserProfile from './UserProfile.vue'

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
    UserProfile,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      loading: false,
      changePassLoading: false,
      originalEntity: {},
      definition: Tables.user,
      entity: { },
      entityId: this.getEntityId(),
      create: false,
      table: 'user',
      oldPassword: '',
      password: '',
      passwordConfirm: '',
      // validation rules
      required,
    }
  },

  computed: {

    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    newPasswordToggleIcon() {
      return this.newPasswordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },

  },

  methods: {

    updatePassword() {
      this.$refs.passwordForm.validate().then(success => {
        if (success) {
          const data = {
            old_password: this.oldPassword,
            new_password: this.password,
          }
          const userId = JSON.parse(localStorage.getItem('userData')).user_id
          this.changePassLoading = true
          this.$http
            .put(`/users/${userId}/password`, data)
            .then(async resp => {
              if (!resp.data.user_token) {
                this.message = this.$t(resp.data.message)
                this.show = false
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
            .catch(e => {
              let title
              if (e.response) {
                title = e.response.data.detail
              }
              this.$errorToast(this.$t(title))
            })
            .finally(() => (this.changePassLoading = false))
        }
      })
    },
    emitSubmit() {
      this.$emit('submit')
    },
    getEntityId() {
      return JSON.parse(localStorage.getItem('userData')).user_id
    },

  },

}
</script>

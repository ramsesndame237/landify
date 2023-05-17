// We haven't added icon's computed property because it makes this mixin coupled with UI
export const togglePasswordVisibility = {
  data() {
    return {
      passwordFieldType: 'password',
      newPasswordFieldType: 'password',
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    toggleNewPasswordVisibility() {
      this.newPasswordFieldType = this.newPasswordFieldType === 'password' ? 'text' : 'password'
    },
  },
}

export const _ = null

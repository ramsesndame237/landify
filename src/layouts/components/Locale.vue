<template>
  <b-nav-item-dropdown id="dropdown-grouped" variant="link" class="dropdown-language" right>
    <template #button-content>
      <b-img :src="currentLocale.img" height="14px" width="22px" :alt="currentLocale.locale"/>
      <span class="ml-50 text-body">{{ currentLocale.name }}</span>
    </template>
    <b-dropdown-item v-for="localeObj in locales" :key="localeObj.locale" @click="switchLocale(localeObj.locale)">
      <b-img :src="localeObj.img" height="14px" width="22px" :alt="localeObj.locale"/>
      <span class="ml-50">{{ localeObj.name }}</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { BNavItemDropdown, BDropdownItem, BImg } from 'bootstrap-vue'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BImg,
  },
  // ! Need to move this computed property to comp function once we get to Vue 3
  computed: {
    currentLocale() {
      return this.locales.find(l => l.locale === this.$i18n.locale)
    },
  },
  methods: {
    switchLocale(locale) {
      localStorage.setItem('current-lang', locale)
      window.location.reload()
    },
  },
  setup() {
    /* eslint-disable global-require */
    const locales = [
      {
        locale: 'en',
        img: require('@/assets/images/flags/en.png'),
        name: 'English',
      },
      {
        locale: 'fr',
        img: require('@/assets/images/flags/fr.png'),
        name: 'French',
      },
      {
        locale: 'de',
        img: require('@/assets/images/flags/de.png'),
        name: 'German',
      },
    ]
    /* eslint-disable global-require */

    return {
      locales,
    }
  },
}
</script>

<style>

</style>

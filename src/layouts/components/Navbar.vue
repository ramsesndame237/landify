<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21"/>
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block"/>
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <Locale/>

      <!--      <svg class="mr-1" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--        <path-->
      <!--          d="M16.7303 19.036L10.8946 15.4557L5.12289 18.997L6.69512 12.4435L1.438 8.0678L8.24525 7.59794L10.7681 1.35227L13.4029 7.61528L20.2189 8.13101L15.0401 12.4716L16.7303 19.036Z"-->
      <!--          fill="#686C72" stroke="#686C72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
      <!--      </svg>-->

      <!--      <svg class="mr-1" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--        <path fill-rule="evenodd" clip-rule="evenodd"-->
      <!--              d="M10.1392 0.125C15.7389 0.125 20.2785 4.66503 20.2785 10.2642C20.2785 15.8639 15.7385 20.4035 10.1392 20.4035C4.53958 20.4035 0 15.8635 0 10.2642C0 4.66458 4.54003 0.125 10.1392 0.125ZM7.86927 12.4587C9.15569 10.0374 12.6365 5.79981 14.9061 5.11903C16.7978 4.51371 17.1761 6.63236 16.1925 7.01077C11.5008 9.28073 9.38246 14.8044 8.47446 16.0152C7.79337 16.8476 6.58272 16.4692 6.4314 15.7126C4.61544 9.81052 4.38835 11.9291 3.78302 10.7185C2.87502 9.05388 6.12876 7.69188 7.86914 12.4589L7.86927 12.4587Z"-->
      <!--              fill="#686C72"/>-->
      <!--      </svg>-->

      <svg class="mr-1" width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.2786 0.507853H19.2421L18.946 1.59373C18.6992 2.58076 17.7367 3.32114 16.7497 3.32114C16.2067 3.32114 15.6886 3.09908 15.3923 2.67956C15.0715 2.26006 14.9728 1.69253 15.1209 1.14957L15.2937 0.507985L11.9619 0.507812L11.6659 1.59369C11.3944 2.58072 10.4566 3.3211 9.44493 3.3211C8.90201 3.3211 8.40845 3.09904 8.08759 2.67952C7.76674 2.26 7.66809 1.69249 7.81613 1.14953L7.98896 0.507945H6.90308C5.24966 0.507945 3.59628 1.79124 3.17675 3.44467L0.116459 14.7225C-0.130391 15.6109 0.0178221 16.4993 0.535963 17.1409C1.02948 17.7825 1.7945 18.1528 2.65827 18.1528H4.16363V18.8191C4.16363 20.5713 5.59495 22.0025 7.347 22.0025H20.2783C22.0305 22.0025 23.4616 20.5711 23.4616 18.8191L23.4618 3.69149C23.4618 1.93927 22.0305 0.507945 20.2784 0.507945L20.2786 0.507853ZM2.68315 16.2277C2.48571 16.2277 2.23904 16.1783 2.09084 15.9809C1.9428 15.8081 1.91801 15.5368 2.01682 15.2405L4.53402 5.81351H19.8837L17.49 14.7469C17.2679 15.5613 16.4041 16.2523 15.6145 16.2523L2.68321 16.2525L2.68315 16.2277ZM21.5371 18.8188C21.5371 19.5098 20.9696 20.0773 20.2786 20.0773L7.37202 20.0775C6.68103 20.0775 6.11348 19.5099 6.11348 18.819V18.1526H15.6145C17.2679 18.1526 18.9213 16.8693 19.3408 15.2159L21.5372 7.04747L21.5371 18.8188Z"
          fill="#686C72"/>
      </svg>
      <notification-dropdown/>
      <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
        <template #button-content>
          <!--          <b-avatar size="40" variant="light-primary" badge :src="require('@/assets/images/avatars/13-small.png')"-->
          <!--                    class="badge-minimal" badge-variant="success"/>-->
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ userData.user_email }}
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 7L0.803848 0.25H11.1962L6 7Z" fill="#888888"/>
              </svg>
            </p>
          </div>
        </template>

        <b-dropdown-item link-class="d-flex align-items-center"
                         :to="{name: 'user-profile', params: {table: 'user'}}">
          <feather-icon size="16" icon="UserIcon" class="mr-50"/>
          <span> {{ $t('header~profile') }} </span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center" :to="{name: 'comming-soon'}">
          <feather-icon size="16" icon="MailIcon" class="mr-50"/>
          <span>{{ $t('header~inbox') }} </span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center" :to="{name: 'table', params: {table: 'ticket'}}">
          <feather-icon size="16" icon="CheckSquareIcon" class="mr-50"/>
          <span>{{ $t('header~tasks') }} </span>
        </b-dropdown-item>

        <!--        <b-dropdown-item link-class="d-flex align-items-center">-->
        <!--          <feather-icon size="16" icon="MessageSquareIcon" class="mr-50"/>-->
        <!--          <span>{{ $t('app.navbar.chat') }} </span>-->
        <!--        </b-dropdown-item>-->

        <b-dropdown-divider/>

        <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
          <feather-icon size="16" icon="LogOutIcon" class="mr-50"/>
          <span>{{ $t('header~logout') }} </span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BImg, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import useJwt from '@/auth/jwt/useJwt'
import { initialAbility } from '@/libs/acl/config'
import Locale from './Locale.vue'
import NotificationDropdown from "@core/layouts/components/app-navbar/components/NotificationDropdown.vue";

export default {
  components: {
    NotificationDropdown,
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BImg,
    Locale,
    // Navbar Components
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {
      },
    },
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  methods: {
    async logout() {
      try {
        await useJwt.logout()
      } finally {
        // Redirect to login page
        await this.$router.push({ name: 'auth-login' })
      }
    },
  },
}
</script>

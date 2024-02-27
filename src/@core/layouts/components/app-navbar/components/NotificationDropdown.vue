<template>
  <b-nav-item-dropdown
    class="dropdown-notification mr-25"
    menu-class="dropdown-menu-media"
    right
  >
    <template #button-content>
      <feather-icon
        :badge="newNotification"
        badge-classes="bg-danger"
        class="text-body"
        icon="BellIcon"
        size="21"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header" v-if="newNotification > 0">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">
          Notifications
        </h4>
        <b-badge
          pill
          variant="light-primary"
        >
          {{ newNotification }} New
        </b-badge>
      </div>
    </li>

    <div  class="scrollable-container media-list scroll-area overflow-y-scroll overflow-x-scroll">
      <div
        v-for="(notification,index) in notifications"
        :key="index"
        class="relative cursor-pointer"
      >

        <feather-icon icon="MailIcon" class="position-absolute"/>

        <b-media>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ current_lang == 'en' ?  notification.payload_json.title.en: current_lang ==='de' ? notification.payload_json.title.de : current_lang === 'fr' ? notification.payload_json.title.fr : notification.payload_json.title.en  }}
            </span>
          </p>
          <small class="notification-text">{{ urrent_lang == 'en' ?  notification.payload_json.content.en: current_lang ==='de' ? notification.payload_json.content.de : current_lang === 'fr' ? notification.payload_json.content.fr : notification.payload_json.title.en }}</small>
        </b-media>
      </div>
    </div>

    <!-- Cart Footer -->
    <li class="dropdown-menu-footer">
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        block
      >Read all notifications
      </b-button>
    </li>
  </b-nav-item-dropdown>
</template>

<script>
import {BAvatar, BBadge, BButton, BFormCheckbox, BLink, BMedia, BNavItemDropdown,} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BAvatar,
    VuePerfectScrollbar,
    BButton,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  data: () => {
    return {
      notifications: [],
      newNotification: 0,
      intervalId: null,
      current_lang:'en',
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
        wheelPropagation: false,
      }

    }
  },
  created() {
    this.current_lang = localStorage.getItem('current-lang')
    this.getNumberUnreadedNotification()
    this.getAllNotification()
  },
  beforeDestroy() {
    this.clearInterval()
  },
  methods: {
    getNumberUnreadedNotification() {
      this.$http.get('/notifications/unread/count').then((response) => {
        this.newNotification = response.data
      }).catch((error) => {
        console.error(error.messages)
      })
    },
    getAllNotification() {
      this.$http.get('/notifications').then((response) => {
        this.notifications = response.data
      }).catch((error) => {
        console.error(error.messages)
      })
    },
    getUnReadedNotification() {
      this.$http.get('/notifications/unread').then((response) => {
        console.log("this is the response", response)
        this.notifications = response.data
      }).catch((error) => {
        console.error(error.messages)
      })
    },
    notoficationFetchLogic(delay) {
      console.log("this is the delay",delay)
      this.intervalId = setInterval(() => {
        this.getNumberUnreadedNotification()
        // this.getUnReadedNotification()
        this.getAllNotification()
      }, delay)
    },
    clearInterval() {
      clearInterval(this.intervalId)
    }
  },
  mounted() {
    // this.notoficationFetchLogic(50000)

  }

}
</script>

<style>

</style>

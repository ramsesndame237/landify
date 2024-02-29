<template>
  <b-nav-item-dropdown
    class="dropdown-notification mr-25 "
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
    <b-spinner label="Spinning" class="m-2 text-primary" size="lg" v-if="loadingNotificaton"></b-spinner>
    <div class="scrollable-container media-list scroll-area overflow-y-scroll overflow-x-scroll"
         v-if="!loadingNotificaton">
      <div
        v-for="(notification,index) in notifications"
        :key="index"
        class="relative cursor-pointer"
        @click="$router.push(`/app/table/ticket/view/${notification.payload_json.ticket_id}`)"
        @mouseenter="notificationAction = notification.id"
      >
        <div v-if="notification.id === notificationAction"
             class="position-absolute position-right-0 position-top-2 d-flex ">
          <b-avatar v-if="notification.read === 0" v-b-tooltip.hover :title="$t('translate~key~mark~read')"
                    :class="['mx-2',notification.read === 0 ? 'bg-primary':'']"
                    size="sm"
                    @click.native="markedNotificationAsRead(notification.id)">
            <feather-icon size="10" :icon="notification.read === 0 ?  'MailIcon' : 'BookOpenIcon'"
                          class="position-absolute"/>
          </b-avatar>
          <b-avatar v-b-tooltip.hover title="Delete notification"
                    :class="[notification.read === 0 ? 'bg-primary':'']"
                    size="sm"
                    @click.native="deleteNotification(notification.id)">
            <feather-icon size="10" icon="TrashIcon"
                          class="position-absolute"/>
          </b-avatar>

        </div>
        <b-media>
          <p class="media-heading text-ellipsis overflow-hidden" style="max-height: 80px">
            <span class="font-weight-bolder">
              {{
                current_lang == 'en' ? notification.payload_json.title.en : current_lang === 'de' ? notification.payload_json.title.de : current_lang === 'fr' ? notification.payload_json.title.fr : notification.payload_json.title.en
              }}
            </span>
          </p>
          <small class="notification-text text-ellipsis overflow-hidden  " style="max-height:100px;">{{
              urrent_lang == 'en' ? notification.payload_json.content.en : current_lang === 'de' ? notification.payload_json.content.de : current_lang === 'fr' ? notification.payload_json.content.fr : notification.payload_json.content.en
            }}</small>
        </b-media>
      </div>
    </div>

    <!-- Cart Footer -->
    <li class="dropdown-menu-footer d-flex overflow-hidden">
      <b-button
        class="mx-1"
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="warning"

        @click="() => markedNotificationAsRead(undefined) "
      >{{ $t('translate~key~read~all~notification') }}
      </b-button>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"

        @click="() => deleteNotification(undefined) "
      >${{$t('translate~key~delete~all~notification')}}
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
      notificationAction: null,
      intervalId: null,
      current_lang: 'en',
      loadingNotificaton: false,
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
    deleteNotification(id_notification) {
      if (id_notification) {
        return this.$http.delete('/notifications', {
          data: {"notification_id": id_notification}
        }).then((response) => {
          this.$successToast(response.data.message || 'delete success')
          this.getAllNotification()
          this.getNumberUnreadedNotification()
        }).catch((error) => {
          console.error(error)
        })
      }
      this.$http.delete('/notifications', {
        data: {"notification_id": 'ALL'}
      }).then((response) => {
        console.log("this isht response", response)
        this.$successToast(response.data.message)
      }).catch((error) => {
        console.error(error)
      })

    },
    markedNotificationAsRead(id_notification) {
      if (id_notification) {
        return this.$http.post('/notifications', {"notification_id": id_notification}).then((response) => {
          console.log("thios is the response of the mark read notification", response)
          this.$successToast(response.data.message)
          this.getAllNotification()
          this.getNumberUnreadedNotification()
        }).catch((error) => {
          console.error(error)
        })
      }

      this.$http.post('/notifications', {"notification_id": 'ALL'}).then((response) => {
        console.log("this isht response", response)
        this.$successToast(response.data.message)
      }).catch((error) => {
        console.error(error)
      })
      this.getAllNotification()
      this.getNumberUnreadedNotification()
    },
    getAllNotification() {
      this.loadingNotificaton = true
      this.$http.get('/notifications').then((response) => {
        this.notifications = response.data
        this.loadingNotificaton = false
      }).catch((error) => {
        this.loadingNotificaton = false
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
      console.log("this is the delay", delay)
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
    setInterval(() => {
      this.getNumberUnreadedNotification()
    }, 10000)

  }

}
</script>

<style>

</style>

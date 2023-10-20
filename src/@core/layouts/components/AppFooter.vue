<template>
  <div class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      COPYRIGHT © {{ new Date().getFullYear() }}
      <b-link class="ml-25" href="https://www.digitalsuxess.de/" target="_blank">
        DSAG
      </b-link>
      <span class="d-none d-sm-inline-block">, All rights Reserved</span>
    </span>

    <div class="float-md-right d-none d-md-block">
      <span class="text-danger animate__animated animate__flash animate__infinite" v-if="hashChanged">An update is available, Please refresh</span>
      <b-button class="mx-1 btn-icon" variant="flat-primary" title="Clear Cache" @click="hardRefresh">
        <feather-icon icon="RefreshCcwIcon"/>
      </b-button>
      <span>#{{ buildTime }}</span>
    </div>
  </div>
</template>

<script>
import { BLink } from 'bootstrap-vue'
import { mapState } from 'vuex'
import axios from 'axios'
import moment from "moment";
import 'animate.css';


export const refreshPageMixin = {
  data() {
    return {
      currentHash: this.$root.hash,
      hashChanged: false,
      newHash: '',
      interval: null
    }
  },
  methods: {
    initVersionCheck(url, frequency = 1000 * 60) {
      this.interval = setInterval(() => {
        this.checkVersion(url);
      }, frequency);
      this.checkVersion(url)
    },
    async checkVersion(url) {
      try {
        const fileResponse = await axios.create({
          headers: {
            'Content-type': 'application/json'
          }
        }).get(url + '?t=' + new Date().getTime());

        this.newHash = fileResponse.data.hash;

        this.hashChanged = this.hasHashChanged(this.currentHash, this.newHash);
      } catch (error) {
        this.loading = false;
        if (!error.response) {
          this.errorStatus = 'Error: Network Error'
        } else {
          this.errorStatus = error.response.data.message;
        }
      }
    },
    hasHashChanged(currentHash, newHash) {
      console.log('hash diff',currentHash, newHash)
      return currentHash !== newHash;
    }
  }
};

export default {
  mixins: [refreshPageMixin],
  components: {
    BLink,
  },
  data() {
    return {
      buildTime: moment(process.env.VUE_APP_BUILD_TIME).format('DD HH:mm'),
    }
  },
  computed: {},
  methods: {
    hardRefresh() {
      localStorage.removeItem('app-data')
      window.location.reload()
    },
  },
  mounted() {
    // online environment
    if (process.env.VUE_APP_BASE_URL) {
      this.initVersionCheck('/version.json')
    }
  },
  beforeDestroy() {
    if (this.interval) clearInterval(this.interval)
  }
}
</script>


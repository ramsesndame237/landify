<script>

import { getUserData, setUserDataConfigsByKey } from '@/auth/utils'
import TablePagination from '@/layouts/components/TablePagination.vue'
import { http } from '@/libs/axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'MenuProfileMatrix',
  components: { TablePagination },
  props: {
    config_key: String,
    labelKey: {
      type: String,
      default: 'access_name',
    },
  },
  data() {
    return {
      loading: false,
      configsData: [],
      userData: getUserData(),
      menuprofile: '',
      submittedNames: [],
      perPage: 10,
      currentPage: 1,
      search: '',
      rows: [],
      menuList: [],
    }
  },
  computed: {
    isThereConfigDataInUserData() {
      return this.userData.configs.some(config => config?.config_key === this.config_key)
    },
    access() {
      return this.$store.getters['table/listCache']('access')
    },
    totalRows() {
      return this.rows.length
    },
  },
  async mounted() {
    // Récupère les données de configuration
    this.configsData = await this.getConfigData()
  },
  methods: {
    getConfigByKey(key) {
      return this.userData.configs.find(config => config.config_key === key)
    },
    setConfigVal(value) {
      this.rows = JSON.parse(value)
      this.menuList = this.rows[0].menus.map(menu => menu.name)
      setUserDataConfigsByKey({ config_key: 'menu', config_val: this.rows })
    },
    async getAccess() {
      if (this.access.length === 0) {
        try {
          await this.$store.dispatch('table/fetchList', { entity: 'access' })
        } catch (error) {
          console.log({ error })
        }
      }
    },
    formatConfigValue() {
      return this.access.map(ac => ({ access_name: ac.access_name, menus: [] }))
    },
    async getConfigData() {
      /* On fait la requête de récupération des données ici, puis on update le configData local
       * On regarde premièrement dans les données du user connecté dans le local storage, s'il
       * n'y en a pas de données pour cette clé, on va chercher en BD et on update les donnénes en locale
       */
      const configs = this.getConfigByKey(this.config_key)

      if (configs) {
        this.setConfigVal(configs.config_val)
      }

      return configs
    },
    async setMenu(menu, action = 'add') {
      // Si l'action est add, alors on ajoute sinon on retire
      if (action === 'add') {
        if (this.rows.length === 0) {
          await this.getAccess()
          this.rows = this.formatConfigValue()
        }
        this.rows.map(row => row.menus.push({ name: menu, value: false }))
        this.menuList.push(menu)
      } else {
        this.rows = this.rows.map(row => ({ ...row, menus: row.menus.filter(_menu => _menu.name !== menu) }))
        this.menuList = this.menuList.filter(_menu => _menu !== menu)
      }
    },
    async saveMenuProfile() {
      if (!this.menuprofile) return false

      this.loading = true
      await this.setMenu(this.menuprofile, 'add')

      try {
        const payload = {
          config_key: 'menu',
          config_val: JSON.stringify(this.rows),
        }
        const response = await http({
          method: this.isThereConfigDataInUserData ? 'put' : 'post',
          url: '/configs/',
          data: payload,
        })

        this.setConfigVal(response.data.config_val)

        this.menuprofile = ''
        this.$refs.modal.hide()
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Menu added successfully !',
            icon: 'successIcon',
            variant: 'success',
          },
        })
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
    async saveTablesChanges() {
      this.loading = true
      try {
        const payload = {
          config_key: 'menu',
          config_val: JSON.stringify(this.rows),
        }
        const response = await http.put('/configs/', payload)

        this.setConfigVal(response.data.config_val)
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Changes Saved!!!',
            icon: 'successIcon',
            variant: 'success',
          },
        })
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
    async deleteMenuProfile() {
      if (!this.menuprofile) return false
      const result = await this.$swal({
        title: 'Are you sure?',
        text: 'This Menu profile will be delete and all associations with access also !!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
      if (!result.value) return false
      await this.setMenu(this.menuprofile, 'delete')
      await this.saveTablesChanges()
      this.menuprofile = ''
    },
  },
}
</script>

<template>
  <b-overlay :show="loading">
    <b-card body-class="p-1 text-right">
      <b-button variant="primary" class="capitalize mr-1" @click="$refs.modal.show()">
        {{ $t('button~add-menu') }}
      </b-button>
      <b-button variant="primary" class="capitalize mr-1" @click="$refs.modalDelete.show()">
        {{ $t('button~remove-menu') }}
      </b-button>
      <b-button variant="primary" class="capitalize mr-1 " @click="saveTablesChanges">
        {{ $t('button~save') }}
      </b-button>
    </b-card>
    <b-modal ref="modal" :title="$t('headline~menu~new')" :ok-title="$t('button~save')" :cancel-title="$t('button~cancel')" modal-class="modal-primary" centered
             :no-close-on-backdrop="true" @ok="saveMenuProfile"
    >
      <form ref="form" @submit.stop.prevent="saveMenuProfile">
        <b-form-group
          :label="$t('page~menu~title')"
          label-for="menu"
          invalid-feedback="Menu profile is required"
        >
          <b-form-input
            id="menu"
            v-model="menuprofile"
            placeholder="Enter a menu profile"
            required
          />
        </b-form-group>
      </form>
    </b-modal>
    <b-modal ref="modalDelete" :title="$t('headline~menu~remove')" :ok-title="$t('button~contradictionpackage~remove')" :cancel-title="$t('button~cancel')" modal-class="modal-primary" centered
             :no-close-on-backdrop="true" @ok="deleteMenuProfile"
    >
      <form ref="form-delete" @submit.stop.prevent="deleteMenuProfile">
        <b-form-group
          :label="$t('page~menu~title')"
          label-for="remove-menu"
          invalid-feedback="Menu profile is required"
        >
          <b-form-select
            id="remove-menu"
            v-model="menuprofile"
            :options="menuList"
            placeholder="Choose one menu"
            required
          />
        </b-form-group>
      </form>
    </b-modal>
    <b-card>
      <b-table-simple striped responsive :filter="search" :busy.sync="loading" :current-page="currentPage" :per-page="perPage">
        <b-thead>
          <b-th>{{ $t('attribute.' + labelKey) }}</b-th>
          <b-th v-for="(menu, index) in menuList" :key="index">
            {{ menu }}
          </b-th>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(row,i) in rows" :key="i">
            <b-td>{{ row[labelKey] }}</b-td>
            <b-td v-for="(menu, idx) in row.menus" :key="idx">
              <b-form-checkbox v-model="menu.value" />
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-card>
  </b-overlay>
</template>

<style scoped>

</style>

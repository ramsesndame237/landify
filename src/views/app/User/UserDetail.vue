<template>
  <div class="">
    <div class="container">
      <div class="row">
        <div class="col-md-5 col-lg-4 col-12">
          <div class="row">
            <div class="col col-12">
              <b-overlay :show="loading" spinner-variant="primary">
                <b-card>
                  <template v-if="user">
                    <div class="text-center">
                      <b-card-text>
                        <b-avatar :text="avatarPlaceholder" size="7rem" rounded/>
                      </b-card-text>
                      <b-card-text class=" h3 bold mt-1">
                        {{ user.user_firstname + ' '+ user.user_lastname }}
                      </b-card-text>
                      <template v-if="role">
                        <b-badge variant="success">
                          {{ role.role_name }}
                        </b-badge>
                      </template>
                    </div>
                    <div class="d-flex align-items-center mb-2 mt-3 justify-content-around">
                      <div class="d-flex align-items-center mr-2">
                        <b-avatar rounded class="bg-success mr-1" size="2.5rem">
                          <feather-icon icon="CheckSquareIcon" />
                        </b-avatar>
                        <b-card-text class="">
                          <h4 class="h4 m-0">
                            {{ user.open_ticket }}
                          </h4>
                          <span class="text-sm-center">Open Tickets</span>
                        </b-card-text>
                      </div>
                      <div class="d-flex align-items-center">
                        <b-avatar rounded class="bg-primary mr-1" size="2.5rem">
                          <feather-icon icon="XIcon" />
                        </b-avatar>
                        <b-card-text class="">
                          <h4 class="h4 m-0">
                            {{ user.close_ticket }}
                          </h4>
                          <span class="text-sm-center">Closed Tickets</span>
                        </b-card-text>
                      </div>
                    </div>
                    <hr class="divider" >
                    <div class="">
                      <b-card-text class="text-uppercase text-muted">
                        Details
                      </b-card-text>
                      <b-list-group flush>
                        <b-list-group-item class="font-weight-bolder d-flex align-items-center font-medium-1">
                          Username :
                          <template v-if="user">
                            <span class=" font-weight-normal ml-1"> {{ user.user_firstname + ' '+ user.user_lastname }}</span>
                          </template>
                        </b-list-group-item>
                        <b-list-group-item class="d-flex flex-wrap align-items-center font-weight-bolder font-medium-1">
                          Email :
                          <span class="font-weight-normal ml-1"> {{ user.user_email }}</span>
                        </b-list-group-item>
                        <b-list-group-item class="d-flex align-items-center font-weight-bolder font-medium-1">
                          Status :
                          <b-badge v-if="user.user_locked" class="ml-1 font-weight-normal">
                            Locked
                          </b-badge>
                          <b-badge v-else variant="success" class="ml-1 font-weight-normal">
                            Actif
                          </b-badge>
                        </b-list-group-item>
                        <b-list-group-item class="d-flex align-items-center font-weight-bolder font-medium-1">
                          Role :
                          <template v-if="role">
                            <span class="ml-1 font-weight-normal">{{ role.role_name }}</span>
                          </template>
                        </b-list-group-item>
                        <b-list-group-item class="d-flex align-items-center font-weight-bolder font-medium-1">
                          User Type :
                          <span class="ml-1 font-weight-normal text-capitalize"> {{ usertype }} </span>
                          <template v-if="user.user_is_director">
                            <span class="font-weight-normal font-italic ml3"> (Director)</span>
                          </template>
                        </b-list-group-item>
                        <b-list-group-item class="d-flex align-items-center font-weight-bolder font-medium-1">
                          Team(s) :
                          <span class="ml-1 font-weight-normal text-capitalize">
                            <b-badge v-for="team in userTeams" :key="team.team_id" class="mr-1" variant="dark">{{ team.team_name }}</b-badge>
                          </span>
                        </b-list-group-item>
                        <template v-if="user.partnercompany_id && user.partnercompany_id.length > 0 ">
                          <b-list-group-item class="d-flex flex-wrap align-items-center font-weight-bolder font-medium-1">
                            Partnercompany :
                            <span class="ml-1 font-weight-normal text-capitalize">
                              <b-badge v-for="partnercompany in userPartnerCompany" :key="partnercompany.partnercompany_id" class="mr-1" variant="dark">{{ partnercompany.partnercompany_name }}</b-badge>
                            </span>
                          </b-list-group-item>
                        </template>
                        <template v-else>
                          <b-list-group-item class="d-flex flex-wrap align-items-center font-weight-bolder font-medium-1">
                            Company :
                            <template v-if="user.company">
                              <span class="ml-1 font-weight-normal text-capitalize">
                                {{ user.company.company_name }}
                              </span>
                            </template>
                          </b-list-group-item>
                        </template>
                        <b-list-group-item class="d-flex align-items-center font-weight-bolder font-medium-1">
                          Function :
                          <span class="ml-1 font-weight-normal text-capitalize">
                            <b-badge v-for="func in userFunctions.filter(f => f.function_id === user.function_id)" :key="func.function_id" class="mr-1" variant="info">{{ func.function_name }}</b-badge>
                          </span>
                        </b-list-group-item>
                        <b-list-group-item class="d-flex align-items-center font-weight-bolder font-medium-1">
                          Mobile Phone :
                          <span class="ml-1 font-weight-normal">{{ user.user_mobile }}</span>
                        </b-list-group-item>
                        <b-list-group-item class="d-flex align-items-center font-weight-bolder font-medium-1">
                          Fax Number :
                          <span class="ml-1 font-weight-normal">{{ user.user_fax }}</span>
                        </b-list-group-item>
                        <b-list-group-item class="d-flex align-items-center font-weight-bolder font-medium-1">
                          Fix Phone Number :
                          <span class="ml-1 font-weight-normal">{{ user.user_fix_phonenumber }}</span>
                        </b-list-group-item>
                        <b-list-group-item class="d-flex align-items-center font-weight-bolder font-medium-1">
                          Country :
                          <template v-if="user.country">
                            <span class="ml-1 font-weight-normal">{{ user.country.country_name }}</span>
                          </template>
                        </b-list-group-item>
                      </b-list-group>
                    </div>
                    <div class="d-flex justify-content-center mt-2 align-items-center">
                      <b-button v-if="canSeeEditButton" variant="info" class="mx-1" @click="editUser">
                        Edit
                      </b-button>
                      <b-button v-if="canSeeDeleteButton" variant="primary" class="mx-1" @click="deleteEntity">
                        Delete
                      </b-button>
                    </div>
                  </template>
                </b-card>
              </b-overlay>
            </div>
          </div>
        </div>
        <div class="col-md-7 col-lg-8 col-12">
          <b-tabs pills lazy>
            <b-tab >
              <template #title>
                <feather-icon icon="UserIcon" size="18" />
                Account
              </template>
              <b-card class="" title="List of Tickets">
                <template v-if="user">
                  <CompactDataTables :definition="ticketDefinition" :entity-id="entityId" :with-select="false" :with-search="true"
                                     :with-pagination="true" :with-size="true" sort-column-by="ticket_creation_time" :sort-column-desc="true"
                                     :initial-filter="{user_id: user.user_id}"
                  />
                </template>
              </b-card>
              <b-card no-body v-if="canViewTrackRecord">
                <TrackRecord :definition="definition" :endpoint="endpoint" />
              </b-card>
            </b-tab>
            <b-tab :disabled="!canSeeEditButton">
              <template #title>
                <feather-icon icon="LockIcon" size="18" />
                Security
              </template>
              <b-card title="Change Password">
                <b-alert show variant="warning" class="p-2 font-medium-2">
                  <b-card-text>
                    Ensure that these requirements are met
                  </b-card-text>
                  <b-card-text>
                    Minimum 8 characters long, uppercase & symbol
                  </b-card-text>
                </b-alert>
                <b-overlay :show="passwordLoading" spinner-variant="primary">
                  <validation-observer ref="form" v-slot="{passes}">
                    <b-form @submit.prevent="passes(savePassword)">
                      <b-row>
                        <b-col v-for="(field, index) in updatePasswordField" :key="index" cols="6">
                          <field ref="fields" :entity="entity" :field="field" />
                        </b-col>
                      </b-row>
                      <b-button variant="primary" class="mt-1" @click="savePassword">
                        {{ $t('button~save_password') }}
                      </b-button>
                    </b-form>
                  </validation-observer>
                </b-overlay>
              </b-card>
            </b-tab>
            <b-tab :disabled="!canSeeEditButton">
              <template #title>
                <feather-icon icon="ShieldIcon" size="18" />
                Permissions
              </template>
              <b-card title="List of Permissions">

                <b-card-text class="text-right">
                  <MatrixTool />
                </b-card-text>
                <template v-if="role">
                  <TableGroupMatrix :entity-id="entityId" :relation="relation" :role-id="role.role_id" />
                </template>
              </b-card>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
    <generic-modal ref="modal" :fetch-data="false" :cache-key="table+'-'" :table="table" :entity-id="entityId"
                   :definition="definition" with-continue :table-definition-key="table" :title="`headline~${table}~edit`"
                   @reload-table="fetchUserData"
    />
  </div>
</template>
<script>
import CompactDataTables from '@/layouts/components/CompactDataTables.vue'
import EditPageMixin from '@/views/app/Generic/EditPageMixin'
import TrackRecord from '@/views/app/Generic/Panels/TrackRecord.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import TableGroupMatrix from '@/views/app/Role/Relation/TableGroupMatrix.vue'

import Field from '@/views/app/Generic/Field.vue'

import { getUserData } from '@/auth/utils'
import { USER_ROLES } from '@/config/config-access/config-roles'
import MatrixTool from '@/views/app/Role/Relation/MatrixTool.vue'
import TeamMixin from '@/views/app/Team/TeamMixin'
import intersection from 'lodash/intersection'
import { mapGetters } from 'vuex'

export default {
  name: 'UserDetail',
  components: {
    MatrixTool, Field, GenericModal, TableGroupMatrix, CompactDataTables, TrackRecord,
  },
  mixins: [EditPageMixin, TeamMixin],
  data() {
    return {
      endpoint: '/trackrecords',
      name: '',
      relation: {
        entityView: 'tablegroup',
        entityName: 'user',
      },
      updatePasswordField: [
        { key: 'old_password', type: 'password' },
        { key: 'new_password', type: 'password', generate: true },
      ],
      passwordLoading: false,
      size: [10, 30, 100, { text: 'All', value: 100000 }],
      userFunctions: [],
    }
  },
  computed: {
    user() {
      return this.entity
    },
    canViewTrackRecord() {
      return this.$isAdminOr(USER_ROLES.admin)
    },
    avatarPlaceholder() {
      return this.user?.user_firstname.charAt(0).toUpperCase()
              + this.user?.user_lastname.charAt(0).toUpperCase()
    },
    ticketDefinition() {
      return {
        entityEndpoint: '/tickets/list',
        fields: [
          { key: 'ticket_id', auto: true },
          { key: 'ticket_name' },
          { key: 'ticket_description', type: 'textarea', required: false },
          // { key: 'ticket_deadline', type: 'date', time: true },
          {
            key: 'ticket_deadline_yellow', type: 'date', time: true, hideOnIndex: true,
          },
          {
            key: 'ticket_deadline_red', type: 'date', time: true, hideOnIndex: true,
          },
          {
            key: 'pos_id',
            listLabel: 'pos_name',
            type: 'list',
            list: 'frontend_2_1_3_8',
            filter_key: 'company_id',
            relationEntity: 'ticket_pos_rel',
            hideOnIndex: true,
          },
          {
            key: 'contract_id',
            listLabel: 'contract_name',
            type: 'list',
            list: 'frontend_4_2_1_contract_selector',
            filter_key: 'pos_id',
            relationEntity: 'ticket_contract_rel',
            required: false,
            hideOnIndex: true,
          },
          {
            key: 'ticket_closed',
            label: 'Status',
            hideOnForm: true,
            formatter: val => window.$vue.$t(val ? 'header~board~status~closed' : 'header~board~status~open'),
          },
          { key: 'priority_name', hideOnForm: true },
          {
            key: 'priority_id', type: 'list', list: 'priority', listLabel: 'priority_name', hideOnIndex: true,
          },

          // { key: 'column_name', hideOnForm: true },
          {
            key: 'ticket_creation_time', type: 'date', time: true, hideOnForm: true,
          },
          { key: 'board_name', hideOnForm: true },
          // { key: 'contract_id', hideOnForm: true },
          // { key: 'contract_name', hideOnForm: true },
          // { key: 'pos_id', hideOnForm: true },
          { key: 'pos_name', hideOnForm: true },
          // { key: 'sub_ticket_count', hideOnForm: true },
        ],
        entity: 'ticket',
      }
    },
    usertype() {
      return this.user?.usertype?.usertype_name
    },
    roles() {
      return this.$store.getters['table/listCache']('role')
    },
    role() {
      return this.roles.find(role => role.role_id === this.user.role_id)
    },
    partnersCompany() {
      return this.$store.getters['table/listCache']('partnercompany')
    },
    userPartnerCompany() {
      return this.partnersCompany.filter(partnercompany => this.user?.partnercompany_id.includes(partnercompany.partnercompany_id))
    },
    userPermissions() {
      return this.$store.getters['table/listCache'](`table-group-${this.entityId}`)
    },
    canSeeEditButton() {
      const loggedUserData = getUserData()
      const check1 = this.isUserAdmin || this.isUserInternAndAdmin
      let check2 = false

      if (this.isUserExternDirector) {
        if (this.isUserExternClientDirector) {
          check2 = this.hadSameCompany(loggedUserData, this.user)
        } else if (this.isUserExternPartnerDirector) {
          check2 = this.hadSamePartnerCompany(loggedUserData, this.user)
        }
      }
      return check1 || check2
    },
    canSeeDeleteButton() {
      return this.canSeeEditButton
    },
    ...mapGetters('user', ['isUserAdmin', 'isUserInternAndAdmin', 'isUserExternDirector', 'isUserExternClientDirector', 'isUserExternPartnerDirector']),
  },
  async mounted() {
    await this.fetchUserData()
    if (!this.roles.length) {
      await this.getRoles()
    }
    if (this.partnersCompany.length <= 0) {
      await this.getPartnerCompany()
    }

    await this.getUserSelectData()
  },
  methods: {
    hadSameCompany(loggedUser, user) {
      if (user?.company === null) return false
      const { company_id: loggedUserCompany } = loggedUser.company
      const company_id = user?.company ? user?.company.company_id : null
      return loggedUserCompany === company_id
    },
    hadSamePartnerCompany(loggedUser, user) {
      if (!user?.partnercompany_id || user.partnercompany_id.length <= 0) return false
      const loggedUserPartnerCompany = loggedUser.partnercompany.map(partnercompany => partnercompany.partnercompany_id)
      const userPartnerCompany = user.partnercompany_id
      return intersection(loggedUserPartnerCompany, userPartnerCompany).length > 0
    },

    editUser() {
      this.$refs.modal.openModal(false, this.entity)
    },
    async getPartnerCompany() {
    // Je récupère les partnercompany de l'utilisateur pour la requête, puisqu'il peut en avoir plusieurs
      const partnersCompany = this.user?.partnercompany_id.map(partnercompany => ({ partnercompany_id: partnercompany }))
      await this.$store.dispatch('table/fetchList', { entity: 'partnercompany', data: partnersCompany })
    },
    async savePassword() {
      const result = await this.$refs.form.validate()

      if (!result) return
      this.passwordLoading = true

      try {
        await this.$http.put(`/users/${this.user.user_id}/password`, this.entity)
        this.$successToast(this.$t('success~password~change~message'))
      } catch (error) {
        console.log({ error })
        if (error.response?.data) {
          this.$errorToast(error.response.data.detail)
        } else {
          this.$errorToast(this.$t('error~message'))
        }
      } finally {
        this.passwordLoading = false
      }
    },
    async getUserSelectData() {
      try {
        const response = await this.$http.get('/users/select')

        const { data } = response

        if (data.function) {
          this.userFunctions = data.function
        }
      } catch (error) {
        console.log({ error })
      }
    },
    async getRoles() {
      this.loading = true
      const payload = { customEnpoint: '/users/roles' }
      try {
        const response = await this.$store.dispatch('table/fetchList', payload)
        await this.$store.dispatch('table/setListData', { entity: 'role', data: response })
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
    async fetchUserData() {
      if (this.definition) {
        this.entity = await this.definition.fetch(this)
        await this.getPartnerCompany()
      }
    },
  },
}
</script>
<style scoped>
.list-group-item {
  padding-left: 0;
  padding-top: .5rem;
  padding-bottom: .5rem;
}
.ml3 {
  margin-left: .3rem;
}
</style>

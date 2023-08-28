<template>
<div class="">
  <div class="container">
    <div class="row">
      <div class="col-md-5 col-lg-4 col-12">
        <div class="row">
          <div class="col col-12">
            <b-overlay>
              <b-card>
                <div class="text-center">
                  <b-card-text>
                    <b-avatar :text="avatarPlaceholder" size="7rem" rounded></b-avatar>
                  </b-card-text>
                  <b-card-text class=" h3 bold mt-1">
                   {{ user.user_firstname + ' '+ user.user_lastname  }}
                  </b-card-text>
                  <b-badge variant="success">{{ role.role_name }}</b-badge>
                </div>
                <div class="d-flex align-items-center mb-2 mt-3 justify-content-around">
                  <div class="d-flex align-items-center mr-2">
                    <b-avatar rounded class="bg-success mr-1" size="2.5rem">
                      <feather-icon icon="CheckSquareIcon" />
                    </b-avatar>
                    <b-card-text class="">
                      <h4 class="h4 m-0">1,230</h4>
                      <span class="text-sm-center">Open Ticket</span>
                    </b-card-text>
                  </div>
                  <div class="d-flex align-items-center">
                    <b-avatar rounded class="bg-primary mr-1" size="2.5rem">
                      <feather-icon icon="XIcon" />
                    </b-avatar>
                    <b-card-text class="">
                      <h4 class="h4 m-0">500</h4>
                      <span class="text-sm-center">Close Ticket</span>
                    </b-card-text>
                  </div>
                </div>
                <hr class="divider"></hr>
                <div class="">
                  <b-card-text class="text-uppercase text-muted">
                    Details
                  </b-card-text>
                  <template v-if="user">
                    <b-list-group flush>
                      <b-list-group-item class="font-weight-bolder d-flex align-items-center font-medium-1">
                        Username:
                        <span class=" font-weight-normal ml-1"> {{ user.user_firstname + ' '+ user.user_lastname  }}</span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex align-items-center font-weight-bolder font-medium-1">
                        Email :
                        <span class="font-weight-normal ml-1"> {{ user.user_email }}</span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex align-items-center font-weight-bolder font-medium-1">
                        Status:
                        <b-badge class="ml-1 font-weight-normal" v-if="user.user_locked">Locked</b-badge>
                        <b-badge variant="success" class="ml-1 font-weight-normal" v-else>Actif</b-badge>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex align-items-center font-weight-bolder font-medium-1">
                        Role:
                        <span class="ml-1 font-weight-normal">{{ role.role_name }}</span>
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
                    </b-list-group>
                  </template>
                </div>
                <div class="d-flex justify-content-center mt-2 align-items-center">
                  <b-button variant="info" class="mx-1" @click="editUser">Edit</b-button>
                  <b-button variant="primary" class="mx-1" @click="deleteEntity">Delete</b-button>
                </div>
              </b-card>
            </b-overlay>
          </div>
        </div>
      </div>
      <div class="col-md-7 col-lg-8 col-12">
        <b-tabs pills>
          <b-tab >
            <template #title>
              <feather-icon icon="UserIcon" size="18" />
              Account
            </template>
            <b-card class="" title="List of Tickets">
              <CompactDataTables  />
            </b-card>
            <b-card no-body>
              <TrackRecord :definition="definition" :endpoint="endpoint" />
            </b-card>
          </b-tab>
          <b-tab >
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
              <b-overlay >
                <validation-observer ref="form" v-slot="{passes}">
                  <b-form @submit.prevent="passes(savePassword)">
                    <b-row>
                      <b-col v-for="(field, index) in updatePasswordField" :key="index" cols="6">
                        <field ref="fields" :entity="entity" :field="field" />
                      </b-col>
                    </b-row>
                    <b-button variant="primary" class="mt-1">Change Password</b-button>
                  </b-form>
                </validation-observer>
              </b-overlay>
            </b-card>
          </b-tab>
          <b-tab >
            <template #title>
              <feather-icon icon="ShieldIcon" size="18" />
              Permissions
            </template>
            <b-card >
              <TableGroupMatrix :entity-id="entityId" :relation="relation" />
            </b-card>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
  <generic-modal :fetch-data="false" :cache-key="table+'-'" :table="table" ref="modal" :entity-id="entityId"
                 :definition="definition" with-continue :table-definition-key="table" :title="`headline~${table}~edit`"
                 />
</div>
</template>
<script>
import TrackRecord from "@/views/app/Generic/Panels/TrackRecord.vue";
import CompactDataTables from "@/layouts/components/CompactDataTables.vue";
import TableGroupMatrix from "@/views/app/Role/Relation/TableGroupMatrix.vue";
import GenericModal from "@/views/app/Generic/modal.vue";
import EditPageMixin from "@/views/app/Generic/EditPageMixin";


import RoleMixin from "@/views/app/Role/RoleMixin";
import Field from "@/views/app/Generic/Field.vue";

export default {
  name: "UserDetail",
  components: {Field, GenericModal, TableGroupMatrix, CompactDataTables, TrackRecord },
  mixins: [EditPageMixin, RoleMixin],
  data(){
    return {
      endpoint: '/contracts/trackrecords',
      name: '',
      relation: {
        entityView: 'tablegroup',
    },
      updatePasswordField: [
        {key: 'user_password', type: 'password', generate: true, },
        {key: 'user_confirmation_password', type: 'password' },
      ]
    }
  },
  computed: {
    user() {
      return this.entity
    },
    avatarPlaceholder() {
        return this.user?.user_firstname.charAt(0).toUpperCase()
              + this.user?.user_lastname.charAt(0).toUpperCase()
  }
  },
  async mounted() {
    if(this.definition) {
      this.entity = await this.definition.fetch(this)
    }
    if (!this.roles.length) {
        await this.getRoles()
    }

    this.getRoleDetail(this.user.role_id)
  },
  methods: {
    editUser() {
      this.$refs.modal.openModal(false, this.entity);
    },
    savePassword() {

    }
  }
}
</script>
<style scoped>
.list-group-item {
  border: none;
  padding-left: 0;
  padding-top: .5rem;
  padding-bottom: .5rem;
}
</style>


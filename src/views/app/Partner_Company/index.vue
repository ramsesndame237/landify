<template>
  <div>
    <b-card body-class="p-0">
      <div
        class="d-flex justify-content-between"
        style="padding: 10px"
      >
        <b-form-group class="mb-0">
          <label class="d-inline-block text-sm-left mr-50">{{ $t('app.content.show') }}</label>
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            style="width: 60px"
            size="sm"
            :options="pageOptions"
            class="w-10"
          />
          <label class="d-inline-block text-sm-left ml-50">{{ $t('app.content.entries') }}</label>
        </b-form-group>

        <div class="d-flex align-items-center">

          <span class="mr-1">{{ $t('app.content.show') }} 1 {{ $t('app.content.to') }} {{ perPage }} {{ $t('app.content.of') }} {{ totalRows }} {{ $t('app.content.entries') }}</span>
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"
            class="my-0"
            first-number
            last-number
            prev-class="prev-item"
            next-class="next-item"
          />
        </div>

        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button
              v-b-modal.modal-primary
              size="sm"
              variant="info"
              class="mr-1 d-flex"
            >
              <img
                src="@/assets/images/pages/plusIcons.svg"
                alt=""
              >
              {{ $t('app.btn.new') }} </b-button>
            <b-button
              size="sm"
              class="d-flex"
              variant="primary"
            >
              <img
                src="@/assets/images/pages/deleteIcons.svg"
                alt=""
              >
              {{ $t('app.btn.delete') }}</b-button>
          </div>

          <div
            size="sm"
            class="d-flex align-items-center"
          >
            <label class="d-inline-block text-sm-left mr-50"> {{ $t('app.search.label') }}</label>
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              :placeholder="$t('app.search.palceholder')"
            />
          </div>
        </div>

      </div>
    </b-card>
    <b-card>
      <Databases
        ref="datatable"
        :filter="filter"
        link_view="partner-company-edit"
        :current-page="currentPage"
        :page-options="pageOptions"
        :per-page="perPage"
        :items="items"
        :fields="fields"
      />
    </b-card>

    <!--modal-->
    <b-modal
      id="modal-primary"
      :ok-title="$t('app.btn.save')"
      :cancel-title="$t('app.btn.cancel')"
      modal-class="modal-primary"
      centered
      :title="$t('app.content.create_customer')"
      size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.customer_group_id')"
              label-for="customer-group-id"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-select
                    id="customer-group-id"
                    v-model="newCompany.customerGroupId"
                    :options="customerGroupOptions"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.company_id')"
              label-for="companyId"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-select
                    id="companyId"
                    v-model="newCompany.companyId"
                    :options="customerGroupOptions"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.company_name')"
              label-for="companyName"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    id="companyName"
                    v-model="newCompany.companyName"
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.partner_type')"
              label-for="companyName"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-select
                    id="partnerType"
                    v-model="newCompany.companyName"
                    :options="options"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.address')"
              label-for="address"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="5">
                  <b-form-select
                    id="address1"
                    v-model="address"
                    :options="addressOptions"
                    @on-change="showContact=false"
                  />
                </b-col>
                <b-button
                  variant="info"
                  class="-pl-3"
                  :disabled="address || showAddress"
                  @click="showAddress=true"
                >
                  {{ $t('app.btn.new') }}
                </b-button>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <div
          v-if="!address && showAddress"
          class=""
        >
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.street')"
              label-for="companyName"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    id="street"

                    v-model="newCompany.companyName"
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.address_suffix')"
              label-for="address_suffix"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    id="address_suffix"
                    v-model="newCompany.companyName"

                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="`${$t('app.form.label.post_code')}, ${$t('app.form.label.place')} `"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="2">
                  <b-form-input
                    id="postcode"

                    v-model="newCompany.companyName"
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
                <b-col cols="4">
                  <b-form-input
                    id="addressPlace"

                    v-model="newCompany.companyName"
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.land')"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    id="land"

                    v-model="newCompany.companyName"
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

        </div>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.contact_details')"
              label-for="address"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="5">
                  <b-form-select
                    id="contact"
                    v-model="contact"
                    :options="contactOptions"
                    @on-change="showContact=false"
                  />
                </b-col>
                <b-button
                  variant="info"
                  class="-pl-3"
                  :disabled="contact || showContact"
                  @click="showContact=true"
                >
                  {{ $t(('app.btn.new')) }}
                </b-button>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <div
          v-if="showContact && !contact"
          class=""
        >
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.email')"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input

                    :placeholder="$t('app.form.placeholder.email')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.phone')"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input

                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="`${$t('app.form.label.mobile')} / ${$t('app.form.label.cell_phone_num')}`"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('app.form.label.fax')"
              label-cols-md="12"
            >
              <b-form-select
                v-model="newCompany.companyDetails"
                :placeholder="$t('app.form.placeholder.automatic')"
              />
            </b-form-group>
          </b-col>
        </div>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.company_details')"
              label-for="companyDetails"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="5">
                  <b-form-select
                    id="companyDetails"
                    v-model="company"
                    :options="companyOptions"
                    @on-change="showContact=false"
                  />
                </b-col>
                <b-button
                  variant="info"
                  class="-pl-3"
                  :disabled="company || showCompany"
                  @click="showCompany=true"
                >
                  {{ $t('app.btn.new') }}
                </b-button>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <div
          v-if="!company && showCompany"
          class=""
        >
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.tax_id')"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-select
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.hra_hrb')"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>

import {
  BButton,
  BFormGroup,
  BFormSelect,
  BModal,
  BForm,
  BRow,
  BCol,
  BFormInput,
  BCard,
  BPagination,
  BInputGroup,
} from 'bootstrap-vue'

const Databases = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    Databases,
    BButton,
    BFormGroup,
    BPagination,
    BCard,
    BFormSelect,
    BModal,
    BForm,
    BRow,
    BCol,
    BFormInput,
    BInputGroup,
  },
  data() {
    return {
      currentPage: 1,
      totalRows: 1,
      perPage: 10,
      pageOptions: [3, 5, 10],
      sortDirection: 'asc',
      sortBy: '',
      sortDesc: false,
      items: [
        {
          id: 1,
          company_id: '213',
          company_name: 'Fictive Copany',
          group_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          contact_partner: 'Something',
        },
        {
          id: 1,
          company_id: '213',
          company_name: 'Fictive Copany',
          group_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          contact_partner: 'Something',
        },
        {
          id: 1,
          company_id: '213',
          company_name: 'Fictive Copany',
          group_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          contact_partner: 'Something',
        },

      ],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'partnercompany_name', label: 'Partner Company Name', sortable: true },
        { key: 'partnercompany_ID', label: 'Partner Company ID', sortable: true },
        { key: 'group_name', label: 'Partner group name', sortable: true },
        { key: 'city', label: 'City Name', sortable: true },
        { key: 'phone', label: 'Partner Type Name', sortable: true },
        { key: 'mail', label: 'Contract detail E-mail', sortable: true },
        { key: 'contact_partner', label: '# amount of contact partner', sortable: true },
        { key: 'contact_partner', label: '# amount of Locations', sortable: true },
        'Action',
      ],
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Simple Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'Please select', disabled: true },
      ],
      filter: null,
      customerGroupOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
      ],
      newCompany: {
        customerGroupId: null,
        companyId: null,
        companyName: null,
        addressId: null,
        contactDetailId: null,
        bankDataId: null,
      },

      address: null,
      contact: null,
      company: null,

      showAddress: false,
      showContact: false,
      showCompany: false,

      addressOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Simple Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'Please select', disabled: true },
      ],
      contactOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Simple Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'Please select', disabled: true },
      ],
      companyOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Simple Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'Please select', disabled: true },
      ],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  mounted() {
    this.totalRows = this.items.length
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style scoped>
</style>

<template>
  <div class="mb-2">
    <b-row class="" v-show="currentStep == 1">
      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
        {{$t('app.content.create_customer_group')}}

      </b-col>
      <b-col cols="12" md="6">
        <b-form-group  :label="$t('app.form.label.customer_group_id')" label-for="customer_group_id">
          <b-form-select id="customer_group_id" :placeholder="$t('app.form.placeholder.default')" />
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6">
        <b-form-group  :label="$t('app.form.label.customer_group_name')" label-for="customer_group_name">
          <b-form-input id="customer_group_name" :placeholder="$t('app.form.placeholder.default')" />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="" v-show="currentStep == 2">
      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
        {{$t('app.content.create_customer')}}
      </b-col>
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
              >
              </b-form-select>
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.company_id')"
            label-for="companyId"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="6">
              <b-form-input
                id="companyId"
                :placeholder="$t('app.form.placeholder.automatic_based_on_id')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
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
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.address')"
            label-for="address"
            label-cols-md="12"
          >
            <b-row>
              <b-col cols="5">
                <b-form-select
                  id="address"
                />
              </b-col>
              <b-button   variant="info" class="-pl-3">
                {{ $t('app.btn.new') }}
              </b-button>
            </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12" class="" id="">
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.street')"
              label-for="companyName"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  id="companyName"
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
                  :placeholder="$t('app.form.placeholder.default')"
                />
              </b-col>
              <b-col cols="4">
                <b-form-input
                  id="addressPlace"
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
                  :placeholder="$t('app.form.placeholder.default')"
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contact_details')"
            label-for="address"
            label-cols-md="12"
          >
            <b-row>
              <b-col cols="5">
                <b-form-select
                  id="address"
                />
              </b-col>
              <b-button   variant="info" class="-pl-3">
                {{ $t(('app.btn.new')) }}
              </b-button>
            </b-row>
          </b-form-group>
        </b-col>
      <b-col cols="12" class="" id="">
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
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.fax')"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="5">
              <b-form-select
              />
            </b-col>
            <b-button   variant="info" class="-pl-3">
              {{ $t('app.btn.new') }} 
            </b-button>
          </b-row>
          </b-form-group>

        </b-col>
      </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.company_details')"
            label-for="companyDetails"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="6">
              <b-form-input
                id="companyDetails"
                :placeholder="$t('app.form.placeholder.automatic')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
      <div class="col-12" id="">
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.tax_id')"
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
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.bankdata')"
            label-for="bankData"
            label-cols-md="12"
          >
            <b-row>
              <b-col cols="5">
                <b-form-select
                  id="bankData"
                  :options="customerGroupOptions"
                :placeholder="$t('app.form.placeholder.default')"
                />
              </b-col>
              <b-button   variant="info" class="-pl-3">
                {{ $t('app.btn.new') }}
              </b-button>
            </b-row>
          </b-form-group>
        </b-col>
      <div class="col-12" id="">
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.iban_account')"
            label-for="ibanAccount"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="6">
              <b-form-input
                id="ibanAccount"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.bic')"
            label-for="bic"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="6">
              <b-form-input
                id="bic"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.bank_name')"
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
    </b-row>
    <b-row class="" v-show="currentStep == 3">
      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
        {{$t('app.content.create_location')}}
      </b-col>
      <b-col cols="12" md="6" class="p-0">
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.location_id')"
            label-for="customer-group-id"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                :placeholder="$t('app.form.placeholder.automatic')"
                id="customer-group-id"
              >
              </b-form-input>
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.description')"
            label-for="companyId"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="companyId"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.total_area')"
            label-for="companyName"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="companyName"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.opening_date')"
            label-for="opening_date"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="opening_date"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.owner')"
            label-for="address"
            label-cols-md="12"
          >
            <b-row>
              <b-col cols="9">
                <b-form-select
                  id="address"
                />
              </b-col>
              <b-button   variant="info" class="-pl-3">
                {{ $t('app.btn.new') }}
              </b-button>
            </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.owner_valid_from_date')"
            label-for="owner_valid_from_date"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="owner_valid_from_date"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.property_manager')"
            label-for="property_manager"
            label-cols-md="12"
          >
            <b-row>
              <b-col cols="9">
                <b-form-select
                  id="property_manager"
                />
              </b-col>
              <b-button   variant="info" class="-pl-3">
                {{ $t('app.btn.new') }}
              </b-button>
            </b-row>
          </b-form-group>
        </b-col>
        
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.property_manager_from_date')"
            label-for="property_manager_from_date"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="property_manager_from_date"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.location_type')"
            label-for="location_type"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-select
                id="location_type"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.address_location')"
            label-for="address_location"
            label-cols-md="12"
          >
            <b-row>
              <b-col cols="9">
                <b-form-select
                  id="address_location"
                />
              </b-col>
              <b-button   variant="info" class="-pl-3">
                {{ $t('app.btn.new') }}
              </b-button>
            </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12" class="" id="">
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.street')"
              label-for="street"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="12">
                <b-form-input
                  id="street"
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
              <b-col cols="12">
                <b-form-input
                  id="address_suffix"
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
              <b-col cols="4">
                <b-form-input
                  id="postcode"
                  :placeholder="$t('app.form.placeholder.default')"
                />
              </b-col>
              <b-col cols="8">
                <b-form-input
                  id="addressPlace"
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
              <b-col cols="12">
                <b-form-input
                  id="land"
                  :placeholder="$t('app.form.placeholder.default')"
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
        </b-col>
      </b-col>
      <b-col cols="12" md="6" class="p-0"> 
        <Databases :filter="filter" link="user-edit" :currentPage="1" :pageOptions="[3, 5, 10]" :items="items" :fields="fields" ref="datatable" />
        <div class="d-flex justify-content-center">
          <b-button  size="md" class="d-flex align-items-center mt-2" variant="info">
            {{ $t('app.btn.save_add_location') }} 
          </b-button>
        </div>
      </b-col>
    </b-row>
    <b-row class="" v-show="currentStep == 4">
      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
        {{$t('app.content.create_area')}}
      </b-col>
      <b-col cols="12" md="6" class="p-0">
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.location_id')"
            label-for="customer-group-id"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-select
                :placeholder="$t('app.form.placeholder.automatic')"
                id="customer-group-id"
              >
              </b-form-select>
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.area_id')"
            label-for="area_id"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="area_id"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.name_area')"
            label-for="companyName"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="companyName"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.name_area_ext')"
            label-for="opening_date"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="opening_date"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.space')"
            label-for="space"
            label-cols-md="12"
          >
            <b-form-input
              id="space"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.main_usage')"
            label-for="main_usage"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-select
                id="main_usage"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.area_type')"
            label-for="area_type"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-select
                id="area_type"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
      </b-col>
      <b-col cols="12" md="6" class="p-0"> 
        <Databases :filter="filter" link="user-edit" :currentPage="1" :pageOptions="[3, 5, 10]" :items="items" :fields="fields" ref="datatable" />
        <div class="d-flex justify-content-center">
          <b-button  size="md" class="d-flex align-items-center mt-2" variant="info">
            {{ $t('app.btn.save_add_location') }} 
          </b-button>
        </div>
      </b-col>
    </b-row>
    <b-row class="" v-show="currentStep == 5">
      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
       {{$t('app.content.create_pos')}}
      </b-col>
      <b-col cols="12" md="6" class="p-0">
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.pos_id')"
            label-for="customer-group-id"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-select
                :placeholder="$t('app.form.placeholder.automatic')"
                id="customer-group-id"
              >
              </b-form-select>
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.name_pos')"
            label-for="name_pos"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="name_pos"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.pos_branch_number')"
            label-for="pos_branch_number"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="pos_branch_number"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.tag')"
            label-for="tag"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="9">
              <b-form-input
                id="tag"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
              <b-button  size="sm" class="d-flex align-items-center" variant="info">
                {{ $t('app.btn.new') }}
              </b-button>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.responsible_sfm')"
            label-for="responsible_sfm"
            label-cols-md="12"
          >
            <b-form-select
              id="responsible_sfm"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.existing_area_id')"
            label-for="existing_area_id"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="9">
              <b-form-input
                id="existing_area_id"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
              <b-button  size="sm" class="d-flex align-items-center" variant="info">
                {{ $t('app.btn.new') }}
              </b-button>
          </b-row>
          </b-form-group>
        </b-col>
      </b-col>
      <b-col cols="12" md="6" class="p-0"> 
        <Databases :filter="filter" link="user-edit" :currentPage="1" :pageOptions="[3, 5, 10]" :items="items" :fields="fields" ref="datatable" />
        <div class="d-flex justify-content-center">
              <b-button  size="md" class="d-flex align-items-center mt-2" variant="info">
                {{ $t('app.btn.save_add_location') }}
              </b-button>
        </div>
        <div class="bg-light mt-2 p-1 text-sm">
          <small>
            All listed areas will be allocated to the POS
          </small>
        </div>
      </b-col>
    </b-row>
    <b-row class="" v-show="currentStep == 6">
      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
       {{$t('app.content.create_contract')}}
      </b-col>
      <b-col cols="12" md="6" class="p-0">
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_id')"
            label-for="contract_id"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                :placeholder="$t('app.form.placeholder.default')"
                id="contract_id"
              >
              </b-form-input>
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_name')"
            label-for="contract_name"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="contract_name"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.begin_date')"
            label-for="begin_date"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="begin_date"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.end_date')"
            label-for="end_date"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="end_date"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.currency')"
            label-for="currency"
            label-cols-md="12"
          >
            <b-form-select
              id="currency"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_type')"
            label-for="contract_type"
            label-cols-md="12"
          >
            <b-form-select
              id="contract_type"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.document_contract_type')"
            label-for="document_contract_type"
            label-cols-md="12"
          >
            <b-form-select
              id="document_contract_type"
            />
          </b-form-group>
        </b-col>

      </b-col>
    </b-row>
    <b-row class="" v-show="currentStep == 7">
      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
       {{$t('app.content.create_contract')}} - {{$t('app.content.contract_areas')}}
      </b-col>
      <b-col cols="12" md="6" class="p-0">
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_id')"
            label-for="contract_id"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                :placeholder="$t('app.form.placeholder.automatic')"
                id="contract_id"
              >
              </b-form-input>
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_name')"
            label-for="contract_name"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="contract_name"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.pos_id')"
            label-for="pos_id"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="pos_id"
                :placeholder="$t('app.form.placeholder.automatic')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.area_id')"
            label-for="area_id"
            label-cols-md="12"
          >
          <b-row>
            <b-col>
              <b-form-select
                id="area_id"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.description')"
            label-for="description"
            label-cols-md="12"
          >
            <b-form-select
              id="description"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.usage_type')"
            label-for="usage_type"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-select
                id="usage_type"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.main_usage')"
            label-for="main_usage"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-select
                id="main_usage"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.rental_space_unit')"
            label-for="rental_space_unit"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="rental_space_unit"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.allocation_space_unit')"
            label-for="allocation_space_unit"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="allocation_space_unit"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.unit')"
            label-for="unit"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-select
                id="unit"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.valid_from')"
            label-for="valid_from"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="valid_from"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.valid_to')"
            label-for="valid_to"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="valid_to"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
      </b-col>
      <b-col cols="12" md="6" class="p-0"> 
        <Databases :filter="filter" link="user-edit" :currentPage="1" :pageOptions="[3, 5, 10]" :items="items" :fields="fields" ref="datatable" />
        <div class="d-flex justify-content-center">
              <b-button  size="md" class="d-flex align-items-center mt-2" variant="info">
                {{ $t('app.btn.save_add_contact') }} 
              </b-button>
        </div>
      </b-col>
    </b-row>
    <b-row class="" v-show="currentStep == 8">
      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
       {{$t('app.content.create_contract')}} - {{$t('app.content.contract_criteria')}}
      </b-col>
      <b-col cols="12" md="6" class="p-0">
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_id')"
            label-for="contract_id"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                :placeholder="$t('app.form.placeholder.automatic')"
                id="contract_id"
              >
              </b-form-input>
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_name')"
            label-for="contract_name"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="contract_name"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_criteria')"
            label-for="contract_criteria"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="contract_criteria"
                :placeholder="$t('app.form.placeholder.automatic')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.description')"
            label-for="description"
            label-cols-md="12"
          >
            <b-form-select
              id="description"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.valid_from')"
            label-for="valid_from"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="valid_from"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.valid_to')"
            label-for="valid_to"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="valid_to"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.exists')"
            label-for="exists"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="exists"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.value')"
            label-for="value"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="value"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
      </b-col>
      <b-col cols="12" md="6" class="p-0"> 
        <Databases :filter="filter" link="user-edit" :currentPage="1" :pageOptions="[3, 5, 10]" :items="items" :fields="fields" ref="datatable" />
        <div class="d-flex justify-content-center">
              <b-button  size="md" class="d-flex align-items-center mt-2" variant="info">
                {{ $t('app.btn.save_add_contact_cirteria') }} 
              </b-button>
        </div>
      </b-col>
    </b-row>
    <b-row class="" v-show="currentStep == 9">
      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
       {{$t('app.content.create_contract')}} - {{$t('app.content.contract_special_rights')}}
      </b-col>
      <b-col cols="12" md="6" class="p-0">
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_id')"
            label-for="contract_id"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                :placeholder="$t('app.form.placeholder.automatic')"
                id="contract_id"
              >
              </b-form-input>
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_name')"
            label-for="contract_name"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="contract_name"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_special_rights')"
            label-for="contract_special_rights"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="contract_special_rights"
                :placeholder="$t('app.form.placeholder.automatic')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.description')"
            label-for="description"
            label-cols-md="12"
          >
            <b-form-select
              id="description"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.valid_to')"
            label-for="valid_to"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="valid_to"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.prior_notice_date')"
            label-for="prior_notice_date"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="prior_notice_date"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.passive')"
            label-for="passive"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="passive"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.availed')"
            label-for="availed"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="availed"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
      </b-col>
      <b-col cols="12" md="6" class="p-0"> 
        <Databases :filter="filter" link="user-edit" :currentPage="1" :pageOptions="[3, 5, 10]" :items="items" :fields="fields" ref="datatable" />
        <div class="d-flex justify-content-center">
              <b-button  size="md" class="d-flex align-items-center mt-2" variant="info">
                {{ $t('app.btn.save_add_contact_special_right') }}
              </b-button>
        </div>
      </b-col>
    </b-row>
    <b-row class="" v-show="currentStep == 10">
      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
       {{$t('app.content.create_contract')}} - {{$t('app.content.contract_recurring_payments')}}
      </b-col>
      <b-col cols="12" md="6" class="p-0">
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_id')"
            label-for="contract_id"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                :placeholder="$t('app.form.placeholder.automatic')"
                id="contract_id"
              >
              </b-form-input>
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_name')"
            label-for="contract_name"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="contract_name"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.contract_recurring_payment_id')"
            label-for="contract_recurring_payment_id"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-select
                id="contract_recurring_payment_id"
                :placeholder="$t('app.form.placeholder.automatic')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.description')"
            label-for="description"
            label-cols-md="12"
          >
            <b-form-select
              id="description"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.recurring_payments_type')"
            label-for="recurring_payments_type"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-select
                id="recurring_payments_type"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.sum_per_moth')"
            label-for="sum_per_moth"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="sum_per_moth"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.condition_percentage')"
            label-for="condition_percentage"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="condition_percentage"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.percentage')"
            label-for="percentage"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="percentage"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            :label="$t('app.form.label.index_clause')"
            label-for="index_clause"
            label-cols-md="12"
          >
          <b-row>
            <b-col cols="12">
              <b-form-input
                id="index_clause"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-col>
          </b-row>
          </b-form-group>
        </b-col>
      </b-col>
      <b-col cols="12" md="6" class="p-0"> 
        <Databases :filter="filter" link="user-edit" :currentPage="1" :pageOptions="[3, 5, 10]" :items="items" :fields="fields" ref="datatable" />
        <div class="d-flex justify-content-center">
              <b-button  size="md" class="d-flex align-items-center mt-2" variant="info">
                {{ $t('app.btn.save_add_contact_recuring_payment') }} 
              </b-button>
        </div>
      </b-col>
    </b-row> 
  </div>
</template>

<script>

const Databases = () => import('@/layouts/components/DataTables.vue')

import {
  BCard,
  BTab, BFormCheckbox, BFormRadio,BInputGroup,
  BTabs, BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormSelect, BModal,
} from 'bootstrap-vue'

export default {
  name: "SPNBFormSteps",
  props: {
    currentStep:{
      type: Number,
      default:1
    }
  },
  components: {
    Databases,
    BCard,
    BTab,
    BTabs,
    BRow,
    BFormGroup,
    BCol,
    BForm,
    BFormInput,
    BButton,
    BModal,
    BFormSelect,
    BFormCheckbox,
    BFormRadio,
    BInputGroup,
  },
  data () {
    return {
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      items: [
        {
          id: 1,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 2,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 3,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 4,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 5,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
      ],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'name', label: this.$t('app.form.label.name'), sortable: true },
        { key: 'description', label: this.$t('app.form.label.description'), sortable: true },
        { key: 'fd', label: this.$t('app.form.label.description'), sortable: true },
        { key: 'fgf', label: this.$t('app.form.label.description'), sortable: true },
        { key: 'descfdription', label: this.$t('app.form.label.description'), sortable: true },
        { key: 'descdfription', label: this.$t('app.form.label.description'), sortable: true },
        this.$t('app.form.label.action'),
      ],
    }
  },
}
</script>

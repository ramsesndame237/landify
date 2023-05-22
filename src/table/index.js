import { getDocumentLink } from '@/libs/utils'
import moment from 'moment'
import { api } from '@/libs/axios'
import { successToast, errorToast } from '@/libs/toastification'
import _ from 'lodash'

export default {
  // region Work Package 1
  user: {
    entity: 'frontend_1_1_2_1',
    formComponent: () => import('@/views/app/CreateComponent/UserForm.vue'),
    fields: [
      {
        key: 'usertype_id',
        hideOnIndex: true,
        type: 'list',
        list: 'usertype',
        listLabel: 'usertype_name',
      },
      {
        key: 'user_id', label: 'Id', auto: true, hideOnForm: true,
      },
      {
        key: 'user_email', sortable: true, type: 'email',
      },
      {
        key: 'user_password',
        type: 'password',
        hideOnIndex: true,
        required: false,
        generate: true,
      },
      { key: 'user_password_reset_required', hideOnIndex: true, type: 'boolean' },
      { key: 'user_locked', hideOnIndex: true, hideOnCreate: true, type: 'boolean' },

      { key: 'user_firstname', sortable: true },
      { key: 'user_lastname', sortable: true },
      {
        key: 'user_abbreviation',
        sortable: true,
        hideOnIndex: true,
        disabled: true,
        hideOnUpdate: true,
        value: entity => (entity.user_firstname?.charAt(0) || '') + (entity.user_lastname?.charAt(0) || ''),
      },
      { key: 'user_abbreviation', sortable: true, hideOnIndex: true, hideOnCreate: true },
      // { key: 'user_function', sortable: true, hideOnIndex: true },

      {
        key: 'function_id',
        type: 'list',
        composite: true,
        listLabel: 'function_name',
        list: 'function',
        relationEntity: 'user_function_rel',
        hideOnIndex: true,
      },
      {
        key: 'user_functions',
        multiple: true,
        listLabel: 'function_name',
        tableKey: 'function_id',
        type: 'list',
        composite: true,
        list: 'function',
        relationEntity: 'user_function_rel',
        hideOnIndex: true,
        visible: (entity) => entity.usertype_id === 1,
      },
      {
        key: 'firmengroup_type',
        type: 'custom-select',
        hideOnIndex: true,
        required: false,
        items: [
          { value: 1, label: 'Company' },
          { value: 0, label: 'Partner Company' },
        ],
        change: (entity) => {
          if (entity.usertype_id === 1) return 0
          else return;
        },
        visible: (entity) => entity.usertype_id !== 1
      },
      {
        key: 'partnergroup_is_internal',
        visible: () => { return false },
        hideOnIndex: true,
        type: 'boolean',
        change: (entity) => {
          if (entity.usertype_id === 1) return 1
          else return 0;
        },
      },
      {
        key: 'partnergroup_id',
        type: 'list',
        send: false,
        list: 'partnergroup',
        listLabel: 'partnergroup_name',
        hideOnIndex: true,
        visible: entity => entity.firmengroup_type === 0,
        filter_key: 'partnergroup_is_internal',
        noFetchOnChange: true,
      },
      {
        key: 'partnercompany_id',
        type: 'list',
        list: 'frontend_2_5_1',
        listLabel: 'partnercompany_name',
        filter_key: 'partnergroup_id',
        relationEntity: 'user_partnercompany_rel',
        hideOnIndex: true,
        visible: entity => entity.firmengroup_type === 0,
      },
      {
        key: 'customergroup_id',
        type: 'list',
        send: false,
        list: 'customergroup',
        listLabel: 'customergroup_name',
        hideOnIndex: true,
        visible: entity => entity.firmengroup_type === 1,
      },
      {
        key: 'company_id',
        type: 'list',
        definition: 'company',
        list: 'frontend_2_2_3_1',
        listLabel: 'company_name',
        filter_key: 'customergroup_id',
        relationEntity: 'user_company_rel',
        hideOnIndex: true,
        visible: entity => entity.firmengroup_type === 1,
        // withNew: true
      },
      {
        key: 'user_last_login_time', sortable: true, hideOnForm: true, type: 'date', time: true,
      },
      {
        key: 'user_last_activity_time', sortable: true, hideOnForm: true, type: 'date', time: true,
      },
      { key: 'user_fix_phonenumber', hideOnIndex: true, required: false },
      { key: 'user_fax_phonenumber', hideOnIndex: true, required: false },
      { key: 'user_mobile' },
      {
        key: 'address_id',
        hideOnIndex: true,
        type: 'list',
        list: 'address',
        listLabel: 'address_street',
        withNew: true,
        alwaysNew: true,
        onlyForm: true,
      },
      {
        key: 'hollyday_representative',
        label: 'hollyday_representative',
        hideOnIndex: true,
        type: 'list',
        list: 'frontend_2_5_3_8',
        filter_key: 'partnercompany_id',
        listLabel: 'user_lastname',
        relationEntity: 'contactperson_user_rel',
        visible: (entity) => entity.usertype_id === 1 && entity.partnercompany_id,
        // hideOnCreate: true,
        required: false,
      }
    ],
    // updateComponent: () => import('@/views/app/FormComponent/UserForm'),
    relations: [
      {
        title: 'Roles',
        primaryKey: 'role_id',
        entity: 'user_role_grp',
        entityForm: 'user_role_rel',
        entityView: 'role',
        fields: [
          {
            key: 'role_is_internal',
            hideOnIndex: true,
            visible: () => false,
            value: (entity, vm) => vm.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs.form.entity.usertype_id === 1 ? 1 : 0,
          },
          {
            key: 'role_id',
            label: 'Role ID',
            sortable: true,
            type: 'list',
            list: 'role',
            listLabel: 'role_name',
            disableOnUpdate: true,
            filter_key: 'role_is_internal',
            noFetchOnChange: true,
            hideOnIndex: true,
          },
          {
            key: 'role_name', label: 'Role name', sortable: true, hideOnForm: true,
          },
          {
            key: 'role_permission', label: 'Permission', sortable: true, hideOnForm: true,
          },
          {
            key: 'user_role_valid_from', type: 'date', sortable: true, disableOnUpdate: true, composite: true,
          },
          {
            key: 'user_role_valid_to',
            type: 'date',
            rules: { date_after: ['@user_role_valid_from'] },
            required: false,
          },
        ],
      },
      {
        title: 'Customer Groups',
        primaryKey: 'customergroup_id',
        entity: 'user_customergroup_grp',
        entityForm: 'user_customergroup_rel',
        entityView: 'customergroup',
        visible: vm => !!vm.$refs.form.originalEntity.partnergroup_is_internal,
        fields: [
          {
            key: 'customergroup_id',
            label: 'ID',
            type: 'list',
            list: 'customergroup',
            listLabel: 'customergroup_name',
            sortable: true,
            disableOnUpdate: true,
          },
          { key: 'customergroup_name', sortable: true, hideOnForm: true },
          {
            key: 'user_customergroup_valid_from',
            sortable: true,
            type: 'date',
            composite: true,
            disableOnUpdate: true,
          },
          {
            key: 'user_customergroup_valid_to',
            type: 'date',
            rules: { date_after: ['@user_customergroup_valid_from'] },
            required: false,
          },
        ],
      },
      {
        title: 'Companies',
        primaryKey: 'company_id',
        entity: 'user_company_grp',
        entityForm: 'user_company_rel',
        entityView: 'company',
        visible: vm => !!vm.$refs.form.originalEntity.partnergroup_is_internal,
        fields: [
          {
            key: 'company_id',
            label: 'ID',
            sortable: true,
            type: 'list',
            list: 'company',
            listLabel: 'company_name',
            disableOnUpdate: true,
          },
          { key: 'company_name', sortable: true, hideOnForm: true },
          {
            key: 'user_company_valid_from', sortable: true, type: 'date', composite: true, disableOnUpdate: true,
          },
          {
            key: 'user_company_valid_to',
            required: false,
            type: 'date',
            rules: { date_after: ['@user_company_valid_from'] },
          },
        ],
      },
      {
        title: 'Point of sales',
        primaryKey: 'pos_id',
        entity: 'user_pos_grp',
        entityForm: 'user_pos_rel',
        entityView: 'pos',
        visible: vm => !!vm.$refs.form.originalEntity.partnergroup_is_internal,
        fields: [
          {
            key: 'customergroup_id',
            required: false,
            type: 'list',
            list: 'customergroup',
            listLabel: 'customergroup_name',
            send: false,
          },
          {
            key: 'company_id',
            required: false,
            type: 'list',
            list: 'frontend_2_2_3_1',
            listLabel: 'company_name',
            filter_key: 'customergroup_id',
          },
          {
            label: 'POS',
            key: 'pos_id',
            required: false,
            type: 'list',
            list: 'frontend_2_1_3_8',
            listLabel: 'pos_name',
            filter_key: 'company_id',
            multiple: true,
          },
          { key: 'pos_name', sortable: true, hideOnForm: true },
          {
            key: 'user_pos_valid_from', type: 'date', sortable: true, composite: true, disableOnUpdate: true,
          },
          {
            key: 'user_pos_valid_to', type: 'date', required: false, rules: { date_after: ['@user_pos_valid_from'] },
          },
        ],
      },
      {
        title: 'Teams',
        primaryKey: 'team_id',
        entity: 'user_team_grp',
        entityForm: 'user_team_rel',
        entityView: 'team',
        fields: [
          {
            key: 'team_id',
            label: 'Team Name',
            sortable: true,
            type: 'list',
            list: 'team',
            listLabel: 'team_name',
            disableOnUpdate: true,
            hideOnIndex: true,
          },
          { key: 'team_name', sortable: true, hideOnForm: true },
          { key: 'Roles', type: 'checkbox', items: [{ label: 'Role A', value: 0 }, { label: 'Role B', value: 1 }] },
          {
            key: 'user_team_valid_from', sortable: true, type: 'date', composite: true, disableOnUpdate: true,
          },
          {
            key: 'user_team_valid_to', required: false, type: 'date', rules: { date_after: ['@user_team_valid_from'] },
          },
        ],
      },
      // {
      //   title: 'Partner Companies',
      //   primaryKey: 'partnercompany_id',
      //   entity: 'user_partnercompany_grp',
      //   entityForm: 'user_partnercompany_rel',
      //   entityView: 'partnercompany',
      //   fields: [
      //     {
      //       key: 'partnercompany_id',
      //       label: 'ID',
      //       sortable: true,
      //       type: 'list',
      //       list: 'partnercompany',
      //       listLabel: 'partnercompany_name',
      //       disableOnUpdate: true,
      //     },
      //     { key: 'partnercompany_name', sortable: true, hideOnForm: true },
      //     {
      //       key: 'user_partnercompany_valid_from',
      //       sortable: true,
      //       type: 'date',
      //       composite: true,
      //       disableOnUpdate: true,
      //     },
      //     {
      //       key: 'user_partnercompany_valid_to',
      //       required: false,
      //       type: 'date',
      //       rules: { date_after: ['@user_partnercompany_valid_from'] },
      //     },
      //   ],
      // },
    ],
    default: {
      user_locked: 0,
      user_wrong_password_counter: 0,
      user_password_reset_required: 0,
      // user_password: 'Fsa!0dsadad',
      // user_mobile: '0711 252535838',
    },
    note: 'frontend_0_8_13',
    submit(vm) {
      const data = { ...vm.entity }
      const addressField = vm.$refs.fields.find(f => f.field.key === 'address_id')
      const userFunctions = vm.entity.user_functions.map(elt => ({ function_id: elt }))
      data.user_functions = userFunctions
      data.address = addressField.subEntity
      const cityField = addressField.getSubFields().find(f => f.field.key === 'city_id')
      data.address.city = cityField.subEntity
      // data.address.address_city_id = 1
      console.log(data)
      return (vm.create ? vm.$http.post('/users', data) : vm.$http.put(`/users/${vm.entityId}`, data))
        .then(() => {
          vm.$successToast(vm.create ? 'User Created' : 'User Updated')
        })
    },
    fetch(vm) {
      return vm.$http.get(`/users/${vm.entityId}`)
        .then(resp => {
          const data = resp.data
          if (data.contactperson) {
            data.contactperson_id = data.contactperson.contactperson_id
          }
          if (data.usertype) {
            data.usertype_id = data.usertype.usertype_id
          }
          if (data.company) {
            data.company_id = data.company.company_id
            if (data.company.customergroup) {
              data.customergroup_id = data.company.customergroup.customergroup_id
            }
            data.firmengroup_type = 1
          } else if (data.partnercompany) {
            data.partnercompany_id = data.partnercompany.partnercompany_id
            if (data.partnercompany.partnergroup) {
              data.partnergroup_id = data.partnercompany.partnergroup.partnergroup_id
            }
            data.firmengroup_type = 0
          }
          if (data.address) {
            data.address_id = data.address.address_id
            const addressField = vm.$refs.fields.find(f => f.field.key === 'address_id')
            addressField.getSubFields().forEach(field => {
              addressField.subEntity[field.field.key] = data.address[field.field.key]
              if (field.field.key === 'city_id' && data.address.city) {
                field.getSubFields().forEach(f => {
                  field.subEntity[f.field.key] = data.address.city[f.field.key]
                  if (f.field.key === 'country_id' && data.address.city.country) {
                    field.subEntity[f.field.key] = data.address.city.country[f.field.key]
                  }
                  console.log(f.field.key, data.address.city[f.field.key], field.subEntity)
                })
              }
            })
          }
          return data
        })
    },
  },
  access: {
    fields: [
      { key: 'access_id', auto: true, required: false },
      { key: 'access_name' },
    ],
  },
  role: {
    fields: [
      { key: 'role_id', auto: true },
      { key: 'role_name' },
      { key: 'role_is_internal', type: 'boolean' },
      { key: 'role_permission' },
    ],
    relations: [
      {
        title: 'Access',
        primaryKey: 'access_id',
        entity: 'role_access_grp',
        entityForm: 'role_access_rel',
        entityView: 'access',
        update: false,
        view: false,
        fields: [
          {
            key: 'access_id',
            label: 'ID',
            sortable: true,
            type: 'list',
            list: 'access',
            listLabel: 'access_name',
          },
          { key: 'access_name', sortable: true, hideOnForm: true },
        ],
      },
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'user_role_grp',
        entityForm: 'user_role_rel',
        entityView: 'user',
        fields: [
          {
            key: 'user_id',
            sortable: true,
            type: 'list',
            list: 'user',
            listLabel: 'user_firstname',
            hideOnIndex: true,
            disableOnUpdate: true,
          },
          { key: 'user_firstname', sortable: true, hideOnForm: true },
          {
            key: 'user_role_valid_from', type: 'date', disableOnUpdate: true, composite: true,
          },
          {
            key: 'user_role_valid_to',
            type: 'date',
            rules: { date_after: ['@user_role_valid_from'] },
            sortable: true,
          },
        ],
      },
      {
        title: 'Table Groups',
        primaryKey: 'tablegroup_id',
        entity: 'role_tablegroup_crud_grp',
        entityForm: 'role_tablegroup_crud_rel',
        entityView: 'tablegroup',
        update: false,
        fields: [
          {
            key: 'tablegroup_id', type: 'list', list: 'tablegroup', listLabel: 'tablegroup_name',
          },
          {
            key: 'crud', type: 'list', list: 'crud', listLabel: 'crud', composite: true,
          },
          { key: 'tablegroup_name', hideOnForm: true },
          { key: 'tablegroup_description', hideOnForm: true },
        ],
      },
      {
        title: 'Tables',
        primaryKey: 'table_name',
        composite: ['table_name', 'crud'],
        entity: 'role_tablename_crud_grp',
        entityForm: 'role_tablename_crud_rel',
        entityView: 'tablename',
        update: false,
        fields: [
          {
            key: 'table_name', sortable: true, type: 'list', list: 'tablename', listLabel: 'table_name',
          },
          {
            key: 'crud', type: 'list', list: 'crud', listLabel: 'crud', composite: true,
          },
        ],
      },
    ],
  },
  team: {
    fields: [
      { key: 'team_id', auto: true },
      { key: 'team_name', sortable: true },
      { key: 'team_description', type: 'textarea' },
    ],
    relations: [
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'user_team_grp',
        entityForm: 'user_team_rel',
        view: false,
        fields: [
          {
            key: 'user_id',
            type: 'list',
            list: 'user',
            listLabel: 'user_email',
            disableOnUpdate: true,
            multiple: true
          },
          { key: 'user_firstname', hideOnForm: true },
          { key: 'user_lastname', hideOnForm: true },
          { key: 'team_name', sortable: true, hideOnForm: true },
          {
            key: 'user_team_valid_from', sortable: true, type: 'date', composite: true, disableOnUpdate: true,
          },
          {
            key: 'user_team_valid_to', required: false, type: 'date', rules: { date_after: ['@user_team_valid_from'] },
          },
        ],
      },
      {
        title: 'Roles',
        primaryKey: 'role_id',
        entity: 'team_role_grp',
        entityForm: 'team_role_rel',
        view: false,
        update: false,
        fields: [
          {
            key: 'role_id',
            type: 'list',
            list: 'role',
            listLabel: 'role_name',
            multiple: true,
            hideOnIndex: true,
          },
          { key: 'role_name', hideOnForm: true },
        ],
      },
    ],
  },
  usertype: {
    fields: [
      { key: 'usertype_id', label: 'Id', auto: true },
      { key: 'usertype_name' },
      {
        key: 'usertype_description',
        type: 'textarea',
      },
      { key: 'usertype_external', type: 'boolean' },
    ],
  },
  tablename: {
    primaryKey: 'table_name',
    fields: [
      { key: 'table_name', sortable: true },
    ],
  },
  tablegroup: {
    primaryKey: 'tablegroup_id',
    fields: [
      {
        key: 'tablegroup_id', label: 'ID', sortable: true, hideOnForm: true,
      },
      { key: 'tablegroup_name', label: 'Name', sortable: true },
      {
        key: 'tablegroup_description', label: 'Description', sortable: true, type: 'textarea',
      },
    ],
    relations: [
      {
        title: 'Tables',
        primaryKey: 'table_name',
        entity: 'tablename_tablegroup_grp',
        entityForm: 'tablename_tablegroup_rel',
        entityView: 'tablename',
        update: false,
        fields: [
          {
            key: 'table_name', sortable: true, type: 'list', list: 'tablename', listLabel: 'table_name',
          },
        ],
      },
    ],
  },
  crud: {
    primaryKey: 'crud',
    fields: [
      { key: 'crud', label: 'Crud', sortable: true },
    ],
  },
  // endregion
  // region Work Package 2
  customergroup: {
    entity: 'frontend_2_2_1',
    fields: [
      { key: 'customergroup_id', auto: true },
      { key: 'customergroup_name' },
      {
        key: 'customergroup_description', hideOnIndex: true, type: 'textarea', required: false,
      },
      { key: 'company_count', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Companies',
        primaryKey: 'company_id',
        entity: 'frontend_2_2_3_1',
        entityForm: 'customergroup_company_rel',
        update: false,
        create: false,
        entityView: 'company',
        fields: [
          {
            key: 'company_id', sortable: true, type: 'list', list: 'company', listLabel: 'company_name',
          },
          { key: 'company_name', sortable: true, hideOnForm: true },
          { key: 'city_zip', sortable: true, hideOnForm: true },
          { key: 'city_name', sortable: true, hideOnForm: true },
          { key: 'country_short', sortable: true, hideOnForm: true },
        ],
      },
      {
        title: 'Contact Person',
        primaryKey: 'contactperson_id',
        entity: 'frontend_2_2_3_2',
        entityForm: 'contactperson_customergroup_rel',
        entityView: 'contactperson',
        update: false,
        // change from franck
        create: false,
        formComponent: () => import('@/views/app/FormComponent/CustomerGroupContactPerson.vue'),
        fields: [
          {
            key: 'contactperson_id',
            sortable: true,
            type: 'list',
            list: 'contactperson',
            listLabel: 'contactperson_firstname',
            alwaysNew: true,
            onlyForm: true,
          },
          { key: 'company_name', hideOnForm: true },
          { key: 'contactperson_lastname', sortable: true, hideOnForm: true },
          { key: 'contactperson_firstname', sortable: true, hideOnForm: true },
          { key: 'contactsalutation_name', sortable: true, hideOnForm: true },
          { key: 'contacttitle_name', sortable: true, hideOnForm: true },
          { key: 'contactperson_department', sortable: true, hideOnForm: true },
          { key: 'contactperson_function', sortable: true, hideOnForm: true },
          { key: 'contactdetails_email', sortable: true, hideOnForm: true },
          { key: 'contactdetails_phone', sortable: true, hideOnForm: true },
          { key: 'contactdetails_mobile', sortable: true, hideOnForm: true },
          { key: 'city_name', sortable: true, hideOnForm: true },
        ],
      },
      {
        title: 'Tickets',
        primaryKey: 'ticket_id',
        entity: 'frontend_2_2_3_3',
        create: false,
        edit: false,
        delete: false,
        fields: [
          {
            key: 'ticket_id',
            sortable: true,
            type: 'list',
            list: 'ticket',
            listLabel: 'ticket_name',
            hideOnIndex: true,
          },
          { key: 'ticket_name', sortable: true, hideOnForm: true },
          { key: 'ticket_description', sortable: true, hideOnForm: true },
          { key: 'ticket_Deadline', sortable: true, hideOnForm: true },
          {
            key: 'contradictionpackage_count', label: 'ContradictionPackage count', sortable: true, hideOnForm: true,
          },
          {
            key: 'contradictionpackage_sum', label: 'ContradictionPackage Amount', sortable: true, hideOnForm: true,
          },
          {
            key: 'ticket_count', label: 'Tickets count', sortable: true, hideOnForm: true,
          },
        ],
      },
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'frontend_2_2_3_4',
        entityForm: 'user_customergroup_rel',
        entityView: 'user',
        fields: [
          {
            key: 'user_id', sortable: true, type: 'list', list: 'user', listLabel: 'user_lastname', hideOnIndex: false,
          },
          { key: 'user_lastname', sortable: true, hideOnForm: true },
          { key: 'user_firstname', sortable: true, hideOnForm: true },
          { key: 'usertype_name', sortable: true, hideOnForm: true },
          { key: 'team_name', sortable: true, hideOnForm: true },
          {
            key: 'user_customergroup_valid_from',
            sortable: true,
            type: 'date',
            composite: true,
            disableOnUpdate: true,
          },
          {
            key: 'user_customergroup_valid_to',
            type: 'date',
            rules: { date_after: ['@user_customergroup_valid_from'] },
            sortable: true,
          },
        ],
      },
    ],
  },
  bankdata: {
    fields: [
      { key: 'bankdata_id', auto: true },
      { key: 'bankdata_iban' },
      { key: 'bankdata_bic', required: false },
      { key: 'bankdata_bank_name' },
      { key: 'bankdata_account_number', required: false },
      { key: 'bankdata_vat', required: false },
      { key: 'bankdata_is_active', type: 'boolean' },
    ],
  },
  company: {
    entity: 'frontend_2_1_1',
    primaryKey: 'company_id',
    formComponent: () => import('@/views/app/CreateComponent/CompanyForm.vue'),
    fields: [
      { key: 'company_id', auto: true },
      { key: 'company_name' },
      { key: 'company_shortname' },
      {
        key: 'customergroup_id',
        hideOnIndex: true,
        type: 'list',
        list: 'customergroup',
        listLabel: 'customergroup_name',
        relationEntity: 'customergroup_company_rel',
      },
      { key: 'customergroup_name', sortable: true, hideOnForm: true },
      {
        key: 'address_id',
        type: 'list',
        list: 'address',
        listLabel: 'address_street',
        withNew: true,
        alwaysNew: true,
        onlyForm: true,
        hideOnIndex: true,
      },
      {
        key: 'contactdetails_id',
        type: 'list',
        list: 'contactdetails',
        listLabel: 'contactdetails_email',
        withNew: true,
        alwaysNew: true,
        hideOnIndex: true,
        onlyForm: true,
      },
      {
        key: 'companydetails_id',
        type: 'list',
        list: 'companydetails',
        listLabel: 'companydetails_salestaxno',
        withNew: true,
        alwaysNew: true,
        hideOnIndex: true,
        onlyForm: true,
      },
      {
        key: 'create_contactperson',
        type: 'boolean',
        hideOnUpdate: true,
        hideOnIndex: true,

      },
      {
        key: 'contactperson_id',
        type: 'list',
        list: 'contactperson',
        listLabel: 'contactperson_name',
        withNew: true,
        alwaysNew: true,
        hideOnIndex: true,
        onlyForm: true,
        visible: (entity) => entity.create_contactperson === 1
      },

      { key: 'city_name', sortable: true, hideOnForm: true },
      { key: 'contactdetails_phone', sortable: true, hideOnForm: true },
      { key: 'contactdetails_email', sortable: true, hideOnForm: true },
      {
        key: 'contactpersons_count', sortable: true, hideOnForm: true,
      },
    ],
    relations: [
      {
        title: 'ticket',
        primaryKey: 'ticket_id',
        entity: 'frontend_2_1_3_1_read_ticket',
        newRoute: { name: 'table-form', params: { table: 'ticket' } },
        fields: [
          {
            key: 'ticket_id', type: 'list', list: 'ticket', listLabel: 'ticket_name',
          },
          { key: 'ticket_name', hideOnForm: true },
          { key: 'board_name', hideOnForm: true },
          { key: 'ticket_deadline', hideOnForm: true },
          { key: 'ticket_planned_treatment_week', hideOnForm: true },
          { key: 'ticket_progress', hideOnForm: true },
        ],
      },
      {
        title: 'contradiction',
        primaryKey: 'contradiction_id',
        entity: 'frontend_2_1_3_2',
        create: false,
        update: false,
        // delete: false,
        fields: [
          {
            key: 'contradiction_id', type: 'list', list: 'contradiction', listLabel: 'contradiction_name',
          },
          { key: 'contradiction_name', hideOnForm: true },
          { key: 'contradiction_last_change_time', type: 'date', hideOnForm: true },
          { key: 'contradiction_letter_send_time', type: 'date', hideOnForm: true },
          { key: 'contradiction_ready_to_comm', hideOnForm: true },
          { key: 'contradiction_payment_received', hideOnForm: true },
          { key: 'contradictiontask_count', type: 'number', hideOnForm: true },
          { key: 'contradictionpoint_count', type: 'number', hideOnForm: true },
        ],
      },
      {
        title: 'Reviews Invoices',
        primaryKey: 'invoice_id',
        entity: 'frontend_2_1_3_3',
        create: false,
        delete: false,
        entityView: 'invoice',
        update: false,
        fields: [
          {
            key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_name',
          },
          { key: 'invoice_date', type: 'date', hideOnForm: true },
          { key: 'invoice_contract_year', type: 'number', hideOnForm: true },
          { key: 'invoice_allocation_area', hideOnForm: true },
          { key: 'invoice_payment_date', type: 'date', hideOnForm: true },
          { key: 'customergroup_name', hideOnForm: true },
          {
            key: 'customergroup_id',
            type: 'list',
            list: 'customergroup',
            listLabel: 'customergroup_name',
            hideOnIndex: true,
          },
        ],
      },
      {
        title: 'Sales Order SFM',
        primaryKey: 'product_id',
        entity: 'frontend_2_1_3_4',
        entityForm: 'company_product_rel',
        view: false,
        fields: [
          {
            key: 'product_id', type: 'list', list: 'product', listLabel: 'product_name',
          },
          { key: 'product_short' },
          { key: 'product_name' },
          { key: 'salesorder_valid_from_date', type: 'date', composite: true },
          { key: 'salesorder_valid_to_date', type: 'date' },
          { key: 'product_active_from_date', type: 'date', required: false },
          { key: 'product_active_to_date', type: 'date', required: false },
          { key: 'salesorder_confirmation_date', type: 'date' },
        ],
      },
      {
        title: 'Contact Persons',
        primaryKey: 'contactperson_id',
        entity: 'frontend_2_1_3_5',
        entityForm: 'contactperson_company_rel',
        entityView: 'contactperson',
        update: false,
        fields: [
          {
            key: 'contactperson_id',
            type: 'list',
            list: 'contactperson',
            listLabel: 'contactperson_lastname',
            alwaysNew: true,
            onlyForm: true,
          },
          { key: 'contactperson_lastname', hideOnForm: true },
          { key: 'contactperson_firstname', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
          { key: 'contactdetails_email', hideOnForm: true },
          { key: 'contactdetails_phone', hideOnForm: true },
          { key: 'contactdetails_mobile', hideOnForm: true },
          { key: 'contactperson_department', hideOnForm: true },
        ],
      },
      {
        title: 'Appointment Track',
        create: false,
        delete: false,
        update: false,
      },
      {
        title: 'bankdata',
        entity: 'frontend_2_1_3_7',
        entityForm: 'company_bankdata_rel',
        primaryKey: 'bankdata_id',
        fields: [
          {
            key: 'bankdata_id', type: 'list', list: 'bankdata', alwaysNew: true, onlyForm: true,
          },
          { key: 'bankdata_bank_name', hideOnForm: true },
          { key: 'bankdata_account_number', hideOnForm: true },
          { key: 'bankdata_iban', hideOnForm: true },
          { key: 'bankdata_bic', hideOnForm: true },
          { key: 'bankdata_vat', hideOnForm: true },
          { key: 'bankdata_is_active', hideOnForm: true },
        ],
        view: false,
      },
      {
        title: 'Point of Sales',
        entity: 'frontend_2_1_3_8',
        primaryKey: 'pos_id',
        entityForm: 'company_pos_rel',
        entityView: 'pos',
        update: false,
        fields: [
          {
            key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
          },
          { key: 'pos_name', hideOnForm: true },
          { key: 'pos_branchnumber', hideOnForm: true },
          { key: 'pos_name_external', hideOnForm: true },
          { key: 'location_count', hideOnForm: true },
          { key: 'area_count', hideOnForm: true },
          { key: 'pos_first_year', hideOnForm: true },
        ],
      },
      {
        title: 'Payments',
        primaryKey: 'payment_id',
        entity: 'frontend_2_1_3_9',
        entityForm: 'company_payment_rel',
        entityView: 'payment',
        fields: [
          {
            key: 'payment_id', type: 'list', list: 'payment', alwaysNew: true, onlyForm: true, without: 'company_id',
          },
          { key: 'payment_info', hideOnForm: true },
          { key: 'payment_debitor', hideOnForm: true },
          { key: 'payment_value', type: 'number', hideOnForm: true },
          { key: 'payment_objectreference', hideOnForm: true },
          { key: 'payment_date', type: 'date', hideOnForm: true },
          { key: 'payment_type', hideOnForm: true },
        ],
      },
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'frontend_2_1_3_10',
        entityForm: 'user_company_rel',
        entityView: 'user',
        fields: [
          {
            key: 'user_id', type: 'list', list: 'user', listLabel: 'user_firstname',
          },
          { key: 'user_lastname', hideOnForm: true },
          { key: 'user_firstname', hideOnForm: true },
          { key: 'usertype_name', hideOnForm: true },
          { key: 'team_name', hideOnForm: true },
          { key: 'user_last_login_time', hideOnForm: true },
          {
            key: 'user_company_valid_from', sortable: true, type: 'date', composite: true, disableOnUpdate: true,
          },
          {
            key: 'user_company_valid_to',
            sortable: true,
            type: 'date',
            rules: { date_after: ['@user_company_valid_from'] },
          },
        ],
      },
    ],
    note: 'frontend_0_8_11',
  },
  contactperson: {
    entity: 'frontend_2_3_1',
    create: false,
    fieldComponent: () => import('@/views/app/CreateComponent/ContactPersonForm.vue'),
    fields: [
      { key: 'contactperson_id', auto: true },
      {
        key: 'user_type',
        label: 'User type',
        type: 'custom-select',
        hideOnIndex: true,
        required: false,
        items: [
          { value: 1, label: 'Internal' },
          { value: 0, label: 'External' },
        ],
        send: false,
        visible: () => false,
        value: () => 0
      },
      { key: 'contactperson_firstname' },
      { key: 'contactperson_lastname' },
      { key: 'city_name', hideOnForm: true },
      { key: 'contactdetails_phone', hideOnForm: true },
      { key: 'contactdetails_email', hideOnForm: true },
      { key: 'contactperson_department', hideOnIndex: true, rules: { required: false } },
      {
        key: 'contactperson_shortname',
        hideOnIndex: true,
        hideOnUpdate: true,
        disabled: true,
        value: entity => (entity.contactperson_firstname?.charAt(0) || '') + (entity.contactperson_lastname?.charAt(0) || ''),
      },
      { key: 'contactperson_function', rules: { required: false } },
      {
        key: 'user_id', type: 'list', list: 'user', listLabel: 'user_email', rules: { required: false },
      },
      {
        key: 'contactdetails_id',
        type: 'list',
        list: 'contactdetails',
        listLabel: 'contactdetails_email',
        hideOnIndex: true,
        alwaysNew: true,
        onlyForm: true,
      },
      {
        key: 'contactsalutation_id',
        type: 'list',
        list: 'contactsalutation',
        listLabel: 'contactsalutation_name',
        hideOnIndex: true,
        rules: { required: false },
      },
      {
        key: 'contacttitle_id',
        type: 'list',
        list: 'contacttitle',
        listLabel: 'contacttitle_name',
        hideOnIndex: true,
        rules: { required: false },
      },
      {
        key: 'address_id',
        type: 'list',
        list: 'address',
        listLabel: 'address_street',
        hideOnIndex: true,
        alwaysNew: true,
        onlyForm: true,
      },
    ],
    note: 'frontend_0_8_10',
  },
  payment: {
    entity: 'frontend_2_4_1',
    fields: [
      { key: 'payment_id', auto: true },
      {
        key: 'company_id',
        type: 'list',
        list: 'company',
        listLabel: 'company_name',
        relationEntity: 'company_payment_rel',
      },
      { key: 'company_name', hideOnForm: true },
      { key: 'payment_info' },
      { key: 'payment_debitor' },
      { key: 'payment_objectreference' },
      { key: 'payment_value' },
      { key: 'payment_date', type: 'date' },
      { key: 'payment_type' },
    ],
  },
  partnercompany: {
    entity: 'frontend_2_5_1',
    primaryKey: 'partnercompany_id',
    formComponent: () => import('@/views/app/FormComponent/PartnerCompanyForm.vue'),
    fields: [
      { key: 'partnercompany_id', auto: true },
      {
        key: 'partnergroup_is_internal',
        label: 'partner group type',
        type: 'custom-select',
        hideOnIndex: true,
        required: false,
        items: [
          { value: 1, label: 'Internal' },
          { value: 0, label: 'External' },
        ],
        send: false,
      },
      {
        key: 'partnergroup_id',
        type: 'list',
        list: 'partnergroup',
        listLabel: 'partnergroup_name',
        hideOnIndex: true,
        filter_key: 'partnergroup_is_internal',
        noFetchOnChange: true,
      },
      { key: 'partnercompany_name' },
      // { key: 'partnercompany_shortname' },
      { key: 'partnergroup_name', hideOnForm: true },
      { key: 'city_name', hideOnForm: true },
      { key: 'contactdetails_email', hideOnForm: true },
      { key: 'contactpersons_count', hideOnForm: true },
      { key: 'locations_count', hideOnForm: true },
      {
        key: 'address_id',
        hideOnIndex: true,
        type: 'list',
        list: 'address',
        listLabel: 'address_street',
        withNew: true,
        alwaysNew: true,
        onlyForm: true,
      },
      {
        key: 'contactdetails_id',
        hideOnIndex: true,
        type: 'list',
        list: 'contactdetails',
        listLabel: 'contactdetails_email',
        withNew: true,
        alwaysNew: true,
        onlyForm: true,
      },
      {
        key: 'companydetails_id',
        hideOnIndex: true,
        type: 'list',
        list: 'companydetails',
        listLabel: 'companydetails_commercialregisterno',
        withNew: true,
        alwaysNew: true,
        onlyForm: true,
      },
      {
        key: 'partnercompany_type',
        type: 'checkbox',
        items: [
          { label: 'Option A', value: 0 },
          { label: 'Option B', value: 1 },
          { label: 'Option C', value: 3 },
        ],
      },
    ],
    relations: [
      {
        title: 'ticket',
        primaryKey: 'ticket_id',
        entity: 'frontend_2_5_3_1_tickets',
        create: false,
        update: false,
        delete: false,
        fields: [
          {
            key: 'ticket_id', type: 'list', list: 'ticket', listLabel: 'ticket_name',
          },
          { key: 'ticket_name', hideOnForm: true },
          { key: 'column_id', hideOnForm: true },
          { key: 'board_name', hideOnForm: true },
          { key: 'ticket_deadline', hideOnForm: true },
          { key: 'ticket_planned_treatment_week', hideOnForm: true },
          { key: 'ticket_progress', hideOnForm: true },
        ],
      },
      {
        title: 'Contradictions',
        primaryKey: 'contradiction_id',
        entity: 'frontend_2_5_3_2',
        create: false,
        update: false,
        delete: false,
        entityView: 'contradiction',
        fields: [
          {
            key: 'contradiction_id', type: 'list', list: 'contradiction', listLabel: 'contradiction_name',
          },
          { key: 'contradiction_name', hideOnForm: true },
          { key: 'contradiction_last_change_time', hideOnForm: true },
          { key: 'contradiction_letter_send_time', hideOnForm: true },
          { key: 'contradiction_ready_to_comm', hideOnForm: true },
          { key: 'contradiction_payment_received', hideOnForm: true },
          { key: 'contradictiontask_count', hideOnForm: true },
          { key: 'contradictionpoint_count', hideOnForm: true },
        ],
      },
      {
        title: 'Reviews Invoices',
        primaryKey: 'invoice_id',
        entity: 'frontend_2_5_3_3',
        create: false,
        update: false,
        delete: false,
        entityView: 'invoice',
        fields: [
          {
            key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_description',
          },
          { key: 'invoice_date', type: 'date', hideOnForm: true },
          { key: 'invoice_contract_year', type: 'number', hideOnForm: true },
          { key: 'Invoice_company_name', hideOnForm: true },
          { key: 'invoice_payment_date', hideOnForm: true },
          { key: 'customergroup_name', hideOnForm: true },
          { key: 'partnercompany_name', hideOnForm: true },
        ],
      },
      {
        title: 'Contact Persons',
        primaryKey: 'contactperson_id',
        entity: 'frontend_2_5_3_5',
        update: false,
        entityView: 'contactperson',
        fields: [
          {
            key: 'contactperson_id',
            type: 'list',
            list: 'contactperson',
            listLabel: 'contactperson_lastname',
            alwaysNew: true,
            onlyForm: true,
          },
          { key: 'contactperson_lastname', hideOnForm: true },
          { key: 'contactperson_firstname', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
          { key: 'contactdetails_email', hideOnForm: true },
          { key: 'contactdetails_phone', hideOnForm: true },
          { key: 'contactdetails_Mobile', hideOnForm: true },
          { key: 'contactperson_department', hideOnForm: true },
        ],
      },
      {
        title: 'Locations',
        primaryKey: 'location_id',
        entity: 'frontend_2_5_3_7',
        entityForm: 'location_partnercompany_partnertype_rel',
        entityView: 'location',
        fields: [
          {
            key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
          },
          { key: 'location_name', hideOnForm: true },
          { key: 'partnercompany_name', hideOnForm: true },
          { key: 'partnertype_name', hideOnForm: true },
          { key: 'locationtype_name', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
          { key: 'country_name', hideOnForm: true },
          { key: 'area_count', hideOnForm: true },
          {
            key: 'partnertype_id',
            hideOnIndex: true,
            type: 'list',
            composite: true,
            list: 'partnertype',
            listLabel: 'partnertype_name',
            disableOnUpdate: true,
          },
          {
            key: 'location_partnercompany_partnertype_valid_from_date',
            type: 'date',
            composite: true,
            disableOnUpdate: true,
          },
          { key: 'location_partnercompany_partnertype_valid_to_date', type: 'date' },
        ],
      },
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'frontend_2_5_3_8',
        entityForm: 'user_partnercompany_rel',
        entityView: 'user',
        fields: [
          {
            key: 'user_id', type: 'list', list: 'user', listLabel: 'user_lastname',
          },
          { key: 'user_lastname', hideOnForm: true },
          { key: 'user_firstname', hideOnForm: true },
          { key: 'user_email', hideOnForm: true },
          { key: 'user_last_login_time', hideOnForm: true },
          { key: 'user_locked', hideOnForm: true },
          {
            key: 'user_partnercompany_valid_from',
            sortable: true,
            type: 'date',
            composite: true,
            disableOnUpdate: true,
          },
          {
            key: 'user_partnercompany_valid_to',
            sortable: true,
            type: 'date',
            rules: { date_after: ['@user_partnercompany_valid_from'] },
          },
        ],
      },
    ],
    note: 'frontend_0_8_4',
  },
  partnergroup: {
    primaryKey: 'partnergroup_id',
    entity: 'frontend_2_6_1',
    fields: [
      { key: 'partnergroup_id', auto: true },
      { key: 'partnergroup_name' },
      { key: 'partnergroup_is_internal', type: 'boolean' },
      // { key: 'partnertype_name', hideOnForm: true },
      // {
      //   key: 'partnertype_id', hideOnIndex: true, type: 'list', list: 'partnertype', listLabel: 'partnertype_name',
      // },
      {
        key: 'partnergroup_description', hideOnIndex: true, type: 'textarea', required: false,
      },
      { key: 'partnercompany_count', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Partner Company',
        primaryKey: 'partnercompany_id',
        entity: 'frontend_2_6_3_1',
        entityForm: 'partnercompany_partnergroup_rel',
        entityView: 'partnercompany',
        update: false,
        fields: [
          {
            key: 'partnercompany_id', type: 'list', list: 'partnercompany', listLabel: 'partnercompany_name',
          },
          { key: 'partnercompany_name', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
          { key: 'country_name', hideOnForm: true },
          { key: 'location_count', hideOnForm: true },
        ],
      },
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'frontend_2_6_3_2',
        entityForm: 'user_partnergroup_rel',
        entityView: 'user',
        fields: [
          {
            key: 'user_id', type: 'list', list: 'user', listLabel: 'user_email', disableOnUpdate: true,
          },
          { key: 'user_lastname', hideOnForm: true },
          { key: 'user_firstname', hideOnForm: true },
          { key: 'user_email', hideOnForm: true },
          {
            key: 'user_partnergroup_valid_from',
            type: 'date',
            composite: true,
            disableOnUpdate: true,
          },
          {
            key: 'user_partnergroup_valid_to',
            type: 'date',
            rules: { date_after: ['@user_partnergroup_valid_from'] },
          },
        ],
      },
      {
        title: 'Contact Persons',
        primaryKey: 'contactperson_id',
        entity: 'frontend_2_6_3_3',
        entityForm: 'partnergroup_contactperson_rel',
        entityView: 'contactperson',
        update: false,
        formComponent: () => import('@/views/app/FormComponent/PartnerGroupContactPerson'),
        fields: [
          {
            key: 'contactperson_id',
            type: 'list',
            list: 'contactperson',
            listLabel: 'contactperson_name',
            alwaysNew: true,
            onlyForm: true,
          },
          { key: 'contactperson_lastname', hideOnForm: true },
          { key: 'contactperson_firstname', hideOnForm: true },
          { key: 'contacttitle_name', hideOnForm: true },
          { key: 'contactsalutation_name', hideOnForm: true },
          { key: 'contactperson_department', hideOnForm: true },
          { key: 'contactperson_function', hideOnForm: true },
          { key: 'contactdetails_email', hideOnForm: true },
          { key: 'contactdetails_phone', hideOnForm: true },
          { key: 'contactdetails_mobile', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
        ],
      },
    ],
  },
  address: {
    primaryKey: 'address_id',
    entity: 'frontend_2_7_1',
    fieldComponent: () => import('@/views/app/FormComponent/AddressForm.vue'),
    fields: [
      { key: 'address_id', auto: true },
      { key: 'address_street' },
      { key: 'address_house_number' },
      { key: 'address_extra', rules: { required: false } },
      {
        key: 'city_id',
        type: 'list',
        list: 'city',
        entityList: 'frontend_2_10_1',
        listLabel: 'city_name',
        hideOnIndex: true,
        alwaysNew: true,
        onlyForm: true,
      },
      { key: 'city_zip', hideOnForm: true },
      { key: 'city_name', hideOnForm: true },
      { key: 'country_name', hideOnForm: true },
      { key: 'address_last_change_time', hideOnForm: true },
      { key: 'entries_count', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Companies',
        primaryKey: 'company_id',
        entity: 'company_address_grp',
        entityForm: 'company_address_rel',
        entityView: 'company',
        update: false,
        create: false,
        delete: false,
        fields: [
          {
            key: 'company_id', sortable: true, type: 'list', list: 'company', listLabel: 'company_name',
          },
          { key: 'company_name', sortable: true, hideOnForm: true },
        ],
      },
      {
        title: 'Locations',
        primaryKey: 'company_id',
        entity: 'location_address_grp',
        entityView: 'location',
        update: false,
        create: false,
        delete: false,
        fields: [
          {
            key: 'location_id',
          },
          { key: 'location_name' },
        ],
      },
      {
        title: 'Contact Persons',
        primaryKey: 'contactperson_id',
        entity: 'contactperson_address_grp',
        entityView: 'contactperson',
        update: false,
        create: false,
        delete: false,
        fields: [
          {
            key: 'contactperson_id',
          },
          { key: 'contactperson_firstname' },
          { key: 'contactperson_lastname' },
        ],
      },
      {
        title: 'Partner Companies',
        primaryKey: 'partnercompany_id',
        entity: 'partnercompany_address_grp',
        entityView: 'partnercompany',
        update: false,
        create: false,
        delete: false,
        fields: [
          {
            key: 'partnercompany_id',
          },
          { key: 'partnercompany_name' },
        ],
      },
    ],

  },
  contactdetails: {
    primaryKey: 'contactdetails_id',
    fields: [
      {
        key: 'contactdetails_id', sortable: true, auto: true, hiddenOnForm: true,
      },
      { key: 'contactdetails_email', required: false },
      { key: 'contactdetails_phone', required: false },
      { key: 'contactdetails_mobile', required: false },
      { key: 'contactdetails_fax', required: false },
    ],
  },
  companydetails: {
    primaryKey: 'companydetails_id',
    fields: [
      {
        key: 'companydetails_id', sortable: true, auto: true, hiddenOnForm: true,
      },
      { key: 'companydetails_salestaxno', required: false },
      { key: 'companydetails_commercialregisterno', required: false },
      { key: 'companydetails_website', required: false },
    ],
  },
  contacttitle: {
    primaryKey: 'contacttitle_id',
    fields: [
      { key: 'contacttitle_id', sortable: true, auto: true },
      { key: 'contacttitle_name', sortable: true },
    ],
  },
  contactsalutation: {
    primaryKey: 'contactsalutation_id',
    fields: [
      { key: 'contactsalutation_id', sortable: true, auto: true },
      { key: 'contactsalutation_name', sortable: true },
      { key: 'contactsalutation_lettertext', sortable: true, type: 'textarea' },
    ],
  },
  city: {
    primaryKey: 'city_id',
    entity: 'frontend_2_10_1',
    fields: [
      { key: 'city_id', sortable: true, auto: true },
      { key: 'city_name', sortable: true },
      { key: 'city_zip', sortable: true },
      {
        key: 'state',
        sortable: true,
        required: false,
        change: (entity, vm) => {
          let city_state
          if (entity.city_zip) {
            const debounced = _.debounce(
              () => vm.$http
                .get(`/users/state/${entity.city_zip}`)
                .then(async (resp) => {
                  if (resp.data?.state) city_state = resp.data.state
                })
              ,
              1600
            )

            debounced();
          }
          return city_state

        },
      },
      { key: 'country_short', sortable: true, hideOnForm: true },
      {
        key: 'country_id', hideOnIndex: true, type: 'list', list: 'country', listLabel: 'country_name',
      },
    ],
    fieldComponent: () => import('@/views/app/FormComponent/CityForm.vue'),

  },
  country: {
    primaryKey: 'country_id',
    entity: 'frontend_2_12_1',
    fields: [
      { key: 'country_id', sortable: true, auto: true },
      { key: 'country_name', sortable: true },
      {
        key: 'currency_id',
        sortable: true,
        type: 'list',
        list: 'currency',
        listLabel: 'currency_name',
        hideOnIndex: true,
      },
      { key: 'currency_name', sortable: true, hideOnForm: true },
      { key: 'country_short', sortable: true },
    ],
  },
  currency: {
    primaryKey: 'currency_id',
    fields: [
      { key: 'currency_id', sortable: true, auto: true },
      { key: 'currency_name', sortable: true },
      { key: 'currency_short', sortable: true },
      { key: 'currency_symbol', sortable: true },
      { key: 'currency_iso4217', sortable: true },
    ],
  },
  language: {
    primaryKey: 'language_id',
    fields: [
      { key: 'language_id', sortable: true, auto: true },
      { key: 'language_name', sortable: true },
      { key: 'language_iso639', sortable: true },
    ],
  },
  partnertype: {
    inlineEdit: true,
    primaryKey: 'partnertype_id',
    fields: [
      { key: 'partnertype_id', sortable: true, auto: true },
      { key: 'partnertype_name', sortable: true },
      { key: 'partnertype_description', sortable: true, type: 'textarea' },
    ],
  },
  // endregion
  // region Work Package 3
  pos: {
    entity: 'frontend_3_1_1',
    primaryKey: 'pos_id',
    fields: [
      { key: 'pos_id', auto: true },
      {
        key: 'company_id',
        type: 'list',
        list: 'company',
        listLabel: 'company_name',
        hideOnIndex: true,
        relationEntity: 'company_pos_rel',
      },
      { key: 'pos_name' },
      { key: 'pos_branchnumber' },
      { key: 'pos_name_external', required: false },
      // { key: 'location_count', hideOnForm: true },
      { key: 'area_count', hideOnForm: true },
      {
        key: 'pos_first_year', type: 'date', required: false, hideOnIndex: true,
      },
      {
        key: 'contactperson_id',
        type: 'list',
        list: 'frontend_2_1_3_5',
        listLabel: 'contactperson_name',
        hideOnIndex: true,
        relationEntity: 'contactperson_pos_rel',
        filter_key: 'company_id',
      },
    ],
    relations: [
      {
        primaryKey: 'location_id',
        entity: 'frontend_3_1_3_7',
        entityView: 'location',
        update: false,
        create: false,
        delete: false,
        fields: [
          { key: 'location_name', hideOnForm: true },
          { key: 'manager_name', hideOnForm: true },
          { key: 'owner_name' },
          { key: 'location_area_space_sum' },
          { key: 'city_name' },
          { key: 'city_zip' },
        ],
      },
      {
        primaryKey: 'area_id',
        entity: 'frontend_3_1_3_1',
        entityForm: 'area_pos_rel',
        entityView: 'area',
        update: false,
        fields: [
          {
            key: 'area_id',
            sortable: true,
            type: 'list',
            list: 'area',
            listLabel: 'area_name',
            disableOnUpdate: true,
          },
          { key: 'area_name', hideOnForm: true },
          { key: 'area_name_external', hideOnForm: true },
          { key: 'location_id', hideOnForm: true },
          {
            key: 'location_name',
            hideOnForm: true,
          },
          {
            key: 'areatype_name',
            hideOnForm: true,
          },
          {
            key: 'area_last_change_time', hideOnForm: true,
          }, {
            key: 'area_space_value', hideOnForm: true,
          },
        ],
      },
      {
        primaryKey: 'contract_id',
        entity: 'frontend_3_1_3_2',
        entityForm: 'contract_area_unit_usagetype_rel',
        entityView: 'contract',
        fields: [
          {
            key: 'contract_id',
            sortable: true,
            type: 'list',
            list: 'contract',
            listLabel: 'contract_name',
            disableOnUpdate: true,
          },
          {
            key: 'contracttype_id',
            sortable: true,
            type: 'list',
            list: 'contracttype',
            listLabel: 'contractype_name',
            hideOnForm: true,
          },
          { key: 'area_name_external', sortable: true, hideOnForm: true },
          {
            key: 'area_id', sortable: true, type: 'list', list: 'area', listLabel: 'area_name',
          },
          {
            key: 'unit_id',
            sortable: true,
            composite: true,
            type: 'list',
            list: 'unit',
            listLabel: 'unit_name',
            hideOnIndex: true,
            disableOnUpdate: true,
          },
          {
            key: 'usagetype_id',
            sortable: true,
            type: 'list',
            list: 'usagetype',
            listLabel: 'usagetype_name',
            hideOnIndex: true,
            composite: true,
            disableOnUpdate: true,
          },
          {
            key: 'contract_area_unit_usagetype_detail_description',
          },
          {
            key: 'contract_area_unit_usagetype_mainusage', type: 'boolean',
          },
          {
            key: 'contract_area_unit_usagetype_valid_from_date', type: 'date', disableOnUpdate: true, composite: true,
          },
          {
            key: 'contract_area_unit_usagetype_valid_to_date', type: 'date',
          },
          {
            key: 'contract_first_possible_end_date', sortable: true, hideOnForm: true,
          },
          {
            key: 'contract_area_unit_usagetype_rentalspace_value', type: 'number',
          },
          {
            key: 'contract_area_unit_usagetype_allocationspace_value', type: 'number',
          },
          {
            key: 'document_id', hideOnForm: true, sortable: true,
          },
        ],
        create: false,
        delete: false,
        update: false,
      },
      {
        primaryKey: 'tag_id',
        entity: 'frontend_3_1_3_3',
        entityForm: 'pos_tag_rel',
        entityView: 'tag',
        update: false,
        fields: [
          {
            key: 'tag_id',
            label: 'Tag ID',
            sortable: true,
            type: 'list',
            list: 'tag',
            listLabel: 'tag_name',
            disableOnUpdate: true,
          },
          { key: 'tag_name', sortable: true, hideOnForm: true },
          { key: 'tag_description', hideOnForm: true },
        ],
      },
      {
        title: 'headline~ticket~tab',
        primaryKey: 'ticket_id',
        entity: 'frontend_3_1_3_4',
        entityForm: 'ticket_pos_rel',
        fields: [
          {
            key: 'ticket_id',
            type: 'list',
            list: 'ticket',
            listLabel: 'ticket_name',
            disableOnUpdate: true,
          },
          { key: 'ticket_name', hideOnForm: true },
          { key: 'column_name', hideOnForm: true },
          { key: 'board_id', hideOnForm: true },
          { key: 'board_name', hideOnForm: true },
          { key: 'ticket_deadline', hideOnForm: true },
          { key: 'ticket_deadline_yellow', hideOnForm: true },
          { key: 'ticket_deadline_red', hideOnForm: true },
          { key: 'ticket_move_time_in', hideOnForm: true },
          { key: 'ticket_move_time_out', hideOnForm: true },
          { key: 'ticket_deadline_offset', hideOnForm: true },
        ],
        newRoute: { name: 'table-form', params: { table: 'ticket' } },
        update: false,
        delete: false,
      },
      {
        title: 'headline~contradictionpackage~tab',
        entity: 'frontend_3_1_3_5',
        fields: [
          {
            key: 'contradictionpackage_id',
            type: 'list',
            list: 'contradictionpackage',
            listLabel: 'contradictionpackage_name',
            disableOnUpdate: true,
          },
          { key: 'contradictionpackage_name', hideOnForm: true },
          { key: 'contradictionpackage_description', hideOnForm: true },
          { key: 'contradictionpackage_sum', hideOnForm: true },
          { key: 'contradictionpackage_last_change_time', hideOnForm: true },
        ],
        create: false,
        update: false,
        delete: false,
      },
      {
        entityView: 'invoice',
        update: false,
        create: false,
        delete: false,
        entity: 'frontend_3_1_3_6',
        fields: [
          { key: 'invoice_id', auto: true },
          { key: 'invoice_date', hideOnForm: true },
          { key: 'invoice_contract_year', hideOnForm: true },
          { key: 'invoice_company_name', hideOnForm: true },
          { key: 'invoice_allocationarea', hideOnForm: true },
          { key: 'invoice_payment_date', hideOnForm: true },
          { key: 'customergroup_name', hideOnForm: true },
          { key: 'partnercompany_name', hideOnForm: true },
        ],
      },
      {
        title: 'headline~document~tab',
        primaryKey: 'document_id',
        entityForm: 'document_pos_rel',
        entity: 'frontend_3_1_3_8',
        update: false,
        create: false,
        delete: false,
        fields: [
          {
            key: 'document_id',
            type: 'list',
            list: 'document',
            listLabel: 'document_name',
            alwaysNew: true,
            onlyForm: true,
            multiple: true,
          },
          { key: 'document_name', hideOnForm: true },
        ],
      },
    ],
    default: {
      pos_internal_id: '56',
    },
    note: 'frontend_0_8_3',
  },
  area: {
    entity: 'frontend_3_2_1',
    primaryKey: 'area_id',
    updateComponent: () => import('@/views/app/UpdateComponent/AreaForm'),
    fields: [
      { key: 'area_id', auto: true },
      { key: 'area_name' },
      { key: 'location_name', hideOnForm: true, hideOnIndex: true },
      {
        key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name', hideOnIndex: true,
      },
      { key: 'city_name', hideOnForm: true },
      {
        key: 'area_name_external', hideOnIndex: true, required: false,
      },
      {
        key: 'country_name', hideOnForm: true,
      },
      {
        key: 'areatype_id', type: 'list', list: 'areatype', listLabel: 'areatype_name', hideOnIndex: true,
      },
      {
        key: 'areatype_name', hideOnForm: true, hideOnIndex: true,
      },
      {
        key: 'area_space_value', sortable: true,
      },
      {
        key: 'pos_name', hideOnForm: true,
      },
      {
        key: 'usagetype_id',
        type: 'list',
        list: 'usagetype',
        listLabel: 'usagetype_name',
        sortable: true,
        hideOnIndex: true,
        with: ['area_usagetype_valid_from_date', 'area_usagetype_valid_to_date'],
      },
      { key: 'area_usagetype_valid_from_date', type: 'date', hideOnIndex: true },
      {
        key: 'area_usagetype_valid_to_date', type: 'date', hideOnIndex: true, required: false,
      },
    ],
    relations: [
      {
        title: 'Contracts',
        primaryKey: 'contract_id',
        entity: 'frontend_3_2_3_1',
        entityForm: 'contract_area_unit_usagetype_rel',
        entityView: 'contract',
        fields: [
          {
            key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name', disableOnUpdate: true,
          },
          { key: 'contract_area_unit_usagetype_detail_description', type: 'textarea', hideOnIndex: true },
          {
            key: 'usagetype_id',
            type: 'list',
            list: 'usagetype',
            listLabel: 'usagetype_name',
            disableOnUpdate: true,
            hideOnIndex: true,
            composite: true,
          },
          { key: 'usagetype_name', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_rentalspace_value', type: 'number' },
          { key: 'contract_area_unit_usagetype_allocationspace_value', type: 'number' },
          { key: 'unit_name', hideOnForm: true },
          {
            key: 'unit_id',
            type: 'list',
            disableOnUpdate: true,
            list: 'unit',
            listLabel: 'unit_name',
            hideOnIndex: true,
            composite: true,
          },
          { key: 'contract_area_unit_usagetype_mainusage', type: 'boolean' },
          { key: 'contract_begin_date', hideOnForm: true },
          { key: 'contract_end_date', hideOnForm: true },
          {
            key: 'contract_area_unit_usagetype_valid_from_date',
            disableOnUpdate: true,
            type: 'date',
            hideOnIndex: true,
            composite: true,
          },
          {
            key: 'contract_area_unit_usagetype_valid_to_date',
            type: 'date',
            hideOnIndex: true,
            rules: { required: false },
          },

        ],
      },
      {
        title: 'Point of Sales',
        entity: 'frontend_3_2_3_2',
        entityForm: 'area_pos_rel',
        entityView: 'pos',
        update: false,
        primaryKey: 'pos_id',
        fields: [
          {
            key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
          },
          { key: 'pos_name', hideOnForm: true },
          { key: 'company_name', hideOnForm: true },
          { key: 'tag_name', hideOnForm: true },
        ],
      },
      {
        title: 'Service Objects',
        entity: 'frontend_3_2_3_3',
        entityView: 'serviceobject',
        entityForm: 'area_serviceobject_rel',
        primaryKey: 'serviceobject_id',
        fields: [
          {
            key: 'serviceobject_id',
            type: 'list',
            list: 'serviceobject',
            alwaysNew: true,
            onlyForm: true,
          },
          { key: 'serviceobject_id', hideOnForm: true },
          { key: 'serviceobject_name', hideOnForm: true },
          { key: 'serviceobject_external_name', hideOnForm: true },
          { key: 'serviceobjecttype_name', hideOnForm: true },
          { key: 'serviceobject_description', type: 'textarea', hideOnForm: true },
        ],
      },
    ],
    note: 'frontend_0_8_12',
  },
  location: {
    entity: 'frontend_3_3_1',
    primaryKey: 'location_id',
    fields: [
      { key: 'location_id', auto: true },
      { key: 'location_name' },
      {
        key: 'location_objectdescription', type: 'textarea', hideOnIndex: true, required: false,
      },
      {
        key: 'location_total_area', type: 'number', hideOnIndex: true, required: false,
      },
      {
        key: 'location_start_date', type: 'date', hideOnIndex: true, required: false,
      },
      { key: 'owner_name', hideOnForm: true },
      { key: 'manager_name', hideOnForm: true },
      { key: 'locationtype_name', hideOnForm: true },
      { key: 'city_name', hideOnForm: true },
      { key: 'country_name', hideOnForm: true },
      { key: 'area_count', hideOnForm: true },
      {
        key: 'locationtype_id',
        type: 'list',
        list: 'locationtype',
        listLabel: 'locationtype_name',
        sortable: true,
        hideOnIndex: true,
      },
      {
        key: 'address_id',
        type: 'list',
        list: 'address',
        listLabel: 'address_street',
        hideOnIndex: true,
        withNew: true,
        alwaysNew: true,
      },
    ],
    relations: [
      {
        title: 'Areas',
        entity: 'frontend_3_3_3_1',
        entityForm: 'area_location_rel',
        primaryKey: 'area_id',
        entityView: 'area',
        fields: [
          { key: 'area_name', hideOnForm: true },
          {
            key: 'area_id', type: 'list', list: 'area', listLabel: 'area_name',
          },
          { key: 'area_space_value', hideOnForm: true },
          { key: 'areatype_name', hideOnForm: true },
          { key: 'pos_name', hideOnForm: true },
          { key: 'company_name', hideOnForm: true },
          // { key: 'contract_name', hideOnForm: true },
          // { key: 'contract_area_unit_usagetype_rentalspace_value', hideOnForm: true },
          // { key: 'contract_area_unit_usagetype_allocationspace_value', hideOnForm: true },
          // { key: 'unit_name', hideOnForm: true },
          // { key: 'usagetype_name', hideOnForm: true },
          // { key: 'contract_area_unit_usagetype_valid_from_date', type: 'date', hideOnForm: true },
          // { key: 'contract_area_unit_usagetype_valid_to_date', type: 'date', hideOnForm: true },
        ],
      },
      // {
      //   title: 'Service Objects',
      //   entity: 'frontend_3_3_3_2',
      //   entityView: 'serviceobject',
      //   create: false,
      //   delete: false,
      //   update: false,
      //   primaryKey: 'serviceobject_id',
      //   fields: [
      //     {
      //       key: 'serviceobject_id',
      //       type: 'list',
      //       list: 'serviceobject',
      //       alwaysNew: true,
      //       onlyForm: true,
      //     },
      //     { key: 'serviceobject_id', hideOnForm: true },
      //     { key: 'serviceobject_name', hideOnForm: true },
      //     { key: 'serviceobject_external_name', hideOnForm: true },
      //     { key: 'serviceobjecttype_name', hideOnForm: true },
      //     { key: 'serviceobject_description', type: 'textarea', hideOnForm: true },
      //     { key: 'area_id', hideOnForm: true },
      //     { key: 'area_name' },
      //     { key: 'areatype_name' },
      //   ],
      // },
      {
        title: 'Partner Companies',
        entity: 'frontend_3_3_3_3',
        entityForm: 'location_partnercompany_partnertype_rel',
        entityView: 'partnercompany',
        primaryKey: 'partnercompany_id',
        fields: [
          {
            key: 'partnercompany_id',
            type: 'list',
            list: 'partnercompany',
            listLabel: 'partnercompany_name',
            disableOnUpdate: true,
          },
          { key: 'partnercompany_name', hideOnForm: true },
          { key: 'partnergroup_name', hideOnForm: true },
          { key: 'partnertype_name', hideOnForm: true },
          {
            key: 'partnertype_id',
            hideOnIndex: true,
            type: 'list',
            composite: true,
            list: 'partnertype',
            listLabel: 'partnertype_name',
            disableOnUpdate: true,
          },
          { key: 'city_name', hideOnForm: true },
          { key: 'contactdetails_email', hideOnForm: true },
          { key: 'contactdetails_phone', hideOnForm: true },
          {
            key: 'location_partnercompany_partnertype_valid_from_date',
            type: 'date',
            composite: true,
            disableOnUpdate: true,
          },
          { key: 'location_partnercompany_partnertype_valid_to_date', type: 'date' },
        ],
      },
    ],
    note: 'frontend_0_8_5',
  },
  contract: {
    entity: 'frontend_3_4_1_1',
    createModal: false,
    createComponent: () => import('@/views/app/CreateComponent/ContractForm/Index.vue'),
    fields: [
      { key: 'contract_id', auto: true },
      {
        key: 'customergroup_id',
        type: 'list',
        list: 'customergroup',
        listLabel: 'customergroup_name',
        send: false,
        hideOnIndex: true,
        hideOnUpdate: true,
      },
      {
        key: 'company_id',
        type: 'list',
        list: 'frontend_2_2_3_1',
        listLabel: 'company_name',
        filter_key: 'customergroup_id',
        send: false,
        hideOnIndex: true,
        hideOnUpdate: true,
      },
      {
        key: 'pos_id',
        type: 'list',
        list: 'frontend_2_1_3_8',
        listLabel: 'pos_name',
        filter_key: 'company_id',
        send: false,
        hideOnIndex: true,
        hideOnUpdate: true,
      },
      {
        key: 'location_id',
        type: 'list',
        list: 'frontend_3_1_3_7',
        listLabel: 'location_name',
        relationEntity: 'contract_location_rel',
        filter_key: 'pos_id',
        hideOnIndex: true,
        hideOnUpdate: true,
      },
      {
        key: 'customergroup_name', hideOnIndex: true, hideOnCreate: true, disabled: true,
      },
      {
        key: 'company_name', hideOnIndex: true, hideOnCreate: true, disabled: true,
      },
      {
        key: 'location_name', hideOnIndex: true, hideOnCreate: true, disabled: true,
      },
      {
        key: 'pos_name', hideOnIndex: true, hideOnCreate: true, disabled: true,
      },
      { key: 'contracttype_name', hideOnCreate: true, disabled: true },
      { key: 'contract_name' },
      { key: 'location_name', hideOnForm: true },
      { key: 'owner_name', hideOnForm: true },
      { key: 'manager_name', hideOnForm: true },
      { key: 'pos_name', hideOnForm: true },
      { key: 'contract_begin_date', type: 'date' },
      { key: 'contract_end_date', type: 'date', hideOnIndex: true },
      { key: 'contract_sum_allarea_rentalspace', hideOnForm: true },
      { key: 'contract_sum_allarea_allocationspace', hideOnForm: true },
      { key: 'currency_name', hideOnCreate: true, disabled: true },
      { key: 'contract_count_area', hideOnForm: true },
      {
        key: 'currency_id',
        type: 'list',
        list: 'currency',
        listLabel: 'currency_name',
        hideOnIndex: true,
        hideOnUpdate: true,
      },
      {
        key: 'contracttype_id',
        type: 'list',
        list: 'contracttype',
        listLabel: 'contracttype_name',
        hideOnIndex: true,
        hideOnUpdate: true,
      },

    ],
    relations: [

      // {
      //   entity: 'frontend_3_4_3_8',
      //   entityView: 'company',
      //   fields: [
      //     { key: 'company_id' },
      //     { key: 'company_name' },
      //     { key: 'company_shortname' },
      //     { key: 'city_name' },
      //     { key: 'customergroup_name' },
      //   ],
      //   create: false,
      //   update: false,
      //   delete: false,
      // },
      // {
      //   entity: 'frontend_3_4_3_9',
      //   entityView: 'pos',
      //   fields: [
      //     { key: 'pos_id' },
      //     { key: 'pos_name' },
      //     { key: 'pos_branchnumber' },
      //     { key: 'pos_name_external' },
      //     { key: 'area_count' },
      //   ],
      //   create: false,
      //   update: false,
      //   delete: false,
      // },
      {
        primaryKey: 'invoice_id',
        entity: 'frontend_3_4_3_6',
        entityForm: 'invoice_contract_rel',
        entityView: 'invoice',
        create: false,
        update: false,
        fields: [
          {
            key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_description',
          },
          { key: 'invoice_date', type: 'date', hideOnForm: true },
          { key: 'invoice_payment_date', type: 'date', hideOnForm: true },
          { key: 'invoice_creation_time', hideOnForm: true },
          { key: 'invoice_date_of_order', hideOnForm: true },
          { key: 'invoice_billing_year', hideOnForm: true },
          { key: 'invoiceposition_count', hideOnForm: true },
          { key: 'invoice_contract_year', type: 'number' },
          { key: 'invoice_billing_period_from_date', type: 'date' },
          { key: 'invoice_billing_period_to_date', type: 'date' },
        ],
      },

      {
        entity: 'frontend_3_4_3_10',
        entityView: 'area',
        entityForm: 'contract_area_unit_usagetype_rel',
        primaryKey: 'area_id',
        fields: [
          {
            key: 'area_id', type: 'list', list: 'area', listLabel: 'area_name', disableOnUpdate: true,
          },
          { key: 'area_name', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
          { key: 'country_name', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_allocationspace_value', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_rentalspace_value', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_valid_from_date', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_valid_to_date', hideOnForm: true },
          { key: 'usagetype_name', hideOnForm: true },
          {
            key: 'usagetype_id',
            sortable: true,
            type: 'list',
            list: 'usagetype',
            listLabel: 'usagetype_name',
            hideOnIndex: true,
            composite: true,
          },
          {
            key: 'contract_area_unit_usagetype_detail_description', type: 'textarea', hideOnIndex: true,
          },
          {
            key: 'unit_id',
            sortable: true,
            type: 'list',
            list: 'unit',
            listLabel: 'unit_name',
            hideOnIndex: true,
            composite: true,
            disabled: true,
          },
          {
            key: 'contract_area_unit_usagetype_rentalspace_value', type: 'number', hideOnIndex: true,
          },
          {
            key: 'contract_area_unit_usagetype_valid_from_date', type: 'date', disableOnUpdate: true, hideOnIndex: true,
          },
          {
            key: 'contract_area_unit_usagetype_valid_to_date', type: 'date', hideOnIndex: true,
          },
          {
            key: 'contract_area_unit_usagetype_allocationspace_value', type: 'number', hideOnIndex: true,
          },
          {
            key: 'contract_area_unit_usagetype_mainusage', type: 'boolean',
          },

        ],
        default: {
          unit_id: 1,
        },
      },
      {
        entity: 'frontend_3_4_3_11',
        entityView: 'partnercompany',
        fields: [
          // { key: 'area_id' },
          // { key: 'location_id' },
          // { key: 'partnercompany_id' },
          { key: 'partnercompany_name' },
          { key: 'partnercompany_shortname' },
          { key: 'partnertype_name' },
          { key: 'partnergroup_name' },
          { key: 'city_name' },
          { key: 'location_partnercompany_partnertype_valid_from_date' },
          { key: 'location_partnercompany_partnertype_valid_to_date' },
        ],
        create: false,
        update: false,
        delete: false,
      },
      {
        primaryKey: 'document_id',
        entity: 'frontend_3_4_3_1_bottom',
        entityForm: 'document_contract_documentcontracttype_rel',
        entityView: 'document',
        view: false,
        fields: [
          {
            key: 'document_id',
            composite: true,
            disableOnUpdate: true,
            type: 'list',
            list: 'document',
            onlyForm: true,
            alwaysNew: true,
          },
          { key: 'document_name', hideOnForm: true },
          { key: 'documenttype_name', hideOnForm: true },
          { key: 'document_mime_type', hideOnForm: true },
          { key: 'documentcontracttype_name', hideOnForm: true },
          {
            key: 'documentcontracttype_id',
            type: 'list',
            list: 'documentcontracttype',
            listLabel: 'documentcontracttype_name',
            hideOnIndex: true,
            composite: true,
          },
        ],
      },
      {
        primaryKey: 'specialright_id',
        entity: 'frontend_3_4_3_2',
        entityForm: 'contract_specialright_rel',
        entityView: 'specialright',
        fields: [
          {
            key: 'specialright_id', type: 'list', list: 'specialright', listLabel: 'specialright_name',
          },
          { key: 'specialright_name', hideOnForm: true },
          { key: 'contract_specialright_description', type: 'textarea', required: false },
          {
            key: 'contract_specialright_date', type: 'date', composite: true, hideOnForm: true, hideOnIndex: true,
          },
          { key: 'contract_specialright_prior_notice_date', type: 'date' },
          { key: 'contract_specialright_termination_date', type: 'date', composite: true },
          { key: 'contract_specialright_automatic_renewal_in_months', type: 'number', required: false },
          { key: 'contract_specialright_is_passive', type: 'boolean' },
          { key: 'contract_specialright_is_availed', type: 'boolean' },
        ],
        default: {
          contract_specialright_date: '1990-01-01',
        },
      },
      {
        primaryKey: 'recurringpayment_id',
        entity: 'frontend_3_4_3_3',
        entityForm: 'contract_recurringpayment_rel',
        entityView: 'recurringpayment',
        fields: [
          {
            key: 'recurringpayment_id',
            type: 'list',
            list: 'recurringpayment',
            listLabel: 'recurringpayment_name',
            alwaysNew: true,
            onlyForm: true,
            without: 'contract_id',
          },
          {
            key: 'recurringpayment_name',
            hideOnForm: true,
          },
          {
            key: 'recurringpaymenttype_name',
            hideOnForm: true,
          },
          {
            key: 'recurringpayment_sum_per_month',
            hideOnForm: true,
          },
          { key: 'recurringpayment_begin_date', type: 'date', hideOnForm: true },
          {
            key: 'recurringpaymenttype_name',
            hideOnForm: true,
          },
          {
            key: 'maturitytype_name',
            hideOnForm: true,
          },
          {
            key: 'indexclause_name', hideOnForm: true,
          },
        ],
      },
      {
        primaryKey: 'serviceobject_id',
        entity: 'frontend_3_4_3_7',
        entityForm: 'serviceobject_contract_rel',
        entityView: 'serviceobject',
        fields: [
          {
            key: 'serviceobject_id',
            type: 'list',
            list: 'serviceobject',
            alwaysNew: true,
            onlyForm: true,
            withFields: [
              {
                key: 'area_id',
                type: 'list',
                list: 'area',
                listLabel: 'area_name',
                hideOnIndex: true,
                relationEntity: 'area_serviceobject_rel',
              },
            ],
          },
          { key: 'serviceobject_name', hideOnForm: true },
          { key: 'serviceobjecttype_name', hideOnForm: true },
          { key: 'area_name', hideOnForm: true },
          { key: 'location_name', hideOnForm: true },
        ],
      },
      {
        primaryKey: 'costtype_id',
        entity: 'frontend_3_4_3_5',
        entityForm: 'contract_costtype_rel',
        entityView: 'costtype',
        fields: [
          {
            key: 'costtype_id',
            type: 'list',
            list: 'costtype',
            listLabel: 'costtype_name',
          },
          { key: 'costtype_name', hideOnForm: true },
          { key: 'contract_costtype_comment' },
        ],
      },

      {
        primaryKey: 'criteria_id',
        entity: 'frontend_3_4_3_4',
        entityForm: 'contract_criteria_rel',
        entityView: 'criteria',
        fieldComponent: () => import('@/views/app/CreateComponent/ContractCriteria'),
        fields: [
          {
            key: 'criteria_id',
            type: 'list',
            list: 'criteria',
            listLabel: 'criteria_name',
            composite: true,
            disableOnUpdate: true,
          },
          { key: 'criteria_name', hideOnForm: true },
          ...getContractCriteriaFields(),
        ],
        // update: false,
      },
    ],
    note: 'frontend_0_8_1',
  },
  serviceobject: {
    entity: 'frontend_3_5_1',
    fields: [
      { key: 'serviceobject_id', auto: true },
      { key: 'serviceobject_name' },
      { key: 'serviceobject_external_name', required: false },
      { key: 'serviceobjecttype_name', hideOnForm: true },
      {
        key: 'serviceobject_description', type: 'textarea', hideOnIndex: true, required: false,
      },
      {
        key: 'serviceobjecttype_id',
        type: 'list',
        list: 'serviceobjecttype',
        listLabel: 'serviceobjecttype_name',
        hideOnIndex: true,
      },
      { key: 'location_name', hideOnForm: true },
      { key: 'serviceobject_amount_areas', hideOnForm: true },
      { key: 'contract_name', hideOnForm: true },
      { key: 'contract_last_change_time', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Areas',
        entity: 'frontend_3_5_3_1',
        entityForm: 'area_serviceobject_rel',
        entityView: 'area',
        primaryKey: 'area_id',
        fields: [
          {
            key: 'area_id', type: 'list', list: 'area', listLabel: 'area_name',
          },
          { key: 'area_name', hideOnForm: true },
          { key: 'area_space_value', hideOnForm: true },
          { key: 'pos_id', hideOnForm: true },
          { key: 'company_id', hideOnForm: true },
          { key: 'customergroup_id', hideOnForm: true },
        ],
        update: false,
      },
      {
        title: 'Locations',
        entity: 'frontend_3_5_3_2',
        entityForm: 'location_serviceobject_rel',
        entityView: 'location',
        primaryKey: 'location_id',
        fields: [
          {
            key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
          },
          { key: 'location_name', hideOnForm: true },
          { key: 'location_total_area', hideOnForm: true },
          { key: 'location_start_date', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
          { key: 'country_name', hideOnForm: true },
          { key: 'owner_name', hideOnForm: true },
          { key: 'manager_name', hideOnForm: true },
        ],
        update: false,
        create: false,
        delete: false,
      },
      {
        title: 'Contracts',
        entity: 'frontend_3_5_3_3',
        entityForm: 'serviceobject_contract_rel',
        entityView: 'contract',
        primaryKey: 'contract_id',
        fields: [
          {
            key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name',
          },
          { key: 'contract_name', hideOnForm: true },
          { key: 'contract_begin_date', hideOnForm: true },
          { key: 'contract_end_date', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
          { key: 'country_name', hideOnForm: true },
          { key: 'partnercompany_name', hideOnForm: true },
        ],
        update: false,
      },
    ],
  },

  specialright: {
    entity: 'frontend_3_8_1',
    fields: [
      { key: 'specialright_id', auto: true },
      { key: 'specialright_name' },
      { key: 'specialright_description', type: 'textarea' },
    ],
    relations: [
      {
        title: 'Contract',
        primaryKey: 'contract_id',
        entity: 'frontend_3_8_3',
        entityForm: 'contract_specialright_rel',
        entityView: 'contract',
        fields: [
          {
            key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name',
          },
          { key: 'contract_name', hideOnForm: true },
          { key: 'contract_specialright_description', type: 'textarea' },
          { key: 'contract_specialright_date', type: 'date' },
          { key: 'contract_specialright_is_availed', type: 'boolean' },
          { key: 'contract_specialright_is_passive', type: 'boolean' },
          { key: 'contract_specialright_prior_notice_date', type: 'date' },
          { key: 'contract_specialright_termination_date', type: 'date' },
        ],
      },
    ],
  },

  criteria: {
    entity: 'frontend_3_6_1',
    fields: [
      { key: 'criteria_id', auto: true },
      { key: 'criteria_name' },
      { key: 'criteria_description', type: 'textarea', hideOnIndex: true },
      { key: 'criteriatype_name', hideOnForm: true },
      { key: 'criteria_has_value', type: 'boolean' },
      { key: 'contract_count', type: 'number', hideOnForm: true },
      {
        key: 'criteriatype_id', type: 'list', list: 'criteriatype', hideOnIndex: true, listLabel: 'criteriatype_name',
      },
      {
        key: 'unit_id', type: 'list', list: 'unit', hideOnIndex: true, listLabel: 'unit_name',
      },
      {
        key: 'contracttype_id', type: 'list', list: 'contracttype', hideOnIndex: true, listLabel: 'contracttype_name',
      },
    ],
    relations: [
      {
        title: 'Contract',
        primaryKey: 'contract_id',
        entity: 'frontend_3_6_3',
        entityForm: 'contract_criteria_rel',
        create: false,
        fields: [
          {
            key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name',
          },
          { key: 'contract_name', hideOnForm: true },
          ...getContractCriteriaFields(),
        ],
      },
      {
        title: 'Choice',
        primaryKey: 'choice_id',
        entity: 'frontend_3_6_4',
        entityForm: 'criteria_choice_rel',
        update: false,
        entityView: 'choice',
        fields: [
          { key: 'choice_id', hideOnForm: true },
          { key: 'choice_name', hideOnForm: true },
          {
            key: 'choice_id', listLabel: 'choice_name', type: 'list', list: 'choice', hideOnIndex: true,
          },
        ],
      },
    ],
  },

  indexclause: {
    entity: 'frontend_3_7_1',
    fields: [
      { key: 'indexclause_id', auto: true },
      { key: 'indexclause_name' },
      { key: 'indexclause_adjustment_rule' },
      { key: 'indexclause_adjustment_description', type: 'textarea', required: false },
      { key: 'indexclause_baseyear', type: 'number' },
      { key: 'indexclause_begin_date', type: 'date' },
      { key: 'indexclause_indextransmission_percent' },
      { key: 'indexclause_minimal_percent_change_agreed', type: 'decimal', required: false },
      {
        key: 'indexclause_minimal_point_change_agreed',
        required_if_null: 'indexclause_minimal_percent_change_agreed',
      },
    ],
    relations: [
      {
        title: 'Recurring Payments',
        primaryKey: 'recurringpayment_id',
        entity: 'frontend_3_7_3',
        entityForm: 'recurringpayment_indexclause_rel',
        fields: [
          {
            key: 'recurringpayment_id', type: 'list', list: 'recurringpayment', listLabel: 'recurringpayment_name',
          },
          { key: 'contract_id', hideOnForm: true },
          { key: 'contract_name', hideOnForm: true },
          { key: 'recurringpayment_condition_comment', hideOnForm: true },
          { key: 'indexclause_baseyear', hideOnForm: true },
          { key: 'recurringpaymenttype_name', hideOnForm: true },
          { key: 'maturitytype_name', hideOnForm: true },
          { key: 'recurringpayment_begin_date', hideOnForm: true },
          { key: 'recurringpayment_percentage', hideOnForm: true },
          { key: 'recurringpayment_sum_per_month', hideOnForm: true },
        ],
      },
    ],
  },

  recurringpayment: {
    entity: 'frontend_3_9_1',
    fields: [
      { key: 'recurringpayment_id', auto: true },
      { key: 'recurringpayment_name' },
      { key: 'contract_name', hideOnForm: true },
      {
        key: 'contract_id',
        type: 'list',
        list: 'contract',
        listLabel: 'contract_name',
        hideOnIndex: true,
        relationEntity: 'contract_recurringpayment_rel',
      },
      {
        key: 'recurringpaymenttype_id',
        type: 'list',
        list: 'recurringpaymenttype',
        listLabel: 'recurringpaymenttype_name',
        hideOnIndex: true,
      },
      { key: 'recurringpaymenttype_name', hideOnForm: true },
      {
        key: 'recurringpayment_sum_per_month',
        hideOnIndex: true,
        visible: visibleByRecurringPaymentType([1, 3, 4, 5, 6, 7]),
      },
      {
        key: 'recurringpayment_condition_percentage',
        hideOnIndex: true,
        visible: visibleByRecurringPaymentType([2, 5]),
      },
      {
        key: 'recurringpayment_percentage',
        hideOnIndex: true,
        visible: visibleByRecurringPaymentType([2]),
      },
      { key: 'recurringpayment_begin_date', type: 'date', hideOnIndex: true },
      { key: 'recurringpayment_end_date', type: 'date', hideOnIndex: true },
      {
        key: 'recurringpayment_condition_comment', hideOnIndex: true, type: 'textarea', required: false,
      },
      {
        key: 'maturitytype_id',
        type: 'list',
        list: 'maturitytype',
        listLabel: 'maturitytype_name',
        hideOnIndex: true,
      },
      {
        key: 'recurringpayment_maturity_date',
        type: 'date',
        hideOnIndex: true,
        visible: entity => entity.maturitytype_id === 1,
      },
      {
        key: 'recurringpayment_maturity_daily_range',
        hideOnIndex: true,
        visible: entity => entity.maturitytype_id === 2,
      },
      {
        key: 'recurringpayment_maturity_monthly_range',
        hideOnIndex: true,
        visible: entity => entity.maturitytype_id === 2,
      },
      { key: 'recurringpayment_value_deposit', type: 'boolean', required: false },
      {
        key: 'indexclause_id',
        type: 'list',
        list: 'indexclause',
        listLabel: 'indexclause_name',
        hideOnIndex: true,
        withNew: true,
        rules: { required: false },
        visible: entity => entity.recurringpayment_value_deposit === 1,
        // hideOnUpdate: true,
      },
      { key: 'maturitytype_name', hideOnForm: true },
      { key: 'indexclause_name', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Index Clause',
        entity: 'frontend_3_9_3',
        entityForm: 'recurringpayment_indexclause_rel',
        primaryKey: 'indexclause_id',
        entityView: 'indexclause',
        update: false,
        create: false,
        fields: [
          {
            key: 'indexclause_id', type: 'list', list: 'indexclause', listLabel: 'indexclause_name',
          },
          { key: 'indexclause_name', hideOnForm: true },
          { key: 'indexclause_adjustment_description', hideOnForm: true },
          { key: 'indexclause_adjustment_rule', hideOnForm: true },
          { key: 'indexclause_begin_date', hideOnForm: true },
          { key: 'indexclause_baseyear', hideOnForm: true },
          { key: 'indexclause_indextransmission_percent', hideOnForm: true },
          { key: 'indexclause_minimal_percent_change_agreed', hideOnForm: true },
          { key: 'indexclause_minimal_point_change_agreed', hideOnForm: true },
        ],
      },
    ],
    default: {
      recurringpayment_condition_comment: '',
    },
  },

  tag: {
    entity: 'frontend_3_10_1',
    fields: [
      { key: 'tag_id', auto: true },
      { key: 'tag_name' },
      { key: 'tag_description', type: 'textarea', hideOnIndex: true },
      { key: 'tag_count', hideOnForm: true, type: 'number' },
    ],
    relations: [
      {
        title: 'Point of Sales',
        entity: 'frontend_3_10_3',
        entityForm: 'pos_tag_rel',
        entityView: 'pos',
        primaryKey: 'pos_id',
        fields: [
          {
            key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name', disableOnUpdate: true,
          },
          { key: 'pos_branchnumber', hideOnForm: true },
          { key: 'pos_name', hideOnForm: true },
          { key: 'company_name', hideOnForm: true },
          { key: 'area_count', hideOnForm: true },
        ],
      },
    ],
  },
  unit: {
    fields: [
      { key: 'unit_id', auto: true },
      { key: 'unit_name' },
      { key: 'unit_short' },
      { key: 'unit_symbol' },
    ],
  },
  choice: {
    entity: 'frontend_3_12_1',
    fields: [
      { key: 'choice_id', auto: true },
      { key: 'choice_name' },
      { key: 'choice_description', type: 'textarea' },
    ],
  },

  areatype: {
    fields: [
      { key: 'areatype_id', auto: true },
      { key: 'areatype_name' },
      { key: 'areatype_description', type: 'textarea' },
    ],
  },
  contracttype: {
    fields: [
      { key: 'contracttype_id', auto: true },
      { key: 'contracttype_name' },
      { key: 'contracttype_description', type: 'textarea' },
    ],
  },
  documentcontracttype: {
    fields: [
      { key: 'documentcontracttype_id', auto: true },
      { key: 'documentcontracttype_name' },
      { key: 'documentcontracttype_description', type: 'textarea' },
    ],
  },
  product: {
    fields: [
      { key: 'product_id', auto: true },
      { key: 'product_name' },
      { key: 'product_short' },
      { key: 'product_description', type: 'textarea' },
    ],
  },
  criteriatype: {
    fields: [
      { key: 'criteriatype_id', auto: true },
      { key: 'criteriatype_name' },
      { key: 'criteriatype_description', type: 'textarea' },
    ],
  },
  locationtype: {
    fields: [
      { key: 'locationtype_id', auto: true },
      { key: 'locationtype_name' },
      { key: 'locationtype_description', type: 'textarea' },
    ],
  },
  maturitytype: {
    fields: [
      { key: 'maturitytype_id', auto: true },
      { key: 'maturitytype_name' },
      { key: 'maturitytype_description', type: 'textarea' },
    ],
  },
  usagetype: {
    fields: [
      { key: 'usagetype_id', auto: true },
      { key: 'usagetype_name' },
      { key: 'usagetype_description', type: 'textarea' },
    ],
  },
  serviceobjecttype: {
    fields: [
      { key: 'serviceobjecttype_id', auto: true },
      { key: 'serviceobjecttype_name' },
      { key: 'serviceobjecttype_description', type: 'textarea' },
    ],
  },
  recurringpaymenttype: {
    fields: [
      { key: 'recurringpaymenttype_id', auto: true },
      { key: 'recurringpaymenttype_name' },
      { key: 'recurringpaymenttype_description', type: 'textarea' },
    ],
  },
  // endregion
  // region Work Package 4
  invoice: {
    entity: 'frontend_4_1_1',
    createModal: false,
    formComponent: () => import('../views/app/FormComponent/InvoiceForm.vue'),
    fields: [
      { key: 'invoice_id', auto: true },
      {
        key: 'ticket_id', type: 'list', list: 'ticket', relationEntity: 'ticket_invoice_rel', hideOnIndex: true,
      },
      { key: 'invoice_date', type: 'date' },
      { key: 'invoice_date_of_order', type: 'date', hideOnIndex: true },
      { key: 'invoice_contract_year', disabled: true, type: 'number' },
      { key: 'invoice_company_name' },
      { key: 'invoice_allocationarea', type: 'number' },
      { key: 'invoice_payment_date', type: 'date' },
      { key: 'company_name', hideOnForm: true },
      { key: 'location_name', hideOnForm: true },
      { key: 'manager_name', hideOnForm: true },
      { key: 'owner_name', hideOnForm: true },
      {
        key: 'contract_id',
        type: 'list',
        list: 'contract',
        entity: 'invoice_contract_rel',
        with: ['invoice_contract_year'],
      },
      {
        key: 'area_id',
        list: 'area',
        type: 'list',
        entity: 'invoice_area_rel',
        multiple: true,
      },
      {
        key: 'partnertype_id', type: 'list', list: 'partnertype', listLabel: 'partnertype_name', hideOnIndex: true,
      },
      { key: 'invoice_description', type: 'textarea', hideOnIndex: true },
      { key: 'invoice_number' },
      { key: 'invoice_billing_period_from_date', type: 'date', hideOnIndex: true },
      {
        key: 'invoice_billing_period_to_date',
        type: 'date',
        rules: { date_after: ['@invoice_billing_period_from_date'] },
        hideOnIndex: true,
      },
    ],
    filters: [
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
      {
        key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name',
      },
      {
        key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
      },
      {
        key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
      },
      {
        key: 'area_id', type: 'list', list: 'area', listLabel: 'area_name',
      },
      {
        key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name',
      },
      { key: 'invoice_contract_year', type: 'number' },
      {
        key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_name',
      },
    ],
    actions: [
      {
        text: 'Start contradiction',
        loading: false,
        async onClick(invoices, vm) {
          console.log(invoices)
          try {
            // this.loading = true
            const { data } = await vm.$http.post('/contradiction_generators/start', {
              invoice_ids: Array.isArray(invoices) ? invoices.map(i => i.invoice_id) : [invoices.invoice_id],
            })
            vm.$successToast('Contradictions generated')
          } catch (e) {
            console.error(e)
            vm.$errorToast('Generator Error')
          } finally {
            // this.loading = false
          }
        },
      },
    ],
    relations: [
      // {
      //   title: 'headline~invoice~tab~contract_document',
      //   entity: 'frontend_4_2_1_bottom',
      //   entityForm: 'document',
      //   primaryKey: 'document_id',
      //   create: false,
      //   delete: false,
      //   fields: [
      //     {
      //       key: 'invoice_id',
      //       type: 'list',
      //       relationEntity: 'document_invoice_rel',
      //       hideOnForm: true,
      //       hideOnIndex: true,
      //     },
      //     { key: 'document_name' },
      //     { key: 'document_content' },
      //     { key: 'document_entry_time', hideOnForm: true },
      //   ],
      //   default: {
      //     document_mime_type: 'png',
      //   },
      // },
      {
        tool: () => import('@/views/app/InvoicePositionTools.vue'),
        // title: 'Invoice Positions',
        entity: 'frontend_4_2_5',
        entityForm: 'invoice_invoiceposition_rel',
        primaryKey: 'invoiceposition_id',
        view: false,
        fields: [
          {
            key: 'invoiceposition_id', type: 'list', list: 'invoiceposition', alwaysNew: true, onlyForm: true,
          },
          { key: 'invoiceposition_name', hideOnForm: true },
          { key: 'invoiceposition_total_units', hideOnForm: true },
          { key: 'invoiceposition_units_customer', hideOnForm: true },
          { key: 'externalcosttype_name', hideOnForm: true },
          { key: 'costtype_name', hideOnForm: true },
          {
            key: 'invoiceposition_flat_rate',
            type: 'boolean',
            editable: true,
            onChange: updateInvoiceFlatRate,
            hideOnForm: true,
          },
          { key: 'invoiceposition_amount_total', hideOnForm: true },
          { key: 'invoiceposition_amount_customer', hideOnForm: true },
          {
            key: 'invoiceposition_apportionable',
            type: 'boolean',
            editable: true,
            onChange: updateInvoiceApportionable,
            hideOnForm: true,
          },
        ],
      },
      {
        title: 'headline~invoice~tab~invoice_document',
        entityForm: 'document_invoice_rel',
        primaryKey: 'document_id',
        fields: [
          {
            key: 'invoice_id',
            type: 'list',
            relationEntity: 'document_invoice_rel',
            hideOnForm: true,
            hideOnIndex: true,
          },
          { key: 'document_name' },
          { key: 'document_content' },
          { key: 'document_entry_time', hideOnForm: true },
        ],
        default: {
          document_mime_type: 'png',
        },
      },
      {
        // title: 'invoice_invoicevaluetype_rel',
        entity: 'frontend_4_2_2',
        entityForm: 'invoice_invoicevaluetype_rel',
        primaryKey: 'invoicevaluetype_id',
        view: false,
        fields: [
          {
            key: 'invoicevaluetype_id',
            type: 'list',
            list: 'invoicevaluetype',
            listLabel: 'invoicevaluetype_name',
          },
          // { key: 'invoice_name' },
          { key: 'invoicevaluetype_name', hideOnForm: true },
          { key: 'invoicevaluetype_description', hideOnForm: true },
          { key: 'invoice_invoicevaluetype_value' },
          { key: 'unit_name', hideOnForm: true },
        ],
      },
      {
        // title: 'Invoice Criteria',
        entity: 'frontend_4_2_3',
        entityForm: 'invoice_invoicecriteria_rel',
        primaryKey: 'invoicecriteria_id',
        view: false,
        fields: [
          {
            key: 'invoicecriteria_id',
            type: 'list',
            list: 'invoicecriteria',
            listLabel: 'invoicecriteria_name',
          },
          { key: 'invoicecriteria_name', hideOnForm: true },
          { key: 'invoicecriteria_description', hideOnForm: true },
          { key: 'invoice_invoicecriteria_is_set', type: 'boolean' },
        ],
      },
      {
        // title: 'Invoice Deadlines',
        entity: 'frontend_4_2_4',
        entityForm: 'invoice_invoicedeadline_rel',
        primaryKey: 'invoicedeadline_id',
        view: false,
        fields: [
          {
            key: 'invoicedeadline_id',
            type: 'list',
            list: 'invoicedeadline',
            listLabel: 'invoicedeadline_name',
          },
          { key: 'invoicedeadline_name', hideOnForm: true },
          { key: 'invoicedeadline_description', hideOnForm: true },
          { key: 'invoice_invoicedeadline_date', type: 'date' },
        ],
      },

      {
        // title: 'Service Objects',
        entity: 'frontend_4_2_6',
        primaryKey: 'serviceobject_id',
        entityView: 'serviceobject',
        fields: [
          {
            key: 'serviceobject_id',
            type: 'list',
            list: 'serviceobject',
            listLabel: 'serviceobject_name',
            // alwaysNew: true,
            // onlyForm: true,
          },
          { key: 'serviceobject_name', hideOnForm: true },
          { key: 'serviceobjecttype_name', hideOnForm: true },
        ],
      },
    ],
    note: 'frontend_0_8_6',
  },
  invoiceposition: {
    fieldComponent: () => import('@/views/app/CreateComponent/InvoicePositionForm.vue'),
    create: false,
    entity: 'frontend_4_5_1',
    fields: [
      { key: 'invoiceposition_id', auto: true },
      {
        key: 'externalcosttype_id',
        type: 'list',
        list: 'externalcosttype',
        listLabel: 'externalcosttype_name',
        hideOnIndex: true,
      },
      {
        key: 'costtype_id',
        type: 'list',
        list: 'frontend_4_7_3_1',
        filter_key: 'externalcosttype_id',
        relationEntity: 'invoiceposition_costtype_rel',
        listLabel: 'costtype_name',
        hideOnIndex: true,
      },
      { key: 'invoiceposition_name' },
      {
        key: 'unit_id', type: 'list', list: 'unit', listLabel: 'unit_name', hideOnIndex: true,
      },
      { key: 'invoiceposition_total_units', type: 'number' },
      { key: 'invoiceposition_units_customer', type: 'number', rules: { lower: ['@invoiceposition_total_units'] } },
      { key: 'costtype_name', hideOnForm: true },
      {
        key: 'invoiceposition_flat_rate',
        type: 'boolean',
        editable: true,
        onChange: updateInvoiceFlatRate,
      },
      { key: 'invoiceposition_amount_total', type: 'number' },
      {
        key: 'invoiceposition_amount_customer', type: 'number',
        // rules: { lower: ['@invoiceposition_amount_total'] }
      },
      {
        key: 'invoiceposition_apportionable',
        type: 'boolean',
        editable: true,
        onChange: updateInvoiceApportionable,
      },
    ],
    filters: [
      {
        key: 'customergroup_id',
        required: false,
        type: 'list',
        list: 'customergroup',
        listLabel: 'customergroup_name',
        send: false,
      },
      {
        key: 'company_id',
        required: false,
        type: 'list',
        list: 'frontend_2_2_3_1',
        listLabel: 'company_name',
        filter_key: 'customergroup_id',
      },
      {
        key: 'pos_id',
        required: false,
        type: 'list',
        list: 'frontend_2_1_3_8',
        listLabel: 'pos_name',
        filter_key: 'company_id',
      },
      {
        key: 'contract_id',
        required: false,
        type: 'list',
        list: 'frontend_4_2_1_contract_selector',
        listLabel: 'contract_name',
        filter_key: 'pos_id',
      },
      { key: 'billing_year', required: false, type: 'number' },
      {
        key: 'invoice_id', required: false, type: 'list', list: 'invoice', listLabel: 'invoice_name',
      },
    ],
  },
  inspectionresult: {
    create: false,
    fields: [
      { key: 'inspectionresult_id', auto: true },
      { key: 'inspectionresult_value' },
      { key: 'inspectionresult_realised' },
      { key: 'inspectionresult_unique_or_perennial' },
      { key: 'inspectionresult_legally_clear' },
      { key: 'inspectionresult_legally_clear' },
      { key: 'claimtype_name' },
      { key: 'saving_name' },
      { key: 'rating_name' },
      { key: 'resultcategorization_name' },
      { key: 'invoiceposition_count', hideOnForm: true },
    ],
    filters: [
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
      {
        key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name',
      },
      {
        key: 'user_id', type: 'list', list: 'user', listLabel: 'user_email',
      },
      {
        key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
      },
      {
        key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
      },
      {
        key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name',
      },
      { key: 'invoice_contract_year', type: 'number' },
      {
        key: 'inspectionresult_realised', type: 'yesno',
      },
      {
        key: 'board_id', type: 'list', list: 'board', listLabel: 'board_name',
      },
      {
        key: 'costtype_id', type: 'list', list: 'costtype', listLabel: 'costtype_name',
      },
      {
        key: 'contradictionpackage_id',
        type: 'list',
        list: 'contradictionpackage',
        listLabel: 'contradictionpackage_name',
      },
      {
        key: 'owner_id',
        type: 'list',
        list: 'partnercompany',
        listLabel: 'partnercompany_name',
        tableKey: 'partnercompany_id',
      },
      {
        key: 'manager_id',
        type: 'list',
        list: 'partnercompany',
        listLabel: 'partnercompany_name',
        tableKey: 'partnercompany_id',
      },
      {
        key: 'inspectionresultimpacttype_id',
        type: 'list',
        list: 'inspectionresultimpacttype',
        listLabel: 'inspectionresultimpacttype_name',
      },
      {
        key: 'inspectionresult_legally_clear', type: 'yesno',
      },
      {
        key: 'savingtype_id',
        type: 'list',
        list: 'savingtype',
        listLabel: 'savingtype_name',
      },
      {
        key: 'ratingtype_id',
        type: 'list',
        list: 'ratingtype',
        listLabel: 'ratingtype_name',
      },
      {
        key: 'claimtype_id',
        type: 'list',
        list: 'claimtype',
        listLabel: 'claimtype_name',
      },
    ],
    note: 'frontend_0_8_7',
  },
  costtype: {
    entity: 'frontend_4_7_1',
    fields: [
      { key: 'costtype_id', auto: true },
      { key: 'costtype_name' },
      { key: 'costtype_maingroup', type: 'boolean' },
      { key: 'costtype_description', type: 'textarea' },
      { key: 'costtype_amount_externalcosttypes', hideOnForm: true },
    ],
    relations: [
      {
        title: 'External Cost Types',
        primaryKey: 'externalcosttype_id',
        entity: 'frontend_4_7_3_1',
        entityForm: 'costtype_externalcosttype_rel',
        update: false,
        view: false,
        fields: [
          {
            key: 'externalcosttype_id', type: 'list', list: 'externalcosttype', listLabel: 'externalcosttype_name',
          },
          { key: 'externalcosttype_name', hideOnForm: true },
        ],
      },
      {
        title: 'Contracts',
        primaryKey: 'contract_id',
        entity: 'frontend_4_7_3_2',
        entityForm: 'contract_costtype_rel',
        fields: [
          {
            key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name', disableOnUpdate: true,
          },
          { key: 'contract_name', hideOnForm: true },
          { key: 'contract_last_change_time', type: 'date', hideOnForm: true },
          { key: 'contract_costtype_comment', type: 'textarea', hideOnIndex: true },
        ],
      },
    ],
  },
  textmodule: {
    create: false,
    delete: false,
    entity: 'textmodule_country_grp',
    fields: [
      { key: 'textmodule_id', auto: true },
      { key: 'textmodule_name' },
      { key: 'country_name', hideOnForm: true },
      {
        key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name', hideOnIndex: true,
      },
      { key: 'textmodule_description', type: 'textarea' },
      { key: 'textmodule_templatetext', hideOnIndex: true, type: 'html' },
      { key: 'textmodule_text_left', hideOnIndex: true, type: 'html' },
      {
        key: 'textmodule_text_right_0',
        hideOnIndex: true,
        type: 'html',
        visible: entity => entity.textmodule_number_of_text_blocks > 0,
      }, {
        key: 'textmodule_text_right_1',
        hideOnIndex: true,
        type: 'html',
        visible: entity => entity.textmodule_number_of_text_blocks > 1,
      }, {
        key: 'textmodule_text_right_2',
        hideOnIndex: true,
        type: 'html',
        visible: entity => entity.textmodule_number_of_text_blocks > 2,
      }, {
        key: 'textmodule_text_right_3',
        hideOnIndex: true,
        type: 'html',
        visible: entity => entity.textmodule_number_of_text_blocks > 3,
      }, {
        key: 'textmodule_text_right_4',
        hideOnIndex: true,
        type: 'html',
        visible: entity => entity.textmodule_number_of_text_blocks > 4,
      },
    ],
    filters: [
      {
        key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name', required: false,
      },
    ],
    filter_vertical: true,
  },
  texttemplate: {
    create: false,
    delete: false,
    update: false,
    entity: 'texttemplate',
    fields: [
      { key: 'texttemplate_id' },
      'texttemplate_name',
      'texttemplate_code',
      { key: 'texttemplate_content_de', type: 'textarea', hideOnIndex: true },
      { key: 'texttemplate_content_fr', type: 'textarea', hideOnIndex: true },
      { key: 'texttemplate_content_en', type: 'textarea', hideOnIndex: true },
    ],
  },
  texttemplate_variable: {
    create: false,
    delete: false,
    update: false,
    entity: 'texttemplate_variable',
    fields: [
      { key: 'texttemplate_variable_id' },
      { key: 'texttemplate_variable_name' },
      { key: 'texttemplate_variable_example' },
      {
        key: 'texttemplate_id', type: 'list', listLabel: 'texttemplate_name', list: 'texttemplate', hideOnIndex: true,
      },
    ],
  },
  claimtype: {
    entity: 'frontend_4_8_1',
    fields: [
      { key: 'claimtype_id', auto: true },
      { key: 'claimtype_name' },
      { key: 'claimtype_description', type: 'textarea' },
      { key: 'claimtype_amount_inspectionresults', hideOnForm: true },
      { key: 'claimtype_sum_inspectionresults', hideOnForm: true },
    ],
  },
  invoicecriteria: {
    entity: 'frontend_4_9_1',
    fields: [
      { key: 'invoicecriteria_id', auto: true },
      { key: 'invoicecriteria_name' },
      { key: 'invoicecriteria_description', type: 'textarea' },
      { key: 'invoicecriteria_amount_invoices', hideOnForm: true },
    ],
  },
  invoicevaluetype: {
    entity: 'frontend_4_10_1',
    fields: [
      { key: 'invoicevaluetype_id', auto: true },
      { key: 'invoicevaluetype_name' },
      { key: 'invoicevaluetype_description', type: 'textarea' },
      {
        key: 'unit_id',
        type: 'list',
        list: 'unit',
        listLabel: 'unit_name',
        label: 'Unit',
        with: 'invoicevaluetype_unit_preferred_unit',
      },
      { key: 'invoicevaluetype_unit_preferred_unit', type: 'boolean' },
      { key: 'invoicevaluetype_amount_invoices', hideOnForm: true },
    ],
  },
  rating: {
    entity: 'frontend_4_11_1',
    fields: [
      { key: 'rating_id', auto: true },
      { key: 'rating_name' },
      { key: 'rating_description', type: 'textarea' },
      { key: 'rating_sum_inspectionresults', hideOnForm: true },
    ],
  },
  resultcategorization: {
    fields: [
      { key: 'resultcategorization_id', auto: true },
      { key: 'resultcategorization_name' },
      { key: 'resultcategorization_description', type: 'textarea' },
    ],
  },
  savingtype: {
    entity: 'frontend_4_13_1',
    fields: [
      { key: 'savingtype_id', auto: true },
      { key: 'savingtype_name' },
      { key: 'savingtype_description', type: 'textarea' },
      { key: 'savingtype_sum_inspectionsresults', hideOnForm: true },
    ],
  },
  // endregion
  // region Workpackage 5
  contradiction: {
    customPage: () => import('@/views/app/Page/Contradiction/Index.vue'),
    createModal: false,
    formComponent: () => import('@/views/app/FormComponent/ContradictionForm.vue'),
    fields: [
      { key: 'contradiction_id', auto: true },
      { key: 'contradiction_name' },
      { key: 'contradiction_last_change_time', hideOnUpdate: true, hideOnIndex: true },
      { key: 'pos_name', hideOnForm: true },
      { key: 'company_name', hideOnForm: true },
      { key: 'contradiction_creation_time', hideOnForm: true },
      // { key: 'contradictiontask_count', hideOnForm: true },
      // { key: 'contradictionpoint_count', hideOnForm: true },
    ],
    filters: [
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
      {
        key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name',
      },
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
      {
        key: 'user_id', type: 'list', list: 'user', listLabel: 'user_firstname',
      },
      {
        key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
      },
      {
        key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
      },
      {
        key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name',
      },
      {
        key: 'savingtype_id', type: 'list', list: 'savingtype', listLabel: 'savingtype_name',
      },
    ],
    default: {
      contradiction_ready_to_comm: 0,
      contradiction_sender_abbreviation: 'dfsdf',
      contradiction_signature1: 0,
      contradiction_signature2: 0,
      contradiction_comment_for_customer: 'dsfsdfds',
      contradiction_addendum_necessary: 0,
    },
    note: 'frontend_0_8_8',
  },
  contradictionpackage: {
    customPage: () => import('@/views/app/Page/ContradictionPackage.vue'),
    createModal: false,
    fields: [
      { key: 'contradictionpackage_id', auto: true },
      { key: 'contradictionpackage_name' },
      { key: 'contradictionpackage_sum' },
      { key: 'contradictionpackage_description', hideOnIndex: true },
      { key: 'contradiction_count', hideOnForm: true },
    ],
    filters: [
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
      {
        key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name',
      },
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
      {
        key: 'user_id', type: 'list', list: 'user', listLabel: 'user_firstname',
      },
      {
        key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
      },
      {
        key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
      },
      {
        key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name',
      },
      {
        key: 'savingtype_id', type: 'list', list: 'savingtype', listLabel: 'savingtype_name',
      },
    ],
    note: 'frontend_0_8_9',
  },
  contradictionpoint: {
    fieldComponent: () => import('@/views/app/CreateComponent/ContradictionPoint'),
    fields: [
      { key: 'contradictionpoint_id', auto: true, hideOnForm: true },
      { key: 'contradictionpoint_rank' },
      { key: 'contradictionpoint_title' },
      { key: 'contradictionpoint_maximum_claim_green', type: 'number', required: false },
      { key: 'contradictionpoint_maximum_claim_yellow', type: 'number', required: false },
      { key: 'contradictionpoint_maximum_claim_red', type: 'number', required: false },
      {
        key: 'contradictionpoint_accommodation_standard_green', type: 'number', hideOnIndex: true, required: false,
      },
      {
        key: 'contradictionpoint_accommodation_standard_yellow', type: 'number', hideOnIndex: true, required: false,
      },
      {
        key: 'contradictionpoint_accommodation_standard_red', type: 'number', hideOnIndex: true, required: false,
      },
      {
        key: 'contradictionpoint_additional_accommodation', type: 'number', hideOnIndex: true, required: false,
      },
      {
        key: 'contradictionpoint_owner_offer', type: 'number', hideOnIndex: true, required: false,
      },
      { key: 'contradictionpoint_text', type: 'html', hideOnIndex: true },
      { key: 'contradictionpoint_text_customer', type: 'html', hideOnIndex: true },
      {
        key: 'textmodule_id', type: 'list', list: 'textmodule', listLabel: 'textmodule_name', hideOnIndex: true,
      },
    ],
    default: {
      contradictionpoint_legally_clear: 1,
      contradictionpoint_hidden: 0,
    },
  },
  // endregion
  // region Work Package 6
  ticket: {
    customIndex: () => import('@/views/app/Page/TicketList'),
    customPage: () => import('@/views/app/Page/TicketDetail.vue'),
    fieldComponent: () => import('@/views/app/CreateComponent/TicketForm.vue'),
    create: false,
    entity: 'frontend_6_1_6_overview',
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
      { key: 'ticket_planned_treatment_week' },
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

      // { key: 'column_name', hideOnForm: true },
      { key: 'ticket_creation_time', type: 'date', time: true, hideOnForm: true },
      { key: 'board_name', hideOnForm: true },
      // { key: 'contract_id', hideOnForm: true },
      // { key: 'contract_name', hideOnForm: true },
      // { key: 'pos_id', hideOnForm: true },
      { key: 'pos_name', hideOnForm: true },
      // { key: 'sub_ticket_count', hideOnForm: true },
    ],
    default: {
      ticket_progress: 10,
      ticket_deadline: '2000-01-01 00:00:00',
    },
    filters: [
      {
        key: 'customergroup_id',
        type: 'list',
        list: 'customergroup',
        listLabel: 'customergroup_name',
        required: false,
      },
      {
        key: 'company_id',
        type: 'list',
        list: 'frontend_2_2_3_1',
        listLabel: 'company_name',
        filter_key: 'customergroup_id',
        required: false,
      },
      {
        key: 'pos_id',
        type: 'list',
        list: 'frontend_2_1_3_8',
        listLabel: 'pos_name',
        filter_key: 'company_id',
        required: false,
      },
      {
        key: 'contract_id',
        listLabel: 'contract_name',
        type: 'list',
        list: 'frontend_4_2_1_contract_selector',
        filter_key: 'pos_id',
        required: false,
      },
    ],
    note: 'frontend_0_8_2',
  },
  board: {
    entity: 'frontend_6_1_4',
    defaultSortField: 'board_id',
    fields: [
      {
        key: 'board_button',
        sortable: false,
        type: 'button',
        hideOnForm: true,
        btnLabel: 'Kanban',
        getRoute: board => ({ name: 'table-kanban', params: { id: board.board_id, table: 'board' } }),
      },
      { key: 'board_id', auto: true },
      { key: 'board_name' },
      { key: 'board_description', type: 'textarea' },
      { key: 'board_amount_columnx', hideOnForm: true },

    ],
    relations: [
      {
        title: 'headline~columnx~tab',
        entityForm: 'columnx_board_rel',
        entity: 'frontend_column_list',
        primaryKey: 'column_id',
        view: false,
        fields: [
          {
            key: 'column_id', type: 'list', list: 'columnx', alwaysNew: true, onlyForm: true,
          },
          { key: 'column_name', hideOnForm: true },
          { key: 'column_description', type: 'textarea', hideOnForm: true },
          { key: 'column_is_qualitygate', type: 'boolean', hideOnForm: true },
          { key: 'column_has_stamp', type: 'boolean', hideOnForm: true },
          { key: 'team_name', hideOnForm: true },
          { key: 'rank_order', type: 'number' },
        ],
      },
      {
        title: 'headline~documenttype~tab',
        entityForm: 'documenttype_board_rel',
        entity: 'documenttype_board_grp',
        primaryKey: 'documenttype_id',
        fields: [
          {
            key: 'documenttype_id', type: 'list', list: 'documenttype', listLabel: 'documenttype_name',
          },
          { key: 'documenttype_name', hideOnForm: true },
        ],
      },
    ],
  },
  columnx: {
    fields: [
      { key: 'column_id', auto: true },
      { key: 'column_name' },
      { key: 'column_description', type: 'textarea' },
      { key: 'column_is_qualitygate', type: 'boolean' },
      { key: 'column_has_stamp', type: 'boolean' },
      {
        key: 'default_value_id', type: 'list', list: 'defaultvalue', alwaysNew: true, onlyForm: true,
      },
      {
        key: 'team_id', type: 'list', list: 'team', listLabel: 'team_name', required: false,
      },
    ],
  },
  defaultvalue: {
    fields: [
      { key: 'default_value_id', auto: true },
      { key: 'default_deadline_period', type: 'number' },
      { key: 'default_deadline_yellow', type: 'number' },
      { key: 'default_deadline_red', type: 'number' },
      { key: 'default_prediction_value', type: 'number' },
      { key: 'default_prediction_info' },
      { key: 'default_deadline_info' },
    ],
  },
  trackrecord: {
    delete: false,
    update: false,
    create: false,
    fields: [
      { key: 'trackrecord_id', auto: true },
      { key: 'trackrecord_timestamp' },
      { key: 'trackrecord_type' },
      { key: 'trackrecordcategory_name' },
      { key: 'trackrecordtype_name' },
      { key: 'trackrecord_status' },
      { key: 'trackrecord_comment' },
    ],
    filters: [
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
    ],
  },
  // endregion
  document: {
    entity: 'frontend_document_list',
    fields: [
      { key: 'document_id', hideOnForm: true },
      { key: 'document_name', hideOnForm: true },
      { key: 'document_mime_type', hideOnForm: true },
      { key: 'documenttype_name', hideOnForm: true },
      {
        key: 'documenttype_id', type: 'list', list: 'documenttype', listLabel: 'documenttype_name', hideOnIndex: true,
      },
      {
        key: 'files', hideOnIndex: true, type: 'file', rules: { size: 10000 },
      },
      {
        key: 'download',
        sortable: false,
        type: 'download',
        hideOnForm: true,
        label: 'Download',
        btnLabel: 'Download',
        getLink: getDocumentLink,
      },
      // { key: 'document_content_type' },
    ],
  },
  '1__translation': {
    inlineEdit: true,
    primaryKey: 'translation_id',
    fields: [
      { key: 'translation_id', disableOnUpdate: true },
      { key: 'translation_lang', composite: true, disableOnUpdate: true },
      { key: 'translation_text' },
    ],
  },
  '1__attribute_nice': {
    inlineEdit: true,
    primaryKey: 'attribute_name',
    fields: [
      { key: 'attribute_name', disableOnUpdate: true },
      { key: 'attribute_lang', composite: true, disableOnUpdate: true },
      { key: 'attribute_nice_name' },
    ],
    default: {
      attribute_nice_name_group: '',
    },
  },
  'function': {
    fields: [
      { key: 'function_id', auto: true },
      'function_name',
      'function_description'
    ]
  }
}

function getContractCriteriaFields() {
  return [
    {
      key: 'choice_id',
      type: 'list',
      list: 'frontend_3_6_4',
      relationEntity: 'contract_criteria_choice_rel',
      with: ['criteria_id', 'contract_id'],
      listLabel: 'choice_name',
      hideOnIndex: true,
      filter_key: 'criteria_id',
      filter_value: null,
      mandatoryIfListEmpty: true,
    },
    {
      key: 'contract_criteria_valid_from_date', type: 'date', composite: true, disableOnUpdate: true,
    },
    { key: 'contract_criteria_valid_to_date', type: 'date' },
    { key: 'contract_criteria_exists', type: 'boolean' },
    { key: 'criteriatype_name', hideOnForm: true },
    { key: 'contract_criteria_comment', type: 'textarea', required: false },
    { key: 'contract_criteria_value', type: 'number' },

    { key: 'choice_name', hideOnForm: true },
  ]
}

function visibleByRecurringPaymentType(indexes) {
  return (entity, vm) => {
    const list = vm.$store.state.table.listCache.recurringpaymenttype
    if (!list) return false
    const selected = list.find(i => i.recurringpaymenttype_id === entity.recurringpaymenttype_id)
    return selected ? indexes.indexOf(parseInt(selected.recurringpaymenttype_name.split('-')[0])) >= 0 : false
  }
}

async function updateInvoiceFlatRate(data) {
  console.log('change', data)
  await api({
    entity: 'invoiceposition',
    action: 'update',
    data: [
      {
        invoiceposition_id: data.item.invoiceposition_id,
        invoiceposition_flat_rate: data.value,
      },
    ],
  })
  successToast('Value updated')
}

async function updateInvoiceApportionable(data) {
  console.log('change', data)
  await api({
    entity: 'invoiceposition',
    action: 'update',
    data: [
      {
        invoiceposition_id: data.item.invoiceposition_id,
        invoiceposition_apportionable: data.value,
      },
    ],
  })
  successToast('Value updated')
}

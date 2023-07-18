import { successToast } from '@/libs/toastification'

export default {
  entity: 'frontend_1_1_2_1',
  formComponent: () => import('@/views/app/CreateComponent/UserForm.vue'),
  fields: [
    {
      key: 'usertype_id',
      hideOnIndex: true,
      noFetch: true,
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
      noFetch: true,
      relationEntity: 'user_function_rel',
      hideOnIndex: true,
    },
    {
      key: 'user_functions',
      multiple: true,
      listLabel: 'function_name',
      noFetch: true,
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
      visible: () => {
        return false
      },
      hideOnIndex: true,
      type: 'boolean',
      default: 1,
      change: (entity) => {
        if (entity.usertype_id === 1) return 1
        else return 0
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
      noFetch: true,
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
      noFetch: true,
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
          key: 'role_description', sortable: true, hideOnForm: true,
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
    data.user_functions = (vm.entity.user_functions || []).map(elt => ({ function_id: elt }))
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
          console.log("addressField.getSubFields()",addressField.getSubFields())
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
}

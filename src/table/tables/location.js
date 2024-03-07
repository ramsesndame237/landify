import _ from "lodash";

export default {
  entityEndpoint: '/locations',
  // newEndpointCreate: '/locations',
  // newEndpointUpdate: '/locations',
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
    { key: 'owner_name', hideOnForm: true, hideOnIndex: true },
    { key: 'manager_name', hideOnForm: true, hideOnIndex: true },
    { key: 'locationtype_name', hideOnForm: true },
    { key: 'city_name' },
    { key: 'country_name' },
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
  filter_vertical: true,
  filters: [
    {
      key: 'customergroup_id',
      type: 'list',
      list: 'customergroup',
      listLabel: 'customergroup_name',
    },
    {
      key: 'company_id',
      type: 'list',
      list: 'company',
      listLabel: 'company_name',
      relationEntity: 'company_pos_rel',
      filter_key: 'customergroup_id',
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
  // isUpdate: window.$vue.$route.query.edit === 'true',
  note: 'frontend_0_8_5',
  submit: async (vm, entity, create) => {
    const fieldsComponents = vm.getFieldComponents()
    const addressField = fieldsComponents.find(f => f.field.key === 'address_id')?.subEntity
    console.log('addressField: ', addressField)
    console.log('vm: ', vm)
    const attributes = []
    console.log('entity: ', entity)
    if (create) {
      await vm.$http.post('/locations', {
        ...entity,
        ...addressField,
      })
    } else {
<<<<<<< 6d048cf05e985db7a3f0736a121ec51c1e1b89f3
      return vm.$http.put('/locations', { ...entity, ...addressField })
=======
      return vm.$http.put('/locations', { ...entity, ...addressField, address_id: '' })
>>>>>>> 7c1b798fe2efc22c16783e5c4557785049a434c3
    }
  },
  validate: () => alert('validate'),
}


export default {
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
}

export default {
  primaryKey: 'address_id',
  entity: 'frontend_2_7_1',
  // fieldComponent: () => import('@/views/app/FormComponent/AddressForm.vue'),
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
  filters: [
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
      list: 'company',
      cols: 12,
      listLabel: 'company_name',
      hideOnIndex: true,
      relationEntity: 'company_pos_rel',
      filter_key: 'customergroup_id',
    },
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

}

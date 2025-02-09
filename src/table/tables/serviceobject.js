import { ACCESS } from '@/config/config-access'

export default {
  entity: 'frontend_3_5_1',
  entityEndpoint: '/areas/serviceobjects/list',
  permissions: ACCESS.tableAccess.service_object.main,
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
  filter_vertical: true,
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
      list: 'company',
      listLabel: 'company_name',
      relationEntity: 'company_pos_rel',
      filter_key: 'customergroup_id',
      required: false,
    },
  ],
  relations: [
    {
      title: 'Areas',
      entity: 'frontend_3_5_3_1',
      entityForm: 'area_serviceobject_rel',
      entityView: 'area',
      primaryKey: 'area_id',
      permissions: ACCESS.tableAccess.service_object.relations.area,
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
      permissions: ACCESS.tableAccess.service_object.relations.location,
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
      permissions: ACCESS.tableAccess.service_object.relations.contract,
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
}

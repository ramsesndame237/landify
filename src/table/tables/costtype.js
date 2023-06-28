export default {
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
}

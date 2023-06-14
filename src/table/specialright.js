export default {
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
}

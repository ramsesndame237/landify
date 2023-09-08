import { getContractCriteriaFields } from '@/table/utils'

export default {
  entity: 'frontend_3_6_1',
  fields: [
    { key: 'criteria_id', auto: true },
    { key: 'criteria_name' },
    { key: 'criteria_description', type: 'textarea', hideOnIndex: true },
    { key: 'criteriatype_name', hideOnForm: true },
    { key: 'contract_count', type: 'number', hideOnForm: true },
    {
      key: 'criteriatype_id',
      type: 'list',
      list: 'criteriatype',
      hideOnIndex: true,
      listLabel: 'criteriatype_name',
      required: false,
    },
    {
      key: 'contracttype_id',
      type: 'list',
      list: 'contracttype',
      hideOnIndex: true,
      listLabel: 'contracttype_name',
      required: false,
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
}

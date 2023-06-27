export default {
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
}

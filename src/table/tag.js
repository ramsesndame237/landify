export default {
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
}

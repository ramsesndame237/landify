export default {
  primaryKey: 'tablegroup_id',
  fields: [
    {
      key: 'tablegroup_id', label: 'ID', sortable: true, hideOnForm: true,
    },
    { key: 'tablegroup_name', label: 'Name', sortable: true },
    {
      key: 'tablegroup_description', label: 'Description', sortable: true, type: 'textarea',
    },
  ],
  relations: [
    {
      title: 'Tables',
      primaryKey: 'table_name',
      entity: 'tablename_tablegroup_grp',
      entityForm: 'tablename_tablegroup_rel',
      entityView: 'tablename',
      update: false,
      fields: [
        {
          key: 'table_name', sortable: true, type: 'list', list: 'tablename', listLabel: 'table_name',
        },
      ],
    },
  ],
}

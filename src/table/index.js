export default {
  user: {
    primaryKey: 'user_id',
    defaultSortField: 'user_id',
    fields: [
      { key: 'user_id', label: 'Id', hideOnForm: true },
      { key: 'user_firstname', label: 'First Name', sortable: true },
      { key: 'user_lastname', label: 'Last Name', sortable: true },
      { key: 'user_email', label: 'Email', sortable: true, type: 'email' },
      { key: 'user_last_login_time', label: 'Last login', sortable: true },
    ],
    relations: [
      {
        title: 'Roles',
        primaryKey: 'role_id',
        entity: 'user_role_grp',
        fields: [
          { key: 'role_id', label: 'Role ID', sortable: true },
          { key: 'role_name', label: 'Role name', sortable: true },
          { key: 'role_permission', label: 'Permission', sortable: true },
          { key: 'user_role_valid_from', label: '', sortable: true },
          { key: 'user_role_valid_to', label: '', sortable: true },
        ],
      },
      {
        title: 'Customer Groups',
        primaryKey: 'customergroup_id',
        entity: 'user_customergroup_grp',
        fields: [
          { key: 'customergroup_id', label: 'ID', sortable: true },
          { key: 'customergroup_name', sortable: true },
          { key: 'user_customergroup_valid_from', sortable: true },
          { key: 'user_customergroup_valid_to', sortable: true },
        ],
      },
    ],
  },
  role: {
    primaryKey: 'role_id',
    fields: [
      { key: 'role_id', label: 'Role ID', sortable: true, hideOnForm: true },
      { key: 'role_name', label: 'Role name', sortable: true },
      { key: 'role_permission', label: 'Permission', sortable: true },
    ],
  },
  team: {
    primaryKey: 'team_id',
    fields: [
      { key: 'team_id', sortable: true, hideOnForm: true },
      { key: 'team_name', sortable: true },
      { key: 'team_description', type: 'textarea' },
    ],
  },
  usertype: {
    primaryKey: 'usertype_id',
    fields: [
      { key: 'usertype_id', label: 'Id', hideOnForm: true },
      { key: 'usertype_name', label: 'app.form.label.name', sortable: true },
      {
        key: 'usertype_description',
        label: 'app.form.label.description',
        sortable: true,
        type: 'textarea',
      },
    ],
  },
  tablename: {
    primaryKey: 'table_name',
    fields: [
      { key: 'table_name', sortable: true },
    ],
  },
  tablegroup: {
    primaryKey: 'tablegroup_id',
    fields: [
      { key: 'tablegroup_id', label: 'ID', sortable: true, hideOnForm: true },
      { key: 'tablegroup_name', label: 'Name', sortable: true },
      { key: 'tablegroup_description', label: 'Description', sortable: true, type: 'textarea' },
    ],
  },
  crud: {
    primaryKey: 'crud',
    fields: [
      { key: 'crud', label: 'Crud', sortable: true },
    ],
  },
  customergroup: {
    primaryKey: 'customergroup_id',
    fields: [
      { key: 'customergroup_id', sortable: true, hideOnForm: true },
      { key: 'customergroup_name', sortable: true },
      { key: 'customergroup_description', sortable: true, hideOnIndex: true, type: 'textarea' },
    ],
  },
  company: {
    primaryKey: 'company_id',
    fields: [
      { key: 'company_id', sortable: true, hideOnForm: true },
      { key: 'company_name', sortable: true },
    ],
  },
  contactperson: {
    primaryKey: 'contactperson_id',
    fields: [
      { key: 'contactperson_id', sortable: true, hideOnForm: true },
      { key: 'contactperson_firstname', sortable: true },
      { key: 'contactperson_lastname', sortable: true },
      { key: 'contactperson_department', sortable: true },
      { key: 'contactperson_shortname', sortable: true },
    ],
  },
}

export default {
  user: {
    primaryKey: 'user_id',
    defaultSortField: 'user_id',
    fields: [
      { key: 'user_id', label: 'Id', hideOnForm: true },
      { key: 'user_firstname', label: 'First Name', sortable: true },
      { key: 'user_lastname', label: 'Last Name', sortable: true },
      { key: 'user_email', label: 'Email', sortable: true, type: 'email' },
      { key: 'user_last_login_time', label: 'Last login', sortable: true, hideOnForm: true },
      {
        key: 'usertype_id',
        label: 'User Type',
        hideOnIndex: true,
        type: 'list',
        list: 'usertype',
        listLabel: 'usertype_name'
      },
      {
        key: 'contactperson_id',
        hideOnIndex: true,
        type: 'list',
        list: 'contactperson',
        listLabel: 'contactperson_lastname'
      },
    ],
    formComponent: () => import('@/views/app/Users/Form'),
    relations: [
      {
        title: 'Roles',
        primaryKey: 'role_id',
        entity: 'user_role_grp',
        entityForm: 'user_role_rel',
        fields: [
          { key: 'role_id', label: 'Role ID', sortable: true, type: 'list', list: 'role', listLabel: 'role_name' },
          { key: 'role_name', label: 'Role name', sortable: true, hideOnForm: true },
          { key: 'role_permission', label: 'Permission', sortable: true, hideOnForm: true },
          { key: 'user_role_valid_from', type: 'date', sortable: true },
          { key: 'user_role_valid_to', type: 'date', sortable: true },
        ],
      },
      {
        title: 'Customer Groups',
        primaryKey: 'customergroup_id',
        entity: 'user_customergroup_grp',
        entityForm: 'user_customergroup_rel',
        fields: [
          { key: 'customergroup_id', label: 'ID', sortable: true },
          { key: 'customergroup_name', sortable: true },
          { key: 'user_customergroup_valid_from', sortable: true },
          { key: 'user_customergroup_valid_to', sortable: true },
        ],
      },
      {
        title: 'Companies',
        primaryKey: 'company_id',
        entity: 'user_company_grp',
        entityForm: 'user_company_rel',
        fields: [
          { key: 'company_id', label: 'ID', sortable: true },
          { key: 'company_name', sortable: true },
          { key: 'user_company_valid_from', sortable: true },
          { key: 'user_company_valid_to', sortable: true },
        ],
      },
      {
        title: 'Point of sales',
        primaryKey: 'pos_id',
        entity: 'user_pos_grp',
        entityForm: 'user_pos_rel',
        fields: [
          { key: 'pos_id', label: 'ID', sortable: true },
          { key: 'pos_name', sortable: true },
          { key: 'user_pos_valid_from', sortable: true },
          { key: 'user_pos_valid_to', sortable: true },
        ],
      },
      {
        title: 'Teams',
        primaryKey: 'team_id',
        entity: 'user_team_grp',
        entityForm: 'user_team_rel',
        fields: [
          { key: 'team_id', label: 'ID', sortable: true },
          { key: 'team_name', sortable: true },
          { key: 'user_team_valid_from', sortable: true },
          { key: 'user_team_valid_to', sortable: true },
        ],
      },
      {
        title: 'Partner Companies',
        primaryKey: 'partnercompany_id',
        entity: 'user_partnercompany_grp',
        entityForm: 'user_partnercompany_rel',
        fields: [
          { key: 'partnercompany_id', label: 'ID', sortable: true },
          { key: 'partnercompany_name', sortable: true },
          { key: 'user_partnercompany_valid_from', sortable: true },
          { key: 'user_partnercompany_valid_to', sortable: true },
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

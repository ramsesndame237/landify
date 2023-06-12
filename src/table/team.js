export default {
  fields: [
    { key: 'team_id', auto: true },
    { key: 'team_name', sortable: true },
    { key: 'team_description', type: 'textarea' },
  ],
  relations: [
    {
      title: 'Users',
      primaryKey: 'user_id',
      entity: 'user_team_grp',
      entityForm: 'user_team_rel',
      view: false,
      fields: [
        {
          key: 'user_id',
          type: 'list',
          list: 'user',
          listLabel: 'user_email',
          disableOnUpdate: true,
          multiple: true
        },
        { key: 'user_firstname', hideOnForm: true },
        { key: 'user_lastname', hideOnForm: true },
        { key: 'team_name', sortable: true, hideOnForm: true },
        {
          key: 'user_team_valid_from', sortable: true, type: 'date', composite: true, disableOnUpdate: true,
        },
        {
          key: 'user_team_valid_to', required: false, type: 'date', rules: { date_after: ['@user_team_valid_from'] },
        },
      ],
    },
    {
      title: 'Roles',
      primaryKey: 'role_id',
      entity: 'team_role_grp',
      entityForm: 'team_role_rel',
      view: false,
      update: false,
      fields: [
        {
          key: 'role_id',
          type: 'list',
          list: 'role',
          listLabel: 'role_name',
          multiple: true,
          hideOnIndex: true,
        },
        { key: 'role_name', hideOnForm: true },
      ],
    },
  ],
}

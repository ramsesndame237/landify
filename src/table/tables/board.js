export default {
  entity: 'frontend_6_1_4',
  defaultSortField: 'board_id',
  fields: [
    {
      key: 'board_button',
      sortable: false,
      type: 'button',
      hideOnForm: true,
      btnLabel: 'Kanban',
      getRoute: board => ({ name: 'table-kanban', params: { id: board.board_id, table: 'board' } }),
    },
    { key: 'board_id', auto: true },
    { key: 'board_name' },
    { key: 'board_description', type: 'textarea' },
    { key: 'board_amount_columnx', hideOnForm: true },

  ],
  relations: [
    {
      title: 'headline~columnx~tab',
      entityForm: 'columnx_board_rel',
      entity: 'frontend_column_list',
      primaryKey: 'column_id',
      view: false,
      fields: [
        {
          key: 'column_id', type: 'list', list: 'columnx', alwaysNew: true, onlyForm: true,
        },
        { key: 'column_name', hideOnForm: true },
        { key: 'column_description', type: 'textarea', hideOnForm: true },
        { key: 'column_is_qualitygate', type: 'boolean', hideOnForm: true },
        { key: 'column_has_stamp', type: 'boolean', hideOnForm: true },
        { key: 'team_name', hideOnForm: true },
        { key: 'rank_order', type: 'number' },
      ],
    },
    {
      title: 'headline~documenttype~tab',
      entityForm: 'documenttype_board_rel',
      entity: 'documenttype_board_grp',
      primaryKey: 'documenttype_id',
      fields: [
        {
          key: 'documenttype_id', type: 'list', list: 'documenttype', listLabel: 'documenttype_name',
        },
        { key: 'documenttype_name', hideOnForm: true },
      ],
    },
  ],
}

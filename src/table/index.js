export default {
  // region Work Package 1
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
    formComponent: () => import('@/views/app/FormComponent/UserForm'),
    relations: [
      {
        title: 'Roles',
        primaryKey: 'role_id',
        entity: 'user_role_grp',
        entityForm: 'user_role_rel',
        fields: [
          { key: 'role_id', label: 'Role ID', sortable: true, type: 'list', list: 'role', listLabel: 'role_name' },
          { key: 'role_name', label: 'Role name', sortable: true, hideOnForm: true },
          { key: 'role_permission', label: 'Permission', sortable: true, hideOnForm: true, },
          { key: 'user_role_valid_from', type: 'date', sortable: true },
          {
            key: 'user_role_valid_to',
            type: 'date',
            rules: { date_after: ['@user_role_valid_from'] },
            sortable: true,
          },
        ],
      },
      {
        title: 'Customer Groups',
        primaryKey: 'customergroup_id',
        entity: 'user_customergroup_grp',
        entityForm: 'user_customergroup_rel',
        fields: [
          {
            key: 'customergroup_id',
            label: 'ID',
            type: 'list',
            list: 'customergroup',
            listLabel: 'customergroup_name',
            sortable: true,
          },
          { key: 'customergroup_name', sortable: true, hideOnForm: true },
          { key: 'user_customergroup_valid_from', sortable: true, type: 'date' },
          {
            key: 'user_customergroup_valid_to',
            type: 'date',
            rules: { date_after: ['@user_customergroup_valid_from'] },
            sortable: true,
          },
        ],
      },
      {
        title: 'Companies',
        primaryKey: 'company_id',
        entity: 'user_company_grp',
        entityForm: 'user_company_rel',
        fields: [
          { key: 'company_id', label: 'ID', sortable: true, type: 'list', list: 'company', listLabel: 'company_name' },
          { key: 'company_name', sortable: true, hideOnForm: true },
          { key: 'user_company_valid_from', sortable: true, type: 'date' },
          {
            key: 'user_company_valid_to',
            sortable: true,
            type: 'date',
            rules: { date_after: ['@user_company_valid_from'] },
          },
        ],
      },
      {
        title: 'Point of sales',
        primaryKey: 'pos_id',
        entity: 'user_pos_grp',
        entityForm: 'user_pos_rel',
        fields: [
          { key: 'pos_id', label: 'ID', sortable: true, type: 'list', list: 'pos', listLabel: 'pos_name' },
          { key: 'pos_name', sortable: true, hideOnForm: true },
          { key: 'user_pos_valid_from', type: 'date', sortable: true },
          { key: 'user_pos_valid_to', type: 'date', sortable: true, rules: { date_after: ['@user_pos_valid_from'] } },
        ],
      },
      {
        title: 'Teams',
        primaryKey: 'team_id',
        entity: 'user_team_grp',
        entityForm: 'user_team_rel',
        fields: [
          { key: 'team_id', label: 'ID', sortable: true, type: 'list', list: 'team', listLabel: 'team_name' },
          { key: 'team_name', sortable: true, hideOnForm: true },
          { key: 'user_team_valid_from', sortable: true, type: 'date' },
          { key: 'user_team_valid_to', sortable: true, type: 'date', rules: { date_after: ['@user_team_valid_from'] } },
        ],
      },
      {
        title: 'Partner Companies',
        primaryKey: 'partnercompany_id',
        entity: 'user_partnercompany_grp',
        entityForm: 'user_partnercompany_rel',
        fields: [
          {
            key: 'partnercompany_id',
            label: 'ID',
            sortable: true,
            type: 'list',
            list: 'partnercompany',
            listLabel: 'partnercompany_name'
          },
          { key: 'partnercompany_name', sortable: true, hideOnForm: true },
          { key: 'user_partnercompany_valid_from', sortable: true, type: 'date' },
          {
            key: 'user_partnercompany_valid_to',
            sortable: true,
            type: 'date',
            rules: { date_after: ['@user_partnercompany_valid_from'] }
          },
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
    relations: [
      {
        title: 'Access',
        primaryKey: 'access_id',
        entity: 'role_access_grp',
        entityForm: 'role_access_rel',
        fields: [
          { key: 'access_id', label: 'ID', sortable: true, type: 'list', list: 'access', listLabel: 'access_name' },
          { key: 'access_name', sortable: true, hideOnForm: true },
          { key: 'role_access_valid_from', sortable: true, type: 'date' },
          {
            key: 'role_access_valid_to',
            sortable: true,
            type: 'date',
            rules: { date_after: ['@role_access_valid_from'] }
          },
        ],
      },
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'user_role_grp',
        entityForm: 'user_role_rel',
        fields: [
          {
            key: 'user_id',
            sortable: true,
            type: 'list',
            list: 'user',
            listLabel: 'user_firstname',
            hideOnIndex: true
          },
          { key: 'user_firstname', sortable: true, hideOnForm: true },
          { key: 'user_role_valid_from', type: 'date', sortable: true },
          {
            key: 'user_role_valid_to',
            type: 'date',
            rules: { date_after: ['@user_role_valid_from'] },
            sortable: true,
          },
        ],
      },
      {
        title: 'Table Groups',
        primaryKey: 'tablegroup_id',
        entity: 'role_tablegroup_grp',
        entityForm: 'role_tablegroup_rel',
        fields: [
          { key: 'tablegroup_id', sortable: true, type: 'list', list: 'tablegroup', listLabel: 'tablegroup_name' },
          { key: 'tablegroup_name', sortable: true },
          { key: 'tablegroup_description' },
        ],
      },
      {
        title: 'Tables',
        primaryKey: 'table_name',
        entity: 'role_tablename_grp',
        entityForm: 'role_tablename_rel',
        fields: [
          { key: 'table_name', sortable: true, type: 'list', list: 'tablename', listLabel: 'table_name' },
        ],
      },
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
      { key: 'usertype_name', sortable: true },
      {
        key: 'usertype_description',
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
    relations: [
      {
        title: 'Tables',
        primaryKey: 'table_name',
        entity: 'tablegroup_tablename_grp',
        entityForm: 'tablegroup_tablename_rel',
        fields: [
          { key: 'table_name', sortable: true, type: 'list', list: 'tablename', listLabel: 'table_name' },
        ],
      },
    ]
  },
  crud: {
    primaryKey: 'crud',
    fields: [
      { key: 'crud', label: 'Crud', sortable: true },
    ],
  },
  // endregion
  // region Work Package 2
  customergroup: {
    fields: [
      { key: 'customergroup_id', auto: true },
      { key: 'customergroup_name', sortable: true },
      { key: 'customergroup_description', sortable: true, hideOnIndex: true, type: 'textarea' },
      { key: 'pos_count', sortable: true, hideOnForm: true },
    ],
    relations: [
      {
        title: 'Companies',
        primaryKey: 'company_id',
        entity: 'customergroup_company_grp',
        entityForm: 'customergroup_company_rel',
        fields: [
          { key: 'company_id', sortable: true, type: 'list', list: 'company', listLabel: 'company_name' },
          { key: 'company_name', sortable: true, hideOnForm: true },
          { key: 'city_zip', sortable: true, hideOnForm: true },
          { key: 'city_name', sortable: true, hideOnForm: true },
          { key: 'country_short', sortable: true, hideOnForm: true },
        ],
      },
      {
        title: 'Contact Person',
        primaryKey: 'customergroup_id',
        entity: 'contactperson_customergroup_grp',
        entityForm: 'contactperson_customergroup_rel',
        fields: [
          {
            key: 'contactperson_id',
            sortable: true,
            type: 'list',
            list: 'contactperson',
            listLabel: 'contactperson_name'
          },
          { key: 'contactperson_lastname', sortable: true, hideOnForm: true },
          { key: 'contactperson_firstname', sortable: true, hideOnForm: true },
          { key: 'contactsalutation_name', sortable: true, hideOnForm: true },
          { key: 'contacttitle_name', sortable: true, hideOnForm: true },
          { key: 'contactperson_department', sortable: true, hideOnForm: true },
          { key: 'contactperson_function', sortable: true, hideOnForm: true },
          { key: 'contactdetails_email', sortable: true, hideOnForm: true },
          { key: 'contactdetails_phone', sortable: true, hideOnForm: true },
          { key: 'contactdetails_mobile', sortable: true, hideOnForm: true },
        ],
      },
      {
        title: 'Group Ticket/Packages',
        primaryKey: 'group_ticket_id',
        entity: 'groupticket_customergroup_grp',
        entityForm: 'groupticket_customergroup_rel',
        fields: [
          {
            key: 'group_ticket_id',
            sortable: true,
            type: 'list',
            list: 'group_ticket',
            listLabel: 'group_ticket_name',
            hideOnIndex: true
          },
          { key: 'group_ticket_name', sortable: true, hideOnForm: true },
          { key: 'group_ticket_description', sortable: true, hideOnForm: true },
          { key: 'group_ticket_Deadline', sortable: true, hideOnForm: true },
          { key: 'contradictionpackage_id', label: 'ContradictionPackage count', sortable: true, hideOnForm: true },
          { key: 'contradictionpackage_sum', label: 'ContradictionPackage Amount', sortable: true, hideOnForm: true },
          { key: 'ticket_id', label: 'Tickets count', sortable: true, hideOnForm: true },
        ],
      },
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'user_customergroup_grp',
        entityForm: 'user_customergroup_rel',
        fields: [
          { key: 'user_id', sortable: true, type: 'list', list: 'user', listLabel: 'user_lastname', hideOnIndex: true },
          { key: 'user_lastname', sortable: true, hideOnForm: true },
          { key: 'user_firstname', sortable: true, hideOnForm: true },
          { key: 'usertype_name', sortable: true, hideOnForm: true },
          { key: 'team_name', sortable: true, hideOnForm: true },
        ],
      },
    ],
  },
  company: {
    primaryKey: 'company_id',
    fields: [
      { key: 'company_id', sortable: true, hideOnForm: true },
      { key: 'company_name', sortable: true, hideOnForm: true },
      { key: 'customergroup_name', sortable: true, hideOnForm: true },
      { key: 'city_name', sortable: true, hideOnForm: true },
      { key: 'contactdetails_phone', sortable: true, hideOnForm: true },
      { key: 'contactdetails_email', sortable: true, hideOnForm: true },
      { key: 'contactperson_count', label: 'nd of Contact Person', sortable: true, hideOnForm: true },
    ],
    formComponent: () => import('@/views/app/FormComponent/CompanyForm'),
    relations: []
  },
  contactperson: {
    fields: [
      { key: 'contactperson_id', auto: true },
      { key: 'contactperson_firstname' },
      { key: 'contactperson_lastname' },
      { key: 'city_name', hideOnForm: true },
      { key: 'contactdetails_phone', hideOnForm: true },
      { key: 'contactdetails_email', hideOnForm: true },
      { key: 'contactperson_department', hideOnIndex: true },
      { key: 'contactperson_shortname', hideOnIndex: true },
      { key: 'contactperson_function' },
      { key: 'user_id' },
    ],
  },
  payment: {
    fields: [
      { key: 'payment_id', auto: true },
      { key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name' },
      { key: 'payment_info' },
      { key: 'payment_debitor' },
      { key: 'payment_objectreference' },
      { key: 'payment_value' },
      { key: 'payment_date', type: 'date' },
      { key: 'payment_type' },
    ],
  },
  partnercompany: {
    primaryKey: 'partnercompany_id',
    fields: [
      { key: 'partnergroup_id', type: 'list', list: 'partnergroup', listLabel: 'partnergroup_name', hideOnIndex: true },
      { key: 'partnercompany_id', auto: true },
      { key: 'partnercompany_name' },
      { key: 'partnergroup_name', hideOnForm: true },
      { key: 'city_name', hideOnForm: true },
      { key: 'partnertype_id', type: 'list', list: 'partnertype', listLabel: 'partnertype_name' },
      { key: 'contactdetails_email', hideOnForm: true },
      { key: 'contactperson_count', hideOnForm: true },
      { key: 'location_count', hideOnForm: true },
      { key: 'partnertype_id', hideOnIndex: true, type: 'list', list: 'partnertype', listLabel: 'partnertype_name' },
      { key: 'partnergroup_description', hideOnIndex: true, type: 'textarea' },
      { key: 'partnercompanies_count', hideOnForm: true },
    ],
  },
  partnergroup: {
    primaryKey: 'partnergroup_id',
    fields: [
      { key: 'partnergroup_id', auto: true },
      { key: 'partnergroup_name' },
      { key: 'partnertype_name', hideOnForm: true },
      { key: 'partnertype_id', hideOnIndex: true, type: 'list', list: 'partnertype', listLabel: 'partnertype_name' },
      { key: 'partnergroup_description', hideOnIndex: true, type: 'textarea' },
      { key: 'partnercompanies_count', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Partner Company',
        primaryKey: 'partnercompany_id',
        entity: 'partnergroup_partnercompany_grp',
        entityForm: 'partnergroup_partnercompany_rel',
        fields: [
          { key: 'partnercompany_id', auto: true },
          { key: 'partnercompany_name', hideOnForm: true },
          { key: 'partnertype_name', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
          { key: 'country_name', hideOnForm: true },
          { key: 'location_count', hideOnForm: true },
        ],
      },
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'partnergroup_user_grp',
        entityForm: 'partnergroup_user_rel',
        fields: [
          { key: 'user_id', auto: true },
          { key: 'user_lastname', hideOnForm: true },
          { key: 'user_firstname', hideOnForm: true },
          { key: 'user_email', hideOnForm: true },
          { key: 'user_last_login_time', hideOnForm: true },
          { key: 'user_locked', hideOnForm: true },
        ],
      },
      {
        title: 'Contact Persons',
        primaryKey: 'contactperson_id',
        entity: 'partnergroup_contactperson_grp',
        entityForm: 'partnergroup_contactperson_rel',
        fields: [
          { key: 'contactperson_id', auto: true },
          { key: 'contactperson_lastname', hideOnForm: true },
          { key: 'contactperson_firstname', hideOnForm: true },
          { key: 'contacttitle_name', hideOnForm: true },
          { key: 'contactsalutation_name', hideOnForm: true },
          { key: 'contactperson_department', hideOnForm: true },
          { key: 'contactperson_function', hideOnForm: true },
          { key: 'contactdetails_email', hideOnForm: true },
          { key: 'contactdetails_phone', hideOnForm: true },
          { key: 'contactdetails_mobile', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
        ],
      },
    ],
  },
  address: {
    primaryKey: 'address_id',
    fields: [
      { key: 'address_id', auto: true },
      { key: 'country_name', hideOnForm: true },
      { key: 'city_id', type: 'list', list: 'city', listLabel: 'city_name', hideOnIndex: true },
      { key: 'city_name', hideOnForm: true },
      { key: 'city_zip', hideOnForm: true },
      { key: 'address_street' },
      { key: 'address_house_number' },
      { key: 'address_extra' },
      { key: 'address_last_change_time', hideOnForm: true },
      { key: 'entries_count', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Companies',
        primaryKey: 'company_id',
        entity: 'company_address_grp',
        entityForm: 'address_company_rel',
        fields: [
          { key: 'company_id', sortable: true, type: 'list', list: 'company', listLabel: 'company_name' },
          { key: 'company_name', sortable: true, hideOnForm: true },
        ],
      },
    ]
  },
  contacttitle: {
    primaryKey: 'contacttitle_id',
    fields: [
      { key: 'contacttitle_id', sortable: true, auto: true },
      { key: 'contacttitle_title', sortable: true },
    ],
  },
  contactsalutation: {
    primaryKey: 'contactsalutation_id',
    fields: [
      { key: 'contactsalutation_id', sortable: true, auto: true },
      { key: 'contactsalutation_name', sortable: true },
      { key: 'contactsalutation_lettertext', sortable: true, type: 'textarea' },
    ],
  },
  city: {
    primaryKey: 'city_id',
    fields: [
      { key: 'city_id', sortable: true, auto: true },
      { key: 'city_name', sortable: true },
      { key: 'city_zip', sortable: true },
      { key: 'country_short', sortable: true },
      { key: 'country_id', hideOnIndex: true, type: 'list', list: 'country', listLabel: 'country_name' },
    ],
  },
  country: {
    primaryKey: 'country_id',
    fields: [
      { key: 'country_id', sortable: true, auto: true },
      { key: 'country_name', sortable: true },
      {
        key: 'currency_id',
        sortable: true,
        type: 'list',
        list: 'currency',
        listLabel: 'currency_name',
        hideOnIndex: true
      },
      { key: 'currency_name', sortable: true, hideOnForm: true },
      { key: 'country_short', sortable: true },
    ],
  },
  currency: {
    primaryKey: 'currency_id',
    fields: [
      { key: 'currency_id', sortable: true, auto: true },
      { key: 'currency_name', sortable: true },
      { key: 'currency_short', sortable: true },
      { key: 'currency_symbol', sortable: true },
      { key: 'currency_iso4217', sortable: true },
    ],
  },
  language: {
    primaryKey: 'language_id',
    fields: [
      { key: 'language_id', sortable: true, auto: true },
      { key: 'language_name', sortable: true },
      { key: 'language_iso639', sortable: true },
    ],
  },
  partnertype: {
    primaryKey: 'partnertype_id',
    fields: [
      { key: 'partnertype_id', sortable: true, auto: true },
      { key: 'partnertype_name', sortable: true },
      { key: 'partnertype_description', sortable: true, type: 'textarea' },
    ],
  },
  // endregion
}

export default {
  // region Work Package 1
  user: {
    fields: [
      {
        key: 'user_id', label: 'Id', auto: true, hideOnForm: true,
      },
      { key: 'user_firstname', label: 'First Name', sortable: true },
      { key: 'user_lastname', label: 'Last Name', sortable: true },
      {
        key: 'user_email', label: 'Email', sortable: true, type: 'email',
      },
      {
        key: 'user_last_login_time', label: 'Last login', sortable: true, hideOnForm: true,
      },
      {
        key: 'usertype_id',
        label: 'User Type',
        hideOnIndex: true,
        type: 'list',
        list: 'usertype',
        listLabel: 'usertype_name',
      },
      {
        key: 'contactperson_id',
        hideOnIndex: true,
        type: 'list',
        list: 'contactperson',
        listLabel: 'contactperson_lastname',
        relationEntity: 'contactperson_user_rel',
      },
    ],
    formComponent: () => import('@/views/app/FormComponent/UserForm'),
    relations: [
      {
        title: 'Roles',
        primaryKey: 'role_id',
        composite: ['role_id', 'user_role_valid_from'],
        entity: 'user_role_grp',
        entityForm: 'user_role_rel',
        fields: [
          {
            key: 'role_id',
            label: 'Role ID',
            sortable: true,
            type: 'list',
            list: 'role',
            listLabel: 'role_name',
            disableOnUpdate: true,
          },
          {
            key: 'role_name', label: 'Role name', sortable: true, hideOnForm: true,
          },
          {
            key: 'role_permission', label: 'Permission', sortable: true, hideOnForm: true,
          },
          {
            key: 'user_role_valid_from', type: 'date', sortable: true, disableOnUpdate: true, composite: true,
          },
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
            disableOnUpdate: true,
          },
          { key: 'customergroup_name', sortable: true, hideOnForm: true },
          {
            key: 'user_customergroup_valid_from',
            sortable: true,
            type: 'date',
            composite: true,
            disableOnUpdate: true,
          },
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
          {
            key: 'company_id',
            label: 'ID',
            sortable: true,
            type: 'list',
            list: 'company',
            listLabel: 'company_name',
            disableOnUpdate: true,
          },
          { key: 'company_name', sortable: true, hideOnForm: true },
          {
            key: 'user_company_valid_from', sortable: true, type: 'date', composite: true, disableOnUpdate: true,
          },
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
          {
            key: 'pos_id',
            label: 'ID',
            sortable: true,
            type: 'list',
            list: 'pos',
            listLabel: 'pos_name',
            disableOnUpdate: true,
          },
          { key: 'pos_name', sortable: true, hideOnForm: true },
          {
            key: 'user_pos_valid_from', type: 'date', sortable: true, composite: true, disableOnUpdate: true,
          },
          {
            key: 'user_pos_valid_to', type: 'date', sortable: true, rules: { date_after: ['@user_pos_valid_from'] },
          },
        ],
      },
      {
        title: 'Teams',
        primaryKey: 'team_id',
        entity: 'user_team_grp',
        entityForm: 'user_team_rel',
        fields: [
          {
            key: 'team_id',
            label: 'ID',
            sortable: true,
            type: 'list',
            list: 'team',
            listLabel: 'team_name',
            disableOnUpdate: true,
          },
          { key: 'team_name', sortable: true, hideOnForm: true },
          {
            key: 'user_team_valid_from', sortable: true, type: 'date', composite: true, disableOnUpdate: true,
          },
          {
            key: 'user_team_valid_to', sortable: true, type: 'date', rules: { date_after: ['@user_team_valid_from'] },
          },
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
            listLabel: 'partnercompany_name',
            disableOnUpdate: true,
          },
          { key: 'partnercompany_name', sortable: true, hideOnForm: true },
          {
            key: 'user_partnercompany_valid_from',
            sortable: true,
            type: 'date',
            composite: true,
            disableOnUpdate: true,
          },
          {
            key: 'user_partnercompany_valid_to',
            sortable: true,
            type: 'date',
            rules: { date_after: ['@user_partnercompany_valid_from'] },
          },
        ],
      },
    ],
    default: {
      user_locked: 0,
      user_wrong_password_counter: 0,
      user_password_reset_required: 0,
      user_password: 'Fsa!0dsadad',
      user_mobile: '+491511234456',
    },
  },
  role: {
    fields: [
      { key: 'role_id', label: 'Role ID', auto: true },
      { key: 'role_name', label: 'Role name' },
      { key: 'role_permission', label: 'Permission' },
    ],
    relations: [
      {
        title: 'Access',
        primaryKey: 'access_id',
        entity: 'role_access_grp',
        entityForm: 'role_access_rel',
        fields: [
          {
            key: 'access_id', label: 'ID', sortable: true, type: 'list', list: 'access', listLabel: 'access_name',
          },
          { key: 'access_name', sortable: true, hideOnForm: true },
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
            hideOnIndex: true,
            disableOnUpdate: true,
          },
          { key: 'user_firstname', sortable: true, hideOnForm: true },
          {
            key: 'user_role_valid_from', type: 'date', disableOnUpdate: true, composite: true,
          },
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
          {
            key: 'tablegroup_id', sortable: true, type: 'list', list: 'tablegroup', listLabel: 'tablegroup_name',
          },
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
          {
            key: 'table_name', sortable: true, type: 'list', list: 'tablename', listLabel: 'table_name',
          },
        ],
      },
    ],
  },
  team: {
    fields: [
      { key: 'team_id', auto: true },
      { key: 'team_name', sortable: true },
      { key: 'team_description', type: 'textarea' },
    ],
  },
  usertype: {
    fields: [
      { key: 'usertype_id', label: 'Id', auto: true },
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
        entity: 'tablegroup_tablename_grp',
        entityForm: 'tablegroup_tablename_rel',
        fields: [
          {
            key: 'table_name', sortable: true, type: 'list', list: 'tablename', listLabel: 'table_name',
          },
        ],
      },
    ],
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
      { key: 'customergroup_name' },
      { key: 'customergroup_description', hideOnIndex: true, type: 'textarea' },
      { key: 'pos_count', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Companies',
        primaryKey: 'company_id',
        entity: 'customergroup_company_grp',
        entityForm: 'customergroup_company_rel',
        fields: [
          {
            key: 'company_id', sortable: true, type: 'list', list: 'company', listLabel: 'company_name',
          },
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
            listLabel: 'contactperson_name',
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
            hideOnIndex: true,
          },
          { key: 'group_ticket_name', sortable: true, hideOnForm: true },
          { key: 'group_ticket_description', sortable: true, hideOnForm: true },
          { key: 'group_ticket_Deadline', sortable: true, hideOnForm: true },
          {
            key: 'contradictionpackage_id', label: 'ContradictionPackage count', sortable: true, hideOnForm: true,
          },
          {
            key: 'contradictionpackage_sum', label: 'ContradictionPackage Amount', sortable: true, hideOnForm: true,
          },
          {
            key: 'ticket_id', label: 'Tickets count', sortable: true, hideOnForm: true,
          },
        ],
      },
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'user_customergroup_grp',
        entityForm: 'user_customergroup_rel',
        fields: [
          {
            key: 'user_id', sortable: true, type: 'list', list: 'user', listLabel: 'user_lastname', hideOnIndex: true,
          },
          { key: 'user_lastname', sortable: true, hideOnForm: true },
          { key: 'user_firstname', sortable: true, hideOnForm: true },
          { key: 'usertype_name', sortable: true, hideOnForm: true },
          { key: 'team_name', sortable: true, hideOnForm: true },
        ],
      },
    ],
  },
  company: {
    entity: 'frontend_2_1_1',
    primaryKey: 'company_id',
    fields: [
      { key: 'company_id', auto: true },
      { key: 'company_name', sortable: true },
      { key: 'customergroup_name', sortable: true, hideOnForm: true },
      { key: 'city_name', sortable: true, hideOnForm: true },
      { key: 'contactdetails_phone', sortable: true, hideOnForm: true },
      { key: 'contactdetails_email', sortable: true, hideOnForm: true },
      {
        key: 'No of contactpersons', sortable: true, hideOnForm: true,
      },
    ],
    formComponent: () => import('@/views/app/FormComponent/CompanyForm'),
    relations: [],
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
      {
        key: 'user_id', type: 'list', list: 'user', listLabel: 'user_email',
      },
    ],
  },
  payment: {
    fields: [
      { key: 'payment_id', auto: true },
      {
        key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name',
      },
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
      {
        key: 'partnergroup_id', type: 'list', list: 'partnergroup', listLabel: 'partnergroup_name', hideOnIndex: true,
      },
      { key: 'partnercompany_id', auto: true },
      { key: 'partnercompany_name' },
      { key: 'partnercompany_shortname' },
      { key: 'partnergroup_name', hideOnForm: true },
      { key: 'city_name', hideOnForm: true },
      { key: 'contactdetails_email', hideOnForm: true },
      { key: 'contactperson_count', hideOnForm: true },
      { key: 'location_count', hideOnForm: true },
      {
        key: 'partnertype_id', hideOnIndex: true, type: 'list', list: 'partnertype', listLabel: 'partnertype_name',
      },
      {
        key: 'address_id', hideOnIndex: true, type: 'list', list: 'address', listLabel: 'address_street', withNew: true,
      },
      {
        key: 'contactdetails_id',
        hideOnIndex: true,
        type: 'list',
        list: 'contactdetails',
        listLabel: 'contactdetails_email',
        withNew: true,
      },
      {
        key: 'companydetails_id',
        hideOnIndex: true,
        type: 'list',
        list: 'companydetails',
        listLabel: 'companydetails_commercialregisterno',
        withNew: true,
      },
      { key: 'partnergroup_description', hideOnIndex: true, type: 'textarea' },
      { key: 'partnercompanies_count', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Tickets',
        primaryKey: 'ticket_id',
        entity: 'ticket_partnercompany_grp',
        entityForm: 'ticket_partnercompany_rel',
        fields: [
          { key: 'ticket_id', auto: true },
          { key: 'ticket_name', hideOnForm: true },
          { key: 'board_name', hideOnForm: true },
          { key: 'ticket_deadline', hideOnForm: true },
          { key: 'ticket_planned_treatment_week', hideOnForm: true },
          { key: 'ticket_progress', hideOnForm: true },
        ],
      },
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'user_partnercompany_grp',
        entityForm: 'user_partnercompany_rel',
        fields: [
          { key: 'user_id', auto: true },
          { key: 'user_lastname', hideOnForm: true },
          { key: 'user_firstname', hideOnForm: true },
          { key: 'user_email', hideOnForm: true },
          { key: 'user_last_login_time', hideOnForm: true },
          { key: 'user_locked', hideOnForm: true },
        ],
      },

    ],
  },
  partnergroup: {
    primaryKey: 'partnergroup_id',
    fields: [
      { key: 'partnergroup_id', auto: true },
      { key: 'partnergroup_name' },
      { key: 'partnertype_name', hideOnForm: true },
      {
        key: 'partnertype_id', hideOnIndex: true, type: 'list', list: 'partnertype', listLabel: 'partnertype_name',
      },
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
      {
        key: 'city_id', type: 'list', list: 'city', listLabel: 'city_name', hideOnIndex: true,
      },
      { key: 'city_name', hideOnForm: true },
      { key: 'city_zip', hideOnForm: true },
      { key: 'address_street' },
      { key: 'address_house_number' },
      { key: 'address_extra' },
      {
        key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name',
      },
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
          {
            key: 'company_id', sortable: true, type: 'list', list: 'company', listLabel: 'company_name',
          },
          { key: 'company_name', sortable: true, hideOnForm: true },
        ],
      },
    ],
  },
  contactdetails: {
    primaryKey: 'contactdetails_id',
    fields: [
      {
        key: 'contactdetails_id', sortable: true, auto: true, hiddenOnForm: true,
      },
      { key: 'contactdetails_email', sortable: true },
      { key: 'contactdetails_phone', sortable: true },
      { key: 'contactdetails_mobile', sortable: true },
      { key: 'contactdetails_fax', sortable: true },
    ],
  },
  companydetails: {
    primaryKey: 'companydetails_id',
    fields: [
      {
        key: 'companydetails_id', sortable: true, auto: true, hiddenOnForm: true,
      },
      { key: 'companydetails_salestaxno', sortable: true },
      { key: 'companydetails_commercialregisterno', sortable: true },
      { key: 'companydetails_website', sortable: true },
    ],
  },
  contacttitle: {
    primaryKey: 'contacttitle_id',
    fields: [
      { key: 'contacttitle_id', sortable: true, auto: true },
      { key: 'contacttitle_name', sortable: true },
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
      {
        key: 'country_id', hideOnIndex: true, type: 'list', list: 'country', listLabel: 'country_name',
      },
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
        hideOnIndex: true,
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
  // region Work Package 3
  pos: {
    primaryKey: 'pos_id',
    fields: [
      { key: 'pos_id', auto: true },
      {
        key: 'customergroup_id',
        type: 'list',
        list: 'customergroup',
        listLabel: 'customergroup_name',
        hideOnIndex: true,
      },
      {
        key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name', hideOnIndex: true,
      },
      { key: 'pos_name' },
      { key: 'pos_branchnumber', type: 'number' },
      { key: 'pos_name_external' },
      { key: 'location_count', hideOnForm: true },
      { key: 'area_count', hideOnForm: true },
      { key: 'pos_first_year', type: 'number' },
    ],
    relations: [
      {
        title: 'Areas',
        primaryKey: 'area_id',
        entity: 'area_pos_grp',
        entityForm: 'area_pos_rel',
        fields: [
          {
            key: 'area_id',
            sortable: true,
            type: 'list',
            list: 'area',
            listLabel: 'area_name',
            disableOnUpdate: true,
          },
          { key: 'area_name', hideOnForm: true },
          { key: 'area_name_external', hideOnForm: true },
          { key: 'location_id', hideOnForm: true },
          {
            key: 'location_name',
            hideOnForm: true,
          },
          {
            key: 'areatype_name',
            hideOnForm: true,
          },
          {
            key: 'area_last_change_time', hideOnForm: true,
          }, {
            key: 'area_space_value', hideOnForm: true,
          },
        ],
      },
      {
        title: 'Contract',
        primaryKey: 'contract_id',
        entity: 'location_contract_grp',
        entityForm: 'contract_area_unit_usagetype_rel',
        fields: [
          {
            key: 'contract_id', sortable: true,
          },
          {
            key: 'contract_id',
            sortable: true,
            type: 'list',
            list: 'contract',
            listLabel: 'contract_name',
            disableOnUpdate: true,
          },
          {
            key: 'contracttype_id',
            sortable: true,
            type: 'list',
            list: 'contracttype',
            listLabel: 'contractype_name',
            hideOnForm: true,
          },
          { key: 'area_name_external', sortable: true, hideOnForm: true },
          { key: 'area_id', sortable: true, hideOnForm: true },
          {
            key: 'area_id', sortable: true, type: 'list', list: 'area', listLabel: 'area_name', hideOnForm: true,
          },
          {
            key: 'contract_area_unit_usagetype_detail_description', hideOnForm: true,
          },
          {
            key: 'contract_area_unit_usagetype_mainusage', hideOnForm: true,
          },
          {
            key: 'contract_area_unit_usagetype_valid_from_date', sortable: true, hideOnForm: true,
          },
          {
            key: 'contract_area_unit_usagetype_valid_to_date', sortable: true, hideOnForm: true,
          },
          {
            key: 'contract_first_possible_end_date', sortable: true, hideOnForm: true,
          },
          {
            key: 'contract_area_unit_usagetype_rentalspace_value', hideOnForm: true,
          },
          {
            key: 'contract_area_unit_usagetype_allocationspace_value', hideOnForm: true,
          },
          {
            key: 'document_id', hideOnForm: true, sortable: true,
          },
        ],
      },
      {
        title: 'Tag',
        primaryKey: 'tag_id',
        entity: 'pos_tag_grp',
        entityForm: 'pos_tag_rel',
        fields: [
          {
            key: 'tag_id',
            label: 'Tag ID',
            sortable: true,
            type: 'list',
            list: 'tag',
            listLabel: 'tag_name',
            disableOnUpdate: true,
          },
          { key: 'tag_name', sortable: true, hideOnForm: true },
          { key: 'tag_description', hideOnForm: true },
        ],
      },
      {
        title: 'Group Tickets',
        primaryKey: 'groupticket_id',
        entity: 'pos_groupticket_grp',
        entityForm: 'pos_groupticket_rel',
        fields: [
          {
            key: 'groupticket_id',
            type: 'list',
            list: 'groupticket',
            listLabel: 'groupticket_name',
            disableOnUpdate: true,
          },
          { key: 'groupticket_name', hideOnForm: true },
          { key: 'column_name', hideOnForm: true },
          { key: 'board_id', hideOnForm: true },
          { key: 'board_name', hideOnForm: true },
          { key: 'groupticket_deadline', hideOnForm: true },
          { key: 'groupticket_deadline_yellow', hideOnForm: true },
          { key: 'groupticket_deadline_red', hideOnForm: true },
          { key: 'groupticket_move_time', hideOnForm: true },
          { key: 'groupticket_deadline_offset', hideOnForm: true },
        ],
      },
      {
        title: 'Contradiction Packages',
        entity: 'pos_contradictionpackage_grp',
        entityForm: 'pos_contracdictionpackage_rel',
        fields: [
          {
            key: 'contradictionpackage_id',
            type: 'list',
            list: 'contradictionpackage',
            listLabel: 'contradictionpackage_name',
            disableOnUpdate: true,
          },
          { key: 'contradictionpackage_name', hideOnForm: true },
          { key: 'contradictionpackage_description', hideOnForm: true },
          { key: 'contradictionpackage_sum', hideOnForm: true },
          { key: 'contradictionpackage_last_change_time', hideOnForm: true },
        ],
      },
      {
        title: 'Invoices',
        fields: [
          { key: 'invoice_id', auto: true },
          { key: 'invoice_date', hideOnForm: true },
          { key: 'invoice_contract_year', hideOnForm: true },
          { key: 'invoice_company_name', hideOnForm: true },
          { key: 'invoice_allocationarea', hideOnForm: true },
          { key: 'invoice_payment_date', hideOnForm: true },
          { key: 'customergroup_name', hideOnForm: true },
          { key: 'partnercompany_name', hideOnForm: true },
        ],
      },
      {
        title: 'Appointment Track',
        fields: [
          { key: 'trackrecord_id', auto: true },
          { key: 'trackrecord_timestamp', hideOnForm: true },
          { key: 'trackrecord_type', hideOnForm: true },
          { key: 'trackrecord_category', hideOnForm: true },
          { key: 'trackrecord_visibilitytype', hideOnForm: true },
          { key: 'trackrecord_usecase', hideOnForm: true },
          { key: 'trackrecord_status', hideOnForm: true },
          { key: 'trackrecord_comment', hideOnForm: true },
          { key: 'trackrecord_element', hideOnForm: true },
        ],
      },
    ],
  },
  area: {
    primaryKey: 'area_id',
    fields: [
      { key: 'area_name' },
      { key: 'area_id', auto: true },

      {
        key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name', sortable: true,
      },
      {
        key: 'city_id', type: 'list', list: 'city', listLabel: 'city_name', sortable: true, hideOnForm: true,
      },
      {
        key: 'area_name_external', hideOnIndex: true,
      },
      {
        key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name', sortable: true, hideOnForm: true,
      },
      {
        key: 'areatype_id', type: 'list', list: 'areatype', listLabel: 'areatype_name', hideOnIndex: true,
      },
      {
        key: 'areatype_id', sortable: true, hideOnForm: true,
      },
      {
        key: 'area_space_value', sortable: true,
      },
      {
        key: 'pos_name', hideOnForm: true,
      },
      {
        key: 'usagetype_id',
        type: 'list',
        list: 'usagetype',
        listLabel: 'usagetype_name',
        sortable: true,
        hideOnIndex: true,
      },
    ],
    relations: [
      {
        title: 'Contracts',
        entity: 'area_contract_grp',
        fields: [
          { key: 'contract_id' },
          { key: 'contract_area_unit_usagetype_rentalspace_value' },
          { key: 'contract_area_unit_usagetype_allocationspace_value' },
          { key: 'unit_name' },
          { key: 'contract_area_unit_usagetype_mainusage' },
          { key: 'contract_begin_date' },
          { key: 'contract_end_date' },
        ],
      },
      {
        title: 'Point of Sales',
        entity: 'pos_area_grp',
        fields: [
          { key: 'pos_id' },
          { key: 'pos_name' },
          { key: 'company_name' },
          { key: 'tag_name' },
        ],
      },
      {
        title: 'Service Objects',
        entity: 'area_serviceobject_grp',
        fields: [
          { key: 'serviceobject_id' },
          { key: 'serviceobject_name' },
          { key: 'serviceobject_description' },
          { key: 'serviceobjecttype_name' },
        ],
      },
    ],
  },
  location: {
    primaryKey: 'location_id',
    fields: [
      { key: 'location_id', auto: true },
      { key: 'location_name' },
      { key: 'location_objectdescription', hideOnIndex: true },
      { key: 'location_total_area', hideOnIndex: true },
      { key: 'location_start_date', hideOnIndex: true },
      { key: 'partnercompany_name', hideOnForm: true },
      {
        key: 'partnercompany_id',
        type: 'list',
        list: 'partnercompany',
        listLabel: 'partnercompany_name',
        hideOnIndex: true,
      },
      { key: 'partnertype_name', hideOnForm: true },
      { key: 'locationtype_name', hideOnForm: true },
      { key: 'city_name', hideOnForm: true },
      { key: 'country_name', hideOnForm: true },
      { key: 'area_count', hideOnForm: true },
      {
        key: 'locationtype_id',
        type: 'list',
        list: 'locationtype',
        listLabel: 'locationtype_name',
        sortable: true,
        hideOnIndex: true,
      },
      {
        key: 'address_id', type: 'list', list: 'address', listLabel: 'address_street', hideOnIndex: true, withNew: true,
      },
    ],
    relations: [
      {
        title: 'Areas',
        entity: 'location_area_grp',
        entityForm: 'location_area_rel',
        fields: [
          { key: 'area_name', hideOnForm: true },
          { key: 'area_id' },
          { key: 'area_space_value', hideOnForm: true },
          { key: 'pos_name', hideOnForm: true },
          { key: 'contract_name', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_rentalspace_value', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_allocationspace_value', hideOnForm: true },
          { key: 'unit_name', hideOnForm: true },
          { key: 'usagetype_name', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_valid_from_date', type: 'date' },
          { key: 'contract_area_unit_usagetype_valid_to_date', type: 'date' },
        ],
      },
      {
        title: 'Service Objects',
        entity: 'location_serviceobject_grp',
        fields: [
          { key: 'serviceobject_id' },
          { key: 'serviceobject_name' },
          { key: 'serviceobjecttype_name' },
          { key: 'area_name' },
        ],
      },
      {
        title: 'Partner Companies',
        entity: 'location_partnercompany_grp',
        fields: [
          { key: 'partnercompany_id' },
          { key: 'partnercompany_name' },
          { key: 'partnergroup_name' },
          { key: 'partnertype_name' },
          { key: 'city_name' },
          { key: 'contactdetails_email' },
          { key: 'contactdetails_phone' },
        ],
      },
    ],
  },
  contract: {
    fields: [
      { key: 'contract_id', auto: true },
      { key: 'contract_type_name', hideOnForm: true },
      { key: 'contract_name' },
      { key: 'contract_begin_date' },
      { key: 'contract_end_date' },
      {
        key: 'currency_id', type: 'list', list: 'currency', listLabel: 'currency_name', hideOnIndex: true,
      },
      {
        key: 'contracttype_id', type: 'list', list: 'contracttype', listLabel: 'contracttype_name', hideOnIndex: true,
      },
      {
        key: 'documentcontracttype_id',
        type: 'list',
        list: 'documentcontracttype',
        listLabel: 'documentcontracttype_name',
        hideOnIndex: true,
      },
      { key: 'documentcontracttype_name', hideOnForm: true },
      { key: 'contract_creation_date', hideOnForm: true },
      { key: 'currency_name', hideOnForm: true },
      { key: 'contract_last_change_time', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Documents',
        primaryKey: 'document_id',
        entity: 'contract_document_grp',
        entityForm: 'contract_document_rel',
        fields: [
          { key: 'document_id' },
          { key: 'document_name' },
          { key: 'documenttype_name' },
          { key: 'document_date_received' },
        ],
      },

    ],
  },

  tag: {
    fields: [
      { key: 'tag_id', auto: true },
      { key: 'tag_name' },
      { key: 'tag_description', type: 'textarea' },
      { key: 'pos_count', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Point of Sales',
        entity: 'pos_tag_grp',
        entityForm: 'pos_tag_rel',
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
  },
  unit: {
    fields: [
      { key: 'unit_id', auto: true },
      { key: 'unit_name' },
      { key: 'unit_short' },
      { key: 'unit_symbol' },
    ],
  },
  choice: {
    fields: [
      { key: 'choice_id', auto: true },
      { key: 'choice_name' },
      { key: 'choice_description', type: 'textarea' },
    ],
  },

  areatype: {
    fields: [
      { key: 'areatype_id', auto: true },
      { key: 'areatype_name' },
      { key: 'areatype_description', type: 'textarea' },
    ],
  },
  contracttype: {
    fields: [
      { key: 'contracttype_id', auto: true },
      { key: 'contracttype_name' },
      { key: 'contracttype_description', type: 'textarea' },
    ],
  },
  criteriatype: {
    fields: [
      { key: 'criteriatype_id', auto: true },
      { key: 'criteriatype_name' },
      { key: 'criteriatype_description', type: 'textarea' },
    ],
  },
  locationtype: {
    fields: [
      { key: 'locationtype_id', auto: true },
      { key: 'locationtype_name' },
      { key: 'locationtype_description', type: 'textarea' },
    ],
  },
  maturitytype: {
    fields: [
      { key: 'maturitytype_id', auto: true },
      { key: 'maturitytype_name' },
      { key: 'maturitytype_description', type: 'textarea' },
    ],
  },
  usagetype: {
    fields: [
      { key: 'usagetype_id', auto: true },
      { key: 'usagetype_name' },
      { key: 'usagetype_description', type: 'textarea' },
    ],
  },
  // endregion
  // region Work Package 4
  invoice: {
    fields: [
      { key: 'invoice_id', auto: true },
      { key: 'invoice_date', type: 'date' },
      { key: 'invoice_contract_year', disabled: true, type: 'number' },
      { key: 'invoice_company_name' },
      { key: 'invoice_allocationarea', type: 'number' },
      { key: 'invoice_payment_date', type: 'date' },
      { key: 'customergroup_name', hideOnForm: true },
      { key: 'partnercompany_name', hideOnForm: true },
      {
        key: 'partnertype_name', type: 'list', list: 'partnertype', listLabel: 'partnertype_name', hideOnIndex: true,
      },
      { key: 'invoice_description', type: 'textarea', hideOnIndex: true },
      { key: 'invoice_contract_billing_period_from_date', type: 'date', hideOnIndex: true },
      {
        key: 'invoice_contract_billing_period_to_date',
        type: 'date',
        rules: { date_after: ['@invoice_contract_billing_period_from_date'] },
        hideOnIndex: true,
      },

    ],
  },
  inspectionresult: {
    fields: [
      { key: 'inspectionresult_id', auto: true },
      { key: 'inspectionresult_value' },
      { key: 'inspectionresult_realised' },
      { key: 'inspectionresult_unique_or_perennial' },
      { key: 'inspectionresult_legally_clear' },
      { key: 'inspectionresult_legally_clear' },
      { key: 'claimtype_name' },
      { key: 'saving_name' },
      { key: 'rating_name' },
      { key: 'resultcategorization_name' },
      { key: 'invoicepositon_count', hideOnForm: true },
    ],
  },
  costtype: {
    fields: [
      { key: 'costtype_id', auto: true },
      { key: 'costtype_name' },
      { key: 'costtype_maingroup' },
      { key: 'costtype_description', type: 'textarea' },
      { key: 'external_costtype_count', hideOnForm: true },
    ],
    relations: [
      {
        title: 'External Cost Types',
        primaryKey: 'externalcosttype_id',
        entity: 'externalcosttype',
      },
      {
        title: 'Contracts',
        primaryKey: 'contract_id',
        entity: 'contract_costtype_rel',
        fields: [
          {
            key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name',
          },
          { key: 'contract_name' },
          { key: 'contract_last_change_date' },
          { key: 'contract_costtype_comment', type: 'textarea' },
        ],
      },
    ],
  },
  claimtype: {
    fields: [
      { key: 'claimtype_id', auto: true },
      { key: 'claimtype_name' },
      { key: 'claimtype_description', type: 'textarea' },
      { key: 'inspectionresult_count', hideOnForm: true },
      { key: 'inspectionresult_sum', hideOnForm: true },
    ],
  },
  invoicecriteria: {
    fields: [
      { key: 'invoicecriteria_id', auto: true },
      { key: 'invoicecriteria_name' },
      { key: 'invoicecriteria_description', type: 'textarea' },
      { key: 'invoice_count', hideOnForm: true },
    ],
  },
  invoicevaluetype: {
    fields: [
      { key: 'invoicevaluetype_id', auto: true },
      { key: 'invoicevaluetype_name' },
      { key: 'invoicevaluetype_description', type: 'textarea' },
      {
        key: 'unit_id',
        type: 'list',
        list: 'unit',
        listLabel: 'unit_name',
        label: 'Unit',
        with: 'invoicevaluetype_unit_preferred_unit',
      },
      { key: 'invoicevaluetype_unit_preferred_unit', type: 'boolean' },
      { key: 'invoice_count', hideOnForm: true },
    ],
  },
  rating: {
    fields: [
      { key: 'rating_id', auto: true },
      { key: 'rating_name' },
      { key: 'rating_description', type: 'textarea' },
      { key: 'contradictpoint_inspectionresult_rating_value_sum', hideOnForm: true },
    ],
  },
  resultcategorization: {
    fields: [
      { key: 'resultcategorization_id', auto: true },
      { key: 'resultcategorization_name' },
      { key: 'resultcategorization_description', type: 'textarea' },
    ],
  },
  savingtype: {
    fields: [
      { key: 'savingtype_id', auto: true },
      { key: 'savingtype_name' },
      { key: 'savingtype_description', type: 'textarea' },
      { key: 'contradictpoint_inspectionresult_savingtype_value_sum', hideOnForm: true },
    ],
  },
  // endregion
}

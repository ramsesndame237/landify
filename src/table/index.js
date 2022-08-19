export default {
  // region Work Package 1
  user: {
    entity: 'frontend_1_1_2_1',
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
      { key: 'usertype_name', hideOnForm: true },
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
        entity: 'user_role_grp',
        entityForm: 'user_role_rel',
        entityView: 'role',
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
        entityView: 'customergroup',
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
        entityView: 'company',
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
        entityView: 'pos',
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
        entityView: 'team',
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
        entityView: 'partnercompany',
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
        entityView: 'access',
        update: false,
        view: false,
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
        entityView: 'user',
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
        entity: 'role_tablegroup_crud_grp',
        entityForm: 'role_tablegroup_crud_rel',
        entityView: 'tablegroup',
        update: false,
        fields: [
          {
            key: 'tablegroup_id', type: 'list', list: 'tablegroup', listLabel: 'tablegroup_name',
          },
          {
            key: 'crud', type: 'list', list: 'crud', listLabel: 'crud', composite: true,
          },
          { key: 'tablegroup_name', hideOnForm: true },
          { key: 'tablegroup_description', hideOnForm: true },
        ],
      },
      {
        title: 'Tables',
        primaryKey: 'table_name',
        composite: ['table_name', 'crud'],
        entity: 'role_tablename_crud_grp',
        entityForm: 'role_tablename_crud_rel',
        entityView: 'tablename',
        update: false,
        fields: [
          {
            key: 'table_name', sortable: true, type: 'list', list: 'tablename', listLabel: 'table_name',
          },
          {
            key: 'crud', type: 'list', list: 'crud', listLabel: 'crud', composite: true,
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
        update: false,
        entityView: 'company',
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
        entityView: 'contactperson',
        update: false,
        fields: [
          {
            key: 'contactperson_id',
            sortable: true,
            type: 'list',
            list: 'contactperson',
            listLabel: 'contactperson_firstname',
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
          { key: 'city_name', sortable: true, hideOnForm: true },
        ],
      },
      {
        title: 'Group Ticket/Packages',
        primaryKey: 'groupticket_id',
        entity: ' groupticket_customergroup_partnergroup_rel',
        entityForm: 'groupticket_customergroup_rel',
        fields: [
          {
            key: 'groupticket_id',
            sortable: true,
            type: 'list',
            list: 'group_ticket',
            listLabel: 'group_ticket_name',
            hideOnIndex: true,
          },
          { key: 'groupticket_name', sortable: true, hideOnForm: true },
          { key: 'groupticket_description', sortable: true, hideOnForm: true },
          { key: 'groupticket_Deadline', sortable: true, hideOnForm: true },
          {
            key: 'contradictionpackage_count', label: 'ContradictionPackage count', sortable: true, hideOnForm: true,
          },
          {
            key: 'contradictionpackage_sum', label: 'ContradictionPackage Amount', sortable: true, hideOnForm: true,
          },
          {
            key: 'ticket_count', label: 'Tickets count', sortable: true, hideOnForm: true,
          },
        ],
      },
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'user_customergroup_grp',
        entityForm: 'user_customergroup_rel',
        entityView: 'user',
        update: false,
        fields: [
          {
            key: 'user_id', sortable: true, type: 'list', list: 'user', listLabel: 'user_lastname', hideOnIndex: false,
          },
          { key: 'user_lastname', sortable: true, hideOnForm: true },
          { key: 'user_firstname', sortable: true, hideOnForm: true },
          { key: 'usertype_name', sortable: true, hideOnForm: true },
          { key: 'team_name', sortable: true, hideOnForm: true },
        ],
      },
    ],
  },
  bankdata: {
    fields: [
      { key: 'bankdata_id', auto: true },
      { key: 'bankdata_iban' },
      { key: 'bankdata_bic' },
      { key: 'bankdata_bank_name' },
    ],
  },
  company: {
    entity: 'frontend_2_1_1',
    primaryKey: 'company_id',
    fields: [
      { key: 'company_id', auto: true },
      { key: 'company_name', sortable: true },
      {
        key: 'customergroup_id',
        hideOnIndex: true,
        type: 'list',
        list: 'customergroup',
        listLabel: 'customergroup_name',
      },
      { key: 'customergroup_name', sortable: true, hideOnForm: true },
      {
        key: 'address_id',
        type: 'list',
        list: 'address',
        listLabel: 'address_street',
        withNew: true,
        alwaysNew: true,
        hideOnIndex: true,
      },
      {
        key: 'contactdetails_id',
        type: 'list',
        list: 'contactdetails',
        listLabel: 'contactdetails_email',
        withNew: true,
        alwaysNew: true,
        hideOnIndex: true,
      },
      {
        key: 'companydetails_id',
        type: 'list',
        list: 'companydetails',
        listLabel: 'companydetails_salestaxno',
        withNew: true,
        alwaysNew: true,
        hideOnIndex: true,
      },
      {
        key: 'bankdata_id',
        type: 'list',
        list: 'bankdata',
        listLabel: 'bankdata_iban',
        withNew: true,
        alwaysNew: true,
        hideOnIndex: true,
      },
      { key: 'city_name', sortable: true, hideOnForm: true },
      { key: 'contactdetails_phone', sortable: true, hideOnForm: true },
      { key: 'contactdetails_email', sortable: true, hideOnForm: true },
      {
        key: 'No of contactpersons', sortable: true, hideOnForm: true,
      },
    ],
    // formComponent: () => import('@/views/app/FormComponent/CompanyForm'),
    relations: [
      {
        title: 'Tickets',
        primaryKey: 'ticket_id',
        entity: 'frontend_2_1_3_1_read_ticket',
        fields: [
          {
            key: 'ticket_id', type: 'list', list: 'ticket', listLabel: 'ticket_name',
          },
          { key: 'ticket_name', hideOnForm: true },
          { key: 'board_name', hideOnForm: true },
          { key: 'ticket_deadline', hideOnForm: true },
          { key: 'ticket_planned_treatment_week', hideOnForm: true },
          { key: 'ticket_progress', hideOnForm: true },
        ],
      },
      {
        title: 'Contradictions',
        primaryKey: 'contradiction_id',
        entity: 'frontend_2_1_3_2',
        fields: [
          {
            key: 'contradiction_id', type: 'list', list: 'contradiction', listLabel: 'contradiction_name',
          },
          { key: 'contradiction_name', hideOnForm: true },
          { key: 'contradiction_last_change_time', type: 'date', hideOnForm: true },
          { key: 'contradiction_letter_send_time', type: 'date', hideOnForm: true },
          { key: 'contradiction_ready_to_comm', hideOnForm: true },
          { key: 'contradiction_payment_received', hideOnForm: true },
          { key: 'contradictiontask_count', type: 'number', hideOnForm: true },
          { key: 'contradictionpoint_count', type: 'number', hideOnForm: true },
        ],
      },
      {
        title: 'Reviews Invoices',
        primaryKey: 'invoice_id',
        entity: 'frontend_2_1_3_3',
        create: false,
        delete: false,
        entityView: 'invoice',
        update: false,
        fields: [
          {
            key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_name',
          },
          { key: 'invoice_date', type: 'date', hideOnForm: true },
          { key: 'invoice_contract_year', type: 'number', hideOnForm: true },
          { key: 'invoice_allocation_area', hideOnForm: true },
          { key: 'invoice_payment_date', type: 'date', hideOnForm: true },
          { key: 'customergroup_name', hideOnForm: true },
          {
            key: 'customergroup_id',
            type: 'list',
            list: 'customergroup',
            listLabel: 'customergroup_name',
            hideOnIndex: true,
          },
        ],
      },
      {
        title: 'Sales Order SFM',
        primaryKey: 'product_id',
        entity: 'frontend_2_1_3_4',
        fields: [
          {
            key: 'product_id', type: 'list', list: 'product', listLabel: 'product_name',
          },
          { key: 'product_short' },
          { key: 'product_name' },
          { key: 'salesorder_valid_from_date', type: 'date' },
          { key: 'salesorder_valid_to_date', type: 'date' },
          { key: 'product_active_from_date', type: 'date' },
          { key: 'product_active_to_date', type: 'date' },
          { key: 'salesorder_confirmation_date', type: 'date' },
        ],
      },
      {
        title: 'Contact Persons',
        primaryKey: 'contactperson_id',
        entity: 'frontend_2_1_3_5',
        entityForm: 'contactperson_company_rel',
        fields: [
          {
            key: 'contactperson_id', type: 'list', list: 'contactperson', listLabel: 'contactperson_lastname',
          },
          { key: 'contactperson_lastname', hideOnForm: true },
          { key: 'contactperson_firstname', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
          { key: 'contactdetails_email', hideOnForm: true },
          { key: 'contactdetails_phone', hideOnForm: true },
          { key: 'contactdetails_mobile', hideOnForm: true },
          { key: 'contactperson_department', hideOnForm: true },
        ],
      },
      {
        title: 'Appointment Track',
      },
      {
        title: 'Bankdata',
        entity: 'frontend_2_1_3_7',
        entityForm: 'company_bankdata_rel',
        fields: [
          {
            key: 'bankdata_id', type: 'list', list: 'bankdata', listLabel: 'bankdata_account_number',
          },
          { key: 'bankdata_bank_name', hideOnForm: true },
          { key: 'bankdata_iban', hideOnForm: true },
          { key: 'bankdata_bic', hideOnForm: true },
          { key: 'bankdata_vat', hideOnForm: true },
          { key: 'bankdata_is_active', type: 'boolean', hideOnForm: true },
          { key: 'bankdata_bank_name', hideOnForm: true },
        ],
      },
      {
        title: 'Point of Sales',
        entity: 'frontend_2_1_3_8',
        primaryKey: 'pos_id',
        entityForm: 'company_pos_rel',
        fields: [
          {
            key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
          },
          { key: 'pos_name', hideOnForm: true },
          { key: 'pos_branchnumber', hideOnForm: true },
          { key: 'pos_name_external', hideOnForm: true },
          { key: 'location_count', hideOnForm: true },
          { key: 'area_count', hideOnForm: true },
          { key: 'pos_first_year', hideOnForm: true },
        ],
      },
      {
        title: 'Payments',
        primaryKey: 'payment_id',
        entity: 'frontend_2_1_3_9',
        entityForm: 'company_payment_rel',
        fields: [
          {
            key: 'payment_id', type: 'list', list: 'payment', listLabel: 'payment_info',
          },
          { key: 'payment_info', hideOnForm: true },
          { key: 'payment_debitor', hideOnForm: true },
          { key: 'payment_value', hideOnForm: true },
          { key: 'payment_objectreference', hideOnForm: true },
          { key: 'payment_date', hideOnForm: true, type: 'date' },
          { key: 'payment_type', hideOnForm: true },
        ],
      },
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'frontend_2_1_3_10',
        entityForm: 'user_company_rel',
        fields: [
          {
            key: 'user_id', type: 'list', list: 'user', listLabel: 'user_firstname',
          },
          { key: 'user_lastname', hideOnForm: true },
          { key: 'user_firstname', hideOnForm: true },
          { key: 'usertype_name', hideOnForm: true },
          { key: 'team_name', hideOnForm: true },
          { key: 'user_last_login_time', hideOnForm: true },
        ],
        default: {
          user_company_valid_from: '2022-07-01',
          user_company_valid_to: '2022-07-25',
        },
      },
    ],
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
        key: 'address_id',
        hideOnIndex: true,
        type: 'list',
        list: 'address',
        listLabel: 'address_street',
        withNew: true,
        alwaysNew: true,
      },
      {
        key: 'contactdetails_id',
        hideOnIndex: true,
        type: 'list',
        list: 'contactdetails',
        listLabel: 'contactdetails_email',
        withNew: true,
        alwaysNew: true,
      },
      {
        key: 'companydetails_id',
        hideOnIndex: true,
        type: 'list',
        list: 'companydetails',
        listLabel: 'companydetails_commercialregisterno',
        withNew: true,
        alwaysNew: true,
      },
      { key: 'partnercompanies_count', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Tickets',
        primaryKey: 'ticket_id',
        entity: 'frontend_2_5_3_1_tickets',
        entityForm: '',
        fields: [
          { key: 'ticket_id', type: 'list', list: 'ticket', listLabel: 'ticket_name' },
          { key: 'ticket_name', hideOnForm: true },
          { key: 'column_id', hideOnForm: true },
          { key: 'board_name', hideOnForm: true },
          { key: 'ticket_deadline', hideOnForm: true },
          { key: 'ticket_planned_treatment_week', hideOnForm: true },
          { key: 'ticket_progress', hideOnForm: true },
        ],
      },
      {
        title: 'Contradictions',
        primaryKey: 'contradiction_id',
        entity: 'frontend_2_5_3_2',
        entityForm: '',
        fields: [
          { key: 'contradiction_id', type: 'list', list: 'contradiction', listLabel: 'contradiction_name' },
          { key: 'contradiction_name', hideOnForm: true },
          { key: 'contradiction_last_change_time', hideOnForm: true },
          { key: 'contradiction_letter_send_time', hideOnForm: true },
          { key: 'contradiction_ready_to_comm', hideOnForm: true },
          { key: 'contradiction_payment_received', hideOnForm: true },
          { key: 'contradictiontask_count', hideOnForm: true },
          { key: 'contradictionpoint_count', hideOnForm: true },
        ],
      },
      {
        title: 'Reviews Invoices',
        primaryKey: 'invoice_id',
        entity: 'frontend_2_5_3_3',
        entityForm: '',
        fields: [
          { key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_description' },
          { key: 'invoice_date', type: 'date', hideOnForm: true },
          { key: 'invoice_contract_year', type: 'number', hideOnForm: true },
          { key: 'Invoice_company_name', hideOnForm: true },
          { key: 'invoice_payment_date', hideOnForm: true },
          { key: 'customergroup_name', hideOnForm: true },
          { key: 'partnercompany_name', hideOnForm: true },
        ],
      },
      {
        title: 'Contact Persons',
        primaryKey: 'location_id',
        entity: 'frontend_2_5_3_5',
        entityForm: '',
        fields: [
          { key: 'contactperson_id', type: 'list', list: 'contactperson', listLabel: 'contactperson_lastname' },
          { key: 'contactperson_lastname', hideOnForm: true },
          { key: 'contactperson_firstname', hideOnForm: true },
          { key: 'contactperson_city_name', hideOnForm: true },
          { key: 'contactdetails_email', hideOnForm: true },
          { key: 'contactdetails_phone', hideOnForm: true },
          { key: 'contactdetails_Mobile', hideOnForm: true },
          { key: 'contactperson_department', hideOnForm: true },
        ],
      },
      {
        title: 'Locations',
        primaryKey: 'location_id',
        entity: 'frontend_2_5_3_5',
        entityForm: '',
        fields: [
          { key: 'location_id', type: 'list', list: 'location', listLabel: 'location_lastname' },
          { key: 'location_name', hideOnForm: true },
          { key: 'partnercompany_name', hideOnForm: true },
          { key: 'locationtype_name', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
          { key: 'country_name', hideOnForm: true },
          { key: 'area_count', hideOnForm: true },
        ],
      },
      {
        title: 'Users',
        primaryKey: 'user_id',
        entity: 'frontend_2_5_3_8',
        entityForm: 'user_partnercompany_rel',
        fields: [
          { key: 'user_id', type: 'list', list: 'user', listLabel: 'user_lastname' },
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
        key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name', hideOnForm: true,
      },
      { key: 'address_last_change_time', hideOnForm: true },
      { key: 'entries_count', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Companies',
        primaryKey: 'company_id',
        entity: 'company_address_grp',
        entityForm: 'company_address_rel',
        entityView: 'company',
        update: false,
        fields: [
          {
            key: 'company_id', sortable: true, type: 'list', list: 'company', listLabel: 'company_name',
          },
          { key: 'company_name', sortable: true, hideOnForm: true },
        ],
      },
    ],
    formComponent: () => import('@/views/app/FormComponent/AddressForm.vue'),
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
    entity: 'frontend_3_1_1',
    primaryKey: 'pos_id',
    fields: [
      { key: 'pos_id', auto: true },
      {
        key: 'company_id',
        type: 'list',
        list: 'company',
        listLabel: 'company_name',
        hideOnIndex: true,
        relationEntity: 'company_pos_rel',
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
        entity: 'frontend_3_1_3_1',
        entityForm: 'area_pos_rel',
        update: false,
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
        entity: 'frontend_3_1_3_2',
        entityForm: 'contract_area_unit_usagetype_rel',
        entityView: 'contract',
        fields: [
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
          {
            key: 'area_id', sortable: true, type: 'list', list: 'area', listLabel: 'area_name',
          },
          {
            key: 'unit_id', sortable: true, type: 'list', list: 'unit', listLabel: 'unit_name', hideOnIndex: true,
          },
          {
            key: 'usagetype_id',
            sortable: true,
            type: 'list',
            list: 'usagetype',
            listLabel: 'usagetype_name',
            hideOnIndex: true,
          },
          {
            key: 'contract_area_unit_usagetype_detail_description',
          },
          {
            key: 'contract_area_unit_usagetype_mainusage',
          },
          {
            key: 'contract_area_unit_usagetype_valid_from_date', type: 'date', disableOnUpdate: true,
          },
          {
            key: 'contract_area_unit_usagetype_valid_to_date', type: 'date',
          },
          {
            key: 'contract_first_possible_end_date', sortable: true, hideOnForm: true,
          },
          {
            key: 'contract_area_unit_usagetype_rentalspace_value', type: 'number',
          },
          {
            key: 'contract_area_unit_usagetype_allocationspace_value', type: 'number',
          },
          {
            key: 'document_id', hideOnForm: true, sortable: true,
          },
        ],
      },
      {
        title: 'Tag',
        primaryKey: 'tag_id',
        entity: 'frontend_3_1_3_3',
        entityForm: 'pos_tag_rel',
        entityView: 'tag',
        update: false,
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
        title: 'Tickets',
        primaryKey: 'ticket_id',
        entity: 'frontend_3_1_3_4',
        entityForm: 'pos_ticket_rel',
        fields: [
          {
            key: 'ticket_id',
            type: 'list',
            list: 'ticket',
            listLabel: 'ticket_name',
            disableOnUpdate: true,
          },
          { key: 'ticket_name', hideOnForm: true },
          { key: 'column_name', hideOnForm: true },
          { key: 'board_id', hideOnForm: true },
          { key: 'board_name', hideOnForm: true },
          { key: 'ticket_deadline', hideOnForm: true },
          { key: 'ticket_deadline_yellow', hideOnForm: true },
          { key: 'ticket_deadline_red', hideOnForm: true },
          { key: 'ticket_move_time', hideOnForm: true },
          { key: 'ticket_deadline_offset', hideOnForm: true },
        ],
      },
      {
        title: 'Contradiction Packages',
        entity: 'frontend_3_1_3_5',
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
        entityView: 'invoice',
        update: false,
        entity: 'frontend_3_1_3_6',
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
    ],
    default: {
      pos_internal_id: '56',
    },
  },
  area: {
    entity: 'frontend_3_2_1',
    primaryKey: 'area_id',
    fields: [
      { key: 'area_id', auto: true },
      { key: 'area_name' },
      { key: 'location_name', hideOnForm: true, hideOnIndex: true },
      {
        key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name', hideOnIndex: true,
      },
      { key: 'city_name', hideOnForm: true },
      {
        key: 'area_name_external', hideOnIndex: true,
      },
      {
        key: 'country_name', hideOnForm: true,
      },
      {
        key: 'areatype_id', type: 'list', list: 'areatype', listLabel: 'areatype_name', hideOnIndex: true,
      },
      {
        key: 'areatype_name', hideOnForm: true, hideOnIndex: true,
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
        primaryKey: 'contract_id',
        entity: 'frontend_3_2_3_1',
        entityForm: 'contract_area_unit_usagetype_rel',
        entityView: 'contract',
        fields: [
          {
            key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name', disableOnUpdate: true,
          },
          { key: 'contract_area_unit_usagetype_detail_description', type: 'textarea', hideOnIndex: true },
          {
            key: 'usagetype_id', type: 'list', list: 'usagetype', listLabel: 'usagetype_name', disableOnUpdate: true,
          },
          { key: 'contract_area_unit_usagetype_rentalspace_value', type: 'number' },
          { key: 'contract_area_unit_usagetype_allocationspace_value', type: 'number' },
          { key: 'unit_name', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_mainusage' },
          { key: 'contract_begin_date', hideOnForm: true },
          { key: 'contract_end_date', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_valid_from_date', type: 'date', hideOnIndex: true },
          { key: 'contract_area_unit_usagetype_valid_to_date', type: 'date', hideOnIndex: true },
          {
            key: 'unit_id', type: 'list', list: 'unit', listLabel: 'unit_name', hideOnIndex: true,
          },
        ],
      },
      {
        title: 'Point of Sales',
        entity: 'frontend_3_2_3_2',
        entityForm: 'area_pos_rel',
        entityView: 'pos',
        update: false,
        create: false,
        primaryKey: 'pos_id',
        fields: [
          {
            key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
          },
          { key: 'pos_name', hideOnForm: true },
          { key: 'company_name', hideOnForm: true },
          { key: 'tag_name', hideOnForm: true },
        ],
      },
      {
        title: 'Service Objects',
        entity: 'frontend_3_2_3_3',
        entityView: 'serviceobject',
        entityForm: 'area_serviceobject_rel',
        update: false,
        primaryKey: 'serviceobject_id',
        fields: [
          {
            key: 'serviceobject_id', type: 'list', list: 'serviceobject', listLabel: 'serviceobject_name',
          },
          { key: 'serviceobject_name', hideOnForm: true },
          { key: 'serviceobject_description', hideOnForm: true },
          { key: 'serviceobjecttype_name', hideOnForm: true },
        ],
      },
    ],
  },
  location: {
    entity: 'frontend_3_3_1',
    primaryKey: 'location_id',
    fields: [
      { key: 'location_id', auto: true },
      { key: 'location_name' },
      { key: 'location_objectdescription', type: 'textarea', hideOnIndex: true },
      { key: 'location_total_area', type: 'number', hideOnIndex: true },
      { key: 'location_start_date', type: 'date', hideOnIndex: true },
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
        key: 'address_id',
        type: 'list',
        list: 'address',
        listLabel: 'address_street',
        hideOnIndex: true,
        withNew: true,
        alwaysNew: true,
      },
    ],
    relations: [
      {
        title: 'Areas',
        entity: 'frontend_3_3_3_1',
        entityForm: 'area_location_rel',
        primaryKey: 'area_id',
        fields: [
          { key: 'area_name', hideOnForm: true },
          {
            key: 'area_id', type: 'list', list: 'area', listLabel: 'area_name',
          },
          { key: 'area_space_value', hideOnForm: true },
          { key: 'pos_name', hideOnForm: true },
          { key: 'contract_name', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_rentalspace_value', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_allocationspace_value', hideOnForm: true },
          { key: 'unit_name', hideOnForm: true },
          { key: 'usagetype_name', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_valid_from_date', type: 'date', hideOnForm: true },
          { key: 'contract_area_unit_usagetype_valid_to_date', type: 'date', hideOnForm: true },
        ],
      },
      {
        title: 'Service Objects',
        entity: 'frontend_3_3_3_2',
        entityForm: 'location_serviceobject_rel',
        entityView: 'serviceobject',
        primaryKey: 'serviceobject_id',
        update: false,
        fields: [
          {
            key: 'serviceobject_id', type: 'list', list: 'serviceobject', listLabel: 'serviceobject_name',
          },
          { key: 'serviceobject_name', hideOnForm: true },
          { key: 'serviceobjecttype_name', hideOnForm: true },
          { key: 'area_name', hideOnForm: true },
        ],
      },
      {
        title: 'Partner Companies',
        entity: 'frontend_3_3_3_3',
        entityForm: 'location_partnercompany_rel',
        entityView: 'partnercompany',
        update: false,
        fields: [
          {
            key: 'partnercompany_id', type: 'list', list: 'partnercompany', listLabel: 'partnercompany_name',
          },
          { key: 'partnercompany_name', hideOnForm: true },
          { key: 'partnergroup_name', hideOnForm: true },
          { key: 'partnertype_name', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
          { key: 'contactdetails_email', hideOnForm: true },
          { key: 'contactdetails_phone', hideOnForm: true },
        ],
      },
    ],
  },
  contract: {
    fields: [
      { key: 'contract_id', auto: true },
      { key: 'contract_type_name', hideOnForm: true },
      { key: 'contract_name' },
      { key: 'contract_begin_date', type: 'date' },
      { key: 'contract_end_date', type: 'date' },
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
        view: false,
        fields: [
          { key: 'document_id' },
          { key: 'document_name' },
          { key: 'documenttype_name' },
          { key: 'document_date_received' },
        ],
      },
      {
        title: 'Recurring payment',
        primaryKey: 'recurringpayment_id',
        entity: 'contract_recurringpayment_grp',
        entityForm: 'contract_recurringpayment_rel',
        entityView: 'recurringpayment',
        fields: [
          { key: 'recurringpayment_id', type: 'list', list: 'recurringpayment', listLabel: 'recurringpayment_name' },
          {
            key: 'recurringpaymenttype_name',
            hideOnForm: true,
          },
          { key: 'recurringpayment_begin_date', type: 'date', hideOnForm: true },
          {
            key: 'recurringpaymenttype_id',
            hideOnForm: true,
          },
          {
            key: 'maturitytype_id',
            hideOnForm: true,
          },
          {
            key: 'indexclause_id', hideOnForm: true,
          },
        ],
      },
      {
        title: 'Service Objects',
        primaryKey: 'serviceobject_id',
        entity: 'contract_serviceobject_grp',
        entityForm: 'contract_serviceobject_rel',
        entityView: 'serviceobject',
        fields: [
          { key: 'serviceobject_id' },
          { key: 'serviceobject_name' },
          { key: 'serviceobjecttype_name' },
          { key: 'area_name' },
          { key: 'location_name' },
        ],
      },
      {
        title: 'Specials Rights',
        primaryKey: 'specialright_id',
        entity: 'contract_specialright_grp',
        entityForm: 'contract_specialright_rel',
        entityView: 'specialright',
        fields: [
          {
            key: 'specialright_id', type: 'list', list: 'specialright', listLabel: 'specialright_name',
          },
          { key: 'specialright_name', hideOnForm: true },
          { key: 'specialright_date', hideOnForm: true },
          { key: 'contract_specialright_description', type: 'textarea' },
          { key: 'contract_specialright_date', type: 'date' },
          { key: 'contract_specialright_prior_notice_date', type: 'date' },
          { key: 'contract_specialright_termination_date', type: 'date' },
          { key: 'contract_specialright_is_passive', type: 'boolean' },
          { key: 'contract_specialright_is_availed', type: 'boolean' },
        ],
      },
      {
        title: 'Contract criterias',
        primaryKey: 'criteria_id',
        entity: 'contract_criteria_grp',
        entityForm: 'contract_criteria_rel',
        entityView: 'criteria',
        fields: [
          { key: 'criteria_id', type: 'list', list: 'criteria', listLabel: 'criteria_name' },
          { key: 'criteria_name', hideOnForm: true },
          { key: 'contract_criteria_valid_from_date', type: 'date' },
          { key: 'contract_criteria_valid_to_date', type: 'date' },
          { key: 'criteriatype_name', hideOnForm: true },
          { key: 'contract_criteria_comment', type: 'textarea' },
          { key: 'contract_criteria_value' },
        ],
        update: false,
      },
      {
        title: 'Invoices',
        primaryKey: 'incoice_id',
        entity: 'invoice_contract_grp',
        entityForm: 'invoice_contract_rel',
        entityView: 'invoice',
        fields: [
          { key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_description' },
          { key: 'invoice_date', type: 'date', hideOnForm: true },
          { key: 'invoice_payment_date', type: 'date', hideOnForm: true },
          { key: 'invoice_creation_time', hideOnForm: true },
          { key: 'invoice_date_of_order', hideOnForm: true },
          { key: 'invoice_billing_year', hideOnForm: true },
          { key: 'invoiceposition_count', hideOnForm: true },
          { key: 'invoice_contract_year', type: 'number' },
          { key: 'invoice_contract_billing_period_from_date', type: 'date' },
          { key: 'invoice_contract_billing_period_to_date', type: 'date' },
        ],
      },
    ],
  },
  serviceobject: {
    entity: 'frontend_3_5_1',
    fields: [
      { key: 'serviceobject_id', auto: true },
      { key: 'serviceobject_name' },
      { key: 'serviceobjecttype_name', hideOnForm: true },
      { key: 'serviceobject_description', type: 'textarea', hideOnIndex: true },
      {
        key: 'serviceobjecttype_id',
        type: 'list',
        list: 'serviceobjecttype',
        listLabel: 'serviceobjecttype_name',
        hideOnIndex: true,
      },
      { key: 'location_name', hideOnForm: true },
      {
        key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name', hideOnIndex: true,
      },
      { key: 'area_name', hideOnForm: true },
      {
        key: 'area_id', type: 'list', list: 'area', listLabel: 'area_name', hideOnIndex: true,
      },
      {
        key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name',
      },
      { key: 'contract_last_change_time', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Areas',
        entity: 'frontend_3_5_3_1',
        entityForm: 'area_serviceobject_rel',
        entityView: 'area',
        primaryKey: 'area_id',
        fields: [
          {
            key: 'area_id', type: 'list', list: 'area', listLabel: 'area_name',
          },
          { key: 'area_name', hideOnForm: true },
          { key: 'area_space_value', hideOnForm: true },
          { key: 'pos_id', hideOnForm: true },
          { key: 'company_id', hideOnForm: true },
          { key: 'customergroup_id', hideOnForm: true },
        ],
        update: false,
      },
      {
        title: 'Locations',
        entity: 'location_serviceobject_rel',
        entityForm: 'serviceobject_location_rel',
        entityView: 'location',
        primaryKey: 'location_id',
        create: false,
        fields: [
          {
            key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
          },
          { key: 'location_name', hideOnForm: true },
          { key: 'locaion_total_area', hideOnForm: true },
          { key: 'location_start_date', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
          { key: 'country_name', hideOnForm: true },
          { key: 'partnercompany_name', hideOnForm: true },
        ],
        update: false,
      },
      {
        title: 'Contracts',
        entity: 'serviceobject_contract_grp',
        entityForm: 'serviceobject_contract_rel',
        entityView: 'contract',
        primaryKey: 'contract_id',
        fields: [
          {
            key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name',
          },
          { key: 'contract_name', hideOnForm: true },
          { key: 'contract_begin_date', hideOnForm: true },
          { key: 'contract_end_date', hideOnForm: true },
          { key: 'city_name', hideOnForm: true },
          { key: 'country_name', hideOnForm: true },
          { key: 'partnercompany_name', hideOnForm: true },
        ],
        update: false,
      },
    ],
  },

  specialright: {
    entity: 'frontend_3_8_1',
    fields: [
      { key: 'specialright_id', auto: true },
      { key: 'specialright_name' },
      { key: 'specialright_description', type: 'textarea' },
    ],
    relations: [
      {
        title: 'Contract',
        primaryKey: 'contract_id',
        entity: 'contract_specialright_grp',
        entityForm: 'contract_specialright_rel',
        entityView: 'contract',
        fields: [
          { key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name' },
          { key: 'contract_name', hideOnForm: true },
          { key: 'contract_specialright_description', type: 'textarea' },
          { key: 'contract_specialright_date', type: 'date' },
          { key: 'contract_specialright_is_availed', type: 'boolean' },
          { key: 'contract_specialright_is_passive', type: 'boolean' },
          { key: 'contract_specialright_prior_notice_date', type: 'date' },
          { key: 'contract_specialright_termination_date', type: 'date' },
        ],
      },
    ],
  },

  criteria: {
    entity: 'frontend_3_6_1',
    fields: [
      { key: 'criteria_id', auto: true },
      { key: 'criteria_name' },
      { key: 'criteria_description', type: 'textarea', hideOnIndex: true },
      { key: 'criteriatype_name', hideOnForm: true },
      { key: 'criteria_has_value', type: 'boolean' },
      { key: 'contract_count', type: 'number', hideOnForm: true },
      {
        key: 'criteriatype_id', type: 'list', list: 'criteriatype', hideOnIndex: true, listLabel: 'criteriatype_name',
      },
      {
        key: 'unit_id', type: 'list', list: 'unit', hideOnIndex: true, listLabel: 'unit_name',
      },
      {
        key: 'contracttype_id', type: 'list', list: 'contracttype', hideOnIndex: true, listLabel: 'contracttype_name',
      },
    ],
    relations: [
      {
        title: 'Contract',
        primaryKey: 'contract_id',
        entity: 'frontend_3_6_3',
        entityForm: 'contract_criteria_rel',
        fields: [
          {
            key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name',
          },
          { key: 'contract_name', hideOnForm: true },
          { key: 'contract_criteria_comment', type: 'textarea' },
          { key: 'contract_criteria_value' },
          {
            key: 'unit_id', type: 'list', list: 'unit', listLabel: 'unit_name', hideOnForm: true,
          },
          { key: 'contract_criteria_exists', type: 'boolean' },
          { key: 'contract_criteria_valid_from_date', type: 'date' },
          { key: 'contract_criteria_valid_to_date', type: 'date' },
          {
            key: 'choice_id',
            type: 'list',
            list: 'choice',
            listLabel: 'choice_name',
            hideOnIndex: true,
            hideOnForm: true,
          },
          { key: 'choice_name', hideOnForm: true },
        ],
      },
      {
        title: 'Choice',
        primaryKey: 'choice_id',
        entity: 'frontend_3_6_4',
        entityForm: 'criteria_choice_rel',
        fields: [
          { key: 'choice_id', hideOnForm: true },
          { key: 'choice_name', hideOnForm: true },
          {
            key: 'choice_id', listLabel: 'choice_name', type: 'list', list: 'choice', hideOnIndex: true,
          },
        ],
      },
    ],
  },

  indexclause: {
    entity: 'frontend_3_7_1',
    fields: [
      { key: 'indexclause_id', auto: true },
      { key: 'indexclause_name' },
      { key: 'indexclause_adjustment_rule' },
      { key: 'indexclause_adjustment_description', type: 'textarea' },
      { key: 'indexclause_baseyear', type: 'number' },
      { key: 'indexclause_begin_date', type: 'date' },
      { key: 'indexclause_indextransmission_percent' },
      { key: 'indexclause_minimal_percent_change_agreed' },
      { key: 'indexclause_minimal_point_change_agreed' },
    ],
    relations: [
      {
        title: 'Recurring Payments',
        primaryKey: 'recurringpayment_id',
        entity: 'frontend_3_7_3',
        entityForm: 'recurringpayment_indexclause_rel',
        fields: [
          {
            key: 'recurringpayment_id', type: 'list', list: 'recurringpayment', listLabel: 'recurringpayment_name',
          },
          { key: 'contract_id', hideOnForm: true },
          { key: 'contract_name', hideOnForm: true },
          { key: 'recurringpayment_condition_comment', hideOnForm: true },
          { key: 'indexclause_baseyear', hideOnForm: true },
          { key: 'recurringpaymenttype_name', hideOnForm: true },
          { key: 'maturitytype_name', hideOnForm: true },
          { key: 'recurringpayment_begin_date', hideOnForm: true },
          { key: 'recurringpayment_percentage', hideOnForm: true },
          { key: 'recurringpayment_sum_per_month', hideOnForm: true },
        ],
      },
    ],
  },

  recurringpayment: {
    entity: 'frontend_3_9_1',
    fields: [
      { key: 'recurringpayment_id', auto: true },
      { key: 'recurringpayment_name' },
      { key: 'contract_name', hideOnForm: true },
      {
        key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name', hideOnIndex: true,
      },
      {
        key: 'recurringpaymenttype_id',
        type: 'list',
        list: 'recurringpaymenttype',
        listLabel: 'recurringpaymenttype_name',
        hideOnIndex: true,
      },
      { key: 'recurringpaymenttype_name', hideOnForm: true },
      { key: 'recurringpayment_sum_per_month', hideOnIndex: true },
      { key: 'recurringpayment_condition_percentage', hideOnIndex: true },
      { key: 'recurringpayment_condition_comment', hideOnIndex: true, type: 'textarea' },
      { key: 'recurringpayment_percentage', hideOnIndex: true },
      { key: 'recurringpayment_begin_date', type: 'date', hideOnIndex: true },
      { key: 'recurringpayment_end_date', type: 'date', hideOnIndex: true },
      { key: 'recurringpayment_maturity_date', type: 'date', hideOnIndex: true },
      { key: 'recurringpayment_maturity_daily_range', hideOnIndex: true },
      { key: 'recurringpayment_maturity_monthly_range', hideOnIndex: true },
      { key: 'reccuringpayment_value_deposit', hideOnIndex: true, type: 'number' },
      {
        key: 'maturitytype_id',
        type: 'list',
        list: 'maturitytype',
        listLabel: 'maturitytype_name',
        hideOnIndex: true,
        withNew: true,
      },
      {
        key: 'indexclause_id',
        type: 'list',
        list: 'indexclause',
        listLabel: 'indexclause_name',
        hideOnIndex: true,
        withNew: true,
      },
      { key: 'maturitytype_name', hideOnForm: true },
      { key: 'indexclause_name', hideOnForm: true },
    ],
    relations: [
      {
        title: 'Index Clause',
        entity: 'frontend_3_9_3',
        entityForm: 'recurringpayment_indexclause_rel',
        primaryKey: 'indexclause_id',
        entityView: 'indexclause',
        fields: [
          {
            key: 'indexclause_id', type: 'list', list: 'indexclause', listLabel: 'indexclause_name',
          },
          { key: 'indexclause_name', hideOnForm: true },
          { key: 'indexclause_adjustment_description', hideOnForm: true },
          { key: 'indexclause_adjustment_rule', hideOnForm: true },
          { key: 'indexclause_begin_date', hideOnForm: true },
          { key: 'indexclause_baseyear', hideOnForm: true },
          { key: 'indexclause_indextransmission_percent', hideOnForm: true },
          { key: 'indexclause_minimal_percent_change_agreed', hideOnForm: true },
          { key: 'indexclause_minimal_point_change_agreed', hideOnForm: true },
        ],
      },
    ],
    default: {
      recurringpayment_condition_comment: '',
    },
  },

  tag: {
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
    entity: 'frontend_3_12_1',
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
  serviceobjecttype: {
    fields: [
      { key: 'serviceobjecttype_id', auto: true },
      { key: 'serviceobjecttype_name' },
      { key: 'serviceobjecttype_description', type: 'textarea' },
    ],
  },
  recurringpaymenttype: {
    fields: [
      { key: 'recurringpaymenttype_id', auto: true },
      { key: 'recurringpaymenttype_name' },
      { key: 'recurringpaymenttype_description', type: 'textarea' },
    ],
  },
  // endregion
  // region Work Package 4
  invoice: {
    createModal: false,
    formComponent: () => import('../views/app/FormComponent/InvoiceForm.vue'),
    fields: [
      { key: 'invoice_id', auto: true },
      { key: 'invoice_date', type: 'date' },
      { key: 'invoice_date_of_order', type: 'date', hideOnIndex: true },
      { key: 'invoice_contract_year', disabled: true, type: 'number' },
      { key: 'invoice_company_name' },
      { key: 'invoice_allocationarea', type: 'number' },
      { key: 'invoice_payment_date', type: 'date' },
      { key: 'customergroup_name', hideOnForm: true },
      { key: 'facilitymanager_partnercompany_name', hideOnForm: true },
      { key: 'owner_partnercompany_name', hideOnForm: true },
      {
        key: 'contract_id',
        type: 'list',
        list: 'contract',
        entity: 'invoice_contract_rel',
        with: ['invoice_contract_billing_period_from_date', 'invoice_contract_billing_period_to_date', 'invoice_contract_year'],
      },
      {
        key: 'partnertype_id', type: 'list', list: 'partnertype', listLabel: 'partnertype_name', hideOnIndex: true,
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
    filters: [
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
      {
        key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name',
      },
      {
        key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
      },
      {
        key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
      },
      {
        key: 'area_id', type: 'list', list: 'area', listLabel: 'area_name',
      },
      {
        key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name',
      },
      { key: 'invoice_contract_year', type: 'number' },
      {
        key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_name',
      },
    ],
    relations: [
      {
        title: 'Contract Document',
        entity: 'document_invoice_rel',
        entityForm: 'document',
        primaryKey: 'document_id',
        create: false,
        delete: false,
        fields: [
          {
            key: 'invoice_id',
            type: 'list',
            relationEntity: 'document_invoice_rel',
            hideOnForm: true,
            hideOnIndex: true,
          },
          { key: 'document_name' },
          { key: 'document_content' },
          { key: 'document_entry_time', hideOnForm: true },
        ],
        default: {
          document_mime_type: 'png',
        },
      },
      {
        title: 'Invoice Document',
        entity: 'document_invoice_rel',
        entityForm: 'document',
        primaryKey: 'document_id',
        fields: [
          {
            key: 'invoice_id',
            type: 'list',
            relationEntity: 'document_invoice_rel',
            hideOnForm: true,
            hideOnIndex: true,
          },
          { key: 'document_name' },
          { key: 'document_content' },
          { key: 'document_entry_time', hideOnForm: true },
        ],
        default: {
          document_mime_type: 'png',
        },
      },
      {
        title: 'Invoice Details',
        entity: 'invoice_invoicevaluetype_rel',
        primaryKey: 'invoicevaluetype_id',
        view: false,
        fields: [
          {
            key: 'invoicevaluetype_id',
            type: 'list',
            hideOnIndex: true,
            list: 'invoicevaluetype',
            listLabel: 'invoicevaluetype_name',
          },
          // { key: 'invoice_name' },
          { key: 'invoicevaluetype_name', hideOnForm: true },
          { key: 'invoicevaluetype_description', hideOnForm: true },
          { key: 'invoice_invoicevaluetype_value' },
          { key: 'unit_name', hideOnForm: true },
        ],
      },
      {
        title: 'Invoice Criteria',
        entity: 'invoice_invoicecriteria_rel',
        entityForm: 'invoice_invoicecriteria_rel',
        primaryKey: 'invoicecriteria_id',
        fields: [
          {
            key: 'invoicecriteria_id',
            type: 'list',
            list: 'invoicecriteria',
            listLabel: 'invoicecriteria_name',
            hideOnIndex: true
          },
          { key: 'invoicecriteria_name', hideOnForm: true },
          { key: 'invoicecriteria_description', hideOnForm: true },
          { key: 'invoice_invoicecriteria_is_set', type: 'boolean' },
        ],
      },
      {
        title: 'Invoice Deadlines',
        entity: 'invoice_invoicedeadline_rel',
        entityForm: 'invoice_invoicedeadline_rel',
        primaryKey: 'invoicedeadline_id',
        fields: [
          {
            key: 'invoicedeadline_id',
            type: 'list',
            list: 'invoicedeadline',
            hideOnIndex: true,
            listLabel: 'invoicedeadline_name',
          },
          { key: 'invoicedeadline_name', hideOnForm: true },
          { key: 'invoicedeadline_description', hideOnForm: true },
          { key: 'invoice_invoicedeadline_date', type: 'date' },
        ],
      },
      {
        tool: () => import('@/views/app/InvoicePositionTools.vue'),
        title: 'Invoice Positions',
        entity: 'invoice_invoiceposition_rel',
        entityForm: 'invoiceposition',
        primaryKey: 'invoiceposition_id',
        fields: [
          {
            key: 'invoice_id',
            type: 'list',
            relationEntity: 'invoice_invoiceposition_rel',
            hideOnForm: true,
            hideOnIndex: true
          },
          { key: 'invoiceposition_id', hideOnForm: true },
          { key: 'invoiceposition_name' },
          { key: 'invoiceposition_total_units', type: 'number' },
          { key: 'invoiceposition_units_customer', type: 'number' },
          { key: 'invoiceposition_costtype_invoice' },
          { key: 'costtype_name', hideOnForm: true },
          {
            key: 'costtype_id', type: 'list', list: 'costtype', listLabel: 'costtype_name', hideOnIndex: true,
          },
          {
            key: 'unit_id', type: 'list', list: 'unit', listLabel: 'unit_name', hideOnIndex: true,
          },
          { key: 'invoiceposition_flat_rate', type: 'boolean' },
          { key: 'invoiceposition_amount_total', type: 'number' },
          { key: 'invoiceposition_amount_customer', type: 'number' },
          { key: 'invoiceposition_apportionable', type: 'boolean' },
        ],
      },
      {
        title: 'Service Objects',
        entity: 'invoice_serviceobject_rel',
        primaryKey: 'serviceobject_id',
        view: false,
        fields: [
          {
            key: 'serviceobject_id', type: 'list', list: 'serviceobject', listLabel: 'serviceobject_name',
          },
          { key: 'serviceobject_name', hideOnForm: true },
          { key: 'serviceobjecttype_name', hideOnForm: true },
          { key: 'area_name', hideOnForm: true },
        ],
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
    filters: [
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
      {
        key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name',
      },
      {
        key: 'user_id', type: 'list', list: 'user', listLabel: 'user_email',
      },
      {
        key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
      },
      {
        key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
      },
      {
        key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name',
      },
      { key: 'invoice_contract_year', type: 'number' },
      {
        key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name',
      },
      {
        key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_name',
      },
    ],
  },
  costtype: {
    entity: 'frontend_4_7_1',
    fields: [
      { key: 'costtype_id', auto: true },
      { key: 'costtype_name' },
      { key: 'costtype_maingroup' },
      { key: 'costtype_description', type: 'textarea' },
      { key: 'costtype_amount_externalcosttypes', hideOnForm: true },
    ],
    relations: [
      {
        title: 'External Cost Types',
        primaryKey: 'externalcosttype_id',
        entity: 'frontend_4_7_3_1',
        entityForm: 'costtype_externalcosttype_rel',
        fields: [
          { key: 'externalcosttype_id', type: 'list', list: 'externalcosttype', listLabel: 'externalcosttype_name' },
          { key: 'externalcosttype_name', hideOnForm: true },
        ],
      },
      {
        title: 'Contracts',
        primaryKey: 'contract_id',
        entity: 'frontend_4_7_3_2',
        entityForm: 'contract_costtype_rel',
        fields: [
          {
            key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name',
          },
          { key: 'contract_name', hideOnForm: true },
          { key: 'contract_last_change_time', type: 'date', hideOnForm: true },
          { key: 'contract_costtype_comment', type: 'textarea', hideOnIndex: true },
        ],
      },
    ],
  },
  claimtype: {
    entity: 'frontend_4_8_1',
    fields: [
      { key: 'claimtype_id', auto: true },
      { key: 'claimtype_name' },
      { key: 'claimtype_description', type: 'textarea' },
      { key: 'claimtype_amount_inspectionresults', hideOnForm: true },
      { key: 'claimtype_sum_inspectionresults', hideOnForm: true },
    ],
  },
  invoicecriteria: {
    entity: 'frontend_4_9_1',
    fields: [
      { key: 'invoicecriteria_id', auto: true },
      { key: 'invoicecriteria_name' },
      { key: 'invoicecriteria_description', type: 'textarea' },
      { key: 'invoicecriteria_amount_invoices', hideOnForm: true },
    ],
  },
  invoicevaluetype: {
    entity: 'frontend_4_10_1',
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
      { key: 'invoicevaluetype_amount_invoices', hideOnForm: true },
    ],
  },
  rating: {
    entity: 'frontend_4_11_1',
    fields: [
      { key: 'rating_id', auto: true },
      { key: 'rating_name' },
      { key: 'rating_description', type: 'textarea' },
      { key: 'rating_sum_inspectionresults', hideOnForm: true },
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
    entity: 'frontend_4_13_1',
    fields: [
      { key: 'savingtype_id', auto: true },
      { key: 'savingtype_name' },
      { key: 'savingtype_description', type: 'textarea' },
      { key: 'savingtype_sum_inspectionsresults', hideOnForm: true },
    ],
  },
  // endregion
  // region Workpackage 5
  contradiction: {
    customPage: () => import('@/views/app/Page/Contradiction/Index.vue'),
    createModal: false,
    formComponent: () => import('@/views/app/FormComponent/ContradictionForm.vue'),
    fields: [
      { key: 'contradiction_id', auto: true },
      { key: 'contradiction_name' },
      { key: 'contradiction_last_change_time', hideOnForm: true },
      { key: 'contradictiontask_count', hideOnForm: true },
      { key: 'contradictionpoint_count', hideOnForm: true },
    ],
    filters: [
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
      {
        key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name',
      },
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
      {
        key: 'user_id', type: 'list', list: 'user', listLabel: 'user_firstname',
      },
      {
        key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
      },
      {
        key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
      },
      {
        key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name',
      },
      {
        key: 'savingtype_id', type: 'list', list: 'savingtype', listLabel: 'savingtype_name',
      },
    ],
    default: {
      contradiction_ready_to_comm: 0,
      contradiction_sender_abbreviation: "dfsdf",
    },
  },
  contradictionpackage: {
    customPage: () => import('@/views/app/Page/ContradictionPackage.vue'),
    createModal: false,
    fields: [
      { key: 'contradictionpackage_id', auto: true },
      { key: 'contradictionpackage_name' },
      { key: 'contradictionpackage_sum' },
      { key: 'contradictionpackage_description', hideOnIndex: true },
      { key: 'contradiction_count', hideOnForm: true },
    ],
    filters: [
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
      {
        key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name',
      },
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
      {
        key: 'user_id', type: 'list', list: 'user', listLabel: 'user_firstname',
      },
      {
        key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name',
      },
      {
        key: 'pos_id', type: 'list', list: 'pos', listLabel: 'pos_name',
      },
      {
        key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name',
      },
      {
        key: 'savingtype_id', type: 'list', list: 'savingtype', listLabel: 'savingtype_name',
      },
    ],
  },
  contradictionpoint: {
    fields: [
      { key: 'contradictionpoint_rank' },
      { key: 'contradictionpoint_title' },
      { key: 'contradictionpoint_inspectionresult_rating_value_green' },
      { key: 'contradictionpoint_inspectionresult_rating_value_amber' },
      { key: 'contradictionpoint_inspectionresult_rating_value_red' },
      { key: 'contradictionpoint_inspectionresult_rating_value_grey' },
    ],
  },
  // end region
}

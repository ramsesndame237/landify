import { ACCESS } from '@/config/config-access';

export default {
  entity: 'frontend_2_2_1',
  permissions: ACCESS.tableAccess.customer_group.main,
  fields: [
    { key: 'customergroup_id', auto: true },
    { key: 'customergroup_name' },
    {
      key: 'customergroup_description', hideOnIndex: true, type: 'textarea', required: false,
    },
    { key: 'company_count', hideOnForm: true },
  ],
  relations: [
    {
      title: 'Companies',
      primaryKey: 'company_id',
      entity: 'frontend_2_2_3_1',
      entityForm: 'customergroup_company_rel',
      update: false,
      create: false,
      entityView: 'company',
      permissions: ACCESS.tableAccess.customer_group.relations.companies,
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
      primaryKey: 'contactperson_id',
      entity: 'frontend_2_2_3_2',
      entityForm: 'contactperson_customergroup_rel',
      entityView: 'contactperson',
      permissions: ACCESS.tableAccess.customer_group.relations.contact_person,
      update: false,
      // change from franck
      create: false,
      formComponent: () => import('@/views/app/FormComponent/CustomerGroupContactPerson.vue'),
      fields: [
        {
          key: 'contactperson_id',
          sortable: true,
          type: 'list',
          list: 'contactperson',
          listLabel: 'contactperson_firstname',
          alwaysNew: true,
          onlyForm: true,
        },
        { key: 'company_name', hideOnForm: true },
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
      title: 'Tickets',
      primaryKey: 'ticket_id',
      entity: 'frontend_2_2_3_3',
      create: false,
      edit: false,
      delete: false,
      fields: [
        {
          key: 'ticket_id',
          sortable: true,
          type: 'list',
          list: 'ticket',
          listLabel: 'ticket_name',
          hideOnIndex: true,
        },
        { key: 'ticket_name', sortable: true, hideOnForm: true },
        { key: 'ticket_description', sortable: true, hideOnForm: true },
        { key: 'ticket_Deadline', sortable: true, hideOnForm: true },
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
      entity: 'frontend_2_2_3_4',
      entityForm: 'user_customergroup_rel',
      entityView: 'user',
      fields: [
        {
          key: 'user_id', sortable: true, type: 'list', list: 'user', listLabel: 'user_lastname', hideOnIndex: false,
        },
        { key: 'user_lastname', sortable: true, hideOnForm: true },
        { key: 'user_firstname', sortable: true, hideOnForm: true },
        { key: 'usertype_name', sortable: true, hideOnForm: true },
        { key: 'team_name', sortable: true, hideOnForm: true },
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
  ],
}

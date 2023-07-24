import { getDocumentLink } from '@/libs/utils'

import user from "./tables/user"
import role from "./tables/role"
import customergroup from "./tables/customergroup"
import company from "./tables/company"
import contactperson from "./tables/contactperson"
import partnercompany from "./tables/partnercompany"
import partnergroup from "./tables/partnergroup"
import address from "./tables/address"
import city from "./tables/city"
import pos from "./tables/pos"
import area from "./tables/area"
import indexclause from "./tables/indexclause"
import location from "./tables/location"
import contract from "./tables/contract"
import serviceobject from "./tables/serviceobject"
import criteria from "./tables/criteria"
import recurringpayment from "./tables/recurringpayment"
import invoice from "./tables/invoice"
import invoiceposition from "./tables/invoiceposition"
import ticket from "./tables/ticket"
import contradiction from "./tables/contradiction"
import inspectionresult from "./tables/inspectionresult"
import contradictionpackage from "./tables/contradictionpackage"

export default {
  // region Work Package 1
  user,
  access: {
    fields: [
      { key: 'access_id', auto: true, required: false },
      { key: 'access_name' },
    ],
  },
  role,
  team: {
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
  },
  usertype: {
    fields: [
      { key: 'usertype_id', label: 'Id', auto: true },
      { key: 'usertype_name' },
      {
        key: 'usertype_description',
        type: 'textarea',
      },
      { key: 'usertype_external', type: 'boolean' },
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
  customergroup,
  bankdata: {
    fields: [
      { key: 'bankdata_id', auto: true },
      { key: 'bankdata_iban' },
      { key: 'bankdata_bic', required: false },
      { key: 'bankdata_bank_name' },
      { key: 'bankdata_account_number', required: false },
      { key: 'bankdata_vat', required: false },
      { key: 'bankdata_is_active', type: 'boolean' },
    ],
  },
  company,
  contactperson,
  payment: {
    entity: 'frontend_2_4_1',
    fields: [
      { key: 'payment_id', auto: true },
      {
        key: 'company_id',
        type: 'list',
        list: 'company',
        listLabel: 'company_name',
        relationEntity: 'company_payment_rel',
      },
      { key: 'company_name', hideOnForm: true },
      { key: 'payment_info' },
      { key: 'payment_debitor' },
      { key: 'payment_objectreference' },
      { key: 'payment_value' },
      { key: 'payment_date', type: 'date' },
      { key: 'payment_type' },
    ],
  },
  partnercompany,
  partnergroup,
  address,
  contactdetails: {
    primaryKey: 'contactdetails_id',
    fields: [
      {
        key: 'contactdetails_id', sortable: true, auto: true, hiddenOnForm: true,
      },
      { key: 'contactdetails_email', required: false },
      { key: 'contactdetails_phone', required: false },
      { key: 'contactdetails_mobile', required: false },
      { key: 'contactdetails_fax', required: false },
    ],
  },
  companydetails: {
    primaryKey: 'companydetails_id',
    fields: [
      {
        key: 'companydetails_id', sortable: true, auto: true, hiddenOnForm: true,
      },
      { key: 'companydetails_salestaxno', required: false },
      { key: 'companydetails_commercialregisterno', required: false },
      { key: 'companydetails_website', required: false },
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
  city,
  country: {
    primaryKey: 'country_id',
    entity: 'frontend_2_12_1',
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
    inlineEdit: true,
    primaryKey: 'partnertype_id',
    fields: [
      { key: 'partnertype_id', sortable: true, auto: true },
      { key: 'partnertype_name', sortable: true },
      { key: 'partnertype_description', sortable: true, type: 'textarea' },
    ],
  },
  // endregion
  // region Work Package 3
  pos,
  area,
  location,
  contract,
  serviceobject,

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
        entity: 'frontend_3_8_3',
        entityForm: 'contract_specialright_rel',
        entityView: 'contract',
        fields: [
          {
            key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name',
          },
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

  criteria,

  indexclause,

  recurringpayment,

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
  documentcontracttype: {
    fields: [
      { key: 'documentcontracttype_id', auto: true },
      { key: 'documentcontracttype_name' },
      { key: 'documentcontracttype_description', type: 'textarea' },
    ],
  },
  product: {
    fields: [
      { key: 'product_id', auto: true },
      { key: 'product_name' },
      { key: 'product_short' },
      { key: 'product_description', type: 'textarea' },
    ],
  },
  criteriatype: {
    fields: [
      { key: 'criteriatype_id', auto: true },
      { key: 'criteriatype_name' },
      { key: 'criteriatype_has_value', type: 'boolean', required: false },
      { key: 'criteriatype_description', type: 'textarea' },
    ],
    relations: [
      {
        title: 'Units',
        entityForm: 'criteriatype_unit_rel',
        entity: 'criteriatype_unit_grp',
        entityView: 'unit',
        primaryKey: 'unit_id',
        fields: [
          {
            key: 'unit_id', type: 'list', list: 'unit', listLabel: 'unit_name',
          },
          {
            key: 'unit_name', hideOnForm: true,
          },
          {
            key: 'criteriatype_id', hideOnForm: true,
          },
        ],
      },
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
  invoice,
  invoiceposition,
  inspectionresult,
  costtype: {
    entity: 'frontend_4_7_1',
    fields: [
      { key: 'costtype_id', auto: true },
      { key: 'costtype_name' },
      { key: 'costtype_maingroup', type: 'boolean' },
      { key: 'costtype_description', type: 'textarea' },
      { key: 'costtype_amount_externalcosttypes', hideOnForm: true },
    ],
    relations: [
      {
        title: 'External Cost Types',
        primaryKey: 'externalcosttype_id',
        entity: 'frontend_4_7_3_1',
        entityForm: 'costtype_externalcosttype_rel',
        update: false,
        view: false,
        fields: [
          {
            key: 'externalcosttype_id', type: 'list', list: 'externalcosttype', listLabel: 'externalcosttype_name',
          },
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
            key: 'contract_id', type: 'list', list: 'contract', listLabel: 'contract_name', disableOnUpdate: true,
          },
          { key: 'contract_name', hideOnForm: true },
          { key: 'contract_last_change_time', type: 'date', hideOnForm: true },
          { key: 'contract_costtype_comment', type: 'textarea', hideOnIndex: true },
        ],
      },
    ],
  },
  textmodule: {
    create: false,
    delete: false,
    entity: 'textmodule_country_grp',
    fields: [
      { key: 'textmodule_id', auto: true },
      { key: 'textmodule_name' },
      { key: 'country_name', hideOnForm: true },
      {
        key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name', hideOnIndex: true,
      },
      { key: 'textmodule_description', type: 'textarea' },
      { key: 'textmodule_templatetext', hideOnIndex: true, type: 'html' },
      { key: 'textmodule_text_left', hideOnIndex: true, type: 'html' },
      {
        key: 'textmodule_text_right_0',
        hideOnIndex: true,
        type: 'html',
        visible: entity => entity.textmodule_number_of_text_blocks > 0,
      }, {
        key: 'textmodule_text_right_1',
        hideOnIndex: true,
        type: 'html',
        visible: entity => entity.textmodule_number_of_text_blocks > 1,
      }, {
        key: 'textmodule_text_right_2',
        hideOnIndex: true,
        type: 'html',
        visible: entity => entity.textmodule_number_of_text_blocks > 2,
      }, {
        key: 'textmodule_text_right_3',
        hideOnIndex: true,
        type: 'html',
        visible: entity => entity.textmodule_number_of_text_blocks > 3,
      }, {
        key: 'textmodule_text_right_4',
        hideOnIndex: true,
        type: 'html',
        visible: entity => entity.textmodule_number_of_text_blocks > 4,
      },
    ],
    filters: [
      {
        key: 'country_id', type: 'list', list: 'country', listLabel: 'country_name', required: false,
      },
    ],
    filter_vertical: true,
  },
  texttemplate: {
    create: false,
    delete: false,
    update: false,
    entity: 'texttemplate',
    fields: [
      { key: 'texttemplate_id' },
      'texttemplate_name',
      'texttemplate_code',
      { key: 'texttemplate_content_de', type: 'textarea', hideOnIndex: true },
      { key: 'texttemplate_content_fr', type: 'textarea', hideOnIndex: true },
      { key: 'texttemplate_content_en', type: 'textarea', hideOnIndex: true },
    ],
  },
  texttemplate_variable: {
    create: false,
    delete: false,
    update: false,
    entity: 'texttemplate_variable',
    fields: [
      { key: 'texttemplate_variable_id' },
      { key: 'texttemplate_variable_name' },
      { key: 'texttemplate_variable_example' },
      {
        key: 'texttemplate_id', type: 'list', listLabel: 'texttemplate_name', list: 'texttemplate', hideOnIndex: true,
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
  contradiction,
  contradictionpackage,
  contradictionpoint: {
    fieldComponent: () => import('@/views/app/CreateComponent/ContradictionPoint'),
    fields: [
      { key: 'contradictionpoint_id', auto: true, hideOnForm: true },
      { key: 'contradictionpoint_rank' },
      { key: 'contradictionpoint_title' },
      { key: 'contradictionpoint_maximum_claim_green', type: 'number', required: false },
      { key: 'contradictionpoint_maximum_claim_yellow', type: 'number', required: false },
      { key: 'contradictionpoint_maximum_claim_red', type: 'number', required: false },
      {
        key: 'contradictionpoint_accommodation_standard_green', type: 'number', hideOnIndex: true, required: false,
      },
      {
        key: 'contradictionpoint_accommodation_standard_yellow', type: 'number', hideOnIndex: true, required: false,
      },
      {
        key: 'contradictionpoint_accommodation_standard_red', type: 'number', hideOnIndex: true, required: false,
      },
      {
        key: 'contradictionpoint_additional_accommodation', type: 'number', hideOnIndex: true, required: false,
      },
      {
        key: 'contradictionpoint_owner_offer', type: 'number', hideOnIndex: true, required: false,
      },
      { key: 'contradictionpoint_text', type: 'html', hideOnIndex: true },
      { key: 'contradictionpoint_text_customer', type: 'html', hideOnIndex: true },
      {
        key: 'textmodule_id', type: 'list', list: 'textmodule', listLabel: 'textmodule_name', hideOnIndex: true,
      },
    ],
    default: {
      contradictionpoint_legally_clear: 1,
      contradictionpoint_hidden: 0,
    },
  },
  // endregion
  // region Work Package 6
  priority: {
    defaultSortField: 'priority_order',
    fields: [
      { key: 'priority_id', auto: true },
      { key: 'priority_name' },
      { key: 'priority_order' },
      { key: 'priority_smiley', type: 'smiley' },
      { key: 'priority_color', type: 'color' },
    ],
  },
  ticket,
  board: {
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
  },
  columnx: {
    fields: [
      { key: 'column_id', auto: true },
      { key: 'column_name' },
      { key: 'column_description', type: 'textarea' },
      { key: 'column_is_qualitygate', type: 'boolean' },
      { key: 'column_has_stamp', type: 'boolean' },
      {
        key: 'default_value_id', type: 'list', list: 'defaultvalue', alwaysNew: true, onlyForm: true,
      },
      {
        key: 'team_id', type: 'list', list: 'team', listLabel: 'team_name', required: false,
      },
    ],
  },
  defaultvalue: {
    fields: [
      { key: 'default_value_id', auto: true },
      { key: 'default_deadline_period', type: 'number' },
      { key: 'default_deadline_yellow', type: 'number' },
      { key: 'default_deadline_red', type: 'number' },
      { key: 'default_prediction_value', type: 'number' },
      { key: 'default_prediction_info' },
      { key: 'default_deadline_info' },
    ],
  },
  trackrecord: {
    delete: false,
    update: false,
    create: false,
    fields: [
      { key: 'trackrecord_id', auto: true },
      { key: 'trackrecord_timestamp' },
      { key: 'trackrecord_type' },
      { key: 'trackrecordcategory_name' },
      { key: 'trackrecordtype_name' },
      { key: 'trackrecord_status' },
      { key: 'trackrecord_comment' },
    ],
    filters: [
      {
        key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name',
      },
    ],
  },
  // endregion
  document: {
    entity: 'frontend_document_list',
    fields: [
      { key: 'document_id', hideOnForm: true, auto: true },
      { key: 'document_name', hideOnForm: true },
      { key: 'document_mime_type', hideOnForm: true },
      { key: 'documenttype_name', hideOnForm: true },
      {
        key: 'documenttype_id', type: 'list', list: 'documenttype', listLabel: 'documenttype_name', hideOnIndex: true,
      },
      {
        key: 'files', hideOnIndex: true, type: 'file', rules: { size: 10000 }, hideOnUpdate: true,
      },
      {
        key: 'download',
        sortable: false,
        type: 'download',
        hideOnForm: true,
        label: 'Download',
        btnLabel: 'Download',
        getLink: getDocumentLink,
      },
      // { key: 'document_content_type' },
    ],
  },
  documenttype: {
    entity: 'documenttype',
    fields: [
      { key: 'documenttype_id', auto: true },
      { key: 'documenttype_name' },
      { key: 'documenttype_description', type: 'textarea' },
      { key: 'documenttype_short' },
    ],
    relations: [
      {
        primaryKey: 'documentcontracttype_id',
        entityForm: 'documenttype_documentcontracttype_rel',
        entity: 'documenttype_documentcontracttype_grp',
        entityView: 'documentcontracttype',
        fields: [
          {
            key: 'documentcontracttype_id',
            type: 'list',
            list: 'documentcontracttype',
            listLabel: 'documentcontracttype_name',
          },
          { key: 'documentcontracttype_name', hideOnForm: true },
          { key: 'documentcontracttype_description', type: 'textarea', hideOnForm: true },
        ],
      },
    ],
  },
  '1__translation': {
    inlineEdit: true,
    primaryKey: 'translation_id',
    fields: [
      { key: 'translation_id', disableOnUpdate: true },
      {
        key: 'translation_lang',
        composite: true,
        disableOnUpdate: true,
        type: 'custom-select',
        items: () => {
          return [
            {
              label: "EN",
              value: 'EN'
            },
            {
              label: "DE",
              value: 'DE'
            },
          ]
        }
      },
      { key: 'translation_text' },
    ]
  },
  '1__attribute_nice': {
    inlineEdit: true,
    primaryKey: 'attribute_name',
    fields: [
      { key: 'attribute_name', disableOnUpdate: true },
      {
        key: 'attribute_lang',
        composite: true,
        disableOnUpdate: true,
        type: 'custom-select',
        items: () => {
          return [
            {
              label: "EN",
              value: 'EN'
            },
            {
              label: "DE",
              value: 'DE'
            },
          ]
        }
      },
      { key: 'attribute_nice_name' },
    ],
    default: {
      attribute_nice_name_group: '',
    },
  },
  'function': {
    fields: [
      { key: 'function_id', auto: true },
      'function_name',
      'function_description'
    ]
  }
}

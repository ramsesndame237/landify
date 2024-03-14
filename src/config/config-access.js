import { USER_PERMISSIONS, buildPermissions } from './config-permissions'

const TEAMS_IDS = {
  BuHa: 1,
  FM: 2,
  MVM: 3,
  NKA: 4,
}

const tableAccess = {
  ticket: {
    main: buildPermissions({
      note: [
        USER_PERMISSIONS.lead,
      ],
      list: [
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.area_manager,
        USER_PERMISSIONS.store_manager,
        USER_PERMISSIONS.ext_team_member,
      ],
      read: [
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.ext_team_member.withTeams(TEAMS_IDS.BuHa),
        USER_PERMISSIONS.ext_team_member.withTeams(TEAMS_IDS.FM),
        USER_PERMISSIONS.ext_team_member.withTeams(TEAMS_IDS.MVM),
        USER_PERMISSIONS.ext_team_member.withTeams(TEAMS_IDS.NKA),
      ],
    }),
    update_ticket: buildPermissions({
      list: [
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.area_manager,
        USER_PERMISSIONS.store_manager,
        USER_PERMISSIONS.ext_team_member,
      ],
      read: [
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.area_manager,
        USER_PERMISSIONS.store_manager,
        USER_PERMISSIONS.ext_team_member,
      ],
    }),
  },
  board: {
    main: buildPermissions({
      list: [
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.area_manager,
        USER_PERMISSIONS.store_manager,
        USER_PERMISSIONS.ext_team_member,
      ],
      read: [
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.area_manager,
        USER_PERMISSIONS.store_manager,
        USER_PERMISSIONS.ext_team_member,
      ],
    }),
  },
  pos: {
    main: buildPermissions({
      list: [
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.ext_team_member,
      ],
      read: [
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.ext_team_member,
      ],
    }),
  },
}

export const ACCESS = {
  tableAccess,
  // DASHBOARD
  main: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.store_manager,
      USER_PERMISSIONS.ext_team_member,
      USER_PERMISSIONS.ext_team_member.withTeams(TEAMS_IDS.BuHa),
      USER_PERMISSIONS.ext_team_member.withTeams(TEAMS_IDS.MVM),
      USER_PERMISSIONS.ext_team_member.withTeams(TEAMS_IDS.NKA),
    ],
  }),
  dashbaord_home: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.store_manager,
      USER_PERMISSIONS.ext_team_member,
    ],
  }),

  // TICKET
  ticket_menu: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
    ],
  }),
  ticket_dashboard: [],
  ticket_board: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
    ],
  }),
  ticket_list: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
    ],
  }),
  ticket_list_update: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
    ],
  }),

  // MAILS
  incomming_mails: buildPermissions({}),

  // POS
  pos_menu_header: [
    USER_PERMISSIONS.lead,
  ],
  contract_list: [
    USER_PERMISSIONS.lead,
  ],
  contract_condictions: [
    USER_PERMISSIONS.lead,
  ],
  contract_deadlines: [
    USER_PERMISSIONS.lead,
  ],
  contract_payment_list: [
    USER_PERMISSIONS.lead,
  ],
  new_business: [],

  // MASTER DATA
  master_data_menu_header: [],
  company_menu: [],
  customer_group: [],
  company: [],
  pos: [],
  area: [],

  // PARTNER COMPANY
  partner_company_menu: [],
  partner_group: [],
  partner_company: [],

  // CONTACT PERSON
  contact_person: [],

  // RENTAL AND CONTRACTS
  rentals_and_contracts_menu: [],
  contract: [USER_PERMISSIONS.lead],
  invoice: [],
  location: [],
  payment: [USER_PERMISSIONS.lead],
  service_object: [USER_PERMISSIONS.lead],

}

export const _ = {}

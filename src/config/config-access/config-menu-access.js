export const menuAccess = {
  // DASHBOARD
  main: buildPermissions({
    list: [
      // INTERN
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
      USER_PERMISSIONS.team_member,
      USER_PERMISSIONS.lawyer,

      // EXTERN
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.store_manager,
      USER_PERMISSIONS.area_manager,
      USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.BuHa),
      USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.MVM),
      USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.NKA),
    ],
  }),
  dashbaord_home: buildPermissions({
    list: [
      // INTERN
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
      USER_PERMISSIONS.team_member,
      USER_PERMISSIONS.lawyer,

      // EXTERN
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.store_manager,
      USER_PERMISSIONS.area_manager,
      USER_PERMISSIONS.ext_team_member,
    ],
  }),
  dashbaord_board: buildPermissions({
    list: [
      // INTERN
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
    ],
  }),
  error_dashbaord: buildPermissions({
    list: [
      // INTERN
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
    ],
  }),

  // TICKET
  ticket_menu: buildPermissions({
    list: [
      // INTERN
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
      USER_PERMISSIONS.team_member,
      USER_PERMISSIONS.lawyer,

      // EXTERN
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.area_manager,
    ],
  }),
  ticket_dashboard: [],
  ticket_board: buildPermissions({
    list: [
      // INTERN
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
      USER_PERMISSIONS.team_member,
      USER_PERMISSIONS.lawyer,

      // EXTERN
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.store_manager,
      USER_PERMISSIONS.area_manager,
    ],
  }),
  ticket_list: buildPermissions({
    list: [
      // INTERN
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
      USER_PERMISSIONS.team_member,
      USER_PERMISSIONS.lawyer,

      // EXTERN
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.store_manager,
      USER_PERMISSIONS.area_manager,
    ],
  }),
  ticket_list_update: buildPermissions({
    list: [
      // INTERN
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
      USER_PERMISSIONS.team_member,
      USER_PERMISSIONS.lawyer,

      // EXTERN
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.area_manager,
      USER_PERMISSIONS.store_manager,
    ],
  }),

  // MAILS
  incomming_mails: buildPermissions({
    list: [
      // INTERN
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
      USER_PERMISSIONS.team_member,
    ],
  }),

  // POS
  pos_menu: buildPermissions({
    list: [
      // INTERN
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
      USER_PERMISSIONS.team_member,

      // EXTERN
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
    ],
  }),
  contract_list: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.FM),
      USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.MVM),
    ],
  }),
  condictions_list: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.ext_team_member.withTeams(
        EXTERN_TEAMS_IDS.FM,
      ),
      USER_PERMISSIONS.ext_team_member.withTeams(
        EXTERN_TEAMS_IDS.MVM,
      ),
    ],
  }),
  deadlines_list: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.FM),
      USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.MVM),
    ],
  }),
  payment_list: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.FM),
      USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.MVM),
    ],
  }),
  new_business: buildPermissions({
    list: [
      USER_PERMISSIONS.admin,
    ],
    create: [
      USER_PERMISSIONS.admin,
    ],
    update: [
      USER_PERMISSIONS.admin,
    ],
    remove: [
      USER_PERMISSIONS.admin,
    ],
  }),

  // MASTER DATA
  master_data_menu_header: buildPermissions({
    list: [
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
      USER_PERMISSIONS.team_member,
    ],
  }),
  company_menu: buildPermissions({
    list: [
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
      USER_PERMISSIONS.team_member,
    ],
  }),
  customer_group: buildPermissions({
    list: [
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
      USER_PERMISSIONS.team_member,
    ],
  }),
  company: buildPermissions({
    list: [
      USER_PERMISSIONS.admin,
      USER_PERMISSIONS.team_lead,
      USER_PERMISSIONS.team_member,
    ],
  }),
  pos: [],
  area: [],

  // PARTNER COMPANY
  partner_company_menu: [],
  partner_group: [],
  partner_company: [],

  // CONTACT PERSON
  contact_person: [],

  // RENTAL AND CONTRACTS
  rentals_and_contracts_menu: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.ext_team_member,
    ],
  }),
  invoice: [],
  location: [],
  payment_info: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.ext_team_member.withTeams(
        EXTERN_TEAMS_IDS.BuHa,
        EXTERN_TEAMS_IDS.FM,
        EXTERN_TEAMS_IDS.MVM,
      ),
    ],
  }),
  contract: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.expansion_manager,
      USER_PERMISSIONS.ext_team_member,
    ],
  }),
  service_object: buildPermissions({
    list: [
      USER_PERMISSIONS.lead,
      USER_PERMISSIONS.ext_team_member.withTeams(
        EXTERN_TEAMS_IDS.FM,
      ),
    ],
  }),
}
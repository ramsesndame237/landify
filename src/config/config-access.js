import { USER_PERMISSIONS, buildPermissions } from './config-permissions'

export const EXTERN_TEAMS_IDS = {
  BuHa: 1,
  FM: 2,
  MVM: 3,
  NKA: 4,
}

export const INTERN_TEAMS_IDS = {
  MVM: 1,
  FM: 1,
  NKA: 1,
  FoMa: 1,
  BackOffice: 1,
  BuHa: 1,
}

const tableAccess = {
  ticket: {
    main: buildPermissions({
      note: [
        // INTERN
        USER_PERMISSIONS.admin,
        USER_PERMISSIONS.team_lead,
        USER_PERMISSIONS.team_member,
        USER_PERMISSIONS.lawyer,

        // EXTERN
        USER_PERMISSIONS.lead,
      ],
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
        USER_PERMISSIONS.ext_team_member,
      ],
      seeHeader: [
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
        USER_PERMISSIONS.ext_team_member,
      ],
      read: [
        // INTERN
        USER_PERMISSIONS.admin,
        USER_PERMISSIONS.team_lead,
        USER_PERMISSIONS.team_member,
        USER_PERMISSIONS.lawyer,

        // EXTERN
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.BuHa),
        USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.FM),
        USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.MVM),
        USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.NKA),
      ],
    }),
    update_ticket: buildPermissions({
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
        USER_PERMISSIONS.ext_team_member,
      ],
      read: [
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
        USER_PERMISSIONS.ext_team_member,
      ],
    }),
  },
  board: {
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
        USER_PERMISSIONS.area_manager,
        USER_PERMISSIONS.store_manager,
        USER_PERMISSIONS.ext_team_member,
      ],
      read: [
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
        USER_PERMISSIONS.ext_team_member,
      ],
    }),
  },
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
      USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.FM),
      USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.MVM),
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
  pos: {
    main: buildPermissions({
      create: [
        USER_PERMISSIONS.admin,
        USER_PERMISSIONS.team_lead.withTeams(
          INTERN_TEAMS_IDS.MVM,
        ),
      ],
      update: [
        USER_PERMISSIONS.admin,
        USER_PERMISSIONS.team_lead.withTeams(
          INTERN_TEAMS_IDS.MVM,
        ),
        USER_PERMISSIONS.team_member.withTeams(
          INTERN_TEAMS_IDS.MVM,
        ),
      ],
      remove: [
        USER_PERMISSIONS.admin,
        USER_PERMISSIONS.team_lead.withTeams(
          INTERN_TEAMS_IDS.MVM,
        ),
        USER_PERMISSIONS.team_member.withTeams(
          INTERN_TEAMS_IDS.MVM,
        ),
      ],
      note: [
        USER_PERMISSIONS.admin,
        USER_PERMISSIONS.team_lead,
      ],
      seeHeader: [
        // INTERN
        USER_PERMISSIONS.admin,
        USER_PERMISSIONS.team_lead,
        USER_PERMISSIONS.team_member,
        USER_PERMISSIONS.lawyer,

        // EXTERN
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.ext_team_member,
      ],
      list: [
        // INTERN
        USER_PERMISSIONS.admin,
        USER_PERMISSIONS.team_lead,
        USER_PERMISSIONS.team_member,

        // EXTERN
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.ext_team_member,
      ],
      read: [
        // INTERN
        USER_PERMISSIONS.admin,
        USER_PERMISSIONS.team_lead,
        USER_PERMISSIONS.team_member,
        USER_PERMISSIONS.lawyer,

        // EXTERN
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.ext_team_member,
      ],
    }),
    relations: {
      location: buildPermissions({
        list: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member,
        ],
        read: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_member.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
            INTERN_TEAMS_IDS.NKA,
            INTERN_TEAMS_IDS.FoMa,
            INTERN_TEAMS_IDS.BackOffice,
            INTERN_TEAMS_IDS.BuHa,
          ),
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
            INTERN_TEAMS_IDS.NKA,
            INTERN_TEAMS_IDS.BackOffice,
            INTERN_TEAMS_IDS.BuHa,
          ),
          USER_PERMISSIONS.lawyer,
        ],
        create: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
          ),
        ],
        update: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
          ),
        ],
        remove: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
          ),
        ],
      }),
      area: buildPermissions({
        list: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member,
        ],
        read: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_member.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
            INTERN_TEAMS_IDS.NKA,
            INTERN_TEAMS_IDS.FoMa,
            INTERN_TEAMS_IDS.BackOffice,
            INTERN_TEAMS_IDS.BuHa,
          ),
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
            INTERN_TEAMS_IDS.NKA,
            INTERN_TEAMS_IDS.BackOffice,
            INTERN_TEAMS_IDS.BuHa,
          ),
          USER_PERMISSIONS.lawyer,
        ],
        create: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
          ),
        ],
        update: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
          ),
        ],
        remove: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
          ),
        ],
      }),
      contract: buildPermissions({
        list: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member,
          USER_PERMISSIONS.team_lead,
        ],
        create: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
          USER_PERMISSIONS.team_member.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
        ],
        read: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead,
          USER_PERMISSIONS.team_member,
          USER_PERMISSIONS.lawyer,
        ],
        update: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
          USER_PERMISSIONS.team_member.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
        ],
        remove: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
        ],
      }),
      tag: buildPermissions({
        list: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member,
          USER_PERMISSIONS.team_lead,
        ],
        create: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
          USER_PERMISSIONS.team_member.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
        ],
        read: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead,
          USER_PERMISSIONS.team_member,
          USER_PERMISSIONS.lawyer,
        ],
        update: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
          USER_PERMISSIONS.team_member.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
        ],
        remove: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
        ],
      }),
      ticket: buildPermissions({
        list: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member,
          USER_PERMISSIONS.team_lead,
        ],
        create: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead,
          USER_PERMISSIONS.team_member,
        ],
        read: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member,
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead,
          USER_PERMISSIONS.team_member,
          USER_PERMISSIONS.lawyer,
        ],
        update: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
          USER_PERMISSIONS.team_member.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
        ],
        remove: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
        ],
      }),
      contradiction_package: buildPermissions({
        list: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member,
          USER_PERMISSIONS.team_lead,
        ],
        create: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead,
          USER_PERMISSIONS.team_member,
        ],
        read: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member,
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead,
          USER_PERMISSIONS.team_member,
          USER_PERMISSIONS.lawyer,
        ],
        update: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
          USER_PERMISSIONS.team_member.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
        ],
        remove: [
          USER_PERMISSIONS.admin,
          USER_PERMISSIONS.team_lead.withTeams(
            INTERN_TEAMS_IDS.MVM,
            INTERN_TEAMS_IDS.FM,
          ),
        ],
      }),
      document: buildPermissions({
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
      email: buildPermissions({
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
  },
  contract: {
    main: buildPermissions({
      seeHeader: [
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.ext_team_member,
      ],
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
    relations: {
      area: buildPermissions({
        list: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member,
        ],
      }),
      partner_company: buildPermissions({
        list: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member,
        ],
      }),
      document: buildPermissions({
        list: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member.withTeams(
            EXTERN_TEAMS_IDS.BuHa,
            EXTERN_TEAMS_IDS.FM,
            EXTERN_TEAMS_IDS.MVM,
          ),
        ],
        read: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member.withTeams(
            EXTERN_TEAMS_IDS.BuHa,
            EXTERN_TEAMS_IDS.FM,
            EXTERN_TEAMS_IDS.MVM,
          ),
        ],
      }),
      deadlines: buildPermissions({
        list: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member.withTeams(
            EXTERN_TEAMS_IDS.FM,
            EXTERN_TEAMS_IDS.MVM,
          ),
        ],
        read: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member.withTeams(
            EXTERN_TEAMS_IDS.FM,
            EXTERN_TEAMS_IDS.MVM,
          ),
        ],
      }),
      recurring_payment: buildPermissions({
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
      service_object: buildPermissions({
        list: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member.withTeams(
            EXTERN_TEAMS_IDS.FM,
          ),
        ],
        read: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.ext_team_member.withTeams(
            EXTERN_TEAMS_IDS.FM,
          ),
        ],
      }),
      criteria: buildPermissions({
        list: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.expansion_manager,
          USER_PERMISSIONS.ext_team_member.withTeams(
            EXTERN_TEAMS_IDS.FM,
            EXTERN_TEAMS_IDS.MVM,
          ),
        ],
      }),
    },
  },
  payment_info: {
    main: buildPermissions({
      list: [
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.expansion_manager,
        USER_PERMISSIONS.ext_team_member.withTeams(
          EXTERN_TEAMS_IDS.BuHa,
          EXTERN_TEAMS_IDS.FM,
          EXTERN_TEAMS_IDS.MVM,
        ),
      ],
      read: [
        USER_PERMISSIONS.lead,
      ],
    }),
  },
  service_object: {
    main: buildPermissions({
      list: [
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.ext_team_member.withTeams(
          EXTERN_TEAMS_IDS.FM,
        ),
      ],
      seeHeader: [
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.ext_team_member.withTeams(
          EXTERN_TEAMS_IDS.FM,
        ),
      ],
      read: [
        USER_PERMISSIONS.lead,
        USER_PERMISSIONS.ext_team_member.withTeams(
          EXTERN_TEAMS_IDS.FM,
        ),
      ],
    }),
    relations: {
      area: buildPermissions({
        list: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.ext_team_member.withTeams(
            EXTERN_TEAMS_IDS.FM,
          ),
        ],
      }),
      location: buildPermissions({
        list: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.ext_team_member.withTeams(
            EXTERN_TEAMS_IDS.FM,
          ),
        ],
      }),
      contract: buildPermissions({
        list: [
          USER_PERMISSIONS.lead,
          USER_PERMISSIONS.ext_team_member.withTeams(
            EXTERN_TEAMS_IDS.FM,
          ),
        ],
      }),
    },
  },
}

const menuAccess = {
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
      USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.FM),
      USER_PERMISSIONS.ext_team_member.withTeams(EXTERN_TEAMS_IDS.MVM),
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

export const ACCESS = {
  tableAccess,
  menuAccess,
}

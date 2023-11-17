export default {
  entityEndpoint: 'teams',
  customRequest: {
    endpoint: 'teams',
    relationKey: 'team_ids',
    method: 'delete',
  },
  fields: [
    { key: 'team_id', auto: true },
    { key: 'team_name', sortable: true },
    {
      key: 'team_type',
      type: 'custom-select',
      /**
       * Ce champ permet de signaler si la value de cette clé devrait être traduite
       */
      translateValue: true,
      items: [
        { label: 'Intern', value: 'intern' },
        { label: 'Extern Client', value: 'extern_client' },
        { label: 'Extern Partner', value: 'extern_partner' },
        { label: 'Friendtzieze', value: 'friendtzieze' },
      ],
    },
    {
      key: 'parent_id',
      type: 'list',
      list: 'team',
      entityCustomEndPoint: 'teams',
      listLabel: 'team_name',
      tableKey: 'team_id',
      visible: entity => entity.team_type && !['intern', 'extern_partner'].includes(entity.team_type),
      filter: item => item.team_type === 'intern',
      hideOnIndex: true,
    },
    {
      key: 'team_for_all_customer',
      disableOnUpdate: true,
      type: 'boolean',
      default: 1,
      visible: entity => ['extern_client', 'extern_partner'].includes(entity.team_type),
      hideOnIndex: true,
    },
    {
      key: 'customergroup_id',
      type: 'list',
      list: 'customergroup',
      listLabel: 'customergroup_name',
      required: true,
      multiple: true,
      hideOnIndex: true,
      visible: entity => entity.team_type === 'extern_client' && entity.team_for_all_customer === 0,
    },
    {
      key: 'partnergroup_is_internal',
      visible: () => false,
      hideOnIndex: true,
      type: 'boolean',
      default: 1,
      send: false,
      change: entity => {
        if (entity.team_type === 'intern') return 1
        return 0
      },
    },
    {
      key: 'partnergroup_id',
      type: 'list',
      list: 'partnergroup',
      listLabel: 'partnergroup_name',
      required: true,
      hideOnIndex: true,
      filter_key: 'partnergroup_is_internal',
      multiple: true,
      visible: entity => entity.team_type === 'extern_partner' && entity.team_for_all_customer === 0,
    },
    {
      key: 'company_id',
      type: 'list',
      list: 'company',
      entityCustomEndPoint: '/companies',
      listLabel: 'company_name',
      filter_key: 'customergroup_id',
      required: false,
      multiple: true,
      hideOnIndex: true,
      /**
       * Cette clé renseigne les éléments de pagination personalisés
       */
      customPagination: {
        data: [{ size: 100_000 }],
      },
      visible: entity => entity.team_type === 'extern_client' && entity.team_for_all_customer === 0,
    },
    {
      key: 'partnercompany_id',
      type: 'list',
      list: 'frontend_2_5_1',
      listLabel: 'partnercompany_name',
      filter_key: 'partnergroup_id',
      relationEntity: 'user_partnercompany_rel',
      hideOnIndex: true,
      multiple: true,
      required: false,
      visible: entity => entity.team_type === 'extern_partner' && entity.team_for_all_customer === 0,
    },
    { key: 'team_description', type: 'textarea' },
  ],
  relations: [
    {
      title: 'Users',
      primaryKey: 'user_id',
      entityEndpoint: 'users',
      // entityForm: 'user_team_rel',
      entityCustomEndpoint: 'teams/users',
      customRequest: {
        method: 'DELETE',
        relationKey: 'user_id',
        entityKey: 'team_id',
        endpoint: 'teams/users',
      },
      view: false,
      fields: [
        {
          key: 'user_id',
          type: 'list',
          list: 'user',
          listLabel: 'user_email',
          disableOnUpdate: true,
          multiple: true,
          hideOnIndex: true,
        },
        {
          key: 'user_firstname',
          hideOnForm: true,
          label: 'User',
          type: 'html',
          formatter: (value, key, item) => `<div class="d-flex h5">
        <div></div>
        <div class="ml-1">
          <p class="mb-0">${`${item.user_firstname} ${item.user_lastname}`}</p>
          <p class="mb-0">${item.user_email}</p>
        </div>
      </div>`,
        },
        {
          key: 'company_name',
          type: 'html',
          sortable: true,
          hideOnForm: true,
          formatter: (value, key, item) => {
            if (item.companies.length <= 0) return '-'
            const companiesNames = item.companies.map(c => c.company_name)
            let htmlString = ''
            companiesNames.forEach(company => {
              htmlString += `<li><span class="badge badge-secondary  h5 text-capitalize text-truncate" style="font-size: .85rem; max-width: 12rem">${company}</span></li>`
            })

            return `<ul class="list-unstyled">${htmlString}</ul>`
          },
        },
        {
          key: 'partnercompany_name',
          type: 'html',
          sortable: true,
          hideOnForm: true,
          formatter: (value, key, item) => {
            if (item.partnercompanies.length <= 0) return '-'
            const companiesNames = item.partnercompanies.map(c => c.partnercompany_name)
            let htmlString = ''
            companiesNames.forEach(partnercompany => {
              htmlString += `<li><span class="badge badge-secondary h5 text-capitalize text-truncate" style="font-size: .85rem; max-width: 12rem">${partnercompany}</span></li>`
            })

            return `<ul class="list-unstyled">${htmlString}</ul>`
          },
        },
        {
          key: 'user_team_valid_from', sortable: true, type: 'date', composite: true, disableOnUpdate: true, hideOnForm: true, hideOnIndex: true,
        },
        {
          key: 'user_team_valid_to', required: false, type: 'date', rules: { date_after: ['@user_team_valid_from'] }, hideOnForm: true, hideOnIndex: true,
        },
      ],
      submit: async vm => {
        const data = { ...vm.entity }
        return vm.$http.put('/teams/users', data)
      },
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
  submit: async vm => {
    const data = { ...vm.entity }
    try {
      await vm.$http({
        method: vm.create ? 'post' : 'put',
        url: 'teams',
        data,
      })
    } catch (error) {
      console.log({ error })
    }
  },

  fetch: vm => vm.$http.get(`/teams/${vm.entityId}`)
    .then(response => {
      const { data } = response

      if (data.customergroups) {
        data.customergroup_id = data.customergroups.map(c => c.customergroup_id)
      }

      if (data.partnergroups) {
        data.partnergroup_id = data.partnergroups.map(c => c.partnergroup_id)
      }

      if (data.partnercompanies) {
        data.partnercompany_id = data.partnercompanies.map(c => c.partnercompany_id)
      }

      if (data.companies) {
        data.company_id = data.companies.map(c => c.company_id)
      }
      return response.data
    }),
}

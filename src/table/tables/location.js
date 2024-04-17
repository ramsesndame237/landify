export default {
  // entity: 'frontend_3_3_1',
  primaryKey: 'location_id',
  entityEndpoint: '/locations',
  perPage: 10,
  fieldComponent: () => import('@/views/app/FormComponent/LocationForm.vue'),
  fields: [
    { key: 'location_id', auto: true },
    { key: 'location_name' },
    { key: 'locationtype_name', hideOnForm: true },
    {
      key: 'city_name',
      sortable: true,
      formatter: (value, key, item) => {
        const obj = item.address
        const city_name = `${obj.address_city_name}`
        return city_name
      },
      hideOnForm: true,
    },
    {
      key: 'address_country_name',
      hideOnForm: true,
      formatter: (value, key, item) => {
        const obj = item.address
        const country_name = `${obj.address_country_name}`
        return country_name
      },
    },
    { key: 'area_count', hideOnForm: true },
    {
      key: 'location_objectdescription', type: 'textarea', hideOnIndex: true, required: false,
    },
    {
      key: 'location_total_area', type: 'number', required: false, hideOnIndex: true,
    },
    {
      key: 'location_start_date', type: 'date', hideOnIndex: true, required: false,
    },
    {
      key: 'company_id',
      entityKey: 'owner_id',
      type: 'list',
      list: 'company',
      listLabel: 'company_name',
      tableKey: 'company_id',
      required: false,
      hideOnIndex: true,
    },
    { key: 'locationtype_name', hideOnForm: true },
    {
      key: 'locationtype_id',
      type: 'list',
      list: 'locationtype',
      listLabel: 'locationtype_name',
      sortable: true,
      hideOnIndex: true,
    },
    {
      key: 'country_id', hideOnIndex: true, type: 'list', list: 'country', listLabel: 'country_name',
    },

    { key: 'address_city_name', hideOnIndex: true },
    { key: 'address_street', hideOnIndex: true },
    { key: 'address_house_number', hideOnIndex: true },
    { key: 'address_extra', hideOnIndex: true, rules: { required: false } },
    { key: 'city_zip', hideOnIndex: true, sortable: true },
    {
      key: 'city_state',
      sortable: true,
      required: false,
      hideOnIndex: true,
      change: (entity, vm) => {
        let cityState
        if (entity.address_city_zip_code) {
          const accessToken = localStorage.getItem('accessToken').split(' ')[1]
          const debounced = _.debounce(
            () => vm.$http
              .get(`/users/state/${entity.address_city_zip_code}?Authorization=${accessToken}`)
              .then(async resp => {
                if (resp.data?.state) cityState = resp.data.state
              }),
            1600,
          )

          debounced()
        }
        return cityState
      },
    },
  ],
  async submit(vm, _, create) {
    try {
      const method = create ? 'post' : 'put'
      const payload = vm.$refs.fieldComponent.entity || {}
      await vm.$http[method]('/locations', {
        ...payload,
        location_total_area: payload.location_total_area || undefined,
      })
      vm.$successToast(vm.$t('location~saved~successfully'))
    } catch (e) {
      throw new Error(typeof e?.response?.data?.detail === 'string' ? e.response.data.detail : vm.$t('unexpected~error~ocurred'))
    }
  },
  relations: [
    {
      title: 'Areas',
      entity: 'frontend_3_3_3_1',
      entityForm: 'area_location_rel',
      primaryKey: 'area_id',
      entityView: 'area',
      fields: [
        { key: 'area_name', hideOnForm: true },
        {
          key: 'area_id', type: 'list', list: 'area', listLabel: 'area_name',
        },
        { key: 'area_space_value', hideOnForm: true },
        { key: 'areatype_name', hideOnForm: true },
        { key: 'pos_name', hideOnForm: true },
        { key: 'company_name', hideOnForm: true },
        // { key: 'contract_name', hideOnForm: true },
        // { key: 'contract_area_unit_usagetype_rentalspace_value', hideOnForm: true },
        // { key: 'contract_area_unit_usagetype_allocationspace_value', hideOnForm: true },
        // { key: 'unit_name', hideOnForm: true },
        // { key: 'usagetype_name', hideOnForm: true },
        // { key: 'contract_area_unit_usagetype_valid_from_date', type: 'date', hideOnForm: true },
        // { key: 'contract_area_unit_usagetype_valid_to_date', type: 'date', hideOnForm: true },
      ],
    },
    // {
    //   title: 'Service Objects',
    //   entity: 'frontend_3_3_3_2',
    //   entityView: 'serviceobject',
    //   create: false,
    //   delete: false,
    //   update: false,
    //   primaryKey: 'serviceobject_id',
    //   fields: [
    //     {
    //       key: 'serviceobject_id',
    //       type: 'list',
    //       list: 'serviceobject',
    //       alwaysNew: true,
    //       onlyForm: true,
    //     },
    //     { key: 'serviceobject_id', hideOnForm: true },
    //     { key: 'serviceobject_name', hideOnForm: true },
    //     { key: 'serviceobject_external_name', hideOnForm: true },
    //     { key: 'serviceobjecttype_name', hideOnForm: true },
    //     { key: 'serviceobject_description', type: 'textarea', hideOnForm: true },
    //     { key: 'area_id', hideOnForm: true },
    //     { key: 'area_name' },
    //     { key: 'areatype_name' },
    //   ],
    // },
    {
      title: 'Partner Companies',
      // entity: 'locations',
      entityEndpoint: vm => `/locations/${vm.$route.params.id}/partnercompanies`,
      newEndpointCreate: 'locations/partnercompany',
      entityView: 'partnercompany',
      primaryKey: 'partnercompany_id',
      create: true,
      delete: true,
      fields: [
        {
          key: 'partnercompany_id',
          type: 'list',
          list: 'partnercompany',
          listLabel: 'partnercompany_name',
          disableOnUpdate: true,
        },
        { key: 'partnercompany_name', hideOnForm: true },
        { key: 'partnergroup_name', hideOnForm: true },
        { key: 'partnertype_name', hideOnForm: true },
        { key: 'location_partnercompany_partnertype_uuid', hideOnIndex: true, hideOnForm: true },
        {
          key: 'partnertype_id',
          hideOnIndex: true,
          type: 'list',
          composite: true,
          list: 'partnertype',
          listLabel: 'partnertype_name',
          disableOnUpdate: true,
        },
        { key: 'city_name', hideOnForm: true },
        { key: 'contactdetails_email', hideOnForm: true },
        { key: 'contactdetails_phone', hideOnForm: true },
        {
          key: 'location_partnercompany_partnertype_valid_from_date',
          type: 'date',
          composite: true,
          disableOnUpdate: true,
        },
        { key: 'location_partnercompany_partnertype_valid_to_date', type: 'date', minDate: 'location_partnercompany_partnertype_valid_from_date' },
      ],
    },
  ],
  note: 'frontend_0_8_5',
}

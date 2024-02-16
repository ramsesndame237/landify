import _ from 'lodash'

export default {
  primaryKey: 'city_id',
  entity: 'frontend_2_10_1',
  fields: [
    { key: 'city_id', sortable: true, auto: true },
    { key: 'city_name', sortable: true },
    { key: 'city_zip', sortable: true },
    {
      key: 'state',
      sortable: true,
      required: false,
      change: (entity, vm) => {
        let cityState
        if (entity.city_zip) {
          const debounced = _.debounce(
            () => vm.$http
              .get(`/users/state/${entity.city_zip}`)
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
    { key: 'country_short', sortable: true, hideOnForm: true },
    {
      key: 'country_id', hideOnIndex: true, type: 'list', list: 'country', listLabel: 'country_name',
    },
  ],
  filters: [
    {
      key: 'customergroup_id',
      type: 'list',
      list: 'customergroup',
      listLabel: 'customergroup_name',
      send: false,
      hideOnIndex: true,
      hideOnUpdate: true,
    },
    {
      key: 'company_id',
      type: 'list',
      list: 'company',
      cols: 12,
      listLabel: 'company_name',
      hideOnIndex: true,
      relationEntity: 'company_pos_rel',
      filter_key: 'customergroup_id',
    },
  ],
  fieldComponent: () => import('@/views/app/FormComponent/CityForm.vue'),

}

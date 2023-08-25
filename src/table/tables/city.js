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
  fieldComponent: () => import('@/views/app/FormComponent/CityForm.vue'),

}

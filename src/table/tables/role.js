export default {
  customIndex: () => import('@/views/app/Role/RoleList.vue'),
  fields: [
    { key: 'user_id', hideOnForm: true, hideOnIndex: true },
    { key: 'role_id', auto: true },
    { key: 'role_name', hideOnIndex: true },
    { key: 'role_is_internal', type: 'boolean', hideOnIndex: true },
    { key: 'role_permission', hideOnIndex: true },
    {
      key: 'user_firstname',
      type: 'html',
      label: 'User',
      formatter: (value, key, item) => `<div class="d-flex h5">
        <div></div>
        <div class="ml-1">
          <p class="mb-0">${`${item.user_firstname} ${item.user_lastname}`}</p>
          <p class="mb-0">${item.user_email}</p>
        </div>
      </div>`,
      hideOnForm: true,
    },
    {
      key: 'roles',
      type: 'html',
      label: 'Roles',
      listLabel: 'role_name',
      hideOnForm: true,
      formatter: value => {
        const rolesName = value.map(role => role.role_name)
        let htmlString = ''
        rolesName.forEach(role => {
          htmlString += `<li><span class="badge badge-dark h5 text-capitalize" style="font-size: .85rem">${role}</span></li>`
        })

        return `<ul class="list-unstyled">${htmlString}</ul>`
      },
    },
    { key: 'usertype', hideOnForm: true, formatter: value => value?.usertype_name.charAt(0).toUpperCase() + value?.usertype_name.slice(1) },
  ],
}

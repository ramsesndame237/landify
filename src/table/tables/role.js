import { http } from '@/libs/axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  customIndex: () => import('@/views/app/Role/RoleList.vue'),
  primaryKey: 'role_id',
  fields: [
    { key: 'user_id', hideOnForm: true, hideOnIndex: true },
    { key: 'role_id', auto: true },
    { key: 'role_name', hideOnIndex: true },
    {
      key: 'role_description', hideOnIndex: true, required: false, type: 'textarea',
    },
    // { key: 'role_is_internal', type: 'boolean', hideOnIndex: true },
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
    // {
    //   key: 'role_menu',
    //   hideOnIndex: true,
    //   type: 'custom-select',
    //   items: async vm => {
    //     const { entity } = vm
    //     let menus = vm.$store.getters['table/listCache']('menu')
    //     if (!menus.length) {
    //       try {
    //         const response = await http.get('/configs/menu')
    //         const configValue = JSON.parse(response.data?.config_val)
    //         menus = configValue[0].menus
    //         vm.$store.dispatch('table/setListData', { entity: 'menu', data: menus })
    //       } catch (error) {
    //         console.log({ error })
    //         vm.$toast({
    //           component: ToastificationContent,
    //           props: {
    //             title: error.response.data.detail,
    //             icon: 'errorIcon',
    //             variant: 'error',
    //           },
    //         })
    //       }
    //     }
    //     const menu_role = entity.role_is_internal === 0
    //     const filteredMenu = menu_role ? [{ label: 'Menu Extern', value: 'Menu Extern', menu_is_internal: false }] : menus.filter(menu => (menu.value === menu_role))
    //     return menu_role ? filteredMenu : filteredMenu.map(menu => ({ label: menu.name, value: menu.name, menu_is_internal: menu.value }))
    //   },
    // },
    {
      key: 'roles',
      type: 'html',
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
    { key: 'usertype_name', hideOnForm: true, formatter: value => (value ? value?.charAt(0).toUpperCase() + value?.slice(1) : '') },
  ],
  relations: [
    {
      title: 'Users',
      primaryKey: 'user_id',
      entity: 'user_role_grp',
      entityForm: 'user_role_rel',
      entityView: 'user',
      fields: [
        {
          key: 'user_id',
          sortable: true,
          type: 'list',
          list: 'user',
          listLabel: 'user_firstname',
          hideOnIndex: true,
          disableOnUpdate: true,
        },
        {
          key: 'user_firstname',
          sortable: true,
          hideOnForm: true,
          type: 'html',
          formatter: (value, key, item) => `<div class="d-flex h5">
        <div class="">
          <p class="mb-0">${`${item.user_firstname} ${item.user_lastname}`}</p>
          <p class="mb-0">${item.user_email}</p>
        </div>
      </div>`,
        },
        {
          key: 'user_role_valid_from', type: 'date', disableOnUpdate: true, composite: true,
        },
        {
          key: 'user_role_valid_to',
          type: 'date',
          rules: { date_after: ['@user_role_valid_from'] },
          sortable: true,
        },
      ],
    },
    // {
    //   title: 'headline~role~tablegroups',
    //   primaryKey: 'tablegroup_id',
    //   entity: 'role_tablegroup_crud_grp',
    //   entityForm: 'role_tablegroup_crud_rel',
    //   entityView: 'tablegroup',
    //   lazy: false,
    //   update: false,
    //   create: false,
    //   delete: false,
    //   search: false,
    //   component: () => import('@/views/app/Role/Relation/TableGroupMatrix.vue'),
    //   tool: () => import('@/views/app/Role/Relation/MatrixTool.vue'),
    //   entityName: 'role', // Ce champ est utilisé lors de l'affichage dans le TableGroupMatrix
    //   fields: [
    //     {
    //       key: 'tablegroup_id', type: 'list', list: 'tablegroup', listLabel: 'tablegroup_name',
    //     },
    //     {
    //       key: 'crud', type: 'list', list: 'crud', listLabel: 'crud', composite: true,
    //     },
    //     { key: 'tablegroup_name', hideOnForm: true },
    //     { key: 'tablegroup_description', hideOnForm: true },
    //   ],

    // },

    // {
    //   title: 'Tables',
    //   primaryKey: 'table_name',
    //   composite: ['table_name', 'crud'],
    //   entity: 'role_tablename_crud_grp',
    //   entityForm: 'role_tablename_crud_rel',
    //   entityView: 'tablename',
    //   update: false,
    //   create: false,
    //   delete: false,
    //   search: false,
    //   // lazy: false,
    //   component: () => import('@/views/app/Role/Relation/TableGroupMatrix.vue'),
    //   tool: () => import('@/views/app/Role/Relation/MatrixTool.vue'),
    //   fields: [
    //     {
    //       key: 'table_name', sortable: true, type: 'list', list: 'tablename', listLabel: 'table_name',
    //     },
    //     {
    //       key: 'crud', type: 'list', list: 'crud', listLabel: 'crud', composite: true,
    //     },
    //   ],
    // },
  ],
}

export default {
    props: {

    },
    data() {
        return {
            loading: false,
            role: {}
        }
    },
    watch: {
        entity: {
            handler() {
                // console.log('entity', val)
            },
            deep: true,
        },
    },
    methods: {
        async getRoles() {
            this.loading = true
            const payload = { customEnpoint: '/users/roles' }
            try {
                const response = await this.$store.dispatch('table/fetchList', payload)
                await this.$store.dispatch('table/setListData', { entity: 'role', data: response })
            } catch (error) {
                console.log({ error })
            } finally {
                this.loading = false
            }
        },
        getRoleDetail(roleId) {
            this.role = this.roles.find(role => role.role_id === roleId)
        }
    },
    computed: {
        roles() {
            return this.$store.getters['table/listCache']('role')
        }
    },
}

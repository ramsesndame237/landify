<template>
  <component :is="definition.customPage || 'edit'" ref="edit" :key="$route.path" />
</template>

<script>
import table from "@/table/index";
import Edit from "../Edit.vue";
import Table from "@/table";

export default {
  watch: {},
  name: "EditPage",
  components: { Edit },
  computed: {
    definition() {
      return table[this.$route.params.table];
    },
  },
  methods: {
    async handleRouteChange(next) {
      console.log("before route leave", this);
      if (Object.hasOwnProperty.call(this.$refs.edit.$refs.form, "hasChanges")) {
        if (!this.$refs.edit.view && this.$refs.edit.$refs.form.hasChanges()) {
          const result = await this.$swal({
            title: "Are you sure you want to leave?",
            text: "Your changes will be loosed",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            customClass: {
              confirmButton: "btn btn-primary",
              cancelButton: "btn btn-outline-danger ml-1",
            },
            buttonsStyling: false,
          });
          if (result.value) return next();
        }
      } else {
        return next();
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    to.meta.pageTitle =
      Table[to.params.table]?.title || `headline~${to.params.table}~list`;
    to.meta.breadcrumb = [
      {
        text: to.params.table,
        to: { name: "table", params: { table: to.params.table } },
        active: false,
      },
      {
        text: "Details",
        active: true,
      },
    ];
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // if it is tab update
    if (to.params.id === from.params.id) return next();
    this.handleRouteChange(() => {
      to.meta.pageTitle =
        Table[to.params.table]?.title || `headline~${to.params.table}~list`;
      to.meta.breadcrumb = [
        {
          text: to.params.table,
          to: { name: "table", params: { table: to.params.table } },
          active: false,
        },
        {
          text: "Details",
          active: true,
        },
      ];
      next();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.handleRouteChange(next);
  },
};
</script>

<style scoped></style>

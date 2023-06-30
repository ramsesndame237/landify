<template>
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <component
            :is="definition.createComponent || definition.formComponent || 'entity-form'"
            ref="form"
            :table="table"
            :definition="definition"
            :table-definition-key="tableDefinitionKey"
            :create="create"
            :is-relation="isRelation"
            inline
            :cols="12"
            @submit="handleOk"
          />
        </div>
      </div>
      <div class="row mt-4 justify-content-end">
        <div class="col-auto">
          <b-button variant="primary" :disabled="loading" @click="handleOk">
            <b-spinner v-if="loading" class="mr-1" small />
            {{ $t('button~save') }}
          </b-button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import EntityForm from "@/views/app/Generic/EntityForm";
  import { BButton, BSpinner } from 'bootstrap-vue';
  import Table from '@/table'
  
  export default {
    name: 'EntityFormPage',
    components: { EntityForm, BButton, BSpinner },
    props: {
    },
    data() {
        const table = this.$route.params.list
        const definition = Table[table]
        return {
            table,
            loading: false,
            //cacheKey: String,
            definition,
            tableDefinitionKey: table,
            isRelation: false,
            create: true,
      };
    },
    methods: {
      handleOk() {
        this.loading = true;
        this.$refs.form.submit()
          .then((entity) => {
            window.opener.postMessage({data: entity, message: 'success'}, window.location.origin);
            window.close(); // Ferme la page
          })
          .finally(() => this.loading = false);
          
          window.opener.postMessage(entity, window.location.origin);
        },
      },
      mounted(){
    
        
    }
  };
  </script>
  
  <style scoped>
  
  </style>  
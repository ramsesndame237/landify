<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <img class="mr-1" src="@/assets/images/icons/people.svg" alt="">
          <span>{{ $t(title) }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-if="view" size="sm" variant="info" class="mr-1" @click="edit">
              <feather-icon icon="EditIcon" class="mr-50"/>
              {{ $t('Edit') }}
            </b-button>
            <b-button v-else size="sm" variant="info" class="mr-1" @click="update" :disabled="loading">
              <b-spinner v-if="loading" small class="mr-50"/>
              <feather-icon v-else icon="SaveIcon" class="mr-50"/>
              {{ $t('Save') }}
            </b-button>
            <b-button v-if="!view" size="sm" variant="primary" @click="cancel">
              {{ $t('Cancel') }}
            </b-button>
          </div>
        </div>
      </div>
    </b-card>

    <b-card>
      <contradiction-form ref="form" :table="table" :definition="definition" :table-definition-key="table"
                          :create="create" :is-relation="false" :disabled="view" :inline="false" :cols="6"
                          :initial-data="entity" :entity-id="entityId"/>
    </b-card>

    <b-tabs ref="tabs" pills v-if="!create" nav-class="bg-white p-1">
      <b-tab title="Contradiction Points" active lazy>
        <contradiction-point/>
      </b-tab>
      <b-tab title="Inspection result" lazy>

      </b-tab>
      <b-tab title="Documents and communication" lazy>

      </b-tab>
      <b-tab title="Preview" lazy>

      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import EditPageMixin from "@/views/app/Generic/EditPageMixin";
import { BTabs, BTab, BCard, BButton, BSpinner } from "bootstrap-vue"
import EntityForm from "@/views/app/Generic/EntityForm";
import ContradictionForm from "@/views/app/FormComponent/ContradictionForm";
import ContradictionPoint from "@/views/app/Page/Contradiction/ContradictionPoint";

export default {
  name: 'Index',
  components: { ContradictionPoint, ContradictionForm, BTab, BTabs, BCard, BButton , BSpinner},
  mixins: [EditPageMixin],
}
</script>

<style scoped>

</style>

<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <img class="mr-1" src="@/assets/images/icons/people.svg" alt="">
          <span>{{ $t(title) }}</span>
        </div>
        <div class="d-flex align-items-center">
          <notes v-if="definition.note" class="mr-2" :primary-key="primaryKey" :id="entityId" :note="definition.note"
                 :note-rel="'note_user_'+table+'_rel'"/>
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
    </b-card>

    <b-card>
      <contradiction-form ref="form" :table="table" :definition="definition" :table-definition-key="table"
                          :create="create" :is-relation="false" :disabled="view" :inline="false" :cols="6"
                          :initial-data="entity" :entity-id="entityId"/>
    </b-card>

    <b-tabs v-if="!create" ref="tabs" v-model="activeTab" pills nav-class="bg-white p-1">
      <b-tab title="Contradiction Points" active>
        <contradiction-point ref="points" @go-to-reductions="activeTab=1" @items="updateItems"/>
      </b-tab>
      <b-tab title="Inspection result" lazy>
        <b-card body-class="p-0" class="mb-1">
          <div class="d-flex justify-content-end" style="padding: 7px">
            <b-button :disabled="saving" @click="saveReductions" variant="primary">
              <b-spinner v-if="saving" class="mr-1" small/>
              <span>{{ $t('button~save') }}</span>
            </b-button>
          </div>
        </b-card>
        <b-card>
          <div v-for="(item,i) in activeItems" :key="i" class="mb-3">
            <h4>{{ item.contradictionpoint_rank + ' - ' + item.contradictionpoint_title }}</h4>
            <reduction-amount :entity="item" :disabled="saving"/>
          </div>
        </b-card>

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
import Notes from "@/views/app/Generic/Notes";
import ReductionAmount from '@/views/app/CreateComponent/ReductionAmount';
import { clone } from '@/libs/utils'

export default {
  name: 'Index',
  components: { ReductionAmount, Notes, ContradictionPoint, ContradictionForm, BTab, BTabs, BCard, BButton, BSpinner },
  mixins: [EditPageMixin],
  data() {
    return {
      activeTab: 0,
      saving: false,
      activeItems: [],
    }
  },
  methods: {
    updateItems(items) {
      console.log('on update', items)
      this.activeItems = clone(items)
    },
    saveReductions() {
      if (this.saving) return
      this.saving = true
      this.$api({
        action: 'update',
        entity: 'contradictionpoint',
        data: this.activeItems,
      })
        .then(() => {
          this.$store.commit('table/deleteTableCacheKeyFromPrefix', 'contradictionpoint-')
          this.$refs.points.$refs.table.reload()
          this.$successToast('Reduction amounts Saved')
        })
        .catch(e => {
          console.error(e)
          this.$errorToast(e.message)
        })
        .finally(() => {
          this.saving = false
        })
    },
  },
}
</script>

<style scoped>

</style>

<template>
  <div>
    <kanban-board :blocks="blocks" :stages="stages">
      <div v-for="block in blocks" :slot="block.id" :key="block.id" class="item">
        <!--        <simple-block :title="block.title" :description="block.description" v-if="block.id & 1"></simple-block>-->
        <summary-block title="Widerspruchsfrist" sub_title="Filiale 1" hours="54" percents="50" documents_nb="14"
                       left_days="14" participants_nb="17" :with-attach="block.id & 1 ? true : false"/>
      </div>
      <div v-for="(stage,idx) in stages" :slot="'footer-'+stage" :key="stage" style="padding: 10px">
        <b-button variant="primary" block @click="createTicket(columns[idx])">
          New Ticket
        </b-button>
      </div>
    </kanban-board>
    <generic-modal @reload-table="$refs.table.reload()" :table="table" :definition="definition"
                   :table-definition-key="table" title="Create a new Ticket" ref="modal"/>
  </div>
</template>
<script>
import { BAvatarGroup, BAvatar, BButton } from 'bootstrap-vue'
// eslint-disable-next-line import/extensions
import SimpleBlock from '@/views/app/CustomComponents/WP6/SimpleBlock'
import SummaryBlock from '@/views/app/CustomComponents/WP6/SummaryBlock'
import GenericModal from "@/views/app/Generic/modal";
import Table from '@/table'

export default {
  name: 'Kanban',
  components: {
    GenericModal,
    BAvatarGroup,
    BAvatar,
    BButton,
    SimpleBlock,
    SummaryBlock,
  },
  data() {
    return {
      table: 'ticket',
      definition: Table.ticket,
      columns: [],
      tickets: [],
      blocks: [
        {
          id: 1,
          status: 'Stage 1',
          title: 'Mon ticket préféré',
          description: 'Une description pas comme les autres.',
        },
      ],
      summaryBlocks: [
        {
          id: 1,
          title: 'My awsome title',
          todo: 5,
          done: 4,
          documentNumber: 14,
          remainingDays: 14,
          workedDays: 54,
          maxDays: 108,
          participantsNumber: 20,
        },
      ],
      loading: false,
    }
  },
  computed: {
    stages() {
      return this.columns.map(c => c.column_name)
    },
  },
  mounted() {
    this.loadStages()
  },
  methods: {
    createBlock(stage) {
      this.blocks.push({
        id: this.blocks[this.blocks.length - 1].id + 1,
        status: stage,
        title: 'New Block',
        description: 'My block description',
      })
    },
    loadStages() {
      this.loading = true
      this.$api({
        entity: 'columnx_board_rel',
        action: 'read-rich',
        data: [{ board_id: this.$route.params.id }],
      })
        .then(({ data }) => {
          return this.$api({
            entity: 'columnx',
            action: 'read-rich',
            data: data.data.data.map(r => ({ column_id: r.column_id })),
          })
            .then(({ data }) => {
              this.columns = data.data.data
            })
        })
        .finally(() => this.loading = false)
    },
    createTicket(column) {
      this.$refs.modal.openModal(true, { column_id: column.column_id })
    },
    loadTickets() {
      this.$api({
        entity: 'frontend_ticket_list',
        action: 'read-rich',
        data: [{ board_id: this.$route.params.id }],
      })
        .then(({ data }) => {
          this.tickets = data.data.data
        })
    }
  },
}
</script>

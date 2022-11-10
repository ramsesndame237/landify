<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <img class="mr-1" src="@/assets/images/icons/people.svg" alt="">
          <h4 class="mb-0">Board: {{ board_name }}</h4>
        </div>
        <div class="d-flex align-items-center">
          <b-form-select v-model="filterValue" placeholder="Select an option" :options="filterOptions" />
          <b-button variant="primary" class="mx-1" block @click="createTicket()">
            New Ticket
          </b-button>
          <b-form-input debounce="500" v-model="search" type="search" class="w-16" placeholder="Search.."/>
        </div>
      </div>
    </b-card>
    <kanban-board :blocks="tickets" :stages="stages" status-prop="column_name" id-prop="ticket_id">
      <div v-for="ticket in tickets" :slot="ticket.ticket_id" :key="ticket.ticket_id" class="item">
        <invoice-ticket-card :ticket="ticket"/>
      </div>
    </kanban-board>
    <generic-modal @reload-table="$refs.table.reload()" :table="table" :definition="definition"
                   :table-definition-key="table" title="Create a new Ticket" ref="modal"/>
  </div>
</template>
<script>
import { BAvatarGroup, BAvatar, BButton, BCard, BFormInput, BFormSelect } from 'bootstrap-vue'
// eslint-disable-next-line import/extensions
import SimpleBlock from '@/views/app/CustomComponents/WP6/SimpleBlock'
import SummaryBlock from '@/views/app/CustomComponents/WP6/SummaryBlock'
import GenericModal from "@/views/app/Generic/modal";
import Table from '@/table'
import vSelect from 'vue-select'
import InvoiceTicketCard from "@/views/app/CustomComponents/WP6/InvoiceTicketCard";

export default {
  name: 'Kanban',
  components: {
    InvoiceTicketCard,
    GenericModal,
    BAvatarGroup,
    BAvatar,
    BButton, vSelect, BFormSelect,
    BCard, BFormInput,
    SimpleBlock,
    SummaryBlock,
  },
  data() {
    return {
      table: 'ticket',
      search: '',
      filterOptions: [{ text: 'All', value: 0 }, { text: 'My tickets', value: 1 }],
      filterValue: 0,
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
    board_name() {
      return this.columns[0]?.board_name
    },
  },
  mounted() {
    this.loadStages()
    this.loadTickets()
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
        entity: 'frontend_column_list',
        action: 'read-rich',
        data: [{ board_id: this.$route.params.id }],
      })
        .then(({ data }) => {
          this.columns = data.data.data.sort(c => c.rank_order)
        })
        .finally(() => this.loading = false)
    },
    createTicket(column) {
      this.$refs.modal.openModal(true, { column_id: this.columns[0].column_id })
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
    },
  },
}
</script>


<style lang="scss">
/*@import '~vue-kanban/src/assets/kanban.scss';*/
$ease-out: all .3s cubic-bezier(0.23, 1, 0.32, 1);
$on-hold: #FB7D44;
$in-progress: #2A92BF;
$needs-review: #F4CE46;
$approved: #00B961;

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.drag-container {
  //max-width: 1000px;
  margin: 20px auto;
}

.drag-list {
  display: flex;
  align-items: flex-start;

  @media (max-width: 690px) {
    display: block;
  }
}

.drag-column {
  flex: 1;
  margin: 0 10px;
  position: relative;
  background: #E9E9E9;
  overflow: hidden;

  @media (max-width: 690px) {
    margin-bottom: 30px;
  }

  h2 {
    font-size: 0.8rem;
    margin: 0;
    text-transform: uppercase;
    font-weight: 600;
  }

  &-on-hold {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $on-hold;
    }
  }

  &-in-progress {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $in-progress;
    }
  }

  &-needs-review {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $needs-review;
    }
  }

  &-approved {
    .drag-column-header,
    .is-moved,
    .drag-options {
      background: $approved;
    }
  }
}

.drag-column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.drag-inner-list {
  min-height: 50px;
}

.drag-item {
  margin: 10px;
  background: rgba(white, 1);
  //transition: $ease-out;

  &.is-moving {
    transform: scale(1.1);
    background: rgba(white, 0.8);
  }

}

.drag-header-more {
  cursor: pointer;
}

.drag-options {
  position: absolute;
  top: 44px;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  transform: translateX(100%);
  opacity: 0;
  transition: $ease-out;

  &.active {
    transform: translateX(0);
    opacity: 1;
  }

  &-label {
    display: block;
    margin: 0 0 5px 0;

    input {
      opacity: 0.6;
    }

    span {
      display: inline-block;
      font-size: 0.9rem;
      font-weight: 400;
      margin-left: 5px;
    }
  }
}

/* Dragula CSS  */

.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 0.8;
  list-style-type: none;
}

.gu-hide {
  display: none !important;
}

.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}

.gu-transit {
  opacity: 0.2;
}

/* Demo info */

.section {
  padding: 20px;
  text-align: center;

  a {
    color: white;
    text-decoration: none;
    font-weight: 300;
  }

  h4 {
    font-weight: 400;

    a {
      font-weight: 600;
    }
  }
}
</style>

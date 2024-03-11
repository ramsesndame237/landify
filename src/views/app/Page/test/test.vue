<script>
import KanbanViewDisplay from '@/components/KanbanViewDisplay.vue'
import TicketCard from '@/views/app/CustomComponents/TicketCard.vue'

export default {
  name: 'Test',
  components: {TicketCard, KanbanViewDisplay},
  data: () => ({
    previousScrollEvent: [],
    dropColumn:null,
    columnData: [
      {
        tickets: [],
        column_name: 'column_1',
        column_id: 'id_1',
      },
      {
        tickets: [],
        column_name: 'column_2',
        column_id: 'id_2',
      },
      {
        tickets: [],
        column_name: 'column_3',
        column_id: 'id_3',
      },
      {
        tickets: [],
        column_name: 'column_4',
        column_id: 'id_4',
      },
      {
        tickets: [],
        column_name: 'column_5',
        column_id: 'id_5',
      },
      {
        tickets: [],
        column_name: 'column_6',
        column_id: 'id_6',
      },
      {
        tickets: [],
        column_name: 'column_7',
        column_id: 'id_7',
      },
    ],
  }),

  methods: {
    handleScroll(event, value) {
      const previousEvent = this.previousScrollEvent.find(x => x.id === value.column_id)
      if (previousEvent && previousEvent.value > event.target.scrollTop) {
        console.log('you are going doing')
        this.previousScrollEvent.push({id: value.column_id, value: event.target.scrollTop})
      } else {
        if (value.tickets.length === 20) {
          return
        }
        this.previousScrollEvent.push({id: value.column_id, value: event.target.scrollTop})
        this.columnData.find(column => column.column_id === value.column_id).tickets.push({
          ticket_id: this.generateUuid(),
          ticket_name: 'ticket-' + this.generateUuid()
        })
      }
    },
    generateUuid() {
      let uuid = self.crypto.randomUUID();
      console.log(uuid);
      return uuid
    },
    handleDrag(event, column, ticket) {
      if (event.type === 'dragend') {
        console.log("this is the value of the colum", column)
        console.log("this is the value of the ticket", ticket)
        if(this.dropColumn){

          let index = this.columnData.findIndex((item) => item.column_id === column.column_id)
          console.log("this is the index",index)
          this.columnData[index].tickets = this.columnData.find((item) => item.column_id === column.column_id)?.tickets.filter((x) => x.ticket_id !== ticket.ticket_id)
          console.log("this is the index",this.columnData[index])
          this.columnData.find((item)=> item.column_id === this.dropColumn)?.tickets.push({...ticket, column_id:this.dropColumn})

        }
        if (event.target.classList.contains('card_draggable')) {
          event.target.classList.remove('card_draggable')
        }

      } else {
        console.log('the drag start', event)
        event.target.classList.add('card_draggable')
      }
      event.dataTransfer.setData("text", event.target.id)
      event.dataTransfer.effectAllowed = "move";
    },
    handleDragOver(event){
      console.log(
        `dragOver: dropEffect = ${event.dataTransfer.dropEffect} ; effectAllowed = ${event.dataTransfer.effectAllowed}`,
      );
      event.preventDefault();
      // Set the dropEffect to move
      event.dataTransfer.dropEffect = "move";
    },
    handleDrop(event,column_id) {
      console.log('this is the drop event', event)
      console.log('this is the drop column', column_id)
      this.dropColumn=column_id
    },
    fetchTicketOfTheColumn(id) {
      console.log("this i sth fetch", id)
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          this.columnData.find((column) => column.column_id === id)?.tickets.push({
            ticket_id:'ticket_id_' + id + this.generateUuid(),
            ticket_name: 'ticket-' + this.generateUuid(),
            column_id:id
          })
        }, 500)
      }
    }

  },
  mounted() {
    for (let i = 0; i < this.columnData.slice(0, 3).length; i++) {
      console.log("this is the ticket")
      this.fetchTicketOfTheColumn(this.columnData[i].column_id)
    }
  }
}
</script>

<template>
  <div class="h-100">
    <KanbanViewDisplay classes="d-flex kanbanContainer" :styles="'border:solid green'">
      <b-card v-for="item in columnData" :key="item.column_id" class="columnBoardElement"
              @scrollend.passive="(e)=>handleScroll(e,item)" @drop.prevent="(event)=> handleDrop(event,item.column_id)"
              @dragover.prevent="(event) =>handleDragOver(event)">
        <div v-for="ticket in item.tickets" :id="ticket.ticket_id" :key="ticket.ticket_id" draggable="true"
             class="cursor-pointer" style="height: 250px;margin-top: 15px;"
             @dragend="(event)=> handleDrag(event,item,ticket)"
             @dragstart="(event)=> handleDrag(event)">
          <b-card class="h-100">
            {{ ticket }}
          </b-card>
        </div>

      </b-card>
    </KanbanViewDisplay>
  </div>
</template>

<style scoped>
.kanbanContainer {
  border: solid green;
  overflow-x: auto;
  gap: 15px;
  height: 80vh;
  user-select: none;
}

.columnBoardElement {
  background: #bbbcbe;
  min-width: 450px;
  max-height: 100vh;
  margin-bottom: 15px;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;

}

.card_draggable {
  border: dashed;
}

</style>

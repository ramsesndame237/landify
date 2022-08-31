<template>
  <div>
    <kanban-board :blocks="blocks" :stages="stages">
      <div v-for="block in blocks" :slot="block.id" :key="block.id" class="item">
        <simple-block :title="block.title" :description="block.description"></simple-block>
      </div>
      <div v-for="stage in stages" :slot="'footer-'+stage" :key="stage" style="padding: 10px">
        <b-button variant="primary" block @click="createBlock(stage)">+</b-button>
      </div>
    </kanban-board>
  </div>
</template>
<script>
import { BAvatarGroup, BAvatar, BButton } from 'bootstrap-vue'
// eslint-disable-next-line import/extensions
import SimpleBlock from '@/views/app/CustomComponents/WP6/SimpleBlock'

export default {
  name: 'kanban',
  components: {
    BAvatarGroup,
    BAvatar,
    BButton,
    SimpleBlock
  },
  data() {
    return {
      stages: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5'],
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
    }
  },
  methods: {
    createBlock(stage) {
      this.blocks.push({
        id: this.blocks[this.blocks.length - 1].id + 1,
        status: stage,
        title: 'New Block',
        description: 'My block description',
      })
    }
  }
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

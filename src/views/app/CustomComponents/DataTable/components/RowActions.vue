<template>
  <div
    v-if="!col.hideActions && !actionsAtTheLastColumn"
    class="d-flex align-items-center"
    :class="{ 'position-absolute': floating }"
    :style="{
      columnGap: '8px',
      transform: floating ? 'translateY(-50%)' : undefined,
      top: floating ? '50%' : undefined,
      right: floating ? 0 : undefined,
      maxWidth: floating ? '100%' : undefined,
      flexWrap: floating ? 'wrap' : undefined,
    }"
  >
    <fragment
      v-for="(btn, btnIdx) in listAllActions ? buttons.concat(moreActions) : buttons"
      :key="`data-table-${typeof btn.icon === 'string' ? btn.icon : ''}${btnIdx}${i}${j}`"
    >
      <b-button
        :id="`data-table-${typeof btn.icon === 'string' ? btn.icon : ''}${btnIdx}${i}${j}`"
        :title="$t(btn.label)"
        class="show-btn"
        @click.stop="(e) => btn.onClick(row, tableStore, e)"
      >
        <feather-icon
          :icon="btn.icon"
          size="17"
        />
      </b-button>
      <b-tooltip
        v-if="btn.label"
        :target="`data-table-${typeof btn.icon === 'string' ? btn.icon : ''}${btnIdx}${i}${j}`"
        triggers="hover"
      >
        {{ $t(btn.label) }}
      </b-tooltip>
    </fragment>
    <b-dropdown
      v-if="!listAllActions && moreActions.length > 0"
      :id="`more-${buttons.concat(moreActions).length}${i}${j}`"
      v-b-tooltip.hover
      v-b-toggle.[`more-${buttons.concat(moreActions).length}${i}${j}`]
      class="rounded-circle show-btn flex-shrink-0"
      no-caret
      dropleft
    >
      <template #button-content>
        <feather-icon class="flex-shrink-0" icon="MoreHorizontalIcon" size="14" color="black" />
      </template>

      <b-dropdown-item
        v-for="btn in moreActions"
        :key="btn.key || btn.id"
        :title="$t(btn.label)"
        @click.stop="(e) => btn.onClick(row, tableStore, e)"
      >
        <div class="d-flex justify-content-between align-items-center">
          <feather-icon
            v-if="typeof btn.icon === 'string'"
            size="16"
            :icon="btn.icon"
          />
          <component :is="btn.icon" v-else />
          <span
            v-if="btn.label"
            class="text-truncate block ml-1"
            style="max-width: 180px"
          >
            {{ $t(btn.label) }}
          </span>
        </div>
      </b-dropdown-item>
    </b-dropdown>

    <b-tooltip
      :target="`more-${buttons.concat(moreActions).length}${i}${j}`"
      triggers="hover"
    >
      {{ $t('more actions') }}
    </b-tooltip>
  </div>
</template>

<script>
import { BTooltip } from 'bootstrap-vue'

export default {
  name: 'RowActions',
  components: {
    BTooltip,
  },
  props: {
    buttons: {
      type: Array,
      default: () => [],
    },
    moreActions: {
      type: Array,
      default: () => [],
    },
    tableStore: {
      type: Object,
      required: true,
    },
    col: {
      type: Object,
      required: true,
    },
    row: {
      type: Object,
      required: true,
    },
    listAllActions: {
      type: Boolean,
      default: false,
    },
    floating: {
      type: Boolean,
      default: true,
    },
    actionsAtTheLastColumn: {
      type: Boolean,
      default: true,
    },
    i: {
      type: Number,
      required: true,
    },
    j: {
      type: Number,
      required: true,
    },
  },
}
</script>

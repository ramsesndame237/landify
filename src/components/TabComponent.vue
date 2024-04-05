<script>
export default {
  name: 'TabComponent',
  props: {
    tabTitle: Array,
    activeTabItem: {
      type: Object,
      required: true,
    },
    nowrap: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    visibleTabs() {
      return this.tabTitle.filter(tab => tab.show)
    },
  },
  mounted() {
    // const allElements = document.querySelectorAll('.tab_container li')
    // if (allElements) {
    //   allElements?.[3]?.click?.()
    // }
    if (this.nowrap) {
      const activeTabIndex = this.visibleTabs.findIndex(tab => tab.id === this.activeTabItem.id)
      if (activeTabIndex > -1) {
        this.$refs.tabItems[activeTabIndex].scrollIntoView({
          block: 'end',
          inline: 'nearest',
        })
      }
    }
  },
  methods: {
    activeOrDiseableItemsNavigation(event, item) {
      // const allElements = document.querySelectorAll('.tab_container li')
      // if (allElements) {
      //   allElements.forEach(element => {
      //     element.classList.remove('active')
      //   })
      //   event.target.classList.add('active')
      this.$emit('selected-item', item)
    },
  },
}

</script>

<template>
  <div class="tab_container">
    <ul :class="{ nowrap }">
      <div class="flex-grow-1" />
      <li v-for="(item,index) in visibleTabs" ref="tabItems" :key="index" class="list-item" :class="{active: activeTabItem && activeTabItem.id === item.id}" @click="(event) =>activeOrDiseableItemsNavigation(event, item)">
        {{ item.title }}

        <b-spinner
          v-if="item.count > 0"
          small
          variant="primary"
          type="grow"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/variables/variables";
@mixin commonProperty{
  display: block;
  content: " ";
  position: absolute;
  top: 0;
  height: 100%;
  width: 44px;
  background-color: #FFF;
  transition: all 250ms ease;
}
.tab_container {
  width: 100%;
  min-width: 400px;
  margin: 0 auto 16px;
  border-bottom: 4px solid $primary;
  overflow: hidden;
  transition: border 250ms ease;

  ul {
    margin: 0px;
    padding: 0px;
    overflow: auto;
    padding-left: 48px;
    list-style-type: none;
    display: flex;
    flex-direction: row-reverse;
    scrollbar-width: none;
    flex-wrap: wrap;
  }

  ul.nowrap {
    flex-wrap: nowrap;
  }

  ul * {
    margin: 0px;
    padding: 0px;
  }

  ul li {
    display: block;
    padding: 10px 24px 8px;
    background-color: #FFF;
    margin-right: 46px;
    z-index: 2;
    position: relative;
    cursor: pointer;
    color: #777;
    text-transform: uppercase;
    font: 600 13px/20px roboto, "Open Sans", Helvetica, sans-serif;
    transition: all 250ms ease;
    scroll-margin-left: 46px;

    &:before{
      @include commonProperty;
      right: -24px;
      transform: skew(30deg, 0deg);
      box-shadow: rgba(0, 0, 0, .1) 3px 2px 5px, inset rgba(255,255,255,.09) -1px 0;
    }
    &:after{
      @include commonProperty;
      left: -24px;
      transform: skew(-30deg, 0deg);
      box-shadow: rgba(0,0,0,.1) -3px 2px 5px, inset rgba(255, 255, 255, .09) 1px 0;
    }
  }

  ul li:hover,
  ul li:hover:before,
  ul li:hover:after {
    background-color: #F4F7F9;
    color: #444;
  }

  ul li.active {
    z-index: 3;
  }

  ul li.active,
  ul li.active:before,
  ul li.active:after {
    background-color: $primary;
    color: #fff;
  }

  .round ul li {
    border-radius: 8px 8px 0 0;
  }

  .round ul li:before {
    border-radius: 0 8px 0 0;
  }

  .round ul li:after {
    border-radius: 8px 0 0 0;
  }

  [class*="skin-"] ul li {
    color: #FFF;
    text-shadow: rgba(0, 0, 0, .1) 0 1px;
  }

  .skin-turquoise {
    border-bottom-color: #1ABC9C;
  }

  .skin-turquoise ul li,
  .skin-turquoise ul li:before,
  .skin-turquoise ul li:after {
    background-color: #34D6B6;
  }

  .skin-turquoise ul li:hover,
  .skin-turquoise ul li:hover:before,
  .skin-turquoise ul li:hover:after {
    background-color: #40E2C2;
  }

  .skin-turquoise ul li.active,
  .skin-turquoise ul li.active:before,
  .skin-turquoise ul li.active:after {
    background-color: #1ABC9C;
  }

  .skin-emerald {
    border-bottom-color: #2ECC71;
  }

  .skin-emerald ul li,
  .skin-emerald ul li:before,
  .skin-emerald ul li:after {
    background-color: #48E68B;
  }

  .skin-emerald ul li:hover,
  .skin-emerald ul li:hover:before,
  .skin-emerald ul li:hover:after {
    background-color: #54F297;
  }

  .skin-emerald ul li.active,
  .skin-emerald ul li.active:before,
  .skin-emerald ul li.active:after {
    background-color: #2ECC71;
  }

  .skin-peter-river {
    border-bottom-color: #3498DB;
  }

  .skin-peter-river ul li,
  .skin-peter-river ul li:before,
  .skin-peter-river ul li:after {
    background-color: #4EB2F5;
  }

  .skin-peter-river ul li:hover,
  .skin-peter-river ul li:hover:before,
  .skin-peter-river ul li:hover:after {
    background-color: #5ABEFF;
  }

  .skin-peter-river ul li.active,
  .skin-peter-river ul li.active:before,
  .skin-peter-river ul li.active:after {
    background-color: #3498DB;
  }

  .skin-amethyst {
    border-bottom-color: #9B59B6;
  }

  .skin-amethyst ul li,
  .skin-amethyst ul li:before,
  .skin-amethyst ul li:after {
    background-color: #B573D0;
  }

  .skin-amethyst ul li:hover,
  .skin-amethyst ul li:hover:before,
  .skin-amethyst ul li:hover:after {
    background-color: #C17FDC;
  }

  .skin-amethyst ul li.active,
  .skin-amethyst ul li.active:before,
  .skin-amethyst ul li.active:after {
    background-color: #9B59B6;
  }

  .skin-wet-asphalt {
    border-bottom-color: #34495E;
  }

  .skin-wet-asphalt ul li,
  .skin-wet-asphalt ul li:before,
  .skin-wet-asphalt ul li:after {
    background-color: #4E6378;
  }

  .skin-wet-asphalt ul li:hover,
  .skin-wet-asphalt ul li:hover:before,
  .skin-wet-asphalt ul li:hover:after {
    background-color: #5A6F84;
  }

  .skin-wet-asphalt ul li.active,
  .skin-wet-asphalt ul li.active:before,
  .skin-wet-asphalt ul li.active:after {
    background-color: #34495E;
  }

  .skin-sun-flower {
    border-bottom-color: #F1C40F;
  }

  .skin-sun-flower ul li,
  .skin-sun-flower ul li:before,
  .skin-sun-flower ul li:after {
    background-color: #FFDE29;
    color: #0A0;
  }

  .skin-sun-flower ul li:hover,
  .skin-sun-flower ul li:hover:before,
  .skin-sun-flower ul li:hover:after {
    background-color: #FFEA35;
  }

  .skin-sun-flower ul li.active,
  .skin-sun-flower ul li.active:before,
  .skin-sun-flower ul li.active:after {
    background-color: #F1C40F;
    color: #FFF;
  }

  .skin-carrot {
    border-bottom-color: #E67E22;
  }

  .skin-carrot ul li,
  .skin-carrot ul li:before,
  .skin-carrot ul li:after {
    background-color: #FF983C;
  }

  .skin-carrot ul li:hover,
  .skin-carrot ul li:hover:before,
  .skin-carrot ul li:hover:after {
    background-color: #FFA448;
  }

  .skin-carrot ul li.active,
  .skin-carrot ul li.active:before,
  .skin-carrot ul li.active:after {
    background-color: #E67E22;
  }

  .skin-alizarin {
    border-bottom-color: #E74C3C;
  }

  .skin-alizarin ul li,
  .skin-alizarin ul li:before,
  .skin-alizarin ul li:after {
    background-color: #FF6656;
  }

  .skin-alizarin ul li:hover,
  .skin-alizarin ul li:hover:before,
  .skin-alizarin ul li:hover:after {
    background-color: #FF7262;
  }

  .skin-alizarin ul li.active,
  .skin-alizarin ul li.active:before,
  .skin-alizarin ul li.active:after {
    background-color: #E74C3C;
  }

  .skin-graphite {
    border-bottom-color: #454545;
  }

  .skin-graphite ul li,
  .skin-graphite ul li:before,
  .skin-graphite ul li:after {
    background-color: #5F5F5F;
  }

  .skin-graphite ul li:hover,
  .skin-graphite ul li:hover:before,
  .skin-graphite ul li:hover:after {
    background-color: #6B6B6B;
  }

  .skin-graphite ul li.active,
  .skin-graphite ul li.active:before,
  .skin-graphite ul li.active:after {
    background-color: #454545;
  }

  .skin-concrete {
    border-bottom-color: #95A5A6;
  }

  .skin-concrete ul li,
  .skin-concrete ul li:before,
  .skin-concrete ul li:after {
    background-color: #AFBFC0;
  }

  .skin-concrete ul li:hover,
  .skin-concrete ul li:hover:before,
  .skin-concrete ul li:hover:after {
    background-color: #BBCBCC;
  }

  .skin-concrete ul li.active,
  .skin-concrete ul li.active:before,
  .skin-concrete ul li.active:after {
    background-color: #95A5A6;
  }

  .skin-green-sea {
    border-bottom-color: #16A085;
  }

  .skin-green-sea ul li,
  .skin-green-sea ul li:before,
  .skin-green-sea ul li:after {
    background-color: #30BA9F;
  }

  .skin-green-sea ul li:hover,
  .skin-green-sea ul li:hover:before,
  .skin-green-sea ul li:hover:after {
    background-color: #3CC6AB;
  }

  .skin-green-sea ul li.active,
  .skin-green-sea ul li.active:before,
  .skin-green-sea ul li.active:after {
    background-color: #16A085;
  }

  .skin-nephritis {
    border-bottom-color: #27AE60;
  }

  .skin-nephritis ul li,
  .skin-nephritis ul li:before,
  .skin-nephritis ul li:after {
    background-color: #41C87A;
  }

  .skin-nephritis ul li:hover,
  .skin-nephritis ul li:hover:before,
  .skin-nephritis ul li:hover:after {
    background-color: #4DD486;
  }

  .skin-nephritis ul li.active,
  .skin-nephritis ul li.active:before,
  .skin-nephritis ul li.active:after {
    background-color: #27AE60;
  }

  .skin-belize-hole {
    border-bottom-color: #2980B9;
  }

  .skin-belize-hole ul li,
  .skin-belize-hole ul li:before,
  .skin-belize-hole ul li:after {
    background-color: #439AD3;
  }

  .skin-belize-hole ul li:hover,
  .skin-belize-hole ul li:hover:before,
  .skin-belize-hole ul li:hover:after {
    background-color: #4FA6DF;
  }

  .skin-belize-hole ul li.active,
  .skin-belize-hole ul li.active:before,
  .skin-belize-hole ul li.active:after {
    background-color: #2980B9;
  }

  .skin-wisteria {
    border-bottom-color: #8E44AD;
  }

  .skin-wisteria ul li,
  .skin-wisteria ul li:before,
  .skin-wisteria ul li:after {
    background-color: #A85EC7;
  }

  .skin-wisteria ul li:hover,
  .skin-wisteria ul li:hover:before,
  .skin-wisteria ul li:hover:after {
    background-color: #B46AD3;
  }

  .skin-wisteria ul li.active,
  .skin-wisteria ul li.active:before,
  .skin-wisteria ul li.active:after {
    background-color: #8E44AD;
  }

  .skin-midnight-blue {
    border-bottom-color: #2C3E50;
  }

  .skin-midnight-blue ul li,
  .skin-midnight-blue ul li:before,
  .skin-midnight-blue ul li:after {
    background-color: #46586A;
  }

  .skin-midnight-blue ul li:hover,
  .skin-midnight-blue ul li:hover:before,
  .skin-midnight-blue ul li:hover:after {
    background-color: #526476;
  }

  .skin-midnight-blue ul li.active,
  .skin-midnight-blue ul li.active:before,
  .skin-midnight-blue ul li.active:after {
    background-color: #2C3E50;
  }

  .skin-orange {
    border-bottom-color: #F39C12;
  }

  .skin-orange ul li,
  .skin-orange ul li:before,
  .skin-orange ul li:after {
    background-color: #FFB62C;
  }

  .skin-orange ul li:hover,
  .skin-orange ul li:hover:before,
  .skin-orange ul li:hover:after {
    background-color: #FFC238;
  }

  .skin-orange ul li.active,
  .skin-orange ul li.active:before,
  .skin-orange ul li.active:after {
    background-color: #F39C12;
  }

  .skin-pumpkin {
    border-bottom-color: #D35400;
  }

  .skin-pumpkin ul li,
  .skin-pumpkin ul li:before,
  .skin-pumpkin ul li:after {
    background-color: #ED6E1A;
  }

  .skin-pumpkin ul li:hover,
  .skin-pumpkin ul li:hover:before,
  .skin-pumpkin ul li:hover:after {
    background-color: #F97A26;
  }

  .skin-pumpkin ul li.active,
  .skin-pumpkin ul li.active:before,
  .skin-pumpkin ul li.active:after {
    background-color: #D35400;
  }

  .skin-pomegranate {
    border-bottom-color: #C0392B;
  }

  .skin-pomegranate ul li,
  .skin-pomegranate ul li:before,
  .skin-pomegranate ul li:after {
    background-color: #DA5345;
  }

  .skin-pomegranate ul li:hover,
  .skin-pomegranate ul li:hover:before,
  .skin-pomegranate ul li:hover:after {
    background-color: #E65F51;
  }

  .skin-pomegranate ul li.active,
  .skin-pomegranate ul li.active:before,
  .skin-pomegranate ul li.active:after {
    background-color: #C0392B;
  }

  .skin-silver {
    border-bottom-color: #BDC3C7;
  }

  .skin-silver ul li,
  .skin-silver ul li:before,
  .skin-silver ul li:after {
    background-color: #D7DDE1;
    color: #666;
  }

  .skin-silver ul li:hover,
  .skin-silver ul li:hover:before,
  .skin-silver ul li:hover:after {
    background-color: #E3E9ED;
  }

  .skin-silver ul li.active,
  .skin-silver ul li.active:before,
  .skin-silver ul li.active:after {
    background-color: #BDC3C7;
    color: #FFF;
  }

  .skin-asbestos {
    border-bottom-color: #7F8C8D;
  }

  .skin-asbestos ul li,
  .skin-asbestos ul li:before,
  .skin-asbestos ul li:after {
    background-color: #99A6A7;
  }

  .skin-asbestos ul li:hover,
  .skin-asbestos ul li:hover:before,
  .skin-asbestos ul li:hover:after {
    background-color: #A5B2B3;
  }

  .skin-asbestos ul li.active,
  .skin-asbestos ul li.active:before,
  .skin-asbestos ul li.active:after {
    background-color: #7F8C8D;
  }

  .skin-dodgerblue {
    border-bottom-color: dodgerblue;
  }

  .skin-dodgerblue ul li,
  .skin-dodgerblue ul li:before,
  .skin-dodgerblue ul li:after {
    background-color: deepskyblue;
  }

  .skin-dodgerblue ul li:hover,
  .skin-dodgerblue ul li:hover:before,
  .skin-dodgerblue ul li:hover:after {
    background-color: #33ccff;
  }

  .skin-dodgerblue ul li.active,
  .skin-dodgerblue ul li.active:before,
  .skin-dodgerblue ul li.active:after {
    background-color: dodgerblue;
  }

  .skin-gray-black {
    border-bottom-color: #28343b;
  }

  .skin-gray-black,
  .skin-gray-black ul li,
  .skin-gray-black ul li:before,
  .skin-gray-black ul li:after {
    transition: none;
  }

  .skin-gray-black ul li,
  .skin-gray-black ul li:before,
  .skin-gray-black ul li:after {
    background-color: #68737B;
  }

  .skin-gray-black ul li:hover,
  .skin-gray-black ul li:hover:before,
  .skin-gray-black ul li:hover:after {
    background-color: #707A83;
  }

  .skin-gray-black ul li.active,
  .skin-gray-black ul li.active:before,
  .skin-gray-black ul li.active:after {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2I1YmRjOCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyODM0M2IiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
  }

  .skin-black-glass {
    border-bottom-color: #0a0809;
  }

  .skin-black-glass,
  .skin-black-glass ul li,
  .skin-black-glass ul li:before,
  .skin-black-glass ul li:after {
    transition: none;
  }

  .skin-black-glass ul li,
  .skin-black-glass ul li:before,
  .skin-black-glass ul li:after {
    background-color: #333;
  }

  .skin-black-glass ul li:hover,
  .skin-black-glass ul li:hover:before,
  .skin-black-glass ul li:hover:after {
    background-color: #444;
  }

  .skin-black-glass ul li.active,
  .skin-black-glass ul li.active:before,
  .skin-black-glass ul li.active:after {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2FlYmNiZiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzZlNzc3NCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzBhMGUwYSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwYTA4MDkiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
  }

  a.iprodev {
    line-height: normal;
    font-family: Varela Round, sans-serif;
    font-weight: 600;
    text-decoration: none;
    font-size: 13px;
    color: #A7AAAE;
    position: fixed;
    left: 20px;
    bottom: 20px;
    border: 1px solid #A7AAAE;
    padding: 12px 20px 10px;
    border-radius: 50px;
    transition: all .1s ease-in-out;
    text-transform: uppercase;
  }

  a.iprodev:hover {
    background: #A7AAAE;
    color: white;
  }

}
</style>

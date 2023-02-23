<template>
  <div style="min-height: 100vh">
    <b-card body-class="p-1">
      <div class="d-flex justify-content-between">
        <b-form-group class="mb-0">
          <label class="d-inline-block text-sm-left mr-50">Page</label>
          <b-form-select id="perPageSelect" v-model="page" style="width: 60px" size="sm" :options="options"
                         class="w-10"/>
        </b-form-group>
        <div class="d-flex align-items-center">
          <b-button size="sm" variant="primary" class="mr-1" @click="initCropper">
            Insert
          </b-button>
          <b-button size="sm" variant="primary" class="mr-1">
            Save
          </b-button>
        </div>
      </div>
    </b-card>
    <div id="target" class="position-relative" :key="page" style="display: inline-block">
      <!--      <pdf :src="getDocumentLink(entity)" :page="1">-->
      <!--        <template slot="loading">-->
      <!--          loading content here...-->
      <!--        </template>-->
      <!--      </pdf>-->
      <canvas id="canvas" width="500" height="500"></canvas>
    </div>
  </div>
</template>

<script>
import { getDocumentLink } from '@/libs/utils'
// import pdf from 'pdfvuer'
// import 'pdfjs-dist/build/pdf.worker.entry' // not needed since v1.9.1

class SvgWidget extends Jcrop.Widget {
  init() {
    super.init()
    const img = new Image()
    img.src = 'https://d3o1694hluedf9.cloudfront.net/img/js.svg'
    this.el.appendChild(img)
  }
}

export default {
  name: 'SignDocument',
  data() {
    return {
      entity: this.$route.params.entity,
      page: 1,
      pages: 1,
      options: [],
    }
  },
  watch: {
    page() {
      this.loadPage(this.page)
    },
  },
  async mounted() {
    if (!this.entity) {
      this.entity = await this.$store.dispatch('table/fetchSingleItem', {
        entity: 'frontend_document_list',
        primaryKey: 'document_id',
        id: this.$route.params.id,
      })
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js'
    try {
      const pdf = await pdfjsLib.getDocument(this.getDocumentLink(this.entity)).promise
      this.pdf = pdf
      this.pages = pdf.numPages
      this.options = [...this.sequenceGenerator(1, this.pages)]
      await this.loadPage(1)
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async loadPage(number) {
      if (this.jcrop) {
        console.log('destroy jcrop')
        this.jcrop.destroy()
        this.jcrop = null
      }
      const page = await this.pdf.getPage(number)
      let scale = 1
      let viewport = page.getViewport({ scale })
      // Full width
      scale = this.$el.clientWidth / viewport.width
      viewport = page.getViewport({ scale })

      //
      // Prepare canvas using PDF page dimensions
      //
      const canvas = document.getElementById('canvas')
      const context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width

      //
      // Render PDF page into canvas context
      //
      const task = page.render({ canvasContext: context, viewport })
      task.promise.then(() => {
        // this.initCropper()
      })
    },
    getDocumentLink,
    initCropper() {
      if (this.jcrop) return
      this.jcrop = Jcrop.attach('target', {
        aspectRatio: 1,
        widgetConstructor: SvgWidget,
      })
      const rect = Jcrop.Rect.from([0, 0, 200, 200])
      this.jcrop.newWidget(rect)
    },
    * sequenceGenerator(minVal, maxVal) {
      let currVal = minVal
      while (currVal < maxVal) {
        yield currVal++
      }
    },
  },
}
</script>

<style scoped>

</style>

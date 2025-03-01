<template>
  <b-overlay :show="loading" style="min-height: 100vh">
    <b-card body-class="p-1">
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <b-link class="btn btn-primary btn-sm mr-2"
                  :to="{name: 'table-view',params: {table: 'ticket', id: $route.params.ticket_id}}"
          >
            <feather-icon icon="ArrowLeftIcon"/>
            Back to Ticket
          </b-link>
          <b-button size="sm" variant="primary" class="mx-1"
                    @click="$refs.modal.openModal(!information,{document_id: entity.document_id, ...information})"
          >
            Edit Stamp
          </b-button>
        </div>
        <div class="d-flex align-items-center">
          <label class="d-inline-block text-sm-left mr-50">Page</label>
          <b-pagination v-model="page" :total-rows="pages" :per-page="1" align="center" class="my-0" first-number
                        last-number prev-class="prev-item" next-class="next-item"
          />
        </div>
        <div class="d-flex align-items-center">
          <b-button v-if="!jcropActive" size="sm" variant="primary" class="mr-1" @click="initCropper()">
            Insert
          </b-button>
          <b-button v-else size="sm" variant="primary" class="mr-1" @click="removeCropper()">
            remove
          </b-button>
          <b-button size="sm" variant="primary" class="mr-1" @click="previewStamp">
            {{ isPreview ? 'Back to stamp' : 'Preview Stamp' }}
          </b-button>
          <b-button size="sm" variant="primary" class="mr-1" @click="savePositions">
            Apply Stamp
          </b-button>
        </div>
      </div>
      <generic-modal ref="modal" table="document_stamp_information" :definition="document_stamp_information_def"
                     :fetch-data="false" table-definition-key="document_stamp_information"
                     :title="$t('headline~stamp~set_informations')" @reload-table="onInformationSaved"/>
    </b-card>
    <iframe v-if="isPreview" :src="getStampedDocumentPreviewLink(this.entity)"
            style="width: 100%;height: 100vh"></iframe>
    <div v-else id="target" ref="target" class="position-relative" style="display: inline-block">
      <!--      <pdf :src="getDocumentLink(entity)" :page="1">-->
      <!--        <template slot="loading">-->
      <!--          loading content here...-->
      <!--        </template>-->
      <!--      </pdf>-->
      <canvas id="canvas" width="500" height="500"/>
    </div>
  </b-overlay>
</template>

<script>
import {getDocumentLink, getSignImageLink, getStampedDocumentLink, getStampedDocumentPreviewLink,} from '@/libs/utils'
import GenericModal from '@/views/app/Generic/modal'
import {BPagination} from 'bootstrap-vue'
// import pdf from 'pdfvuer'
// import 'pdfjs-dist/build/pdf.worker.entry' // not needed since v1.9.1

class SvgWidget extends Jcrop.Widget {
  init() {
    super.init()
    const img = new Image()
    img.src = this.options.src
    this.el.appendChild(img)
  }
}

export default {
  name: 'SignDocument',
  components: {GenericModal, BPagination},
  data() {
    return {
      entity: this.$route.params.entity || {},
      page: 1,
      pages: 1,
      options: [],
      positions: [],
      information: null,
      src: '',
      width: 0,
      height: 0,
      jcropActive: false,
      loading: false,
      isPreview: false,
      document_stamp_information_def: {
        fields: [
          {key: 'document_stamp_information_id', auto: true},
          'document_stamp_information_sachkonto',
          {key: 'document_stamp_information_sachkonto_nr', type: 'number'},
          'document_stamp_information_brutto',
          'document_stamp_information_brutto_monatlich',
        ],
      },
    }
  },
  computed: {
    activeStamp() {
      return this.positions.find(p => p.document_stamp_page === this.page && !p.delete)
    },
  },
  watch: {
    page(newVal, oldVal) {
      if (oldVal) {
        this.savePosition(oldVal)
      }
      this.loadPage(newVal)
    },
  },
  async mounted() {
    this.prechargeStamp()
  },
  methods: {
    async prechargeStamp() {
      this.loading = true
      try {
        if (!this.entity.document_id) {
          this.entity = await this.$store.dispatch('table/fetchSingleItem', {
            entity: 'frontend_document_list',
            primaryKey: 'document_id',
            id: this.$route.params.id,
          })
        }
        await this.loadImage()

        this.positions = (await this.$api({
          entity: 'document_stamp',
          action: 'read-rich',
          data: [{document_id: this.entity.document_id}],
        })).data.data.data

        this.information = (await this.$api({
          entity: 'document_stamp_information',
          action: 'read-rich',
          data: [{document_id: this.entity.document_id}],
        })).data.data.data[0]

        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js'
        const pdf = await pdfjsLib.getDocument(this.getDocumentLink(this.entity)).promise
        this.pdf = pdf
        this.pages = pdf.numPages
        this.options = [...this.sequenceGenerator(1, this.pages)]
        await this.loadPage(1)
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async previewStamp() {
      if (this.isPreview) {
        await this.loadImage()
        return this.isPreview = false
      } else {
        try {
          await this.savePositions()
          const documentStampLink = this.getStampedDocumentPreviewLink(this.entity)
          this.isPreview = true
          // window.open(documentStampLink, 'document_stamped_preview', 'width=0,height=0,left=-1000,top=-1000')
        } catch (error) {
          console.log({error})
          this.$errorToast(error.message || 'Unknow Error')
        }
      }
    },
    onInformationSaved(entity) {
      this.information = entity
      this.loadImage()
      if (this.jcropActive) this.loadPage(this.page)
    },
    async savePositions() {
      this.loading = true
      this.savePosition(this.page)
      let update = false
      const accessToken = localStorage.getItem('accessToken').split(" ")[1]

      try {
        // to delete
        let data = this.positions.filter(p => p.delete).map(p => ({document_stamp_id: p.document_stamp_id}))
        if (data.length) {
          await this.$api({
            action: 'delete',
            entity: 'document_stamp',
            data,
          })
          this.positions = this.positions.filter(p => !p.delete)
          update = true
        }
        // to update
        data = this.positions.filter(p => p.document_stamp_id && !p.delete)
        if (data.length) {
          await this.$api({
            action: 'update',
            entity: 'document_stamp',
            data,
          })
          update = true
        }
        // to create
        data = this.positions.filter(p => !p.document_stamp_id)
        if (data.length) {
          (await this.$api({
            action: 'create',
            entity: 'document_stamp',
            data,
          })).data.data.data.forEach(result => {
            console.log(result)
            data.find(d => d.document_stamp_page === result[0].document_stamp_page).document_stamp_id = result.document_stamp_id
          })
          update = true
        }
        if (!update) this.$errorToast('There is no changes')
        else {
          (await this.$http.get(`/documents-sign/stamp/${this.entity.document_id}?Authorization=${accessToken}`))
          this.$successToast('Positions saved')
        }
      } catch (e) {
        console.error(e)
        this.$errorToast(e.message || 'Unknow Error')
      } finally {
        this.loading = false
      }
    },
    async loadImage() {

      try {
        const resp = await this.$http.get(this.getSignImageLink(this.entity), {responseType: 'arraybuffer'})
        this.src = `data:${resp.headers['content-type']};base64,${Buffer.from(resp.data).toString('base64')}`
        const {w, h} = await this.getImageDimensions()
        this.width = w
        this.height = h
      } catch (e) {
        this.$errorToast('Impossible to load the stamp image')
        throw e
      }
    },
    async getImageDimensions() {
      return new Promise((resolved, rejected) => {
        const i = new Image()
        i.onload = function () {
          resolved({w: i.width, h: i.height})
        }
        i.src = this.src
      })
    },
    async loadPage(number) {
      const page = await this.pdf.getPage(number)
      let scale = 1
      let viewport = page.getViewport({scale})
      // Full width
      scale = this.$el.clientWidth / viewport.width
      viewport = page.getViewport({scale})

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
      const task = page.render({canvasContext: context, viewport})
      task.promise.then(() => {
        if (this.activeStamp) {
          this.initCropper([(this.activeStamp.document_stamp_position_x * canvas.width) / 100,
            (this.activeStamp.document_stamp_position_y * canvas.height) / 100, (this.activeStamp.document_stamp_width * canvas.width) / 100,
            (this.activeStamp.document_stamp_height * canvas.height) / 100])
        } else if (this.jcrop) {
          this.destroyJcrop()
          this.jcrop = null
          this.jcropActive = false
        }
      })
    },
    savePosition(page) {
      let activeStamp = this.positions.find(p => p.document_stamp_page === page)
      const activeStampIdx = this.positions.findIndex(p => p.document_stamp_page === page)
      if (activeStamp && !this.jcrop) {
        if (!activeStamp.document_stamp_id) this.positions.splice(activeStampIdx, 1)
        else activeStamp.delete = true
        return
      }
      if (this.jcrop) {
        if (!activeStamp) {
          activeStamp = {
            document_id: this.entity.document_id,
            document_stamp_page: page,
          }
          this.positions.push(activeStamp)
        }
        // console.log(this.jcrop.active)
        const canvas = document.getElementById('canvas')
        activeStamp.document_stamp_position_x = 100 * (this.jcrop.active.pos.x / canvas.width)
        activeStamp.document_stamp_position_y = 100 * (this.jcrop.active.pos.y / canvas.height)
        activeStamp.document_stamp_width = 100 * (this.jcrop.active.pos.w / canvas.width)
        activeStamp.document_stamp_height = 100 * (this.jcrop.active.pos.h / canvas.height)
        delete activeStamp.delete
      }
    },
    getDocumentLink,
    getSignImageLink,
    getStampedDocumentLink,
    getStampedDocumentPreviewLink,
    removeCropper() {
      this.jcropActive = false
      this.destroyJcrop()
      this.jcrop = null
      this.savePosition(this.page)
    },
    destroyJcrop() {
      const childrens = Array.from(this.$refs.target.children)
      for (let i = 0; i < childrens.length; i++) {
        const child = childrens[i]
        console.log(child, i)
        if (child.tagName !== 'CANVAS') child.remove()
      }
    },
    initCropper(pos) {
      this.jcropActive = true
      if (this.jcrop) {
        this.jcrop.active.animate(Jcrop.Rect.from(pos), 20, 'inOutCirc')
            .then(() => {
              this.jcrop.focus()
            })
        return
      }
      this.jcrop = Jcrop.attach('target', {
        aspectRatio: this.width / this.height,
        widgetConstructor: SvgWidget,
      })
      const rect = Jcrop.Rect.from(pos || [0, 0, this.width, this.height])
      this.jcrop.newWidget(rect, {src: this.src})
    },
    * sequenceGenerator(minVal, maxVal) {
      let currVal = minVal
      while (currVal <= maxVal) {
        yield currVal++
      }
    },
  },
}
</script>

<style scoped>

</style>

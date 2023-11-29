<script>

import {
  cloneCanvas,
  getDocumentLink,
  getDocumentLinkPreviewWithId,
  getDocumentLinkWithId,
  getSignImageLink,
  getStampedDocumentLink,
  getStampedDocumentPreviewLink,
} from '@/libs/utils'
import Table from '@/table'
import { BPagination } from 'bootstrap-vue'
import GenericModal from '@/views/app/Generic/modal'
import TicketMixin from '@/views/app/Kanban/TicketMixin'

class SvgWidget extends Jcrop.Widget {
  init() {
    super.init()
    const img = new Image()
    img.src = this.options.src
    this.el.appendChild(img)
  }
}

export default {
  name: 'PreviewDocumentWidget',
  components: {
    BPagination,
    GenericModal,
  },
  mixins: [TicketMixin],
  data() {
    return {
      document_name: null,
      documentDef: Table.document,
      jcropActive: false,
      positions: [],
      timeoutToClear: null,
      ticket: null,
      src: '',
      width: 0,
      height: 0,
      loading: true,
      isStampPreview: false,
      isPreviewModalOpen: false,
      page: 1,
      pages: 1,
      options: [],
      information: null,
      isPreview: false,
      document_stamp_information_def: {
        fields: [
          { key: 'document_stamp_information_id', auto: true },
          'document_stamp_information_sachkonto',
          { key: 'document_stamp_information_sachkonto_nr', type: 'number' },
          'document_stamp_information_brutto',
          'document_stamp_information_brutto_monatlich',
        ],
      },
    }
  },
  computed: {
    get_link_document() {
      return this.$store.state.document.previewDocument.document.document_already_stamp ? getStampedDocumentPreviewLink(this.$store.state.document.previewDocument.document) : getDocumentLinkPreviewWithId(this.$store.state.document.previewDocument.document.document_id)
    },
    activeStamp() {
      return this.positions.find(p => p.document_stamp_page === this.page && !p.delete)
    },
    entity() {
      return this.$store.state.document.previewDocument?.document
    },
    canBeStamped() {
      return this.$store.state.document.previewDocument.col_stamp && !this.$store.state.document.previewDocument.document.document_already_stamp
    },
    isDocStamped() {
      return this.$store.state.document.previewDocument.document.document_already_stamp
    },
    isColHasStamp() {
      return this.$store.state.document.previewDocument.col_stamp
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
    this.loading = true
    try {
      if (!this.$route.query.document_id || !this.$route.query.ticket_id) return
      await this.loadTickets({ ticket_id: this.$route.query.ticket_id })
      this.ticket = this.tickets[0]
      if (!this.ticket) return
      let document = this.$store.state?.document?.previewDocument?.document
      if (!document) {
        document = await this.$store.dispatch('table/fetchSingleItem', {
          entity: 'frontend_document_list',
          primaryKey: 'document_id',
          id: this.$route.query.document_id || '',
        })
        this.$store.dispatch('document/createDocumentPreview',
          {
            document,
            ticket_id: this.ticket.ticket_id,
            col_stamp: this.ticket.column_has_stamp,
          })
      }
      if (!document) return
      console.log('this is the data ', this.$store.state.document.previewDocument.document.document_id)
      this.document_name = getDocumentLinkPreviewWithId(this.$store.state.document.previewDocument.document.document_id)
      if (!this.entity.document_id) {
        this.entity = await this.$store.dispatch('table/fetchSingleItem', {
          entity: 'frontend_document_list',
          primaryKey: 'document_id',
          id: this.$route.params.id,
        })
      }
      await this.loadImage()
      this.preChargeStamp()
    } finally {
      this.loading = false
    }
  },
  destroyed() {
    clearTimeout(this.timeoutToClear)
  },
  methods: {
    getSignImageLink,
    getDocumentLink,
    getStampedDocumentLink,
    getStampedDocumentPreviewLink,
    async getImageDimensions() {
      return new Promise(resolved => {
        const i = new Image()
        i.onload = function () {
          resolved({ w: i.width, h: i.height })
        }
        i.src = this.src
      })
    },
    async preChargeStamp() {
      // if (this.$store.state.document.previewDocument.document.document_already_stamp) {
      //   return
      // }
      this.loading = false
      try {
        this.positions = (await this.$api({
          entity: 'document_stamp',
          action: 'read-rich',
          data: [{ document_id: this.entity.document_id }],
        })).data.data.data

        this.information = (await this.$api({
          entity: 'document_stamp_information',
          action: 'read-rich',
          data: [{ document_id: this.entity.document_id }],
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
    openModal() {
      this.$refs.previewDocumentModalRef.show()
    },
    showPreviewModal() {
      this.isPreviewModalOpen = true
      const previewModalWrapper = document.getElementById('preview-modal-wrapper')
      const canvasToPreview = document.getElementById('canvas')
      if (previewModalWrapper && canvasToPreview) {
        previewModalWrapper.childNodes.forEach(node => node.remove())
        const wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'd-inline-block position-relative mx-auto')
        const canvasCopy = cloneCanvas(canvasToPreview)

        wrapper.appendChild(canvasCopy)

        document.getElementById('target')?.childNodes.forEach(node => {
          if (node.id !== 'canvas') {
            wrapper.appendChild(node.cloneNode(true))
          }
        })

        previewModalWrapper.appendChild(wrapper)
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
      this.jcrop.newWidget(rect, { src: this.src })
    },
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
        if (child.tagName !== 'CANVAS') child.remove()
      }
    },
    downloadDocument() {
      window.open(this.isDocStamped ? getStampedDocumentLink(this.$store.state.document.previewDocument.document) : getDocumentLink(this.$store.state.document.previewDocument.document), '_blank')
    },
    async loadImage() {
      try {
        const resp = await this.$http.get(this.getSignImageLink(this.entity), { responseType: 'arraybuffer' })
        this.src = `data:${resp.headers['content-type']};base64,${Buffer.from(resp.data).toString('base64')}`
        const { w, h } = await this.getImageDimensions()
        this.width = w
        this.height = h
      } catch (e) {
        this.$errorToast('Impossible to load the stamp image')
        throw e
      }
    },
    async openStampDocument() {
      this.isPreview = true
      this.initCropper()
      await this.loadImage()
    },
    closeStampDocument() {
      this.removeCropper()
    },
    closeStampDocumentPreview() {
      this.isPreviewModalOpen = false
      this.isStampPreview = false
    },
    prevStamp() {
      this.$router.push({
        name: 'sign-document',
        params: { id: this.$store.state.document.previewDocument.document.document_id, ticket_id: this.$store.state.document.previewDocument.ticket_id, entity: document },
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
    async savePositions() {
      this.loading = true
      this.savePosition(this.page)
      let update = false
      try {
        // to delete
        console.log({ positions: this.positions })
        let data = this.positions.filter(p => p.delete).map(p => ({ document_stamp_id: p.document_stamp_id }))
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
          (await this.$http.get(`/documents-sign/stamp/${this.entity.document_id}`))
          this.$refs.iframeDocPreview.src = this.get_link_document
          this.$successToast('Positions saved')
          this.$store.state.document.previewDocument.document.document_already_stamp = true
          this.jcropActive = false
          this.isStampPreview = false
          this.isPreviewModalOpen = false
          this.isPreview = false
          await this.preChargeStamp()
        }
      } catch (e) {
        console.error(e)
        this.$errorToast(e.message || 'Unknow Error')
      } finally {
        this.loading = false
      }
    },
    async loadPage(number) {
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
    async onInformationSaved(entity) {
      this.information = entity
      this.loadImage()
      clearTimeout(this.timeoutToClear)
      this.destroyJcrop()
      this.jcrop = null
      this.jcropActive = false
      this.loading = true
      this.timeoutToClear = setTimeout(() => {
        const canvas = document.getElementById('canvas')
        if (canvas) {
          this.initCropper([(this.activeStamp.document_stamp_position_x * canvas.width) / 100,
            (this.activeStamp.document_stamp_position_y * canvas.height) / 100, (this.activeStamp.document_stamp_width * canvas.width) / 100,
            (this.activeStamp.document_stamp_height * canvas.height) / 100])
        } else {
          this.initCropper()
        }
        this.loading = false
      }, 1000)
      // if (this.jcropActive) {
      //   this.loadPage(this.page)
      // }
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

<template>
  <b-overlay :show="isPreview && loading">
    <div v-if="$route.query.ticket_id" class="position-relative shadow-lg" style="z-index: 0;">
      <div class="bg-light py-50 rounded-top d-flex justify-content-center align-items-center">
        <div class="header_title d-flex justify-content-between w-100 px-2">
          <router-link v-if="!isPreview" :to="`/app/table/ticket/view/${$route.query.ticket_id}?tab=4`" class="mr-1">
            <b-button v-b-tooltip.hover title="Back to documents" variant="outline-dark" size="sm" class="p-0" style="width: 24px; height: 24px;">
              <feather-icon icon="ArrowLeftIcon" />
            </b-button>
          </router-link>
          <b-button
            v-else
            v-b-tooltip.hover
            title="Close stamp"
            variant="outline-dark"
            size="sm"
            class="p-0 mr-1"
            style="width: 24px; height: 24px;"
            @click="isPreview = false"
          >
            <feather-icon icon="XIcon" />
          </b-button>
          <div class="d-flex align-items-center justify-content-between flex-grow-1">
            <div class="d-flex align-items-center">
              <h5 class="d-inline-block font-weight-bold m-0 mr-50 text-truncate">
                {{ $store.state.document.previewDocument.document.document_name }}
              </h5>
              <b-badge
                v-if="!$store.state.document.previewDocument.col_stamp"
                v-b-tooltip.hover
                title="This document is linked to a ticket that is in a column that has the stamp disabled" variant="warning"
              >
                Unable to be stamped <feather-icon icon="InfoIcon" />
              </b-badge>
              <b-badge
                v-else-if="$store.state.document.previewDocument.document.document_already_stamp" variant="success"
              >
                Stamped <feather-icon icon="CheckIcon" />
              </b-badge>
            </div>
            <div class="d-flex align-items-center text-white" style="gap: 8px">
              <template v-if="!isPreview">
                <b-button variant="light" size="sm" @click="downloadDocument">
                  <feather-icon icon="DownloadCloudIcon"/> Download
                </b-button>
                <b-button v-if="isColHasStamp" variant="dark" size="sm" @click="openStampDocument">
                  <feather-icon icon="FeatherIcon"/> {{ isDocStamped ? 'Update stamp' : 'Stamp' }}
                </b-button>
              </template>
              <template v-else>
                <b-pagination
                  v-if="pdf"
                  v-model="page"
                  :total-rows="pages"
                  :per-page="1"
                  align="center"
                  class="my-0"
                  first-number
                  last-number
                  prev-class="prev-item"
                  next-class="next-item"
                />
                <b-button variant="light" size="sm" @click="isStampPreview = !isStampPreview">
                  <feather-icon :icon=" isStampPreview ? 'EyeOffIcon' : 'EyeIcon'"/> {{ isStampPreview ? "Close preview" : "Preview" }}
                </b-button>
                <b-button v-if="isStampPreview" variant="light" size="sm" @click="showPreviewModal">
                  <feather-icon icon="EyeIcon"/> Preview in modal
                </b-button>
                <b-button variant="warning" size="sm" @click="$refs.modal.openModal(!information,{document_id: entity.document_id, ...information})">
                  <feather-icon icon="Edit2Icon"/> Edit stamp
                </b-button>
                <b-button v-if="jcropActive" variant="danger" size="sm" @click="removeCropper">
                  <feather-icon icon="Trash2Icon"/> Remove stamp
                </b-button>
                <b-button v-else variant="success" size="sm" @click="openStampDocument">
                  <feather-icon icon="PlusIcon"/> Insert stamp
                </b-button>
                <b-button variant="primary" size="sm" @click="savePositions">
                  <feather-icon icon="SaveIcon"/> Save
                </b-button>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div id="document-wrapper" class="d-flex justify-content-center bg-dark border border-secondary" :class="{ isStampPreview }">
        <div v-show="!isPreview" class="document_body_preview">
          <iframe
            ref="iframeDocPreview"
            style="height: 100%; width: 100%; border: 0"
            title="Preview"
            :src="get_link_document"
          />
        </div>
        <div id="target" ref="target" :class="isPreview ? 'd-inline-block' : 'd-none'" class="position-relative mx-auto">
          <canvas id="canvas" width="500" height="500"/>
        </div>
      </div>
      <generic-modal ref="modal" table="document_stamp_information" :definition="document_stamp_information_def"
                     :fetch-data="false" table-definition-key="document_stamp_information"
                     :title="$t('headline~stamp~set_informations')" @reload-table="onInformationSaved"/>
    </div>
    <p v-else>
      Ticket id needed
    </p>
    <div v-show="isPreviewModalOpen" id="preview-modal-wrapper" class="isStampPreview" @click="closeStampDocumentPreview" />
  </b-overlay>
</template>

<style lang="scss">
@import '@/assets/scss/variables/variables';

.header-preview-page {
  height: 80px;
  background: $primary;
  color: #fff;
}
.document_body_preview{
  width: 100%;
  height: calc(100vh - 80px);
}

.isStampPreview {
  .jcrop-shade {
    pointer-events: none;
    opacity: 0!important;
  }
  .jcrop-handle {
    pointer-events: none;
    opacity: 0;
  }
  .jcrop-widget, .jcrop-widget.active {
    pointer-events: none;
    opacity: 1;
  }
}

#preview-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0004;
  z-index: 999;
  overflow-y: auto;
  & > div:first-child {
    position: absolute;
    top: -50%;
    transform: scale(0.5) translateY(50%);
  }
}

</style>

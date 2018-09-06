<template>
  <q-page>
    <q-pull-to-refresh
      pull-message='下拉刷新'
      release-message='释放刷新'
      refresh-message='刷新中......'
      :handler="pullRefresh">
      <template v-if="docDetails.length > 0">
        <q-list link inset-separator>
          <template v-for="(docDetailItem, index) in docDetails">
            <q-item
              v-if="docDetailItem.isFile === 'N'"
              sparse
              :key="docDetailItem.wDXX_MLID + index"
              @click.native="goToDocNextDetail(docDetailItem)">
              <q-item-side
                color="light-blue-4"
                icon="folder" />
              <q-item-main>
                <q-item-tile label>{{ docDetailItem.name }}</q-item-tile>
              </q-item-main>
              <q-item-side
                right
                icon="navigate_next" />
            </q-item>
            <q-item
              v-else
              sparse
              :key="docDetailItem.wDXX_MLID + index" >
              <q-item-side
                color="light-blue-4"
                icon="insert_drive_file" />
              <q-item-main>
                <q-item-tile label>{{ docDetailItem.name }}</q-item-tile>
              </q-item-main>
              <q-item-side
                right
                icon="cloud_download"
                @click.native="downloadFile(docDetailItem)"/>
            </q-item>
          </template>
        </q-list>
      </template>
    </q-pull-to-refresh>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        color="primary"
        fab
        v-back-to-top.animate="{offset: 500, duration: 200}"
        class="animate-pop">
        <q-icon name="keyboard_arrow_up" />
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { documentService } from 'src/api'
import {
  presentAlertButtonYes,
  presentLoading,
  dismissLoading,
  presentNoData
} from 'src/utils/tipstool'

import Emitter from 'src/utils/emitter'
import { mapMutations } from 'vuex'

import { openURL } from 'quasar'

export default {
  name: 'MobileDocumentDetail',
  mixins: [Emitter],
  data() {
    return {
      document: [],
      docDetails: [],
      docDetailSession: [],
      numWdlx: JSON.parse(this.$route.params.transmitData).numWdlx
    }
  },
  created() {
    this.clearQuerytext()
    if (
      Object.prototype.toString.call(
        JSON.parse(this.$route.params.transmitData)
      ) === '[object Object]'
    ) {
      this.$q.localStorage.set(
        'docname',
        JSON.parse(this.$route.params.transmitData).docName
      )
      this.dispatch(
        'TabsLayout',
        'set-page-title',
        JSON.parse(this.$route.params.transmitData).docName
      )
    } else {
      this.dispatch(
        'TabsLayout',
        'set-page-title',
        this.$q.localStorage.get.item('docname')
      )
    }
    this.getDocumentList()
  },
  methods: {
    ...mapMutations(['clearQuerytext', 'updateQuerytext']),
    pullRefresh(done) {
      this.docDetails = []
      this.docDetailSession = []
      this.getDocumentList(done)
    },
    getDocumentList(done) {
      presentLoading()
      let self = this
      documentService
        .getDocumentList(
          JSON.parse(self.$route.params.transmitData).docId,
          '',
          false,
          self.numWdlx
        )
        .then(res => {
          if (res.data.data) {
            self.docDetails = res.data.data
            self.docDetailSession = res.data.data
          } else {
            presentNoData('无文件')
          }
          dismissLoading()
          done && done()
        })
        .catch(err => {
          dismissLoading()
          done && done()
          presentAlertButtonYes('请求出现问题，请稍后重试')
        })
    },
    updateDocumentDetail() {
      this.docDetails = this.docDetailSession
      this.updateQuerytext(this.queryText.toLowerCase().replace(/,|\.|-/g, ' '))
      let queryWords = this.queryText.split(' ').filter(w => !!w.trim().length)
      if (queryWords.length) {
        this.docDetails = this.docDetails.filter(doc => {
          return doc.name.toLowerCase().indexOf(queryWords) > -1
        })
      }
    },
    goToDocNextDetail(docDetail) {
      if (docDetail.isFile !== 'Y') {
        let argu = {
          transmitData: JSON.stringify({
            docName: docDetail.name,
            docId: docDetail.id,
            numWdlx: this.numWdlx
          })
        }
        this.$router.push({
          name: 'mobiledocumentdetail',
          params: argu
        })
      }
    },
    downloadFile(docDetail) {
      presentLoading()
      documentService
        .downloadFile(docDetail, this.numWdlx)
        .then(res => {
          dismissLoading()
          openURL(res.data.host + '/rshare/download_file/' + res.data.path)
        })
        .catch(err => {
          dismissLoading()
          presentAlertButtonYes('请求出现问题，请稍后重试')
        })
    }
  },
  computed: {
    queryText() {
      return this.$store.state.mobile.queryText
    }
  },
  watch: {
    queryText: function() {
      this.updateDocumentDetail()
    },
    $route: {
      handler(to, from) {
        this.pullRefresh()
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

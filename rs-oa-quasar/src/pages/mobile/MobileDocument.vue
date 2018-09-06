<template>
  <q-page>
    <q-pull-to-refresh
      pull-message='下拉刷新'
      release-message='释放刷新'
      refresh-message='刷新中......'
      :handler="pullRefresh">
      <template v-if="documents.length > 0">
        <q-list link inset-separator>
          <q-item
            sparse
            v-for="(documentItem, index) in documents"
            :key="documentItem.wDXX_MLID + index"
            @click.native="goToDocumentDetail(documentItem)">
            <q-item-side color="light-blue-4" icon="folder" />
            <q-item-main>
              <q-item-tile label>{{ documentItem.name }}</q-item-tile>
            </q-item-main>
            <q-item-side right icon="navigate_next" />
          </q-item>
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
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'MobileDocument',
  mixins: [Emitter],
  data() {
    return {
      wdlx: '1',
      // numWdlx: 1,
      // queryText = '',
      documents: [],
      documentSession: []
    }
  },
  created() {
    this.showDocumentTopTab()
    if (
      Object.prototype.toString.call(this.$route.params.pageTitle) ===
      '[object String]'
    ) {
      this.$q.localStorage.set('pageTitle', this.$route.params.pageTitle)
      this.dispatch(
        'TabsLayout',
        'set-page-title',
        this.$route.params.pageTitle
      )
    } else {
      this.dispatch(
        'TabsLayout',
        'set-page-title',
        this.$q.localStorage.get.item('pageTitle')
      )
    }
    this.getDocumentList()
  },
  methods: {
    ...mapMutations([
      'updateQuerytext',
      'showDocumentTopTab',
      'hideDocumentTopTab'
    ]),
    pullRefresh(done) {
      this.documents = []
      this.documentSession = []
      this.getDocumentList(done)
    },
    getDocumentList(done) {
      presentLoading()
      let self = this
      documentService
        .getDocumentList('', '', false, self.numWdlx)
        .then(res => {
          if (res.data.data) {
            self.documents = res.data.data
            self.documentSession = res.data.data
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
    updateDocuments() {
      this.documents = this.documentSession
      this.updateQuerytext(this.queryText.toLowerCase().replace(/,|\.|-/g, ' '))
      let queryWords = this.queryText.split(' ').filter(w => !!w.trim().length)
      if (queryWords.length) {
        this.documents = this.documents.filter(doc => {
          return doc.name.toLowerCase().indexOf(queryWords) > -1
        })
      }
    },
    goToDocumentDetail(documentItem) {
      let argu = {
        transmitData: JSON.stringify({
          docName: documentItem.name,
          docId: documentItem.id,
          numWdlx: this.numWdlx
        })
      }
      this.$router.push({
        name: 'mobiledocumentdetail',
        params: argu
      })
    }
  },
  computed: mapState({
    queryText: state => state.mobile.queryText,
    numWdlx: state => state.mobile.numWdlx
  }),
  watch: {
    queryText: function() {
      this.updateDocuments()
    },
    numWdlx: function() {
      this.pullRefresh()
    }
  },
  destroyed() {
    this.hideDocumentTopTab()
  }
}
</script>

<style lang="stylus" scoped>
</style>

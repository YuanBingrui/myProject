<template>
  <q-page>
    <q-pull-to-refresh
      pull-message='下拉刷新'
      release-message='释放刷新'
      refresh-message='刷新中......'
      :handler="pullRefresh">
      <q-infinite-scroll
        :handler="loadMoreData"
        ref="infiniteScroll"
        :offset="moreOffset"
        inline>
        <template v-if="businesses.length > 0">
          <q-list link inset-separator>
            <q-item
              v-for="(businesseItem, index) in businesses"
              :key="businesseItem.WFAWT_INST + index"
              @click.native="goToBusinessDetail(businesseItem)">
              <q-item-side icon="account_circle" />
              <q-item-main>
                <q-item-tile label>{{ businesseItem.WFDEF_NAME }}</q-item-tile>
                <q-item-tile sublabel>{{ businesseItem.WFAWT_TITLE }}</q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-item-tile stamp>{{ businesseItem.WFAWT_BEGIN | formatDateTime }}</q-item-tile>
              </q-item-side>
            </q-item>
          </q-list>
        </template>
        <div
          v-if="moreDotsBoxShow"
          class="row justify-center" style="margin-bottom: 10px;">
          <q-spinner-dots
            slot="message"
            :size="40"
            v-if="!moreDotsShow" />
          <span
            class="load-more-message"
            v-if="moreDotsShow">
            {{ moreDotsShow }}
          </span>
        </div>
      </q-infinite-scroll>
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
import { businessService } from 'src/api'
import { rowsDataTrimValueProperty } from 'src/utils'
import {
  presentAlertButtonYes,
  presentLoading,
  dismissLoading,
  presentNoData
} from 'src/utils/tipstool'

import Emitter from 'src/utils/emitter'

export default {
  name: 'MobileBusiness',
  mixins: [Emitter],
  data() {
    return {
      businesses: [],
      businessSession: [],
      // queryText: '',
      limit: 10,
      offset: 1,
      sysCount: null,
      moreDotsBoxShow: true,
      moreDotsShow: '',
      moreOffset: 0
    }
  },
  created() {
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
    this.getBusinessList()
  },
  methods: {
    pullRefresh(done) {
      this.getBusinessList(done)
      this.moreDotsShow = ''
      this.moreOffset = 0
    },
    loadMoreData(index, done) {
      this.moreOffset === 0 ? this.getBusinessListMore(done) : done()
    },
    getBusinessList(done) {
      presentLoading()
      let self = this
      self.offset = 1
      self.limit = 10
      businessService
        .getBusinessList(self.limit, self.offset)
        .then(res => {
          if (res.data && res.data.errcode === 0) {
            self.sysCount = res.data.body.userdata['sys.count']
            self.offset = self.offset + 1
            let businessData = rowsDataTrimValueProperty(res.data.body.rows)
            self.businessSession = [].concat(businessData)
            if (businessData.length > 0) {
              self.queryBusinesses()
            } else {
              self.businesses = []
              presentNoData('无数据！')
            }
          } else {
            self.sysCount = 0
            presentAlertButtonYes('请求出现问题，请稍后重试')
          }
          dismissLoading()
          done && done()
        })
        .catch(err => {
          dismissLoading()
          done && done()
          console.log(err)
        })
    },
    getBusinessListMore(done) {
      let self = this
      if (self.businessSession.length < self.sysCount) {
        if (self.sysCount - self.businessSession.length >= 10) {
          self.limit = 10
        } else {
          self.limit = self.sysCount - self.businessSession.length
        }
        businessService
          .getBusinessList(self.limit, self.offset)
          .then(res => {
            if (res.data.errcode === 0) {
              self.offset = self.offset + 1
              let businessData = rowsDataTrimValueProperty(res.data.body.rows)
              self.businessSession = self.businessSession.concat(businessData)
              if (businessData.length > 0) {
                self.queryBusinesses()
              }
            } else {
              self.sysCount = 0
              presentAlertButtonYes('请求出现问题，请稍后重试')
            }
            done && done()
          })
          .catch(err => {
            done && self.$refs.infiniteScroll.stop()
            console.log(err)
          })
      } else if (self.sysCount) {
        self.sysCount > 10
          ? (self.moreDotsShow = '没有更多数据了')
          : (self.moreDotsBoxShow = false)
        self.moreOffset = 0.5
        done && done()
      } else if (self.sysCount === 0) {
        self.moreDotsBoxShow = false
        done && self.$refs.infiniteScroll.stop()
      } else {
        done && done()
      }
    },
    queryBusinesses() {
      if (this.queryText) {
        this.businesses = this.businessSession.filter(business => {
          return (
            business.WFDEF_NAME.toLowerCase().indexOf(this.queryText) > -1 ||
            business.WFAWT_TITLE.toLowerCase().indexOf(this.queryText) > -1
          )
        })
        this.businessSession.length < this.sysCount &&
          this.getBusinessListMore()
      } else {
        this.businesses = this.businessSession
      }
    },
    goToBusinessDetail(business) {
      let argu = {
        business: business
      }
      this.$router.push({
        name: 'mobilebusinessdetail',
        params: argu
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
      this.queryBusinesses()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

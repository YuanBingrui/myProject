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
        <template v-if="thingList.length > 0">
          <q-list link inset-separator>
            <q-item
              v-for="(thingItem, index) in thingList"
              :key="thingItem.SWSQ_SWZT + index"
              @click.native="goToThingDetail(thingItem)">
              <q-item-side icon="border_color" />
              <q-item-main>
                <q-item-tile label class="ellipsis">{{ thingItem.SWSQ_SWZT }}</q-item-tile>
                <q-item-tile sublabel class="ellipsis">{{ thingItem.SWSQ_SQR }}</q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-item-tile stamp>{{ thingItem.SWSQ_SQRQ | formatDateTime }}</q-item-tile>
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
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn
        round
        color="primary"
        @click="addNewThing"
        icon="add" />
    </q-page-sticky>
    <q-modal v-model="thingFilterModal">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn
            color="primary"
            @click="dismissThingModal"
            label="取消" />
          <q-toolbar-title>
            查询条件
          </q-toolbar-title>
          <q-btn
            color="primary"
            @click="applyThingFilters"
            label="保存" />
        </q-toolbar>
        <q-list separator class="q-my-sm">
          <q-list-header>工作流事务</q-list-header>
          <q-item>
            <q-item-side>
              <q-item-tile>待我处理</q-item-tile>
            </q-item-side>
            <q-item-main></q-item-main>
            <q-item-side right>
              <q-radio v-model="filter.wfwork" val="W" />
            </q-item-side>
          </q-item>
          <q-item>
            <q-item-side>
              <q-item-tile>我已处理</q-item-tile>
            </q-item-side>
            <q-item-main></q-item-main>
            <q-item-side right>
              <q-radio v-model="filter.wfwork" val="H" />
            </q-item-side>
          </q-item>
        </q-list>
        <q-list separator class="q-my-sm">
          <q-list-header>工作日期</q-list-header>
          <q-item>
            <q-item-side>
              <q-item-tile>开始时间</q-item-tile>
            </q-item-side>
            <q-item-main>
              <q-datetime
                v-model="filter.qssqrq"
                type="date"
                ok-label="确定"
                cancel-label="取消"
                hide-underline
                align="right" />
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-side>
              <q-item-tile>结束时间</q-item-tile>
            </q-item-side>
            <q-item-main>
              <q-datetime
                v-model="filter.zzsqrq"
                type="date"
                ok-label="确定"
                cancel-label="取消"
                hide-underline
                align="right" />
            </q-item-main>
          </q-item>
        </q-list>
        <div class="q-pa-md">
          <q-btn style="width: 100%" color="primary" @click="reset" label="重置"/>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { thingService } from 'src/api'
import { rowsDataTrimValueProperty } from 'src/utils'

import {
  presentAlertButtonYes,
  presentLoading,
  dismissLoading,
  presentNoData
} from 'src/utils/tipstool'

import Emitter from 'src/utils/emitter'
import { mapState, mapMutations } from 'vuex'

import moment from 'moment'

export default {
  name: 'MobileThing',
  mixins: [Emitter],
  data() {
    return {
      thingList: [],
      thingSession: [],
      // queryText: '',
      sysCount: null,
      limit: 10,
      offset: 1,
      filter: {
        wfwork: 'H', // 初始查询条件：我已处理
        qssqrq: moment()
          .startOf('month')
          .format('YYYY-MM-DD'), // 初始查询条件：从月初
        zzsqrq: moment()
          .endOf('month')
          .format('YYYY-MM-DD') // 初始查询条件：到月末
      },
      moreDotsBoxShow: true,
      moreDotsShow: '',
      moreOffset: 0
      // thingFilterModal: false
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
    this.$q.localStorage.has('thingFilter') &&
      (this.filter = JSON.parse(this.$q.localStorage.get.item('thingFilter')))
    this.getThingList()
  },
  methods: {
    ...mapMutations(['changeThingFilterModalShow']),
    pullRefresh(done) {
      this.getThingList(done)
      this.moreDotsShow = ''
      this.moreOffset = 0
      this.sysCount = null
      this.logListSession = []
    },
    loadMoreData(index, done) {
      this.moreOffset === 0 ? this.getThingListMore(done) : done()
    },
    getThingList(done) {
      presentLoading()
      let self = this
      self.offset = 1
      self.limit = 10
      thingService
        .getThingList(
          self.limit,
          self.offset,
          self.filter.wfwork,
          moment(self.filter.qssqrq).format('YYYY-MM-DD'),
          moment(self.filter.zzsqrq).format('YYYY-MM-DD')
        )
        .then(res => {
          if (res.data && 0 === res.data.errcode) {
            self.sysCount = res.data.body.userdata['sys.count']
            self.offset = self.offset + 1
            let thingData = rowsDataTrimValueProperty(res.data.body.rows)
            self.thingSession = [].concat(thingData)
            if (thingData.length > 0) {
              self.queryThing()
            } else {
              self.thingList = []
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
    getThingListMore(done) {
      let self = this
      if (self.thingSession.length < self.sysCount) {
        if (self.sysCount - self.thingSession.length >= 10) {
          self.limit = 10
        } else {
          self.limit = self.sysCount - self.thingSession.length
        }
        thingService
          .getThingList(
            self.limit,
            self.offset,
            self.filter.wfwork,
            moment(self.filter.qssqrq).format('YYYY-MM-DD'),
            moment(self.filter.zzsqrq).format('YYYY-MM-DD')
          )
          .then(res => {
            console.log(res)
            if (res.data && res.data.errcode === 0) {
              self.offset = self.offset + 1
              let thingData = rowsDataTrimValueProperty(res.data.body.rows)
              self.thingSession = self.thingSession.concat(thingData)
              if (thingData.length > 0) {
                self.queryThing()
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
    queryThing() {
      if (this.queryText) {
        this.thingList = this.thingSession.filter(oneThing => {
          return oneThing.SWSQ_SWZT.toLowerCase().indexOf(this.queryText) > -1
        })
        this.thingSession.length < this.sysCount && this.getThingListMore()
      } else {
        this.thingList = this.thingSession
      }
    },
    goToThingDetail(onething) {
      let argu = {
        onething: { action: 'readOnly', data: onething }
      }
      this.$router.push({
        name: 'mobilethingdetail',
        params: argu
      })
    },
    addNewThing() {
      let argu = {
        onething: { action: 'insert', data: '' }
      }
      this.$router.push({
        name: 'mobilethingdetail',
        params: argu
      })
    },
    // presentThingFilter() {
    //   this.thingFilterModal = true
    // },
    applyThingFilters() {
      this.$q.localStorage.set('thingFilter', JSON.stringify(this.filter))
      this.pullRefresh()
      this.changeThingFilterModalShow(false)
      // this.thingFilterModal = false
    },
    dismissThingModal() {
      this.changeThingFilterModalShow(false)
    },
    reset() {
      this.filter = {
        wfwork: 'H',
        qssqrq: moment()
          .startOf('month')
          .format('YYYY-MM-DD'),
        zzsqrq: moment()
          .endOf('month')
          .format('YYYY-MM-DD')
      }
      this.$q.localStorage.has('thingFilter') &&
        this.$q.localStorage.remove('thingFilter')
    }
  },
  computed: mapState({
    queryText: state => state.mobile.queryText,
    thingFilterModal: state => state.mobile.thingFilterModal
  }),
  watch: {
    queryText: function() {
      this.queryThing()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

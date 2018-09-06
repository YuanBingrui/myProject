<template>
  <q-layout>
    <q-layout-header reveal>
      <q-toolbar>
        <q-btn
          flat round dense
          icon="navigate_before"
          size="lg"
          v-if="!bottomTabIsShow"
          @click="backBefore" />
        <q-toolbar-title>
          {{ pageHeader }}
          <q-chip
            small
            color="positive"
            v-if="worklogSysCount && pageHeader === '工作日志'">
            {{ worklogSysCount }}
          </q-chip>
        </q-toolbar-title>
        <q-btn
          flat round dense
          icon="filter_list"
          v-if="pageHeader === '工作日志'"
          @click="presentLogFilter" />
        <q-btn
          flat round dense
          icon="filter_list"
          v-if="pageHeader === '事务申请'"
          @click="presentThingFilter" />
      </q-toolbar>
      <div
        v-if="searchIsShow"
        class="search-container">
        <div class="search-box">
          <q-search
            :value="queryText"
            @input="commitSearch"
            class="search-input-box"
            clearable />
        </div>
      </div>
      <div v-if="todoTabIsShow" class="top-tab-bar">
        <q-btn
          size="sm"
          class="top-tab-btn"
          label="类别"
          @click="topTabHandler('myType')" />
        <q-btn
          size="sm"
          class="top-tab-btn"
          label="时段"
          @click="topTabHandler('myDays')" />
      </div>
      <div v-if="documentTabIsShow" class="top-tab-bar">
        <q-btn
          size="sm"
          class="top-tab-doc-btn"
          :class="{ active: numWdlx === 1 }"
          label="普通文档"
          @click="selectDocType(1)" />
        <q-btn
          size="sm"
          class="top-tab-doc-btn"
          :class="{ active: numWdlx === 2 }"
          label="业务文档"
          @click="selectDocType(2)" />
      </div>
    </q-layout-header>
    <q-page-container>
      <transition
        :enter-active-class="moveFrom"
        :leave-active-class="moveTo">
        <router-view />
      </transition>
    </q-page-container>
    <q-layout-footer v-if="bottomTabIsShow" reveal>
      <mobile-tabs :tab-btn-list="tabBtnList"></mobile-tabs>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import MobileTabs from 'components/mobile/MobileTabs'
import { tabBtnList, todoTimeOptions, showSearchPages } from 'src/utils'

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'TabsLayout',
  components: {
    MobileTabs
  },
  data() {
    return {
      t: null,
      pageHeader: '',
      tabBtnList: tabBtnList,
      selectedOption: ''
    }
  },
  created() {
    this.$on('set-page-title', this.setHeaderTitle)
  },
  computed: mapState({
    queryText: state => state.mobile.queryText,
    searchIsShow: state => state.mobile.searchIsShow,
    worklogSysCount: state => state.mobile.worklogSysCount,
    todoTabIsShow: state => state.mobile.todoTabIsShow,
    documentTabIsShow: state => state.mobile.documentTabIsShow,
    todoFilter: state => state.mobile.todoFilter,
    todoTypes: state => state.mobile.todoTypes,
    numWdlx: state => state.mobile.numWdlx,
    bottomTabIsShow: state => state.mobile.bottomTabIsShow,
    moveFrom: state => state.mobile.moveFrom,
    moveTo: state => state.mobile.moveTo
  }),
  watch: {
    $route: function(to, from) {
      if (showSearchPages.hasOwnProperty(to.name)) {
        this.clearQuerytext()
        this.showSearchInput()
      } else {
        this.hideSearchInput()
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateQuerytext',
      'showSearchInput',
      'clearQuerytext',
      'hideSearchInput',
      'changeWorklogFilterModalShow',
      'changeThingFilterModalShow',
      'updateTodoFilter',
      'changeNumWdlxValue',
      'setPageAnimation'
    ]),
    setHeaderTitle(tabName) {
      this.pageHeader = tabName
    },
    backBefore() {
      this.setPageAnimation('leave')
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push({ name: 'mobilehome' })
      this.t = setTimeout(() => {
        this.setPageAnimation('enter')
      }, 0)
    },
    commitSearch(event) {
      this.updateQuerytext(event)
    },
    presentLogFilter() {
      this.changeWorklogFilterModalShow(true)
    },
    presentThingFilter() {
      this.changeThingFilterModalShow(true)
    },
    topTabHandler(type) {
      this.selectedOption = this.todoFilter[type]
      this.$q
        .dialog({
          options: {
            type: 'radio',
            model: this.selectedOption,
            items: type === 'myType' ? this.todoTypes : todoTimeOptions
          },
          ok: '确认',
          cancel: '取消',
          preventClose: true
        })
        .then(data => {
          this.updateTodoFilter({ type: type, data: data })
          this.$q.localStorage.set(
            'rshareTodoFilter',
            JSON.stringify({ type: type, data: data })
          )
        })
        .catch(() => {
          console.log('dismiss')
        })
    },
    selectDocType(event) {
      this.changeNumWdlxValue(event)
    }
  },
  destroyed() {
    this.t && clearTimeout(this.t)
  }
}
</script>

<style lang="stylus" scoped>
.moveToLeft
  animation moveToLeft .4s ease
.moveFromLeft
  animation moveFromLeft .4s ease
.moveToRight
  animation moveToRight .4s ease
.moveFromRight
  animation moveFromRight .4s ease
@keyframes moveToLeft
  to
    transform translateX(-100%)
@keyframes moveFromLeft
  from
    transform translateX(-100%)
@keyframes moveToRight
  to 
    transform translateX(100%)
@keyframes moveFromRight
  from 
    transform translateX(100%)
.search-container
  width 100%
  background-color #f2f2f2
  padding 5px
  .search-box
    border-radius 10px
    background-color #fff
    padding 0 5px
    .search-input-box
      height 30px
      display flex
    .q-if
      padding-bottom 2px
      min-height 30px
    .q-if:before, .q-if:after
      background #fff
.top-tab-bar
  display flex
  align-items center
  justify-content space-around
  width 100%
  padding 0 5px 5px 5px
  background-color #f2f2f2
  .top-tab-btn
    width 46%
    background-color #fff
    color #38adff
  .top-tab-doc-btn
    width 46%
    background-color #fff
    color #4fc3f7
  .active
    background-color #4fc3f7
    color #fff
</style>

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
        <template v-if="todoList.length > 0">
          <q-list link inset-separator>
            <q-item
              v-for="(todoItem, index) in todoList"
              :key="todoItem.WFAWT_INST + index"
              @click.native="goToTodoDetail(todoItem)">
              <q-item-side icon="list" />
              <q-item-main>
                <q-item-tile label>{{ todoItem.WFDEF_NAME }}</q-item-tile>
                <q-item-tile sublabel>{{ todoItem.WFAWT_TITLE }}</q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-item-tile stamp>{{ todoItem.WFAWT_BEGIN | formatDateTime }}</q-item-tile>
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
import { todoService } from 'src/api'
import { rowsDataTrimValueProperty } from 'src/utils'

import {
  presentAlertButtonYes,
  presentLoading,
  dismissLoading,
  presentNoData
} from 'src/utils/tipstool'

import Emitter from 'src/utils/emitter'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PageMobileTodo',
  mixins: [Emitter],
  data() {
    return {
      todoList: [],
      todoSession: [],
      // queryText: '',
      limit: 10,
      offset: 1,
      sysCount: null,
      // filter: {
      //   myType: 'ALL',
      //   myDays: 'ALL'
      // },
      // todoTypes: [],
      moreDotsBoxShow: true,
      moreDotsShow: '',
      moreOffset: 0
    }
  },
  created() {
    this.showTodoTopTab()
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
    this.getTodoTypes()
  },
  methods: {
    ...mapMutations([
      'showTodoTopTab',
      'hideTodoTopTab',
      'updateTodoTypes',
      'updateTodoFilter'
    ]),
    pullRefresh(done) {
      this.getTodoList(done)
      this.moreDotsShow = ''
      this.moreOffset = 0
      this.sysCount = null
      this.todoSession = []
    },
    loadMoreData(index, done) {
      this.moreOffset === 0 ? this.getTodoListMore(done) : done()
    },
    getTodoTypes() {
      let self = this
      todoService
        .getTodoTypes()
        .then(res => {
          if (res.data && res.data.body === undefined) {
            // self.todoTypes = [
            //   {
            //     type: '类别',
            //     wFAWT_WFID: 'ALL',
            //     wFDEF_NAME: '全部工作流'
            //   }
            // ]
            self.updateTodoTypes({
              value: 'ALL',
              label: '全部工作流'
            })
          } else {
            // self.todoTypes = [].concat(res.data.body)
            self.updateTodoTypes(
              res.data.body.map(currentValue => ({
                label: currentValue.wFDEF_NAME,
                value: currentValue.wFAWT_WFID
              }))
            )
            if (self.$q.localStorage.has('rshareTodoFilter')) {
              if (self.$q.localStorage.get.item('rshareTodoFilter')) {
                // self.filter = JSON.parse(
                //   self.$q.localStorage.get.item('rshareTodoFilter')
                // )
                self.updateTodoFilter(
                  JSON.parse(self.$q.localStorage.get.item('rshareTodoFilter'))
                )
                let a = self.todoTypes.filter(
                  one => one.wFAWT_WFID === self.filter.myType
                )
                if (a.length === 0) {
                  // self.filter = {
                  //   myType: 'ALL',
                  //   myDays: 'ALL'
                  // }
                  self.updateTodoFilter({
                    myType: 'ALL',
                    myDays: 'ALL'
                  })
                }
              }
              self.getTodoList()
            } else {
              self.getTodoList()
            }
          }
        })
        .catch(err => {
          self.sysCount = 0
          presentAlertButtonYes(err)
          console.log(err)
        })
    },
    getTodoList(done) {
      presentLoading()
      let self = this
      self.offset = 1
      self.limit = 10
      todoService
        .getTodoList(self.limit, self.offset, self.filter)
        .then(res => {
          if (res.data && res.data.errcode === 0) {
            self.sysCount = res.data.body.userdata['sys.count']
            self.offset = self.offset + 1
            let todoData = rowsDataTrimValueProperty(res.data.body.rows)
            self.todoSession = [].concat(todoData)
            if (todoData.length > 0) {
              self.queryTodos()
            } else {
              self.todoList = []
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
    getTodoListMore(done) {
      let self = this
      if (self.todoSession.length < self.sysCount) {
        if (self.sysCount - self.todoSession.length >= 10) {
          self.limit = 10
        } else {
          self.limit = self.sysCount - self.todoSession.length
        }
        todoService
          .getTodoList(self.limit, self.offset, self.filter)
          .then(res => {
            if (res.data && res.data.errcode === 0) {
              self.offset = self.offset + 1
              let todoData = rowsDataTrimValueProperty(res.data.body.rows)
              self.todoSession = self.todoSession.concat(todoData)
              if (todoData.length > 0) {
                self.queryTodos()
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
    queryTodos() {
      let self = this
      if (self.queryText) {
        self.todoList = self.todoSession.filter(todo => {
          return (
            todo.WFDEF_NAME.toLowerCase().indexOf(self.queryText) > -1 ||
            todo.WFAWT_TITLE.toLowerCase().indexOf(self.queryText) > -1
          )
        })
        if (self.todoSession.length < self.sysCount) {
          self.getTodoListMore()
        }
      } else {
        self.todoList = self.todoSession
      }
    },
    goToTodoDetail(todoItem) {
      let argu = {
        todo: todoItem
      }
      this.$router.push({
        name: 'mobiletododetail',
        params: argu
      })
    }
  },
  computed: mapState({
    queryText: state => state.mobile.queryText,
    filter: state => state.mobile.todoFilter,
    todoTypes: state => state.mobile.todoTypes
  }),
  watch: {
    queryText: function() {
      this.queryTodos()
    },
    filter: {
      handler(newVal) {
        this.pullRefresh()
      },
      deep: true
    }
  },
  destroyed() {
    this.hideTodoTopTab()
  }
}
</script>

<style lang="stylus" scoped>
</style>

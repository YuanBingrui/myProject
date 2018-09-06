<template>
  <q-page class="bg">
    <div class="menu-btn-box-list">
      <template v-for="(menuBtnItem, index) in menuBtnList">
        <q-card
          flat
          class="menu-btn-box-item"
          v-if="!menuBtnItem.isUnShow"
          :key="menuBtnItem.id">
          <q-card-main 
            class="column q-pa-none"
            @click.native="menuBtnEvent(index)">
            <q-icon
              :name="menuBtnItem.iconName"
              :class="menuBtnItem.iconColor" />
            <p class="caption">{{ menuBtnItem.name }}</p>
          </q-card-main>
        </q-card>
      </template>
    </div>
    <q-card class="q-mt-sm" style="background: #fff">
      <q-list highlight>
        <q-list-header>待办事宜</q-list-header>
        <q-item
          v-for="todo of todoList"
          :key="todo.WFAWT_INST"
          @click.native="goToTodoDetail(todo)">
          <q-item-side icon="list" />
          <q-item-main>
            <h5 class="q-my-none">{{todo.WFDEF_NAME}}</h5>
            <p class="q-my-none ellipsis" style="color:#666;font-size:0.9rem;">{{todo.WFAWT_TITLE}}</p>
          </q-item-main>
          <q-item-side right>{{todo.WFAWT_BEGIN | formatDateTime}}</q-item-side>
        </q-item>
      </q-list>
    </q-card>
    <!-- <q-card class="q-mt-sm">
      <div>Registration ID: {{ registrationID }}</div>
    </q-card> -->
  </q-page>
</template>

<script>
import { loginService, todoService } from 'src/api'
import { menuBtnList, rowsDataTrimValueProperty } from 'src/utils'

import { mapMutations } from 'vuex'

const RSHARE_WORKLOG_AUTHORITYID = '170020001'
const RSHARE_THING_AUTHORITYID = '220040012'

export default {
  name: 'PageMobileHome',
  data() {
    return {
      menuBtnList: menuBtnList,
      registrationID: '',
      todoList: []
    }
  },
  created() {
    this.showBottomTab()
    this.getAuthority()
    if (this.$q.platform.is.cordova) {
      this.onDeviceReady()
    }
    this.getMyTodoList()
  },
  methods: {
    ...mapMutations(['showBottomTab', 'hideBottomTab']),
    onDeviceReady() {
      const _this = this

      var getRegistrationID = function() {
        window.JPush.getRegistrationID(onGetRegistrationID)
      }

      var onGetRegistrationID = function(data) {
        try {
          console.log('JPushPlugin:registrationID is ' + data)

          if (data.length == 0) {
            var t1 = window.setTimeout(getRegistrationID, 1000)
          }
          _this.registrationID = data
        } catch (exception) {
          console.log(exception)
        }
      }

      var initiateUI = function() {
        try {
          window.JPush.init()
          window.JPush.setDebugMode(true)
          window.setTimeout(getRegistrationID, 1000)
          if (device.platform != 'Android') {
            window.JPush.setApplicationIconBadgeNumber(0)
          }
        } catch (exception) {
          console.log(exception)
        }
      }

      initiateUI()
    },
    getAuthority() {
      let _self = this
      loginService
        .getAuthority()
        .then(res => {
          if (res.data && res.data.errcode === 0) {
            let authority = res.data.body
            if (authority !== '') {
              let a = ',' + authority + ','
              let b = ',' + RSHARE_WORKLOG_AUTHORITYID + ','
              let c = ',' + RSHARE_THING_AUTHORITYID + ','
              a.indexOf(b) > -1 && _self.checkAuthority('GZRZ')
              a.indexOf(c) > 0 && _self.checkAuthority('SWSQ')
            }
          } else {
            _self.$q.notify('获取权限失败，请退出重新登录')
          }
        })
        .catch(() => {
          console.log('error occurs while getting authority')
        })
    },
    checkAuthority(typeId) {
      this.menuBtnList.forEach((currentValue, index) => {
        currentValue.id === typeId && (currentValue.isUnShow = false)
      })
    },
    getMyTodoList() {
      let self = this

      todoService
        .getTodoList(3, 1)
        .then(response => {
          const data = response.data
          if (data && data.body && data.body.rows) {
            self.todoList = rowsDataTrimValueProperty(data.body.rows)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    menuBtnEvent(index) {
      this.hideBottomTab()
      if (this.menuBtnList[index].id === 'TCDL') {
        this.Logout(this.menuBtnList[index].routerTo)
        return
      }
      this.$router.push(this.menuBtnList[index].routerTo)
    },
    Logout(routerTo) {
      this.$q
        .dialog({
          message: '确定要退出吗？',
          ok: '确定',
          cancel: '取消'
        })
        .then(() => {
          loginService
            .logout()
            .then(response => {
              if (response.data && 0 === response.data.errcode) {
                this.$q.localStorage.remove('loginData')
                this.$router.replace({ name: routerTo })
              } else {
                this.$q.notify('退出失败，请重试！')
              }
            })
            .catch(err => {
              console.log('logout error: ', err)
            })
        })
        .catch(() => {
          console.log('cancel')
        })
    },
    goToTodoDetail(todo) {
      this.hideBottomTab()
      let argu = {
        todo: todo
      }
      this.$router.push({
        name: 'mobiletododetail',
        params: argu
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.bg
  background $pagebg
.q-icon
  font-size 40px
.caption
  text-align center
.q-list-header
  font-weight bold
.menu-btn-box-list
  width 100%
  margin 0 auto
  background #fff
  padding 0.5rem
  display flex
  flex-flow row wrap
  align-content flex-start
  .menu-btn-box-item
    flex 0 0 25%
    box-sizing border-box
    .q-card-main
      border-radius 10%
      &:active
        background: #f2f2f2
</style>

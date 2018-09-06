<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar color="primary">
        <q-toolbar-title>用户登录</q-toolbar-title>
        <q-btn
          flat round dense
          icon="settings"
          @click="settingServer" />
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <q-page class="q-px-sm">
        <div class="logo-container relative-position">
          <img class="logo absolute-center" src="~assets/logo.png">
        </div>
        <div class="login-form">
          <q-select 
            class="q-my-md"
            v-model="loginInfo.server"
            :options="serverOptions"
            stack-label="服务器" />
          <q-input
            class="q-my-md"
            v-model="loginInfo.corpid"
            @blur="submittedc = true"
            stack-label="企业编码" />
          <p
            class="error-alert"
            v-if="$v.loginInfo.corpid.between && submittedc === true">
            企业编码1到20个字符!
          </p>
          <q-input
            class="q-my-md"
            v-model="loginInfo.userid"
            @blur="submittedu = true"
            stack-label="用户名" />
          <p
            class="error-alert"
            v-if="$v.loginInfo.userid.between && submittedu === true">
            用户名4到20个字符！
          </p>
          <q-input
            class="q-my-md"
            v-model="loginInfo.password"
            @blur="submittedp = true"
            type="password"
            stack-label="密码" />
          <p
            class="error-alert"
            v-if="$v.loginInfo.password.between && submittedp === true">
            密码1到16位字符！
          </p>
        </div>
        <q-btn
          class="full-width q-my-md"
          color="primary"
          label="登陆"
          @click="mobileLogin" />
        <p
          class="error-alert"
          v-if="loginInfo.errorMessage">
          {{ loginInfo.errorMessage }}
        </p>
      </q-page>
    </q-page-container>
    <q-modal v-model="serverModal">
      <q-modal-layout class="server-modal-bg">
        <q-toolbar slot="header">
          <q-btn
            color="primary"
            @click="serverModal = false"
            label="取消" />
          <q-toolbar-title>
            设置服务器
          </q-toolbar-title>
          <q-btn
            color="primary"
            @click="saveServer"
            label="保存" />
        </q-toolbar>
        <div class="list-box">
          <q-list dense>
            <q-item>
              <q-item-main
                :label="defaultServer.label"
                :sublabel="defaultServer.value" />
            </q-item>
          </q-list>
        </div>
        <div
          class="list-box"
          v-if="userServerList.length || addServerList.length">
          <q-list inset-separator>
            <q-item
              v-for="userServerItem in userServerList"
              :key="userServerItem.label">
              <q-item-main
                :label="userServerItem.label"
                :sublabel="userServerItem.value" />
              <q-item-side right>
                <q-btn
                  flat round dense
                  icon="edit"
                  color="warning"
                  @click="editServer(userServerItem)" />
                <q-btn
                  flat round dense
                  icon="delete"
                  color="negative"
                  @click="deleteServer(userServerItem)" />
              </q-item-side>
            </q-item>
            <q-item
              v-for="addServerItem in addServerList"
              :key="addServerItem.label">
              <q-item-main
                :label="addServerItem.label"
                :sublabel="addServerItem.value" />
                <q-item-side right>
                  <q-btn
                    flat round dense
                    icon="edit"
                    color="warning"
                    @click="editServer" />
                  <q-btn
                    flat round dense
                    icon="delete"
                    color="negative"
                    @click="deleteServer" />
                </q-item-side>
            </q-item>
          </q-list>
        </div>
        <q-btn
          round
          color="primary"
          @click="addServer"
          class="fixed"
          icon="add"
          style="left: 18px; bottom: 18px" />
      </q-modal-layout>
    </q-modal>
    <q-modal
      v-model="addServerModal"
      minimized
      no-backdrop-dismiss>
      <div class="server-modal-header">{{ modalTitle }}</div>
      <div class="server-modal-content">
        <q-input
          v-model="userServerInfo.label"
          placeholder="请输入服务器名称" />
        <q-input
          v-model="userServerInfo.value"
          placeholder="请输入服务器地址" />
      </div>
      <div class="server-modal-footer row">
        <q-btn @click="addServerModal = false" label="取消" />
        <q-btn @click="addServerConfirm" label="确定" />
      </div>
    </q-modal>
  </q-layout>
</template>

<script>
import { loginService } from 'src/api'
import { required, url, between } from 'vuelidate/lib/validators'

export default {
  name: 'PageMobileLogin',
  data() {
    return {
      defaultServer: {
        label: '罗想OA',
        value: 'https://oa.roadshare.com/rshare/'
      },
      serverOptions: [],
      loginInfo: {
        server: 'https://oa.roadshare.com/rshare/',
        corpid: 'rs',
        userid: '',
        password: '',
        errorMessage: ''
      },
      submittedc: false,
      submittedu: false,
      submittedp: false,
      userServerInfo: {
        label: '',
        value: ''
      },
      tempEditServerInfo: {},
      userServerList: [],
      addServerList: [],
      serverModal: false,
      addServerModal: false,
      modalTitle: ''
    }
  },
  validations: {
    userServerInfo: {
      label: { required },
      value: { required, url }
    },
    loginInfo: {
      server: { required },
      corpid: {
        required,
        between: between(1, 20)
      },
      userid: {
        required,
        between: between(4, 20)
      },
      password: {
        required,
        between: between(1, 16)
      }
    }
  },
  created() {
    this.initServerInfo()
  },
  methods: {
    initServerInfo() {
      this.serverOptions = []
      this.serverOptions.push(this.defaultServer)
      this.$q.localStorage.has('userServerList') &&
        (this.serverOptions = this.serverOptions.concat(
          JSON.parse(this.$q.localStorage.get.item('userServerList'))
        ))
    },
    mobileLogin() {
      const self = this
      self.submittedc = true
      self.submittedu = true
      self.submittedp = true
      self.$v.loginInfo.$touch()
      if (this.$v.loginInfo.$error) {
        loginService
          .login(self.loginInfo)
          .then(res => {
            if (res.data.errcode === 0) {
              this.$q.localStorage.set(
                'loginData',
                JSON.stringify(self.loginInfo)
              )
              self.$router.push({
                name: 'mobilehome'
              })
            } else {
              self.loginInfo.errorMessage = self.formatErrorMessage(
                res.data.desc
              )
            }
          })
          .catch(error => {
            self.$q.notify({
              message: error,
              position: 'center'
            })
          })
      }
    },
    formatErrorMessage(message) {
      return message ? message.replace('1^', '').replace('2^', '') : '未知错误'
    },
    settingServer() {
      this.addServerList = []
      this.$q.localStorage.has('userServerList') &&
        (this.userServerList = JSON.parse(
          this.$q.localStorage.get.item('userServerList')
        ))
      this.serverModal = true
    },
    saveServer() {
      this.$q.localStorage.set(
        'userServerList',
        JSON.stringify(this.userServerList.concat(this.addServerList))
      )
      this.initServerInfo()
      this.serverModal = false
    },
    addServer() {
      this.modalTitle = '新增服务'
      this.userServerInfo.label = ''
      this.userServerInfo.value = ''
      this.addServerModal = true
    },
    addServerConfirm() {
      if (this.modalTitle === '新增服务') {
        this.addServerRun()
      } else if (this.modalTitle === '修改服务') {
        this.editServerRun()
      }
    },
    addServerRun() {
      let errorMessage
      this.$v.userServerInfo.$touch()
      if (this.$v.userServerInfo.$error) {
        if (
          !this.$v.userServerInfo.label.required ||
          !this.$v.userServerInfo.value.required
        ) {
          errorMessage = '服务器名称和地址不能为空'
        } else if (!this.$v.userServerInfo.value.url) {
          errorMessage = '请输入正确的服务器地址'
        }
        this.$q.notify(errorMessage)
        return
      } else if (this.checkServerExist(this.userServerInfo, 'label')) {
        errorMessage = '该服务器名称已存在'
        this.$q.notify(errorMessage)
        return
      } else if (this.checkServerExist(this.userServerInfo, 'value')) {
        errorMessage = '该服务器地址已存在'
        this.$q.notify(errorMessage)
        return
      }
      this.addServerList.push(JSON.parse(JSON.stringify(this.userServerInfo)))
      this.addServerModal = false
    },
    editServer(event) {
      this.modalTitle = '修改服务'
      this.tempEditServerInfo = JSON.parse(JSON.stringify(event))
      this.userServerInfo.label = event.label
      this.userServerInfo.value = event.value
      this.addServerModal = true
    },
    editServerRun() {
      if (this.userServerInfo.label !== this.tempEditServerInfo.label) {
        let errorMessage
        this.$v.userServerInfo.$touch()
        if (this.$v.userServerInfo.$error) {
          if (!this.$v.userServerInfo.label.required) {
            errorMessage = '服务器名称不能为空'
          }
          this.$q.notify(errorMessage)
          return
        } else if (this.checkServerExist(this.userServerInfo, 'label')) {
          errorMessage = '该服务器名称已存在'
          this.$q.notify(errorMessage)
          return
        } else {
          this.userServerList
            .filter(a => a.label === this.tempEditServerInfo.label)
            .map(b => (b.label = this.userServerInfo.label))
          this.addServerList
            .filter(e => e.label === this.tempEditServerInfo.label)
            .map(f => (f.label = this.userServerInfo.label))
        }
      } else if (this.userServerInfo.value !== this.tempEditServerInfo.value) {
        let errorMessage
        this.$v.userServerInfo.$touch()
        if (this.$v.userServerInfo.$error) {
          if (!this.$v.userServerInfo.value.required) {
            errorMessage = '服务器地址不能为空'
          } else if (!this.$v.userServerInfo.value.url) {
            errorMessage = '请输入正确的服务器地址'
          }
          this.$q.notify(errorMessage)
          return
        } else if (this.checkServerExist(this.userServerInfo, 'value')) {
          errorMessage = '该服务器地址已存在'
          this.$q.notify(errorMessage)
          return
        } else {
          this.userServerList
            .filter(c => c.value === this.tempEditServerInfo.value)
            .map(d => (d.value = this.userServerInfo.value))
          this.addServerList
            .filter(g => g.value === this.tempEditServerInfo.value)
            .map(h => (h.value = this.userServerInfo.value))
        }
      }
      this.addServerModal = false
    },
    checkServerExist(data, type) {
      if (
        this.addServerList.filter(one => one[type] === data[type]).length !==
          0 ||
        this.userServerList.filter(oneUser => oneUser[type] === data[type])
          .length !== 0 ||
        this.defaultServer[type] === data[type]
      ) {
        return true
      }
    },
    deleteServer(event) {
      this.$q
        .dialog({
          message: '确定删除此服务器信息',
          ok: '确定',
          cancel: '取消'
        })
        .then(() => {
          let userIndex = this.userServerList.indexOf(event)
          let addIndex = this.addServerList.indexOf(event)
          if (userIndex > -1) {
            this.userServerList.splice(userIndex, 1)
          } else if (addIndex > -1) {
            this.addServerList.splice(addIndex, 1)
          } else {
            console.log('error deleting')
          }
        })
        .catch(() => {
          console.log('dismiss')
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.logo-container
  height 120px
.logo
  height 120px
  width 120px
.error-alert
  color red
  font-size 0.7rem
  margin 0
.server-modal-bg
  background $pagebg
.server-modal-header
  text-align center
  padding 10px 16px 21px
  font-size 1.3rem
  font-weight 500
  color $primary
.server-modal-content
  padding 10px 16px 21px
  color black
  max-height 240px
  overflow auto
  -webkit-overflow-scrolling touch
  will-change scroll-position
  .q-input
    margin-bottom 10px
.server-modal-footer
  border-top 1px solid #bdbdbd
  color $primary
  .q-btn
    flex 1 1 auto
    font-size 110%
    margin 0
    padding 1rem
    border-radius 0
    &:last-child
      font-weight bold
  &.row
    .q-btn + .q-btn
      border-left 1px solid #bdbdbd
.q-list
  border-left none !important
  border-right none !important
.list-box
  background #fff
  margin 11px 0px
  .q-list-inset-separator > .q-item-division + .q-item-division:after
    right 16px !important
    left 8px !important
</style>

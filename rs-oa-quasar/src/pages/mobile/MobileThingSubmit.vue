<template>
  <q-page class="bg">
    <q-list separator class="q-my-sm">
      <q-list-header>审批流程</q-list-header>
      <q-item
        v-for="(flowInfo, index) in hFlowInfos"
        :key="'hFlow'+index">
        <q-item-side>
          <q-item-tile>{{ flowInfo.USERS_NAME }}</q-item-tile>
        </q-item-side>
        <q-item-main>
          <q-item-tile sublabel>{{ flowInfo.WFLOG_HWAY }}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile>{{ flowInfo.WFLOG_REND }}</q-item-tile>
        </q-item-side>
      </q-item>
      <q-item
        v-for="(wflow, index) in wFlowInfo"
        :key="'wflow'+index">
        <q-item-side>
          <q-item-tile></q-item-tile>
        </q-item-side>
        <q-item-main>
          <q-item-tile sublabel>{{ wflow.WFLOG_HWAY }}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile>{{ wflow.WFLOG_WUSER }}</q-item-tile>
        </q-item-side>
      </q-item>
    </q-list>
    <q-list separator class="q-my-sm">
      <q-list-header>我的处理</q-list-header>
      <q-item>
        <q-item-main>
          <q-select
            v-if="noEnd"
            prefix="处理方式"
            separator
            hide-underline
            align="right"
            v-model="handle.taskProctype"
            :options="modeoptions"/>
          <q-select
            v-if="isEnd"
            prefix="处理方式"
            separator
            hide-underline
            align="right"
            v-model="handle.taskProctype"
            :options="[{ label: '撤回', value: 'wfopPULLBACK' }]"/>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-main>
          <q-select
            prefix="下步事务"
            separator
            hide-underline
            align="right"
            v-model="handle.nextTask"
            :options="nextTaskLists.map((currentValue) => ({ label: currentValue.wPName, value: currentValue.wPID }))"/>
        </q-item-main>
      </q-item>
      <q-item @click.native="chooseTodoPersons">
        <q-item-side>
          <q-item-tile>处理对象</q-item-tile>
        </q-item-side>
        <q-item-main></q-item-main>
        <q-item-side right>
          <q-item-tile>{{ choosedUserName }}</q-item-tile>
        </q-item-side>
      </q-item>
    </q-list>
    <div class="q-pa-sm textarea-box">
      <div class="q-list-header" style="padding-left: 8px">处理意见</div>
      <q-input  v-model="idea" rows="3" type="textarea" />
    </div>
    <div class="q-pa-md">
      <q-btn style="width: 100%" color="primary" @click="onSubmit" label="提交"/>
    </div>
    <q-modal v-model="personsModal">
      <q-modal-layout class="server-modal-bg">
        <q-toolbar slot="header">
          <q-btn
            color="primary"
            @click="personsModal = false"
            label="取消" />
          <q-toolbar-title>
            选择处理对象
          </q-toolbar-title>
          <q-btn
            color="primary"
            @click="saveChooseTodoPersons"
            label="保存" />
        </q-toolbar>
        <q-toolbar slot="header">
          <q-search
            class="full-width"
            inverted
            v-model="queryText"
            @input="updatePersons"/>
        </q-toolbar>
        <div class="list-box">
          <q-list dense>
            <q-collapsible
              icon="person"
              label="用户"
              v-model="personClick">
              <q-item
                v-for="(personItem, index) in showPersonLists"
                :key="'person' + index">
                <q-item-side>
                  <q-checkbox
                    v-model="personItem.bEndChoosed"
                    :disable="personItem.bChoosed" />
                </q-item-side>
                <q-item-main
                  :label="personItem.userName" />
              </q-item>
            </q-collapsible>
            <q-collapsible
              icon="group"
              label="部门"
              v-model="departmentClick">
              <q-item
                v-for="(departmentItem, index) in showDepartmentLists"
                :key="'department' + index">
                <q-item-side>
                  <q-checkbox
                    v-model="departmentItem.bEndChoosed"
                    :disable="departmentItem.bChoosed" />
                </q-item-side>
                <q-item-main
                  :label="departmentItem.userName" />
              </q-item>
            </q-collapsible>
            <q-collapsible
              icon="people"
              label="角色"
              v-model="roleClick">
              <q-item
                v-for="(roleItem, index) in showRoleLists"
                :key="'role' + index">
                <q-item-side>
                  <q-checkbox
                    v-model="roleItem.bEndChoosed"
                    :disable="roleItem.bChoosed" />
                </q-item-side>
                <q-item-main
                  :label="roleItem.userName" />
              </q-item>
            </q-collapsible>
          </q-list>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import { thingService } from 'src/api'
import {
  weX5RowsDataTrimValueProperty,
  deleteComma,
  arrayDeepClone,
  modeoptions
} from 'src/utils'
import {
  presentAlertButtonYes,
  presentLoading,
  dismissLoading
} from 'src/utils/tipstool'

import Emitter from 'src/utils/emitter'

export default {
  name: 'MobileThingSubmit',
  mixins: [Emitter],
  data() {
    return {
      things: this.$route.params.onething,
      flowInfos: null, // 审批流程信息
      hFlowInfos: [],
      wFlowInfo: [],
      idea: '', // 处理意见
      choosedUserName: '',
      choosedPersonID: '',
      choosedDepartmentID: '',
      choosedRoleID: '',
      // 下步处理列表
      nextTaskLists: [],
      // 处理对象列表
      handlePersons: [],
      // 选中的下步处理事务信息
      handle: { taskProctype: '', nextTask: '' },
      noEnd: false,
      isEnd: false,
      modeoptions: modeoptions,
      personsModal: false,
      queryText: '',
      //新增的bChoosed用来标记默认被选中， bEndChoosed用来标记最终是否选中
      handlePeoples: [],
      personLists: [],
      departmentLists: [],
      roleLists: [],
      //用于存放搜索结果，界面显示的处理对象
      showPersonLists: [],
      showDepartmentLists: [],
      showRoleLists: [],
      personClick: true,
      departmentClick: false,
      roleClick: false
    }
  },
  created() {
    this.getFlowInfo()
  },
  methods: {
    getFlowInfo() {
      if (this.things.WFAWT_PID != '9999') {
        this.handle.taskProctype = 'wfopGO'
        this.isEnd = false
        this.noEnd = true
      } else {
        this.handle.taskProctype = 'wfopPULLBACK'
        this.isEnd = true
        this.noEnd = false
        this.changeProctype(this.handle.taskProctype)
      }
      presentLoading()
      let _self = this
      _self.handle.taskProctype = 'wfopGO'
      thingService
        .getFlowInfo(_self.things.WFAWT_WFID, _self.things.WFAWT_INST)
        .then(res => {
          if (res.data && 0 === res.data.errcode) {
            let a = res.data
            _self.flowInfos = weX5RowsDataTrimValueProperty(a.body.rows)
            _self.flowInfos.forEach((currentValue, index) => {
              if (currentValue.WFLOG_HWAY.indexOf('待处理') >= 0) {
                currentValue.WFLOG_WUSER = deleteComma(currentValue.WFLOG_WUSER)
                _self.wFlowInfo[_self.wFlowInfo.length] = currentValue
              } else {
                _self.hFlowInfos[_self.hFlowInfos.length] = currentValue
              }
            })
          } else {
            presentAlertButtonYes('请求出现问题，请重试')
          }
          dismissLoading()
          _self.changeProctype(_self.handle.taskProctype)
        })
        .catch(err => {
          dismissLoading()
          console.log(err)
        })
    },
    changeProctype(taskProctype) {
      presentLoading()
      let _self = this
      thingService
        .getHandleContent(
          _self.things.WFDEF_CLASS,
          _self.things.WFAWT_PID,
          _self.things.WFAWT_WFID,
          _self.things.WFAWT_INST,
          taskProctype
        )
        .then(res => {
          if (res.data && 0 === res.data.errcode) {
            let a = res.data
            _self.nextTaskLists = a.body.wFInfoUsers
            if (_self.nextTaskLists.length !== 0) {
              _self.handle.nextTask = _self.nextTaskLists[0].wPID || ''
              _self.changeNextTask(_self.handle.nextTask)
            } else {
              _self.handle.nextTask = ''
              _self.choosedUserName = ''
              _self.handlePersons = []
            }
          } else {
            presentAlertButtonYes('请求出现问题，请重试')
          }
          dismissLoading()
        })
        .catch(err => {
          dismissLoading()
          console.error('get HandleContent failed')
        })
    },
    changeNextTask(nextTask) {
      let _self = this
      _self.choosedUserName = ''
      _self.choosedPersonID = ''
      _self.choosedDepartmentID = ''
      _self.choosedRoleID = ''
      _self.nextTaskLists.forEach(oneTask => {
        if (oneTask.wPID === nextTask) {
          _self.handlePersons = oneTask.wfUsers
          if (_self.handlePersons.length > 0) {
            _self.handlePersons.forEach(onePerson => {
              if (onePerson.value === 'Y') {
                _self.choosedUserName = _self.choosedUserName
                  ? `${_self.choosedUserName},${onePerson.userName}`
                  : onePerson.userName
                if (onePerson.userType === 'U') {
                  _self.choosedPersonID = _self.choosedPersonID
                    ? `${_self.choosedPersonID},${onePerson.userID}`
                    : onePerson.userID
                } else if (onePerson.userType === 'G') {
                  _self.choosedDepartmentID = _self.choosedDepartmentID
                    ? `${_self.choosedDepartmentID},${onePerson.userID}`
                    : onePerson.userID
                } else if (onePerson.userType === 'R') {
                  _self.choosedRoleID = _self.choosedRoleID
                    ? `${_self.choosedRoleID},${onePerson.userID}`
                    : onePerson.userID
                }
              }
            })
          }
        }
      })
    },
    onSubmit() {
      let params = {
        task_classid: '',
        task_statusid: '',
        task_id: '',
        task_inst: '',
        task_proctype: '',
        task_nextsid: '',
        comment: '',
        nextusers: {},
        action: 4
      }
      //选中的处理对象（人员U、部门G、角色R）
      let nextuser = { users: '', usergroups: '', userroles: '' }
      params.task_proctype = this.handle.taskProctype
      params.task_classid = this.things.WFDEF_CLASS
      params.task_id = this.things.WFAWT_WFID
      params.task_inst = this.things.WFAWT_INST
      params.task_statusid = this.things.WFAWT_PID
      params.task_nextsid = this.things.WFAWT_PID
      params.action = 4
      params.comment = this.idea
      if (
        this.handle.taskProctype === 'wfopTRANSFER' ||
        this.handle.taskProctype === 'wfopGO' ||
        this.handle.taskProctype === 'wfopGOBACK' ||
        this.handle.taskProctype === 'wfopManage'
      ) {
        nextuser.users = this.choosedPersonID
        nextuser.usergroups = this.choosedDepartmentID
        nextuser.userroles = this.choosedRoleID
        params.task_nextsid = this.handle.nextTask
      } else if (this.handle.taskProctype === 'wfopVeto') {
        params.task_nextsid = '9999'
      }
      params.nextusers = nextuser
      //下步处理非结束，必须选择处理对象
      if (
        this.handle.nextTask != '9999' &&
        this.handle.taskProctype !== 'wfopPULLBACK'
      ) {
        if (
          (nextuser.users === undefined &&
            nextuser.usergroups === undefined &&
            nextuser.userroles === undefined) ||
          (nextuser.users === null &&
            nextuser.usergroups === null &&
            nextuser.userroles === null) ||
          (nextuser.users === '' &&
            nextuser.usergroups === '' &&
            nextuser.userroles === '') ||
          (nextuser.users.length === 0 &&
            nextuser.usergroups.length === 0 &&
            nextuser.userroles.length === 0)
        ) {
          this.$q.notify('请选择下一步处理人!')
          return
        }
      }
      this.$q
        .dialog({
          message: '是否确认提交？',
          ok: '确定',
          cancel: '取消',
          preventClose: true
        })
        .then(() => {
          presentLoading()
          thingService
            .doSubmit(params)
            .then(res => {
              if (res.data && 0 === res.data.errcode) {
                this.$q.notify({
                  type: 'positive'
                })
                window.history.length > 2
                  ? this.$router.go(-2)
                  : this.$router.push({
                      name: 'mobilething'
                    })
              } else {
                presentAlertButtonYes(res.data.desc)
              }
              dismissLoading()
            })
            .catch(err => {
              dismissLoading()
              this.$q.notify(err)
            })
        })
        .catch(err => {
          this.$q.notify(err)
        })
    },
    chooseThingPersons() {
      let _self = this
      _self.personsModal = true
      _self.personLists = []
      _self.showPersonLists = []
      _self.departmentLists = []
      _self.showDepartmentLists = []
      _self.roleLists = []
      _self.showRoleLists = []
      let reserveList = arrayDeepClone(_self.handlePersons)
      reserveList.forEach(oneperson => {
        oneperson.bChoosed === undefined && (oneperson.bChoosed = false)
        oneperson.bEndChoosed === undefined && (oneperson.bEndChoosed = false)
        if (oneperson.value === 'Y') {
          oneperson.bChoosed = true
          oneperson.bEndChoosed = true
          if (oneperson.userType === 'U') {
            _self.personClick = true
          } else if (oneperson.userType === 'G') {
            _self.departmentClick = true
          } else if (oneperson.userType === 'R') {
            _self.roleClick = true
          }
        } else {
          oneperson.bChoosed = false
        }
        if (oneperson.userType === 'U') {
          _self.personLists.push(oneperson)
          _self.showPersonLists.push(oneperson)
        } else if (oneperson.userType === 'G') {
          _self.departmentLists.push(oneperson)
          _self.showDepartmentLists.push(oneperson)
        } else if (oneperson.userType === 'R') {
          _self.roleLists.push(oneperson)
          _self.showRoleLists.push(oneperson)
        } else {
          console.log('userType is wrong,not the one of "U,G,R"!')
        }
      })
    },
    updatePersons() {
      this.showPersonLists = this.personLists
      this.showDepartmentLists = this.departmentLists
      this.showRoleLists = this.roleLists
      this.queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, ' ')
      let queryWords = this.queryText.split(' ').filter(w => !!w.trim().length)
      if (queryWords.length) {
        this.showPersonLists = this.showPersonLists.filter(person => {
          let oneperson = person
          return oneperson.userName.toLowerCase().indexOf(queryWords) > -1
        })
      }
      if (queryWords.length) {
        this.showDepartmentLists = this.showDepartmentLists.filter(person => {
          let oneDepartment = person
          return oneDepartment.userName.toLowerCase().indexOf(queryWords) > -1
        })
      }
      if (queryWords.length) {
        this.showRoleLists = this.showRoleLists.filter(person => {
          let oneUser = person
          return oneUser.userName.toLowerCase().indexOf(queryWords) > -1
        })
      }
      this.personClick = true
      this.departmentClick = true
      this.roleClick = true
    },
    saveChooseThingPersons() {
      let _self = this
      _self.personsModal = false
      _self.handlePersons = arrayDeepClone(
        _self.personLists.concat(_self.departmentLists, _self.roleLists)
      )
      _self.choosedUserName = ''
      _self.choosedPersonID = ''
      _self.choosedDepartmentID = ''
      _self.choosedRoleID = ''
      _self.handlePersons.forEach(one => {
        if (one.bEndChoosed) {
          _self.choosedUserName = _self.choosedUserName
            ? `${_self.choosedUserName},${one.userName}`
            : one.userName
          if (one.userType === 'U') {
            _self.choosedPersonID = _self.choosedPersonID
              ? `${_self.choosedPersonID},${one.userID}`
              : one.userID
          } else if (one.userType === 'G') {
            _self.choosedDepartmentID = _self.choosedDepartmentID
              ? `${_self.choosedDepartmentID},${one.userID}`
              : one.userID
          } else if (one.userType === 'R') {
            _self.choosedRoleID = _self.choosedRoleID
              ? `${_self.choosedRoleID},${one.userID}`
              : one.userID
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.bg
  background-color $pagebg
</style>

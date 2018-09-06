<template>
  <q-page class="bg">
    <q-list
      separator
      class="q-px-sm">
      <template v-for="(worklogItem, index) in worklogList">
        <q-item
          :key="worklogItem.id + index"
          v-if="worklogItem.type !== 'textarea'">
          <q-item-side>
            <q-item-tile label>{{ worklogItem.name }}</q-item-tile>
          </q-item-side>
          <q-item-main>
            <template v-if="worklogItem.type === 'datetime'">
              <q-datetime
                v-model="worklogContent[worklogItem.id]"
                type="date"
                ok-label="确定"
                cancel-label="取消"
                hide-underline
                align="right"
                :readonly="disabled"
                @input="changeDatetime" />
            </template>
            <template v-else-if="worklogItem.type === 'input'">
              <q-input
                v-model="worklogContent[worklogItem.id]"
                hide-underline
                align="right"
                :readonly="disabled" />
            </template>
            <template v-else-if="worklogItem.type === 'select'">
              <q-select
                v-model="worklogContent[worklogItem.id]"
                :options="worklogItem.id === 'GZRZ_FL' ? [{label: '内勤', value: 'N'}, {label: '外勤', value: 'W'}] : workPlanList.map((currentValue) => ({ label: `${currentValue.ZJHMX_RWZYX}:${currentValue.ZJHMX_NR}`, value: currentValue.ZJH_JHID }))"
                hide-underline
                align="right"
                :readonly="disabled" />
            </template>
            <template v-else-if="worklogItem.type === 'item'">
              <q-item-tile label align="right">{{ worklogContent[worklogItem.id] }}</q-item-tile>
            </template>
          </q-item-main>
        </q-item>
        <q-item
          :key="worklogItem.id + index"
          v-else-if="worklogItem.type === 'textarea'">
          <div class="textarea-box">
            <div class="q-list-header" style="padding-left: 0">{{ worklogItem.name }}</div>
            <q-input
              v-model="worklogContent[worklogItem.id]"
              :rows="worklogItem.lines"
              type="textarea"
              :readonly="disabled" />
          </div>
        </q-item>
      </template>
    </q-list>
    <div v-if="worklogDetail.action !== 'insert'" class="q-pa-md">
      <q-btn class="q-my-sm" style="width: 100%" color="primary" @click="editLog" label="修改" :disable="!disabled" />
      <q-btn class="q-my-sm" style="width: 100%" color="negative" @click="deleteLog" label="删除" :disable="!disabled" />
    </div>
    <div v-if="worklogDetail.action !== 'readOnly'" class="q-pa-md">
      <q-btn class="q-my-sm" style="width: 100%" color="primary" @click="applyWorklog" label="保存" />
      <q-btn class="q-my-sm" style="width: 100%" color="negative" @click="dismissWorklog" label="取消" />
    </div>
  </q-page>
</template>

<script>
import { worklogService } from 'src/api'
import { worklogList, rowsDataTrimValueProperty } from 'src/utils'
import {
  presentAlertButtonYes,
  presentLoading,
  dismissLoading
} from 'src/utils/tipstool'

import Emitter from 'src/utils/emitter'
import moment from 'moment'

export default {
  name: 'MobileWorklogDetail',
  mixins: [Emitter],
  data() {
    return {
      worklogDetail: this.$route.params.worklog,
      workPlanList: [],
      worklogContent: null,
      disabled: Boolean,
      worklogList: worklogList
    }
  },
  created() {
    console.log(this.$route.params.worklog)
    this.dispatch(
      'TabsLayout',
      'set-page-title',
      this.worklogDetail.action === 'readOnly' ? '日志' : '新增日志'
    )
    this.checkActionType()
  },
  methods: {
    checkActionType() {
      if (this.worklogDetail.action === 'readOnly') {
        this.disabled = true
        this.worklogContent = JSON.parse(
          JSON.stringify(this.worklogDetail.data)
        )
      } else if (this.worklogDetail.action === 'insert') {
        this.disabled = false
        this.worklogContent = {
          GZRZ_GZRQ: moment().format('YYYY-MM-DD'),
          GZRZ_GS: 1,
          GZRZ_FL: 'N',
          GZRZ_WFPNAME: '',
          GZRZ_ZT: '',
          GZRZ_RZNR: '',
          GZRZ_WHR: '',
          GZRZ_WHSJ: '',
          GZRZ_BZ: '',
          GZRZ_JHID: '',
          GCXM_XMMC: '',
          XMRW_SUBJECT: ''
        }
      }
      this.changeDatetime()
    },
    changeDatetime() {
      worklogService
        .getWorkPlan(this.worklogContent.GZRZ_GZRQ)
        .then(res => {
          if (res.data && 0 === res.data.errcode) {
            rowsDataTrimValueProperty(res.data.body.rows) &&
              (this.workPlanList = rowsDataTrimValueProperty(
                res.data.body.rows
              ))
          } else {
            presentAlertButtonYes('请求出现问题，请重试')
          }
        })
        .catch(err => {
          this.$q.notify(err)
        })
    },
    changeWorkPlan(choosedJHID) {
      let choosedPlan = this.workPlanList.filter(
        one => one.ZJH_JHID === choosedJHID
      )
      this.worklogContent.GCXM_XMMC = choosedPlan[0].GCXM_XMMC
      this.worklogContent.XMRW_SUBJECT = choosedPlan[0].XMRW_SUBJECT
    },
    editLog() {
      //只有初始状态的允许修改
      if (this.worklogContent.GZRZ_WFPID === '0000') {
        this.worklogDetail.action = 'edit'
        this.disabled = false
      } else {
        presentAlertButtonYes('只有初始状态的日志允许修改！')
      }
    },
    deleteLog() {
      //只有初始状态的允许修改
      if (this.worklogContent.GZRZ_WFPID === '0000') {
        this.$q
          .dialog({
            message: '确定删除该日志？',
            ok: '确定',
            cancel: '取消',
            preventClose: true
          })
          .then(() => {
            worklogService
              .deleteWorklog(this.worklogContent)
              .then(res => {
                if (res.data && 0 === res.data.errcode) {
                  this.$q.notify({
                    message: '删除成功',
                    timeout: 500
                  })
                  this.$router.go(-1)
                } else {
                  presentAlertButtonYes(data.desc)
                }
              })
              .catch(err => {
                this.$q.notify(err)
              })
          })
          .catch(err => {
            this.$q.notify(err)
          })
      } else {
        presentAlertButtonYes('只有初始状态的日志允许删除！')
      }
    },
    applyWorklog() {
      this.disabled = true
      if (this.worklogDetail.action === 'insert') {
        worklogService
          .insertWorklog(this.worklogContent)
          .then(res => {
            if (res.data && 0 === res.data.errcode) {
              this.$q.notify({
                message: '插入成功',
                timeout: 500
              })
              this.$router.go(-1)
            } else {
              presentAlertButtonYes(data.desc)
              this.disabled = false
            }
          })
          .catch(err => {
            this.$q.notify(err)
          })
      } else if (this.worklogDetail.action === 'edit') {
        worklogService
          .editWorklog(this.worklogContent)
          .then(res => {
            if (res.data && 0 === res.data.errcode) {
              this.worklogDetail.action === 'readOnly'
              this.$q.notify({
                message: '修改成功',
                timeout: 500
              })
            } else {
              presentAlertButtonYes(data.desc)
              this.disabled = false
            }
          })
          .catch(err => {
            this.$q.notify(err)
          })
      }
    },
    dismissWorklog() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.bg
  background-color $pagebg
  .textarea-box
    width 100%
</style>

<template>
  <q-page class="bg">
    <q-list
      separator
      class="q-px-sm">
      <template v-for="(thingItem, index) in thingList">
        <q-item
          :key="thingItem.id + index"
          v-if="thingItem.type !== 'textarea'">
          <q-item-side>
            <q-item-tile label>{{ thingItem.name }}</q-item-tile>
          </q-item-side>
          <q-item-main>
            <template v-if="thingItem.type === 'datetime'">
              <q-datetime
                v-model="thingContent[thingItem.id]"
                type="date"
                ok-label="确定"
                cancel-label="取消"
                hide-underline
                align="right"
                :readonly="disabled"
                @input="changeDatetime" />
            </template>
            <template v-else-if="thingItem.type === 'input'">
              <q-input
                v-model="thingContent[thingItem.id]"
                hide-underline
                align="right"
                :readonly="disabled" />
            </template>
            <template v-else-if="thingItem.type === 'select'">
              <q-select
                v-model="thingContent[thingItem.id]"
                :options="optionsObj[thingItem.id]"
                hide-underline
                align="right"
                :readonly="disabled" />
            </template>
          </q-item-main>
        </q-item>
        <q-item
          :key="thingItem.id + index"
          v-else-if="thingItem.type === 'textarea'">
          <div class="textarea-box">
            <div class="q-list-header" style="padding-left: 0">{{ thingItem.name }}</div>
            <q-input
              v-model="thingContent[thingItem.id]"
              :rows="thingItem.lines"
              type="textarea"
              :readonly="disabled" />
          </div>
        </q-item>
      </template>
    </q-list>
    <div v-if="thingDetail.action !== 'insert'" class="q-pa-md">
      <q-btn class="q-my-sm" style="width: 100%" color="primary" @click="editThing" label="修改" :disable="!disabled" />
      <q-btn class="q-my-sm" style="width: 100%" color="negative" @click="handleThing" label="处理" :disable="!disabled" />
    </div>
    <div v-if="thingDetail.action !== 'readOnly'" class="q-pa-md">
      <q-btn class="q-my-sm" style="width: 100%" color="primary" @click="applyThing" label="保存" />
      <q-btn class="q-my-sm" style="width: 100%" color="negative" @click="dismissThing" label="取消" />
    </div>
  </q-page>
</template>

<script>
import { thingService } from 'src/api'
import { thingList, rowsDataTrimValueProperty } from 'src/utils'
import {
  presentAlertButtonYes,
  presentLoading,
  dismissLoading
} from 'src/utils/tipstool'

import Emitter from 'src/utils/emitter'
import moment from 'moment'

export default {
  name: 'MobileThingDetail',
  mixins: [Emitter],
  data() {
    return {
      thingDetail: this.$route.params.onething,
      thingContent: null,
      disabled: Boolean,
      optionsObj: {
        SWSQ_SWLX: [],
        SWSQ_BMID: [],
        SWSQ_CYRY: [],
        SWSQ_SQR: []
      },
      thingList: thingList
    }
  },
  created() {
    this.dispatch(
      'TabsLayout',
      'set-page-title',
      this.thingDetail.action === 'readOnly' ? '事务申请' : '新增事务申请'
    )
    this.checkActionType()
  },
  methods: {
    checkActionType() {
      if (this.thingDetail.action === 'readOnly') {
        this.disabled = true
        this.thingContent = JSON.parse(JSON.stringify(this.thingDetail.data))
      } else if (this.thingDetail.action === 'insert') {
        this.disabled = false
        this.thingContent = {
          SWSQ_BMID: '',
          SWSQ_BZ: '',
          SWSQ_CYRY: '',
          SWSQ_SQR: '',
          SWSQ_QSRQ: moment().format('YYYY-MM-DD'),
          SWSQ_SQRQ: moment().format('YYYY-MM-DD'),
          SWSQ_SQSY: '',
          SWSQ_SWID: '',
          SWSQ_SWLX: '',
          SWSQ_SWSTATE: '',
          SWSQ_SWZT: '',
          SWSQ_WFPID: '',
          SWSQ_WFPNAME: '',
          SWSQ_WHR: '',
          SWSQ_WHRID: '',
          SWSQ_ZT: '',
          SWSQ_WHSJ: moment().format('YYYY-MM-DD'),
          SWSQ_ZZRQ: moment().format('YYYY-MM-DD')
        }
      }
      this.changeDatetime()
    },
    changeDatetime() {
      thingService
        .getPersonData()
        .then(res => {
          if (res.data && 0 === res.data.errcode) {
            rowsDataTrimValueProperty(res.data.body.rows).length > 0 &&
              (this.optionsObj.SWSQ_CYRY = this.optionsObj.SWSQ_SQR = rowsDataTrimValueProperty(
                res.data.body.rows
              ))
          } else {
            presentAlertButtonYes('请求出现问题，请稍后重试')
          }
        })
        .catch(err => {
          presentAlertButtonYes(err)
        })
      thingService
        .getWorkTypeData()
        .then(res => {
          if (res.data && 0 === res.data.errcode) {
            rowsDataTrimValueProperty(res.data.body.rows).length > 0 &&
              (this.optionsObj.SWSQ_SWLX = rowsDataTrimValueProperty(
                res.data.body.rows
              ))
          } else {
            presentAlertButtonYes('请求出现问题，请稍后重试')
          }
        })
        .catch(err => {
          presentAlertButtonYes(err)
        })
      thingService
        .getDepartment()
        .then(res => {
          if (res.data && 0 === res.data.errcode) {
            rowsDataTrimValueProperty(res.data.body.rows).length > 0 &&
              (this.optionsObj.SWSQ_BMID = rowsDataTrimValueProperty(
                res.data.body.rows
              ))
          } else {
            presentAlertButtonYes('请求出现问题，请稍后重试')
          }
        })
        .catch(err => {
          presentAlertButtonYes(err)
        })
    },
    applyThing() {
      this.disabled = true
      this.thingContent.SWSQ_SWID = this.thingContent.SWSQ_SWID.toUpperCase()
      if (this.thingDetail.action === 'insert') {
        this.thingContent.SWSQ_CYRY = this.thingContent.SWSQ_CYRY.toString()
        thingService
          .insertThing(this.thingContent)
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
      } else if (this.thingDetail.action === 'edit') {
        this.thingContent.SWSQ_CYRY = this.thingContent.SWSQ_CYRY.toString()
        thingService
          .editThing(this.thingContent)
          .then(res => {
            if (res.data && 0 === res.data.errcode) {
              this.thingDetail.action === 'readOnly'
              this.$q.notify({
                message: '修改成功',
                timeout: 500
              })
              this.dispatch('TabsLayout', 'set-page-title', '事务申请')
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
    editThing() {
      //只有初始状态的允许修改
      if (this.thingContent.SWSQ_ZT === 'I') {
        this.thingDetail.action = 'edit'
        this.disabled = false
        this.dispatch('TabsLayout', 'set-page-title', '修改事务申请')
      } else {
        presentAlertButtonYes('只有初始状态的事务申请允许修改！')
      }
    },
    handleThing() {
      let argu = {
        onething: this.thingContent
      }
      this.$router.push({
        name: 'mobilethingsubmit',
        params: argu
      })
    },
    dismissThing() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.bg
  background-color $pagebg
  .textarea-box
    width 100%
</style>

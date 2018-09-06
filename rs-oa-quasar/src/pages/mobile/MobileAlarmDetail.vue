<template>
  <q-page class="bg">
    <q-list separator>
      <q-collapsible
        label="预警详情">
        <template v-if="alarm">
          <q-list inset-separator>
            <q-item
              v-for="(alarmItem, index) in alarmList"
              :key="alarmItem.id + index">
              <q-item-side icon="notifications" />
              <q-item-main>
                <q-item-tile label>{{ alarmItem.name }}</q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-item-tile>{{ alarm[alarmItem.id] }}</q-item-tile>
              </q-item-side>
            </q-item>
          </q-list>
        </template>
      </q-collapsible>
      <q-collapsible
        label="内容明细">
        <template v-if="alarmDetail.length > 0">
          <q-card
            flat
            v-for="(alarmdetailItem, index) in alarmDetail"
            :key="'alarmdetail' + index">
            <q-card-main>
              <q-list>
                <q-item
                  separator
                  v-for="index in alarmCols.length"
                  :key="'col' + index">
                  <q-item-main>
                    <q-item-tile label>{{ alarmCols[index].fldname }}</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-item-tile>{{ alarmdetailItem[index] }}</q-item-tile>
                  </q-item-side>
                </q-item>
              </q-list>
            </q-card-main>
          </q-card>
        </template>
      </q-collapsible>
    </q-list>
  </q-page>
</template>

<script>
import { alarmService } from 'src/api'
import { rowsDataTrimValueProperty } from 'src/utils'
import {
  presentAlertButtonYes,
  presentLoading,
  dismissLoading
} from 'src/utils/tipstool'
import { alarmList } from 'src/utils'

import Emitter from 'src/utils/emitter'

export default {
  name: 'MobileAlarmDetail',
  mixins: [Emitter],
  data() {
    return {
      alarm: this.$route.params.alarm,
      alarmList: alarmList,
      alarmCols: null,
      alarmDetail: null
    }
  },
  created() {
    this.dispatch(
      'TabsLayout',
      'set-page-title',
      `消息预警(${this.alarm.MSLOG_READ})`
    )
    this.getAlarmDetail()
  },
  methods: {
    getAlarmDetail() {
      presentLoading()
      let self = this
      alarmService
        .getAlarmDetail(self.alarm.MSLOG_ID)
        .then(res => {
          if (res.data && 0 === res.data.errcode) {
            self.alarmCols = res.data.body.cols
            self.alarmDetail = res.data.body.rows
          } else {
            presentAlertButtonYes(res.data.errcode)
          }
          dismissLoading()
        })
        .catch(reason => {
          dismissLoading()
          console.error('get alarmDetail failed ')
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import { colors } from 'quasar'
import moment from 'moment'
import { getWeekCN } from 'src/utils'
import { loginService } from 'src/api'

Vue.filter('formatDateTime', function(dateTime, component) {
  let nowDate = moment().format('YYYY/M/D')
  let listDate = moment(dateTime).format('YYYY/M/D')
  // 当天的数据，显示几点几分『x:xx』
  if (moment(nowDate).isSame(listDate)) {
    return 'worklog' === component ? '今天' : moment(dateTime).format('H:mm')
  } else if (moment(moment(nowDate).subtract(1, 'days')).isSame(listDate)) {
    // 昨天的数据，显示『昨天』
    return '昨天'
  } else if (
    moment(dateTime).isBetween(
      moment(nowDate).subtract(7, 'days'),
      moment(nowDate).subtract(1, 'days'),
      'day'
    )
  ) {
    // 一周之内非两天内的数据，显示『星期x』
    return getWeekCN(moment(listDate).isoWeekday())
  } else {
    // 一周之前的数据
    // 当年的显示月日『x/x』
    if (moment(nowDate).isSame(listDate, 'year')) {
      return moment(dateTime).format('M/D')
    }
    // 其他显示年月日【xxxx/x/x】
    return listDate
  }
})

export default {
  name: 'App',
  created() {
    let _self = this
    if (_self.$q.platform.is.cordova || _self.$q.platform.is.mobile) {
      loginService
        .tryAutoLogin()
        .then(res => {
          if (res.data && res.data.errcode === 0) {
            _self.$router.push({
              name: 'mobilehome'
            })
          } else {
            _self.$router.push('/mobilelogin')
          }
        })
        .catch(err => {
          _self.$router.push('/mobilelogin')
          console.log(err)
        })
      // this.$router.push('/mobilehome') // for debug
    } else if (_self.$q.platform.is.electron || _self.$q.platform.is.desktop) {
      _self.$router.push('/desktoplogin')
    }
  }
}
</script>

<style>
</style>

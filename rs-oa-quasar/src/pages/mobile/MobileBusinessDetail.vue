<template>
  <q-page class="bg">
    <Type01Page
      v-if="todoDetailDatas[showPage].PageType === 'Type01Page' && master"
      :show-page="showPage"
      :master="master"
      :details="details"
      :todo-detail-data="todoDetailDatas[showPage]"/>
    <Type02Page
      v-else-if="todoDetailDatas[showPage].PageType === 'Type02Page' && master"
      :show-page="showPage"
      :master="master"
      :details="details"
      :detail1="detail1"
      :todo-detail-data="todoDetailDatas[showPage]"/>
    <DefaultPage
      v-else
      :show-page="showPage"
      :todo="business"
      :todo-detail-data="todoDetailDatas[showPage]"/>
    <div class="q-pa-md">
      <q-btn style="width: 100%" color="primary" @click="getFlow" label="流程跟踪"/>
    </div>
  </q-page>
</template>

<script>
import { todoService, businessService } from 'src/api'
import {
  weX5RowsDataTrimValueProperty,
  weX5MasterDataToObject,
  deleteComma
} from 'src/utils'
import {
  presentAlertButtonYes,
  presentLoading,
  dismissLoading
} from 'src/utils/tipstool'
import { wfidObj, TodoDetailDatas } from 'src/utils/todoData'
import Emitter from 'src/utils/emitter'

import Type01Page from 'components/mobile/todo/Type01Page'
import Type02Page from 'components/mobile/todo/Type02Page'
import DefaultPage from 'components/mobile/todo/DefaultPage'

export default {
  name: 'MobileBusinessDetail',
  mixins: [Emitter],
  components: {
    Type01Page,
    Type02Page,
    DefaultPage
  },
  data() {
    return {
      business: this.$route.params.business,
      todoDetailDatas: TodoDetailDatas,
      showPage: 'default',
      master: null,
      details: null,
      detail1: null
    }
  },
  created() {
    if (
      Object.prototype.toString.call(this.$route.params.business) ===
      '[object Object]'
    ) {
      this.$q.localStorage.set(
        'business',
        JSON.stringify(this.$route.params.business)
      )
      this.business = this.$route.params.business
    } else {
      this.business = JSON.parse(this.$q.localStorage.get.item('business'))
    }
    this.dispatch('TabsLayout', 'set-page-title', this.business.WFDEF_NAME)
    wfidObj.hasOwnProperty(this.business.WFAWT_WFID)
      ? this.getBusinessDetail()
      : (this.showPage = 'default')
  },
  methods: {
    getBusinessDetail() {
      presentLoading()
      let self = this
      self.business.WFINST_WUSER = deleteComma(self.business.WFINST_WUSER)
      todoService
        .getTodoDetail(
          self.business.WFAWT_WFID,
          self.business.WFAWT_INST,
          self.business.WFOPT_ZJID
        )
        .then(res => {
          if (res.data && 0 === res.data.errcode) {
            self.showPage = self.business.WFAWT_WFID
            let a = res.data
            a.Master.rows
              ? (self.master = weX5RowsDataTrimValueProperty(a.Master.rows)[0])
              : (self.master = weX5MasterDataToObject(a.Master))
            Object.keys(self.master).forEach(key => {
              self.master[key] = deleteComma(self.master[key])
            })
            a.Detail &&
              (self.details = weX5RowsDataTrimValueProperty(a.Detail.rows))
            a.Detail1 &&
              (self.detail1 = weX5RowsDataTrimValueProperty(a.Detail1.rows))
            self.business.WFAWT_WFID === 'HCP_ZYFS_SOFKTJBG' &&
              (self.detail1 = self.formatDetail1Data(
                self.details,
                self.detail1
              ))
            self.business.WFAWT_WFID === 'OA_GGXX' &&
              (self.details = a.files[0])
          } else {
            presentAlertButtonYes('请求出现问题，请稍后重试')
          }
          dismissLoading()
        })
        .catch(err => {
          dismissLoading()
          console.log(err)
        })
    },
    formatDetail1Data(detail, detail1) {
      let zlhIndex = [],
        detail1Arr = []
      detail.forEach(detailValue => {
        zlhIndex.push(detailValue.SOMX_ZLH)
      })
      zlhIndex.forEach(zlhIndexValue => {
        let tempArr = { zlhIndex: zlhIndexValue, before: [], after: [] }
        detail1.forEach(detail1Value => {
          if (zlhIndexValue === detail1Value.SOMX_ZLH) {
            detail1Value.BGBZ === '变更前'
              ? tempArr.before.push(detail1Value)
              : tempArr.after.push(detail1Value)
          }
        })
        detail1Arr.push(tempArr)
      })
      return detail1Arr
    },
    getFlow() {
      businessService
        .getFlowInfo(this.business.WFAWT_WFID, this.business.WFAWT_INST)
        .then(res => {
          if (res.data && 0 === res.data.errcode) {
            let a = res.data
            let flowInfos = weX5RowsDataTrimValueProperty(a.body.rows)
            if (flowInfos.length !== 0) {
              flowInfos.map(
                one => (one.WFLOG_WUSER = deleteComma(one.WFLOG_WUSER))
              )
              this.goToBusinessFlow(flowInfos)
            } else {
              //没有工作流信息
              presentAlertButtonYes('当前事务没有流程信息！')
            }
          } else {
            presentAlertButtonYes(res.data.desc)
          }
        })
        .catch(reason => {
          console.error('get flowInfo failed')
        })
    },
    goToBusinessFlow(flowInfos) {
      this.dispatch('TabsLayout', 'set-page-title', '流程跟踪')
      let argu = {
        flowinfos: { flowInfos: flowInfos }
      }
      this.$router.push({
        name: 'mobilebusinessflow',
        params: argu
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

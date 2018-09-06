<template>
  <q-page class="bg">
    <q-list separator class="q-my-sm">
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
  </q-page>
</template>

<script>
export default {
  name: 'MobileBusinessFlow',
  data() {
    return {
      flowInfos: this.$route.params.flowinfos,
      hFlowInfos: [],
      wFlowInfo: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.flowInfos.flowInfos.forEach((currentValue, index) => {
        currentValue.WFLOG_HWAY.indexOf('待处理') >= 0
          ? (this.wFlowInfo[this.wFlowInfo.length] = currentValue)
          : (this.hFlowInfos[this.hFlowInfos.length] = currentValue)
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

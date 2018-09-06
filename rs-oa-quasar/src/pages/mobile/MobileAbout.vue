<template>
  <q-page style="text-align: center;">
    <h3 class="title">罗想云手机端</h3>
    <h6 class="subtitle">专为制造型企业提供信息化管理解决方案</h6>
    <div><img src="~assets/qrcode.png"></div>
    <h6>扫描二维码，即可下载罗想云手机端！</h6>
  </q-page>
</template>

<script>
import Emitter from 'src/utils/emitter'
export default {
  name: 'PageMobileAbout',
  mixins: [Emitter],
  created() {
    this.dispatch('TabsLayout', 'set-page-title', this.$route.params.pageTitle)
  }
}
</script>

<style lang="stylus" scoped>
.title
.subtitle
  color grey
</style>

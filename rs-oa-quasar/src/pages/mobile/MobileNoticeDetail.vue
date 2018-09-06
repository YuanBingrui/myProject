<template>
  <q-page class="bg">
    <q-list class="q-my-sm">
      <template
        v-for="(noticeItem, index) in noticeList">
        <q-item
          separator
          v-if="!noticeItem.html"
          :key="noticeItem.id + index">
          <q-item-main>
            <q-item-tile label>
              {{ noticeItem.name }}
            </q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-item-tile>{{ notice[noticeItem.id] }}</q-item-tile>
          </q-item-side>
        </q-item>
        <div
          class="q-pa-sm"
          style="border-bottom: 1px solid #e0e0e0"
          v-else
          :key="noticeItem.id + index"
          v-html="notice[noticeItem.id]">
        </div>
      </template>
    </q-list>
  </q-page>
</template>

<script>
import Emitter from 'src/utils/emitter'
import { noticeList } from 'src/utils'

export default {
  name: 'MobileNoticeDetail',
  mixins: [Emitter],
  data() {
    return {
      notice: this.$route.params.notice,
      noticeList: noticeList
    }
  },
  created() {
    this.dispatch('TabsLayout', 'set-page-title', this.notice.GGXX_GGBT)
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.bg
  background-color $pagebg
</style>

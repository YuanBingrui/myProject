<template>
  <q-tabs>
    <q-route-tab
      v-for="tabBtnItem in tabBtnList"
      :key="tabBtnItem.id"
      slot="title"
      :icon="tabBtnItem.iconName"
      :to="tabBtnItem.routerTo"
      replace
      :label="tabBtnItem.name"
      @select="setHeadTitle(tabBtnItem.name)">
    </q-route-tab>
  </q-tabs>
</template>

<script>
import Emitter from 'src/utils/emitter'
import { mapMutations } from 'vuex'

export default {
  name: 'MobileTabs',
  mixins: [Emitter],
  props: {
    tabBtnList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    ...mapMutations(['showBottomTab']),
    setHeadTitle(tabName) {
      this.dispatch('TabsLayout', 'set-page-title', tabName)
      this.showBottomTab()
    }
  }
}
</script>

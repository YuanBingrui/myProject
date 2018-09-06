<template>
  <div class="default-page" v-if="todoDetailData">
    <q-list
      class="q-my-sm"
      v-if="todoDetailData.MainContent">
      <template
        v-for="(mainItem, index) in todoDetailData.MainContent">
        <q-item
          separator
          :key="mainItem.id + showPage + index"
          v-if="mainItem.id !== 'ContentCards'">
          <q-item-main>
            <q-item-tile label>{{ mainItem.name }}</q-item-tile>
            </q-item-main>
          <q-item-side right>
            <q-item-tile>{{ todo[mainItem.id] }}</q-item-tile>
          </q-item-side>
        </q-item>
        <div
          :key="mainItem.id + showPage + index"
          v-else>
          <q-card
            class="q-ma-sm"
            v-for="(cardItem, index) in mainItem.values"
            :key="cardItem.id + showPage + index">
            <q-card-title>
              {{ cardItem.name }}
            </q-card-title>
            <q-card-main v-html="todo[cardItem.id]"></q-card-main>
          </q-card>
        </div>
      </template>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'DefaultPage',
  props: {
    showPage: {
      type: String
    },
    todo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    todoDetailData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.default-page
  background-color $pageconbg
</style>

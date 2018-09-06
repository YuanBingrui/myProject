<template>
  <div class="type01-page" v-if="todoDetailData">
    <PageHeader
      v-if="todoDetailData.HeaderInfo"
      :master="master"
      :header-info="todoDetailData.HeaderInfo"/>
    <q-list v-if="todoDetailData.MainContent" class="q-my-sm">
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
            <q-item-tile v-if="mainItem.html" v-html="master[mainItem.id]"></q-item-tile>
            <q-item-tile v-else>{{ master[mainItem.id] }}</q-item-tile>
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
            <q-card-main v-html="master[cardItem.id]"></q-card-main>
          </q-card>
        </div>
      </template>
    </q-list>
    <template v-if="todoDetailData.DetailsContent">
      <q-card
        flat
        v-for="(detail, index) in details"
        :key="showPage + '_detail' + index">
        <q-card-title v-if="todoDetailData.DetailsContent.Title">
          {{ detail[todoDetailData.DetailsContent.Title.id] }}
          <q-list no-border>
            <q-item style="font-weight: bold">
              <q-item-main>
                <q-item-tile label>
                  {{ detail[todoDetailData.DetailsContent.Title.sub_id] }}
                </q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-item-tile>
                  {{ detail[todoDetailData.DetailsContent.Title.sub_des] }}
                </q-item-tile>
              </q-item-side>
            </q-item>
          </q-list>
        </q-card-title>
        <q-card-main>
          <q-list>
            <q-item
              separator
              v-for="(detailItem, index) in todoDetailData.DetailsContent.Content"
              :key="detailItem.id + showPage + '_detail' + index">
              <q-item-main>
                <q-item-tile label>{{ detailItem.name }}</q-item-tile>
              </q-item-main>
              <q-item-side right>
                <q-item-tile>{{ detail[detailItem.id] }}</q-item-tile>
              </q-item-side>
            </q-item>
          </q-list>
        </q-card-main>
      </q-card>
    </template>
    <template v-if="todoDetailData.DetailsCards">
      <q-card flat>
        <q-card-title v-if="todoDetailData.DetailsCards.Title">
          {{ todoDetailData.DetailsCards.Title.name }}
        </q-card-title>
        <q-card-main>
          <q-list>
            <q-item
              separator
              v-for="(detail, index) in details"
              :key="showPage + '_detail' + index">
              <q-item-main>
                <q-item-tile label>{{ detail[todoDetailData.DetailsCards.Content.main_id] }}</q-item-tile>
                <q-item-tile sublabel lines="3">
                  {{ detail[todoDetailData.DetailsCards.Content.con_id] }}&nbsp;&nbsp;{{ detail[todoDetailData.DetailsCards.Content.sub_con_id] }}
                </q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-card-main>
      </q-card>
    </template>
  </div>
</template>

<script>
import PageHeader from 'components/mobile/todo/PageHeader'

export default {
  name: 'Type01Page',
  components: {
    PageHeader
  },
  props: {
    showPage: {
      type: String
    },
    master: {
      type: Object,
      default: () => {
        return {}
      }
    },
    details: {
      type: Array,
      default: () => {
        return []
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
.type01-page
  background-color $pageconbg
</style>

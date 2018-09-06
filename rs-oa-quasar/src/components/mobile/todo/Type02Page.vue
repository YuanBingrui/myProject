<template>
  <div class="type02-page" v-if="todoDetailData">
    <q-list separator>
      <q-collapsible
        v-if="todoDetailData.Collapsible"
        :label="todoDetailData.Collapsible.name">
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
              <template v-if="!mainItem.lines">
                <q-item-main>
                  <q-item-tile label>{{ mainItem.name }}</q-item-tile>
                </q-item-main>
                <q-item-side right>
                  <q-item-tile v-if="mainItem.html" v-html="master[mainItem.id]"></q-item-tile>
                  <q-item-tile v-else>{{ master[mainItem.id] }}</q-item-tile>
                </q-item-side>
              </template>
              <template v-else>
                <q-item-main>
                  <q-item-tile label>{{ mainItem.name }}</q-item-tile>
                  <q-item-tile sublabel :lines="mainItem.lines">{{ master[mainItem.id] }}</q-item-tile>
                </q-item-main>
              </template>
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
      </q-collapsible>
      <q-collapsible
        v-if="todoDetailData.DetailsCollapsible"
        :label="todoDetailData.DetailsCollapsible.name">
        <template v-if="todoDetailData.DetailsContent">
          <q-card
            flat
            v-for="(detail, index) in details"
            :key="showPage + '_detail' + index">
            <q-card-title v-if="todoDetailData.DetailsContent.Title">
              {{ detail[todoDetailData.DetailsContent.Title.id] }}
              <q-list v-if="todoDetailData.DetailsContent.Title.sub_id" no-border>
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
                  <template v-if="!detailItem.lines">
                    <q-item-main>
                      <q-item-tile label>{{ detailItem.name }}</q-item-tile>
                    </q-item-main>
                    <q-item-side right>
                      <q-item-tile>{{ detail[detailItem.id] }}</q-item-tile>
                    </q-item-side>
                  </template>
                  <template v-else>
                    <q-item-main>
                      <q-item-tile label>{{ detailItem.name }}</q-item-tile>
                      <q-item-tile sublabel :lines="detailItem.lines">{{ detail[detailItem.id] }}</q-item-tile>
                    </q-item-main>
                  </template>
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
      </q-collapsible>
      <q-collapsible
        v-if="todoDetailData.Details1Collapsible"
        :label="todoDetailData.Details1Collapsible.name">
        <template v-if="todoDetailData.Details1Content">
          <q-card
            flat
            v-for="(detailone, index) in detail1"
            :key="showPage + '_detail' + index">
            <q-card-title v-if="todoDetailData.Details1Content.Title">
              {{ detailone[todoDetailData.Details1Content.Title.id] }}
            </q-card-title>
            <q-card-main>
              <q-list>
                <q-item
                  separator
                  v-for="(detailItem, index) in todoDetailData.Details1Content.Content"
                  :key="detailItem.id + showPage + '_detail' + index">
                  <q-item-main>
                    <q-item-tile label>{{ detailItem.name }}</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-item-tile>{{ detailone[detailItem.id] }}</q-item-tile>
                  </q-item-side>
                </q-item>
              </q-list>
            </q-card-main>
          </q-card>
        </template>
        <template v-if="todoDetailData.Details1TableContent">
          <div
            class="table-box"
            v-for="(detailone, index) in detail1"
            :key="showPage + '_detail' + index">
            <div
              v-for="(contentone, index) in todoDetailData.Details1TableContent.Content"
              :key="showPage + '_detail_table' + index">
              <div class="table-header">
                <div class="table-header-left">{{ contentone.name }}</div>
                <div class="table-header-right">{{ contentone.GHNAME }}：{{ detail[contentone.GHID] }}</div>
              </div>
              <table>
                <tr>
                  <th
                    v-for="(tabalecontentone, index) in todoDetailData.Details1TableContent.TableContent"
                    :key="showPage + '_detail_table_th' + index">
                    {{ tabalecontentone.name }}
                  </th>
                </tr>
                <tr *ngFor="let beforeone of detail.before ">
                  <td
                    v-for="(tabalecontentone, index) in todoDetailData.Details1TableContent.TableContent"
                    :key="showPage + '_detail_table_td' + index">
                    {{ beforeone[tabalecontentone.id] }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </template>
      </q-collapsible>
    </q-list>
  </div>
</template>

<script>
import PageHeader from 'components/mobile/todo/PageHeader'

export default {
  name: 'Type02Page',
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
    detail1: {
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
.type02-page
  background-color $pageconbg
  .table-box
    border-bottom 1px rgba(0,0,0,0.3) solid
    margin-bottom 7px
    .table-header
      width 95%
      margin 2px auto
      border-bottom 1px rgba(56,171,255,0.5) solid
      padding 5px 0
      display flex
      align-items center
      justify-content space-between
      &-left
        font-weight bold
        font-size initial
      &-right
        color #999999
    table
      width 95%
      margin 2px auto
      & tr td
        text-align center
      & tr th,td
        padding 5px 10px
        font-size 12px
        font-family Verdana
        border 2px #fff solid
        border-radius 7px
      & tr:nth-child(even)
        background rgba(56,171,255,0.5)
      & tr:nth-child(odd)
        background #FFF
</style>

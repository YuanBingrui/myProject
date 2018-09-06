<template>
  <q-list v-if="headerInfo">
    <q-item>
      <q-item-side avatar="assets/logo.png" />
      <q-item-main>
        <q-item-tile label>{{ master[headerInfo.MC_id] }}</q-item-tile>
      </q-item-main>
      <q-item-side right>
        <q-item-tile>{{ master[headerInfo.SJ_id] }}</q-item-tile>
      </q-item-side>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    master: {
      type: Object
    },
    headerInfo: {
      type: Object
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

export default {
  state: {
    searchIsShow: false,
    todoTabIsShow: false,
    queryText: '',
    worklogFilterModal: false,
    thingFilterModal: false,
    worklogSysCount: null,
    todoFilter: {
      myType: 'ALL',
      myDays: 'ALL'
    },
    todoTypes: [],
    documentTabIsShow: false,
    numWdlx: 1,
    bottomTabIsShow: false,
    moveFrom: 'moveFromRight',
    moveTo: 'moveToLeft'
  },
  getters: {},
  mutations: {
    setPageAnimation: (state, derection) => {
      if (derection === 'enter') {
        state.moveFrom = 'moveFromRight'
        state.moveTo = 'moveToLeft'
      } else {
        state.moveFrom = 'moveFromLeft'
        state.moveTo = 'moveToRight'
      }
    },
    showSearchInput: state => {
      state.searchIsShow = true
    },
    hideSearchInput: state => {
      state.searchIsShow = false
    },
    showTodoTopTab: state => {
      state.todoTabIsShow = true
    },
    hideTodoTopTab: state => {
      state.todoTabIsShow = false
    },
    showDocumentTopTab: state => {
      state.documentTabIsShow = true
    },
    hideDocumentTopTab: state => {
      state.documentTabIsShow = false
    },
    updateQuerytext: (state, queryText) => {
      state.queryText = queryText
    },
    clearQuerytext: state => {
      state.queryText = ''
    },
    changeWorklogFilterModalShow: (state, isShow) => {
      state.worklogFilterModal = isShow
    },
    changeThingFilterModalShow: (state, isShow) => {
      state.thingFilterModal = isShow
    },
    setWorklogSysCount: (state, sysCount) => {
      state.worklogSysCount = sysCount
    },
    updateTodoTypes: (state, todoTypes) => {
      state.todoTypes = todoTypes
    },
    updateTodoFilter: (state, filter) => {
      state.todoFilter[filter.type] = filter.data
    },
    changeNumWdlxValue: (state, numWdlx) => {
      state.numWdlx = numWdlx
    },
    showBottomTab: state => {
      state.bottomTabIsShow = true
    },
    hideBottomTab: state => {
      state.bottomTabIsShow = false
    }
  },
  actions: {}
}

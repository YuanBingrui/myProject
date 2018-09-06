export function getWeekCN(weekday) {
  let result = ''
  switch (weekday) {
    case 1:
      result = '星期一'
      break
    case 2:
      result = '星期二'
      break
    case 3:
      result = '星期三'
      break
    case 4:
      result = '星期四'
      break
    case 5:
      result = '星期五'
      break
    case 6:
      result = '星期六'
      break
    case 7:
      result = '星期日'
      break
  }
  return result
}

export const menuBtnList = [
  {
    id: 'DBSY',
    iconName: 'list',
    iconColor: 'text-red',
    routerTo: {
      name: 'mobiletodo',
      params: { pageTitle: '待办事宜' }
    },
    name: '待办事宜'
  },
  {
    id: 'WDSW',
    iconName: 'account_circle',
    iconColor: 'text-blue',
    routerTo: {
      name: 'mobilebusiness',
      params: { pageTitle: '我的事务' }
    },
    name: '我的事务'
  },
  {
    id: 'XXYJ',
    iconName: 'access_alarm',
    iconColor: 'text-red',
    routerTo: {
      name: 'mobilealarm',
      params: { pageTitle: '消息预警' }
    },
    name: '消息预警'
  },
  {
    id: 'DZGG',
    iconName: 'notifications',
    iconColor: 'text-orange',
    routerTo: {
      name: 'mobilenotice',
      params: { pageTitle: '电子公告' }
    },
    name: '电子公告'
  },
  {
    id: 'WDZX',
    iconName: 'folder',
    iconColor: 'text-blue',
    routerTo: {
      name: 'mobiledocument',
      params: { pageTitle: '文档中心' }
    },
    name: '文档中心'
  },
  {
    id: 'GZRZ',
    iconName: 'border_color',
    iconColor: 'text-blue',
    routerTo: {
      name: 'mobileworklog',
      params: { pageTitle: '工作日志' }
    },
    name: '工作日志',
    isUnShow: true
  },
  {
    id: 'SWSQ',
    iconName: 'event_note',
    iconColor: 'text-blue',
    routerTo: {
      name: 'mobilething',
      params: { pageTitle: '事务申请' }
    },
    name: '事务申请',
    isUnShow: true
  },
  {
    id: 'GYYY',
    iconName: 'info',
    iconColor: 'text-blue',
    routerTo: {
      name: 'mobileabout',
      params: { pageTitle: '关于应用' }
    },
    name: '关于应用'
  },
  {
    id: 'TCDL',
    iconName: 'exit_to_app',
    iconColor: 'text-red',
    routerTo: 'mobilelogin',
    name: '退出登录'
  }
]

export const tabBtnList = [
  {
    id: 'SY',
    iconName: 'home',
    routerTo: { name: 'mobilehome' },
    name: '首页'
  },
  {
    id: 'DB',
    iconName: 'list',
    routerTo: { name: 'mobiletodo' },
    name: '待办'
  },
  {
    id: 'SW',
    iconName: 'account_circle',
    routerTo: { name: 'mobilebusiness' },
    name: '事务'
  },
  {
    id: 'XX',
    iconName: 'access_alarm',
    routerTo: { name: 'mobilealarm' },
    name: '消息'
  },
  {
    id: 'GG',
    iconName: 'notifications',
    routerTo: { name: 'mobilenotice' },
    name: '公告'
  }
]

export const noticeList = [
  { id: 'GGXX_GGNR', html: true },
  { id: 'GGFL_FLMC', name: '公告分类' },
  { id: 'GGXX_BLTS', name: '保留天数' },
  { id: 'RYXX_MC', name: '发布人' },
  { id: 'GGXX_FBSJ', name: '发布时间' },
  { id: 'GGXX_WHR', name: '维护人' },
  { id: 'GGXX_WHSJ', name: '维护时间' }
]

export const alarmList = [
  { id: 'MSLOG_TITLE', name: '标题' },
  { id: 'MSLOG_CONTENT', name: '预警内容' },
  { id: 'YYMK_MC', name: '来源模块' },
  { id: 'MSLOG_TXSJ', name: '预警时间' }
]

export const worklogList = [
  { id: 'GZRZ_GZRQ', name: '工作日期', type: 'datetime' },
  { id: 'GZRZ_GS', name: '工时(天)', type: 'input' },
  { id: 'GZRZ_FL', name: '分类', type: 'select' },
  { id: 'GZRZ_JHID', name: '工作计划', type: 'select' },
  { id: 'GCXM_XMMC', name: '项目', type: 'item' },
  { id: 'XMRW_SUBJECT', name: '项目任务', type: 'item' },
  { id: 'GZRZ_WFPNAME', name: '状态', type: 'item' },
  { id: 'GZRZ_ZT', name: '主题', type: 'textarea', lines: 3 },
  { id: 'GZRZ_RZNR', name: '内容', type: 'textarea', lines: 5 },
  { id: 'GZRZ_BZ', name: '备注', type: 'textarea', lines: 5 },
  { id: 'GZRZ_WHR', name: '维护人', type: 'item' },
  { id: 'GZRZ_WHSJ', name: '维护时间', type: 'item' }
]

export const thingList = [
  { id: 'SWSQ_SWID', name: '事务编号', type: 'input' },
  { id: 'SWSQ_SWLX', name: '事务类型', type: 'select' },
  { id: 'SWSQ_SWZT', name: '事务主题', type: 'input' },
  { id: 'SWSQ_ZT', name: '状态', type: 'input' },
  { id: 'SWSQ_BMID', name: '申请部门', type: 'select' },
  { id: 'SWSQ_SQRQ', name: '申请日期', type: 'datetime' },
  { id: 'SWSQ_QSRQ', name: '执行起始日期', type: 'datetime' },
  { id: 'SWSQ_ZZRQ', name: '执行终止日期', type: 'datetime' },
  { id: 'SWSQ_CYRY', name: '参与人员', type: 'select' },
  { id: 'SWSQ_SQR', name: '申请人', type: 'select' },
  { id: 'SWSQ_SQSY', name: '申请事由', type: 'textarea', lines: 4 },
  { id: 'SWSQ_BZ', name: '备注', type: 'textarea', lines: 4 },
  { id: 'SWSQ_WHR', name: '维护人', type: 'input' },
  { id: 'SWSQ_WHSJ', name: '维护时间', type: 'datetime' }
]

export const todoTimeOptions = [
  { label: '全部', value: 'ALL' },
  { label: '一周内', value: '7' },
  { label: '10天内', value: '10' },
  { label: '20天内', value: '20' },
  { label: '30天内', value: '30' }
]

export const modeoptions = [
  { label: '提交', value: 'wfopGO' },
  { label: '退回', value: 'wfopGOBACK' },
  { label: '否决', value: 'wfopVeto' },
  { label: '转交', value: 'wfopTRANSFER' },
  { label: '撤回', value: 'wfopPULLBACK' },
  { label: '我来处理', value: 'wfopIDO' },
  { label: '调度', value: 'wfopManage' }
]

export const showSearchPages = {
  mobiletodo: 'mobiletodo',
  mobilebusiness: 'mobilebusiness',
  mobilething: 'mobilething',
  mobileworklog: 'mobileworklog',
  mobilealarm: 'mobilealarm',
  mobilenotice: 'mobilenotice',
  mobiledocument: 'mobiledocument',
  mobiledocumentdetail: 'mobiledocumentdetail'
}

export const rowsDataTrimValueProperty = rows => {
  if (Array.isArray(rows) && rows.length > 0) {
    let result = []
    rows.forEach(item => {
      let newItem = {}
      for (let prop in item) {
        item.hasOwnProperty(prop) && (newItem[prop] = item[prop].value)
      }
      result.push(newItem)
    })
    return result
  } else {
    return rows
  }
}

export const weX5RowsDataTrimValueProperty = rows => {
  if (Array.isArray(rows) && rows.length > 0) {
    let result = []
    rows.forEach(item => {
      let newItem = {}
      for (let prop in item) {
        if (item.hasOwnProperty(prop)) {
          if (item[prop] && item[prop].value) {
            newItem[prop] = item[prop].value
          }
        }
      }
      result.push(newItem)
    })
    return result
  }
  return rows
}

export const weX5MasterDataToObject = master => {
  if (Array.isArray(master) && master.length > 0) {
    let result = {}
    master.forEach(item => {
      result[item.fldid] = item.fldvalue
    })
    return result
  }
  return {}
}

export const deleteComma = username => {
  return username.replace(/(^\,*)|(\,*$)/g, '')
}

export const arrayDeepClone = from => {
  let to = []
  from.forEach(function(item) {
    to.push(JSON.parse(JSON.stringify(item)))
  })
  return to
}

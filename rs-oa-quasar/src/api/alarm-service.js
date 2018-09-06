import { httpService } from './http-service'

var columns = {
  MSLOG_CONTENT: { name: 'MSLOG_CONTENT', type: 'String' },
  MSLOG_ID: { name: 'MSLOG_ID', type: 'String' },
  MSLOG_READ: { name: 'MSLOG_READ', type: 'String' },
  MSLOG_READ_SHOW: { name: 'MSLOG_READ_SHOW', type: 'String' },
  MSLOG_TITLE: { name: 'MSLOG_TITLE', type: 'String' },
  MSLOG_TXSJ: { name: 'MSLOG_TXSJ', type: 'Striing' },
  SJLX: { name: 'SJLX', type: 'String' },
  SJLX_SHOW: { name: 'SJLX_SHOW', type: 'String' },
  YYMK_MC: { name: 'YYMK_MC', type: 'String' }
}

export const alarmService = {
  /**
   * 获取消息预警列表
   * @param limit 记录的数量
   * @param offset 记录的页数，从1开始
   */
  getAlarmList: (limit, offset) => {
    let url = 'rshareapi'
    let body =
      'action=3&params=' +
      JSON.stringify({
        cloumns: this.columns,
        limit: limit,
        offset: offset,
        action: 3,
        funtype: 2
      })
    return httpService.post(url, body)
  },
  getAlarmDetail: logid => {
    let url = 'rshareapi'
    let body =
      'action=301&params=' +
      JSON.stringify({
        LogID: logid,
        action: 301
      })
    return httpService.post(url, body)
  }
}

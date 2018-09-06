import { httpService } from './http-service'

var columns = {
  SWLX: { name: 'SWLX', type: 'String' },
  WFAWT_PNAME: { name: 'WFAWT_PNAME', type: 'Striing' },
  WFAWT_TITLE: { name: 'WFAWT_TITLE', type: 'String' },
  WFAWT_WFID: { name: 'WFAWT_WFID', type: 'String' },
  WFDEF_NAME: { name: 'WFDEF_NAME', type: 'String' },
  WFINST_WUSER: { name: 'WFINST_WUSER', type: 'String' },
  WFOPT_ZJID: { name: 'WFOPT_ZJID', type: 'String' }
}

export const businessService = {
  /**
   * 获取我的事务列表
   * @param limit 记录的数量
   * @param offset 记录的页数，从1开始
   */
  getBusinessList: (limit, offset) => {
    let url = 'rshareapi'
    let body =
      'action=3&params=' +
      JSON.stringify({
        cloumns: columns,
        limit: limit,
        offset: offset,
        action: 3,
        funtype: 4,
        Condition: ''
      })
    return httpService.post(url, body)
  },
  /**
   * 获取审批流程信息
   * @param wfid 物料id
   * @param wfinst 物料inst信息
   */
  getFlowInfo: (wfid, wfinst) => {
    let columns = {
      USERS_NAME: { name: 'USERS_NAME', type: 'String' },
      WFLOG_COMMENT: { name: 'WFLOG_COMMENT', type: 'String' },
      WFLOG_HUSERID: { name: 'WFLOG_HUSERID', type: 'String' },
      WFLOG_HWAY: { name: 'WFLOG_HWAY', type: 'String' },
      WFLOG_REND: { name: 'WFLOG_REND', type: 'String' }
    }
    let url = 'rshareapi'
    let body =
      'action=3&params=' +
      JSON.stringify({
        wfid: wfid,
        wfinst: wfinst,
        action: 3,
        funtype: 11,
        cloumns: columns
      })
    return httpService.post(url, body)
  }
}

import { httpService } from './http-service'

var planColumns = {
  ZJH_JHID: { name: 'ZJH_JHID', type: 'String' },
  ZJHMX_RWZYX: { name: 'ZJHMX_RWZYX', type: 'String' },
  ZJHMX_NR: { name: 'ZJHMX_NR', type: 'String' }
}
var logColumns = {
  GZRZ_RZID: { name: 'GZRZ_RZID', type: 'String' },
  GZRZ_GZRQ: { name: 'GZRZ_GZRQ', type: 'String' },
  GZRZ_GS: { name: 'GZRZ_GS', type: 'String' },
  GZRZ_ZT: { name: 'GZRZ_ZT', type: 'String' },
  GZRZ_RZNR: { name: 'GZRZ_RZNR', type: 'String' },
  GZRZ_BZ: { name: 'GZRZ_BZ', type: 'String' },
  GZRZ_WHRID: { name: 'GZRZ_WHRID', type: 'String' },
  GZRZ_WHR: { name: 'GZRZ_WHR', type: 'String' },
  GZRZ_WHSJ: { name: 'GZRZ_WHSJ', type: 'String' },
  GZRZ_WFPID: { name: 'GZRZ_WFPID', type: 'String' },
  GZRZ_WFPNAME: { name: 'GZRZ_WFPNAME', type: 'String' },
  GCXM_XMMC: { name: 'GCXM_XMMC', type: 'String' },
  XMRW_SUBJECT: { name: 'XMRW_SUBJECT', type: 'String' },
  GZRZ_JHID: { name: 'GZRZ_JHID', type: 'String' },
  GZRZ_FL: { name: 'GZRZ_FL', type: 'String' }
}

export const worklogService = {
  /**
   * 获取工作计划
   * @param workDate 工作日期
   */
  getWorkPlan: workDate => {
    let url = 'rshareapi'
    let body =
      'action=2002&params=' +
      JSON.stringify({
        cloumns: planColumns,
        action: 2002,
        funtype: 1,
        gzrq: workDate
      })
    return httpService.post(url, body)
  },
  /**
   * 获取工作日志列表
   * @param limit 记录的数量
   * @param offset 记录的页数，从1开始
   * @param wfwork
   * @param qsgzrq 起始工作日期
   * @param qsgzrq 终止工作日期
   */
  getWorklogList: (limit, offset, wfwork, qsgzrq, zzgzrq) => {
    let url = 'rshareapi'
    let body =
      'action=2003&params=' +
      JSON.stringify({
        cloumns: logColumns,
        limit: limit,
        offset: offset,
        action: 2003,
        funtype: 2,
        wfwork: wfwork,
        qsgzrq: qsgzrq,
        zzgzrq: zzgzrq
      })
    return httpService.post(url, body)
  },
  /**
   * 插入新的工作日志
   * @param worklogContent 工作日志内容
   */
  insertWorklog: worklogContent => {
    let url = 'rshareapi'
    let body =
      'action=2001&params=' +
      JSON.stringify({
        action: 2001,
        czlx: 'I',
        data: {
          GZRZ_RZID: '',
          GZRZ_GZRQ: worklogContent.GZRZ_GZRQ,
          GZRZ_GS: worklogContent.GZRZ_GS,
          GZRZ_ZT: worklogContent.GZRZ_ZT,
          GZRZ_RZNR: worklogContent.GZRZ_RZNR,
          GZRZ_BZ: worklogContent.GZRZ_BZ,
          GZRZ_FL: worklogContent.GZRZ_FL,
          GZRZ_JHID: worklogContent.GZRZ_JHID
        }
      })
    return httpService.post(url, body)
  },
  /**
   * 修改工作日志
   * @param worklogContent 工作日志内容
   */
  editWorklog: worklogContent => {
    let url = 'rshareapi'
    let body =
      'action=2001&params=' +
      JSON.stringify({
        action: 2001,
        czlx: 'U',
        data: {
          GZRZ_RZID: worklogContent.GZRZ_RZID,
          GZRZ_GZRQ: worklogContent.GZRZ_GZRQ,
          GZRZ_GS: worklogContent.GZRZ_GS,
          GZRZ_ZT: worklogContent.GZRZ_ZT,
          GZRZ_RZNR: worklogContent.GZRZ_RZNR,
          GZRZ_BZ: worklogContent.GZRZ_BZ,
          GZRZ_FL: worklogContent.GZRZ_FL,
          GZRZ_JHID: worklogContent.GZRZ_JHID
        }
      })
    return httpService.post(url, body)
  },
  /**
   * 删除工作日志
   * @param worklogContent 工作日志内容
   */
  deleteWorklog: worklogContent => {
    let url = 'rshareapi'
    let body =
      'action=2001&params=' +
      JSON.stringify({
        action: 2001,
        czlx: 'D',
        data: {
          GZRZ_RZID: worklogContent.GZRZ_RZID,
          GZRZ_GZRQ: '',
          GZRZ_GS: '',
          GZRZ_ZT: '',
          GZRZ_RZNR: '',
          GZRZ_BZ: '',
          GZRZ_FL: '',
          GZRZ_JHID: ''
        }
      })
    return httpService.post(url, body)
  }
}

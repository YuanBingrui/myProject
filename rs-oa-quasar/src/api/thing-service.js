import { httpService } from './http-service'

var thingColumns = {
  SWSQ_SWID: { name: 'SWSQ_SWID', type: '' },
  SWSQ_SQRID: { name: 'SWSQ_SQRID', type: '' },
  SWSQ_SQBM: { name: 'SWSQ_SQBM', type: '' },
  SWSQ_CYRY: { name: 'SWSQ_CYRY', type: '' },
  SWSQ_SWZT: { name: 'SWSQ_SWZT', type: '' },
  SWSQ_SQSY: { name: 'SWSQ_SQSY', type: '' },
  SWSQ_SWLX: { name: 'SWSQ_SWLX', type: '' },
  SWSQ_BZ: { name: 'SWSQ_BZ', type: '' },
  SWSQ_SQRQ: { name: 'SWSQ_SQRQ', type: '' },
  SWSQ_QSRQ: { name: 'SWSQ_QSRQ', type: '' },
  SWSQ_ZZRQ: { name: 'SWSQ_ZZRQ', type: '' },
  SWSQ_CYRYMC: { name: 'SWSQ_ZZRQ', type: '' }
}

export const thingService = {
  getPersonData: () => {
    let url = 'rshareapi'
    let body =
      'action=9002&params=' +
      JSON.stringify({
        action: 9002,
        funtype: 90020001
      })
    return httpService.post(url, body)
  },
  getWorkTypeData: () => {
    let url = 'rshareapi'
    let body =
      'action=9002&params=' +
      JSON.stringify({
        action: 9002,
        funtype: 90020003
      })
    return httpService.post(url, body)
  },
  getDepartment: () => {
    let url = 'rshareapi'
    let body =
      'action=9002&params=' +
      JSON.stringify({
        action: 9002,
        funtype: 90020002
      })
    return httpService.post(url, body)
  },
  getThingList: (limit, offset, wfwork, qssqrq, zzsqrq) => {
    let url = 'rshareapi'
    let body =
      'action=2005&params=' +
      JSON.stringify({
        cloumns: thingColumns,
        limit: limit,
        offset: offset,
        action: 2005,
        wfwork: wfwork,
        qssqrq: qssqrq,
        zzsqrq: zzsqrq
      })
    return httpService.post(url, body)
  },
  insertThing: thingContent => {
    let url = 'rshareapi'
    let body =
      'action=2004&params=' +
      JSON.stringify({
        action: 2004,
        czlx: 'I',
        data: {
          SWSQ_SWID: thingContent.SWSQ_SWID,
          SWSQ_SQR: thingContent.SWSQ_SQR,
          SWSQ_BMID: thingContent.SWSQ_BMID,
          SWSQ_CYRY: thingContent.SWSQ_CYRY,
          SWSQ_SWZT: thingContent.SWSQ_SWZT,
          SWSQ_SQSY: thingContent.SWSQ_SQSY,
          SWSQ_SWLX: thingContent.SWSQ_SWLX,
          SWSQ_BZ: thingContent.SWSQ_BZ,
          SWSQ_SQRQ: thingContent.SWSQ_SQRQ,
          SWSQ_QSRQ: thingContent.SWSQ_QSRQ,
          SWSQ_ZZRQ: thingContent.SWSQ_ZZRQ
        }
      })
    return httpService.post(url, body)
  },
  editThing: thingContent => {
    let url = 'rshareapi'
    let body =
      'action=2004&params=' +
      JSON.stringify({
        action: 2004,
        czlx: 'U',
        data: {
          SWSQ_SWID: thingContent.SWSQ_SWID,
          SWSQ_SQR: thingContent.SWSQ_SQR,
          SWSQ_BMID: thingContent.SWSQ_BMID,
          SWSQ_CYRY: thingContent.SWSQ_CYRY,
          SWSQ_SWZT: thingContent.SWSQ_SWZT,
          SWSQ_SQSY: thingContent.SWSQ_SQSY,
          SWSQ_SWLX: thingContent.SWSQ_SWLX,
          SWSQ_BZ: thingContent.SWSQ_BZ,
          SWSQ_SQRQ: thingContent.SWSQ_SQRQ,
          SWSQ_QSRQ: thingContent.SWSQ_QSRQ,
          SWSQ_ZZRQ: thingContent.SWSQ_ZZRQ
        }
      })
    return httpService.post(url, body)
  },
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
  },
  getHandleContent: (
    task_classid,
    task_statusid,
    task_id,
    task_inst,
    task_proctype
  ) => {
    let url = 'rshareapi'
    let body =
      'action=31&params=' +
      JSON.stringify({
        task_classid: task_classid,
        task_statusid: task_statusid,
        task_id: task_id,
        task_inst: task_inst,
        task_proctype: task_proctype,
        action: '31'
      })
    return httpService.post(url, body)
  },
  doSubmit: params => {
    let url = 'rshareapi'
    let body =
      'action=4&params=' +
      JSON.stringify({
        task_classid: params.task_classid,
        task_statusid: params.task_statusid,
        task_id: params.task_id,
        task_inst: params.task_inst,
        task_proctype: params.task_proctype,
        task_nextsid: params.task_nextsid,
        comment: params.comment,
        nextusers: params.nextusers,
        action: '4'
      })
    return httpService.post(url, body)
  }
}

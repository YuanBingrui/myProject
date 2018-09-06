import { httpService } from './http-service'

var myNum = ''

export const documentService = {
  getDocumentList: (parent, search, flag, wdlx) => {
    let url = 'rshareapi'
    let paramsObj = {
      action: 8,
      search: search,
      time: new Date().getTime(),
      wdlx: wdlx,
      flag: flag
    }
    let body =
      'action=8&params=' +
      JSON.stringify(
        parent === 'search'
          ? paramsObj
          : Object.assign(paramsObj, { parent: parent })
      )
    return httpService.post(url, body)
  },
  downloadFile: (data, numWdlx) => {
    if (numWdlx === 1) {
      myNum = 'N'
    } else {
      myNum = 'Y'
    }
    let url = 'rshareapi'
    let body =
      'action=10&params=' +
      JSON.stringify({
        action: 10,
        WDXX_MLID: data.wDXX_MLID,
        WDXX_FJZ: data.wDXX_FJZ,
        FileID: data.id,
        FileName: data.name,
        FileVersion: data.wDXX_BB,
        WDXX_XTML: myNum
      })
    return httpService.post(url, body)
  }
}

import { httpService } from './http-service'

var columns = {
  GGFL_FLMC: { name: 'GGFL_FLMC', type: 'String' },
  GGXX_BLTS: { name: 'GGXX_BLTS', type: 'String' },
  GGXX_FBDXID: { name: 'GGXX_FBDXID', type: 'String' },
  GGXX_FBSJ: { name: 'GGXX_FBSJ', type: 'String' },
  GGXX_GGBT: { name: 'GGXX_GGBT', type: 'String' },
  GGXX_GGID: { name: 'GGXX_GGID', type: 'Striing' },
  GGXX_GGNR: { name: 'GGXX_GGNR', type: 'String' },
  GGXX_WHR: { name: 'GGXX_WHR', type: 'String' },
  GGXX_WHSJ: { name: 'GGXX_WHSJ', type: 'String' },
  RYXX_MC: { name: 'RYXX_MC', type: 'String' }
}

export const noticeService = {
  /**
   * 获取公告列表
   * @param limit 记录的数量
   * @param offset 记录的页数，从1开始
   */
  getNoticeList: (limit, offset) => {
    let url = 'rshareapi'
    let body =
      'action=3&params=' +
      JSON.stringify({
        cloumns: columns,
        limit: limit,
        offset: offset,
        action: 3,
        funtype: 3,
        Condition: ''
      })
    return httpService.post(url, body)
  }
}

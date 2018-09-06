import { httpService } from './http-service'
import { hex_md5 } from 'src/utils/md5'
import { LocalStorage } from 'quasar'

export const loginService = {
  /**
   * 实现登录
   * @param(Object) loginData 用户登录信息对象
   */
  login: function(loginData) {
    httpService.setServer(loginData.server)

    let url = 'rshareapi'
    let body =
      'action=2&params=' +
      JSON.stringify({
        deviceType: 1,
        entcode: loginData.corpid,
        userid: loginData.userid.toUpperCase(),
        passwd: hex_md5(
          loginData.userid + 'VKSOFT' + loginData.password + '1.0'
        ),
        clientid: null,
        msgkey: '-1'
      })
    return httpService.post(url, body)
  },
  /**
   * 实现退出
   */
  logout: function() {
    let url = 'rshareapi'
    let body =
      'action=6&params=' +
      JSON.stringify({
        action: 6
      })
    return httpService.post(url, body)
  },
  /**
   * 获取权限
   */
  getAuthority: function() {
    let url = 'rshareapi'
    let body =
      'action=9001&params=' +
      JSON.stringify({
        limit: 10,
        offset: 1,
        action: 9001,
        funtype: 13
      })
    return httpService.post(url, body)
  },
  /**
   * 实现自动登录
   */
  tryAutoLogin: function() {
    let _self = this
    return new Promise(function(resolve, reject) {
      if (LocalStorage.has('loginData')) {
        _self
          .login(JSON.parse(LocalStorage.get.item('loginData')))
          .then(res => {
            resolve(res)
          })
          .catch(() => {
            reject('auto login failed')
          })
      } else {
        reject('login storage empty')
      }
    })
  }
}

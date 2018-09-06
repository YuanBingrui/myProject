import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../http-service/http-service';
import { Md5ServiceProvider } from '../md5-service/md5-service';
import 'rxjs/operator/toPromise';
import { timeout } from 'rxjs/operators/timeout';

@Injectable()
export class LoginServiceProvider {

  constructor(
    public httpService: HttpServiceProvider,
    public md5Service: Md5ServiceProvider,
    public storage: Storage
  ) {
    console.log('Hello LoginService Provider');
  }

  doLogin(login): Promise<string> {
    let server = login.server;
    login.errorMessage = null;
    this.httpService.setServerPrefix(server);
    return this.login(login).then(data => {
      if (data && 0 === data.errcode) {
        this.saveLogin(login);
        return data;
      } else {
        login.errorMessage = this.formatErrorMessage(data.desc);
      }
    }).catch(
      err => console.error('err:', err)
    );
  }

  login(loginData): Promise<any> {
    loginData.corpid = loginData.corpid.toLowerCase();
    loginData.userid = loginData.userid.toUpperCase();

    let url = 'rshareapi';
    let body = 'action=2&params=' + JSON.stringify({
      deviceType: 1,
      action: 2,
      entcode: loginData.corpid,
      userid: loginData.userid.toUpperCase(),
      passwd: this.md5Service.hex_md5(loginData.userid + 'VKSOFT' + loginData.password + '1.0')
    });
    return this.httpService.post(url, body)
      .toPromise()
      .then((response: Response) => response.json())
      .catch(() => {
        loginData.errorMessage = '登录失败，请检查重试！';
        this.httpService.handleError;
      });
  }

  tryAutoLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('server').then(server => {
        if (server) {
          this.storage.get('corpid').then(corpid => {
            this.storage.get('userid').then(userid => {
              userid && this.storage.get('password').then(password => {
                if (password) {
                  this.doLogin({
                    server: server,
                    corpid: corpid,
                    userid: userid,
                    password: password
                  }).then(data => resolve(data)).catch(err => {
                    console.error('error:' + err);
                    reject('auto login failed');
                  });
                }
              })
            })
          });
        } else {
          reject('no saved server');
        }
      }).catch(() =>
      reject('failed to read storage'));
    });
  }

  logout(): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=3&params=' + JSON.stringify({ action: 3 });
    return this.httpService.post(url, body)
      .pipe(
        timeout(3000)
      )
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.httpService.handleError);
  }

  saveLogin(login) {
    this.storage.set('server', login.server);
    this.storage.set('corpid', login.corpid);
    this.storage.set('userid', login.userid);
    this.storage.set('password', login.password);
  }

  clearLogin() {
    // this.storage.remove('server');
    // this.storage.remove('corpid');
    // this.storage.remove('userid');
    this.storage.remove('password');
  }

  saveHistoryServer(historyServer) {
    for (let i = 0; i < historyServer.length; i++) {
      this.storage.set('historyServer'+i, historyServer[i]);
    } 
  }

  saveServerNum(serverNum){
    this.storage.set('serverNum', serverNum);
  }

  removeHistoryServer(index) {
    this.storage.remove('historyServer'+index);
  }

  formatErrorMessage(message) {
    return message ? message.replace('1^', '').replace('2^', '') : '未知错误';
  }

}

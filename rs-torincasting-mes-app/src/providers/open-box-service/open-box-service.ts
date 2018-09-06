import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';

@Injectable()
export class OpenBoxServiceProvider {

  constructor(
    public httpService: HttpServiceProvider
  ) {
    console.log('Hello OpenBoxServiceProvider Provider');
  }

  getOpenBoxPlans(userid: string, jhrq: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=6&params=' + JSON.stringify({
      action: 6,
      funtype: 14,
      userid: userid,
      jhrq: jhrq
    });
    return this.httpService.postRequest(url, body);
  }

  OpenBoxFeedback(userid: string, kxjhid: string, kxsj: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=60&params=' + JSON.stringify({
      action: 60,
      userid: userid,
      kxjhid: kxjhid,
      kxsj: kxsj
    });
    return this.httpService.postRequest(url, body);
  }

}

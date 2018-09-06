import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';

@Injectable()
export class SmeltingServiceProvider {

  constructor(
    public httpService: HttpServiceProvider
  ) {
    console.log('Hello SmeltingServiceProvider Provider');
  }

  getSmeltingFurnace(userid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=5&params=' + JSON.stringify({
      action: 5,
      funtype: 8,
      userid: userid
    });
    return this.httpService.postRequest(url, body);
  }

  getPits(userid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=50&params=' + JSON.stringify({
      action: 50,
      funtype: 9,
      userid: userid
    });
    return this.httpService.postRequest(url, body);
  }

  getTlCz(userid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=51&params=' + JSON.stringify({
      action: 51,
      userid: userid
    });
    return this.httpService.postRequest(url, body);
  }

  getPlanPitNumber(userid: string, jhrq: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=52&params=' + JSON.stringify({
      action: 52,
      funtype: 10,
      userid: userid,
      jhrq: jhrq
    });
    return this.httpService.postRequest(url, body);
  }

  getSmeltingPlans(userid: string, lcbh: any): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=53&params=' + JSON.stringify({
      action: 53,
      funtype: 11,
      userid: userid,
      lcbh: lcbh
    });
    return this.httpService.postRequest(url, body);
  }

  getTlmx(userid: string, lcbh: any, wlid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=54&params=' + JSON.stringify({
      action: 54,
      funtype: 12,
      userid: userid,
      lcbh: lcbh,
      wlid: wlid
    });
    return this.httpService.postRequest(url, body);
  }

  deleteTlmx(userid: string, fkidkist: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=55&params=' + JSON.stringify({
      action: 55,
      userid: userid,
      fkidkist: fkidkist
    });
    return this.httpService.postRequest(url, body);
  }

  newAddTlmx(userid: string, lcbh: string, kwid: string, wlid: string, tlsl: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=56&params=' + JSON.stringify({
      action: 56,
      userid: userid,
      lcbh: lcbh,
      bcbh: '',
      lx: 'Z',
      kwid: kwid,
      wlid: wlid,
      tlsl: tlsl
    });
    return this.httpService.postRequest(url, body);
  }

}

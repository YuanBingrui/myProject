import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';

@Injectable()
export class CastingServiceProvider {

  constructor(
    public httpService: HttpServiceProvider
  ) {
    console.log('Hello CastingServiceProvider Provider');
  }

  getListInfo(userid: string, jhrq: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=4&params=' + JSON.stringify({
      action: 4,
      funtype: 1,
      userid: userid,
      jhrq: jhrq
    });
    return this.httpService.postRequest(url, body);
  }

  getGlyy(userid: string) {
    let url = 'rshareapi';
    let body = 'action=40&params=' + JSON.stringify({
      action: 40,
      funtype: 6,
      userid: userid
    });
    return this.httpService.postRequest(url, body);
  }

  collectTemperature(userid: string, cwq: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=41&params=' + JSON.stringify({
      action: 41,
      funtype: 31,
      userid: userid,
      cwq: cwq
    });
    return this.httpService.postRequest(url, body);
  }

  getSinglePlanxlh(userid: string, jzjhid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=42&params=' + JSON.stringify({
      action: 42,
      funtype: 2,
      userid: userid,
      jzjhid: jzjhid
    });
    return this.httpService.postRequest(url, body);
  }

  changeXlh(userid: string, jzjhid: string, wd: string, lx: string, columns: any): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=44&params=' + JSON.stringify({
      action: 44,
      userid: userid,
      jzjhid: jzjhid,
      wd: wd,
      lx: lx,
      columns: columns
    });
    return this.httpService.postRequest(url, body);
  }

  updateJzfkUnxlh(userid: string, jzjhid: string, sl: string, wd: string, sjsj: string, zjsj: string) {
    let url = 'rshareapi';
    let body = 'action=45&params=' + JSON.stringify({
      action: 45,
      userid: userid,
      jzjhid: jzjhid,
      sl: sl,
      wd: wd,
      sjsj: sjsj,
      zjsj: zjsj
    });
    return this.httpService.postRequest(url, body);
  }

  getXlhGl(userid: string, jzjhid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=46&params=' + JSON.stringify({
      action: 46,
      funtype: 4,
      userid: userid,
      jzjhid: jzjhid
    });
    return this.httpService.postRequest(url, body);
  }

  getUnXlhGl(userid: string, jzjhid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=47&params=' + JSON.stringify({
      action: 47,
      funtype: 5,
      userid: userid,
      jzjhid: jzjhid
    });
    return this.httpService.postRequest(url, body);
  }

  updateJzXlhGl(userid: string, jzjhid: string, columns: any) {
    let url = 'rshareapi';
    let body = 'action=48&params=' + JSON.stringify({
      action: 48,
      userid: userid,
      jzjhid: jzjhid,
      columns: columns
    });
    return this.httpService.postRequest(url, body);
  }

  updateJzUnXlhGl(userid: string, jzjhid: string, columns: any) {
    let url = 'rshareapi';
    let body = 'action=49&params=' + JSON.stringify({
      action: 49,
      userid: userid,
      jzjhid: jzjhid,
      columns: columns
    });
    return this.httpService.postRequest(url, body);
  }

  inquireHistoryQuestion(userid: string, wlid: string) {
    let url = 'rshareapi';
    let body = 'action=410&params=' + JSON.stringify({
      action: 410,
      funtype: 7,
      userid: userid,
      wlid: wlid
    });
    return this.httpService.postRequest(url, body);
  }

  getSpecTemperatureGun(userid: string) {
    let url = 'rshareapi';
    let body = 'action=411&params=' + JSON.stringify({
      action: 411,
      funtype: 13,
      userid: userid
    });
    return this.httpService.postRequest(url, body);
  }

  submitSpecTemperatureGun(userid: string, jzjhid: string, cjid: string, cjfs: string, wd: string, cwsj: string, cwq: string) {
    let url = 'rshareapi';
    let body = 'action=412&params=' + JSON.stringify({
      action: 412,
      userid: userid,
      jzjhid: jzjhid,
      cjid: cjid,
      cjfs: cjfs,
      wd: wd,
      cwsj: cwsj,
      cwq: cwq
    });
    return this.httpService.postRequest(url, body);
  }

}

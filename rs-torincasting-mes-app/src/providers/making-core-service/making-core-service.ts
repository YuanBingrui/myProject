import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';

@Injectable()
export class MakingCoreServiceProvider {

  constructor(
    public httpService: HttpServiceProvider
  ) {
    console.log('Hello MakingCoreServiceProvider Provider');
  }

  inquireMakingCoreGW(userid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=9&params=' + JSON.stringify({
      action: 9,
      funtype: 26,
      userid: userid
    });
    return this.httpService.postRequest(url, body);
  }

  inquireMakingCorePlan(userid: string, gwid: string, jhrq: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=90&params=' + JSON.stringify({
      action: 90,
      funtype: 27,
      userid: userid,
      gwid: gwid,
      jhrq: jhrq
    });
    return this.httpService.postRequest(url, body);
  }

  inquireMakingCorePlanSample(userid: string, jhid: string, mxxh: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=91&params=' + JSON.stringify({
      action: 91,
      funtype: 28,
      userid: userid,
      jhid: jhid,
      mxxh: mxxh
    });
    return this.httpService.postRequest(url, body);
  }

  inquireMakingCorePlanDetail(userid: string, jhid: string, mxxh: string, yb: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=92&params=' + JSON.stringify({
      action: 92,
      funtype: 29,
      userid: userid,
      jhid: jhid,
      mxxh: mxxh,
      yb: yb
    });
    return this.httpService.postRequest(url, body);
  }

  addNewExamineSample(userid: string, jhid: string, mxxh: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=93&params=' + JSON.stringify({
      action: 93,
      userid: userid,
      jhid: jhid,
      mxxh: mxxh
    });
    return this.httpService.postRequest(url, body);
  }

  updateExamineDetail(userid: string, jhid: string, mxxh: string, yb: string, xh: string, jyjg: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=94&params=' + JSON.stringify({
      action: 94,
      userid: userid,
      jhid: jhid,
      mxxh: mxxh,
      yb: yb,
      xh: xh,
      jyjg: jyjg
    });
    return this.httpService.postRequest(url, body);
  }

  uploadImg(userid: string, jhid: string, mxxh: string, yb: string, xh: string, file: any): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=95&params=' + JSON.stringify({
      action: 95,
      userid: userid,
      jhid: jhid,
      mxxh: mxxh,
      yb: yb,
      xh: xh,
      file: file
    });
    return this.httpService.postRequest(url, body);
  }

  submitFx(userid: string, jhid: string, mxxh: string, fx: string, fxyj: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=96&params=' + JSON.stringify({
      action: 96,
      userid: userid,
      jhid: jhid,
      mxxh: mxxh,
      fx: fx,
      fxyj: fxyj
    });
    return this.httpService.postRequest(url, body);
  }

  viewFx(userid: string, jhid: string, mxxh: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=97&params=' + JSON.stringify({
      action: 97,
      funtype: 33,
      userid: userid,
      jhid: jhid,
      mxxh: mxxh
    });
    return this.httpService.postRequest(url, body);
  }

}

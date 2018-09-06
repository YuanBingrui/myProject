import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';

@Injectable()
export class ModelingServiceProvider {

  constructor(
    public httpService: HttpServiceProvider
  ) {
    console.log('Hello ModelingServiceProvider Provider');
  }

  inquireModelingGW(userid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=8&params=' + JSON.stringify({
      action: 8,
      funtype: 22,
      userid: userid
    });
    return this.httpService.postRequest(url, body);
  }

  inquireModelingPlan(userid: string, gwid: string, jhrq: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=80&params=' + JSON.stringify({
      action: 80,
      funtype: 23,
      userid: userid,
      gwid: gwid,
      jhrq: jhrq
    });
    return this.httpService.postRequest(url, body);
  }

  inquireModelingPlanSample(userid: string, gpid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=81&params=' + JSON.stringify({
      action: 81,
      funtype: 24,
      userid: userid,
      gpid: gpid
    });
    return this.httpService.postRequest(url, body);
  }

  inquireModelingPlanDetail(userid: string, gpid: string, yb: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=82&params=' + JSON.stringify({
      action: 82,
      funtype: 25,
      userid: userid,
      gpid: gpid,
      yb: yb
    });
    return this.httpService.postRequest(url, body);
  }

  addNewExamineSample(userid: string, gpid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=83&params=' + JSON.stringify({
      action: 83,
      userid: userid,
      gpid: gpid
    });
    return this.httpService.postRequest(url, body);
  }

  updateExamineDetail(userid: string, gpid: string, yb: string, xh: string, jyjg: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=84&params=' + JSON.stringify({
      action: 84,
      userid: userid,
      gpid: gpid,
      yb: yb,
      xh: xh,
      jyjg: jyjg
    });
    return this.httpService.postRequest(url, body);
  }

  selectMoldingSandType(userid: string, gpid: string, yb: string, xh: string, jyz: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=85&params=' + JSON.stringify({
      action: 85,
      userid: userid,
      gpid: gpid,
      yb: yb,
      xh: xh,
      jyz: jyz
    });
    return this.httpService.postRequest(url, body);
  }

  uploadImg(userid: string, gpid: string, yb: string, xh: string, file: any): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=86&params=' + JSON.stringify({
      action: 86,
      userid: userid,
      gpid: gpid,
      yb: yb,
      xh: xh,
      file: file
    });
    return this.httpService.postRequest(url, body);
  }

  submitFx(userid: string, gpid: string, fx: string, fxyj: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=87&params=' + JSON.stringify({
      action: 87,
      userid: userid,
      gpid: gpid,
      fx: fx,
      fxyj: fxyj
    });
    return this.httpService.postRequest(url, body);
  }

  viewFx(userid: string, gpid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=88&params=' + JSON.stringify({
      action: 88,
      funtype: 32,
      userid: userid,
      gpid: gpid
    });
    return this.httpService.postRequest(url, body);
  }

}

import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';

@Injectable()
export class SmeltingDetectionServiceProvider {

  constructor(
    public httpService: HttpServiceProvider
  ) {
    console.log('Hello SmeltingDetectionServiceProvider Provider');
  }

  inquireSmeltingDetection(userid: string, lcbh: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=7&params=' + JSON.stringify({
      action: 7,
      funtype: 15,
      userid: userid,
      lcbh: lcbh
    });
    return this.httpService.postRequest(url, body);
  }

  inquireAnalysisStandard(userid: string, jtph: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=70&params=' + JSON.stringify({
      action: 70,
      funtype: 16,
      userid: userid,
      jtph: jtph
    });
    return this.httpService.postRequest(url, body);
  }

  inquireSpectrumAnalysis(userid: string, lcbh: string) {
    let url = 'rshareapi';
    let body = 'action=71&params=' + JSON.stringify({
      action: 71,
      funtype: 17,
      userid: userid,
      lcbh: lcbh
    });
    return this.httpService.postRequest(url, body);
  }

  inquireHotAnalysis(userid: string, lcbh: string) {
    let url = 'rshareapi';
    let body = 'action=72&params=' + JSON.stringify({
      action: 72,
      funtype: 18,
      userid: userid,
      lcbh: lcbh
    });
    return this.httpService.postRequest(url, body);
  }

  getSpectrumAnalysis(userid: string, lcbh: string, jtph: string) {
    let url = 'rshareapi';
    let body = 'action=73&params=' + JSON.stringify({
      action: 73,
      funtype: 19,
      userid: userid,
      lcbh: lcbh,
      jtph: jtph
    });
    return this.httpService.postRequest(url, body);
  }

  getHotAnalysis(userid: string, lcbh: string, jtph: string) {
    let url = 'rshareapi';
    let body = 'action=74&params=' + JSON.stringify({
      action: 74,
      funtype: 20,
      userid: userid,
      lcbh: lcbh,
      jtph: jtph
    });
    return this.httpService.postRequest(url, body);
  }

  saveDetectionOrder(userid: string, lcbh: string, cjinfo: any, columns: any) {
    let url = 'rshareapi';
    let body = 'action=75&params=' + JSON.stringify({
      action: 75,
      userid: userid,
      lcbh: lcbh,
      rlcjid: cjinfo[0].CJID,
      rlwd: cjinfo[0].value,
      rlsj: cjinfo[0].CWSJ,
      rlcjsj: cjinfo[0].pickTime,
      rlcjfs: cjinfo[0].CJFS,
      rlcjr: userid,
      rlqh: cjinfo[0].CWQ,
      ctcjid: cjinfo[1].CJID,
      ctwd: cjinfo[1].value,
      ctsj: cjinfo[1].CWSJ,
      ctcjsj: cjinfo[1].pickTime,
      ctcjfs: cjinfo[1].CJFS,
      ctcjr: userid,
      ctqh: cjinfo[1].CWQ,
      columns: columns
    });
    return this.httpService.postRequest(url, body);
  }

  getUnqualifiedLcbh(userid: string, jhrq: string, zt) {
    let url = 'rshareapi';
    let body = 'action=76&params=' + JSON.stringify({
      action: 76,
      funtype: 21,
      userid: userid,
      jhrq: jhrq,
      zt: zt
    });
    return this.httpService.postRequest(url, body);
  }

  confirmLetGo(userid: string, lcbh: string, fxyj: string) {
    let url = 'rshareapi';
    let body = 'action=77&params=' + JSON.stringify({
      action: 77,
      userid: userid,
      lcbh: lcbh,
      fxyj: fxyj
    });
    return this.httpService.postRequest(url, body);
  }

}

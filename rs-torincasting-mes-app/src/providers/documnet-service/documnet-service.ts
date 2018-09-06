import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';

@Injectable()
export class DocumnetServiceProvider {

  constructor(
    public httpService: HttpServiceProvider
  ) {
    console.log('Hello DocumnetServiceProvider Provider');
  }

  getDocList(userid: string, lx: string, mkid: string, wlid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=9002&params=' + JSON.stringify({
      action: 9002,
      funtype: 30,
      userid: userid,
      lx: lx,
      mkid: mkid,
      wlid: wlid
    });
    return this.httpService.postRequest(url, body);
  }

  downloadDoc(userid: string, WDXX_MLID: string, WDXX_FJZ: string, FileID: string, FileName: string, FileVersion: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=9003&params=' + JSON.stringify({
      action: 9003,
      userid: userid,
      WDXX_MLID: WDXX_MLID,
      WDXX_FJZ: WDXX_FJZ,
      FileID: FileID,
      FileName: FileName,
      FileVersion: FileVersion,
      WDXX_XTML: 'Y'
    });
    return this.httpService.postRequest(url, body);
  }

}


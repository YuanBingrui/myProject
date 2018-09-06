import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';

@Injectable()
export class HomeServiceProvider {

  constructor(
    public httpService: HttpServiceProvider
  ) {
    console.log('Hello HomeServiceProvider Provider');
  }

  getUsername(userid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=27&params=' + JSON.stringify({
      action: 27,
      userid: userid
    });
    return this.httpService.postRequest(url, body);
  }

  getUserTeams(userid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=28&params=' + JSON.stringify({
      action: 28,
      userid: userid
    });
    return this.httpService.postRequest(url, body);
  }

  getUserAuthority(userid: string): Promise<any> {
    let url = 'rshareapi';
    let body = 'action=9001&params=' + JSON.stringify({
      action: 9001,
      userid: userid
    });
    return this.httpService.postRequest(url, body);
  }

}

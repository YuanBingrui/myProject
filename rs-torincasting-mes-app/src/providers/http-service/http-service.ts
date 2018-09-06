import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpServiceProvider {
  serverPrefix: string;
  options: RequestOptionsArgs;
  
  constructor(
    public http: Http
  ) {
    console.log('Hello HttpService Provider');
    this.setHeaderInfo();
  }

  setHeaderInfo() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=GB2312' });
    this.options = new RequestOptions({ headers: headers });
  }

  get(url: string): Observable < any > {
    url = this.serverPrefix + url;
    return this.http.get(url, this.options);
  }

  post(url: string, body: any): Observable < any > {
    url = this.serverPrefix + url;
    return this.http.post(url, body, this.options);
  }

  postRequest(url, body) {
    return this.post(url, body)
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  setServerPrefix(server) {
    this.serverPrefix = server;
  }

  handleError(error: any): Promise < any > {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}

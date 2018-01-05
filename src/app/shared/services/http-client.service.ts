import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Constants } from '../constants';
import { KitchenSinkService } from './kitchen-sink.service';

@Injectable()
export class HttpClientService {

  constructor(
    private http : Http,
    private constants : Constants,
    private kitchenSinkService : KitchenSinkService) { 

  }
  isExpiredToken(authObject){
    if((new Date()) >= new Date(authObject["ExpiresAt"]))
        return true;
    return false;
  }

createAuthorizationHeader(addToken :boolean) {        
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let authObject = JSON.parse(localStorage.getItem(this.constants.AUTH_KEY_NAME));
    if(authObject && this.isExpiredToken(authObject)) {
      if(addToken === true){
        authObject = JSON.parse(localStorage.getItem(this.constants.AUTH_KEY_NAME));
        headers.append('Authorization', `${authObject["TokenType"]} ${authObject["AccessToken"]}`);
      }
    }
    return headers;
  }

getObservable(url : string, useToken: boolean): Observable<Response> {
    let headers = this.createAuthorizationHeader(useToken);
    let options = new RequestOptions({ headers: headers });
    return this.http
                .get(url, options)
                .map((res:Response) => { return res.json(); })                          
                .catch((error)=> { return Observable.throw(error); });
  }

postObservable(url : string, body: Object, useToken: boolean): Observable<Response> {
    let headers = this.createAuthorizationHeader(useToken);
    let options = new RequestOptions({ headers: headers });
    let response = this.http
                        .post(url, body, options)
                        .map((res:Response) => {
                            if(res.ok !== true) {
                                return Observable.throw(new Error(this.constants.ERROR_MESSAGE_SERVER));   
                            }                                     
                            return res.json();
                        })                     
                        .catch((error)=> {
                            return Observable.throw(error);
                        });
    return response;
  }

}

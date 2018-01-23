import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, ResponseOptions, ResponseType } from '@angular/http';
import { Constants } from '../constants';
// import { Response } from '../directives/http-response-object/response';
// import { Headers } from '../directives/http-response-object/headers';

@Injectable()
export class KitchenSinkService {

  constructor(private constants : Constants) { }

  calculateExpiry(duration){
    const now = new Date()
    const expiry = now.setSeconds(now.getSeconds() + duration);
    return expiry;
  }

  getObservable(url) {
    let responseOption = new ResponseOptions();
    let response = new Response(responseOption);
    // let response = new Response(true , 200, {}, new Buffer('ok'), 'https://socxsolutions.com')
    
    switch(url){
      case `${this.constants.API_BASE_URI}/user/login`:
      case `${this.constants.API_BASE_URI}/user/forgot-password`:
      case `${this.constants.API_BASE_URI}/user/reset-password`:
        response.status = 200;
        response.ok = true;
        response.type = ResponseType.Default;
        response["_body"] = {
                resetToken: 'FE543tweEWte',
                displayName: 'User',
                resetEmail: 'user@mew.com',
                newPassword: 'thisisit',
                confirmPassword: 'thisisit'
              };
        return Observable.of(response);
      // case `${this.constants.API_BASE_URI}/user/reset-password`:
      //   response = new Response(true,
      //     200,
      //     {},
      //     new Buffer(JSON.stringify({
      //       resetToken: 'FE543tweEWte',
      //       displayName: 'User',
      //       resetEmail: 'user@mew.com',
      //       newPassword: 'thisisit',
      //       confirmPassword: 'thisisit'
      //     })),
      //     'https://socxsolutions.com');
      //   return Observable.of(response);
      default:
        // response = new Response(false, 400, {'Header': '400 Error'}, new Buffer('Error on this request'), 'https://socxsolutions.com')
        response.status = 500;
        response.statusText = 'internal server error';
        response.ok = false;
        response.type = ResponseType.Error;
        return Observable.of(response);
    }
  }

}

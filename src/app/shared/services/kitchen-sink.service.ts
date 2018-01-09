import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response, ResponseOptions, ResponseType } from '@angular/http';
import { Constants } from '../constants';

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
    
    switch(url){
      case `${this.constants.API_BASE_URI}/user/login`:
        response.status = 200;
        response.ok = true;
        response.type = ResponseType.Default;
        return Observable.of(response);
      default:
        response.status = 500;
        response.statusText = 'internal server error';
        response.ok = false;
        response.type = ResponseType.Error;
        return Observable.of(response);
    }
  }

}

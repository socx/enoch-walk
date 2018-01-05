import { Injectable } from '@angular/core';

@Injectable()
export class KitchenSinkService {

  constructor() { }

  calculateExpiry(duration){
    const now = new Date()
    const expiry = now.setSeconds(now.getSeconds() + duration);
    return expiry;
  }

}

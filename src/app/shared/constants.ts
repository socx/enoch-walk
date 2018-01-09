import { Injectable } from '@angular/core';
import { Response, ResponseOptions, ResponseType } from '@angular/http';

@Injectable()
export class Constants {

  public TEST_MODE = true;
  public API_BASE_URI = '';
  public AUTH_KEY_NAME = 'enoch_auth_key';
  public ERROR_MESSAGE_SERVER = '';
  public ERROR_401 = 401;

}
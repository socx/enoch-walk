import { Injectable } from '@angular/core';
import { Response, ResponseOptions, ResponseType } from '@angular/http';

@Injectable()
export class Constants {

  public TEST_MODE = true;
  public API_BASE_URI = '';
  public AUTH_KEY_NAME = 'enoch_auth_key';
  public ERROR_MESSAGE_SERVER = '';
  public ERROR_401 = 401;
  public FORGOT_PASSWORD_REQUEST_CONFIRM_MESSAGE = 'We have emailed instructions to reset your password to you. If you do not receive the email, please check your spam or contact us.';
  public ERROR_TOKEN_EXPIRED ='Expired token';
}
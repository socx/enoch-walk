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
  public DEFAULT_LIST_PAGE_SIZE = 10;
  public LOADING_TEXT ='loading';
  public INVOICE_FIELDS_EXCULSION_LIST;
  public ICON_DICTIONARY = [
    { FieldName : 'DeviceInformation', Icon : 'fa fa-info', FieldCaption : 'Device Info.' },
    { FieldName : 'column1', Icon : 'fa fa-info', FieldCaption : 'First Column' },
    { FieldName : 'column2', Icon : 'fa fa-bell', FieldCaption : 'Second Column' }
  ]
}
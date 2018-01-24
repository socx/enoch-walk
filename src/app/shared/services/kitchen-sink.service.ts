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

  processApiData(data, exclusionList, pageName = null) {
      let processedData = data;
      if(data.hasOwnProperty('Header')) {
          // Sort in Order
          processedData.Header = this.sortArray(data["Header"]);
      }
      // remove columns to hide
      processedData.Header = processedData.Header.filter((column) => {
          return (exclusionList.indexOf(column.Name) === -1)
      });
      return processedData;
  }

  sortArray(array) {
      return array
              .sort((a, b) => 
                  {
                      if(a.Order < b.Order) return -1;                            
                      if(a.Order > b.Order) return 1;                            
                      return 0;
                  }
              );
                  
  }

  getFieldCaption(column) {
    let matchingFields = this.constants.ICON_DICTIONARY.filter(f =>
        f.FieldName === column.Name
    );
    if(matchingFields && matchingFields.length > 0){
        return matchingFields[0].FieldCaption;
    } 
    return this.splitAsCamelCase(column.Name);
  }
  splitAsCamelCase(text) {
    return text
                .replace(/([A-Z])/g, ' $1') // insert a space before all caps
                .replace(/^./, function(str){ return str.toUpperCase(); }) // uppercase the first character
  }

formatField(data, column){
      let field = column.Name;
      if((column.Type == "DateTime") &&
          (data.hasOwnProperty(field) && data[field] !== null))
          return this.convertAPIUtcDateTimeToUILocale(data[field]);
          
      if((column.Type == "Decimal") && 
          (data.hasOwnProperty(field) && data[field] !== null)) {
          return data[field].toFixed(2);
      }
      return data[field];
  }

  convertAPIUtcDateTimeToUILocale(dateString) {
    if(!dateString || dateString.length === 0)
        return '';
    const dateParts = dateString.split(/[^0-9]/); 
    const date = new Date(dateParts[0], dateParts[1]-1, dateParts[2], dateParts[3], dateParts[4])
    if(dateParts.length > 5 && dateParts[5]){
        date.setSeconds(dateParts[5])
    }
    const offset = date.getTimezoneOffset()
    const ticks = date.setMinutes(date.getMinutes() - offset)
    const localDate = this.convertTicksToDate(ticks)
    return localDate;
  }

  convertTicksToDate(ticks) {
    let date = new Date(ticks);
    let ss: any = date.getHours();
    let mm: any = date.getMinutes();
    let hh: any = date.getHours();
    let MM :any = date.getMonth()+1;
    let dd :any = date.getDate();
    let yy :any = new String(date.getFullYear());
    if (MM < 10) MM = "0"+MM;
    if (dd < 10) dd = "0"+dd;
    if (hh < 10) hh = "0"+hh;
    if (mm < 10) mm = "0"+mm;
    if (ss < 10) ss = "0"+ss;
      
    return `${dd}/${MM}/${yy} ${hh}:${mm}:${ss}`.toString();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getStatusClassName(status) {
    let className ='';
    switch(status) {
      case 'pending' :
        className = 'label-info';
        break;
      case 'due' :
        className = 'label-warning';
        break;
      case 'overdue' :
        className = 'label-danger';
        break;
      default :
        className ='';
        break;
    }
    return className ? `label label-sm ${className}` : '';
  }

}

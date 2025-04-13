import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
import { HttpHeaderCounterHandlerService } from './http-header-counter-handler.service';
import { StorageService } from '../storage.service';
import { LOCAL_STORE_KEY } from '../../config';

@Injectable()
export class HttpRequestService implements HttpInterceptor {

  constructor(private httpHeaderCounterHandlerService:HttpHeaderCounterHandlerService, private notificationService: NotificationService, private storageService:StorageService) { }
  intercept(
    request:HttpRequest<any>,
    handler:HttpHandler
  ): Observable<HttpEvent<any>> {
    let authRequest;
    const headerKey = 'headers';
    const requestHeaders:any = {};
    const requestUrl = request.url;
    const configHeaders = request[headerKey].get('dw-request-options') || '';

    let requestHeaderOptions:any;
    if(this.validJSON(configHeaders)){
      requestHeaderOptions = JSON.parse(configHeaders);
    }else {
      requestHeaderOptions = {appendToken:false,
        appendContentType:true,
        appendMonitorReq:true,
        appendAuthorization:false,
        appendXtraceId:false
      };
    }

    let appendAuthorization = false;
    let appendToken = false;
    let appendContentType  = false;
    let appendMonitorReq = true;
    let appendXtraceId = false;
    const appendUser = true;
    let reqHeaders:HttpHeaders = new HttpHeaders();

    // set append option headers set value
    if(requestHeaderOptions && configHeaders!=''){
      if(requestHeaderOptions.appendToken==true){
        appendToken=true;
      }
      if(requestHeaderOptions.appendContentType==false){
        appendContentType=false;
      }
      if(requestHeaderOptions.appendMonitorReq==false){
        appendMonitorReq=false;
      }
      if(requestHeaderOptions.appendAuthorization==false){
        appendAuthorization=false;
      }
      if(requestHeaderOptions.appendXtraceId==true){
        appendXtraceId=true;
      }
    }
    if(appendUser){
      let user = {
        fullName:'',
        tenant_id:''
      }
      requestHeaders['X-User-Id'] = user?.fullName?user.fullName:'';
      requestHeaders['X-Tenant-Id'] = user?.tenant_id?user.tenant_id:'';
    }
    
    if(appendXtraceId){
      const traceId = this.storageService.getLocalStorageData(LOCAL_STORE_KEY.X_TRACE_ID);
      requestHeaders['x-trace-id'] = traceId ? traceId : '';
    }
    if(appendContentType) {
    //  requestHeaders['Content-Type']= 'application/json';
    // requestHeaders['Accept']=  'application/json, text/plain, */*';
      
    }
    if(appendMonitorReq) {
      this.httpHeaderCounterHandlerService.updateRequestData(1);
    }
    if(appendToken) {
      // const authorization = 'Authorization';
      // const token = this.tokenService.getAccessToken();
      // requestHeaders[authorization]= `Bearer ${token}`;
    }

    // delete the custom header options
    if(requestHeaderOptions && configHeaders!=''){
      reqHeaders = request[headerKey].delete('dw-request-options');
      authRequest = request.clone({
        headers:reqHeaders,
        setHeaders:requestHeaders,
        url:requestUrl
      });
    }else{
      authRequest = request.clone({
        setHeaders:requestHeaders,
        url:requestUrl
      });
    }

    return handler
    .handle(authRequest)
    .pipe(
      map((response:any)=>{
        if (response.status === 401) {
          localStorage.clear();
          document.location.reload();
        }
        if(response.error){
          this.notificationService.updateToast({ severity: 'error', summary: 'Error', detail: response?.msg });
        }
        const typeKey = 'type';
        if(response[typeKey]==4){
          if(appendMonitorReq) {
            this.httpHeaderCounterHandlerService.updateRequestData(-1);
          }
        }       
        return response;
      })
    ).pipe(
      catchError((error)=>{
        if(error?.error){
          this.notificationService.updateToast({ severity: 'error', summary: ``, detail: 'Something went wrong...' });
        }       
        if (error.status === 401 || error.status === 400 || error.status === 403 || error.status === 307) {
          localStorage.clear();
          document.location.reload();
        }
        if(appendMonitorReq) {
          this.httpHeaderCounterHandlerService.updateRequestData(-1);
        }
        return throwError(error);
      })
    );

  }

  validJSON(jsonStr: string):boolean {
    try{
      JSON.parse(jsonStr);
    } catch(e){
      return false;
    }
    return true;
  }
}

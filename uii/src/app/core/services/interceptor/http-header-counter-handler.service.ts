import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderCounterHandlerService {
  private requestObject:any = {
    pendingReqCount:0
  };
  private dataSource = new BehaviorSubject<any>(this.requestObject);

  requestData(): Observable<any> {
    return this.dataSource.asObservable();
  }

  updateRequestData(requestCount: number): void {
    this.requestObject.pendingReqCount =  this.requestObject.pendingReqCount + requestCount;
    this.dataSource.next(this.requestObject);
  }

}

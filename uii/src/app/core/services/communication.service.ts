import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  data = new BehaviorSubject<any>({ key: '', value: {} });
  socketListen= new BehaviorSubject<any>(null);
  setData(data: any): void {
    this.data.next(data);
  }

  getData(): Observable<any> {
    return this.data.asObservable();
  }
  setSocketData(data: any): void {
    this.socketListen.next(data);
  }
  getSOcketRecive(): Observable<any> {
    return this.socketListen.asObservable();
  }
}

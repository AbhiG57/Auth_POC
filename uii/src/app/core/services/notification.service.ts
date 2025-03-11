import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastMsg = new Subject<any>();
  updateToast(data: any) {
    this.toastMsg.next(data);
  }
  getToastMsg() {
    return this.toastMsg.asObservable();
  }
}

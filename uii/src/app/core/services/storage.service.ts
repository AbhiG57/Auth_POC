import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public setSessionStorageData(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public getSessionStorageData(key: string): any {
    const data=sessionStorage.getItem(key) || '';
    return data===''?null:JSON.parse(data);
  }
  public removeSessionStorageData(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearSessionStorageData() {
    sessionStorage.clear();
  }
  public setLocalStorageData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getLocalStorageData(key: string): any {
    const data=localStorage.getItem(key) || '';
    return data ? JSON.parse(data) : null;
  }
  public removeLocalStorageData(key: string) {
    localStorage.removeItem(key);
  }

  public clearLocalStorageData() {
    localStorage.clear();
  }
}

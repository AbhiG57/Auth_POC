import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  post(url:string, payload:any, headers={}): any{
    return this.http.post(url,payload,{headers});
  }
  get(url:string, headers={},responseType?:any): Observable<any>{
    if(responseType)
      {
        return this.http.get(url,{headers,responseType: responseType});
      }
      else{
        return this.http.get(url,{headers, withCredentials:true});
      }
  }
  put(url:string,data:any,headers={}): Observable<any>{
    return this.http.put(url,data,{headers});
  }
  delete(url:string, headers={}): Observable<any>{
    return this.http.delete(url,{headers:headers});
  }
  patch(url:string,data:any): Observable<any>{
    return this.http.patch(url,data);
  }
  
}

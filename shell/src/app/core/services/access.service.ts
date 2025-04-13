import { Injectable } from '@angular/core';
import { Observable, tap, of } from 'rxjs';
import { ROLE } from '../config';
import { ApiService } from './api.service';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  user:any;
  constructor(private apiService:ApiService,private env:EnvService){}
  load(): Observable<any>
  {
    console.log("inside load");
    /* return this.apiService.get(`/user-info`) */
    return of({user:{
      name:'Abhishek'
    }})  
    .pipe(
      tap(user => { 
          console.log("User",user)
          this.setUserInfo(user.user);
    })
    );
  }
  setUserInfo(user:any): void {
    this.user=user;
  }

  getUserInfo() : any {
     return this.user;
  }
}

import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EnvService {

  public apiUrl = 'http://localhost:3000/';
    public production= false;
    public backendUrl='';
    public wfServiceUrl = '';
    public orchetrastorServiceUrl = '';
    public automationAssistantUrl='';
    public reportServiceUrl = '';
    public SUBSCRIPTION_KEY='';
    public sessionTimeOut=1800;
    public isLocal = false;
    public retryCount = 0;
    public socketEnable = true;
    public backendMlSocketUrl = '';
    public notifiSrviceUrl = '';
  constructor() {
  }

}

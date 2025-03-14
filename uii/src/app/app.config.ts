import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient } from '@angular/common/http';
import {AuthConfig, OAuthService, provideOAuthClient} from 'angular-oauth2-oidc'
import { EnvServiceProvider } from './core/services/env.service.provider';
import { AccessService } from './core/services/access.service';


export const authcodeFlowConfig : AuthConfig ={
  issuer:'https://ec2-3-109-213-28.ap-south-1.compute.amazonaws.com:8443/realms/restaurants-tenant1',
  tokenEndpoint:'https://ec2-3-109-213-28.ap-south-1.compute.amazonaws.com:8443/realms/restaurants-tenant1/protocol/openid-connect/token',
  redirectUri:window.location.origin,
  clientId:'kong-client',
  responseType:'code',
  scope:'openid profile'
}

function initializeOAuth(oauthService:OAuthService):Promise<void>{
return new Promise((resolve)=>{
  oauthService.configure(authcodeFlowConfig);
  oauthService.setupAutomaticSilentRefresh();
  oauthService.loadDiscoveryDocumentAndLogin()
  .then(()=>resolve());
})
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
          preset: Aura,
          options: {
            darkModeSelector: '.my-app-dark'
        }
      }
  },  
),
  provideHttpClient(),
  provideOAuthClient(),
  EnvServiceProvider,
  {
    provide:APP_INITIALIZER,
    useFactory:(accessService: AccessService)=>{
      return () =>{
        accessService.load().toPromise();
      }
    },
    multi:true,
    deps:[
    AccessService
    ]
  }
  ]
};

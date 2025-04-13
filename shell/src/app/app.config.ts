import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { AccessService } from './core/services/access.service';
import { provideHttpClient } from '@angular/common/http';
import { EnvServiceProvider } from './core/services/env.service.provider';

function initializeApp(accessService:AccessService):Promise<void>{
  return new Promise((resolve)=>{
     accessService.load()
    .subscribe(()=>resolve());
  })
  }




export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideAnimationsAsync(),
  provideHttpClient(),
  EnvServiceProvider,
  provideAppInitializer(()=>initializeApp(inject(AccessService)))
  ]
};



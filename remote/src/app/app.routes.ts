import { Routes } from '@angular/router';
import { FlightComponent } from './flight/flight.component';
import { HolidayPackagesComponent } from './holiday-packages/holiday-packages.component';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'flight-search',
        pathMatch: 'full'
    },
    {
        path: 'flight-search',
        component: FlightComponent
    },
    {
        path: 'holiday-packages',
        component: HolidayPackagesComponent
    }
];

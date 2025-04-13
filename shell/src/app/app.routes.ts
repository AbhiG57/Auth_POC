import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'restaurants',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'restaurants',
        component:RestaurantComponent
    },
    {
        path: 'flights',
        // loadChildreas instead of loadComponent !!!
        loadChildren: () =>
          loadRemoteModule('remote', './routes').then((m) => m.APP_ROUTES),
    }
];

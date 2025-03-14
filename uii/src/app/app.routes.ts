import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './guards/auth-guard.guard';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { ResturantDashboardComponent } from './resturant-dashboard/resturant-dashboard.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'restaurants',
        pathMatch:'full'
    },
    {
        path:'home',
        component:DashboardComponent,
        canActivate:[authGuard]
    },
    {
        path:'pageNotFound',
        component:PageNotFoundComponent
    },
    {
        path:'restaurants',
        component:ResturantDashboardComponent,
        canActivate:[authGuard]
    },
    {
        path:"**",
        component:PageNotFoundComponent
    }
];

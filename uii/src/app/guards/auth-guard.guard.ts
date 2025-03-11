import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, RouterLink } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const session=true
  const router:Router= inject(Router);
  const protectedRoutes:string[]=['/home']
  return protectedRoutes.includes(state.url) && !session ? router.navigate(['/pageNotFound']) :true
};

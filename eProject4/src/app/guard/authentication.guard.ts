import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const router: Router = Inject(Router);

export const authenticationGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  //console.log("token is : " + token);
  if (!token) {
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }
};

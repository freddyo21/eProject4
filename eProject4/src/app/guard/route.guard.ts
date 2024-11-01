import { CanActivateFn } from '@angular/router';

export const routeGuard: CanActivateFn = (route, state) => {
  let expectRoleArray = router.data;
  expectRoleArray = expectRoleArray.expectedRole;

  const token: any = localStorage.getItem('token');

  var tokenPayload: any;

  try {
    tokenPayload = jwt_decode(token);
  } catch (err) {
    localStorage.clear();
    router.navigate(['/']);
  }

  let expectedRole = '';

  for (let i = 0; i < expectRoleArray.length; i++) {
    if (expectRoleArray[i] == tokenPayload.role) {
      expectedRole = tokenPayload.role;
    }
  }

  if (tokenPayload.role == 'user' || tokenPayload.role == 'admin') {
    if (this.auth.isAuthenticated() && tokenPayload.role == expectedRole) {
      return true;
    }

    this.snackbarService.openSnackBar(
      GlobalConstants.unauthroized,
      GlobalConstants.error
    );
    this.router.navigate(['/cafe/dashboard']);
    return false;
  } else {
    router.navigate(['/']);
    localStorage.clear();
    return false;
  }
};

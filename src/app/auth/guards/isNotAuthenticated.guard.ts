import { Router, type CanActivateFn } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};

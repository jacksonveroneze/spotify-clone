import { CanActivateFn } from '@angular/router';

export const isAuthenticated: CanActivateFn = (route, state) => {
  return true;
};

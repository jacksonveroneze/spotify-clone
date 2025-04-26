import { CanActivateFn } from '@angular/router';

export const isAuthenticated: CanActivateFn = () => {
  return true;
};

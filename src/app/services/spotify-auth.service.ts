import { Injectable } from '@angular/core';
import { spotifyAuthConfig } from '../../environments/environment.development';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(spotifyAuthConfig);
  }

  login(): void {
    return this.oauthService.initLoginFlow();
  }

  async handleCallback(): Promise<boolean> {
    await this.oauthService.tryLoginCodeFlow();
    
    return this.oauthService.hasValidAccessToken();
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  logout(): void {
    this.oauthService.logOut();
  }
}

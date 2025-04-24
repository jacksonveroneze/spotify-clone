import { Injectable } from '@angular/core';
import { spotifyAuthConfig } from '../../environments/environment.development';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(spotifyAuthConfig);
  }

  async login(): Promise<void> {
    return await this.oauthService.initCodeFlow();
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

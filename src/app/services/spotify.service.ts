import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  api: Spotify.SpotifyWebApiJs;

  constructor() {
    this.api = new Spotify();
  }

  setToken(token: string) {
    this.api.setAccessToken(token);
  }

  prev() {
    this.api.skipToPrevious();
  }

  next() {
    this.api.skipToNext();
  }

  async track() {
    return await this.api.getMyCurrentPlayingTrack();
  }
}

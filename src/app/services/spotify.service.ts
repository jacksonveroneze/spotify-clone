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
    return this.api.skipToPrevious();
  }

  next() {
    return this.api.skipToNext();
  }

  track() {
    return this.api.getMyCurrentPlayingTrack();
  }
}

import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js'
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  api: Spotify.SpotifyWebApiJs;

  constructor() {
    this.api = new Spotify();
  }

  async init(): Promise<IUsuario> {
    var user = await this.api.getMe();

    return {
      id: user.id,
      nome: user.display_name,
      imagemUrl: user.images[0].url
    }
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

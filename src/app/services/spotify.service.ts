import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js'
import { IUsuario } from '../interfaces/IUsuario';
import { IPlaylist } from '../interfaces/IPlaylist';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  api: Spotify.SpotifyWebApiJs;

  constructor() {
    this.api = new Spotify();

    this.setToken();
  }

  async getUsuario(): Promise<IUsuario> {
    var user = await this.api.getMe();

    return {
      id: user.id,
      nome: user.display_name,
      imagemUrl: user.images[0].url
    }
  }

  setToken(token?: string) {
    if (!token) {
      token = sessionStorage.getItem('access_token');
    }

    this.api.setAccessToken(token);
  }

  async getPlaylists(): Promise<IPlaylist[]> {
    const playlists = await this.api.getUserPlaylists();

    return playlists.items.map(this.SpotifyPlaylistParaPlaylist);
  }

  SpotifyPlaylistParaPlaylist(
    playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return {
      id: playlist.id,
      nome: playlist.name,
      imagemUrl: playlist.images.pop().url
    };
  }
}

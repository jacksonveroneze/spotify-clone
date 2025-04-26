import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuario';
import { IPlaylist } from '../interfaces/IPlaylist';
import { AuthenticateService } from './spotify-auth.service';
import { IArtista } from '../interfaces/IArtista';
import { SpotifyArtistaParaArtista } from '../Common/mappers';
import { newArtista } from '../Common/factories';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  api: Spotify.SpotifyWebApiJs;

  constructor(private authenticateService: AuthenticateService) {
    this.api = new Spotify();

    this.setToken();
  }

  setToken(): void {
    const token = this.authenticateService.getAccessToken();

    this.api.setAccessToken(token);
  }

  async getUsuario(): Promise<IUsuario> {
    const user = await this.api.getMe();

    return {
      id: user.id,
      nome: user.display_name,
      imagemUrl: user.images[0].url
    };
  }

  async getPlaylists(): Promise<IPlaylist[]> {
    const playlists = await this.api.getUserPlaylists();

    return playlists.items.map(this.SpotifyPlaylistParaPlaylist);
  }

  async getTopArtistas(limit: number = 10): Promise<IArtista[]> {
    const artistas = await this.api.getMyTopArtists({ limit });

    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async getTopArtista(): Promise<IArtista> {
    var artistas = await this.getTopArtistas(1);

    return artistas.length == 1
      ? artistas.pop()
      : newArtista()
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

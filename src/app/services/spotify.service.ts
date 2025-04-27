import {Injectable} from '@angular/core';
import Spotify from 'spotify-web-api-js';
import {IUsuario} from '../interfaces/IUsuario';
import {IPlaylist} from '../interfaces/IPlaylist';
import {AuthenticateService} from './spotify-auth.service';
import {IArtista} from '../interfaces/IArtista';
import {
  SpotifyArtistaParaArtista,
  SpotifyPlaylistParaPlaylist,
  SpotifyTrackParaMusica,
  SpotifyUsuarioParaUsuario
} from '../Common/mappers';
import {newArtista} from '../Common/factories';
import {IMusica} from '../interfaces/IMusica';

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

    return SpotifyUsuarioParaUsuario(user);
  }

  async getPlaylists(): Promise<IPlaylist[]> {
    const playlists = await this.api.getUserPlaylists();

    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }

  async getTopArtista(): Promise<IArtista> {
    const artistas = await this.getTopArtistas(1);

    return artistas.length == 1
      ? artistas.pop()
      : newArtista()
  }

  async getTopArtistas(limit: number = 10): Promise<IArtista[]> {
    const artistas = await this.api.getMyTopArtists({limit});

    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async getMusicas(offset: number = 0, limit: number = 20): Promise<IMusica[]> {
    const musicas = await this.api.getMySavedTracks({offset, limit});

    return musicas.items.map(item => SpotifyTrackParaMusica(item.track));
  }

  async obterMusicaAtual(): Promise<IMusica> {
    const musica = await this.api.getMyCurrentPlayingTrack();

    return SpotifyTrackParaMusica(musica.item);
  }

  async executarMusica(musicaId: string): Promise<void> {
    await this.api.queue(musicaId);
    await this.api.skipToNext();
  }
}

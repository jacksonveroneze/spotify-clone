import {Injectable} from '@angular/core';
import Spotify from 'spotify-web-api-js';
import {IUsuario} from '../interfaces/IUsuario';
import {IPlaylist} from '../interfaces/IPlaylist';
import {AuthenticateService} from './spotify-auth.service';
import {IArtista} from '../interfaces/IArtista';
import {
  SpotifyArtistaParaArtista,
  SpotifyPlaylistParaPlaylist, SpotifySinglePlaylistParaPlaylist,
  SpotifyTrackParaMusica,
  SpotifyUsuarioParaUsuario
} from '../Common/mappers';
import {newArtista, newPlaylist} from '../Common/factories';
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

  async getPlaylist(playListId: string, offset: number = 0, limit: number = 50): Promise<IPlaylist> {
    const playlist = await this.api.getPlaylist(playListId);

    if (!playlist) {
      return newPlaylist();
    }

    const playList = SpotifySinglePlaylistParaPlaylist(playlist);

    const musicasSpotify = await this.api.getPlaylistTracks(playListId, {offset, limit});

    playList.musicas = musicasSpotify.items.map(item =>
      SpotifyTrackParaMusica(item.track as SpotifyApi.TrackObjectFull));

    return playList;
  }

  async getTopArtista(): Promise<IArtista> {
    const artistas = await this.getTopArtistas(1);

    return artistas.length == 1
      ? artistas.pop()
      : newArtista()
  }

  async getTopArtistas(limit: number = 10, expandFollowed?: boolean): Promise<IArtista[]> {
    const artistas = await this.api.getMyTopArtists({limit});

    const result = artistas.items.map(SpotifyArtistaParaArtista);

    if (expandFollowed) {
      const artistasIds = result.map(item => item.id);

      const followeds = await this.api.isFollowingArtists(artistasIds);

      for (let i = 0; i < result.length; i++) {
        result[i].isFollowed = followeds[i];
      }
    }

    return result;
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

  async musicaAnterior(): Promise<void> {
    await this.api.skipToPrevious();
  }

  async proximaMusica(): Promise<void> {
    await this.api.skipToNext();
  }

  async followArtist(id: string) {
    return this.api.followArtists([id]);
  }

  async unfollowArtist(id: string) {
    return this.api.unfollowArtists([id]);
  }
}

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IMusica} from '../interfaces/IMusica';
import {newMusica} from '../Common/factories';
import {SpotifyService} from './spotify.service';
import {pollingMusicaAtual} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  musicaAtual: BehaviorSubject<IMusica> =
    new BehaviorSubject<IMusica>(newMusica())

  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.obterMusicaAtual().then();
  }

  async obterMusicaAtual(): Promise<void> {
    clearTimeout(this.timerId);

    const musica = await this.spotifyService.obterMusicaAtual();

    this.definirMusicaAtual(musica);

    this.timerId = setInterval(async () => {
      await this.obterMusicaAtual();
    }, pollingMusicaAtual);
  }

  definirMusicaAtual(musica: IMusica): void {
    this.musicaAtual.next(musica);
  }
}

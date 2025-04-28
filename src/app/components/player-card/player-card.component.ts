import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {IMusica} from '../../interfaces/IMusica';
import {newMusica} from '../../Common/factories';
import {Subscription} from 'rxjs';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faStepBackward, faStepForward, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {SpotifyService} from '../../services/spotify.service';

@Component({
  selector: 'app-player-card',
  imports: [
    FaIconComponent
  ],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss'
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musica: IMusica = newMusica();
  subscriptions: Subscription[] = [];

  anteriorIcone: IconDefinition = faStepBackward;
  proximaIcone: IconDefinition = faStepForward;

  constructor(private playerService: PlayerService,
              private spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
    const subscribe = this.playerService.musicaAtual.subscribe(
      (musica: IMusica) => this.musica = musica);

    this.subscriptions.push(subscribe);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  async voltarMusica(): Promise<void> {
    await this.spotifyService.musicaAnterior();

    await this.playerService.obterMusicaAtual();
  }

  async proximaMusica(): Promise<void> {
    await this.spotifyService.proximaMusica();

    await this.playerService.obterMusicaAtual();
  }
}

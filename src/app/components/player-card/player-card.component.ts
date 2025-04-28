import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {IMusica} from '../../interfaces/IMusica';
import {newMusica} from '../../Common/factories';
import {Subscription} from 'rxjs';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faStepBackward, faStepForward, IconDefinition} from '@fortawesome/free-solid-svg-icons';

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

  constructor(private playerService: PlayerService) {
  }

  ngOnInit(): void {
    const subscribe = this.playerService.musicaAtual.subscribe(
      (musica: IMusica) => this.musica = musica);

    this.subscriptions.push(subscribe);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

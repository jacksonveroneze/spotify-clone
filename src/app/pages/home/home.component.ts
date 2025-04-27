import {Component, OnDestroy, OnInit} from '@angular/core';
import {TopArtistaComponent} from "../../components/top-artista/top-artista.component";
import {faPlay, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {IMusica} from '../../interfaces/IMusica';
import {newMusica} from '../../Common/factories';
import {SpotifyService} from '../../services/spotify.service';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {PainelDireitoComponent} from "../../components/painel-direito/painel-direito.component";
import {PlayerService} from '../../services/player.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    TopArtistaComponent,
    FaIconComponent,
    PainelDireitoComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  playIcone: IconDefinition = faPlay;

  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();

  subscriptions: Subscription[] = [];

  constructor(private service: SpotifyService,
              private playerService: PlayerService) {
  }

  async ngOnInit(): Promise<void> {
    this.musicas = await this.service.getMusicas();

    const subs = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;

      console.log(this.musicaAtual);
    });

    this.subscriptions.push(subs);
  }

  obterArtistas(musica: IMusica): string {
    return musica.artistas.map(item => item.nome).join(', ')
  }

  async executarMusica(musica: IMusica): Promise<void> {
    await this.service.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}

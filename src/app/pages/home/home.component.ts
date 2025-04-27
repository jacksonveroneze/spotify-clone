import {Component, OnInit} from '@angular/core';
import {TopArtistaComponent} from "../../components/top-artista/top-artista.component";
import {faPlay, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {IMusica} from '../../interfaces/IMusica';
import {newMusica} from '../../Common/factories';
import {SpotifyService} from '../../services/spotify.service';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {PainelDireitoComponent} from "../../components/painel-direito/painel-direito.component";

@Component({
  selector: 'app-home',
  imports: [TopArtistaComponent, FaIconComponent, PainelDireitoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  playIcone: IconDefinition = faPlay;

  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();

  constructor(private service: SpotifyService) {
  }

  async ngOnInit(): Promise<void> {
    this.musicas = await this.service.getMusicas();
  }

  obterArtistas(musica: IMusica): string {
    return musica.artistas.map(item => item.nome).join(', ')
  }

  async executarMusica(musica: IMusica): Promise<void> {
    await this.service.executarMusica(musica.id);
  }

}

import { Component, OnInit } from '@angular/core';
import { BotaoMenuComponent } from "../botao-menu/botao-menu.component";
import { faGuitar, faHome, faMusic, faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from '../../interfaces/IPlaylist';
import { SpotifyService } from '../../services/spotify.service';
import { IBotao } from '../../interfaces/IBotao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel-esquerdo',
  standalone: false,
  templateUrl: './painel-esquerdo.component.html',
  styleUrl: './painel-esquerdo.component.scss'
})
export class PainelEsquerdoComponent implements OnInit {

  playlists: IPlaylist[];
  botoes: IBotao[];
  playlistIcone: IconDefinition = faMusic;

  constructor(private router: Router,
    private service: SpotifyService) {
    this.botoes = [
      {
        id: "id_home",
        descricao: "Home",
        icone: faHome,
        selecionado: true
      },
      {
        id: "id_pesquisar",
        descricao: "Pesquisar",
        icone: faGuitar,
        selecionado: false
      },
      {
        id: "id_artistas",
        descricao: "Artistas",
        icone: faSearch,
        selecionado: false
      }
    ]
  }

  async ngOnInit(): Promise<void> {
    this.playlists = await this.service.getPlaylists();
  }

  botaoClick(botao: IBotao): void {
    const length = this.botoes.length;

    for (let index = 0; index < length; index++) {
      this.botoes[index].selecionado =
        this.botoes[index].id == botao.id;
    }

    this.router.navigate(['player'])
  }
}
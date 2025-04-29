import {Component, OnInit} from '@angular/core';
import {BotaoMenuComponent} from "../botao-menu/botao-menu.component";
import {faGuitar, faHome, faMusic, faSearch, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {IPlaylist} from '../../interfaces/IPlaylist';
import {SpotifyService} from '../../services/spotify.service';
import {IBotao} from '../../interfaces/IBotao';
import {Router} from '@angular/router';
import {RodapeUsuarioComponent} from "../rodape-usuario/rodape-usuario.component";
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-painel-esquerdo',
  standalone: true,
  templateUrl: './painel-esquerdo.component.html',
  styleUrl: './painel-esquerdo.component.scss',
  imports: [BotaoMenuComponent, RodapeUsuarioComponent, FaIconComponent]
})
export class PainelEsquerdoComponent implements OnInit {

  playlists: IPlaylist[];
  botoesAcao: IBotao[];
  botoesPlaylist: IBotao[];
  playlistIcone: IconDefinition = faMusic;

  constructor(private router: Router,
              private service: SpotifyService) {

    this.botoesAcao = [
      {
        id: "id_home",
        descricao: "Home",
        icone: faHome,
        selecionado: true,
        exibir: true,
        actionUrl: 'player/home'
      },
      {
        id: "id_pesquisar",
        descricao: "Pesquisar",
        icone: faGuitar,
        selecionado: false,
        actionUrl: 'player/pesquisar'
      },
      {
        id: "id_artistas",
        descricao: "Artistas",
        icone: faSearch,
        selecionado: false,
        exibir: true,
        actionUrl: 'player/artistas'
      }
    ];
  }

  async ngOnInit(): Promise<void> {
    const playlists = await this.service.getPlaylists();

    this.botoesPlaylist = playlists.map(item => {
      return {
        id: item.id,
        descricao: item.nome,
        icone: this.playlistIcone,
        selecionado: false,
        actionUrl: ''
      }
    })
  }

  async botaoClick(item: IBotao): Promise<void> {
    const length = this.botoesAcao.length;

    for (let index = 0; index < length; index++) {
      this.botoesAcao[index].selecionado =
        this.botoesAcao[index].id == item.id;
    }

    const playListsLength = this.botoesPlaylist.length;

    for (let index = 0; index < playListsLength; index++) {
      this.botoesPlaylist[index].selecionado = false;
    }

    await this.router.navigateByUrl(item.actionUrl);
  }

  async irParaPlaylist(item: IBotao) {
    const playListsLength = this.botoesPlaylist.length;

    for (let index = 0; index < playListsLength; index++) {
      this.botoesPlaylist[index].selecionado =
        this.botoesPlaylist[index].id == item.id;
    }

    await this.router.navigateByUrl(`player/lista/playlist/${item.id}`);
  }
}

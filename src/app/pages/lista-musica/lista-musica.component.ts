import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {SpotifyService} from '../../services/spotify.service';
import {IMusica} from '../../interfaces/IMusica';
import {newMusica} from '../../Common/factories';
import {faPlay, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {PlayerService} from '../../services/player.service';
import {BannerComponent} from '../../components/banner/banner.component';
import {PainelDireitoComponent} from '../../components/painel-direito/painel-direito.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-lista-musica',
  imports: [
    BannerComponent,
    PainelDireitoComponent,
    FaIconComponent
  ],
  templateUrl: './lista-musica.component.html',
  styleUrl: './lista-musica.component.scss'
})
export class ListaMusicaComponent implements OnInit, OnDestroy {

  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();
  playIcone: IconDefinition = faPlay;

  bannerImagemUrl: string = '';
  bannerTexto: string = '';
  title: string = '';

  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private spotifyService: SpotifyService,
              private playerService: PlayerService) {
  }

  ngOnInit(): void {
    const subscriptionActivatedRoute = this.activatedRoute.paramMap
      .subscribe(async params => {
        const tipo = params.get('tipo');
        const id = params.get('id');

        await this.obterDadosPagina(tipo, id);
      });

    const subscriptionMusicaAtual = this.playerService.musicaAtual
      .subscribe(musica => {
        this.musicaAtual = musica;
      })

    this.subscriptions.push(subscriptionActivatedRoute);
    this.subscriptions.push(subscriptionMusicaAtual);
  }

  async obterDadosPagina(tipo: string, id: string): Promise<void> {
    tipo === 'playlist'
      ? await this.obterDadosPlaylist(id)
      : await this.obterDadosArtista(id);
  }

  async obterDadosPlaylist(id: string): Promise<void> {
    const playlist = await this.spotifyService.getPlaylist(id);

    this.musicas = playlist.musicas;
    this.definirDadosPagina(playlist.nome, playlist.imagemUrl, playlist.musicas);
    this.title = 'Musicas Playlist: ' + playlist.nome;
  }

  async obterDadosArtista(id: string): Promise<void> {
    const playlist = await this.spotifyService.getPlaylist(id);

    this.musicas = playlist.musicas;
  }

  definirDadosPagina(bannerTexto: string, bannerImage: string, musicas: IMusica[]) {
    this.bannerImagemUrl = bannerImage;
    this.bannerTexto = bannerTexto;
    this.musicas = musicas;
  }

  obterArtistas(musica: IMusica) {
    return musica.artistas.map(artista => artista.nome).join(', ');
  }

  async executarMusica(musica: IMusica): Promise<void> {
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe());
  }
}

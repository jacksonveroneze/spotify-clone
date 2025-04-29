import {Component, OnInit} from '@angular/core';
import {BannerComponent} from '../../components/banner/banner.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {IArtista} from '../../interfaces/IArtista';
import {SpotifyService} from '../../services/spotify.service';
import {ArtistaItemImagemComponent} from '../../components/artista-item-imagem/artista-item-imagem.component';
import {TopArtistaComponent} from '../../components/top-artista/top-artista.component';

@Component({
  selector: 'app-lista-artistas',
  imports: [
    ArtistaItemImagemComponent,
    BannerComponent,
    FaIconComponent,
    TopArtistaComponent
  ],
  templateUrl: './lista-artistas.component.html',
  styleUrl: './lista-artistas.component.scss'
})
export class ListaArtistasComponent implements OnInit {

  artistas: IArtista[] = [];

  constructor(private spotifyService: SpotifyService) {
  }

  async ngOnInit(): Promise<void> {
    this.artistas = await this.spotifyService.getTopArtistas(20, true);
  }
}

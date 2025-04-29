import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {IArtista} from '../../interfaces/IArtista';
import {ArtistaItemImagemComponent} from '../artista-item-imagem/artista-item-imagem.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-artistas',
  imports: [
    ArtistaItemImagemComponent
  ],
  templateUrl: './top-artistas.component.html',
  styleUrl: './top-artistas.component.scss'
})
export class TopArtistasComponent implements OnInit {

  topArtistas: IArtista[] = [];

  constructor(private spotifyServrice: SpotifyService, private router: Router) {
  }

  async ngOnInit() {
    this.topArtistas = await this.spotifyServrice.getTopArtistas(5);
  }

  async verTodos() {
    await this.router.navigate(['/player/artistas']);
  }
}

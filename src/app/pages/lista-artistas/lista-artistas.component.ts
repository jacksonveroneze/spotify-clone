import {Component, OnInit, signal} from '@angular/core';
import {IArtista} from '../../interfaces/IArtista';
import {SpotifyService} from '../../services/spotify.service';
import {ArtistaItemImagemComponent} from '../../components/artista-item-imagem/artista-item-imagem.component';

@Component({
  selector: 'app-lista-artistas',
  imports: [
    ArtistaItemImagemComponent
  ],
  templateUrl: './lista-artistas.component.html',
  styleUrl: './lista-artistas.component.scss'
})
export class ListaArtistasComponent implements OnInit {

  artistas = signal<IArtista[]>([]);

  constructor(private spotifyService: SpotifyService) {
  }

  async ngOnInit(): Promise<void> {
    const artistas = await this.spotifyService.getTopArtistas(20, true);


    this.artistas.set(artistas);
  }

  async follow(artista: IArtista): Promise<void> {
    await this.spotifyService.followArtist(artista.id);

    this.changeStatusFollow(artista.id, true);
  }

  async unfollow(artista: IArtista): Promise<void> {
    await this.spotifyService.unfollowArtist(artista.id);

    this.changeStatusFollow(artista.id, false);
  }

  changeStatusFollow(artistaId: string, isFollowed: boolean): void {
    const artista = this.artistas().find(a => a.id === artistaId);

    if (artista) {
      artista.isFollowed = isFollowed;
    }
  }
}

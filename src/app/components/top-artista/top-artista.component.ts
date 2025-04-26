import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { IArtista } from '../../interfaces/IArtista';
import { newArtista } from '../../Common/factories';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-top-artista',
  imports: [LoadingComponent],
  templateUrl: './top-artista.component.html',
  styleUrl: './top-artista.component.scss'
})
export class TopArtistaComponent implements OnInit {

  isBusy: boolean = true;

  constructor(private service: SpotifyService) { }

  topArtista: IArtista = newArtista();

  async ngOnInit(): Promise<void> {
    try {
      this.topArtista = await this.service.getTopArtista();
    } catch (error) {

    }
    finally {
      this.isBusy = false;
    }
  }

}

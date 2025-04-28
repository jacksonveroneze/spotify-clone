import { Component } from '@angular/core';
import {BuscasRecentesComponent} from '../buscas-recentes/buscas-recentes.component';
import {TopArtistasComponent} from '../top-artistas/top-artistas.component';
import {PlayerCardComponent} from '../player-card/player-card.component';

@Component({
  selector: 'app-painel-direito',
  imports: [BuscasRecentesComponent, TopArtistasComponent, PlayerCardComponent],
  templateUrl: './painel-direito.component.html',
  styleUrl: './painel-direito.component.scss'
})
export class PainelDireitoComponent {

}

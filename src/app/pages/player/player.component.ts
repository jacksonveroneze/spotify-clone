import { Component } from '@angular/core';
import { PainelEsquerdoComponent } from "../../components/painel-esquerdo/painel-esquerdo.component";
import { RouterOutlet } from '@angular/router';
import {PainelDireitoComponent} from '../../components/painel-direito/painel-direito.component';

@Component({
  selector: 'app-player',
  standalone: true,
  // imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  imports: [PainelEsquerdoComponent, RouterOutlet, PainelDireitoComponent]
})
export class PlayerComponent {

}

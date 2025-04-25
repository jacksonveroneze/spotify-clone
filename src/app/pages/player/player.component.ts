import { Component } from '@angular/core';
import { PainelEsquerdoComponent } from "../../components/painel-esquerdo/painel-esquerdo.component";

@Component({
  selector: 'app-player',
  standalone: true,
  // imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  imports: [PainelEsquerdoComponent]
})
export class PlayerComponent {

}

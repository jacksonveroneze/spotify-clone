import { Component } from '@angular/core';
import { BotaoMenuComponent } from "../botao-menu/botao-menu.component";

@Component({
  selector: 'app-painel-esquerdo',
  // imports: [BotaoMenuComponent],
  standalone: false,
  templateUrl: './painel-esquerdo.component.html',
  styleUrl: './painel-esquerdo.component.scss'
})
export class PainelEsquerdoComponent {
  
  botaoClick() {
    throw new Error('Method not implemented.');
  }

}

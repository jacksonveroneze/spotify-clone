import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { playerRoutes } from './player.routes';
import { PainelEsquerdoComponent } from "../../components/painel-esquerdo/painel-esquerdo.component";
import { BotaoMenuComponent } from '../../components/botao-menu/botao-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RodapeUsuarioComponent } from "../../components/rodape-usuario/rodape-usuario.component";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(playerRoutes)
]
})
export class PlayerModule { }

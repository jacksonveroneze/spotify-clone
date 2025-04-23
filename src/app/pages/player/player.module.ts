import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { playerRoutes } from './player.routes';
import { PainelEsquerdoComponent } from "../../components/painel-esquerdo/painel-esquerdo.component";

@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(playerRoutes)
  ]
})
export class PlayerModule { }

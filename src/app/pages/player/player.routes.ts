import {Routes} from '@angular/router';
import {PlayerComponent} from './player.component';
import {HomeComponent} from '../home/home.component';
import {ListaMusicaComponent} from '../lista-musica/lista-musica.component';
import {ListaArtistasComponent} from '../lista-artistas/lista-artistas.component';

export const playerRoutes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'lista/:tipo/:id',
        component: ListaMusicaComponent
      },
      {
        path: 'artistas',
        component: ListaArtistasComponent
      }
    ]
  }
];

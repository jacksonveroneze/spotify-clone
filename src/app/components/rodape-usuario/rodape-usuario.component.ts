import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../../interfaces/IUsuario';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rodape-usuario',
  standalone: false,
  templateUrl: './rodape-usuario.component.html',
  styleUrl: './rodape-usuario.component.scss'
})
export class RodapeUsuarioComponent implements OnInit {

  usuario: IUsuario;

  sairIcone = faSignOutAlt;

  constructor(private service: SpotifyService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.usuario = await this.service.getUsuario();
  }

  logout(): void {
    this.router.navigate(['login']);
  }
}

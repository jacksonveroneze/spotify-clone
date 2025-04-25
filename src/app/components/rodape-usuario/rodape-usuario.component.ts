import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../../interfaces/IUsuario';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-rodape-usuario',
  standalone: true,
  imports: [FaIconComponent],
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

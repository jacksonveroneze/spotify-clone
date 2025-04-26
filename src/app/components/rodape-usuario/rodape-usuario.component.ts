import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../../interfaces/IUsuario';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LoadingComponent } from "../loading/loading.component";
import { AuthenticateService } from '../../services/spotify-auth.service';


@Component({
  selector: 'app-rodape-usuario',
  standalone: true,
  imports: [FaIconComponent, LoadingComponent],
  templateUrl: './rodape-usuario.component.html',
  styleUrl: './rodape-usuario.component.scss'
})
export class RodapeUsuarioComponent implements OnInit {

  isBusy: boolean = true;

  usuario?: IUsuario;

  sairIcone = faSignOutAlt;

  constructor(
    private service: SpotifyService,
    private router: Router,
    private authService: AuthenticateService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.usuario = await this.service.getUsuario();

    } catch (error) {
      alert(error)
    }
    finally {
      this.isBusy = false;
    }
  }

  logout(): void {
    this.authService.logout();

    this.router.navigate(['login']);
  }
}

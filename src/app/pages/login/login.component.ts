import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
import { SpotifyAuthService } from '../../services/spotify-auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: SpotifyAuthService,
    private service: SpotifyService,
    private router: Router
  ) { }

  track: any;


  async ngOnInit(): Promise<void> {
    this.authService.handleCallback().then(success => {
      if (success) {
        this.router.navigateByUrl('/');
      } else {
        console.error('Login falhou');
      }
    });

    if (!!sessionStorage.getItem('access_token')) {
      var token = sessionStorage.getItem('access_token');

      this.service.setToken(token!);

      await this.setTrack();
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();

    this.router.navigateByUrl('/')
  }

  async next() {
    this.service.next();

    await this.setTrack();
  }

  async prev() {
    this.service.prev();

    await this.setTrack();
  }

  async setTrack() {
    var res = await this.service.track();

    this.track = res.item!.name;
  }
}
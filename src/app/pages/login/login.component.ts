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

  ngOnInit(): void {
    this.authService.handleCallback().then(success => {
      if (success) {
        this.router.navigateByUrl('/');
      } else {
        console.error('Login falhou');
      }
    });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();

    this.router.navigateByUrl('/')
  }

  next() {
    if (!!sessionStorage.getItem('access_token')) {
      var token = sessionStorage.getItem('access_token');

      this.service.setToken(token!);
      this.service.next();
    }
  }

  prev() {
    if (!!sessionStorage.getItem('access_token')) {
      var token = sessionStorage.getItem('access_token');

      this.service.setToken(token!);
      this.service.prev();
    }
  }
}
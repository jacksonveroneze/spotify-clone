import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyAuthService } from '../../services/spotify-auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: SpotifyAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.handleCallback()
      .then(success => {
        if (success) {
          this.router.navigateByUrl('/');
        } else {
          console.error('Login falhou');
        }
      });
  }

  login(): void {
    this.authService.login();
  }
}
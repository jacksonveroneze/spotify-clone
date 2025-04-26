import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/spotify-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.handleCallback()
      .then(success => {
        if (success) {
          this.router.navigateByUrl('/player/home');
        } else {
          console.error('Login falhou');
        }
      });
  }

  async login(): Promise<void> {
    await this.authService.login();
  }
}
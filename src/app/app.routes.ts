import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { isAuthenticated } from './guards/isAuthenticated.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module')
            .then(conf => conf.LoginModule)
    },
    {
        path: 'player',
        canActivate: [isAuthenticated],
        loadChildren: () => import('./pages/player/player.module')
            .then(conf => conf.PlayerModule)
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];

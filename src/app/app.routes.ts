import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module')
            .then(conf => conf.LoginModule)
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

import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/pages/dashboard-page.component';
import { Auth } from './features/auth/pages/auth-page.components';

export const routes: Routes = [
    {
        path: 'auth',
        component: Auth
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];

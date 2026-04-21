import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/pages/dashboard-page.components';
import { Auth } from './features/auth/pages/auth-page.components';
import { Broker } from './features/broker/pages/broker-page.components';

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
        path: 'broker',
        component: Broker
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];

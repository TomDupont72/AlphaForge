import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/pages/dashboard-page.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

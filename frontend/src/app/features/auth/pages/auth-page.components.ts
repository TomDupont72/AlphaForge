import { Component, inject } from '@angular/core';
import { AuthFacade } from '@/features/auth/hooks/auth.facade';
import { SignIn } from '../components/sign-in.components';
import { Register } from '../components/register.components';
import { AuthApi } from '../api/auth.api';

@Component({
    selector: 'auth',
    standalone: true,
    imports: [
        SignIn,
        Register
    ],
    providers: [AuthFacade, AuthApi],
    templateUrl: './auth-page.components.html'
})
export class Auth {
    readonly auth = inject(AuthFacade)
};
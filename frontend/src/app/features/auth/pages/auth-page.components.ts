import { Component, inject, OnInit } from '@angular/core';
import { AuthFacade } from '@/features/auth/hooks/auth.facade';
import { SignIn } from '../components/sign-in.components';
import { Register } from '../components/register.components';
import { AuthApi } from '../api/auth.api';
import { ZardLoaderComponent } from '@/shared/components/loader';

@Component({
    selector: 'auth',
    standalone: true,
    imports: [
        SignIn,
        Register,
        ZardLoaderComponent
    ],
    providers: [AuthFacade, AuthApi],
    templateUrl: './auth-page.components.html'
})
export class Auth implements OnInit {
    readonly auth = inject(AuthFacade)

    ngOnInit(): void {
        void this.auth.initSession();
    }
};

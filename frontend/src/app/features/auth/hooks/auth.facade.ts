import { inject, Injectable, signal } from "@angular/core";
import { AuthApi } from "@/features/auth/api/auth.api";
import { Router } from "@angular/router";
import { SignInRequest, RegisterRequest, AppSession } from "@/features/auth/models/auth.models";
import { authClient } from "@/../lib/auth-client";

@Injectable()
export class AuthFacade {
    readonly authApi = inject(AuthApi);
    readonly router = inject(Router);

    readonly mode = signal<'signIn' | 'register'>('signIn');
    readonly loading = signal<boolean>(false);
    readonly error = signal<string | null>(null);

    setMode(mode: 'signIn' | 'register') {
        this.mode.set(mode)
    }

    async signIn(payload: SignInRequest): Promise<void> {
        this.loading.set(true);
        this.error.set(null);

        try {
        const data = await this.authApi.apiSignIn(payload.email, payload.password);
        
        localStorage.setItem(
            "session",
            JSON.stringify({
            user: {
                email: data.user.email,
                name: data.user.name,
                id: data.user.id
            },
            createdAt: data.user.createdAt,
            } as AppSession)
        );
        
        this.router.navigate(['/dashboard']);
    } catch (error) {
        console.error(error)
        this.error.set("Impossible de se connecter.");
        } finally {
            this.loading.set(false);
        }
    }

    async register(payload: RegisterRequest): Promise<void> {
        this.loading.set(true);
        this.error.set(null);

        try {
        const data = await this.authApi.apiSignUp(payload.email, payload.password, payload.username);

        localStorage.setItem(
            "session",
            JSON.stringify({
            user: {
                email: data.user.email,
                name: data.user.name,
                id: data.user.id
            },
            createdAt: data.user.createdAt,
            } as AppSession)
        );

        this.router.navigate(['/dashboard']);

        console.log(data)
        } catch (error) {
        console.error(error)
        this.error.set("Impossible de s'inscrire.");
        } finally {
        this.loading.set(false);
        }
    };

    async initSession(): Promise<void> {
        this.loading.set(true)
        const session = await authClient.getSession()

        if (session?.data) {
            localStorage.setItem(
                "session",
                JSON.stringify({
                    user: {
                        email: session.data.user.email,
                        name: session.data.user.name,
                        id: session.data.user.id
                    },
                    createdAt: session.data.session.createdAt
                } as AppSession)
            );

            this.router.navigate(['/dashboard']);
        }

        this.loading.set(false)
    }
}

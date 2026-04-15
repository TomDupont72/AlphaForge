import { inject, Injectable, signal } from "@angular/core";
import { AuthApi } from "@/features/auth/api/auth.api";
import { Router } from "@angular/router";
import { SignInRequest, RegisterRequest } from "@/features/auth/models/auth.models";

@Injectable()
export class AuthFacade {
    readonly authApi = inject(AuthApi);
    private router = inject(Router);

    readonly mode = signal<string>('signIn');
    readonly loading = signal<boolean>(false);
    readonly error = signal<string | null>(null);

    async signIn(payload: SignInRequest): Promise<void> {
        this.loading.set(true);
        this.error.set(null);

        try {
        const data = await this.authApi.apiSignIn(payload.email, payload.password);
        console.log(data)
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
        console.log(data)
        } catch (error) {
        console.error(error)
        this.error.set("Impossible de s'inscrire.");
        } finally {
        this.loading.set(false);
        }
    }
}
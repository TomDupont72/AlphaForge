import { AuthApi } from "@/features/auth/api/auth.api";
import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class SidebarFacade {
    readonly authApi = inject(AuthApi);
    readonly router = inject(Router)
    readonly session = JSON.parse(localStorage.getItem("session") || "null");
    readonly sidebarCollapsed = signal(true);

    async logOut() {
        try {
            await this.authApi.apiLogOut();
            localStorage.removeItem("session");
            this.router.navigate(['/auth']);
        } catch (error) {
            console.error(error)
        }
    }

    navigateRoute(route: string | undefined) {
        if (route) this.router.navigate([route])
    }

    toggleSidebar() {
        this.sidebarCollapsed.update(collapsed => !collapsed);
    }
    
    onCollapsedChange(collapsed: boolean) {
        this.sidebarCollapsed.set(collapsed);
    }
}

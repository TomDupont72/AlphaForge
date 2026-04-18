import { inject, Injectable } from "@angular/core";
import { DashboardApi } from "../api/dashboard.api";
import { Router } from "@angular/router";

@Injectable()
export class DashboardFacade {
    readonly dashboardApi = inject(DashboardApi);
    readonly router = inject(Router)

    async logOut() {
        try {
            await this.dashboardApi.apiLogOut();
            localStorage.removeItem("session");
            this.router.navigate(['/auth']);
        } catch (error) {
            console.error(error)
        }
    }

    readonly account = this.dashboardApi.apiAccount();
}
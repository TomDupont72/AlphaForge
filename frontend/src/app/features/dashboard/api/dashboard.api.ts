import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@/../environments/environments";
import { firstValueFrom } from "rxjs";
import { AlpacaAccount } from "../models/dashboard.models";
import { authClient } from "../../../../lib/auth-client";

@Injectable()
export class DashboardApi {
  readonly http = inject(HttpClient);

  async apiLogOut() {
    const { data, error } = await authClient.signOut();

    if (error) {
        throw new Error("Failed to sign in");
    }

    return data;
  }

  async apiAccount() {
    try {
      return await firstValueFrom(
        this.http.get<AlpacaAccount>(`${environment.apiUrl}/api/alpaca/account`, {
          withCredentials: true,
        })
      );
    } catch {
      throw new Error("Failed to get account");
    }
  }
}
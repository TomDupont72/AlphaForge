import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { environment } from "@/../environments/environments";

@Injectable()
export class BrokerApi {
    readonly http = inject(HttpClient);

    async apiUpdateSecrets(keyId: string, secretId: string) {
        try {
            return await firstValueFrom(
                this.http.patch(`${environment.apiUrl}/api/alpaca/update-secrets`, {
                    keyId,
                    secretId
                }, 
            {withCredentials: true})
            )
        } catch {
            throw new Error("Failed to update secrets")
        }
    }
}
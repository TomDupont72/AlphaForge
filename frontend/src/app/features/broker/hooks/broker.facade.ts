import { inject, Injectable, signal } from "@angular/core";
import { BrokerApi } from "../api/broker.api";
import { UpdateSecretsRequest } from "../models/broker.models";

@Injectable()
export class BrokerFacade {
    readonly brokerApi = inject(BrokerApi);

    readonly keyId = signal<string>("");
    readonly secretId = signal<string>("");

    readonly loading = signal<boolean>(false);
    readonly error = signal<string | null>(null);

    async updateSecrets(payload: UpdateSecretsRequest) {
        this.loading.set(true);
        this.error.set(null);

        try {
            await this.brokerApi.apiUpdateSecrets(payload.keyId, payload.secretId)
        } catch (error) {
            console.error(error)
            this.error.set("Impossible de modifier les clés.")
        } finally {
            this.loading.set(false)
        }
    }
}
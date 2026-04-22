import { ZardButtonComponent } from "@/shared/components/button";
import { ZardCardComponent } from "@/shared/components/card";
import { ZardDialogService } from "@/shared/components/dialog";
import { LayoutImports } from "@/shared/components/layout";
import { Sidebar } from "@/shared/custom-components/sidebar/sidebar";
import { SidebarFacade } from "@/shared/hooks/sidebar.facade";
import { Component, inject } from "@angular/core";
import { SecretsDialog } from "../components/secrets-dialog.components";
import { BrokerFacade } from "../hooks/broker.facade";
import { BrokerApi } from "../api/broker.api";

@Component({
    selector: 'broker',
    standalone: true,
    imports: [
        LayoutImports,
        Sidebar,
        ZardButtonComponent,
        ZardCardComponent
    ],
    providers: [BrokerFacade, BrokerApi],
    templateUrl: './broker-page.components.html',
})
export class Broker {
    readonly sidebar = inject(SidebarFacade);
    readonly broker = inject(BrokerFacade);
    readonly dialogService = inject(ZardDialogService);

    openDialog() {
        this.dialogService.create({
            zTitle: 'Ajouter les secrets',
            zContent: SecretsDialog,
            zWidth: '425px',
            zOnOk: (dialog) => {
                dialog.form.markAllAsTouched();

                if (dialog.form.invalid) {
                    return false;
                }

                return this.broker.updateSecrets(dialog.form.getRawValue());
            }
        })
    }
}
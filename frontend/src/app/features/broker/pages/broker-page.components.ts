import { ZardButtonComponent } from "@/shared/components/button";
import { ZardCardComponent } from "@/shared/components/card";
import { ZardDialogService } from "@/shared/components/dialog";
import { LayoutImports } from "@/shared/components/layout";
import { Sidebar } from "@/shared/custom-components/sidebar/sidebar";
import { SidebarFacade } from "@/shared/hooks/sidebar.facade";
import { Component, inject } from "@angular/core";
import { SecretsDialog } from "../components/secrets-dialog.components";

@Component({
    selector: 'broker',
    standalone: true,
    imports: [
        LayoutImports,
        Sidebar,
        ZardButtonComponent,
        ZardCardComponent
    ],
    templateUrl: './broker-page.components.html',
})
export class Broker {
    readonly sidebar = inject(SidebarFacade)
    readonly dialogService = inject(ZardDialogService);

    openDialog() {
        this.dialogService.create({
            zTitle: 'Ajouter les secrets',
            zContent: SecretsDialog,
            zWidth: '425px'
        })
    }
}
import { ZardButtonComponent } from "@/shared/components/button";
import { ZardFormControlComponent, ZardFormFieldComponent, ZardFormLabelComponent } from "@/shared/components/form";
import { ZardInputDirective } from "@/shared/components/input";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'secrets-dialog',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        ZardFormFieldComponent,
        ZardFormControlComponent,
        ZardFormLabelComponent,
        ZardInputDirective,
        ZardButtonComponent
    ],
    templateUrl: './secrets-dialog.components.html'
})
export class SecretsDialog {
    readonly fb = inject(FormBuilder);

    readonly form = this.fb.group({
        'APCA-API-KEY-ID': [''],
        'APCA-API-SECRET-KEY': ['']
    });
}

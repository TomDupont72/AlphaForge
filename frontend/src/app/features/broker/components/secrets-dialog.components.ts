import { ZardFormControlComponent, ZardFormFieldComponent, ZardFormLabelComponent } from "@/shared/components/form";
import { ZardInputDirective } from "@/shared/components/input";
import { Component, inject, output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { updateSecretsForm } from "../modules/broker.modules";

@Component({
    selector: 'secrets-dialog',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        ZardFormFieldComponent,
        ZardFormControlComponent,
        ZardFormLabelComponent,
        ZardInputDirective
    ],
    templateUrl: './secrets-dialog.components.html'
})
export class SecretsDialog {
    readonly fb = inject(FormBuilder);

    submitted = output<{keyId: string, secretId: string}>();

    form = updateSecretsForm();

    submit() {
        this.form.markAllAsTouched();

        const value = this.form.getRawValue();

        this.submitted.emit({
            keyId: value.keyId.trim(),
            secretId: value.secretId.trim()
        })
    }
}

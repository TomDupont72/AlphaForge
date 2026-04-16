import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormControlComponent, ZardFormFieldComponent, ZardFormLabelComponent } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { Component, inject, output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { signInForm } from "../modules/auth.modules";
import { AuthFacade } from '../hooks/auth.facade';

@Component({
    selector: 'sign-in',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        ZardCardComponent,
        ZardFormFieldComponent,
        ZardFormControlComponent,
        ZardFormLabelComponent,
        ZardInputDirective,
        ZardButtonComponent
    ],
    templateUrl: './sign-in.components.html'
})
export class SignIn {
    readonly auth = inject(AuthFacade);

    submitted = output<{email: string, password: string }>();

    form = signInForm();

    submit() {
        this.form.markAllAsTouched();

        const value = this.form.getRawValue();

        this.submitted.emit({
            email: value.email.trim(),
            password: value.password.trim()
        })
    }
}
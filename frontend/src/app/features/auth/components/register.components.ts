import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormControlComponent, ZardFormFieldComponent, ZardFormLabelComponent } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { Component, inject, output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { registerForm } from "../modules/auth.modules";
import { AuthFacade } from '../hooks/auth.facade';

@Component({
    selector: 'register',
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
    templateUrl: './register.components.html'
})
export class Register {
    readonly auth = inject(AuthFacade);

    submitted = output<{email: string, password: string, username: string, passwordConfirm: string }>();

    form = registerForm();

    submit() {
        this.form.markAllAsTouched();

        const value = this.form.getRawValue();

        this.submitted.emit({
            email: value.email.trim(),
            password: value.password.trim(),
            username: value.username.trim(),
            passwordConfirm: value.passwordConfirm.trim()
        })
    }
}
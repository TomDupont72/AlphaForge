import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormControlComponent, ZardFormFieldComponent, ZardFormLabelComponent } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { Component, inject } from '@angular/core';
import { AuthFacade } from '@/features/auth/hooks/auth.facade';

@Component({
    selector: 'auth',
    standalone: true,
    imports: [
        ZardCardComponent,
        ZardFormFieldComponent,
        ZardFormControlComponent,
        ZardFormLabelComponent,
        ZardInputDirective,
        ZardButtonComponent
    ],
    providers: [AuthFacade],
    templateUrl: './auth-page.components.html'
})
export class Auth {
    readonly auth = inject(AuthFacade)
};
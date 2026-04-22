import { FormControl, FormGroup, Validators } from "@angular/forms";

export function keyIdControl() {
    return new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(1)]
    })
}

export function secretIdControl() {
    return new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(1)]
    })
}

export function updateSecretsForm() {
    return new FormGroup({
        keyId: keyIdControl(),
        secretId: secretIdControl()
    })
}
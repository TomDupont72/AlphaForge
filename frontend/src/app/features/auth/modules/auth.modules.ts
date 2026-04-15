import { FormControl, Validators, FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailControl() {
  return new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
}

export function passwordControl() {
  return new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(10)],
  });
}

export function usernameControl() {
  return new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
}

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (password !== passwordConfirm) {
      return { passwordMismatch: true };
    }

    return null;
  };
}

const signInForm = new FormGroup({
  email: emailControl(),
  password: passwordControl(),
});

const registerForm = new FormGroup(
  {
    email: emailControl(),
    password: passwordControl(),
    username: usernameControl(),
    passwordConfirm: passwordControl(),
  },
  {
    validators: [passwordMatchValidator()],
  }
);
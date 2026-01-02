import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ipv4Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (!ipv4Regex.test(control.value)) {
      return { invalidIpv4: true };
    }

    return null;
  };
}

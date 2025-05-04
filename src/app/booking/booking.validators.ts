import { Form, FormControl } from "@angular/forms";

export function emailValidator(control: FormControl): { [key: string]: boolean } | null {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);

    return valid ? null : { invalidEmail: true };
}

export function phoneValidator(control: FormControl): { [key: string]: boolean } | null {
    const phoneRegex = /^[1-9]\d{9}$/;
    const valid = phoneRegex.test(control.value);
    return valid ? null : { invalidPhone: true };
}
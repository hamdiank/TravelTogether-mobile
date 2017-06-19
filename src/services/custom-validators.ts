import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable()
export class CustomValidators {

  static getErrorMessage(errorName: string, error?: any): string {
    let config = {
      'required': 'Required',
      'minlength': `${error.requiredLength} char min`,
      'maxlength': `${error.requiredLength} char max`,
      'noEmptyWhiteSpace': 'Contient un espace blanc vide',
      'invalidEmailAddress': 'Adresse mail invalide',
      'invalidPassword': 'Pas d`espace, s`il vous plait.', // Appropriate message for controlling regex
      'invalidUsername': 'Pas d`espaces, de chiffres ou de caractères spéciaux, s`il vous plaît.', // Appropriate message for controlling regex
      'mismatchedPasswords': 'Les mots de passe ne correspondent pas.',
      'required_email': 'Votre adresse mail est requise pour l`inscription', // Customize Ionic Cloud default message
      'required_password': 'Votre mot de passe est requise pour l`inscription', // Customize Ionic Cloud default message
      'conflict_email': 'The email address you entered already belongs to another account', // Customize Ionic Cloud default message
      'conflict_username': 'The username you entered already belongs to another account', // Customize Ionic Cloud default message
      'invalid_email': 'S`il vous plaît, mettez une adresse email valide', // Customize Ionic Cloud default message,
      'Unsuccessful HTTP response': 'There is no account with that email/password combination.' // Customize Ionic Cloud default message
    };

    return (errorName in config) ? config[errorName] : 'Unknown Error';
  }

  static noEmptyWhiteSpace(control): any {
    if (control.value != null && control.value.trim() !== '') {
      return null;
    } else {
      return {'noEmptyWhiteSpace': true};
    }
  }

  static emailValidator(control): any {
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {'invalidEmailAddress': true};
    }
  }

  static passwordValidator(control): any {
    // [^ ]*         - Assert password has no spaces
    if (control.value.match(/^[^ ]*$/)) {
      return null;
    } else {
      return {'invalidPassword': true};
    }
  }

  static usernameValidator(control): any {
    if (control.value.trim() === '' || control.value.match(/^[a-zA-Z]+$/)) {
      return null;
    } else {
      return {'invalidUsername': true};
    }
  }

  static passwordMatchValidator(group: FormGroup): any {
    var password = group.get('password').value;
    var confirmPassword = group.get('confirmPassword').value;


    if (password == confirmPassword) {
      return null;
    } else {
      return {'mismatchedPasswords': true};
    }
  }
}

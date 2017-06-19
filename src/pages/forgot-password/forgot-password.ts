import { Component } from "@angular/core";
import { AlertController, NavController, LoadingController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { CustomValidators } from "../../services/custom-validators";
import { UserAuth } from "../../services/user-auth";
import { UserService } from "../../services/user.service";
import { LoginPage } from "../login/login";

@Component({
  selector: 'forgot-password-page',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  forgotPasswordForm: FormGroup;
  email: AbstractControl;
  error: string;

  constructor(public navCtrl: NavController, public userAuthService: UserAuth,public userService:UserService,
              public fb: FormBuilder,public loading: LoadingController, public alertCtrl: AlertController) {
    this.forgotPasswordForm = fb.group({
      'email': [
        '',
        Validators.compose([Validators.required, CustomValidators.emailValidator,
          CustomValidators.noEmptyWhiteSpace])
      ]
    });

    this.email = this.forgotPasswordForm.controls['email'];
  }

  getResetCode(form: any): void {
    let loader = this.loading.create({
      content: 'connexion ...',
    });
      loader.present().then(() => {
    this.userService.resetMp(form.email).subscribe((data)=> {
     loader.dismiss();
     this.ConfirmAlert();
      },
        (message) => {
          //   this.error = CustomValidators.getErrorMessage(error, error.data);
          let err = message.json();
          this.error = err.message;
        loader.dismiss();
        this.showAlert();
        }
    );
        }  );
  }

  showAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Could Not Request Password Reset',
      message: this.error,
      buttons: ['OK']
    });

    alert.present();
  }
      ConfirmAlert() {

    let alert = this.alertCtrl.create({
      title: 'mot de passe Réinitialisé ',
      message: 'Consulter votre mail ',
      buttons: [
        {
          text: 'ok',
          handler: () => {
          this.navCtrl.setRoot(LoginPage);

          }
        }
      ]
    });
    alert.present();

  }
}

import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController } from "ionic-angular";
import { UserAuth } from "../../services/user-auth";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { CustomValidators } from "../../services/custom-validators";
import { LoginPage } from "../login/login";
import { UserService } from "../../services/user.service";


@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html',
  styleUrls: ['/signup.scss']
})
export class SignupPage {
  signupForm: FormGroup;
  error: string;
  firstName: AbstractControl;
  lastName: AbstractControl;
  username: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  profession: AbstractControl;
  numTelephone: AbstractControl;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public userAuthService: UserAuth, public fb: FormBuilder,public loading: LoadingController,public userService:UserService) {
    this.signupForm = fb.group({
      'firstName': [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20),
        CustomValidators.noEmptyWhiteSpace])
      ],

      'lastName': [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20),
        CustomValidators.noEmptyWhiteSpace])
      ],

      'username': [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20),
        CustomValidators.usernameValidator, CustomValidators.noEmptyWhiteSpace])
      ],

      'email': [
        '',
        Validators.compose([Validators.required, CustomValidators.emailValidator,
        CustomValidators.noEmptyWhiteSpace])
      ],

      'password': [
        '',
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(16),
        CustomValidators.passwordValidator, CustomValidators.noEmptyWhiteSpace])
      ],
      'profession': [
        '',
        Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(16),
        CustomValidators.noEmptyWhiteSpace])
      ],
      'numTelephone':[
        '',
        Validators.compose([Validators.required, Validators.maxLength(20)])
      ],
    });

    this.firstName = this.signupForm.controls['firstName'];
    this.lastName = this.signupForm.controls['lastName'];
    this.username = this.signupForm.controls['username'];
    this.email = this.signupForm.controls['email'];
    this.password = this.signupForm.controls['password'];
    this.profession=this.signupForm.controls['profession'];
    this.numTelephone=this.signupForm.controls['numTelephone'];
  }

  signup(form: any) {
    let details: any = {
      'login': form.username.trim(),
      'email': form.email.trim(),
      'motDePasse': form.password.trim(),
      'nom': form.firstName.trim(),
      'prenom': form.lastName.trim(),
      'profession':form.profession.trim(),
      'numTelephone':form.numTelephone.trim()
    };
   let loader = this.loading.create({
      content: 'Chargement ...',
    });
    loader.present().then(() => {
      this.userService.addUser(details).subscribe((data) => {

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

    });

  }

 

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Échec de l`inscription',
      message: this.error,
      buttons: ['OK']
    });

    alert.present();
  }
    ConfirmAlert() {

    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Consulter votre mail pour confirmer l`inscription',
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

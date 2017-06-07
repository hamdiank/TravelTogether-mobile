import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController } from "ionic-angular";
import { UserAuth } from "../../services/user-auth";
import { Page1 } from "../page1/page1";
import { SignupPage } from "../signup/signup";
import { ForgotPasswordPage } from "../forgot-password/forgot-password";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { CustomValidators } from "../../services/custom-validators";
import { Storage } from '@ionic/storage';
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
  styleUrls: ['/login.scss']
})
export class LoginPage {
  user: User;
  signupPage: any;
  forgotPasswordPage: any;
  loginForm: FormGroup;
  error: string;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private userService: UserService, public storage: Storage, public navCtrl: NavController, public userAuthService: UserAuth,
    public fb: FormBuilder, public alertCtrl: AlertController, public loading: LoadingController) {
    this.signupPage = SignupPage;
    this.forgotPasswordPage = ForgotPasswordPage;

    this.loginForm = fb.group({
      'email': [
        '',
        Validators.compose([Validators.required,
        CustomValidators.noEmptyWhiteSpace])
      ],

      'password': [
        '',
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(16),
        CustomValidators.passwordValidator, CustomValidators.noEmptyWhiteSpace])
      ]
    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  signin(form: any) {
    let loader = this.loading.create({
      content: 'connexion ...',
    });
    loader.present().then(() => {
      this.userAuthService.signin(form).subscribe((data) => {


        this.storage.ready().then(() => {
          this.storage.get("token").then((data) => {
            let jwtHelper: JwtHelper = new JwtHelper();
            console.log(data);
            jwtHelper.decodeToken(data).userId;
            this.userService.getById(jwtHelper.decodeToken(data).userId).subscribe(result => {
              this.user = result;
              console.log(this.user);
            });


          });
        });

        this.navCtrl.setRoot(Page1);
      },
        (message) => {
          //   this.error = CustomValidators.getErrorMessage(error, error.data);
          let err = message.json();
          this.error = err.message;

          this.showAlert();
        }
      );

    });

    loader.dismiss();

  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: 'Échec de la connexion',
      message: this.error,
      buttons: ['OK']
    });

    alert.present();
  }
}

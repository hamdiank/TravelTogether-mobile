import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Storage } from "@ionic/storage";
import { MyApp } from './app.component';
import { Page1, ModalContentPage, ModalReservation, ModalComment } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { UserAuth } from "../services/user-auth";
import { CustomValidators } from "../services/custom-validators";
import { ErrorMessages } from "../services/error-messages";
import { ConfirmPasswordResetPage } from "../pages/confirm-password-reset/confirm-password-reset";
import { ForgotPasswordPage } from "../pages/forgot-password/forgot-password";
import { SignupPage } from "../pages/signup/signup";
import { LoginPage } from "../pages/login/login";
import { UserService } from "../services/user.service";
import { ProfilePage, ModalContentAvis } from "../pages/profile/profile";
import { AnnonceCovoiService } from "../services/annonceCovoi.service";
import { ChatBubble } from "../components/chatBubble/chatBubble";
import { ElasticTextarea } from "../components/elasticTextarea";
import { ChatPage } from "../pages/chatPage/chatPage";
import { CommentService } from "../services/comment.service";
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapComponent } from "../pages/map/map";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '615e964e'
  }
};

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    Page1,
    Page2,
    LoginPage,
    SignupPage,
    ForgotPasswordPage,
    ConfirmPasswordResetPage,
    ErrorMessages,ModalContentPage,ChatBubble,ElasticTextarea,ChatPage,ModalContentAvis,ModalReservation,ModalComment,MapComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxUrXL9TjtowybSL9XLZPHCLOtk0Jbwck'
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    Page1,
    Page2,
    LoginPage,
    SignupPage,
    ForgotPasswordPage,
    ConfirmPasswordResetPage,ModalContentPage,ModalContentAvis,ModalReservation,ChatBubble,ElasticTextarea,ChatPage,ModalComment,MapComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  Storage,
  UserAuth,
  CustomValidators,UserService,AnnonceCovoiService,CommentService
  ]
})
export class AppModule {}

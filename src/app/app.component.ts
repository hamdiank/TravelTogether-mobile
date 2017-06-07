import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from "../pages/login/login";
import { UserService } from "../services/user.service";
import { User } from "../models/index";
import { ProfilePage } from "../pages/profile/profile";
import { JwtHelper } from "angular2-jwt/angular2-jwt";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  data: any="";
  user: User;
  rootPage: any ;
  name: any;
  pages: Array<{ title: string, component: any,icon:any }>;
  profile: { title: string, component: any};
  constructor(private userService: UserService, public platform: Platform, public storage: Storage, public app: App, public loading: LoadingController) {

    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accueil', component: Page1 ,icon:'home'},
      { title: 'Mes Annonces', component: Page2,icon:'clipboard' },
     
    ];
    this.profile = { title: 'Profil', component: ProfilePage };
  }

  initializeApp() {
    this.data="";
    this.storage.ready().then(() => {
      this.storage.get("token").then((data) => {
        console.log("dataa   "+data);
        this.data=data;
        if (data === null) {
           console.log("dataa   "+data);
          this.rootPage = LoginPage;
        }
        else {
          
          this.rootPage = Page1;
        }
      });
    });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  openProfile(page) {
       this.storage.ready().then(() => {
      this.storage.get("token").then((data) => {
    console.log(data);
       let jwtHelper: JwtHelper = new JwtHelper();
       console.log(data);
       let a=jwtHelper.decodeToken(data).userId;
       console.log("aaa "+a);
       this.nav.push(ProfilePage, { data: a });
      });
       })
    
  }
  logout(): void {
    let loader = this.loading.create({
      content: 'déconnexion ...',
    });
    loader.present().then(() => {
      this.storage.remove("token");
      this.app.getActiveNav().setRoot(LoginPage);

      loader.dismiss();
    });
  }

}

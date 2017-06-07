import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { ChatPage } from "../chatPage/chatPage";
import { Avis } from "../../models/Avis";
import { JwtHelper } from "angular2-jwt/angular2-jwt";
@Component({
  selector: 'page-profile-four',
  templateUrl: 'profile.html'
})
export class ProfilePage {


  user = new User();
id:any
  posts = [
    {
      postImageUrl: 'assets/img/background/background-2.jpg',
      text: 'I believe in being strong when everything seems to be going wrong. I believe that happy girls are the prettiest girls. I believe that tomorrow is another day and I believe in miracles.',
      date: 'November 5, 2016',
      likes: 12,
      comments: 4,
      timestamp: '11h ago'
    },
    {
      postImageUrl: 'assets/img/background/background-3.jpg',
      text: 'Do not go where the path may lead, go instead where there is no path and leave a trail.',
      date: 'October 23, 2016',
      likes: 30,
      comments: 64,
      timestamp: '30d ago'
    },
    {
      postImageUrl: 'assets/img/background/background-4.jpg',
      date: 'June 28, 2016',
      likes: 46,
      text: 'Hope is the thing with feathers that perches in the soul And sings the tune without the words And never stops at all.',
      comments: 66,
      timestamp: '4mo ago'
    },
  ];
  constructor(public navCtrl: NavController, private storage: Storage, private userService: UserService, public params: NavParams) {
    this.storage.ready().then(() => {
      this.storage.get("token").then((data) => {

        let jwtHelper: JwtHelper = new JwtHelper();
        this.id = jwtHelper.decodeToken(data).userId;
        console.log("id  " + this.id);


      });
    });
    console.log(this.params.get("data"));

    let a = this.params.get("data");
    this.user = new User();
    this.userService.getById(a).subscribe(result => {
      this.user = result;
      console.log(this.user);
    });
  }

  showAvis() {
    this.navCtrl.push(ModalContentAvis, { id: this.user.idUtilisateur });
  }
  ionViewDidLoad() {
    console.log('Hello ProfileFour Page');

  }

  imageTapped(post) {
    //this.toastCtrl.create('Post image clicked');
  }

  comment(post) {
    //this.toastCtrl.create('Comments clicked');
  }

  message() {
    console.log(this.user);
    this.navCtrl.push(ChatPage, { user: this.user });
  }

}
@Component({
  template: `
<ion-header>
  <ion-toolbar color="customGreen">
    <ion-title>
      Avis
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Annuler</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>


<ion-content class="list-avatar-page">
<ion-list>
  <ion-item-sliding *ngFor="let av of avi">

   <ion-item color="#1ab394">
      <ion-avatar item-start>
     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmcnjEKIYp8_oIvSdDatu-A5XVjc_8ZCfBF5TdY8mJ11ZoaYjtag"
     (click)="getProfile(av.author.idUtilisateur)"> 
      </ion-avatar>
      <h2>{{av.author.nom}}</h2>
      <p>{{av.text}}</p>
      <ion-note item-end>{{av.date | date :'short'}} </ion-note>
    </ion-item>
       <ion-item-options side="right" *ngIf="(id == id2) || (av.author.idUtilisateur != id) ">
      <button ion-button color="danger" (click)="delete(av.id)">
      <ion-icon name="trash"></ion-icon> 
      </button>
     
    </ion-item-options>

</ion-item-sliding>
    </ion-list>
 

</ion-content>


<ion-footer *ngIf="id != id2" class="chatPageFooter">

  <ion-toolbar>
    <ion-item>
      <ion-label style="margin:0px;"></ion-label>
      <div item-content style="width:100%;">
        <elastic-textarea #txtChat placeholder="Ajouter votre avis" lineHeight="22"></elastic-textarea>
      </div>
    </ion-item>
    <ion-buttons right>
      <button ion-button icon-only style="min-width:45px;" (click)="sendAvis()">
        <ion-icon name="send"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-footer>

`
})
export class ModalContentAvis {
  id: any;
  id2: any;
  avi: Avis[];
  @ViewChild('txtChat') txtChat: any;
  @ViewChild('content') content: any;
  constructor(private toastCtrl: ToastController,private userService: UserService, public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController, private storage: Storage, private alertCtrl: AlertController
  ) {

    this.storage.ready().then(() => {
      this.storage.get("token").then((data) => {
        console.log("dataa   " + data);
        let jwtHelper: JwtHelper = new JwtHelper();
        this.id2 = jwtHelper.decodeToken(data).userId;
        console.log("id22  " + this.id2);
        this.getAvis();

      });
    });


    this.id = this.params.get('id');
    console.log(" id11 " + this.id);
  }



  sendAvis() {

    this.txtChat.setFocus();
    console.log("aviiis " + this.txtChat.content);

    this.userService.addAvis(this.txtChat.content, this.id, this.id2).subscribe(result => {
      console.log("done");
      this.getAvis();
      //console.log(this.avi);
      //this.avis = result;
    });
    //   let chatMessage = new ChatMessageModel(
    //   this.userId,
    // this.txtChat.content)

    //  this.firebaseService.addChatMessage(this.groupId, chatMessage);
    this.txtChat.clearInput();

  }

  getAvis() {
    console.log("id2  " + this.id2);
    this.userService.getAvis(this.id).subscribe(result => {
      console.log("result " + JSON.stringify(result));
      console.log("here " + result);
      this.avi = result;
      console.log(this.avi);
      //console.log(this.avi);
      //this.avis = result;
    });
  }
  getProfile(id) {

    this.navCtrl.push(ProfilePage, { data: id });
  }
  delete(id) {
    console.log(id)
    let alert = this.alertCtrl.create({
      title: 'vous êtes sur ?',
      message: 'Cette publication sera supprimée définitivement',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'supprimer',
          handler: () => {
            this.userService.supprimerAvis(id).subscribe(result => {
              console.log("deleted");
              this.getAvis();
              this.presentToast("Avis supprimée");
            });


          }
        }
      ]
    });
    alert.present();

  }

 presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }


}


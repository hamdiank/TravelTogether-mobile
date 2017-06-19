import { Component, ViewChild } from '@angular/core';
import { AlertController, Platform, NavController, ModalController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { AnnonceCovoiService } from "../../services/annonceCovoi.service";
import { AnnonceCovoi } from "../../models/annonceCovoi";
import { ProfilePage } from "../profile/profile";
import { Storage } from '@ionic/storage';
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { UserService } from "../../services/user.service";
import { CommentService } from "../../services/comment.service";
import { PaysService } from "../../services/pays.service";
import { Pays } from "../../models/Pays";
import { City } from "../../models/city";
import { ReservationService } from "../../services/reservation.service";
declare var google;

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  type: string = "vehicule";
  isAndroid: boolean = false;
  items: AnnonceCovoi[] = [];
  item: AnnonceCovoi[];
  compt = 1
  id: any;

  constructor(public reservationService: ReservationService, public loading: LoadingController, private toastCtrl: ToastController, private userService: UserService, public storage: Storage, public modalCtrl: ModalController, public navCtrl: NavController, platform: Platform, private alertCtrl: AlertController, private annonceCovoiService: AnnonceCovoiService) {

    this.loadAnnonce();
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {

    this.storage.ready().then(() => {
      this.storage.get("token").then((data) => {
        let jwtHelper: JwtHelper = new JwtHelper();
        this.id = jwtHelper.decodeToken(data).userId;

        console.log(this.id);
      });


    });
  }

  loadAnnonce() {
    this.items = [];
    this.annonceCovoiService.getAnnoncesCovoiByPage("0").subscribe(result => {
      result.content.forEach(element => {
        this.items.push(element);
      });


      console.log(result.content);
    })
  }
  ajoutCovoi() {

    let modal = this.modalCtrl.create(ModalAjoutCovoi, { id: this.id });
    modal.present();
  }
  searchCovoi() {

    let alert = this.alertCtrl.create({
      title: 'vous êtes sur ?',
      message: 'chercher une annonce covoiturage',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'chercher',
          handler: () => {


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
  delete(id) {
    console.log(id)
    let alert = this.alertCtrl.create({
      title: 'vous êtes sur ?',
      message: 'Cette annonce sera supprimée définitivement',
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
            this.annonceCovoiService.supprimerAnnonceCovoi(id).subscribe(result => {
              console.log("deleted");
              this.loadAnnonce();
              this.presentToast("annonce supprimée");
            });


          }
        }
      ]
    });
    alert.present();

  }

  getProfile(id) {

    this.navCtrl.push(ProfilePage, { data: id });
  }

  confirmDeleteAccount(): void {
    let alert = this.alertCtrl.create({
      title: 'Are You Sure?',
      message: 'This will irreversibly delete your account.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

  detail(id) {
    console.log(id);
    this.annonceCovoiService.getAnnonceCovoi(id).subscribe(result => {
      console.log(id);
      console.log("result " + result.dateDepart);
      result;
      let modal = this.modalCtrl.create(ModalContentPage, { annonce: result, id: this.id });
      modal.present();
    });

    //console.log("annonce "+this.annonce.dateDepart);


  }

  viewComments(id) {

    let modal = this.modalCtrl.create(ModalComment, { annonce: id, id: this.id });
    modal.present();

  }

  reserver(id) {

    console.log(id)
    let alert = this.alertCtrl.create({
      title: 'vous êtes sur ?',
      message: 'Voulez vous vraiment réserver ?  ',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.reservationService.reserver(id, this.id).subscribe(
              data => {
                if (data !== null) {
                  this.presentToast("Reservation avec success ");
                  console.log("jjjjj" + data)


                } else {
                  this.presentToast("Vous avez déjà réservé");

                }
              });


          }
        }
      ]
    });
    alert.present();

  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.compt++;
    console.log("next page:" + this.compt)
    setTimeout(() => {

      //  this.items.push( this.items.length );
      this.annonceCovoiService.getAnnoncesCovoiByPage(this.compt + "").subscribe(result => {
        console.log('result ' + JSON.stringify(result.content));
        if (result.content != "") {
          console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
          result.content.forEach(element => {
            this.items.push(element);
          });

        } else {
          this.compt--;
          console.log("compt   " + this.compt);
        }

        console.log(this.items);
      })


      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  /*
    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
      this.items = [];
      setTimeout(() => {
        console.log('Async operation has ended');
  
        this.annonceCovoiService.getAnnoncesCovoiByPage("0").subscribe(result => {
          result.content.forEach(element => {
            this.items.push(element);
          });
  
  
        })
  
        refresher.complete();
      }, 2000);
    }
  */


}

@Component({
  template: `
<ion-header>
  <ion-toolbar color="customGreen">
    <ion-title>
      {{annonce.villeDepart}} , {{annonce.paysDepart}} -> {{annonce.villeArrivee}} , {{annonce.paysArrivee}}
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Annuler</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content class="mapHome">
  <div  #map id="map"></div>
  <ion-list>
      <ion-item>
        <ion-avatar item-start>
  <img src="data:image/png;base64,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" (click)="getProfile(annonce.utilisateur.idUtilisateur)">

        </ion-avatar>
        <h2>{{annonce.utilisateur.prenom}} {{annonce.utilisateur.nom}}</h2>
        <p>{{annonce.utilisateur.numTelephone}}</p>
      </ion-item>
      
  
      
         <ion-item-group>
        <ion-item-divider color="light">Information</ion-item-divider>
        <ion-item>
        <ion-icon name="pin" color="secondary" item-left large></ion-icon>
          <span item-left color="primary">Depart</span>
          <span item-right>{{annonce.villeDepart}} , {{annonce.paysDepart}} </span>
        </ion-item>
        <ion-item>
         <ion-icon name="pin" color="danger" item-left large></ion-icon>
          <span item-left color="primary">Arrivée</span>
          <span item-right>{{annonce.villeArrivee}} , {{annonce.paysArrivee}}</span>
        </ion-item>
        
      </ion-item-group>
        <ion-item-group>
        <ion-item-divider color="light"></ion-item-divider>
        <ion-item>
         <ion-icon name="calendar" item-left large></ion-icon>
          <span item-left color="primary">Date de depart</span>
          <span item-right>{{annonce.dateDepart}} </span>
        </ion-item>
         <ion-item>
         <ion-icon name="clock" item-left large></ion-icon>
          <span item-left color="primary">heure de depart</span>
          <span item-right>{{annonce.heureDepart}} </span>
        </ion-item>
        
      </ion-item-group>
        <ion-item-group>
        <ion-item-divider color="light"></ion-item-divider>
        <ion-item>
         <ion-icon name="cash" item-left large></ion-icon>
          <span item-left color="primary">cotisation</span>
          <span item-right>{{annonce.cotisation}} </span>
        </ion-item>
         <ion-item>
         <ion-icon name="body" item-left large></ion-icon>
          <span item-left color="primary">nombre de place</span>
          <span item-right>{{annonce.nombrePlaces}} </span>
        </ion-item>
      </ion-item-group>
  </ion-list>

</ion-content>

`
})
export class ModalContentPage {

  id: any;
  annonce = new AnnonceCovoi();
  start: any = "rr";
  end: any = "rr";
  constructor(public navCtrl: NavController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController, public annonceCovoiService: AnnonceCovoiService, public modalCtrl: ModalController
  ) {



    this.annonce = this.params.get('annonce');
    this.start = this.annonce.villeDepart;
    console.log("dddddddd " + this.start);
    this.end = this.annonce.villeArrivee;
    this.id = this.params.get('id');
    console.log("id    " + this.id);

  }


  ionViewDidLoad() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });
    this.platform.ready().then(() => {
      directionsDisplay.setMap(map);
    });
    console.log('eeeee' + map);
    directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {

        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  getProfile(id) {

    this.navCtrl.push(ProfilePage, { data: id });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

@Component({
  template: `
<ion-header>
  <ion-toolbar color="customGreen">
    <ion-title>
      Reservation
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Annuler</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>


<p><strong>pas de reservation</strong></p>

<ion-content class="list-avatar-page">
<ion-list>
  <ion-item-sliding *ngFor="let res of reservations">
<ion-item color="#1ab394">
      <ion-avatar item-start>
     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmcnjEKIYp8_oIvSdDatu-A5XVjc_8ZCfBF5TdY8mJ11ZoaYjtag"
     (click)="getProfile()"> 
      </ion-avatar>
      <h2>{{res.utilisateurReservation.nom}}</h2>
      <p>{{res.utilisateurReservation.numTelephone}}</p>
<p><span style="color: red" *ngIf="res.etat==null">En Attente</span><span style="color: green"  *ngIf="res.etat==true">Accepté</span> <span style="color: green"  *ngIf="res.etat==false">Refusé</span></p> 
    </ion-item>
      <ion-item-options side="right" *ngIf="res.etat==null">
        <button ion-button color="customGreen2" (click)="accepterReservation(res.idReservation)">
      <ion-icon name="done-all"></ion-icon> 
      </button>
      <button ion-button color="danger" (click)="refuserReservation(res.idReservation)">
      <ion-icon name="trash"></ion-icon> 
      </button>
     
    </ion-item-options>
   
</ion-item-sliding>
    </ion-list>
 

</ion-content>




`



})

export class ModalReservation {
  id: any;
  idA: any;
  public reservations: any[];
  constructor(private toastCtrl: ToastController,public reservationService: ReservationService,public navCtrl: NavController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController, public annonceCovoiService: AnnonceCovoiService
  ) {




    this.id = this.params.get('id');
    this.idA = this.params.get('idA');
    console.log("id    " + this.id);
    console.log("idA    " + this.idA);
    this.getReservationsByAnnonceCovoi(this.idA);
  }


  getReservationsByAnnonceCovoi(idA) {
    this.reservationService.getReservationsByAnnonceCovoi(idA)
      .subscribe(
      reservations => {
        this.reservations = reservations, console.log(this.reservations)

      });
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
 getProfile(id) {

    this.navCtrl.push(ProfilePage, { data: id });
  }



accepterReservation(id){
    //let etat= true;
    console.log("idd   "+id);
    this.reservationService.accepterReservation(id, true)
    .subscribe(data => {
            console.log("dddddddddd")
            this.presentToast("Accepté");
            this.getReservationsByAnnonceCovoi(this.idA);
         //   this.accepted=true;
    });

}
refuserReservation(id){
   // let etat= false;
    this.reservationService.refuserReservation(id, false)
        .subscribe(data=>{
          this.presentToast("Refusé");
            console.log("refused");
            this.getReservationsByAnnonceCovoi(this.idA);
        });

}





  dismiss() {
    this.viewCtrl.dismiss();
  }


}

@Component({
  template: `
<ion-header>
  <ion-toolbar color="customGreen">
    <ion-title>
      Commentaires
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
  <ion-item-sliding *ngFor="let com of commentaires">
<ion-item color="#1ab394">
      <ion-avatar item-start>
     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmcnjEKIYp8_oIvSdDatu-A5XVjc_8ZCfBF5TdY8mJ11ZoaYjtag"
     (click)="getProfile()"> 
      </ion-avatar>
      <h2>{{com.author.nom}}</h2>
      <p>{{com.text}}</p>
      <ion-note item-end>{{com.date | date :'short'}}  </ion-note>
    </ion-item>
      <ion-item-options side="right" *ngIf="com.author.idUtilisateur == id">
   
      <button ion-button color="danger" (click)="delete(com.id)">
      <ion-icon name="trash"></ion-icon> 
      </button>
     
    </ion-item-options>
   
</ion-item-sliding>
    </ion-list>
 

</ion-content>
<ion-footer class="chatPageFooter">

  <ion-toolbar>
    <ion-item>
      <ion-label style="margin:0px;"></ion-label>
      <div item-content style="width:100%;">
        <elastic-textarea #txtChat placeholder="Ajouter votre Commentaire" lineHeight="22"></elastic-textarea>
      </div>
    </ion-item>
    <ion-buttons right>
      <button ion-button icon-only style="min-width:45px;" (click)="addComment()">
        <ion-icon name="send"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-footer>
`
})

export class ModalComment {

  @ViewChild('txtChat') txtChat: any;
  @ViewChild('content') content: any;
  id: any;
  idAnnonce: any;
  commentaires: Comment[];
  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController, public annonceCovoiService: AnnonceCovoiService, public commentService: CommentService
  ) {

    this.idAnnonce = this.params.get('annonce');
    this.id = this.params.get('id');
    console.log("id    " + this.id + " " + this.idAnnonce);
    this.loadComments();

  }
  loadComments() {
    console.log(this.idAnnonce);
    this.commentService.getComments(this.idAnnonce).subscribe(result => {
      this.commentaires = result;
      console.log("result comments  " + result);
      console.log("this.commentaire  " + JSON.stringify(this.commentaires));
    });
  }
  addComment() {
    this.txtChat.setFocus();
    console.log("aviiis " + this.txtChat.content);

    this.commentService.addComment(this.txtChat.content, this.id, this.idAnnonce).subscribe(result => {
      console.log("done");
      this.loadComments();
    });

    this.txtChat.clearInput();

  }
  delete(id) {

    let alert = this.alertCtrl.create({
      title: 'vous êtes sur ?',
      message: '',
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
            this.commentService.supprimer(id).subscribe(result => {
              console.log("supp done");
              this.loadComments();
              this.presentToast("commentaire supprimée");
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


@Component({
  template: `
<ion-header>
  <ion-toolbar color="customGreen">
    <ion-title>
      Ajout Annonce Covoiturage
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Annuler</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>

 <form name="form" (ngSubmit)="ajouter()" #f="ngForm">
<ion-item-group>
        <ion-item-divider color="light"><ion-icon name="pin" color="secondary" item-left large></ion-icon>
          <span item-left ><strong>Depart</strong></span></ion-item-divider>
        <ion-item>
         <ion-label>
          <span item-left color="primary">Pays</span>
         </ion-label>
    <ion-select [(ngModel)]="model.paysDepart"  (ionChange)="onSelect1($event)"  name="paysDepart" >
  <ion-option *ngFor="let pay of pays" value= {{pay.idPays}}>{{pay.nom}}</ion-option>
    </ion-select>
        </ion-item>
     <ion-item>
         <ion-label>
         
          <span item-left color="primary">Ville</span>
         </ion-label>
    <ion-select [(ngModel)]="model.villeDepart" name="villeDepart"   (ionChange)="onInput($event)">
      <option value="0">Select Ville Depart</option>
       <ion-option *ngFor="let city of cities " value= {{city.nom}}>{{city.nom}}</ion-option>
    </ion-select>
        </ion-item>
      </ion-item-group>


    <ion-item-group>
        <ion-item-divider color="light"><ion-icon name="pin" color="danger" item-left large></ion-icon>
          <span item-left ><strong>Arrivée</strong></span></ion-item-divider>
        <ion-item>
         <ion-label>
          <span item-left color="primary">Pays</span>
         </ion-label>
    <ion-select [(ngModel)]="model.paysArrivee" (ionChange)="onSelect2($event)" name="paysArrivee"  >
     <ion-option *ngFor="let pay of pays" value= {{pay.idPays}}>{{pay.nom}}</ion-option>
    </ion-select>
        </ion-item>
     <ion-item>
         <ion-label>
         
          <span item-left color="primary">Ville</span>
         </ion-label>
    <ion-select [(ngModel)]="model.villeArrivee" name="villeArrivee"  (ionChange)="onInput2($event)">
     <ion-option *ngFor="let city of cities2 " value= {{city.nom}}>{{city.nom}}</ion-option>
    </ion-select>
        </ion-item>
      </ion-item-group> 

      <ion-item-group>
        <ion-item-divider color="light"><ion-icon name="calendar" item-left large></ion-icon>
          <span item-left ><strong>Date</strong></span></ion-item-divider>

      <ion-item>%
         <ion-label>
          <span item-left color="primary">Date</span>
         </ion-label>
            <ion-datetime displayFormat="MMM DD YYYY" [(ngModel)]="model.dateDepart" name="dateDepart"  required></ion-datetime>     
       </ion-item>
    </ion-item-group>

      <ion-item-group>
        <ion-item-divider color="light"><ion-icon name="time" item-left large></ion-icon>
          <span item-left ><strong>Heure</strong></span></ion-item-divider>

        <ion-item>
         <ion-label>
          <span item-left color="primary">Heure</span>
         </ion-label>
            <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="model.heureDepart" name="heureDepart"  ></ion-datetime>    
       </ion-item>
        </ion-item-group>


         <ion-item-group>
        <ion-item-divider color="light"><ion-icon name="cash" item-left large></ion-icon>
          <span item-left ><strong>Cotisation</strong></span></ion-item-divider>

      <ion-item>
         <ion-label>
          <span item-left color="primary">Cotisation</span>
         </ion-label>
           <ion-select [(ngModel)]="model.cotisation"  name="cotisation"  required >
      <ion-option value="1">1</ion-option>
      <ion-option value="2">2</ion-option>
      <ion-option value="3">3</ion-option>
      <ion-option value="4">4</ion-option>
     
    </ion-select>    
    <ion-select [(ngModel)]="currency"  name="currency"  >
      <ion-option value="$">$</ion-option>
      <ion-option value="DT">DT</ion-option>
      <ion-option value="£">£</ion-option>
     
    </ion-select>   
       </ion-item>

</ion-item-group>

 <ion-item-group>
        <ion-item-divider color="light"><ion-icon name="people" item-left large></ion-icon>
          <span item-left ><strong>Nb places</strong></span></ion-item-divider>

        <ion-item>
         <ion-label>
          <span item-left color="primary">Places</span>
         </ion-label>
           <ion-select [(ngModel)]="model.nombrePlaces"  name="nombrePlaces"  required >
      <ion-option value="1">1</ion-option>
      <ion-option value="2">2</ion-option>
      <ion-option value="3">3</ion-option>
      <ion-option value="4">4</ion-option>
      <ion-option value="5">5</ion-option>
      <ion-option value="6">6</ion-option>
      <ion-option value="7">7</ion-option>
       <ion-option value="8">8</ion-option>
    </ion-select>   
        
       </ion-item>
        </ion-item-group>
    <ion-item-divider color="light"></ion-item-divider>
    <br>
        <button ion-button round color="customGreen" class="center">Ajouter</button>
        <br>
        </form>
  </ion-content>

`



})

export class ModalAjoutCovoi {
  paysDepart: Pays;
  paysArrivee: Pays;

  selectedPays: any = {}
  pays: Pays[];
  cities: City[];
  cities2: City[];
  onePays: Pays;
  onePays2: Pays;

  model: any = {
    heureDepart: '07:43',
    dateDepart: '1990-02-19'
  };

  id: string;



  val1: number;

  val2: number;

  val3: number;

  val4: number = 100;
  public event = {
    month: '1990-02-19',
    time: '07:43',

  };
  constructor(public paysService: PaysService,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController, public annonceCovoiService: AnnonceCovoiService, public loading: LoadingController
  ) {

    this.id = this.params.get("id");
  }
  ionViewWillEnter() {
    let loader = this.loading.create({
      content: 'chargement ...',
    });
    loader.present().then(() => {
      console.log("jjje ");
      this.paysService.getAll().subscribe(pays => {
        console.log("heeeeeeeeeeeee" + pays);
        this.pays = pays;
        loader.dismiss();
      });


    });
  }


  onSelect1(idPays1) {

    console.log('idPaysDepart' + idPays1)
    console.log('idPaysDepartModel' + this.model.paysDepart);
    console.log('idVilleDepart' + this.model.villeDepart);
    if (idPays1 != undefined) {
      this.paysService.getById(idPays1).subscribe(onePays => {
        this.onePays = onePays, this.cities = this.onePays.cities, this.paysDepart = onePays.nom
        console.log("fff " + JSON.stringify(this.cities));
      });
    }
    else console.log("undefined id")
  }


  onSelect2(idPays2) {
    console.log('idPaysArrivee' + idPays2)
    console.log('idPaysArriveeModel' + this.model.paysDepart);
    console.log('idVilleArrivee' + this.model.villeArrivee);
    if (idPays2 != undefined) {
      this.paysService.getById(idPays2).subscribe(onePays2 => {
        console.log(onePays2.cities);
        this.onePays2 = onePays2, this.cities2 = this.onePays2.cities, this.paysArrivee = onePays2.nom
      });
      console.log(JSON.stringify(this.cities));
    }
    else console.log("undefined id");
  }

  onInput(selected) {

    console.log('selected: ' + selected);
  }
  onInput2(selected) {

    console.log('selected: ' + selected);
  }










  ajouter() {

    this.model.paysDepart = this.paysDepart;
    this.model.paysArrivee = this.paysArrivee;
    console.log(this.model.paysDepart);
    console.log(this.model.villeDepart);
    console.log(this.model.paysArrivee);
    console.log(this.model.villeArrivee);
    console.log(this.model.heureDepart);
    console.log(this.model.dateDepart);
    console.log(this.model.nombrePlaces);
    console.log(this.model.cotisation);

    let loader = this.loading.create({
      content: 'chargement ...',
    });
    loader.present().then(() => {

      this.annonceCovoiService.ajouterAnnonceCovoi(this.model.heureDepart, this.model.dateDepart, this.model.paysDepart,
        this.model.villeDepart, this.model.paysArrivee, this.model.villeArrivee, this.model.nombrePlaces,
        this.model.cotisation, this.id)
        .subscribe(
        data => {
          this.dismiss();
          loader.dismiss();
        });


    });




  }
  dismiss() {
    this.viewCtrl.dismiss();
  }


}
import { Component } from '@angular/core';

import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AnnonceCovoiService } from "../../services/annonceCovoi.service";
import { ModalContentPage, ModalReservation } from "../page1/page1";
import { Storage } from '@ionic/storage';
import { JwtHelper } from "angular2-jwt/angular2-jwt";
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  annonce: any[] = [];
  id: any
  constructor(public storage: Storage, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private annonceCovoiService: AnnonceCovoiService) {

    this.loadAnnounce();
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['car', 'car', 'car', 'car', 'car', 'plane',
      'plane', 'car', 'plane', 'plane'];

    this.items = [];
    for (let i = 1; i < 5; i++) {
      this.items.push({
        title: 'Tunis,tunisie  =>  kairouan,tunise ',
        note: '2017/5/1',
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  details(id) {
    console.log(id);
    this.annonceCovoiService.getAnnonceCovoi(id).subscribe(result => {
      console.log(id);
      console.log("result " + result.dateDepart);
      result;
      let modal = this.modalCtrl.create(ModalContentPage, { annonce: result });
      modal.present();
    });
  }

  loadAnnounce() {
   this.id = "";
    this.storage.ready().then(() => {
      this.storage.get("token").then((data) => {
        let jwtHelper: JwtHelper = new JwtHelper();
        this.id = jwtHelper.decodeToken(data).userId;

        console.log(this.id);
        this.annonceCovoiService.getAnnonceCovoiByIdAuthor(this.id).subscribe(result => {
          console.log(this.annonce);
          result.forEach(element => {
            this.annonce.push(element);
          });

          console.log(this.annonce);

        });
      });


    });
  }

  reservation(id) {
    let modal = this.modalCtrl.create(ModalReservation, { idA: id, id: this.id });
    modal.present();
  }

}

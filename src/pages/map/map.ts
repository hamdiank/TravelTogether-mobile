
import { Component, Input } from '@angular/core';
import { NavController, Platform } from "ionic-angular";
declare var google;
@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapComponent {

  @Input() start;
  @Input() end;
  constructor(public platform: Platform, public navCtrl: NavController) {
    console.log("start  " + this.start);
    this.calculateAndDisplayRoute();
  }



  calculateAndDisplayRoute() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });
    this.platform.ready().then(() => {
      directionsDisplay.setMap(map);
    });
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
}
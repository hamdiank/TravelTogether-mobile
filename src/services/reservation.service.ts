import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { URLSearchParams } from "@angular/http";
import { Storage } from '@ionic/storage';
@Injectable()

export class ReservationService{

    // etat: boolean= null;
    constructor(private http: Http, private storage: Storage){}


reserver(idAnnonceCovoi: string, idUtilisateurReservation: string){
 var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });

       let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('idAnnonceCovoi', idAnnonceCovoi);
        urlSearchParams.append('idUtilisateurReservation', idUtilisateurReservation);
         let body = urlSearchParams.toString();
          return this.http.put("http://localhost:8080"+'/reservation?'+body, body, a)
                        .map((res: Response) => res.json());
    }

getReservationsByAnnonceCovoi(idAnnonceCovoi){
     var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
       
        let urlSearchParams = new URLSearchParams();
         urlSearchParams.append('idAnnonceCovoi', idAnnonceCovoi);
        let body= urlSearchParams.toString();
        console.log(body)
    return this.http.get("http://localhost:8080"+'/getReservationsByAnnonceCovoi?'+body, a)
     .map((res: Response) => res.json());


    }


 ///////////////////////////////////

    getReservationsByUtilisateurReservation(idUtilisateur){
         var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
       
        console.log('reservation service')
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('idUtilisateur', idUtilisateur);  
        let body= urlSearchParams.toString();
        console.log(body)
     return this.http.get("http://localhost:8080"+'/getReservationsByUtilisateurReservation?'+body, a)
        .map((res: Response) => res.json());


    }

annulerReservation(idReservation){
   var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
          return this.http.delete("http://localhost:8080"+ '/annulerReservation/'+ idReservation, a);
    }
accepterReservation(idReservation, etat){
       var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        console.log(' accepter reservation ')
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('idReservation', idReservation); 
        urlSearchParams.append('etat', etat); 
        let requestParams= urlSearchParams.toString();
        console.log(requestParams)
     return this.http.put("http://localhost:8080"+'/accepterReservation?'+requestParams, a)
        .map((res: Response) => res.json());

}

refuserReservation(idReservation, etat){
     var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        console.log(' accepter reservation ')
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('idReservation', idReservation); 
        urlSearchParams.append('etat', etat); 
        let requestParams= urlSearchParams.toString();
        console.log(requestParams)
     return this.http.put("http://localhost:8080"+'/refuserReservation?'+requestParams, a)
        .map((res: Response) => res.json());

}

}
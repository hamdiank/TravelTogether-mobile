
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { Storage } from '@ionic/storage';
import { URLSearchParams } from "@angular/http";


@Injectable()
export class AnnonceCovoiService {


    constructor(private http: Http, private storage: Storage) { }



    getAnnoncesCovoi() {
        var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        return this.http.get("http://localhost:8080" + '/annonces', a)
            .map((response: Response) => response.json());
    }
    supprimerAnnonceCovoi(id: string) {
        var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        return this.http.delete("http://localhost:8080" + '/deleteAnnonceCovoi/' + id, a)
            .map((response: Response) => response);
    }
    getAllAnnonce() {
        let a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });
                }
            });
        });
        return this.http.get("http://localhost:8080" + '/annonces', a).map((response: Response) => response.json());
    }


    getAnnoncesCovoiByPage(k: string) {

        var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        return this.http.get("http://localhost:8080" + '/annoncesByPage/' + k, a)
            .map((response: Response) => response.json());
    }


    getAnnonceCovoi(id: number) {
        let idAnnonceCovoi = id.toString();
        var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        return this.http.get("http://localhost:8080" + '/getAnnonceCovoiById/' + idAnnonceCovoi, a).map((res: Response) => res.json());
    }
    getAnnonceCovoiByIdAuthor(id) {


        var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        return this.http.get("http://localhost:8080" + '/maListeAnnonceCovoi/' + id, a).map((res: Response) => res.json());

    }
ajouterAnnonceCovoi(heureDepart: string,dateDepart: string, paysDepart: string, villeDepart: string,
 paysArrivee: string, villeArrivee: string,nombrePlaces:string, cotisation: string, id: string ){
     console.log("here here here id"+id);
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
    urlSearchParams.append('heureDepart', heureDepart);
     urlSearchParams.append('dateDepart', dateDepart);
     console.log(dateDepart)
     urlSearchParams.append('paysDepart', paysDepart);
     urlSearchParams.append('villeDepart', villeDepart);
     urlSearchParams.append('paysArrivee', paysArrivee);
     urlSearchParams.append('villeArrivee', villeArrivee);
     urlSearchParams.append('nombrePlaces', nombrePlaces);
     urlSearchParams.append('cotisation', cotisation);
     urlSearchParams.append('id', id);
     
        let body = urlSearchParams.toString();
    //let body={"datePublication": datePublication, "dateDepart": dateDepart , "adresseDepart": adresseDepart , "adresseArrivee": adresseArrivee , "nombrePlaces": nombrePlaces , "cotisation": cotisation, "id": id };
    console.log(body)
 return this.http.post("http://localhost:8080" +'/ajoutAnnonceCovoi?'+body, body,a)
                        .map((res: Response) => res.json());

}
}
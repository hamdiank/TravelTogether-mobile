import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Message } from "../models/message";
@Injectable()
export class UserService {

    avis: any;
    constructor(private http: Http, private storage: Storage) {

    }


    getById(_id: string) {
        let a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });
                }
            });
        });
        return this.http.get("http://localhost:8080" + '/utilisateur/' + _id, a).map((response: Response) => response.json());
    }
    getImage(t: string) {
        let a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + JSON.parse(data) });
                    a = new RequestOptions({ headers: headers });
                }
            });
        });
        return this.http.get("http://localhost:8080" + '/getImage/' + t, a).map(this.extractUrl);
    }
    getImageVoiture(t: string) {
        let a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    //  console.log(localStorage.getItem('currentToken'));

                    let headers = new Headers({ 'Authorization': 'Bearer ' + JSON.parse(data) });
                    a = new RequestOptions({ headers: headers });
                }
            });
        });
        return this.http.get("http://localhost:8080" + '/getImageVoiture/' + t, a).map(this.extractUrl);
    }

    extractUrl(res: Response): string {
        console.log("errrrrrrrr  " + res.url);
        return res.url;
    }

    addUser(form: any) {

           let a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    //  console.log(localStorage.getItem('currentToken'));

                    let headers = new Headers({ 'Authorization': 'Bearer ' + JSON.parse(data) });
                    a = new RequestOptions({ headers: headers });
                }
            });
        });

        return this.http.post("http://localhost:8080" + '/inscriptionUtilisateur', form, a)
            .map((response: Response) => response.json());
    }

resetMp(mail:string ){
          let a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    //  console.log(localStorage.getItem('currentToken'));

                    let headers = new Headers({ 'Authorization': 'Bearer ' + JSON.parse(data) });
                    a = new RequestOptions({ headers: headers });
                }
            });
        });
      return this.http.post("http://localhost:8080" + '/mail/send/'+mail+".", a).map((response: Response) => response.json());

}



    getAvis(_id: string) {
        let a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });
                }
            });
        });
        return this.http.get("http://localhost:8080" + '/avis/avis/' + _id, a).map((response: Response) => response.json());
    }

    addAvis(a: string, idDest: string, id: string) {
        console.log("here avis");
        let b: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    b = new RequestOptions({ headers: headers });
                }
            });
        });

        let body = {
            'text': a,
            'idDest': idDest,
            'id': id,
            'date':Date.now()+""
        }
        console.log(a);
        console.log(idDest);
        console.log(id);
        return this.http.post("http://localhost:8080" + '/avis/add', body, b);

        //this.avis.id=a;
        //console.log(this.avis);
        //  console.log(texte + "  " + idP + " " + idDest);

        /*  
           this.avis.author = new User(idP);
           this.avis.text = texte;
           this.avis.idDest = idDest;
           console.log(this.avis);
         //  let body = { "text": texte, "idDest": idDest, "author": author };
          // console.log(author + "  " + idDest);
           //  return this.http.post(this.config.apiUrl + '/avis/avis/add', body, this.jwt());
   */
    }

    supprimerAvis(_id: string) {
        let a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });
                }
            });
        });
        return this.http.delete("http://localhost:8080" + '/avis/dell/' + _id, a).map((response: Response) => response.json());
    }


    //this.avis.id=a;
    //console.log(this.avis);
    //  console.log(texte + "  " + idP + " " + idDest);

    /*  
       this.avis.author = new User(idP);
       this.avis.text = texte;
       this.avis.idDest = idDest;
       console.log(this.avis);
     //  let body = { "text": texte, "idDest": idDest, "author": author };
      // console.log(author + "  " + idDest);
       //  return this.http.post(this.config.apiUrl + '/avis/avis/add', body, this.jwt());
*/


    getAll() {
        let a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });
                }
            });
        });
        console.log('enter 65');
        return this.http.get("http://localhost:8080" + '/message/all',
            a)
            .map((response: Response) => response.json());
    }

    sendMessage(m: Message) {
        console.log("here");
        let a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });
                }
            });
        });
        console.log("here");
        return this.http.post("http://localhost:8080" + '/message/add', m, a)
            .map((response: Response) => response.json());


    }


}
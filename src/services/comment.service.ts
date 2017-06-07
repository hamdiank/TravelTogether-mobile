
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { Storage } from '@ionic/storage';



@Injectable()
export class CommentService {


    constructor(private http: Http, private storage: Storage) { }



    getComments(id) {
        console.log("idAnnonce    "+id);
        var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        return this.http.get("http://localhost:8080" + '/commentaire/commentaire/'+id, a)
            .map((response: Response) => response.json());
    }
    supprimer(id: string) {
        var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        return this.http.delete("http://localhost:8080" + '/commentaire/dell/' + id, a)
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



    
     addComment(a: string, id: string, idAnnonce: string) {
         console.log("idAnnonce    "+idAnnonce);
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
            'id': id,
            'date':Date.now()+""
        }
        console.log(a);
        console.log(id);
        console.log(idAnnonce);
        return this.http.post("http://localhost:8080" + '/commentaire/add/'+idAnnonce, body, b);
    }



}
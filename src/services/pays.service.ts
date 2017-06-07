import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { Pays } from "../models/Pays";
import { Storage } from '@ionic/storage';



@Injectable()
export class PaysService {

    constructor(private http: Http, private storage: Storage) { }


    getAll() {
      var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        return this.http.get("http://localhost:8080" + '/admin/pays/all', a).map((response: Response) => response.json());
    }

    delete(_id: string) {
         var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        return this.http.delete("http://localhost:8080"+ '/admin/pays/delPays/' + _id,a);
    }


    update(pays: Pays, v, a, s) {
 var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        return this.http.put("this.config.apiUrl" + '/admin/pays/updatePays/' + pays.idPays + '/' + v + '/' + a + '/' + s, a);

    }
  
 

    getById(id: string) {
        console.log("i am here getById");
         var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        return this.http.get("http://localhost:8080" + '/admin/pays/pays/' + id, a).map((response: Response) => response.json());

    }

    getByCity(nom: string) {
         var a: any
        this.storage.ready().then(() => {
            this.storage.get("token").then((data) => {
                if (data !== null) {
                    let headers = new Headers({ 'Authorization': 'Bearer ' + data });
                    a = new RequestOptions({ headers: headers });

                }
            });
        });
        return this.http.get("http://localhost:8080" + '/admin/pays/paysByCity/' + nom, a).map((response: Response) => response.json());

    }


}
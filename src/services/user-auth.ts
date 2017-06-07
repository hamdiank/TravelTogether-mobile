import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Storage} from '@ionic/storage';
import { Auth, UserDetails, IDetailedError } from "@ionic/cloud-angular";
import "rxjs/add/operator/map";

@Injectable()
export class UserAuth {

  constructor(public http: Http,public storage: Storage,public auth: Auth) {
  }

  signin(form: any): any {
    
    let body = {'login': form.email, 'motDePasse': form.password};
    return this.http.post('http://localhost:8080/login',body) .map((response : Response )=>{
       let x = JSON.parse(JSON.stringify(response));
               let token = x._body ;
                    // set token property
                   
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                  this.storage.set('token', token);
                    // return true to indicate successful login
                  // console.log(token);
      return {error: null};
    }, (error) => {
      console.log("error "+error);
      return {error: error};
    });
  }

  signup(form: any): any {
    let details: UserDetails = form;
    return this.auth.signup(details).then(() => {
      return {error: null};
    }, (err: IDetailedError<string[]>) => {
      return {error: err};
    });
  }

  requestPasswordReset(email: string): any {
    return this.auth.requestPasswordReset(email).then(() => {
      return {error: null};
    }, (err) => {
      return {error: err};
    });
  }

  confirmPasswordReset(form: any): any {
    return this.auth.confirmPasswordReset(form.resetCode, form.password).then(() => {
      return {error: null};
    }, (err) => {
      return {error: err, message: 'The reset code has either been entered incorrectly or it has expired.'};
    });
  }

}

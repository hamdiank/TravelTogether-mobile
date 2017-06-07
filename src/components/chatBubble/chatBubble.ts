import { Component } from '@angular/core';
import { Message } from "../../models/message";
import { Storage } from '@ionic/storage';
import { JwtHelper } from "angular2-jwt/angular2-jwt";
@Component({
  selector: 'chat-bubble',
  inputs: ['msg: message'],
  template:
  `
  <div class="chatBubble">
   <img class="profile-pic {{id == msg.author.idUtilisateur ? 'right' : 'left'}}" src="{{msg.image}}">
    <div class="chat-bubble {{id == msg.author.idUtilisateur ? 'right' : 'left'}}">
      <div class="message">{{msg.text}}</div>
      <div class="message-detail">
          <span style="font-weight:bold;">{{msg.author.nom}} </span>,
         <span>{{msg.sentAt | date :'short'}}</span>
      </div>
    </div>
  </div>
  `
})
export class ChatBubble {
  public msg:Message;
id:any;
  constructor(private storage: Storage, ) {this.storage.ready().then(() => {
      this.storage.get("token").then((data) => {
      
        let jwtHelper: JwtHelper = new JwtHelper();
         this.id = jwtHelper.decodeToken(data).userId;
        console.log("id  " + this.id);

      });
  });
   console.log('heere in buble message');
  }
}

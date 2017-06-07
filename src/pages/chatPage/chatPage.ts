import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../services/user.service";
import { Message } from "../../models/message";
import { User } from "../../models/user";
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { Storage } from '@ionic/storage';
//import {ChatMessageModel} from '../../models/chatMessageModel';

//import {UserInfoService} from '../../services/userInfo.service';
//import {FirebaseService} from '../../services/firebase.service';

declare var firebase: any;

@Component({
  selector: 'page-chat',
  templateUrl: 'chatPage.html'
})
export class ChatPage {
  @ViewChild('txtChat') txtChat: any;
  @ViewChild('content') content: any;
  public messages: any[];

  public userId: string;
  public userName: string;
  public userPicture: string;
  public groupId: string;
  message = new Message();
  user = new User();
  author = new User();

  constructor(private storage: Storage, private userService: UserService, public nav: NavController,
    public navParams: NavParams
    //   public userInfoService: UserInfoService,
    //  public firebaseService: FirebaseService,
    ) {
    this.getMessage();
    console.log(this.navParams.get('user'));
    this.user = this.navParams.get('user');
    console.log("contact " + this.user);
    this.messages = [];
    this.storage.ready().then(() => {
      this.storage.get("token").then((data) => {
      
        let jwtHelper: JwtHelper = new JwtHelper();
        let id = jwtHelper.decodeToken(data).userId;
        console.log("id  " + id);
        this.userService.getById(id).subscribe(result => {
          this.author = result;
          console.log(this.author);
        });

      });
    });

    //  this.userId = this.userInfoService.getUserInfo(UserInfoService.PREF_USER_AUTH_ID);
    // this.userName = this.userInfoService.getUserInfo(UserInfoService.PREF_USER_NAME);
    // this.userPicture = this.userInfoService.getUserInfo(UserInfoService.PREF_USER_PICTURE_URL);
    // this._setFirebaseListeners(this.userId);
  }

  public getMessage() {
    this.userService.getAll().subscribe(result => {
      console.log("messages received");
      console.log(result);
         this.messages=result;
    });
  }

  public sendMessage() {
    this.message=new Message();
    this.txtChat.setFocus();
    console.log(this.txtChat.content);
    this.message.text = this.txtChat.content;
    console.log(this.message.text);
    this.message.idDestinataire = this.user.idUtilisateur;
    this.message.author = this.author;
    this.message.sentAt= Date.now()+"";
   console.log(JSON.stringify(this.message));
   this.messages.push(this.message);
     this.userService.sendMessage(this.message).subscribe(result => {
     //  this.getMessage();
      console.log("message sent");
       console.log(result);
      });
    //   let chatMessage = new ChatMessageModel(
    //   this.userId,
    // this.txtChat.content)

    //  this.firebaseService.addChatMessage(this.groupId, chatMessage);
    this.txtChat.clearInput();
  }
  /*
    private _setFirebaseListeners(userId : String){
      let thisRef = this;
      firebase.database().ref('/chat/users/' + userId).once('value', function(snapshot){
  
        if(snapshot.hasChild(thisRef.contact.id) === true){
          console.log('an existing chat room found with this user');
          thisRef.groupId = snapshot.child(thisRef.contact.id).val();
        }else{
          console.log('no existing chat rooms found with this user');
          thisRef.groupId = thisRef.firebaseService.createChatGroup(
            thisRef.userId,
            thisRef.contact.id);
        }
  
        firebase.database().ref('/chat/messages/' + thisRef.groupId)
          .orderByChild('timestamp')
          .limitToLast(500)
          .on('child_added', function(childSnapshot, prevChildKey) {
            let newMessage =
              ChatMessageModel.fromFirebaseObject(childSnapshot.val());
  
            newMessage.isMe = thisRef.userId === newMessage.senderId;
            if(newMessage.isMe){
              newMessage.image = thisRef.userPicture;
            }else{
              newMessage.image = thisRef.contact.profileImage;
            }
  
            thisRef.messages.push(newMessage);
  
            //this will update the UI
            thisRef._zone.run(() => {
              thisRef.messages = thisRef.messages;
  
              //without this timeout the list scrolls
              //to the second to last element.
              //It's some kind of race condition
              setTimeout(() => {
                thisRef.content.scrollToBottom(300);//300ms animation speed
              });
            });
          });
      });
    }
  */
}

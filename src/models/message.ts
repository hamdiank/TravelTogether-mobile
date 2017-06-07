import { User } from "./user";

export class Message {
   id: string;
   sentAt: string;
   isRead: boolean;
   author: User;
   text: string;
   idDestinataire:string;

   constructor(obj?: any) {
     
     this.isRead          = obj && obj.isRead          || false;
     this.sentAt          = obj && obj.sentAt          || new Date();
     this.author          = obj && obj.author          || null;
     this.text            = obj && obj.text            || null;
     this.idDestinataire  = obj && obj.idDestinataire  || null;
   }
 }
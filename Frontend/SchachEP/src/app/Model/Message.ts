import {Chat} from "./Clubchat";
import {GroupChat} from "./GroupChat";
export class Message {
  messageId: number | undefined;
  message: string | undefined;
  time: Date| undefined;
  read: boolean | undefined;
  senderId: number | undefined;
  constructor() {
    this.messageId=undefined;
    this.message=undefined;
    this.time=undefined;
    this.read=undefined;
    this.senderId=undefined;
  }
}

import {User} from './User'
import {Message} from "./Message";


export class Chat {
  chatId: number|undefined;
  sender: User|undefined;
  receiver: User|undefined;
  message: Message[]|undefined;

  constructor() {
    this.chatId=undefined;
    this.sender=undefined;
    this.receiver=undefined;
    this.message=undefined;
  }
}

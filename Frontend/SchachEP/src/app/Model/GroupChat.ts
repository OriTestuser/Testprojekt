import {User} from './User'
import {Message} from "./Message";


export class GroupChat{
  groupChatId: number|undefined;
  sender: User|undefined;
  messages: Message[]|undefined;
  groupName :string|undefined;
  groupMembers:User[]|undefined;

  constructor() {
    this.groupChatId=undefined;
    this.sender=undefined;
    this.messages=undefined;
    this.groupName=undefined;
    this.groupMembers=undefined;

  }
}

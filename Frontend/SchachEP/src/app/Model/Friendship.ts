import {User} from './User'

export class  Friendship {
  user1 : User | undefined;
  user2 : User | undefined;
  accepted : boolean | undefined;

  constructor(){
    this.user1 = undefined;
    this.user2 = undefined;
    this.accepted = undefined;
  }
}

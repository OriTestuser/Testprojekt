import { ChessClubMembership} from "./ChessClubMembership";


export class User {
  id:number|undefined;
  firstName:string|undefined;
  lastName:string|undefined;
  email:string|undefined;
  password:string|undefined;
  birthDate:Date|undefined;
  points:number|undefined;
  profileImage: number[]|undefined;
  numberOfSolvedChessPuzzles:number|undefined;


  privacy: boolean|undefined;
  token:string|undefined;
  superToken:string|undefined;

  constructor() {
    this.id = undefined;
    this.firstName = undefined;
    this.lastName = undefined;
    this.email = undefined;
    this.password = undefined;
    this.birthDate = undefined;
    this.points = undefined;
    this.profileImage = undefined;
    this.privacy = undefined;
    this.token = undefined;
    this.superToken = undefined;
    this.numberOfSolvedChessPuzzles = undefined;
  }

  clearProfile(){
    this.id = undefined;
    this.firstName = undefined;
    this.lastName = undefined;
    this.email = undefined;
    this.password = undefined;
    this.birthDate = undefined;
    this.points = undefined;
    this.profileImage = undefined;
    this.privacy = undefined;
    this.token = undefined;
    this.superToken = undefined;
    this.numberOfSolvedChessPuzzles = undefined;
  }

  // getId(){
  //   if (this.id!=undefined)
  //     return this.id;
  //   else{
  //     console.log('Error while looking up user: User does not exist!');
  //     alert('Fehler beim Suchen des Benutzers: Benutzer existiert nicht!');
  //     return -1;
  //   }
  // }
}

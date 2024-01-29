import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../Model/User";
import {Friendship} from '../Model/Friendship'
import {UserServiceService} from "../Service/user-service.service";
import {FriendsServiceService} from "../Service/friends-service.service";
import {ChessgameServiceService} from "../Service/chessgame-service.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";
import {ChessClub} from "../Model/ChessClub";
// @ts-ignore
import { saveAs } from 'file-saver';
import { ReplayServiceService} from "../Service/replay-service.service";
import {ChessGame} from "../Model/ChessGame";
import {ChessBot} from "../Model/ChessBot";
import {ImportPGNService} from "../Service/import-pgn.service";
import {PGNDTO} from "../Model/PGNDTO";

@Component({
  selector: 'app-profil-main',
  templateUrl: './profil-main.component.html',
  styleUrls: ['./profil-main.component.css']
})
export class ProfilMainComponent {
  localDateTime: Date;
  userProfile = this.userService.UserData;
  currentUserProfile = this.userService.CurrentUserData;
  isFriend: boolean = false;
  friendList: User[] = [];
  haveSendRequest: boolean = false;
  userImage: SafeUrl | undefined;
  defaultImageUrl: string = 'assets/defaultImage.jpg';
  base64Data: String = '';
  title = this.currentUserProfile.numberOfSolvedChessPuzzles as number;
  lastChessGame: ChessGame[] | undefined;
  lastBotGame: ChessBot[] | undefined;
  clubs: ChessClub[] | undefined;
  lastChessGames: any[] | undefined;
  lastGamesPgn: string[] = [];
  lastBotGamesPgn: string[] = [];

  lastGamePgn: string | undefined;
  lastBotGamePgn: string | undefined;
  lastGamesWithChessGame:{ChessGame:ChessGame,pgn:string}[]=[];
  lastBotGamesPgnWithChessGame:{ChessBot:ChessBot,pgn:string}[]=[];

  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService: FriendsServiceService,
              private chessGameService: ChessgameServiceService,
              private sanitizer: DomSanitizer,
              public replayService: ReplayServiceService,
              private importPgnService: ImportPGNService) {
    this.localDateTime = new Date();
  }


  ngOnInit(): void {
    // You can access user data directly from UserData

    const id = this.userService.CurrentUserData.id as number;
    this.userService.getUserProfile(id).subscribe((response) => {
      this.userService.CurrentUserData = response;
      this.currentUserProfile = response;
      this.title = response.numberOfSolvedChessPuzzles as number;
      console.log("number", this.title);
      console.log("response", response);
      console.log("new profile", this.userService.CurrentUserData);
    }, (error) => {
      console.log("error", error);
    })
    var blob: Blob | undefined;
    const image = this.currentUserProfile.profileImage as number[] | undefined;

    if (image == undefined) {//if there is no image, use the default image.
      this.userImage = this.defaultImageUrl;
      console.log(this.userImage);
    } else {
      blob = this.toBlob(image.toString());//image is a number[]type, but it will return a base64 type string from backend.
      if (blob != undefined) {
        this.userImage = this.blobToSafeUrl(blob);//create the safeUrl by Blob file ,then frontend can show the image
      }
    } // If a friend application has been passed, then change this data to true;
    this.friendsService.getFriends(this.userProfile.id as number).subscribe(
      (friendlist) => {
        this.friendList = friendlist;

        // Check if the user is your friend
        const found = this.friendList.find((friend: User) => friend.id === id);

        if (found) {
          console.log("is Friend");
          this.isFriend = true;
        }
      },
      (error) => {
        this.isFriend = false;
      }
    );
    if (this.currentUserProfile.id) {
      this.userService.getChessClubs(this.currentUserProfile.id).subscribe(
        (response) => {
          this.clubs = response;
        }
      )
    }
    this.userService.getLastGames().subscribe((response) => {
      this.lastChessGames = response;
      console.log("response:", response);
      this.lastBotGame = response.filter(this.convertToChessBot).map((item: any) => item as ChessBot);
      this.lastChessGame = response.filter(this.convertToChessGame).map((item: any) => item as ChessGame);
      console.log("chessBot", this.lastBotGame);
      console.log("chessGame", this.lastChessGame);
      if (this.lastChessGame.length > 0) {
        this.getChessGamesPgn();
        this.getChessGameAndPgn();
      }
      if (this.lastBotGame.length > 0) {
        this.getChessBotGamesPgn();
        this.getBotGameWithPgn();
        console.log("Botgames",this.lastBotGamesPgnWithChessGame)
        console.log(this.lastBotGamesPgnWithChessGame[0].ChessBot.chessGameName)
      }
    }, (error) => {
      console.error(error)
    });
  }

  getChessGamesPgn() {//create a list of ChessGames pgn(only pgn)
    if (this.lastChessGame) {
      for (let i = 0; i < this.lastChessGame.length; i++) {
        this.importPgnService.exportPGN(this.lastChessGame[i].chessGameId).subscribe((response) => {
          this.lastGamePgn = response.pgn;
          console.log(response);
          console.log(response.pgn)
          console.log("pgn", this.lastGamesPgn);
          if (this.lastGamePgn) {
            this.lastGamesPgn.push(this.lastGamePgn);
          }
        }, (error = 404) => {
          this.lastGamePgn = undefined;
          console.log("Not Found")
        })
      }
    }
  }
getChessGameAndPgn(){//create a list with ChessGame and its pgn
  if (this.lastChessGame) {
    for (let i = 0; i < this.lastChessGame.length; i++) {
      this.importPgnService.exportPGN(this.lastChessGame[i].chessGameId).subscribe((response) => {
        this.lastGamePgn = response.pgn;
        // @ts-ignore
        const gameWithPgn = { ChessGame: this.lastChessGame[i], pgn: response.pgn };
        // @ts-ignore
        this.lastGamesWithChessGame.push(gameWithPgn);
        console.log(response);
        console.log(response.pgn)
        console.log("pgn", this.lastGamesPgn);
        console.log(this.lastGamesWithChessGame)

      }, (error = 404) => {
        this.lastGamePgn = undefined;
        console.log("Not Found")
      })
    }
  }
}
  getChessBotGamesPgn() {//create a list of ChessBotgames Pgn(only Pgn)
    if (this.lastBotGame) {
      for (let i = 0; i < this.lastBotGame.length; i++) {
        console.log("id", this.lastBotGame[i].chessBotId);
        this.importPgnService.exportBotPGN(this.lastBotGame[i].chessBotId as number).subscribe((response) => {
          this.lastBotGamePgn = response.pgn;
          console.log("pgn", response.pgn);
          if (this.lastBotGamePgn) {
            this.lastBotGamesPgn.push(this.lastBotGamePgn);
          }
        }, (error = 404) => {
          this.lastBotGamePgn = undefined;
          console.log("Not Found");
          console.log("lastBotGame", this.lastBotGame);

        })
      }
    }
  }
  getBotGameWithPgn(){//create a list with ChessBot and its pgn
    if (this.lastBotGame) {
      for (let i = 0; i < this.lastBotGame.length; i++) {
        console.log("id", this.lastBotGame[i].chessBotId);
        this.importPgnService.exportBotPGN(this.lastBotGame[i].chessBotId as number).subscribe((response) => {
          this.lastBotGamePgn = response.pgn;
          console.log("pgn", response.pgn);
          // @ts-ignore
          const botGameWithPgn = {ChessBot:this.lastBotGame[i],pgn:response.pgn};
          // @ts-ignore
          this.lastBotGamesPgnWithChessGame.push(botGameWithPgn);
        }, (error = 404) => {
          this.lastBotGamePgn = undefined;
          console.log("Not Found");
          console.log("lastBotGame", this.lastBotGame);

        })
      }
    }
  }

  sendFriendRequest() {
    //Who sent the application to whom is output on the console.
    console.log('User:', this.userProfile.firstName, ' ', this.userProfile.lastName, '(ID = ', this.userProfile.id, ')', 'send request to',
      this.userService.CurrentUserData.firstName, ' ', this.userService.CurrentUserData.lastName, '(ID = ', this.userService.CurrentUserData.id, ')')

    if (this.haveSendRequest == false)
      this.friendsService.sendRequest(
        this.userService.CurrentUserData.id as number)
        .subscribe((data) => {
            if (data) {
              console.log(data);
              alert("Send add friend message",)
            }
          },
          (error) => {
            alert("Fail to send request");
            // handling errors
            console.error('Ein Fehler ist aufgetreten:', error);
          });
    this.haveSendRequest = true;
  }

  onSubmitPrivacy() {
    if (this.userProfile.privacy != undefined) {
      this.userService.updatePrivacy(this.userService.UserData).subscribe(
        (response) => {
          if (response) {
            console.log('Privater Veränderungserfolg', response);
            this.successOnUpdatePrivacy();
          } else {
            console.log('Fehler bei der Änderung');
            this.errorOnUpdatePrivacy();
          }
        },
        (error) => {
          // handling errors
          console.error('Ein Fehler ist aufgetreten:', error);
          this.errorOnUpdatePrivacy();
        });
    }
  }

  toBlob(base64Img: string) {
    var bin = atob(base64Img.replace(/^.*,/, ''));//handle with the string
    var buffer = new Uint8Array(bin.length);//compile to Uint8Array
    for (var i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }//form characters into a string
    // Create Blob
    try {
      var blob = new Blob([buffer.buffer], {
        type: 'image/png'
      });
    } catch (e) {//handle error
      return undefined;
    }
    return blob;
  }

  private errorOnUpdatePrivacy() {
    alert("Datenschutzänderung fehlgeschlagen.");
    //Reply: Privacy change failed
  }

  private successOnUpdatePrivacy() {
    alert("Datenschutzänderung erfolgreich.");
    //Reply: Privacy changed successfully
  }


  resetUserProfile() {
    this.userService.CurrentUserData = this.userService.UserData;
  }


  dataUrlToBlob(dataUrl: string): Blob {
    const parts = dataUrl.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uint8Array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; ++i) {
      uint8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uint8Array], {type: contentType});
  }

  blobToSafeUrl(blob: Blob): SafeUrl {//create the url for the Blob File
    const url = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  downloadFile(data: string, fileName: string, type: string): void {
    const blob = this.stringToBlob(data, type);
    saveAs(blob, fileName);
  }

  download(pgn: string): void {
    // this.downloadFile(this.pgn, 'your-file-name.pgn', 'text/plain');//store without dialog box
    const fileName = `${this.replayService.getGameName(pgn)}.pgn`
    this.downloadFile(pgn, fileName, 'application/octet-stream');
  }

  stringToBlob(data: string, type: string): Blob {
    // const byteChars = atob(data);
    // const byteNumbers = new Array(byteChars.length);
    //
    // for (let i = 0; i < byteChars.length; i++) {
    //   byteNumbers[i] = byteChars.charCodeAt(i);
    // }
    //
    // const byteArray = new Uint8Array(byteNumbers);
    //
    // return new Blob([byteArray], { type: type });
    return new Blob([data], {type: type});
  }

  watchReplay(pgn: string) {
    this.replayService.pgn = pgn;
  }

  //   convertToChessBot(item: any): ChessBot | null {
  //   if (item instanceof ChessBot) {
  //     return item;
  //   }
  //   return null;
  // }
  convertToChessBot(item: any): item is ChessBot {
    //Check if item have chessBotId, if true it will turn this any type to a ChessBot
    {
      return (
        'chessBotId' in item &&
        true
      )
    }

  }

  convertToChessGame(item: any): item is ChessGame {
    //check if the item have chessGameId and livestreamActive,if true, turn any type to ChessGame;
    {
      return (
        'chessGameId' in item &&
        'livestreamActive' in item &&
        true
      );
    }

  }

  getResult(pgn: string) {
    const result = this.replayService.getGameResult(pgn);
    if (result == "1-0") {
      return this.replayService.getPlayer1Name(pgn) + " " + "hat gewonnen";
    } else if (result == "0-1") {
      return this.replayService.getPlayer2Points(pgn) + " " + "hat gewonnen"
    } else {
      return "draw";
    }
  }

  getGameResultByWinnerId(pgn: string) {//use winner id to get winner
    const date = this.replayService.getGameDate(pgn);
    const foundGame = this.lastChessGame?.find(game => this.compareTimestamps(game.timeStamp as string, date))
  if(foundGame){
    return `${foundGame.winner?.firstName} ${foundGame.winner?.lastName} hat gewonnen`
  }else{
    return null;
  }
  }
  getBotGameResult(pgn:string){//use result in pgn to get winner z.B 1-0 is white win
    const date = this.replayService.getGameDate(pgn);
    const foundGame = this.lastBotGame?.find(game => game.timeStamp === date)
    if(foundGame){
      if(foundGame.winner=="Bot"){
        return "Bot hat gewonnen";
      }else if(foundGame.winner=="User"){
        return `${this.userService.UserData.firstName} ${this.userService.UserData.lastName} hat gewonnen`;
      }else{
        return "Draw";
      }
    }else{
      return null;
    }
  }
  compareTimestamps(timestamp1: string, timestamp2: string): boolean {//ignore milliseconds to compare time
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    //ignore milliseconds
    date1.setMilliseconds(0);
    date2.setMilliseconds(0);
    return date1.getTime() === date2.getTime();
  }
}

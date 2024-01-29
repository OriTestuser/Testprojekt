import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../Model/User";
import {UserServiceService} from "../Service/user-service.service";
import{FriendsServiceService} from "../Service/friends-service.service";
import{ChessgameServiceService} from "../Service/chessgame-service.service";
import{DomSanitizer,SafeUrl} from "@angular/platform-browser";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  title = 'SchachEP';

  register: User;//Store the data of the user who want to register here
  // registerResult: User | null = null;//Store data of the user returned after successful registration
  selectedImage: SafeUrl | undefined;
   defaultImageUrl ='assets/checkerboard.png';
    imageUrl: string='';
    imageData: Uint8Array | undefined;
  constructor(private router: Router,
              private userService: UserServiceService,
              private friendsService:FriendsServiceService,
              private chessGameService:ChessgameServiceService,
              private sanitizer: DomSanitizer) {
    this.register = new User();
    // this.registerResult = new User();
  }


  onSubmit() {

    console.log(this.register.password);
    if(this.register.password!=undefined){
      if(this.register.password.length >= 8){


        //Make sure the password is longer than eight characters
        this.userService.signup(this.register).subscribe(
          (response) => {
            if (response) {
              this.userService.UserData = response;
              this.userService.CurrentUserData=response;
              // User registration is successful, can perform redirection or other operations
              console.log('Benutzerregistrierung erfolgreich', response);
              this.gotoTwoFactorAuthor();
            } else {
              // User registration failed
              console.log('Die Benutzerregistrierung ist fehlgeschlagen');
              this.errorOnEmail();
            }
          },
          (error) => {
            // handling errors
            console.error('Ein Fehler ist aufgetreten：', error);
            this.errorOnEmail();
          });
      }
      else{
        this.errorWithPassword();
      }
    }
  }

  private errorWithPassword()
  {
    //When the password is less than eight characters.
    console.error('Password is less than eight characters');
    alert("Das Passwort muss mindestens 8 Zeichen lang sein!");
  }

  private errorWithSubmit()
  {
    alert("ERROR");
  }
  private errorOnEmail()
  {
    alert("E-Mail-Adress bereits vergeben");
    //Reply: Email address is already taken
  }
  private gotoMainpage()
  {
    this.router.navigate(['mainLobby']);
    //If registration is successful, go to the main lobby
  }
  private gotoTwoFactorAuthor(){
    this.router.navigate(['twoFactorAuthor']);
  }

  onFileSelected(event: any){
    const fileList:FileList=event.target.files;// add the file to fileList
    if(fileList.length > 0){
      const selectFile:File=fileList[0];
      const reader = new FileReader();//create a reader to read the File
      reader.onload= (data)=>{
        const arrayBuffer:ArrayBuffer=data.target?.result as ArrayBuffer; //compile the file to a Arraybuffer
        this.selectedImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(selectFile));//create a safeurl to the selectfile
        if(arrayBuffer){
         this.imageData = new Uint8Array(arrayBuffer);//compile to the Uint8Array
          console.log('arrayBuffer:',arrayBuffer);
          console.log('image',this.register.profileImage);
          const byteData = Array.from(this.imageData);//compile to the normal array (number[])type
          this.register.profileImage=byteData;
          console.log(byteData);
        }
      }
      reader.readAsArrayBuffer(selectFile);
      console.log(selectFile);

    }
  }
  dataURItoBlob(dataUrl: string): Blob {
    // get Base64 from the Url
    const base64 = dataUrl.split(',')[1];

    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);


    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // return Blob
    return new Blob([bytes], { type: 'image/jpeg' }); // 更改 MIME 类型为你的文件类型
  }
  dataUrltobytes(dataUrl:string){
    const base64 = dataUrl.split(',')[1];

    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);


    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
}

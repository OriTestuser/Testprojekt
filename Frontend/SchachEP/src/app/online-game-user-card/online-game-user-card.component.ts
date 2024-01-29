import {Component, Input} from '@angular/core';
import {UserServiceService} from "../Service/user-service.service";
import {User} from "../Model/User";
import {Router} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ChangeDetectorRef} from '@angular/core';
import {OnlineGameStateService} from "../online-game/online-game-state.service";


@Component({
  selector: 'app-online-game-user-card',
  templateUrl: './online-game-user-card.component.html',
  styleUrls: ['./online-game-user-card.component.css']
})
export class OnlineGameUserCardComponent {
  @Input() userID: number = 0;

  userProfile :User = new User();
  userImage: SafeUrl | undefined;
  defaultImageUrl: string = 'assets/defaultImage.jpg';

  private intervalId: any;

  constructor(private router: Router,
              private userService: UserServiceService,
              private sanitizer: DomSanitizer,
              private stateService: OnlineGameStateService,
              private cdr: ChangeDetectorRef,){

  }

  ngOnInit(){
    console.log('Loading user cards...\nuserID = ', this.userID);



    this.userService.getUserProfile(this.userID).subscribe(
      (response) =>{
        console.log('The server returned user data: ', response);
        this.userProfile = response;
        var blob:Blob| undefined;
        const image=this.userProfile.profileImage as number[]|undefined;

        if (image) {
          blob = this.toBlob(image.toString());
          if (blob) {
            this.userImage = this.blobToSafeUrl(blob);
          }
        } else {
          this.userImage = this.defaultImageUrl;
          console.log(this.userImage);
        }

        this.intervalId = setInterval(() => {
          if(this.stateService.getState() === 99){
            clearInterval(this.intervalId);
          }
          if(this.stateService.pointToChange && this.userProfile.points){
            this.stateService.pointToChange = false;
            this.userProfile.points = this.userProfile.points - 1;
            this.cdr.detectChanges();//Data updates
          }
        }, 100);

      },
      (error)=>{
        console.log("An error occurred while getting user data!",error);
      }
    );
  }
  ngOnDestroy(){
    clearInterval(this.intervalId);
    console.log('User Card Cleared.');
  }

  toBlob(base64Img:string) {
    var bin = atob(base64Img.replace(/^.*,/, ''));//handle with the string
    var buffer = new Uint8Array(bin.length);//compile to Uint8Array
    for (var i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }//form characters into a string
    // Create Blob
    try{
      var blob = new Blob([buffer.buffer], {
        type: 'image/png'
      });
    }catch (e){//handle error
      return undefined;
    }
    return blob;
  }

  blobToSafeUrl(blob: Blob): SafeUrl {//create the url for the Blob File
    const url = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}

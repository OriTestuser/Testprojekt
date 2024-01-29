import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { SepbottomComponent } from './sepbottom/sepbottom.component';
import { MainlobbyComponent } from './mainlobby/mainlobby.component';
import { RegisterComponent } from './register/register.component';
import{ProfilMainComponent} from "./profil-main/profil-main.component";
import {TwofactorauthorComponent} from "./twofactorauthor/twofactorauthor.component";
import {FriendlistComponent} from "./friendlist/friendlist.component";
import { SearchUserComponent } from './search-user/search-user.component';
import { InviteComponent } from './invite/invite.component';
import { MyInviteComponent } from './my-invite/my-invite.component';
import { GameSettingComponent } from './game-setting/game-setting.component';
import { OpenMatchesComponent } from './open-matches/open-matches.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import { ChooseOpponentComponent } from './choose-opponent/choose-opponent.component';
import { GameComponent } from './game/game.component';
import { MyClubsComponent } from './my-clubs/my-clubs.component';
import { AllClubsComponent } from './all-clubs/all-clubs.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { GroupchatListComponent } from './groupchat-list/groupchat-list.component';
import { PieceComponent } from './piece/piece.component';
import { FriendchatComponent} from "./friendchat/friendchat.component";
import { NewClubComponent } from './new-club/new-club.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { CreateGroupchatComponent } from './create-groupchat/create-groupchat.component';
import { TimerComponent } from './timer/timer.component';
import { UserCardComponent } from './user-card/user-card.component';
import { PuzzleUploaderComponent } from './puzzle-uploader/puzzle-uploader.component';
import {ClubChatComponent} from "./club-chat/club-chat.component";
import { AddFriendsComponent } from './add-friends/add-friends.component';
import { PuzzleGameComponent } from './puzzle-game/puzzle-game.component';
import { PuzzlePieceComponent } from './puzzle-piece/puzzle-piece.component';
import { GameImportComponent } from './game-import/game-import.component';
import { ReplayPieceComponent } from './replay-piece/replay-piece.component';
import { PgnExportComponent } from './pgn-export/pgn-export.component';
import { ReplayBoardComponent } from './replay-board/replay-board.component';
import { ReplayMoveGeneratorComponent } from './replay-move-generator/replay-move-generator.component';
import { ReplayRecorderComponent } from './replay-recorder/replay-recorder.component';
import { LiveListComponent } from './live-list/live-list.component';
import { LiveInterfaceComponent } from './live-interface/live-interface.component';
import { OnlineGameComponent } from './online-game/online-game.component';
import { OnlineGamePieceComponent } from './online-game-piece/online-game-piece.component';
import { ReplayUserCardComponent } from './replay-user-card/replay-user-card.component';
import { BotGameComponent } from './bot-game/bot-game.component';
import { OnlineGameUserCardComponent } from './online-game-user-card/online-game-user-card.component';
import { BotGamePieceComponent } from './bot-game-piece/bot-game-piece.component';
import { BotGameSettingComponent } from './bot-game-setting/bot-game-setting.component';
import { BotGameListComponent } from './bot-game-list/bot-game-list.component';
import { BotGameTimerComponent } from './bot-game-timer/bot-game-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SepbottomComponent,
    MainlobbyComponent,
    RegisterComponent,
    ProfilMainComponent,
    TwofactorauthorComponent,
    FriendlistComponent,
    SearchUserComponent,
    InviteComponent,
    MyInviteComponent,
    GameSettingComponent,
    OpenMatchesComponent,
    FriendRequestComponent,
    ChooseOpponentComponent,
    GameComponent,
    MyClubsComponent,
    AllClubsComponent,
    LeaderboardComponent,
    PuzzleComponent,
    GroupchatListComponent,
    PieceComponent,
    FriendchatComponent,
    NewClubComponent,
    GroupChatComponent,
    CreateGroupchatComponent,
    TimerComponent,
    UserCardComponent,
    PuzzleUploaderComponent,
    ClubChatComponent,
    AddFriendsComponent,
    PuzzleGameComponent,
    PuzzlePieceComponent,
    GameImportComponent,
    ReplayPieceComponent,
    PgnExportComponent,
    ReplayBoardComponent,
    ReplayMoveGeneratorComponent,
    ReplayRecorderComponent,
    LiveListComponent,
    LiveInterfaceComponent,
    OnlineGameComponent,
    OnlineGamePieceComponent,
    ReplayUserCardComponent,
    BotGameComponent,
    OnlineGameUserCardComponent,
    BotGamePieceComponent,
    BotGameSettingComponent,
    BotGameListComponent,
    BotGameTimerComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

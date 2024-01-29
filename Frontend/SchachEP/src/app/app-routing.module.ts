import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { MainlobbyComponent } from "./mainlobby/mainlobby.component"
import { RegisterComponent } from "./register/register.component";
import { ProfilMainComponent } from "./profil-main/profil-main.component";
import { TwofactorauthorComponent } from "./twofactorauthor/twofactorauthor.component";
import { FriendlistComponent } from "./friendlist/friendlist.component";
import { SearchUserComponent } from "./search-user/search-user.component";
import { OpenMatchesComponent } from "./open-matches/open-matches.component"
import { GameSettingComponent } from "./game-setting/game-setting.component";
import { InviteComponent } from "./invite/invite.component";
import { MyInviteComponent } from "./my-invite/my-invite.component";
import { FriendRequestComponent } from "./friend-request/friend-request.component";
import { ChooseOpponentComponent } from "./choose-opponent/choose-opponent.component";
import { GameComponent } from "./game/game.component";
import { RefreshGuard} from "./Service/auth.guard";
import {MyClubsComponent} from"./my-clubs/my-clubs.component";
import {AllClubsComponent} from "./all-clubs/all-clubs.component";
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";
import {PuzzleComponent} from "./puzzle/puzzle.component";
import {GroupchatListComponent} from "./groupchat-list/groupchat-list.component";
import {PieceComponent} from "./piece/piece.component";
import { FriendchatComponent} from "./friendchat/friendchat.component";
import {NewClubComponent} from "./new-club/new-club.component";
import {GroupChatComponent} from "./group-chat/group-chat.component";
import {CreateGroupchatComponent} from "./create-groupchat/create-groupchat.component";
import {TimerComponent} from "./timer/timer.component";
import {UserCardComponent} from "./user-card/user-card.component";
import {PuzzleUploaderComponent} from "./puzzle-uploader/puzzle-uploader.component";
import {ClubChatComponent} from "./club-chat/club-chat.component";
import {AddFriendsComponent} from "./add-friends/add-friends.component";
import {PuzzleGameComponent} from "./puzzle-game/puzzle-game.component";
import {PuzzlePieceComponent} from "./puzzle-piece/puzzle-piece.component";
import {ReplayBoardComponent} from "./replay-board/replay-board.component";
import {PgnExportComponent} from "./pgn-export/pgn-export.component";
import {LiveListComponent} from "./live-list/live-list.component";
import {LiveInterfaceComponent} from "./live-interface/live-interface.component";
import {OnlineGameUserCardComponent} from "./online-game-user-card/online-game-user-card.component";
import {OnlineGameComponent} from "./online-game/online-game.component";
import {OnlineGamePieceComponent} from "./online-game-piece/online-game-piece.component";
import {BotGameComponent} from "./bot-game/bot-game.component";
import {BotGamePieceComponent} from "./bot-game-piece/bot-game-piece.component";
import {BotGameSettingComponent} from "./bot-game-setting/bot-game-setting.component";
import {BotGameListComponent} from "./bot-game-list/bot-game-list.component";
import {BotGameTimerComponent} from "./bot-game-timer/bot-game-timer.component";

const routes: Routes = [
  {
  path: '',
  canActivate: [RefreshGuard],
  children: [
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'profileMain',component:ProfilMainComponent},
    {path:'mainLobby',component:MainlobbyComponent},
    {path:'twoFactorAuthor',component:TwofactorauthorComponent},
    {path:'friendList',component:FriendlistComponent},
    {path:'searchUser',component:SearchUserComponent},
    {path:'openMatches',component:OpenMatchesComponent},
    {path:'gameSetting',component:GameSettingComponent},
    {path:'invite',component:InviteComponent},
    {path:'myInvite',component:MyInviteComponent},
    {path:'friendRequest',component:FriendRequestComponent},
    {path:'chooseOpponent',component:ChooseOpponentComponent},
    {path:'game',component:GameComponent},
    {path:'myClubs',component:MyClubsComponent},
    {path:'allClubs',component:AllClubsComponent},
    {path:'leaderBoard',component:LeaderboardComponent},
    {path:'groupChatList',component:GroupchatListComponent},
    {path:'puzzle',component:PuzzleComponent},
    {path:'piece',component:PieceComponent},
    {path:'friendChat',component:FriendchatComponent},
    {path:'newClub',component:NewClubComponent},
    {path:'createGroupChat',component:CreateGroupchatComponent},
    {path:'groupChat',component:GroupChatComponent},
    {path:'timer',component:TimerComponent},
    {path:'userCard',component:UserCardComponent},
    {path:'puzzleUploader',component:PuzzleUploaderComponent},
    {path:'clubChat',component:ClubChatComponent},
    {path:'addFriends',component:AddFriendsComponent},
    {path:'puzzleGame',component:PuzzleGameComponent},
    {path:'puzzlePiece',component:PuzzlePieceComponent},
    {path:'replayBoard',component:ReplayBoardComponent},
    {path:'pgnExport',component:PgnExportComponent},
    {path:'liveList',component:LiveListComponent},
    {path:'liveInterface',component:LiveInterfaceComponent},
    {path:'onlineGame',component:OnlineGameComponent},
    {path:'onlineGamePiece',component:OnlineGamePieceComponent},
    {path:'botGame',component:BotGameComponent},
    {path:'botGamePiece',component:BotGamePieceComponent},
    {path:'onlineUserCard',component:OnlineGameUserCardComponent},
    {path:'botGameSetting',component:BotGameSettingComponent},
    {path:'botGameList',component:BotGameListComponent},
    {path:'botGameTimer',component:BotGameTimerComponent},
  ]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { User } from './User';
import { ChessClub } from './ChessClub';

export class ChessClubMembership {
  membershipUser: User | undefined;
  membershipChessClub: ChessClub | undefined;

  constructor(membershipUser: User, membershipChessClub: ChessClub) {
    this.membershipUser = membershipUser;
    this.membershipChessClub = membershipChessClub;
  }
}

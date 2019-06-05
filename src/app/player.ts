
export class Player {

  playerName: string;
  symbol: string;
  wins: number;
  losses: number;
  streak: number;
  longestStreak: number;

  constructor(playerName: string, symbol: string) {
    this.playerName = playerName;
    this.symbol = symbol;
    this.wins = 0;
    this.losses = 0;
    this.streak = 0;
    this.longestStreak = 0;
  }

}

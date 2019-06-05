import { Player } from './player';

export class Space {
  row: number;
  column: number;
  playerName: string;
  symbol: string;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
    this.playerName = '';
  }

  setPlayer(player: Player): void {
      this.playerName = player.playerName;
      this.symbol = player.symbol;
  }

  reset(): void {
    this.playerName = '';
    this.symbol = '';
  }
}

import { Injectable } from '@angular/core';
import { Player } from './player';
import { Space } from './space';
import { Board } from './board';
import { GameSpaceComponent } from './game-space/game-space.component';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  humanPlayer: Player;
  computerPlayer: Player;
  activePlayer: Player;
  private board: Board;

  constructor() {
    this.humanPlayer = new Player('Human', 'X');
    this.computerPlayer = new Player('Computer', 'O');
    this.activePlayer = this.humanPlayer;
    this.board = new Board(3, 3);
  }

  click(row: number, column: number): void {
    // console.log(`${row} ${column} was clicked`);

    if (this.board.clicked(this.activePlayer, row, column)) {
      if (this.activePlayer.playerName === 'Human') {
        this.activePlayer = this.computerPlayer;

      } else {
        this.activePlayer = this.humanPlayer;
      }
    }

  }

  reset(): void {
  }

  register(component: GameSpaceComponent): void {
    this.board.register(component);
  }

}

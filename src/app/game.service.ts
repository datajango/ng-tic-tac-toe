import { Injectable } from '@angular/core';
import { Player } from './player';
import { Space } from './space';
import { Board } from './board';
import { GameSpaceComponent } from './game-space/game-space.component';
import { Move } from './move';

const COMPUTER = 0;
const HUMAN = 1;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  humanPlayer: Player;
  computerPlayer: Player;
  activePlayer: Player;
  private board: Board;
  gameStatus: string;

  constructor() {
    this.humanPlayer = new Player('Human', 'X');
    this.computerPlayer = new Player('Computer', 'O');
    this.activePlayer = this.humanPlayer;
    this.board = new Board(3, 3);
  }

  click(row: number, column: number): void {
    // console.log(`${row} ${column} was clicked`);

    let gameStatus: Player|boolean = this.board.isGameOver();

    if (gameStatus === false) {
      if (this.board.clicked(this.activePlayer, row, column)) {
        if (this.activePlayer.playerName === 'Human') {
          this.activePlayer = this.computerPlayer;
          const move: Move = this.board.moveComputer();
          if (move) {
            this.click(move.row, move.column);
            gameStatus = this.board.isGameOver();
            if (gameStatus !== false) {
              this.gameStatus = `${gameStatus.playerName} player wins`;
            }
          }
        } else {
          this.activePlayer = this.humanPlayer;
        }
      }
    } else {
      this.gameStatus = `${gameStatus.playerName} player wins`;
    }
  }

  reset(): void {
    this.activePlayer = this.humanPlayer;
    this.board.reset();
    this.gameStatus = 'In progess';
  }

  getActivePlayer(): string {
    return this.activePlayer.playerName;
  }

  getGameStatus() : string {
    return this.gameStatus;
  }

  register(component: GameSpaceComponent): void {
    this.board.register(component);
  }


  minmax(board, depth, player) {
    // const gameState = this.isGameOver(board);

    // if (gameState === false) {
    //   const value = [];

    // } else if (gameState === null) {
    //   return 0;
    // } else if (gameState === HUMAN) {
    //   return depth - 10;
    // } else if (gameState === COMPUTER) {
    //   return 10 - depth;
    // }
  }

  moveComputer() {
    return this.minmax(this.board, 0, COMPUTER);
  }
}

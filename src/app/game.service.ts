import { Injectable } from '@angular/core';
import { Player } from './player';
import { Space } from './space';
import { Board } from './board';
import { GameSpaceComponent } from './game-space/game-space.component';
import { Move } from './move';
import { Observable, Subject } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

const COMPUTER_PLAYER = 0;
const HUMAN_PLAYER = 1;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameStateSubject = new Subject<any>();
  components: GameSpaceComponent[][];

  humanPlayer: Player;
  computerPlayer: Player;
  activePlayer: Player;
  private board: Board;
  gameStateMessage: string;

  constructor() {
    this.humanPlayer = new Player('Human', 'X');
    this.computerPlayer = new Player('Computer', 'O');
    this.activePlayer = this.humanPlayer;
    this.board = new Board(3, 3);
    this.gameStateMessage = 'Ready';
    this.components = new Array<Array<GameSpaceComponent>>();

    for (let x = 0; x < 3; x++) {
      let row: GameSpaceComponent[] = new Array<GameSpaceComponent>();
      for (let y = 0; y < 3; y++) {
        row.push(null);
      }
      this.components.push(row);
    }
  }

  update(): void {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (this.components[x][y]) {
          this.components[x][y].update();
        }
      }
    }
  }

  sendGameState(message: string) {
    this.gameStateSubject.next({ message: message });
  }

  clearGameState() {
    this.gameStateSubject.next();
  }

  getGameState(): Observable<any> {
    return this.gameStateSubject.asObservable();
  }

  click(row: number, column: number): void {
    let playerName;

    let gameStatus: string | boolean = isGameOver(this.board, true);
    if (gameStatus !== false) {
      return;
    }

    if (this.board.clicked(this.activePlayer, row, column) === false) {
      return;
    }

    // console.log(`${row} ${column} was clicked`);
    isGameOver(this.board, true);

    if (gameStatus === false) {
      // if (this.board.clicked(this.activePlayer, row, column)) {
        if (this.activePlayer.playerName === 'Human') {
          this.activePlayer = this.computerPlayer;

          // const move: Move = simpleMoveComputer(this.board);
          const move: any = minMaxMoveComputer(this.board);

          if (move) {
            this.click(move.x, move.y);
            gameStatus = isGameOver(this.board, true);

            if (gameStatus !== false) {
              playerName = gameStatus as string;
              this.gameStateMessage = `${playerName} player wins`;
              this.sendGameState(this.gameStateMessage);
            } else {
              this.gameStateMessage = 'Tie';
              this.sendGameState(this.gameStateMessage);
            }
          }
        } else {
          this.activePlayer = this.humanPlayer;
          this.gameStateMessage = 'In progress';
          this.sendGameState(this.gameStateMessage);
        }
      // }
    } else {
      playerName = gameStatus as string;
      this.gameStateMessage = `${playerName} player wins`;
      this.sendGameState(this.gameStateMessage);
    }

    this.update();
  }

  reset(): void {
    this.activePlayer = this.humanPlayer;
    this.board.reset();
    this.gameStateMessage = 'Ready';
    this.sendGameState(this.gameStateMessage);
    this.update();
  }

  getActivePlayer(): string {
    return this.activePlayer.playerName;
  }

  register(component: GameSpaceComponent): void {
    this.components[component.row][component.column] = component;
  }

  getSymbol(row, column): string {
    return this.board.spaces[row][column].symbol;
  }
}

function simpleMoveComputer(board): Move {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (board.spaces[x][y].playerName === '') {
        return { row: x, column: y };
      }
    }
  }

  return null;
}

function minMaxMoveComputer(board: Board) {
  return minmax(deepcopy(board), 0, 'Computer');
}

// https://gist.github.com/jasonhodges/82be015cd49303f20b74f820acba8ca2

function deepcopy<T>(o: T): T {
  return JSON.parse(JSON.stringify(o));
}

function myDeepCopy(src: any): any {
  let target: any = {};
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      target[prop] = src[prop];
    }
  }
  return target;
}

// https://youmightnotneed.com/lodash/
const maxBy = (arr, iteratee) => {
  const func = typeof iteratee === 'function' ? iteratee : item => item[iteratee];
  const max = Math.max(...arr.map(func));
  return arr.find(item => func(item) === max);
}

// https://youmightnotneed.com/lodash/
const minBy = (arr, iteratee) => {
  const func = typeof iteratee === 'function' ? iteratee : item => item[iteratee];
  const min = Math.min(...arr.map(func));
  return arr.find(item => func(item) === min);
}

function dumpBoard(board) {
  let line: string;

  for (let x = 0; x < 3; x++) {
    line=`${x}:`;
    for (let y = 0; y < 3; y++) {
        if (board.spaces[x][y].playerName === 'Human') {
          line += 'X';
        } else if (board.spaces[x][y].playerName === 'Computer') {
          line += 'O';
        } else {
          line += '-';
        }
    }
    console.log(line);
  }

}

// I watched this youtube video on Min Max AI
// https://www.youtube.com/watch?v=x_Je9i3aKNk
// didn't make things any easier.

function minmax(board: Board, depth: number, playerName: string) {

  //console.log(`minmax ${depth} ${playerName}`);
  //dumpBoard(board);

  const gameState: string | boolean | null = isGameOver(board);

  // falsemeans the game is not over
  if (gameState === false) {

    let values = [];

    // no one has won yet, game will continue
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const boardClone: Board = deepcopy(board) as Board;

        if (boardClone.spaces[x][y].playerName !== '') { continue; }

        boardClone.spaces[x][y].playerName = playerName;

        let value = minmax(boardClone, depth + 1, playerName === 'Human' ? 'Computer' : 'Human');
        //console.log(`${x} ${y} has a cost of ${value}`);

        values.push({
          cost: value,
          cell: {
            x: x,
            y: y
          }
        });
      }
    }


    if (playerName === 'Computer') {

      let max = maxBy(values, (v) => {
        return v.cost;
      });

      if (depth === 0) {
        return max.cell;
      } else {
        return max.cost;
      }

    } else if (playerName === 'Human') {

      let min = minBy(values, (v) => {
        return v.cost;
      });

      if (depth === 0) {
        return min.cell;
      } else {
        return min.cost;
      }
    }

  } else if (gameState === null) {
    return 0; // tie game
  } else {
    const winningPlayerName = gameState as string;
    if (winningPlayerName === 'Human') {
      return depth - 10;
    } else if (winningPlayerName === 'Computer') {
      return 10 - depth;
    }
  }
}

function isGameOver(board: Board, isReal: boolean = false): string | boolean | null {

  // check for three in a row
  for (let y = 0; y < 3; y++) {
    if ((board.spaces[y][0].playerName !== '') &&
      (board.spaces[y][0].playerName === board.spaces[y][1].playerName) &&
      (board.spaces[y][0].playerName === board.spaces[y][2].playerName)
    ) {

      return board.spaces[y][0].playerName;
    }
  }

  // check horizontal
  for (let x = 0; x < 3; x++) {
    if ((board.spaces[0][x].playerName !== '') &&
      (board.spaces[0][x].playerName === board.spaces[1][x].playerName) &&
      (board.spaces[0][x].playerName === board.spaces[2][x].playerName)
    ) {

      return board.spaces[0][x].playerName;
    }
  }

  // check diaganals
  if ((board.spaces[0][0].playerName !== '') &&
    (board.spaces[0][0].playerName === board.spaces[1][1].playerName) &&
    (board.spaces[0][0].playerName === board.spaces[2][2].playerName)
  ) {
    return board.spaces[0][0].playerName;
  }

  if ((board.spaces[2][0].playerName !== '') &&
    (board.spaces[2][0].playerName === board.spaces[1][1].playerName) &&
    (board.spaces[2][0].playerName === board.spaces[0][2].playerName)
  ) {

    return board.spaces[2][0].playerName;
  }

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (board.spaces[x][y].playerName === '') {
        return false;
      }
    }
  }

  return null;
}

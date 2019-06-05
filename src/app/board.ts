import { Space } from './space';
import { NumberSymbol } from '@angular/common';

import { GameSpaceComponent } from './game-space/game-space.component';
import { Player } from './player';
import { Move } from './move';
export class Board {

  private spaces: Space[][];

  rows: number;
  columns: number;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.spaces = new Array<Array<Space>>();

    for (let y = 0; y < this.rows; y++) {
      let row: Space[] = new Array<Space>();
      for (let x = 0; x < this.columns; x++) {
        row.push(new Space(x, y));
      }
      this.spaces.push(row);
    }
  }

  reset(): void {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        // console.log(`reset ${x} ${y}`);
        this.spaces[x][y].reset();
      }
    }
  }

  clicked(player: Player, row: number, column: number): boolean {
      // console.log(`Board ${row} ${column} was clicked`);
      if (this.spaces[row][column].getPlayer() === null) {
        this.spaces[row][column].setPlayer(player);
        return true;
      } else {
        return false;
      }
  }

  register(component: GameSpaceComponent): void {
    // console.log(`register ${component.row} ${component.column}`);
    this.spaces[component.row][component.column].component = component;
  }

  isGameOver(): Player|boolean {

    // check for three in a row
    for (let y = 0; y < this.rows; y++) {
      if ((this.spaces[y][0].getPlayer() !== null) &&
          (this.spaces[y][0].getPlayer() === this.spaces[y][1].getPlayer()) &&
          (this.spaces[y][0].getPlayer() === this.spaces[y][2].getPlayer())
          ) {
            this.spaces[y][0].component.victory = true;
            this.spaces[y][1].component.victory = true;
            this.spaces[y][2].component.victory = true;

            return this.spaces[y][0].getPlayer();
          }
    }

    // check horizontal
    for (let x = 0; x < this.columns; x++) {
      if ((this.spaces[0][x].getPlayer() !== null) &&
          (this.spaces[0][x].getPlayer() === this.spaces[1][x].getPlayer()) &&
          (this.spaces[0][x].getPlayer() === this.spaces[2][x].getPlayer())
          ) {

            this.spaces[0][x].component.victory = true;
            this.spaces[1][x].component.victory = true;
            this.spaces[2][x].component.victory = true;

            return this.spaces[0][x].getPlayer();
          }
    }

    // check diaganal
    if ((this.spaces[0][0].getPlayer() !== null) &&
        (this.spaces[0][0].getPlayer() === this.spaces[1][1].getPlayer()) &&
        (this.spaces[0][0].getPlayer() === this.spaces[2][2].getPlayer())
        ) {
          return this.spaces[0][0].getPlayer();
        }

    if ((this.spaces[2][0].getPlayer() !== null) &&
        (this.spaces[2][0].getPlayer() === this.spaces[1][1].getPlayer()) &&
        (this.spaces[2][0].getPlayer() === this.spaces[0][2].getPlayer())
        ) {
          return this.spaces[2][0].getPlayer();
        }

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        if (this.spaces[x][y].getPlayer() === null) {
          return false;
        }
      }
    }

    return null;
  }


  moveComputer() : Move {
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.columns; y++) {
        if (this.spaces[x][y].getPlayer() === null) {
          return { row : x, column : y};
        }
      }
    }

    return null;
  }


}

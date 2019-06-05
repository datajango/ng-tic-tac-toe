import { Space } from './space';
import { NumberSymbol } from '@angular/common';

import { GameSpaceComponent } from './game-space/game-space.component';
import { Player } from './player';
export class Board {

  private spaces: Space[][];

  rows: number;
  columns: number;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.spaces = new Array<Array<Space>>();

    for (let y = 0; y <= 100; y++) {
      let row: Space[] = new Array<Space>();
      for (let x = 0; x <= 100; x++) {
        row.push(new Space(x, y));
      }
      this.spaces.push(row);
    }
  }

  clicked(player: Player, row: number, column: number): boolean {

      console.log(`Board ${row} ${column} was clicked`);

      if (this.spaces[row][column].getPlayer() === null) {
        this.spaces[row][column].setPlayer(player);
        return true;
      } else {
          return false;
      }

  }

  register(component: GameSpaceComponent): void {
    console.log(`register ${component.row} ${component.column}`);
    this.spaces[component.row][component.column].component = component;
  }
}

import { Space } from './space';
import { Player } from './player';
export class Board {

  spaces: Space[][];
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
        this.spaces[x][y].reset();
      }
    }
  }

  clicked(player: Player, row: number, column: number): boolean {

      if (this.spaces[row][column].playerName === '') {
        this.spaces[row][column].setPlayer(player);
        return true;
      } else {
        return false;
      }
  }

}

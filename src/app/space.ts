import { Player } from './player';
import { GameSpaceComponent } from './game-space/game-space.component';

export class Space {
  row: number;
  column: number;
  owner: Player;
  component: GameSpaceComponent;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
    this.owner = null;
  }

  setPlayer(player: Player): void {
    this.owner = player;
    this.component.setPlayer(player);
  }

  getPlayer(): Player {
    return this.owner;
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Player } from '../player';

@Component({
  selector: 'app-game-space',
  templateUrl: './game-space.component.html',
  styleUrls: ['./game-space.component.scss']
})
export class GameSpaceComponent implements OnInit {

  @Input() owner: string;
  @Input() row: number;
  @Input() column: number;
  @Input() player: Player;

  constructor(private game: GameService) {


   }

  ngOnInit() {
    console.log(`GameSpaceComponent ${this.row} ${this.column}`);

    this.game.register(this);
  }

  clicked() {
    this.game.click(this.row, this.column);
  }

  setPlayer(player: Player): void {
      this.player = player;
  }

  symbol(): string {
    if (!this.player) {
      return '';
    } else {
      return this.player.symbol;
    }

  }
}

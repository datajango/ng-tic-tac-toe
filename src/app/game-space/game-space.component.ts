import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-space',
  templateUrl: './game-space.component.html',
  styleUrls: ['./game-space.component.scss']
})
export class GameSpaceComponent implements OnInit {

  @Input() owner: string;
  @Input() row: number;
  @Input() column: number;
  @Input() symbol: string;
  @Input() victory: boolean;

  constructor(private game: GameService, private ref: ChangeDetectorRef) {
    this.victory = false;
    this.symbol = '';
  }

  ngOnInit() {
    this.game.register(this);
  }

  clicked() {
    this.game.click(Number(this.row), Number(this.column));
  }

  update(): void {
    this.symbol = this.game.getSymbol(this.row, this.column);
    this.ref.markForCheck();
  }

}

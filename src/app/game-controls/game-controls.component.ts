import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerContext } from '@angular/core/src/render3/interfaces/player';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss']
})
export class GameControlsComponent implements OnInit {

  constructor(private game: GameService) { }

  ngOnInit() {
  }

  getActivePlayer() {
    return this.game.getActivePlayer();
  }

  getGameStatus() {
    return this.game.getGameStatus();
  }

  reset() {
    this.game.reset();
  }
}

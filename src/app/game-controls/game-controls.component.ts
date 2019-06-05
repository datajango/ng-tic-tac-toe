import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Player } from '../player';
import { PlayerContext } from '@angular/core/src/render3/interfaces/player';
import { GameService } from '../game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss']
})
export class GameControlsComponent implements OnInit, OnDestroy {

  message: string;
  subscription: Subscription;

  constructor(private game: GameService, private ref: ChangeDetectorRef) {
    this.message = 'Ready';

    // subscribe to home component messages
    this.subscription = this.game.getGameState().subscribe(message => {
      if (message) {
        this.message = message.message;
      } else {
        this.message = 'Ready';
      }
    });
  }

  ngOnInit() {
  }

  getActivePlayer() {
    return this.game.getActivePlayer();
  }

  // getGameState() {
  //   return this.game.getGameState();
  // }

  reset() {
    this.game.reset();
  }

  // setGameState(): void {
  //   this.ref.markForCheck();
  // }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
